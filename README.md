# Biddigi website

The current interface is the signal-architecture revision requested after V3: a dimensional ad cutaway, shared placement transitions and a cinematic OTT atlas. See [current implementation and verification](docs/V4-IMPLEMENTATION.md) and [research/decision record](docs/decisions/ADR-005-signal-architecture.md). Earlier V2/V3 screenshots are historical.

Publisher-first marketing website with 13 prerendered pages, original ImageGen artwork composed in HTML, controlled Motion interactions, contextual enquiries and a server-only transactional mail adapter.

## Local development

Use Node 22.18+ and npm.

```powershell
npm ci
npm run dev
```

Vite prints the preview URL. Its same-origin `/api/enquiries` middleware uses server-only variables from `.env.local`; without mail setup it returns an honest unavailable response, never a fake receipt.

## Build and verification

```powershell
npm test
npm run lint
```

`npm test` first builds the client, server rendering bundle and static documents, then runs the automated tests. `npm run build` is also available independently. Build output is in `dist/` (13 pages, 404, sitemap, robots, fonts and assets). `dist-ssr/` supports build-time rendering only.

```powershell
npm start
```

The portable production server defaults to `http://127.0.0.1:4173`, serves the generated HTML, and returns true 404s. Configure `PORT` as needed. Do not deploy only `dist/` while assuming it contains a working API: the current host must also route `/api/enquiries` to the Node handler or an equivalent adapter.

## Production email setup

See [enquiry delivery](docs/ENQUIRIES.md) and `.env.example`. Configure a verified sender, Resend API key, exact public origin and the actual hosting rate-limit topology. The approved recipient remains server-side. Do not use a `VITE_` variable for credentials or the receiving inbox.

Production submission intentionally remains unavailable until sender and abuse controls are configured. Local mocked tests do not prove inbox delivery. Confirm an approved production test reaches the receiving inbox before release. Final privacy retention/contact details and service copy require operator review; do not treat the generated privacy and website information pages as a complete jurisdiction-specific service agreement.

## Structure

- `src/redesign/`: shared page system, route/content registries, illustrations, calculator and enquiry form.
- `src/entry-server.tsx` + `scripts/prerender.mjs`: real HTML generation and page metadata.
- `server/`: portable static server and validated, retry-safe enquiry handler.
- `tests/`: delivery, calculator, route, HTML and metadata checks.
- `docs/WEBSITE-PLAN.md`: consolidated design/content specification.
- `docs/IMPLEMENTATION.md`: implementation evidence and remaining release dependencies.
- `docs/decisions/`: consequential review decisions and implementation corrections.

Old components remain as source reference and are not imported into the new application. Tailwind scans only `src/redesign/`, so unused legacy utility classes do not inflate the production CSS. No old timer-based submission or continuous animation runs in the new site.

## Interaction and analytics

The site dispatches `biddigi:analytics` custom events for CTA clicks, enquiry starts, accepted submissions and errors. Events contain only event name, role/page context where relevant; form contents are excluded. No external analytics service is installed or contacted by this implementation. Connect an approved analytics adapter if persistent measurement is required.

All diagrams work as static explanations and optional manual states. Reduced-motion settings remove transitions. Illustrative figures are not customer results. Platform source references live with the typed platform content; numeric specifications are omitted when not confirmed.
