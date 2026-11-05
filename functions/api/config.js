import { json } from "../../server/cloudflare-shared.mjs";
export function onRequestGet({ env }) {
  return json(200, {
    enquiriesReady: Boolean(
      env.SITE_ORIGIN &&
      env.DB &&
      env.RATE_LIMIT_SECRET &&
      env.RESEND_API_KEY &&
      env.EMAIL_FROM &&
      env.ENQUIRY_TO &&
      env.TURNSTILE_SECRET_KEY &&
      env.TURNSTILE_SITE_KEY,
    ),
    turnstileSiteKey: env.TURNSTILE_SITE_KEY || "",
    analyticsToken: env.WEB_ANALYTICS_TOKEN || "",
  });
}
