# Biddigi Design System: Dark Obsidian Glassmorphic AdTech Telemetry

## 1. Brand Essence & Aesthetic Direction
- **Theme Name**: Dark Obsidian Glassmorphic AdTech Telemetry
- **Domain**: Enterprise Programmatic Yield Architecture, Header Bidding (Prebid.js 9.x / PBS), CTV/OTT VAST 4.2 & SIMID 1.1 Engineering, Real-Time BigQuery Auction Telemetry.
- **Visual Persona**: High-frequency quantitative trading terminal fused with a spatial 3D CTV broadcast laboratory. Zero marketing fluff; every surface communicates deterministic precision, sub-millisecond latency awareness, and verifiable yield lift.

## 2. Color Palette & Atmospheric Tokens
### Core Canvas & Elevation Surfaces
- **Midnight Canvas (Primary Background)**: `#070B14` — Deep obsidian void engineered for maximum chromatic contrast of neon telemetry vectors.
- **Elevated Slate 1 (Card / Module Surface)**: `#0D1526` — Primary container background (`rgba(13, 21, 38, 0.78)` with `backdrop-filter: blur(16px)`).
- **Elevated Slate 2 (Interactive / Hover / Modal Surface)**: `#131F37` — Secondary elevated layer for active controls, code drawers, and 3D cutaway planes.
- **Glass Specular Border**: `rgba(255, 255, 255, 0.08)` default hairline; `rgba(0, 229, 255, 0.35)` active/focused telemetry border.

### Semantic Luminescent Neon Accents
- **Prismatic Cyan (Primary Action & Bidstream Signal)**: `#00E5FF` — Used for primary CTAs, active S2S bid routes, focus rings, and interactive sliders.
- **Yield Emerald (Revenue Lift & SLA Verified)**: `#00E676` — Used for positive eCPM delta, clearing price lift, net yield gains, and healthy system status indicators.
- **Auction Amber (Floor Thresholds & Latency Warnings)**: `#FFD600` — Used for dynamic reserve floors (`P72`), bid-shading boundaries, and timeout compression thresholds.
- **CTV/OTT Violet (Spatial Video & Generative AI Streams)**: `#7C4DFF` — Used for Google Flow + Veo 2 broadcast streams, Whisk 3D isometric layers, VAST 4.2 / SIMID 1.1 overlays, and Gemini 2.5 Flash copilot badges.
- **Alert Coral (Bid Timeout / Error Drop)**: `#FF5252` — Used exclusively for auction timeout truncation and rejected bid metrics.

### Typography Colors
- **Primary Ink**: `#F8FAFC` — Crisp alabaster white for headlines and primary KPI values.
- **Secondary Slate Ink**: `#94A3B8` — Balanced cool grey for editorial prose and architectural descriptions.
- **Muted Telemetry Ink**: `#64748B` — Technical labels, axis captions, and secondary metadata.

## 3. Typography & Scannable Hierarchy
- **Display & Architectural Headlines**: `Chivo` (Weights: 700, 800, 900). Tight tracking (`-0.03em`), line-height `1.08`. Conveys industrial structural authority.
- **Body & Executive Prose**: `Hanken Grotesk` (Weights: 400, 500, 600, 700). Clean aperture, line-height `1.6`, optimized for long-form ADR summaries and operational documentation.
- **Telemetry, Metrics, SQL & JSON**: `JetBrains Mono` (Weights: 400, 500, 700). Mandatory `font-variant-numeric: tabular-nums` on all numeric readouts (`$24.85 eCPM`, `14.2ms`, `P72 Floor`, `₹959.89/mo`).

### Fluid Type Scale
- **Hero Display**: `clamp(2.5rem, 4.5vw + 1rem, 4.25rem)` (`Chivo` 800)
- **Section H2**: `clamp(1.75rem, 2.5vw + 0.75rem, 2.75rem)` (`Chivo` 700)
- **Module H3**: `1.25rem` to `1.5rem` (`Chivo` 700)
- **Body Large**: `1.125rem` (`Hanken Grotesk` 400/500)
- **Body Standard**: `0.96875rem` (`Hanken Grotesk` 400)
- **Telemetry Readout**: `0.8125rem` (`JetBrains Mono` 500, uppercase tracking `0.06em`)

## 4. Layout, Spatial Architecture & Grid
- **Max Container Width**: `1360px` with `24px` to `40px` responsive horizontal padding.
- **Grid System**: 12-column CSS Grid (`gap: 24px`) supporting asymmetric bento telemetry layouts (e.g., 7-column interactive 3D CTV stage paired with a 5-column live parameter inspector).
- **Border Radius Tokens**:
  - Outer Modules / Panels: `16px` (`--radius-lg`)
  - Inner Cards / Controls: `10px` (`--radius-md`)
  - Telemetry Badges / Pills: `6px` (`--radius-sm`)
- **Elevation & Lighting**:
  - Ambient background radial mesh: Top-right cyan nebula (`radial-gradient(circle at 85% 12%, rgba(0, 229, 255, 0.12), transparent 45%)`) and mid-left violet nebula (`radial-gradient(circle at 15% 48%, rgba(124, 77, 255, 0.10), transparent 50%)`).
  - Card Shadow: `0 20px 50px -12px rgba(0, 0, 0, 0.75), inset 0 1px 0 0 rgba(255, 255, 255, 0.09)`.

## 5. Signature Interactive Components
1. **CTV / OTT Dimensional Cutaway Stage**:
   - Interactive video viewport with 3 scene-consistent streams (Live Sports, Sci-Fi Drama, Financial News), L-Bar and Pause Ad state toggles, and an Isometric 3D Exploded Layer switcher (`Content Layer`, `OpenRTB Auction Layer`, `VAST 4.2 / SIMID 1.1 Overlay Layer`).
2. **Live Programmatic Yield & Revenue Copilot**:
   - Interactive dual-pane simulator with real-time sliders, order-statistic eCPM lift readouts, 6-month cumulative revenue ramp visualization, Gemini 2.5 Flash structured recommendation drawer, and NotebookLM citation pills.
3. **BigQuery OpenRTB 2.6/3.0 Telemetry Sandbox**:
   - Live packet inspector paired with partitioned DDL/SQL tabs (`APPROX_QUANTILES` floor pricing) and a 1 TB Free Tier byte-scan gauge.
