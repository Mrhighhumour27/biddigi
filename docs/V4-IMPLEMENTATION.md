# Biddigi — signal architecture revision

Date: 26 October 2026. Implemented locally in `E:/Antigravity/Projects/biddigi`. No production deployment or live enquiry email has been sent.

The owner requested a complete new design after rejecting the previous V3 treatment. [ADR-005](decisions/ADR-005-signal-architecture.md) records the research, actual specialist/challenger exchange, final design and corrections. This supersedes V3's visual specification while retaining the same business and delivery scope.

## Delivered

| Area | Current implementation |
| --- | --- |
| Identity | Exact supplied orange/black wordmark; Archivo variable display and Instrument Sans; midnight, paper, orange and signal accent |
| Homepage | Dimensional publisher/ad cutaway, publisher responsibilities, placement transformer, metric explanation, orange onboarding chapter, OTT atlas, FAQs and contextual enquiry |
| Motion | One 6.4-second hero clock, depth separation and reassembly, four stage controls, Pause/Replay, offscreen/hidden suspension; shared-layout creative across four contexts; manually triggered cinematic shutter transitions |
| Artwork | Eight original ImageGen photographs with preserved PNG sources, prompts and 32 AVIF/WebP delivery variants; actual HTML ads and context compositions |
| Service pages | Publisher, advertiser, OTT hub and five platform pages; new service artwork, planning/preparation content, formats and contextual enquiries |
| Other pages | Company, qualified enquiry, privacy and terms within the same typography, rules and color system |
| Technical scope | React/Vite/TypeScript retained; 13 prerendered pages; unique metadata/canonicals/share data; 404, robots, sitemap; private server mail adapter and analytics event contracts retained |

Core files: `SignalHero.tsx`, `PlacementStudio.tsx`, `CampaignAtlas.tsx`, `ServiceArtwork.tsx`, `Site.tsx` in `src/redesign/`; global `src/v4.css` and scoped `placement-v4.css` / `campaign-atlas.css`. Earlier CSS remains underneath where shared structural styles are still used. Earlier unused components are historical source, not active hero code.

## Executed verification

- `npm test`: build plus **24 passing tests**, including every internal route/fragment target and duplicate-ID checks. Build generates all 13 page documents and supporting routing/metadata files.
- Compressed client JavaScript approximately **144KB**, CSS approximately **32KB**. These are build transfer sizes, not measured Core Web Vitals.
- Hero component test uses the real Motion renderer with a controlled frame clock, intersection/visibility/preference changes, manual transition interruption and cleanup checks.
- Atlas component test covers initial lazy/selected eager image loading, stale callbacks, failure without stale art, correct platform enquiry, retry focus, success and keyboard navigation.
- Browser: final built HTML on all 13 routes at desktop and 320px; homepage 360/768/1440px; real cutaway intermediate poses and frozen transforms; placement switching; aligned CTV composition; reward Return/Escape focus; static reduced-motion Demand; keyboard atlas selection and loaded matching imagery.
- The actual production build hydrates with no captured warning/error logs; its controls work after hydration. The YouTube and ZEE5 enquiry query contexts retain their advertiser/platform selection. HTTP probes returned 200 for the homepage and `/publishers/index.html`, and 404 for an unknown route.
- Actual **200% Chrome zoom**, set and confirmed by the owner: CSS viewport reduced from 1439 to 719px; all 13 routes remain within the viewport. Enquiry fields and platform context remain usable. This is separate from viewport emulation. Chrome remains at the owner's selected 200% setting; Ctrl+0 returns it to normal.
- A 360×800 CSS-pixel browser run at 4× CPU slowdown sampled 241 requestAnimationFrame intervals over approximately 4 seconds during the cutaway: median 16.7ms, p95 16.8ms, zero intervals over 32ms. CPU and viewport emulation were reset afterward. This is a synthetic local observation, not a physical-phone or field performance guarantee.
- Lint completes with a pre-existing warning in the unused legacy `src/components/Footer.tsx` about rendering the current date.
- No live provider credentials or mail delivery used in tests. No private recipient in browser output.

## Evidence and final checks

Screenshots live in `docs/qa/v4/`. V2 and V3 screenshots elsewhere are historical. Browser checks must be distinguished from simulated lifecycle tests.

The initial native Windows zoom attempt could not safely address the preview window. The owner then set 200% zoom, allowing the actual reflow check above to finish. Field Core Web Vitals and physical-device frame pacing remain unmeasured; these are production performance targets and must not be inferred from a local run. The code uses transform projection and bounded masks rather than a continuous render loop.

Raw viewport and frame results are preserved in `docs/qa/v4/browser-evidence.json`; current screenshots accompany them. The development preview remains on port 5173. The temporary built-site QA server on port 4173 is stopped after verification.

## Completion audit

| Requirement | Authoritative evidence |
| --- | --- |
| New researched visual direction with actual independent challenge | ADR-005 records primary references, separate proposals, exchange, arbitration, objections and corrections |
| Distinctive typography, palette, real visual assets and live ad compositions | Self-hosted Archivo/Instrument and licenses; eight source PNGs/prompts/32 delivery variants; current desktop/mobile screenshots and source components |
| Authored dimensional hero with pause/replay/manual scenes and complete first frame | SignalHero source; SSR content test; actual intermediate/frozen-transform Chrome checks; real Motion lifecycle test |
| Placement and OTT interaction system | Shared campaign layout code, four browser-checked contexts, CTV mask screenshot, atlas shutter/keyboard tests and actual loaded matching context |
| Reduced motion, narrow layout, keyboard/focus and zoom | Static Demand browser state, lifecycle tests, visible reward Return/Escape flow, 320px controls, no route overflow at 320px and actual 200% zoom |
| Whole-site business scope | 13 prerendered routes, platform-specific content/assets, source registry, route/metadata/ID/link tests and final built-page captures |
| Enquiries, calculations and truthful content | Server validation/idempotency/provider-acknowledgement tests; transparent arithmetic edge cases; query-context browser verification; no fake performance/receipt claims |
| Direct loads, canonicals, legacy fragments and 404 | Generated HTML/metadata and navigation tests; actual built server HTTP 200/404 probes; no hydration errors in captured browser logs |
| Delivery budgets and bounded rendering work | Approximately 144KB compressed JS / 32KB CSS; generated responsive assets; measured synthetic frame sample; no unbounded decorative loop |

This completes the local implementation and design validation. Publication, inbox delivery and production field metrics remain separate release work requiring the host/operator configuration described below.

Production release still requires the real host/API adapter, verified sender/provider configuration, rate-limit topology, an approved inbox-delivery test and operator review of privacy/terms. See [ENQUIRIES.md](ENQUIRIES.md). These are release dependencies, not reasons to expose credentials, change hosting or fabricate successful submissions in the local preview.
