import {
  json,
  input,
  sameOrigin,
  rate,
  count,
} from "../../server/cloudflare-shared.mjs";
export async function onRequest({ request, env }) {
  try {
    if (!sameOrigin(request, env)) return json(403, {});
    const data = await input(request, 1024);
    const allowed = [
      "journey_selection",
      "platform_selection",
      "enquiry_start",
      "enquiry_error",
    ];
    if (
      !allowed.includes(data.event) ||
      Object.keys(data).some((k) => !["event", "role", "platform"].includes(k))
    )
      return json(422, {});
    if (
      data.role &&
      !["publisher", "advertiser", "demand-partner"].includes(data.role)
    )
      return json(422, {});
    if (
      data.platform &&
      !["jiohotstar", "prime-video", "sonyliv", "youtube", "zee5"].includes(
        data.platform,
      )
    )
      return json(422, {});
    await rate(request, env, "events", 60);
    await count(env, data.event, data.role || "", data.platform || "");
    return json(200, { ok: true });
  } catch (e) {
    return json(e.status || 503, { ok: false });
  }
}
