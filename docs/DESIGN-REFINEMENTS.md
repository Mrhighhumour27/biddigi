# Design refinements — 5 November 2026

Implemented locally in `E:/Antigravity/Projects/biddigi`; production has not been deployed.

- Added a reusable original-logo system with eight locally hosted company marks. Platform identities appear in page heroes, artwork headers, cards, tabs, branded actions, enquiry choices and footer links. Network controls retain readable product names beside company logos.
- Removed the hardcoded public production-status strip. Platform discovery now precedes demonstrations on the OTT hub. The publisher page includes a revenue-scenario shortcut.
- Reduced headline sizes and section spacing; shortened the contact introduction. Added sticky-header anchor offsets, readable mobile brand controls and consistent focus outlines.
- Restyled the revenue and CTV panels with charcoal, cream, orange and the existing lime accent. Increased small labels, removed credit/inference claims, labelled examples explicitly and replaced named sample buyers with fictional labels.
- Made CTV layer controls keyboard-operable buttons. Corrected initial selected network values and aligned the eCPM range step with its displayed initial value.
- Sony LIV now uses distinct existing lifestyle artwork rather than the JioHotstar cricket scene.

## Verification

- TypeScript, client build, SSR bundle and 13-page prerender: passed.
- Automated tests: 31 passed, including logo file signatures/paths, all-page footer identities, early OTT discovery and scenario disclosure.
- Lint: exit 0. Four existing warnings remain in the DNS script, original Copilot test and unused legacy Footer; no new-source warnings.
- Chrome layout probes: all 13 routes at 320, 390, 768 and 1440px (52 checks), no document horizontal overflow or broken loaded brand images; one main heading on each page.
- Visual review: desktop and mobile service page, OTT introduction, publisher tools and contact layout. Advertiser/Sony LIV query preselection is preserved; scenario tabs operate.
- Existing interaction lifecycle tests cover keyboard atlas selection, pause/replay, offscreen behaviour and reduced motion. New panel transitions are disabled for reduced motion.
- Browser zoom keystrokes did not establish a reliable 200% reflow measurement; the four viewport checks above must not be presented as a completed browser zoom audit.

Preview screenshots are in `docs/qa/refinement/`. Original asset provenance and the Expoworld asset gap are recorded in `public/brands/SOURCES.md`.

The linked Expoworld domain currently supplies a lander rather than a verifiable company logo. Its name remains text pending an original asset. No generated or reconstructed company logos were introduced.
