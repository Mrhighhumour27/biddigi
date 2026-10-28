# Decision: Biddigi website plan review with Decision Intelligence

- ID: ADR-001
- Date: 2026-10-26
- Status: accepted
- Scope and impact: website design/content, medium; production enquiry delivery and deployment, high
- Related decisions: owner-approved website redesign plan in this chat; this record amends its delivery sequence and acceptance requirements, not its chosen business scope.

## Objective and constraints

Build a professional, minimal website that explains Biddigi's publisher monetization service and produces qualified enquiries. Preserve the supplied orange/black emblem and wordmark. Publishers remain the primary audience. Advertisers and demand partners have their own paths. Navigation says **OTT Ads**; the hub includes JioHotstar, Prime Video, Sony LIV, YouTube and ZEE5, with YouTube identified as online video.

Keep all 13 approved routes: home, publishers, advertisers, OTT hub, five platform detail pages, about, contact, privacy and terms. Preserve `/jiohotstar-ads` and useful legacy anchors. Keep React, Vite and TypeScript. Configure the owner-approved recipient server-side; never put mail credentials or the receiving inbox in browser bundles.

The owner paused implementation to install this skill and review the plan. Application work remains paused. This review does not authorize publication, create provider accounts, send email, or change hosting.

## Skill and expert pairing

Installed from the supplied `decision-intelligence-skill-v2.zip` into `C:/Users/Work/.codex/skills/decision-intelligence`. All five extracted Markdown files match archive SHA-256 hashes. Read the skill, both reference documents and decision template.

Two actual subagents received identical shared facts and different charters. Initial proposals were collected before exchange:

- **A, website strategy/domain specialist:** optimize audience journeys, visual explanation, practical architecture and coherent content.
- **B, usability/trust and deployment reliability challenger:** test comprehension, unsupported claims, lost enquiries and deployment failure scenarios.
- **Arbiter:** the lead agent compared the proposals against the owner's requirements and actual source/test evidence.

## Triage and challenge

| Decision | Depth | Initial proposal and strongest challenge | Resolution |
| --- | --- | --- | --- |
| Audience and 13-route structure | Medium | A retained scope. B challenged thin, repetitive platform pages and validation occurring only after all pages exist. | Retain scope. Implement and verify a complete vertical slice first; require distinct platform-specific information before full release. |
| Visual identity and interactions | Medium | A retained warm off-white/ink/orange, Manrope and manual illustrations. B challenged decorative interaction that does not improve understanding. | Keep as proposed design direction, not a proven user outcome. Validate static explanation and mobile CTA before adding optional behavior. |
| React/Vite rendering and routing | High at deployment boundary | A favored real build-time HTML and hydration. B showed that a static deployment alone cannot run the new enquiry endpoint. | Keep stack and substantive prerendered content; establish the real host's runtime/API routing contract before promoting an adapter. No speculative host migration. |
| Qualified enquiry delivery | High | A required actual delivery. B identified reverse-proxy quota collapse, provider acceptance without inbox arrival, and process-local retry limitations. | Require host-aware abuse controls, stable submission identity, error recovery and an actual inbox receipt test before release. |
| Claims and service content | Medium; escalate consequential claims | A retained confirmed services and transparent examples. B challenged eligibility misconceptions and repeated placeholders in platform detail. | Use plain service claims, fictional data clearly marked, no unsupported partnerships, no implied highest-bid-only rule, and sourced platform-specific content. |

### Concrete failure scenarios

1. Thirteen attractive static pages deploy, but `/api/enquiries` is absent or rejects the production origin. Visitors cannot contact the team.
2. Behind a reverse proxy, every request has the same socket address. Eight attempts exhaust the draft handler's shared quota and block unrelated visitors.
3. A provider accepts a message, but the response times out. A retry reaches another server instance and sends a duplicate, or a payload-only key suppresses a later intentional enquiry.
4. A fictional auction highlights the largest number without explaining eligibility, teaching an incorrect auction rule.
5. Five platform pages repeat the same vague process instead of helping a buyer understand meaningful platform differences.

### A's response and B's final position

A accepted the vertical-slice sequence, actual-host topology discovery, authenticated client identity/edge controls, two-client quota test, stable retry identity and actual inbox receipt gate. A also accepted atomic implementation milestones so shared entrypoints are not switched before their replacement exists.

B reviewed the revision and considered the strongest objections addressed as requirements. Both agree to stop further debate until new evidence arrives. Remaining host, inbox and usability uncertainty is explicit; agreement is not verification.

## Revised implementation sequence

1. **Deployment discovery and content inventory:** identify the existing host, API runtime, TLS/proxy setup and instance topology; confirm sender setup, retained data/privacy contact, source references and usable media permissions. These are dependencies, not reasons to reopen settled branding or audience choices.
2. **Static design prototype:** homepage, OTT hub, one platform detail and enquiry flow at mobile and desktop sizes. Validate headline, static auction explanation, contrast, CTA and navigation before building additional interaction.
3. **Complete vertical slice:** shared navigation/footer; home to publisher details to contextual form to actual inbox; one OTT page to a platform-preselected form. Implement real HTML, deterministic hydration, accessible controls and error states together. Keep the prototype local until complete; it is not a public production lead path.
4. **Expand the proven system:** complete the remaining approved routes, platform details, neutral revenue arithmetic, reporting explanations, FAQs and legal content. Do not release placeholder detail pages. Numeric specifications unavailable from authoritative sources are omitted until confirmed, rather than copied from another platform.
5. **Atomic full release:** all 13 routes, API routing, configuration, real inbox delivery and rollback path pass acceptance before publication. Implementation proceeds in coherent, reversible milestones; replace entrypoints only once replacement modules exist and pass typecheck/build.

## Interface and delivery requirements

- Retain `POST /api/enquiries` and audience-aware contextual form data from the original plan.
- Preserve values and context after validation, network, configuration or provider errors. Missing mail setup must never show success.
- Use a stable identity for each logical submission, reused on retries. Establish server/provider idempotency behavior for timeouts and multiple instances; a new intentional enquiry gets a new identity. Do not claim process-local maps provide distributed guarantees.
- Obtain client identity only from the host's authenticated proxy mechanism or edge control. Ignore arbitrary forwarded-IP claims. Verify two unrelated clients do not consume one accidental quota.
- Treat provider acknowledgement as acceptance for sending, not proof of inbox arrival. Production validation must confirm the receiving inbox.
- Keep the drafted Resend adapter provisional until the host, provider and verified sender setup are confirmed. Do not create a paid dependency or change hosting merely to fit draft code.
- Track CTA, form start, submission success and delivery failures without logging submitted personal data in analytics. Select a retention period and privacy contact before release.

## Alternatives considered

- **One comprehensive OTT hub:** lower maintenance, but conflicts with the owner's explicit five-detail-page choice. Rejected as a scope change.
- **Separate publisher and advertiser microsites:** greater separation but duplicated branding/navigation and operational burden. Not justified.
- **Cinematic 3D:** potentially memorable, but adds cost/performance risk without evidence of better explanation. Prefer SVG/HTML diagrams.
- **Static diagrams only:** viable baseline and fallback. Introduce manual interaction only where it improves understanding.
- **Framework migration or full rewrite:** no demonstrated benefit sufficient to offset cost. Retain the existing stack.
- **Build all pages before validation:** preserves scope but concentrates rework and delivery risk. Replace with vertical-slice implementation followed by full-scope release.

## Verification and acceptance

### Executed during this review

- Installed-skill archive comparison: **5/5 files match SHA-256**.
- `node --test tests/server-enquiries.test.mjs`: **8 tests passed**, mocked provider only; no email sent.
- `npx tsc -b --pretty false`: **failed** with TS2307 because `src/App.tsx` references missing `./redesign/Site`.
- Source inspection: the current build script copies an SPA shell for the service route; it does not yet generate substantive HTML for all planned routes. Draft API/server files are not integrated into package scripts or Vite.

The interrupted checkout is work in progress and not build-ready. No website implementation repairs were made during this review. No deployment was performed.

### Pending acceptance gates

- Directional usability check with five representative publishers: at least four can explain Biddigi's role and find the next action after a 10–15 second exposure. Repeat audience-path finding with advertiser prospects. Small samples indicate issues; they are not statistical proof.
- Keyboard, screen-reader labels, visible focus, reduced motion, 320px layout, mobile keyboard and 200% zoom checks. No hover-only essential content.
- Static and interactive auction scenes convey eligibility and service responsibilities consistently.
- Each platform page passes a uniqueness checklist: distinct proposition, relevant formats, audience/device/geography considerations, creative guidance, FAQs, source and contextual enquiry.
- All 13 direct routes return 200 with visible substantive HTML, unique H1 and metadata; missing routes return genuine 404. Verify legacy anchors and hydration.
- On the actual host: approved production origin, trusted identity, two-client quota separation, retry after provider-accepted timeout, multi-instance behavior and honest failure recovery.
- Confirm an owner-approved production test arrives in the receiving inbox. Provider mock tests alone cannot satisfy this gate.
- Retain original accessibility, performance and bundle targets; measure them after a coherent build exists. No current WCAG or Core Web Vitals compliance claim.

## Risks and revisit triggers

Reopen architecture if the host cannot run the selected API adapter; visual interaction if comprehension or accessibility tests fail; service copy if platform policies/specifications change; delivery design if actual proxy/scale tests fail. Preserve settled brand, business priorities, routes and inbox preference unless the owner changes them.

Next action: resume implementation using these amendments when the owner requests it. The current request is satisfied by skill installation and plan review.
