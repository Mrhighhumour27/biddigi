# Decision: replace the restrained visual system with a cinematic media studio

- ID: ADR-004
- Date: 2026-10-26
- Status: accepted; rendered verification pending
- Scope and impact: visual/interaction system, medium and reversible; existing delivery safeguards retained.

## Context

The owner rejected V2 as too minimal and generic and requested innovative illustration/animation, actual ImageGen ad-placement artwork, better typography and richer color. Explicit preferences: cinematic media studio; expressive but controlled motion; open-source fonts. These preferences supersede earlier Manrope/flat-illustration/static-only restrictions while keeping the orange logo, publisher-first business model, 13 routes and enquiry contracts.

## Specialist and challenger review

The preceding planning pass used actual independent art-direction and motion/usability reviewers. They agreed on generated source photography plus deterministic live interface composition; one dominant desktop publisher placement; separate mobile composition; Bricolage Grotesque/Instrument Sans; a 4.5-second once-only emphasis sequence; no sticky scroll, pointer-following or WebGL. Main objections were illegible generated UI, misleading platform screenshots, an empty first frame and excessive moving decoration. The plan resolved these by retaining live labels/geometry, a complete static initial composition and bounded optional motion.

During implementation, an actual placement specialist built the four scene compositions. An independent code-review challenger inspected lifecycle, asset and accessibility failure modes rather than claiming user validation.

| Failure scenario | Implementation resolution |
| --- | --- |
| Waiting for hidden lazy secondary images prevents mobile hero readiness | Wait only for the two eager critical image decodes. Poster content remains available regardless. |
| Pause/offscreen timer advances and jumps on resume | Accumulate only active requestAnimationFrame intervals; retain elapsed progress and pause CSS animation state. Runtime browser check still required. |
| Reward Return button disappears with focus | Restore focus to the rewarded-placement trigger. |
| Portrait dimensions/srcset describe nonexistent 1280px width | Match actual 1024×1536 portrait output and source descriptors. |
| Fixed hero stage height collides with larger publication artwork | Let the publication determine stage height, with separately composed mobile flow. |
| Generated frame text distorts or implies official platform UI | Generate photography only; compose ads, labels, frames and controls in live HTML with illustrative attribution. |

## Alternatives and rationale

All-in-one generated device screenshots were rejected because small text and ad geometry become unreliable. A WebGL/3D world was rejected because it adds execution cost without better placement clarity. The selected approach supplies finished artwork while retaining sharp, accessible interaction.

Eight source images and 32 responsive variants are preserved with their prompts and source mapping. Tests verify actual image metadata/existence and real page uses. They do not prove responsive rendering, animation quality or user understanding.

## Verification status

Build and 21 automated tests pass, including the real hero component's lifecycle under controlled intersection/visibility/frame-clock/preference signals. Original generated imagery was visually inspected. Browser verification is blocked by disabled local browser use in Work settings; no V3 screenshots or runtime browser passes are claimed. Component tests do not prove rendered layout or visual motion quality. Keep the goal active until rendered acceptance is checked. See `docs/V3-IMPLEMENTATION.md` for evidence and the remaining checklist.

Reopen on actual breakpoint overlap, confusing ad/context labels, animation recovery failure, generated image defects or mobile performance failure. Do not reopen the agreed brand/business scope without new evidence.
