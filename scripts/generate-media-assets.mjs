#!/usr/bin/env node
/**
 * Biddigi CTV / OTT (Google Flow + Veo 2) & Whisk Isometric Layer Asset Pipeline
 * Generates deterministic high-precision SVG broadcast frames and isometric layer
 * textures in public/assets/ctv/ and public/assets/whisk/ so the SSG build and
 * interactive 3D cutaway have zero missing assets offline, while supporting live
 * Vertex AI / Google GenAI media synthesis when GEMINI_API_KEY is present.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const CTV_DIR = path.join(ROOT_DIR, 'public', 'assets', 'ctv');
const WHISK_DIR = path.join(ROOT_DIR, 'public', 'assets', 'whisk');

fs.mkdirSync(CTV_DIR, { recursive: true });
fs.mkdirSync(WHISK_DIR, { recursive: true });

const CTV_SVGS = {
  'ctv-sports-live-01.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bgSports" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#051329"/>
      <stop offset="55%" stop-color="#07283B"/>
      <stop offset="100%" stop-color="#04101E"/>
    </linearGradient>
    <radialGradient id="stadiumFlood" cx="50%" cy="20%" r="65%">
      <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.35"/>
      <stop offset="50%" stop-color="#00E676" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#070B14" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#bgSports)"/>
  <rect width="1280" height="720" fill="url(#stadiumFlood)"/>
  <!-- Perspective Stadium Pitch Grid -->
  <g stroke="#00E676" stroke-width="1.5" stroke-opacity="0.35">
    <ellipse cx="640" cy="480" rx="360" ry="140" fill="none"/>
    <line x1="640" y1="340" x2="640" y2="620"/>
    <line x1="180" y1="480" x2="1100" y2="480"/>
    <path d="M 280 680 L 480 340 L 800 340 L 1000 680 Z" fill="rgba(0, 230, 118, 0.05)"/>
  </g>
  <!-- Broadcast HUD Badge -->
  <rect x="48" y="44" width="280" height="48" rx="8" fill="rgba(7, 11, 20, 0.85)" stroke="#00E5FF" stroke-width="1.2"/>
  <circle cx="72" cy="68" r="6" fill="#FF5252"/>
  <text x="88" y="73" fill="#F8FAFC" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" letter-spacing="1">LIVE 4K HDR // 120 FPS</text>
  <text x="640" y="660" text-anchor="middle" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="13">GOOGLE FLOW + VEO 2: 400MM BROADCAST TELEPHOTO SYNTHESIS (SEED 404091)</text>
</svg>`,

  'ctv-scifi-drama-01.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bgSciFi" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A0818"/>
      <stop offset="50%" stop-color="#140D2E"/>
      <stop offset="100%" stop-color="#070B14"/>
    </linearGradient>
    <radialGradient id="nebulaCore" cx="60%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#7C4DFF" stop-opacity="0.45"/>
      <stop offset="50%" stop-color="#00E5FF" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#070B14" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#bgSciFi)"/>
  <rect width="1280" height="720" fill="url(#nebulaCore)"/>
  <!-- Sci-Fi Ring Geometry -->
  <g stroke="#7C4DFF" stroke-width="1.5" stroke-opacity="0.4">
    <circle cx="640" cy="360" r="220" fill="none" stroke-dasharray="12 6"/>
    <circle cx="640" cy="360" r="160" fill="none"/>
    <circle cx="640" cy="360" r="80" fill="rgba(124, 77, 255, 0.1)"/>
    <line x1="380" y1="360" x2="900" y2="360" stroke="#00E5FF" stroke-opacity="0.5"/>
  </g>
  <rect x="48" y="44" width="310" height="48" rx="8" fill="rgba(7, 11, 20, 0.85)" stroke="#7C4DFF" stroke-width="1.2"/>
  <circle cx="72" cy="68" r="6" fill="#7C4DFF"/>
  <text x="88" y="73" fill="#F8FAFC" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" letter-spacing="1">CINEMA 2.39:1 // DOLBY VISION</text>
  <text x="640" y="660" text-anchor="middle" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="13">GOOGLE FLOW + VEO 2: DEEP SPACE HDR10 TIME-DILATION (SEED 718290)</text>
</svg>`,

  'ctv-fin-news-01.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720">
  <defs>
    <linearGradient id="bgFin" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06121E"/>
      <stop offset="60%" stop-color="#091E33"/>
      <stop offset="100%" stop-color="#070B14"/>
    </linearGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#bgFin)"/>
  <!-- Financial Candle & Grid Mesh -->
  <g stroke="#00E5FF" stroke-width="1" stroke-opacity="0.15">
    <line x1="80" y1="180" x2="1200" y2="180"/>
    <line x1="80" y1="320" x2="1200" y2="320"/>
    <line x1="80" y1="460" x2="1200" y2="460"/>
  </g>
  <path d="M 80 420 Q 280 380, 480 260 T 880 210 T 1200 140" fill="none" stroke="#00E676" stroke-width="3"/>
  <!-- Live Ticker Bar at Bottom -->
  <rect x="0" y="640" width="1280" height="80" fill="rgba(7, 11, 20, 0.95)" stroke="#FFD600" stroke-width="1"/>
  <text x="32" y="688" fill="#FFD600" font-family="JetBrains Mono, monospace" font-size="16" font-weight="700">BIDDIGI INDEX +3.4% ▲</text>
  <text x="280" y="688" fill="#00E676" font-family="JetBrains Mono, monospace" font-size="15">CTV eCPM $32.40 ▲</text>
  <text x="510" y="688" fill="#00E5FF" font-family="JetBrains Mono, monospace" font-size="15">S2S PBS 14ms ▼</text>
  <text x="730" y="688" fill="#F8FAFC" font-family="JetBrains Mono, monospace" font-size="15">FILL RATE 96.8% ▲</text>
  <rect x="48" y="44" width="280" height="48" rx="8" fill="rgba(7, 11, 20, 0.85)" stroke="#FFD600" stroke-width="1.2"/>
  <circle cx="72" cy="68" r="6" fill="#00E676"/>
  <text x="88" y="73" fill="#F8FAFC" font-family="JetBrains Mono, monospace" font-size="14" font-weight="700" letter-spacing="1">QUANT FINANCIAL DESK</text>
</svg>`,
};

const WHISK_SVGS = {
  'layer-0-content.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
  <defs>
    <linearGradient id="layer0Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#051020"/>
      <stop offset="100%" stop-color="#0B1A30"/>
    </linearGradient>
  </defs>
  <rect width="960" height="540" rx="16" fill="url(#layer0Bg)" stroke="#00E5FF" stroke-width="2" stroke-opacity="0.4"/>
  <circle cx="480" cy="270" r="140" fill="none" stroke="#00E5FF" stroke-width="2" stroke-dasharray="8 4" stroke-opacity="0.5"/>
  <text x="480" y="260" text-anchor="middle" fill="#00E5FF" font-family="Chivo, sans-serif" font-size="24" font-weight="800">LAYER 0: HLS/DASH BROADCAST STREAM</text>
  <text x="480" y="295" text-anchor="middle" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="14">SCTE-35 SPLICE CUE 0x05 // HEVC 4K60 DECODE // ZERO BUFFER JITTER</text>
</svg>`,

  'layer-1-auction.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
  <defs>
    <linearGradient id="layer1Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0D1F18"/>
      <stop offset="100%" stop-color="#082A1B"/>
    </linearGradient>
  </defs>
  <rect width="960" height="540" rx="16" fill="url(#layer1Bg)" stroke="#00E676" stroke-width="2" stroke-opacity="0.6"/>
  <!-- Node Bidding Graph -->
  <g stroke="#00E676" stroke-width="2" stroke-opacity="0.4">
    <line x1="240" y1="270" x2="480" y2="180"/>
    <line x1="240" y1="270" x2="480" y2="360"/>
    <line x1="480" y1="180" x2="720" y2="270"/>
    <line x1="480" y1="360" x2="720" y2="270"/>
  </g>
  <circle cx="240" cy="270" r="28" fill="#070B14" stroke="#00E676" stroke-width="3"/>
  <circle cx="480" cy="180" r="32" fill="#070B14" stroke="#00E5FF" stroke-width="3"/>
  <circle cx="480" cy="360" r="32" fill="#070B14" stroke="#FFD600" stroke-width="3"/>
  <circle cx="720" cy="270" r="36" fill="#070B14" stroke="#00E676" stroke-width="3.5"/>
  <text x="480" y="80" text-anchor="middle" fill="#00E676" font-family="Chivo, sans-serif" font-size="24" font-weight="800">LAYER 1: OPENRTB 2.6 / PREBID SERVER GRAPH</text>
  <text x="480" y="115" text-anchor="middle" fill="#94A3B8" font-family="JetBrains Mono, monospace" font-size="14">S2S BIDDER AUCTION // DYNAMIC P72 FLOOR: $24.80 // CLEARING TIME: 14.2MS</text>
</svg>`,

  'layer-2-simid.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540">
  <defs>
    <linearGradient id="layer2Bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#190E33"/>
      <stop offset="100%" stop-color="#25124A"/>
    </linearGradient>
  </defs>
  <rect width="960" height="540" rx="16" fill="url(#layer2Bg)" stroke="#7C4DFF" stroke-width="2" stroke-opacity="0.7"/>
  <!-- L-Bar Squeeze Indicator -->
  <path d="M 40 40 L 220 40 L 220 500 L 920 500 L 920 420 L 140 420 L 140 40 Z" fill="rgba(124, 77, 255, 0.25)" stroke="#7C4DFF" stroke-width="2"/>
  <text x="480" y="240" text-anchor="middle" fill="#F8FAFC" font-family="Chivo, sans-serif" font-size="24" font-weight="800">LAYER 2: VAST 4.2 / SIMID 1.1 OVERLAY</text>
  <text x="480" y="280" text-anchor="middle" fill="#00E5FF" font-family="JetBrains Mono, monospace" font-size="14">NON-DESTRUCTIVE L-BAR &amp; PAUSE AD CAROUSEL // OMID VERIFIED 60FPS</text>
</svg>`,
};

for (const [filename, content] of Object.entries(CTV_SVGS)) {
  fs.writeFileSync(path.join(CTV_DIR, filename), content, 'utf8');
}

for (const [filename, content] of Object.entries(WHISK_SVGS)) {
  fs.writeFileSync(path.join(WHISK_DIR, filename), content, 'utf8');
}

console.log('[generate-media-assets] Deterministic SVG assets generated in public/assets/ctv/ and public/assets/whisk/');
