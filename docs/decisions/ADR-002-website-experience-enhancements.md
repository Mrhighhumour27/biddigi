# Decision: clarify Biddigi's role and simplify the website experience

- ID: ADR-002
- Date: 2026-10-26
- Status: accepted
- Scope and impact: design, content, discovery and enquiry interface; medium, reversible
- Related decisions: ADR-001 remains in force for delivery sequencing and production gates. Consolidated specification: `docs/WEBSITE-PLAN.md`.

## Context and constraints

Owner explicitly invoked Decision Intelligence to improve the plan. Keep publisher-first, supplied logo, provisional Manrope/off-white/ink/orange system, all 13 routes and qualified enquiries. Do not repeat the resolved hosting review or resume application implementation.

## Expert pairing and independent proposals

Two actual isolated subagents received the same facts before seeing each other's recommendation:

- A, creative/product narrative expert: improve distinctiveness, coherent illustrations and scan-level storytelling.
- B, usability/conversion/trust expert: expose misleading explanations, form friction and uncertain-advertiser dead ends.

A proposed a responsibility strip, one recurring fictional publisher/ad, an OTT planning matrix, a short contextual form and progressive technical detail. B independently proposed a continuous placement example, explicit Biddigi responsibility, known/unknown-platform paths, context-preserving forms and consistent CTA language. Both proposed limiting the homepage's educational interaction and relocating metric depth/calculator to Publishers.

## Structured challenge and revision

| Strongest challenge | Response / accepted decision |
| --- | --- |
| Visitors may understand generic auctions but not why Biddigi is involved. A central Biddigi engine also implies unconfirmed auction ownership. | Label publisher, buyer, auction setup and Biddigi support roles explicitly. Avoid an owned-exchange diagram; validate labels against actual service scope. |
| A platform matrix can imply equivalent capabilities and gives uncertain visitors no clear recommendation basis. | Replace it with five distinct text-led entries, direct detail links and a guidance enquiry without required platform selection. No ranking, cost claims or yes/no equivalence columns. |
| 'Agreed together: approvals' implies visitor/Biddigi control a platform decision. | Agree integration/commercial scope together. Keep platform-controlled eligibility, inventory and creative approval visible separately. |
| Duplicate identity fields and required traffic/budget/property knowledge block legitimate prospects. | Use role-specific minimum fields, optional details, public app/website URL or explicit nonpublic guidance path; preserve common values during role changes. Update backend validation together later. |
| Many interactive demos create an explanatory burden rather than a minimal website. | Homepage max two teaching interactions: auction and placement. Static metric summary, full metric education/calculator on Publishers; no new planner or quiz. |
| Bright orange text on white lacks sufficient contrast. | Ink text on bright orange controls; darker orange ordinary links; label/border/check for selected state, not color alone. |

A accepted B's platform-equivalence and approval objections. B accepted A's correction to unconfirmed auction-engine ownership. Both accepted the amended form and interaction constraints. Final residual objection: none to the requirements; actual comprehension, conversion and platform/source accuracy still require verification. Consensus does not prove these outcomes.

## Alternatives and rationale

- Disconnected illustrative modules: easy to build but weaker narrative continuity. Prefer one example.
- Static-only diagrams: viable baseline; manual interactivity must add value and remain optional.
- Dense platform table or automated recommender: unsupported comparison assumptions. Prefer concise distinct entries.
- Full wizard or all fields exposed: unnecessary steps or irrelevant questions. Prefer one short contextual page.
- Add more demo sections: rejected to preserve the user's minimal-design requirement.

## Evidence and verification

Executed in this pass: source/previous decision review and arithmetic solid-color contrast calculation using relative luminance. Ratios: `#FF6500`/white 2.95:1; `#171A18`/orange 5.94:1; `#626961`/`#F7F7F2` 5.26:1; `#A83E00`/white 6.26:1. These validate token pairings only, not whole-page accessibility.

Consulted W3C contrast, accessible forms, notification and animation guidance, linked in the consolidated plan. No customer sessions, new application tests, live delivery, visual prototype or deployment were executed in this pass. Earlier build/test results are preserved in ADR-001 and are not relabeled as current successes.

## Implementation and acceptance

Documentation updated only. Application remains paused. When implementation resumes, verify role comprehension; all CTA context paths; app/nonpublic/unknown-budget guidance cases; mobile/keyboard/error recovery; and distinction between platform capabilities. Recheck rendered contrast and static/reduced-motion equivalence. Do not claim the draft backend already supports the revised minimum form contract.

Revisit if tests show confusion, extra required fields are operationally essential, owner confirms a different integration role, or platform details change. Do not reopen settled branding or route count absent new evidence.
