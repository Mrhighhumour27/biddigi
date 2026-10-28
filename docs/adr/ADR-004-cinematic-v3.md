# ADR-004: CTV / OTT Cinematic V3 — Scene-Consistent Generative Broadcast Streams & Non-Destructive Ad Units

- **Status**: Accepted
- **Date**: 2025-05-15
- **Architecture Pillar**: Pillar 1 — CTV / OTT Atlas & Dimensional Ad Cutaways
- **Standards Referenced**: IAB VAST 4.2, IAB SIMID 1.1, SCTE-35 Digital Program Insertion, OpenRTB 2.6 (`imp.video`, `podid`, `maxseq`)

## 1. Context & Problem Statement
Connected TV (CTV) and Over-The-Top (OTT) publishers suffer from severe ad-break drop-off and creative fatigue when traditional mid-roll ad pods interrupt high-engagement broadcast streams. Furthermore, demonstrating enterprise CTV ad formats (Dynamic Squeeze-Back L-Bars, Interactive Pause Ads, and Frame-Accurate Overlay Triggers) requires deterministic, copyright-clean, broadcast-grade reference streams across key monetization verticals.

## 2. Decision
We standardize Biddigi's CTV Reference Atlas on three scene-consistent broadcast streams synthesized via **Google Flow + Veo 2** (`1080p60` / `4K` mastering with deterministic temporal anchors):

1. **`ctv-sports-live-01` (Live Stadium Broadcast — Championship Football/Soccer)**:
   - **Telemetry Profile**: High motion vector density, live scoreboard HUD, concurrent viewer spikes (`850K+` concurrent streams), SSAI dynamic ad pod concurrency constraint (`< 45ms` manifest stitch SLA).
   - **Primary Ad Unit**: Squeeze-Back L-Bar (`80%` main broadcast canvas preserved in top-right quadrant; `20%` L-shaped interactive programmatic canvas along left and bottom rails triggered on dead-ball SCTE-35 splice cues).
2. **`ctv-scifi-drama-01` (Prime-Time Episodic Sci-Fi Cinema)**:
   - **Telemetry Profile**: High dynamic range (HDR10) deep obsidian shadows, long session duration (`52 min` avg), zero tolerance for mid-scene audio jarring.
   - **Primary Ad Unit**: On-Pause Interactive SIMID 1.1 Overlay. Triggered deterministically within `120ms` of `IDBPlayerState === 'PAUSED'`, dimming the paused Veo 2 scene frame to `45%` luminance and mounting a GPU-accelerated glassmorphic shoppable product carousel.
3. **`ctv-fin-news-01` (Real-Time Quantitative Financial Desk)**:
   - **Telemetry Profile**: Persistent lower-third ticker geometry, high-HHI executive demographic (`$28.40–$42.00` baseline eCPM), contextual ticker signal alignment.
   - **Primary Ad Unit**: Contextual Ticker-Synchronized Lower-Third & QR Deep-Link Pod with real-time OpenRTB 2.6 `content.cat` (`IAB13-1` Personal Finance / Investing) signal injection.

## 3. Technical Invariants
- **Non-Destructive Aspect Ratio Preservation**: L-Bar squeeze-back transitions utilize hardware-accelerated CSS matrix3d / WebGL scaling (`cubic-bezier(0.22, 1, 0.36, 1)` over `450ms`) so zero pixels of the broadcast stream are cropped.
- **SIMID 1.1 Sandbox Isolation**: Interactive overlays execute inside a cross-origin isolated iframe communicating with the video player strictly via the IAB SIMID 1.1 `postMessage` state machine (`SIMID:Player:init`, `SIMID:Creative:requestPause`, `SIMID:Player:adStopped`).
