# Original platform placements — 5 November 2026

Prepared for publication to biddigi.io through its existing Cloudflare Pages Git deployment.

The OTT directory, shared Campaign Atlas and all five platform service pages now
show publisher-sourced placement examples. Service-page heroes and format
sections use a shared accessible gallery. Generic entertainment photographs are
no longer presented as platform placement examples. The homepage's shared Atlas
inherits the same original media.

Platform logo wrappers have no background, border, or added padding. Light/dark
original assets maintain contrast. Sony LIV's current SPN mark retains its own
intrinsic black artwork; its older gold LIV-only mark is not used as current
identity. Original artwork is never background-erased or recoloured.

Direct campaign-execution wording follows the owner's explicit confirmation for
all five platforms. No official-partner badges are added. Eligibility, market,
inventory and creative approvals remain qualified.

## Sources and limits

- JioHotstar: original pre-roll/mid-roll demos, with full-frame ad-visible posters
  extracted from those videos. No duplicated pre-roll demo labelled as fence.
- Prime Video: original Amazon interactive in-stream example with remote/phone
  action. Interactive availability is qualified by market and campaign.
- Sony LIV: original 00:45 “Ads on Spotlight” frame from its current advertiser
  site's historical showcase reel, with a link to the original reel page.
- YouTube: original Google in-stream animation and in-feed/Shorts SVG examples.
- ZEE5: original March 2022 kit slide, page 19, retained in full and labelled as
  historical. The current 300×250 format is described from ZEE5 documentation;
  the slide's horizontal banner is not mislabelled as that exact unit.

See [per-example provenance](../public/media/platforms/SOURCES.json),
[media source details](../public/media/platforms/SOURCES.md) and
[logo provenance](../public/brands/SOURCES.md). The ZEE5 transparent vector comes
from a third-party archive attributed to the publisher, recorded explicitly.

## Verification

- Production build and 13-page prerender passed; 33 tests passed.
- Lint exits 0 with four pre-existing warnings outside the new implementation.
- Six affected routes at 320, 390, 768 and 1440px: 24 layout and image probes
  passed, with no overflow, broken loaded images or added platform-logo backgrounds.
- Desktop/mobile screenshots reviewed and saved in `docs/qa/placements/`.
- Browser verification: YouTube format selection and End-key navigation; original
  animation plays to completion after explicit request; Sony LIV advertiser and
  platform enquiry selections preserved.
- Reduced-motion browser emulation: zero initial video elements, no animated GIF
  preview and zero tab transition duration. The emulation and viewport overrides
  were reset.
- Component tests cover failed media, retry focus, abandoned platform callbacks,
  removing a playing video on platform change, and synchronized enquiry targets.

Previews initially render static images. Videos are only mounted after a play
request, start muted and expose native controls. Original source branding and
advertiser creative remain visible; examples are not labelled as Biddigi campaigns.
