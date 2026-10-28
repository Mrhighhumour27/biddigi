# Biddigi website plan — version 2

Superseded for visual direction by the owner's subsequent request to replace V3 with a more distinctive, researched design. Business scope and delivery requirements remain in force. See `V4-IMPLEMENTATION.md` and ADR-005 for the current signal-architecture implementation and verification status. Manrope, flat illustrations and static-only motion in this historical document are no longer the active visual constraints.

Date: 26 October 2026. Status: implemented locally; production configuration and release checks pending. See `IMPLEMENTATION.md` for executed evidence.

This is the consolidated implementation brief. It retains the owner-approved redesign and incorporates ADR-001 and ADR-002. Agreement on a design is not evidence of customer usability, conversion performance or production readiness.

## 1. Goal and fixed choices

Make Biddigi easy to understand, distinctive and credible, with a clear route to a qualified enquiry. Lead with publisher monetization; provide separate advertiser and demand-partner journeys.

- Preserve the supplied orange/black emblem and wordmark. Match production brand assets against the supplied reference.
- Retain Manrope and the warm off-white, ink and orange direction, subject to prototype validation.
- Keep 13 routes, including the OTT hub and five platform pages. Navigation: **Publishers · Advertisers · OTT Ads · About · Discuss your project**.
- Owner confirms all existing service categories are available. Do not infer an official partnership, owned exchange, guaranteed access or guaranteed performance from that confirmation.
- Qualified enquiries go to the owner-approved inbox through private server configuration. Never expose delivery credentials or receiving address in browser bundles.
- Retain React, TypeScript and Vite. Do not migrate the framework or host just to implement this redesign.

## 2. Creative system

**Core idea: follow one advertising opportunity from a publisher's content to a measurable impression.**

Use a recurring fictional publication, clearly marked as an example, and one fictional advertiser creative. Carry the same ad placement through the auction, device context and metric explanation. This replaces disconnected device photographs and unrelated SaaS mockups.

Use a single curved connector inspired by the divided emblem. The connector organizes the story; it does not suggest proprietary network topology. Keep the real logo still and undistorted.

### Visual specification

| Element | Default |
| --- | --- |
| Page background | `#F7F7F2` |
| Illustration/paper surface | `#FFFFFF` |
| Primary ink | `#171A18` |
| Secondary text | `#626961` on light backgrounds |
| Brand accent | `#FF6500`, provisional until matched to the supplied asset |
| Ordinary accent links | Underlined `#A83E00` on light surfaces |
| Primary controls | Bright orange with ink text; clear ink focus treatment |
| Font | Self-hosted Manrope, body 400–500, headings 600 |
| Scale | Fluid hero 40–72px, readable body 17–18px |
| Grid | Maximum 1200px; 12-column desktop, single-column mobile |
| Spacing | 8px scale; approximately 96px desktop / 56px mobile section gaps |
| Surfaces | 8–16px radii, thin borders, sparse shadows |

Use one ink-colored section for rhythm. Use open layout and alignment rather than placing every paragraph in a rounded card. Keep navigation a simple sticky bar.

Measured solid-color contrast: orange/white 2.95:1, ink/orange 5.94:1, secondary/off-white 5.26:1, dark-orange/white 6.26:1. Bright orange is unsuitable for ordinary text on white. Do not rely on it alone for an essential control boundary or selected state; use a label, check, underline or ink border as well. Recheck final states, images and rendered typography.

### Illustrations and motion

- **Auction:** static full overview immediately; four optional manually selected stages: available placement, eligible buyer responses, configured auction selection, ad served. Do not imply Biddigi owns the auction runtime or universally chooses the winning bid. Explain eligibility, not just the largest number.
- **Placement lens:** one coherent illustrated screen switches between Web, App, Video and CTV. Highlight the ad placement, not the device decoration. All substantial format descriptions remain accessible.
- **Metric trace:** compact static example on the homepage; fuller user-selectable explanation on Publishers. Clearly label all sample figures. Keep the sample placement identity consistent with the rest of the story.
- **Campaign storyboard:** four concise stages, brief → plan and creative preparation → platform review and launch coordination → delivery review. Use static illustrations first.
- **Format preview:** only use a demo that depicts the named placement. Prefer original annotated illustrations when suitable reference footage is unavailable. Any video is explicitly started, controllable, and paused offscreen.

Homepage maximum: **two interactive teaching surfaces**, auction and placement. No timed hero playback, infinite decoration, scroll locking, cursor effects or logo animation. Controls respond in 120–180ms and scene transitions in 240–360ms. Reduced motion changes states immediately. No essential content depends on hover, animation, or scrolling at a particular speed.

## 3. Sitemap and homepage

| Route | Role |
| --- | --- |
| `/` | Explain publisher value and route visitors to appropriate detail |
| `/publishers` | Property types, integrations, auctions, optimization, reporting, onboarding, calculator and FAQs |
| `/advertisers` | Campaign services, audience/inventory discussion and demand-partner enquiries |
| `/ott-ads` | OTT and video service hub, platform discovery and undecided campaign path |
| `/jiohotstar-ads` | JioHotstar detail; preserve existing URL |
| `/prime-video-ads` | Prime Video detail |
| `/sonyliv-ads` | Sony LIV detail |
| `/youtube-ads` | YouTube online-video detail |
| `/zee5-ads` | ZEE5 detail |
| `/about` | Verified Expoworld relationship, entities, operating approach and team information |
| `/contact` | One short contextual enquiry form |
| `/privacy` | Actual enquiry processing and website data practices |
| `/terms` | Approved website terms and illustrative-tool context |

### Homepage narrative

1. **Hero:** “Turn your audience into ad revenue.” Explain plainly that Biddigi helps connect website, app and video ad space with buyers and improve the ad setup. Primary **Discuss my ad setup**; secondary **See how it works**. The full conceptual scene is readable without interaction.
2. **Why Biddigi:** a short responsibility strip, integrated with the explanation rather than a new oversized section. **You bring:** content, audience and property. **Biddigi supports:** buyer connections, setup review, optimization and reporting. **Agreed together:** integration and commercial scope. Platform-controlled eligibility, availability and approvals are explained visibly where relevant.
3. **Placement lens:** Web, App, Video and CTV with concise audience-experience descriptions and one publisher-details link.
4. **Understand and improve:** three service responsibilities with a compact, clearly labeled metric example. Link to full reporting education; no standalone pretend dashboard or unsupported growth chart.
5. **Getting started:** property review → integration/commercial agreement → launch and approval process → performance review. Pair with verified company details or permitted proof. No empty logo wall or fabricated results.
6. **Advertiser and OTT path:** concise secondary introduction and a route to the OTT hub. Keep it visually subordinate to publisher value.
7. **Practical FAQs and final CTA:** who it suits, existing setup compatibility, what affects earnings, and what is needed to start.

Do not put the calculator in the homepage hero or navigation. Preserve existing fragment links using relevant sections or compatibility navigation without restoring large obsolete sections.

## 4. Detail-page requirements

### Publishers

Keep a scan-level plain-language explanation visible for every service. Use semantic disclosures for optional technical detail. Scope, important requirements, caveats and primary actions must remain visible without opening a disclosure.

Explain web/app/video/CTV suitability; buyer competition; placement and pricing review; reporting; integration review; and the onboarding process. Avoid calling the service fully managed until responsibilities are confirmed in operational copy.

Calculator appears low on this page. Formula: monthly impressions ÷ 1,000 × eCPM. Optional comparison starts with equal assumptions until edited. Label currency and fee exclusions, support keyboard-editable numeric fields, and reject invalid input clearly. No baked-in uplift or implied Biddigi forecast.

### Advertisers and OTT

Advertisers explains Biddigi's campaign support and gives demand partners a direct inventory discussion path. OTT navigation label remains **OTT Ads**; hub heading is **OTT and video advertising**, identifying YouTube as online video.

Use five compact text-led platform entries with distinct viewing context, confirmed placement descriptions, an Explore link and an accessible platform name. Avoid dense equivalence grids, recommended rankings, yes/no capability columns, invented CPMs, audience reach or guaranteed placement.

Visitors who know their platform can go directly to its page. **Not sure? Discuss a campaign** leads to the campaign form with no platform required. This is not a recommendation quiz or automatic media planner.

Each platform detail has a distinct proposition, suitable objectives, confirmed placement descriptions, audience/device/geography considerations, creative preparation guidance, quotation explanation, platform-specific FAQs and a contextual CTA. Shared process can be reused; page-specific information cannot be filler.

Platform eligibility, creative approval and available inventory remain subject to the relevant platform. Biddigi and the visitor agree the support and commercial scope; they do not jointly grant a platform's approval.

Maintain source URLs and review dates in internal content data. Publish useful source attribution near specifications, without cluttering the product with internal verification badges. Omit unavailable numeric specifications until confirmed. Never reuse one platform's requirements for all five.

### About and trust

Use verified entities, locations, Expoworld relationship, real team information if supplied, and actual process. Customer evidence requires support and permission. Represent reporting with real screenshots where appropriate; otherwise label it a conceptual illustration. Do not claim partner status merely because a platform can be discussed or serviced.

## 5. Enquiry experience and interface amendments

CTA vocabulary is consistent: publisher **Discuss my ad setup**; campaign **Request a media plan**; neutral navigation **Discuss your project**. CTA intent and selected platform arrive at `/contact` visibly preselected and editable. Demand-partner enquiries have their own role. Never force a repeated role-selection gate after a contextual CTA.

Use a single page rather than a wizard. Common information: name, email, role, property/brand/company identifier as appropriate, and a useful brief. Do not ask a publisher for the same property identity twice under separate mandatory company and property fields.

- Publisher: website or app-store URL where public; explicit **Not live yet / need guidance** alternative for a nonpublic property. Require useful brief context rather than a fabricated URL. Property type is optional/editable with **Not sure**; do not infer it authoritatively from the URL.
- Campaign: platform choices optional, with **Need guidance**; objective and geography can use the same guidance option. Budget and timing are optional.
- Demand partner: organization and inventory requirements, without irrelevant publisher traffic or campaign fields.
- Traffic, current setup and additional technical detail live under **Add details (optional)**. Labels explain the requested unit; no eCPM knowledge is required to enquire.
- Preserve common values when roles change. Preserve relevant selected-platform context, browser-back behavior and values after errors. Hidden optional fields must not create invisible validation blockers.

Show a concise next-step explanation beside the form: Biddigi reviews the brief and contacts the visitor to discuss suitable options and scope. Do not promise an audit, written proposal, fixed response time or booking until that operational commitment is confirmed.

The backend and frontend validation must be revised together to support these guidance paths. The draft handler's always-required publisher URL/company and campaign fields are not the final experience contract. Changing a role must not cause old hidden role-specific fields to be required.

Retain same-origin `POST /api/enquiries`, server validation and private configuration. Errors identify fields and give a correction; a focusable summary and field association support keyboard/screen-reader recovery. Success appears only after verified server/provider acceptance; public release additionally requires observed inbox receipt. Provider acceptance is not proof a particular email arrived.

Use a logical submission identity stable across retries, distinguishing later intentional submissions with identical text. Verify rate limiting and duplicate-safe behavior on the real host and proxy, not just a local single process. Keep credentials server-side; preserve form values on failure; never put submitted contents into analytics.

## 6. Implementation sequence

1. Confirm actual hosting/API/runtime/proxy topology and sender configuration. Inventory source material, legal copy, data retention/contact, and permitted media. Do not block static design on missing mail credentials.
2. Produce coherent desktop/mobile static views: homepage, OTT hub, one platform detail and enquiry page. Review hierarchy, diagram role labels, contrast and CTA context.
3. Build a complete vertical slice: home → Publishers → enquiry → real inbox, plus one OTT page → platform-selected enquiry. Implement shared components, real build-time HTML and deterministic hydration together.
4. Expand the tested templates to all 13 routes. Add only the interactions specified here; preserve static comprehension and reduced-motion behavior.
5. Verify and release the complete site atomically, retaining a rollback path. Do not switch shared entrypoints to replacement modules until those modules exist and pass checks.

Keep explicit routes, unique title/description/canonical/share metadata, sitemap, robots and genuine 404 responses. Remove overlapping global reveal effects, indefinite SVG animations and legacy fake receipt behavior. Current draft Resend code is a candidate adapter, not a mandate to change hosting or purchase a service.

## 7. Acceptance and measurement

- Directional usability sessions with representative publishers and advertisers: can they explain Biddigi's role, distinguish ownership, find the correct service and predict the next step? Use the ADR-001 4-of-5 checks to find issues, not claim statistical validation.
- Test a publisher with an app-store URL, a nonpublic property, unknown traffic, an advertiser without a chosen platform/budget, and a demand partner. All can send a meaningful brief without inventing figures.
- Check all contextual CTAs, role changes, selected-platform persistence, back navigation, field errors and unavailable delivery. No completion-rate uplift claim without measured evidence.
- Verify platform entries help exploration without implying equivalent inventory, guaranteed outcomes or Biddigi-owned platform approval.
- Confirm all 13 direct routes, substantive visible HTML, hydration, unique metadata, legacy links and unknown-path 404.
- Keyboard operation, semantic disclosure controls, focus, screen-reader labels, reduced motion, 320px width, mobile keyboard and 200% zoom. Target WCAG 2.2 AA; optional motion protections can exceed its minimum.
- Confirm actual inbox receipt, two-client proxy quota separation, duplicate-safe timeout retry and appropriate multi-instance behavior before public release.
- Target LCP ≤2.5s, INP ≤200ms and CLS ≤0.1; initial compressed JavaScript ≤200KB and hero visual assets ≤150KB. Distinguish lab checks from field evidence.
- Track contextual CTA clicks, form starts, accepted submissions and operational delivery failures without personal form content. Evaluate qualified-enquiry quality with the owner; do not optimize raw submission count alone.

## 8. Evidence, status and reopening

ADR-001 records the earlier source checks, eight mocked backend tests passing and TypeScript failing because the interrupted frontend's `Site` module is missing. Those are historical results, not a new successful build. This planning pass changes documentation only; no application repair, deployment, user test or real email send was performed.

New evidence in this pass: solid-color contrast calculations and review of authoritative accessibility guidance. Two real isolated reviewers proposed improvements, exchanged concrete challenges, revised the proposal and reported no remaining objection to the requirements. Usability and conversion remain hypotheses until the prototype is tested.

Relevant references:

- [W3C contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [W3C accessible forms](https://www.w3.org/WAI/tutorials/forms/)
- [W3C form notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [W3C interaction animation guidance](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)
- [Amazon Ads: Prime Video](https://advertising.amazon.com/products/prime-video-ads)
- [Sony LIV advertising](https://advertisewithus.sonyliv.com/)
- [YouTube Ads](https://business.google.com/in/ad-solutions/youtube-ads/)

Reopen a decision only if the owner changes requirements, verified platform details change, the host invalidates the adapter, or prototype/production checks reveal a failure. Keep the settled brand, business priority and 13-route scope otherwise.
