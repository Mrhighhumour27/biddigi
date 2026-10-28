# Decision: rebuild the visual direction around a dimensional ad cutaway

- Date: 26 October 2026
- Status: implemented and validated locally
- Supersedes: ADR-004 visual direction. Business, route, privacy and enquiry-delivery contracts continue unchanged.
- Review depth: medium; material visual and interaction change, reversible.

## Trigger and evidence

The owner rejected the cinematic V3 treatment as generic and its motion as insufficiently advanced. They explicitly requested new internet research and a complete design revision using the decision-intelligence skill. This is a change to the active implementation objective, not a requirement to preserve rejected V3 pixels.

Primary references investigated:

- [Lusion — Devin AI](https://lusion.co/projects/devin_ai/): animation and interactive storytelling for a complex B2B product.
- [OFF+BRAND — Lando Norris](https://www.itsoffbrand.com/our-work/lando-norris): identity-specific motion, cinematic transitions and responsive delivery.
- [Lusion](https://lusion.co/): a coherent relationship between design, motion, 3D and development.
- [Locomotive — Zap](https://locomotive.ca/en/work/zap): the creative specialist's primary case-study research into explaining complex technology through an integrated identity and site.
- [Motion layout](https://motion.dev/docs/react-layout-animations), [accessibility](https://motion.dev/docs/react-accessibility) and [scoped animation](https://motion.dev/docs/react-use-animate): engineering reference material consulted by the motion specialist.

The lead inspected the Lando homepage in Chrome. Lusion's live site remained in a loading sequence during the attempted inspection, and the Locomotive case study presented a security verification page in Chrome. No claim is made that all reference-site animations were visually inspected. Reference principles inform an original Biddigi composition; their assets and interfaces are not copied.

## Independent proposals and challenge

Actual isolated creative and motion/usability agents produced initial proposals before they were exchanged. The creative specialist proposed a signal-architecture system: midnight, paper, orange and a sparse yellow-green accent; condensed typography; an aperture that changes through an impression; and a manual cinematic OTT selector. The challenger proposed a physically layered publisher/ad cutaway and shared creative geometry across placements.

The strongest objection was that a dark hero, large type and abstract buyer nodes could still look like a generic technology agency. The accepted revision starts with a recognizable publication and a finished advertisement. Only the ad plane separates; demand appears as aligned response slips rather than decorative particles or orbiting cards. The same creative returns to the slot. The logo's divided shape informs the orange trace without altering the supplied logo.

Full WebGL and a new framework were rejected: they were not required for the chosen dimensional choreography and would increase runtime and asset-production cost. A bounded timed hero with direct stage controls was selected instead of a long scroll-pinned sequence. Native scrolling and the enquiry CTA remain available throughout. This implementation is not described as a WebGL world or a scroll-driven camera.

## Implemented system

- Self-hosted Archivo variable display type, including its width axis; Instrument Sans body and controls. Font license bundled in `public/fonts`.
- Midnight `#0B1012`, paper `#F2F0E8`, brand orange `#FF6500`, sparse signal accent `#D9F36B`.
- One 6.4-second impression sequence with publication perspective, separated ad plane, buyer-response reveal, orange trace and settled ad. One MotionValue drives all poses; Pause, Replay and four direct stage buttons control it.
- A separate narrow composition removes camera rotation and depth travel. The artwork's own intersection controls playback, avoiding a sequence that finishes while the visitor is still above it.
- Shared-layout campaign projection between web, app, video and CTV; coordinated orange position rail; readable controls and distinct context compositions.
- A five-platform OTT atlas with manually selected shutter/crop transitions, correct context and enquiry links, image loading/error/retry handling, keyboard tabs and reduced motion.
- New photographic/HTML service-page artwork, matching header/footer, reporting, process, company, contact and legal treatments across all 13 routes.
- The eight original ImageGen source plates remain the art library. No placeholders replace them; all exact labels and ad boundaries are HTML.

## Review corrections

Independent review and actual browser checks identified and resolved:

1. Manual-to-Play progress could jump: resume from the current MotionValue, and rebase an interrupted manual transition on reentry.
2. Whole-section visibility could exhaust mobile motion before the art appeared: observe the theatre itself.
3. Response slips covered the ad: translate/scale the publication during Demand, reduce ad-plane extension and reserve a separate response column. Browser measurement confirmed a gap of approximately 31 CSS pixels at the checked desktop viewport.
4. Reduced-motion CSS hid Demand's static responses: retain the meaningful static pose while removing transitions.
5. A clipped lazy-selected atlas image never requested: selected/retried images load eagerly; initial offscreen art remains lazy.
6. Failed or stale atlas image callbacks could leave an unrelated scene or indefinite busy state: clear prior art, show an explicit error, reject obsolete callbacks and provide Retry with focus recovery.
7. Shared campaign z-index covered the reward Return control: raise/isolate the reward overlay. Browser verification confirmed its visible control and Escape/return focus flow.
8. FAQ minimum content width and the long Sony LIV heading overflowed at 320px: constrain the grid and allow heading wrapping with a narrower display size.

## Verification and remaining limits

The production build and all 24 automated tests pass. Tests exercise actual React/Motion components, not a second implementation of their state logic. They cover interruption/pause/visibility/reduced-motion cleanup, selected-art loading and error recovery, routes/metadata/assets, every internal link/fragment and duplicate IDs, calculator arithmetic and mocked mail-provider contracts.

Real Chrome checks cover the final built 13 route first folds at desktop and 320px, homepage at 360/768/1440, the four placement contexts, reward keyboard flow, the CTV mask, manual and paused hero states, reduced-motion Demand, and keyboard atlas selection with correct contextual links. Current route captures include final service artwork. The owner set and confirmed actual 200% Chrome zoom after native window control could not address the preview safely; all routes then passed overflow checks at the resulting 719px CSS viewport. Production HTML hydrates with no captured warnings/errors. A synthetic 360×800 CSS-pixel, 4× CPU run recorded 241 frame intervals, median 16.7ms/p95 16.8ms and none over 32ms. CPU/viewport emulation was reset. These measurements do not prove field Core Web Vitals or physical-device performance. Screenshots and raw evidence are in `docs/qa/v4/`.

Reopen for actual content overlap, lost focus, mismatched context, failed interruption recovery or unacceptable device performance. User acceptance and conversion outcomes cannot be inferred from a build or this review.
