export interface FlowBroadcastStreamSpec {
  id: 'ctv-sports-live-01' | 'ctv-scifi-drama-01' | 'ctv-fin-news-01';
  title: string;
  vertical: 'Live Sports' | 'Sci-Fi Drama' | 'Financial News';
  adrReference: 'ADR-004' | 'ADR-005';
  veoModel: 'veo-2.0-generate-001';
  aspectRatio: '16:9';
  resolution: '1920x1080';
  fps: 24;
  durationSeconds: 8.0;
  seed: number;
  cameraChoreography: string;
  flowPrompt: string;
  negativePrompt: string;
  safeZoneSpec: {
    lBarLeftRailPct: number;
    lBarBottomRailPct: number;
    pauseTriggerTimestampSec: number;
    maxRightThirdLuminanceIre: number;
  };
  r2AssetUrl: string;
  posterPlate: string;
  accentHex: string;
  sampleTelemetry: {
    clearingCpmUsd: number;
    winningDsp: string;
    vastVersion: '4.2';
    interactiveProtocol: 'SIMID 1.1';
    adFormat: 'OTT Pause Glass' | 'L-Bar Squeeze' | 'Interactive Pod Overlay';
  };
}

export interface WhiskIsometricLayerSpec {
  id: 'layer-0-content' | 'layer-1-auction' | 'layer-2-vast-simid';
  stratumIndex: 0 | 1 | 2;
  label: string;
  subtitle: string;
  adrReference: 'ADR-005';
  elevationPx: number;
  cssTransform: string;
  whiskConditioning: {
    subjectPrompt: string;
    scenePrompt: string;
    stylePrompt: string;
    seed: number;
  };
  telemetryBadges: string[];
  accentColor: string;
}

export const FLOW_BROADCAST_STREAMS: readonly FlowBroadcastStreamSpec[] = [
  {
    id: 'ctv-sports-live-01',
    title: 'Champions Floodlit Pitch Feed',
    vertical: 'Live Sports',
    adrReference: 'ADR-004',
    veoModel: 'veo-2.0-generate-001',
    aspectRatio: '16:9',
    resolution: '1920x1080',
    fps: 24,
    durationSeconds: 8.0,
    seed: 404091,
    cameraChoreography:
      '400mm f/2.8 telephoto tracking pan right at 4 deg/s, 0.5x slow-motion turf spray, match-cut loop lock',
    flowPrompt:
      'Cinematic broadcast sports feed, 400mm telephoto lens f/2.8, slow-motion night stadium turf action under crisp 5600K floodlights, raindrops and emerald grass blades catching rim light, deep dark out-of-focus stadium upper tier in top and left frame, photorealistic Rec.709 broadcast color science, 24fps, smooth horizontal tracking pan, no text, no watermarks, no HUD, no scoreboard overlays.',
    negativePrompt:
      'baked-in scoreboard, readable text, lower-third chyron, watermark, network bug, distorted turf',
    safeZoneSpec: {
      lBarLeftRailPct: 20,
      lBarBottomRailPct: 18,
      pauseTriggerTimestampSec: 3.2,
      maxRightThirdLuminanceIre: 42,
    },
    r2AssetUrl: 'https://media.biddigi.io/flow/ctv-sports-live-01.mp4',
    posterPlate: '/assets/plates/ctv-living-room-desktop.webp',
    accentHex: '#FF5A1F',
    sampleTelemetry: {
      clearingCpmUsd: 28.4,
      winningDsp: 'The Trade Desk (OpenRTB 2.6)',
      vastVersion: '4.2',
      interactiveProtocol: 'SIMID 1.1',
      adFormat: 'L-Bar Squeeze',
    },
  },
  {
    id: 'ctv-scifi-drama-01',
    title: 'Orbital Meridian — Episode IV',
    vertical: 'Sci-Fi Drama',
    adrReference: 'ADR-004',
    veoModel: 'veo-2.0-generate-001',
    aspectRatio: '16:9',
    resolution: '1920x1080',
    fps: 24,
    durationSeconds: 8.0,
    seed: 404092,
    cameraChoreography:
      '50mm Panavision anamorphic dolly push-in at 0.3 m/s toward obsidian observation deck',
    flowPrompt:
      'Prestige streaming sci-fi drama cinematography, 50mm Panavision anamorphic lens, slow push-in inside a dark architectural spacecraft observation gallery, silhouette of an astronaut gazing at a glowing amber planetary horizon through massive structural glass ribs, deep slate-blue shadows #0A0F1D and warm orange rim light #FF5A1F, atmospheric volumetric dust, film grain, no text, no UI text, no subtitles.',
    negativePrompt:
      'subtitles, sci-fi HUD text, holographic letters, lens dirt artifacts, overexposed center',
    safeZoneSpec: {
      lBarLeftRailPct: 22,
      lBarBottomRailPct: 20,
      pauseTriggerTimestampSec: 3.2,
      maxRightThirdLuminanceIre: 38,
    },
    r2AssetUrl: 'https://media.biddigi.io/flow/ctv-scifi-drama-01.mp4',
    posterPlate: '/assets/plates/ott-pause-desktop.webp',
    accentHex: '#FF6B2C',
    sampleTelemetry: {
      clearingCpmUsd: 34.8,
      winningDsp: 'DV360 CTV Reserve',
      vastVersion: '4.2',
      interactiveProtocol: 'SIMID 1.1',
      adFormat: 'OTT Pause Glass',
    },
  },
  {
    id: 'ctv-fin-news-01',
    title: 'Global Markets Closing Bell',
    vertical: 'Financial News',
    adrReference: 'ADR-004',
    veoModel: 'veo-2.0-generate-001',
    aspectRatio: '16:9',
    resolution: '1920x1080',
    fps: 24,
    durationSeconds: 8.0,
    seed: 404093,
    cameraChoreography:
      '35mm Arri Alexa Mini LF Steadicam 15-degree orbital arc around dark smoked-glass anchor desk',
    flowPrompt:
      'High-end financial broadcast studio floor filmed on Arri Alexa Mini LF, 35mm prime lens f/2.0, slow orbital gimbal movement around a modern dark smoked-glass anchor desk, background features shallow-depth-of-field abstract amber and cyan light matrices in bokeh, architectural navy and charcoal tones, clean broadcast lighting, strictly no readable text, no chyrons, no tickers, no logos.',
    negativePrompt:
      'stock ticker text, news chyron, readable numbers, channel logo, deformed hands',
    safeZoneSpec: {
      lBarLeftRailPct: 20,
      lBarBottomRailPct: 22,
      pauseTriggerTimestampSec: 3.2,
      maxRightThirdLuminanceIre: 44,
    },
    r2AssetUrl: 'https://media.biddigi.io/flow/ctv-fin-news-01.mp4',
    posterPlate: '/assets/plates/editorial-desktop.webp',
    accentHex: '#F59E0B',
    sampleTelemetry: {
      clearingCpmUsd: 24.15,
      winningDsp: 'Yahoo DSP / Magnite CTV',
      vastVersion: '4.2',
      interactiveProtocol: 'SIMID 1.1',
      adFormat: 'Interactive Pod Overlay',
    },
  },
] as const;

export const WHISK_ISOMETRIC_LAYERS: readonly WhiskIsometricLayerSpec[] = [
  {
    id: 'layer-0-content',
    stratumIndex: 0,
    label: '01 / Content Canvas Stratum',
    subtitle: 'Publisher Viewport & Veo 2 Broadcast Stream Plate',
    adrReference: 'ADR-005',
    elevationPx: 0,
    cssTransform: 'rotateX(58deg) rotateZ(-38deg) translateZ(0px)',
    whiskConditioning: {
      subjectPrompt:
        'Isometric 16:9 dark obsidian glass media viewport slab showing abstract editorial and streaming video frame geometry in muted slate #1E293B with brushed anodized aluminum bezel.',
      scenePrompt:
        'Suspended over a dark architectural measurement grid with soft ambient occlusion.',
      stylePrompt:
        '30-degree isometric orthographic technical render, dark obsidian glassmorphism #090D16 at 75% opacity, frosted acrylic bevels, zero text glyphs.',
      seed: 881001,
    },
    telemetryBadges: [
      'Rec.709 Broadcast Plate',
      '60fps / 24fps Cadence',
      'Safe-Zone Luminance <= 45 IRE',
    ],
    accentColor: '#64748B',
  },
  {
    id: 'layer-1-auction',
    stratumIndex: 1,
    label: '02 / Programmatic Auction Mesh',
    subtitle: 'Prebid.js + OpenRTB 2.6 S2S Parallel Bid Router & Floor Engine',
    adrReference: 'ADR-005',
    elevationPx: 56,
    cssTransform: 'rotateX(58deg) rotateZ(-38deg) translateZ(56px)',
    whiskConditioning: {
      subjectPrompt:
        'Translucent frosted-glass isometric circuit manifold with four cyan SSP input conduits converging into a central Prebid clearing hub and emitting one bright signal-orange winning trace #FF5A1F upward.',
      scenePrompt:
        'Floating middle stratum with transparent alpha background and vertical optical alignment pins.',
      stylePrompt:
        '30-degree isometric orthographic technical render, dark obsidian glassmorphism #090D16, luminous #FF5A1F fiber-optic signal trace, industrial schematic precision.',
      seed: 881002,
    },
    telemetryBadges: [
      'OpenRTB 2.6 / 3.0',
      'Dynamic Floor +18.4%',
      '42ms S2S Clearing SLA',
    ],
    accentColor: '#38BDF8',
  },
  {
    id: 'layer-2-vast-simid',
    stratumIndex: 2,
    label: '03 / VAST 4.2 + SIMID Overlay Plane',
    subtitle: 'Hardware-Accelerated L-Bar Squeeze & Interactive Pause Glass',
    adrReference: 'ADR-005',
    elevationPx: 112,
    cssTransform: 'rotateX(58deg) rotateZ(-38deg) translateZ(112px)',
    whiskConditioning: {
      subjectPrompt:
        'Elevated isometric interactive ad overlay frame showing an L-Bar rail and shoppable OTT pause glass card with glowing #FF5A1F border bevels and QR code anchor geometry.',
      scenePrompt:
        'Top stratum connected to the auction mesh via vertical orange light tethers.',
      stylePrompt:
        '30-degree isometric orthographic technical render, high-transmittance frosted glass, crisp signal-orange #FF5A1F edge specular highlights, zero hallucinated text.',
      seed: 881003,
    },
    telemetryBadges: [
      'VAST 4.2 + SIMID 1.1',
      'OMID Verification Ready',
      'Non-Fake DOM Composition',
    ],
    accentColor: '#FF5A1F',
  },
] as const;
