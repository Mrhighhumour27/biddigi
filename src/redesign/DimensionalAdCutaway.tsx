import { useState } from 'react';
import {
  FLOW_BROADCAST_STREAMS,
  WHISK_ISOMETRIC_LAYERS,
  type FlowBroadcastStreamSpec,
} from './flowWhiskSpec';
import {
  Layers3,
  Radio,
  Play,
  Pause,
  Tv,
  ShieldCheck,
  Sparkles,
  Terminal,
  Activity,
  Code2,
} from 'lucide-react';

const placementLayers = WHISK_ISOMETRIC_LAYERS.map((layer, index) => ({
  ...layer,
  label: ['01 / Your content', '02 / Buyer selection', '03 / Ad placement'][index],
  subtitle: ['The programme your audience came to watch.', 'Eligible buyers compete for the available space.', 'An advertisement fits alongside the viewing experience.'][index],
  telemetryBadges: [['Programme', 'Audience', 'Viewing context'], ['Eligible demand', 'Configured prices', 'Sample auction'], ['Video', 'L-Bar', 'Pause placement']][index],
}));

export function DimensionalAdCutaway() {
  const [selectedStream, setSelectedStream] = useState<FlowBroadcastStreamSpec>(
    FLOW_BROADCAST_STREAMS[0]
  );
  const [activeLayerIndex, setActiveLayerIndex] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showLBar, setShowLBar] = useState(true);
  const [isExploded, setIsExploded] = useState(true);
  const [showInspector, setShowInspector] = useState(false);

  // Map stream id to SVG asset
  const getStreamAsset = (id: string) => {
    switch (id) {
      case 'ctv-sports-live-01':
        return '/assets/ctv/ctv-sports-live-01.svg';
      case 'ctv-scifi-drama-01':
        return '/assets/ctv/ctv-scifi-drama-01.svg';
      case 'ctv-fin-news-01':
        return '/assets/ctv/ctv-fin-news-01.svg';
      default:
        return '/assets/ctv/ctv-sports-live-01.svg';
    }
  };

  const getLayerAsset = (id: string) => {
    switch (id) {
      case 'layer-0-content':
        return '/assets/whisk/layer-0-content.svg';
      case 'layer-1-auction':
        return '/assets/whisk/layer-1-auction.svg';
      case 'layer-2-vast-simid':
        return '/assets/whisk/layer-2-simid.svg';
      default:
        return '/assets/whisk/layer-0-content.svg';
    }
  };

  return (
    <div
      id="ctv-cutaway-lab"
      className="dimensional-cutaway-container my-12 rounded-2xl border border-[#48534f] bg-[#0b1012] p-6 lg:p-8 text-[#F8FAFC] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85)] relative overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #ffb47f 0%, #ffb47f 100%)',
        }}
      />

      {/* Header & Global Lab Telemetry */}
      <div className="relative z-10 flex flex-col gap-4 border-b border-[#48534f] pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#ffb47f] uppercase">
            <Layers3 size={16} />
            <span>EXPLORE CONNECTED TV ADVERTISING</span>
          </div>
          <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-white lg:text-3xl font-chivo">
            How a CTV ad fits into the picture
          </h3>
          <p className="mt-1 text-sm text-[#c4cdc7]">
            Explore content, ad selection and placement layers. This is an interactive illustration; all buyer activity and figures are sample data.
          </p>
        </div>

        {/* Stream Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {FLOW_BROADCAST_STREAMS.map((stream) => {
            const isActive = selectedStream.id === stream.id;
            return (
              <button
                key={stream.id}
                type="button"
                onClick={() => setSelectedStream(stream)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-mono font-medium transition-all ${
                  isActive
                    ? 'border border-[#ffb47f]/60 bg-[#ffb47f]/15 text-[#ffb47f] shadow-[0_0_16px_rgba(0,229,255,0.25)]'
                    : 'border border-white/5 bg-[#182123] text-[#c4cdc7] hover:bg-[#48534f] hover:text-white'
                }`}
              >
                <Radio size={14} className={isActive ? 'animate-pulse text-[#ffb47f]' : ''} />
                <span>{stream.vertical}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: 3D Isometric View & Live CTV Stage */}
      <div className="relative z-10 mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: 3-Strata Whisk Isometric Cutaway (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-[#48534f] bg-[#182123]/80 backdrop-blur-md p-5 shadow-lg">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#adb9b1] mb-4">
              <span className="flex items-center gap-1.5 text-[#ffb47f]">
                <Activity size={13} />
                CONTENT, BUYERS & AD PLACEMENT
              </span>
              <button
                type="button"
                onClick={() => setIsExploded(!isExploded)}
                className="rounded bg-[#48534f] px-2 py-0.5 text-[10px] text-[#ffb47f] hover:bg-[#1C2C4E] transition-colors"
              >
                {isExploded ? 'EXPLODED VIEW: ON' : 'COLLAPSED VIEW'}
              </button>
            </div>

            {/* Exploded 3D Stage */}
            <div className="relative h-72 w-full perspective-1000 flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#0b1012] to-[#0A101D] border border-white/5 p-4">
              <div
                className={`relative w-64 h-40 transform-style-3d transition-transform duration-700 ${
                  isExploded
                    ? 'rotate-x-55 -rotate-z-35'
                    : 'rotate-x-15 rotate-z-0'
                }`}
              >
                {placementLayers.map((layer) => {
                  const isHovered = activeLayerIndex === layer.stratumIndex;
                  const zElevation = isExploded ? layer.elevationPx : layer.stratumIndex * 6;
                  const transformRule = isExploded
                    ? layer.cssTransform
                    : `translateZ(${zElevation}px)`;

                  return (
                    <div
                      key={layer.id}
                      onMouseEnter={() => setActiveLayerIndex(layer.stratumIndex)}
                      onMouseLeave={() => setActiveLayerIndex(null)}
                      style={{
                        transform: transformRule,
                        borderColor: isHovered
                          ? '#ffb47f'
                          : layer.stratumIndex === 2
                          ? 'rgba(124, 77, 255, 0.4)'
                          : layer.stratumIndex === 1
                          ? 'rgba(0, 230, 118, 0.35)'
                          : 'rgba(0, 229, 255, 0.3)',
                      }}
                      className={`absolute inset-0 cursor-pointer rounded-lg border backdrop-blur-md transition-all duration-300 p-2 overflow-hidden ${
                        layer.stratumIndex === 0
                          ? 'bg-[#0b1012]/85 shadow-[0_4px_24px_rgba(0,229,255,0.12)]'
                          : layer.stratumIndex === 1
                          ? 'bg-[#091A16]/80 shadow-[0_4px_24px_rgba(0,230,118,0.15)]'
                          : 'bg-[#150E28]/85 shadow-[0_4px_24px_rgba(124,77,255,0.22)]'
                      }`}
                    >
                      {/* Whisk SVG Texture */}
                      <img
                        src={getLayerAsset(layer.id)}
                        alt={layer.label}
                        className="absolute inset-0 h-full w-full object-cover opacity-60 pointer-events-none"
                      />
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-tight text-white drop-shadow">
                          {layer.label}
                        </span>
                        <span
                          className="h-2.5 w-2.5 rounded-full ring-2 ring-white/20"
                          style={{ backgroundColor: layer.accentColor }}
                        />
                      </div>
                      <p className="relative z-10 mt-1 text-[9px] text-[#c4cdc7] font-mono line-clamp-1">
                        {layer.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Layer Info Accordion / Badges */}
            <div className="mt-4 space-y-2">
              {placementLayers.map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  aria-pressed={activeLayerIndex === layer.stratumIndex}
                  onClick={() =>
                    setActiveLayerIndex(
                      activeLayerIndex === layer.stratumIndex ? null : layer.stratumIndex
                    )
                  }
                  className={`w-full text-left cursor-pointer rounded-lg border p-2.5 text-xs transition-colors ${
                    activeLayerIndex === layer.stratumIndex
                      ? 'border-[#ffb47f]/60 bg-[#ffb47f]/10 text-white'
                      : 'border-[#48534f] bg-[#0b1012]/60 text-[#c4cdc7] hover:bg-[#48534f]/50'
                  }`}
                >
                  <div className="flex items-center justify-between font-medium">
                    <span className="font-chivo">{layer.label}</span>
                    <span className="text-[10px] font-mono text-[#ffb47f]">Illustration</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {layer.telemetryBadges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-mono text-[#c4cdc7] border border-white/5"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Broadcast Feed & Overlays (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#48534f] bg-[#182123]/80 backdrop-blur-md p-5 shadow-lg">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#c4cdc7] mb-3">
              <div className="flex items-center gap-2">
                <Tv size={14} className="text-[#ffb47f]" />
                <span className="text-white font-semibold font-chivo">{selectedStream.title}</span>
                <span className="rounded bg-[#48534f] px-1.5 py-0.5 text-[10px] text-[#d9f36b] font-mono">
                  Illustrative scene
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowLBar(!showLBar)}
                  className={`rounded px-2 py-1 text-[11px] font-mono transition-colors ${
                    showLBar
                      ? 'bg-[#ffb47f]/20 text-[#ffb47f] border border-[#ffb47f]/40'
                      : 'bg-[#48534f] text-[#c4cdc7]'
                  }`}
                >
                  L-Bar: {showLBar ? 'ACTIVE' : 'OFF'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="flex items-center gap-1 rounded bg-[#48534f] px-2 py-1 text-[11px] font-mono text-white hover:bg-[#1C2C4E]"
                >
                  {isPaused ? <Play size={12} className="text-[#d9f36b]" /> : <Pause size={12} className="text-[#d9f36b]" />}
                  <span>{isPaused ? 'RESUME' : 'PAUSE'}</span>
                </button>
              </div>
            </div>

            {/* Video Canvas Stage with Safe Zones & SVG Stream */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[#48534f] bg-[#0b1012]">
              {/* Fallback & Poster Plate */}
              <img
                src={getStreamAsset(selectedStream.id)}
                alt={selectedStream.title}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              />

              {/* L-Bar Squeezeback Rail (ADR-004 Non-Destructive Aspect Scaling) */}
              {showLBar && (
                <div className="absolute top-0 bottom-0 left-0 w-1/4 bg-[#0b1012]/90 backdrop-blur-md border-r border-[#ffb47f]/30 p-3 flex flex-col justify-between transition-all animate-fade-in">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-[#ffb47f]">
                      <Sparkles size={12} />
                      <span>SPONSORED L-BAR</span>
                    </div>
                    <div className="mt-2 rounded bg-[#182123] p-2 border border-[#48534f]">
                      <p className="text-xs font-bold text-white font-chivo">Biddigi Signal CTV</p>
                      <p className="text-[10px] text-[#c4cdc7] mt-1 font-mono">
                        Non-destructive 80% canvas squeeze
                      </p>
                    </div>
                  </div>
                  <div className="rounded bg-[#d9f36b]/10 p-2 border border-[#d9f36b]/30 text-[10px] font-mono">
                    <span className="text-[#c4cdc7]">Clearing eCPM:</span>
                    <strong className="text-[#d9f36b] ml-1 font-bold">
                      ${selectedStream.sampleTelemetry.clearingCpmUsd.toFixed(2)}
                    </strong>
                  </div>
                </div>
              )}

              {/* OTT Pause Glass Overlay (SIMID 1.1) */}
              {isPaused && (
                <div className="absolute inset-0 bg-[#0b1012]/75 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
                  <div className="max-w-sm w-full rounded-xl border border-[#ffb47f]/40 bg-[#182123]/95 p-5 shadow-2xl text-center">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ffb47f]/20 px-3 py-1 text-xs font-mono text-[#ffb47f] border border-[#ffb47f]/40">
                      <ShieldCheck size={14} />
                      <span>VAST 4.2 / SIMID 1.1 PAUSE GLASS</span>
                    </div>
                    <h5 className="mt-3 text-base font-bold text-white font-chivo">
                      Interactive Shoppable Pause Unit
                    </h5>
                    <p className="mt-1 text-xs text-[#c4cdc7]">
                      High-impact context-aware placement served without breaking broadcast video decoder state.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPaused(false)}
                        className="rounded-lg bg-[#ffb47f] px-4 py-2 text-xs font-semibold text-[#0b1012] hover:bg-[#ffb47f]/90 transition-colors font-mono"
                      >
                        Resume Stream
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Telemetry Ticker Overlay */}
              <div className="absolute bottom-2 right-2 rounded bg-[#0b1012]/85 px-2.5 py-1 text-[10px] font-mono text-[#c4cdc7] border border-white/10 flex items-center gap-3 backdrop-blur-sm">
                <span>DSP: <strong className="text-white">Illustrative buyer</strong></span>
                <span>VAST: <strong className="text-[#ffb47f]">{selectedStream.sampleTelemetry.vastVersion}</strong></span>
                <span>Format: <strong className="text-[#d9f36b]">{selectedStream.sampleTelemetry.adFormat}</strong></span>
              </div>
            </div>
          </div>

          {/* Prompt, Conditioning & SCTE-35 Inspector Toggle */}
          <div className="mt-4 flex flex-col gap-2">
            <div className="rounded-lg bg-[#0b1012]/60 p-3 border border-[#48534f] text-xs flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#c4cdc7]">
                Illustrative placement · not live playback
              </span>
              <button
                type="button"
                onClick={() => setShowInspector(!showInspector)}
                className="flex items-center gap-1 text-[10px] font-mono text-[#ffb47f] hover:underline"
              >
                <Code2 size={12} />
                <span>{showInspector ? 'Hide technical example' : 'View technical example'}</span>
              </button>
            </div>

            {/* SCTE-35 & OpenRTB 2.6 Drawer */}
            {showInspector && (
              <div className="rounded-lg bg-[#0b1012] p-3 border border-[#ffb47f]/30 font-mono text-[10px] text-[#c4cdc7] animate-fade-in">
                <div className="flex items-center gap-2 text-[#ffb47f] pb-1 border-b border-white/5 mb-1.5">
                  <Terminal size={12} />
                  <span>SCTE-35 SPLICE EVENT DESCRIPTOR (0x05)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>Splice Event ID: <span className="text-white">0x4892A1</span></div>
                  <div>Break Duration: <span className="text-[#d9f36b]">30.00s</span></div>
                  <div>Program Splice Flag: <span className="text-white">1</span></div>
                  <div>Prebid PBS Cutoff: <span className="text-[#d9f36b]">140ms</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
