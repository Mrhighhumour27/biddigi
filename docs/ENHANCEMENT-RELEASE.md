# Biddigi enhancement release — 5 November 2026

Implemented: equal publisher/advertiser homepage paths; platform comparison and campaign deliverables; one authentic gallery per platform page; consolidated runtime stylesheet `src/site.css` (older stylesheets retained as historical source, no longer imported); cream/charcoal/orange palette; public source links remain removed; original marks retained; basic calculator and role/platform enquiry context preserved; organization metadata; Pages Functions for config, enquiries and aggregate events.

## Activation required
The owner confirmed Resend and Turnstile are not configured. Browser access is blocked by a missing browser-plugin module; no authenticated hosting setup was performed. No live email or analytics collection is claimed.

1. In the existing Cloudflare account create a D1 database named `biddigi-site`; apply `migrations/0001_enquiries.sql` using `wrangler d1 execute biddigi-site --remote --file migrations/0001_enquiries.sql`. Bind it to this Pages project as `DB`, including the preview environment when testing.
2. Set `SITE_ORIGIN=https://biddigi.io`; use the exact preview origin in preview. Set private `RATE_LIMIT_SECRET` to a random high-entropy value.
3. Verify a Resend sending domain and configure server-side `RESEND_API_KEY`, `EMAIL_FROM`, and the existing private `ENQUIRY_TO`. Do not add credentials to Vite variables or Git. Provider verification and credentials are outstanding.
4. Create a Turnstile widget for the approved production hostname and configure `TURNSTILE_SITE_KEY` and private `TURNSTILE_SECRET_KEY`. The widget action is `enquiry`; the server verifies action, hostname and token validity. Preview keys and origins must be explicitly configured for previews.
5. Enable Cloudflare Web Analytics and set the public `WEB_ANALYTICS_TOKEN` in Pages. Do not also enable automatic beacon injection, which would duplicate page views. Events require DB and RATE_LIMIT_SECRET; only allowlisted fields are accepted. Client events cannot increment accepted-enquiry counts.
6. Redeploy after bindings/settings changes. Check `/api/config` reports readiness without exposing secrets, then send the owner-approved designated test and confirm receipt in the receiving inbox. No automatic test email has been sent.

Enquiry receipts contain only ID, hash, state and lease; no form contents. Atomic SQLite counters and leases coordinate instances. Provider payload and idempotency keys remain stable across retries; verification tokens are refreshed separately. Receipts expire after 24 hours. Rate keys are salted and window-specific. Events contain daily counts only; expired counters/receipts and event days older than 90 days are purged when requests are processed. No scheduled purge is configured. A pending provider request can be retried after its 30-second lease, using the same provider key.

## Validation
Build/prerender of 13 routes and 36 automated tests pass. Cloudflare Functions bundle compiles with Wrangler. Tests use an actual SQLite adapter and mocked provider/verification calls; they do not prove production inbox delivery. Compressed initial JavaScript approximately 95 KB.

Still required: browser screenshots at 320/390/768/1440px, 200% zoom, keyboard/mobile visual checks and Lighthouse accessibility measurement. Browser integration currently fails before connection due to its missing cached runtime module. No visual acceptance or Lighthouse score is claimed.

Production release uses the current Git-connected Cloudflare Pages project. The prior release is commit f4cc47f and remains available for rollback. Frontend and API code can deploy before activation; the form displays an explicit unavailable state and prevents submission until configuration is ready.
