# Decision: integrate the redesigned site and fix review failures

- ID: ADR-003
- Date: 2026-10-26
- Status: accepted
- Scope and impact: implementation integration and verification; medium, delivery high
- Related: ADR-001 and ADR-002; owner subsequently requested implementation.

## Implementation and review

The lead implemented the shared visual system, page templates, routing and prerendering. Three actual subagents implemented bounded illustration, contact and delivery modules. Contact and delivery specialists then performed a read-only integration challenge; this is recorded as code review, not independent user research or consensus proving design quality.

| Failure identified | Resolution |
| --- | --- |
| Previously interrupted App referenced a missing Site module | Complete Site and route system implemented; TypeScript/build pass. |
| Mobile toggle followed the hidden navigation, so forward Tab skipped links | Toggle moved before navigation; Escape closes it and returns focus. Verified in Chrome. |
| Fields could change while an older enquiry snapshot was sent | Whole form is disabled while submitting; data remains on failure. |
| New enquiry reset removed focused success control | Focus moves to the new name field after reset. |
| Vite API ignored private dotenv settings | Server-only `loadEnv` merged with process environment in the middleware closure. Nothing is exposed through client `define`/VITE variables. |
| Direct `/publishers/index.html` served publisher HTML but client routed to 404 | Shared normalization treats index documents as their route. Added regression check. |
| Metrics grid overflowed at 320px | Narrow layout stacks metrics; representative templates rechecked with no horizontal document overflow. |
| Automatic Tailwind scanning included unused legacy classes | Limit scanning to redesign source; CSS reduced from about 19KB to 11KB compressed. |

## Verification and limits

Production build and 16 automated tests pass. Chrome checks and sizes are recorded in `docs/IMPLEMENTATION.md`. Mail tests inject a mocked provider; no real email was sent. Actual host, sender credentials, operator privacy details and real inbox receipt remain release dependencies. The deployed public website was not changed.

No further debate is useful until actual hosting, customer prototype or cross-browser evidence arrives. Reopen delivery integration on host/proxy failures, and the visual explanation on observed comprehension/accessibility failures.
