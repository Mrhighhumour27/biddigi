# Biddigi redesign implementation

Date: 26 October 2026. Implemented locally; no production deployment or real email send performed.

## Delivered

- Thirteen distinct routes, shared responsive navigation/footer and contextual calls to action.
- Supplied orange wordmark, self-hosted Manrope and warm off-white/ink/orange design system.
- Original publication, landscape and sample-ad artwork in SVG/HTML. Manual auction, device placement, metric explanations and campaign placement preview; no autoplay or continuous background animation.
- Publisher, advertiser, OTT hub, five platform-specific pages, About, Contact, privacy notice and website terms.
- Neutral gross-revenue calculator without automatic uplift.
- Real build-time HTML, unique metadata/canonicals/share data, sitemap, robots and 404.
- Accessible contextual enquiry form: role/platform preselection, optional details, nonpublic-property path, retained values after errors and submission locking.
- Validated server-only mail adapter, logical submission identifiers, duplicate-safe provider retries and explicit host-aware abuse configuration.

## Executed checks

- TypeScript and production build: passed.
- Lint: exit 0; one existing purity warning remains in the unused legacy Footer component. New redesign source has no lint warnings.
- Automated tests: 16 passed, including 12 mocked enquiry handler tests plus static route/metadata, explanatory markup, calculator and index-route normalization tests. No provider credentials or real inbox delivery were used.
- Independent review found and fixed mobile menu forward tab order/Escape, editable pending form fields, reset focus, Vite private environment loading and direct index-document hydration.
- Chrome desktop screenshot review of the homepage and mobile review of the homepage, OTT hub and contact flow.
- Chrome layout checks for representative publisher, OTT hub, platform detail and contact templates at 320, 768 and 1440px: no document horizontal overflow after correcting the narrow metric grid.
- Chrome manual controls: auction eligibility selection, placement switching and mobile navigation keyboard/Escape behavior checked.
- Reduced-motion emulation: selected placement remains available and computed scene transition is 0 seconds; emulation reset afterward.
- Contextual form checks: Prime Video selection preserved, role switches retain common values, nonpublic publisher can submit without a URL, missing mail configuration shows an honest error, retains values and focuses the error summary.
- Production server route/404/API and client secrecy checked locally. Live host/proxy and inbox delivery remain unverified.

Production compressed client JavaScript is approximately 91KB and CSS approximately 11KB; self-hosted Latin font approximately 25KB. These are build sizes, not field Core Web Vitals or a Lighthouse score.

Saved visual previews: [desktop homepage](qa/home-desktop.jpg), [mobile homepage](qa/home-mobile.jpg), [OTT hub](qa/ott-desktop.jpg), and [enquiry page](qa/contact-desktop.jpg). Temporary browser viewport and reduced-motion overrides were reset after QA.

## Release dependencies

1. Confirm the existing production host's API adapter, TLS/origin, proxy identity and single-/multi-instance behavior. No host migration is assumed.
2. Configure a verified sender and transactional credentials privately; choose the documented rate-limit mode for the actual topology.
3. Test two independent clients, provider-accepted timeout retries and actual approved inbox receipt on the production host.
4. Have the operator finalize data-retention/privacy contact and any jurisdiction-specific legal/service terms, plus review platform and responsibility copy.
5. Run representative customer comprehension sessions and cross-browser/assistive-technology checks. Chrome functional checks do not establish full WCAG compliance, conversion improvement or field performance.

## Operational notes

`npm run dev` serves UI and the enquiry middleware. `npm start` serves the built pages and API. Previewing static files alone does not activate the endpoint. See `ENQUIRIES.md` for configuration and the original plan/ADRs for acceptance rationale.

No secrets are needed to review the website. Without configured delivery, the form remains honest about unavailability. Do not replace it with a simulated successful receipt.
