import { createHash } from "node:crypto";
import { isIP } from "node:net";

const ROLES = new Set(["publisher", "advertiser", "demand-partner"]);
const PLATFORMS = new Set([
  "JioHotstar",
  "Prime Video",
  "Sony LIV",
  "YouTube",
  "ZEE5",
]);
const MAX_BODY = 16 * 1024;
const text = (value, limit = 2000) =>
  typeof value === "string" ? value.trim().slice(0, limit) : "";
const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const submissionPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateEnquiry(input) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { error: "Please provide your enquiry details." };
  const role = text(input.role, 40);
  const data = {
    submissionId: text(input.submissionId, 100).toLowerCase(),
    role,
    name: text(input.name, 100),
    email: text(input.email, 254),
    company: text(input.company, 200),
    brief: text(input.brief, 4000),
    propertyUrl: text(input.propertyUrl, 500),
    propertyType: text(input.propertyType, 60),
    propertyStatus:
      input.propertyStatus === "not-public" ? "not-public" : "public",
    traffic: text(input.traffic, 100),
    currentSetup: text(input.currentSetup, 1000),
    objective: text(input.objective, 500) || "Need guidance",
    geography: text(input.geography, 200) || "Need guidance",
    budget: text(input.budget, 100),
    timing: text(input.timing, 200),
    platforms: Array.isArray(input.platforms)
      ? [...new Set(input.platforms.filter((x) => PLATFORMS.has(x)))]
      : [],
  };
  if (!submissionPattern.test(data.submissionId))
    return {
      error: "Please refresh the page and try your enquiry again.",
      fields: { submissionId: "A valid submission identifier is required." },
    };
  if (!ROLES.has(role)) return { error: "Please choose your enquiry type." };
  const fields = {};
  if (data.name.length < 2)
    fields.name = "Please enter your name (at least two characters).";
  if (!emailPattern.test(data.email) || /[\r\n]/.test(data.email))
    fields.email = "Please enter a valid email address.";
  if (!data.company)
    fields.company = "Please enter your property, brand or organization name.";
  if (data.brief.length < 10)
    fields.brief = "Please describe your project in at least 10 characters.";
  if (
    role === "publisher" &&
    data.propertyStatus !== "not-public" &&
    !data.propertyUrl
  )
    fields.propertyUrl =
      "Enter a website or app-store URL, or choose Not live yet / need guidance.";
  if (role === "publisher" && data.propertyUrl) {
    try {
      const url = new URL(data.propertyUrl);
      if (
        !["https:", "http:"].includes(url.protocol) ||
        !url.hostname ||
        url.username ||
        url.password
      )
        throw new Error();
    } catch {
      fields.propertyUrl =
        "Please enter a complete website or app-store URL beginning with https:// or http://.";
    }
  }
  if (Object.keys(fields).length)
    return { error: "Please check the highlighted enquiry details.", fields };
  return { data };
}

const normalizeIp = (value) => String(value || "").replace(/^::ffff:/, "");
function clientIdentity(req, env) {
  // Production must explicitly choose the mode for its verified hosting topology.
  const mode =
    env.ENQUIRY_RATE_LIMIT_MODE ||
    (env.NODE_ENV === "production" ? "" : "socket");
  if (mode === "edge") {
    if (env.ENQUIRY_EDGE_RATE_LIMIT_CONFIRMED !== "true")
      return { error: "Edge enquiry rate limiting is not configured." };
    return { edge: true };
  }
  const peer = normalizeIp(req.socket?.remoteAddress);
  if (mode === "socket")
    return isIP(peer)
      ? { key: peer }
      : { error: "Client identity is unavailable." };
  if (mode === "trusted-header") {
    const trustedPeers = String(env.ENQUIRY_TRUSTED_PROXY_IPS || "")
      .split(",")
      .map((value) => normalizeIp(value.trim()))
      .filter(Boolean);
    const headerName = String(env.ENQUIRY_CLIENT_IP_HEADER || "")
      .trim()
      .toLowerCase();
    const header = req.headers[headerName];
    // Only a proxy that strips/overwrites this single-value header is supported.
    if (
      !trustedPeers.includes(peer) ||
      !headerName ||
      typeof header !== "string" ||
      !isIP(normalizeIp(header.trim()))
    )
      return { error: "Trusted client identity is unavailable." };
    return { key: normalizeIp(header.trim()) };
  }
  return { error: "Enquiry rate limiting is not configured." };
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const parts = [];
    let size = 0;
    let oversized = false;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        if (!oversized) {
          oversized = true;
          parts.length = 0;
          reject(
            Object.assign(new Error("Your enquiry is too large."), {
              status: 413,
            }),
          );
        }
        return; // Drain without retaining the rest; keep the socket available for the 413 response.
      }
      parts.push(chunk);
    });
    req.on("end", () => {
      if (oversized) return;
      try {
        resolve(JSON.parse(Buffer.concat(parts).toString("utf8")));
      } catch {
        reject(
          Object.assign(new Error("Please send valid enquiry details."), {
            status: 400,
          }),
        );
      }
    });
    req.on("error", () =>
      reject(
        Object.assign(new Error("Unable to read your enquiry."), {
          status: 400,
        }),
      ),
    );
    req.on("aborted", () =>
      reject(
        Object.assign(new Error("Your enquiry was interrupted."), {
          status: 400,
        }),
      ),
    );
  });
}

function send(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  res.end(JSON.stringify(body));
}

/** Portable connect-style handler. Returns false for paths other than /api/enquiries. */
export function createEnquiryHandler({
  env = process.env,
  fetchImpl = fetch,
  now = Date.now,
} = {}) {
  const attempts = new Map();
  const submissions = new Map();
  const inFlight = new Set();
  const windowMs = 15 * 60 * 1000;
  return async function handleEnquiries(req, res) {
    if (req.url?.split("?")[0] !== "/api/enquiries") return false;
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      send(res, 405, { error: "Use POST to submit an enquiry." });
      return true;
    }
    const origin = req.headers.origin;
    const expectedOrigin = env.SITE_ORIGIN || `http://${req.headers.host}`;
    if (
      !origin ||
      origin !== expectedOrigin ||
      req.headers["sec-fetch-site"] === "cross-site"
    ) {
      send(res, 403, { error: "Please submit the enquiry from this website." });
      return true;
    }
    if (
      String(req.headers["content-type"] || "")
        .toLowerCase()
        .split(";")[0]
        .trim() !== "application/json"
    ) {
      send(res, 415, { error: "Please send JSON enquiry details." });
      return true;
    }
    const current = now();
    for (const [key, value] of attempts)
      if (value.expires < current) attempts.delete(key);
    for (const [key, value] of submissions)
      if (value.expires < current) submissions.delete(key);
    const identity = clientIdentity(req, env);
    if (identity.error) {
      send(res, 503, {
        error:
          "Online enquiries are temporarily unavailable. Your details have not been sent. Please try again later.",
      });
      return true;
    }
    if (!identity.edge) {
      const limit = attempts.get(identity.key) || {
        count: 0,
        expires: current + windowMs,
      };
      if (limit.count >= 8) {
        res.setHeader(
          "Retry-After",
          String(Math.ceil((limit.expires - current) / 1000)),
        );
        send(res, 429, {
          error: "Too many attempts. Please try again in 15 minutes.",
        });
        return true;
      }
      // Cap process-local buckets to keep random client traffic from growing memory indefinitely.
      if (!attempts.has(identity.key) && attempts.size >= 10000) {
        send(res, 503, {
          error: "Online enquiries are busy. Please try again shortly.",
        });
        return true;
      }
      limit.count++;
      attempts.set(identity.key, limit);
    }
    let input;
    try {
      input = await readJson(req);
    } catch (error) {
      send(res, error.status || 400, { error: error.message });
      return true;
    }
    if (text(input?.website)) {
      send(res, 400, { error: "Unable to submit this enquiry." });
      return true;
    }
    const result = validateEnquiry(input);
    if (result.error) {
      send(res, 422, { error: result.error, fields: result.fields });
      return true;
    }
    if (
      !env.RESEND_API_KEY ||
      !env.EMAIL_FROM ||
      !emailPattern.test(env.ENQUIRY_TO || "mrhighhumour@gmail.com")
    ) {
      send(res, 503, {
        error:
          "Online enquiries are temporarily unavailable. Your details have not been sent. Please try again later.",
      });
      return true;
    }
    const payload = result.data;
    const fingerprint = createHash("sha256")
      .update(JSON.stringify(payload))
      .digest("hex");
    const key = payload.submissionId;
    const previous = submissions.get(key);
    if (previous && previous.fingerprint !== fingerprint) {
      send(res, 409, {
        error:
          "This submission identifier belongs to different enquiry details. Please start a new submission.",
      });
      return true;
    }
    if (previous?.accepted) {
      send(res, 200, { ok: true, reference: key });
      return true;
    }
    if (inFlight.has(key)) {
      send(res, 409, {
        error:
          "This enquiry is already being submitted. Please wait before trying again.",
      });
      return true;
    }
    if (!previous && submissions.size >= 10000) {
      send(res, 503, {
        error: "Online enquiries are busy. Please try again shortly.",
      });
      return true;
    }
    // Keep the normalized payload identity even after failure; an unedited retry reuses the provider key.
    submissions.set(key, {
      fingerprint,
      expires: current + 24 * 60 * 60 * 1000,
      accepted: false,
    });
    inFlight.add(key);
    const reference = key;
    const label =
      payload.role === "publisher"
        ? "Publisher"
        : payload.role === "demand-partner"
          ? "Demand partner"
          : "Advertiser / OTT";
    const content = Object.entries(payload)
      .map(
        ([key, value]) =>
          `${key}: ${Array.isArray(value) ? value.join(", ") || "Need guidance" : value || "Not provided"}`,
      )
      .join("\n\n");
    try {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `biddigi-${key}`,
        },
        body: JSON.stringify({
          from: env.EMAIL_FROM,
          to: [env.ENQUIRY_TO || "mrhighhumour@gmail.com"],
          reply_to: payload.email,
          subject: `Biddigi ${label} enquiry`,
          text: `Website enquiry reference: ${reference}\n\n${content}`,
        }),
        signal: AbortSignal.timeout(10000),
      });
      const receipt = await response.json().catch(() => ({}));
      if (!response.ok || !receipt.id)
        throw new Error("Mail provider did not accept the enquiry.");
      submissions.set(key, {
        fingerprint,
        expires: current + 24 * 60 * 60 * 1000,
        accepted: true,
      });
      send(res, 200, { ok: true, reference });
    } catch {
      send(res, 502, {
        error:
          "We could not confirm receipt of your enquiry. Your details are still here; retry to check the same submission.",
      });
    } finally {
      inFlight.delete(key);
    }
    return true;
  };
}
