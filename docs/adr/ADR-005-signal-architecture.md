# ADR-005: Spatial Signal Architecture — Whisk Isometric Layer Decomposition for CTV & Header Bidding

- **Status**: Accepted
- **Date**: 2025-05-15
- **Architecture Pillar**: Pillar 1 & Pillar 3 — Dimensional Ad Cutaways & OpenRTB Telemetry
- **Standards Referenced**: IAB OpenRTB 2.6/3.0, Prebid Server (Go/Java), IAB VAST 4.2, IAB SIMID 1.1

## 1. Context & Problem Statement
Executive stakeholders and publisher engineering teams frequently conflate video transport (HLS/DASH SSAI), programmatic auction decisioning (OpenRTB 2.6 / Prebid Server), and client-side interactive rendering (SIMID 1.1). When these three planes are tightly coupled in legacy players, a slow DSP response blocks frame rendering or causes VAST 402 timeout errors.

## 2. Decision: 3-Plane Isometric Signal Decomposition
We architect and visualize every CTV/OTT impression as three decoupled, hardware-accelerated spatial planes rendered using **Google Whisk** isometric reference textures and CSS 3D transforms:

### Plane 0 (Base Z-Plane: `translateZ(0px)`): Broadcast Content & SSAI Transport Layer
- **Responsibility**: Continuous decoding of HLS/DASH segments (`HEVC` / `AV1`), SCTE-35 splice detection, and frame-accurate buffer management.
- **Latency Invariant**: Zero blocking on ad-server network I/O; fallback slate/house frame buffered locally.

### Plane 1 (Mid Z-Plane: `translateZ(48px)`): Programmatic OpenRTB 2.6 / Prebid Server Auction Graph
- **Responsibility**: Parallel S2S bidding across DSPs, dynamic quantile floor enforcement (`P72` reserve computed from BigQuery historical telemetry), competitive separation (`podid`, `adomain` deduplication), and currency normalization.
- **Latency Invariant**: Strict `180ms` S2S auction cutoff with dynamic timeout compression.

### Plane 2 (Top Z-Plane: `translateZ(96px)`): VAST 4.2 Verification & SIMID 1.1 Interactive Overlay
- **Responsibility**: OMID (Open Measurement) viewability verification, non-destructive L-Bar / Pause Ad layout composition, D-Pad remote focus navigation (`ArrowUp`, `ArrowDown`, `Enter`), and real-time conversion telemetry callbacks.
- **Latency Invariant**: `< 16.6ms` (`60fps`) main-thread frame budget during interactive overlay transitions.
