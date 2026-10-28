# Biddigi V3 — cinematic media studio

Historical visual specification. The owner subsequently rejected this treatment and requested the new signal-architecture revision. See [V4 implementation](V4-IMPLEMENTATION.md) and [ADR-005](decisions/ADR-005-signal-architecture.md) for current files and browser evidence. Asset provenance and delivery contracts below remain relevant.

Implemented 26 October 2026. Local implementation; no deployment or live email sent.

## Delivered

- Bricolage Grotesque display and Instrument Sans interface typography, self-hosted Latin variable fonts with bundled licenses.
- Porcelain, graphite, orange and cobalt visual chapters, larger typesetting, photo-led compositions and consistent secondary-page treatments.
- Eight original ImageGen photographs: editorial alpine landscape, trail-shoe product campaign, matching runner campaign, app editorial, fictional entertainment still, CTV living room, sports and food/culture.
- Finished HTML publisher/ad compositions around the photographs. Exact interface copy, ad boundaries, illustrative labels and controls remain live text rather than generated screenshot text.
- Publisher-led hero with one dominant publication, desktop app/CTV secondary layers, separately composed mobile scene, and complete imagery/content before optional animation.
- Single 4.5-second emphasis sequence, Pause/Resume/Replay, offscreen/hidden-tab suspension and reduced-motion static completion.
- Four distinct placement scenes: web display/native; populated app feed and optional rewarded illustration; content/ad/content sequence; CTV photograph with screen-aligned campaign composite.
- A photographic campaign interlude with at most 16px total background-image scroll travel on larger screens; no motion on touch-size/reduced-motion layouts.
- Platform-specific viewing-context photography, manual ad-break illustrations and richer OTT hub/platform-page design. No fake video Play control or claim of an official platform interface.
- Existing 13 routes, enquiry contracts, calculator arithmetic, server validation and metadata retained.

## Artwork and reproducibility

Generated with the **built-in ImageGen tool**, not a paid API fallback. The product image was used as the reference for the matching lifestyle campaign.

- Source files: `design/v3-originals/` (eight PNGs).
- Full generation briefs and original tool output paths: `design/v3-generation.json`.
- Delivery files: `public/images/v3/` (32 responsive AVIF/WebP variants).
- Dimensions and byte sizes: `design/v3-assets.json`.
- Visual contact sheet: `design/v3-contact-sheet.jpg`.
- Asset preparation: `node scripts/prepare-v3-assets.mjs` regenerates variants from preserved originals or the recorded original output paths.

Source photos and the contact sheet were visually inspected. They contain original fictional editorial/campaign material, not actual customer results, platform catalogue stills or official platform interfaces.

## Executed verification

- Production TypeScript/build passed; all 13 page documents, 404, sitemap and robots generated.
- **21 automated tests passed**: previous 16 route/calculator/delivery tests plus V3 asset-integrity, complete-hero markup, image-source/platform-context, font/bundle and hero component lifecycle checks.
- The real hero React component was mounted in a simulated DOM with controlled intersection, document visibility, frame-clock, image decode and reduced-motion signals. The lifecycle check confirms actual component state freezes while paused/offscreen/hidden, resumes without elapsed-time jumps, completes, replays, cleans up frame/listener resources, and does not unexpectedly autoplay after reduced-motion preference changes. This is component verification, not a browser rendering or frame-pacing measurement.
- Critical hero AVIF images combined: desktop 213,806 bytes; mobile 65,298 bytes. Compressed client JavaScript approximately 96KB; CSS approximately 21KB. These are asset/build sizes, not field Core Web Vitals.
- Independent code review identified and fixed critical-image decode gating (hidden lazy mobile images could otherwise prevent animation), reward-return focus, source-image dimension descriptors and hero layout height calculation.
- Source inspection confirms native controls, inert hidden ad layers, explicit non-playback wording and no active old geometric mountain illustrations.
- Lint exits successfully; the pre-existing unused legacy Footer purity warning remains.

## Browser verification pending

The local preview serves successfully at `http://127.0.0.1:5173/`, but the browser tool reports **local browser use is disabled in Work settings**. This prevents current V3 screenshots, rendered breakpoint/zoom checks and runtime Pause/Replay/reduced-motion verification. Earlier V2 screenshots do not prove V3 layout quality and must not be presented as V3 evidence.

Once browser access is restored, complete these checks before claiming V3 verified:

1. Desktop hero composition, visible ad boundary, no overlapping controls, full initial poster before animation.
2. At 320/360/768/1440px: no horizontal overflow, readable adjacent labels and a separately composed mobile publisher scene. Check 200% zoom.
3. Pause mid-sequence; wait; verify progress does not advance. Resume, finish, replay, scroll offscreen/back and test hidden-tab suspension. Reduced motion keeps the completed composition and disables timed effects.
4. Web/App/Video/CTV switches; rewarded Return focus; actual CTV screen alignment against the generated photograph; Show placement versus actual playback distinction.
5. All platform pages and contextual enquiry links, console/hydration errors and image load failures.
6. Representative mobile frame pacing and transfer measurements. Static tests do not prove rendered performance or user comprehension.

Existing production mail/host/privacy release dependencies in `IMPLEMENTATION.md` remain unchanged. This V3 task does not itself require publishing, buying services or sending an email.
