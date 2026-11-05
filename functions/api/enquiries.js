import { validateEnquiry, buildMail } from "../../server/enquiry-core.mjs";
import {
  json,
  input,
  sameOrigin,
  rate,
  hash,
  count,
} from "../../server/cloudflare-shared.mjs";
export async function onRequest({ request, env }) {
  try {
    if (request.method !== "POST") return json(405, { error: "Use POST." });
    if (!sameOrigin(request, env))
      return json(403, { error: "Submit from this website." });
    const body = await input(request, 16384);
    await rate(request, env, "enquiry", 8);
    if (body.website) return json(400, { error: "Unable to submit." });
    const result = validateEnquiry(body);
    if (result.error) return json(422, result);
    if (
      !env.RESEND_API_KEY ||
      !env.EMAIL_FROM ||
      !env.ENQUIRY_TO ||
      !env.TURNSTILE_SECRET_KEY
    )
      return json(503, {
        error:
          "Online enquiries are not configured yet. Your details have not been sent.",
      });
    const verify = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret: env.TURNSTILE_SECRET_KEY,
          response: body.turnstileToken,
        }),
        signal: AbortSignal.timeout(10000),
      },
    );
    const proof = await verify.json();
    if (
      !proof.success ||
      proof.hostname !== new URL(env.SITE_ORIGIN).hostname ||
      proof.action !== "enquiry"
    )
      return json(422, { error: "Please complete the verification again." });
    const data = result.data,
      id = data.submissionId,
      fingerprint = await hash(JSON.stringify(data)),
      now = Date.now();
    await env.DB.prepare(
      "INSERT OR IGNORE INTO receipts(id,hash,status,lease,expires) VALUES(?,?,'pending',0,?)",
    )
      .bind(id, fingerprint, now + 86400000)
      .run();
    const row = await env.DB.prepare("SELECT * FROM receipts WHERE id=?")
      .bind(id)
      .first();
    if (row.hash !== fingerprint)
      return json(409, {
        error: "This submission ID belongs to different details.",
      });
    if (row.status === "accepted")
      return json(200, { ok: true, reference: id });
    const claim = await env.DB.prepare(
      "UPDATE receipts SET lease=? WHERE id=? AND status='pending' AND lease<? RETURNING id",
    )
      .bind(now + 30000, id, now)
      .first();
    if (!claim)
      return json(409, {
        error: "This enquiry is already being submitted. Please retry shortly.",
      });
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `biddigi-${id}`,
        },
        body: JSON.stringify(buildMail(data, env)),
        signal: AbortSignal.timeout(10000),
      });
      const receipt = await response.json();
      if (!response.ok || typeof receipt.id !== "string" || !receipt.id)
        throw Error("provider");
      await env.DB.prepare(
        "UPDATE receipts SET status='accepted',lease=0 WHERE id=?",
      )
        .bind(id)
        .run();
      try {
        await count(env, "enquiry_accepted", data.role);
      } catch {}
      return json(200, { ok: true, reference: id });
    } catch {
      await env.DB.prepare("UPDATE receipts SET lease=0 WHERE id=?")
        .bind(id)
        .run();
      return json(502, {
        error:
          "We could not confirm receipt. Your details are still here; retry the same enquiry.",
      });
    }
  } catch (e) {
    return json(e.status || 503, {
      error:
        e.error ||
        "Online enquiries are temporarily unavailable. Your details have not been sent.",
    });
  }
}
