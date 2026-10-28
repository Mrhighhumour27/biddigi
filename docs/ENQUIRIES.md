# Website enquiry delivery

`server/enquiries.mjs` exports `createEnquiryHandler(options)`, a connect-style async `(req, res)` handler. It returns `false` for other routes and `true` after handling `/api/enquiries`. Mount this before the Vite or production static middleware.

## Production setup

Keep the current host. Route `/api/enquiries` to the Node handler or mount it in an equivalent serverless adapter. `server/start.mjs` is a portable Node HTTP server for the generated `dist` site; it returns real HTTP 404 responses for unknown pages. Run a supported Node version with fetch, AbortSignal.timeout, and environment-file support (Node 22+).

1. Confirm the actual production host and API runtime. Resend is the supplied adapter, not a requirement to change hosting or purchase a service. Configure its verified sending domain and API key if this adapter is selected. No email is sent during tests.
2. Copy `.env.example` to ignored `.env.local`; set `EMAIL_FROM`, `RESEND_API_KEY`, and exact public `SITE_ORIGIN` (scheme and host, no trailing slash). `ENQUIRY_TO` initially uses the owner-approved inbox. None of these variables use a `VITE_` prefix.
3. Choose the rate-limit topology below and test it on the real host. The standalone server defaults to production behavior and refuses unconfigured client identity. Build the website and run `node --env-file=.env.local server/start.mjs`. Configure the existing reverse proxy/TLS host to route requests to it. On local HTTP previews set SITE_ORIGIN to the exact preview origin, e.g. `http://localhost:5173`.
4. Send an owner-approved test enquiry through production and confirm receipt. Provider acceptance is not proof of inbox delivery; verify the receiving inbox before release. The current repository contains no verified production host, verified sender or delivery credentials, so production inbox delivery remains unverified.

Without mail configuration the endpoint returns 503, never a false success. Failed provider requests return 502. Success means the configured transactional provider accepted the message and returns `{ "ok": true, "reference": "..." }`.

## Request contract

POST JSON to `/api/enquiries` from the same origin. `role` is `publisher`, `advertiser`, or `demand-partner`. Required common strings: UUID `submissionId`, `name`, `email`, `company` (one role-specific property/brand/organization identifier), and `brief` (10 characters minimum). Public publisher properties supply an absolute HTTP(S) `propertyUrl`, including app-store pages. `propertyStatus: "not-public"` allows a not-live/guidance enquiry without a fabricated URL. `propertyType` is optional. Advertiser `objective` and `geography` may be `Need guidance`; omitted values normalize to that text. Optional strings: `traffic`, `currentSetup`, `budget`, `timing`. `platforms` is an optional array drawn from `JioHotstar`, `Prime Video`, `Sony LIV`, `YouTube`, `ZEE5`. The `website` honeypot must be empty. Errors include human-readable `error` and may include field-level `fields` messages; preserve entered values and show the summary in a live region.

The handler limits requests to 16KB, rejects cross-origin submission, validates server-side and prevents concurrent duplicate delivery. Keep common values on a role change, and do not require hidden old-role fields. No form contents are logged or sent to analytics. The mail provider and receiving inbox retain messages according to their configured policies; the operator must set and document a retention period before release.

## Client identity and rate limiting

Production requires an explicit `ENQUIRY_RATE_LIMIT_MODE`. Development defaults to `socket`. Three supported modes:

- `socket`: only for a host where the socket address represents the actual client. Eight attempts per client per 15 minutes are enforced in-process. Arbitrary `X-Forwarded-For` headers are ignored.
- `trusted-header`: set `ENQUIRY_TRUSTED_PROXY_IPS` to comma-separated exact upstream socket IPs and `ENQUIRY_CLIENT_IP_HEADER` to a single-IP header the trusted proxy removes/replaces on every request. Requests from any other socket, missing/invalid header, or comma-separated forwarded chains are refused. IPv4-mapped socket addresses are normalized. Do not enable merely because the request contains a client-IP header; the proxy boundary must be independently verified.
- `edge`: use the host's real per-client edge rate limiter and set `ENQUIRY_EDGE_RATE_LIMIT_CONFIRMED=true` only after configuring and testing it. The handler then does not apply a shared socket quota that could block all proxy users.

For production behind a proxy, verify two distinct clients do not share a quota. Multi-instance deployment needs an edge/shared rate limiter; the local maps are bounded defensive caches, not distributed abuse prevention. Missing or invalid identity configuration returns an honest 503 without attempting delivery.

## Submission identity and retries

The browser generates a UUID for one logical submission. An unedited timeout/retry reuses it; editing the payload or deliberately starting a later enquiry generates a new UUID. The normalized request has a deterministic reference/body and sends `Idempotency-Key: biddigi-{submissionId}`. In-process normalized payload fingerprints reject reuse of an ID for different data, and concurrent submissions with the same ID return 409. A fresh instance uses the same provider key and body, allowing the provider to reconcile an accepted-but-timed-out request.

[Resend retains idempotency keys for 24 hours](https://resend.com/docs/dashboard/emails/idempotency-keys). The browser does not persist drafts or submission identities across sessions. Do not automatically replay old submissions after that window; add durable receipts if the host requires longer-lived queues or retry guarantees. Configuration/sender changes can alter the provider payload and must not occur mid-retry without reconciliation. Provider acknowledgement means accepted for sending, not delivered to the inbox. Keep all failures explicit and preserve the visitor's values.

## Tests

Run `node --test tests/server-enquiries.test.mjs`. Tests use a mocked mail provider and cannot send messages. Coverage includes guidance/nonpublic/app-store cases, missing configuration, rejection and timeout, malformed submissions, size/attempt limits, duplicates, new intentional same-content enquiries, retries through a fresh instance, trusted-proxy client separation and production topology refusal. These tests do not replace actual-host proxy and receiving-inbox checks.
