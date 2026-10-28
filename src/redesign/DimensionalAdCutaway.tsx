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
      className="dimensional-cutaway-container my-12 rounded-2xl border border-[#131F37] bg-[#070B14] p-6 lg:p-8 text-[#F8FAFC] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.85)] relative overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #00E5FF 0%, #7C4DFF 100%)',
        }}
      />

      {/* Header & Global Lab Telemetry */}
      <div className="relative z-10 flex flex-col gap-4 border-b border-[#131F37] pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#00E5FF] uppercase">
            <Layers3 size={16} />
            <span>ADR-004 & ADR-005 • Spatial CTV Signal Architecture</span>
          </div>
          <h3 className="mt-1 text-2xl font-extrabold tracking-tight text-white lg:text-3xl font-chivo">
            CTV / OTT Atlas & Dimensional Ad Cutaway
          </h3>
          <p className="mt-1 text-sm text-[#94A3B8]">
            Google Flow + Veo 2 broadcast stream synthesis with Whisk 3D isometric layer decomposition.
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
                    ? 'border border-[#00E5FF]/60 bg-[#00E5FF]/15 text-[#00E5FF] shadow-[0_0_16px_rgba(0,229,255,0.25)]'
                    : 'border border-white/5 bg-[#0D1526] text-[#94A3B8] hover:bg-[#131F37] hover:text-white'
                }`}
              >
                <Radio size={14} className={isActive ? 'animate-pulse text-[#00E5FF]' : ''} />
                <span>{stream.vertical}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid: 3D Isometric View & Live CTV Stage */}
      <div className="relative z-10 mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left: 3-Strata Whisk Isometric Cutaway (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-xl border border-[#131F37] bg-[#0D1526]/80 backdrop-blur-md p-5 shadow-lg">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#64748B] mb-4">
              <span className="flex items-center gap-1.5 text-[#00E5FF]">
                <Activity size={13} />
                WHISK 3D ISOMETRIC STACK
              </span>
              <button
                type="button"
                onClick={() => setIsExploded(!isExploded)}
                className="rounded bg-[#131F37] px-2 py-0.5 text-[10px] text-[#00E5FF] hover:bg-[#1C2C4E] transition-colors"
              >
                {isExploded ? 'EXPLODED VIEW: ON' : 'COLLAPSED VIEW'}
              </button>
            </div>

            {/* Exploded 3D Stage */}
            <div className="relative h-72 w-full perspective-1000 flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-[#070B14] to-[#0A101D] border border-white/5 p-4">
              <div
                className={`relative w-64 h-40 transform-style-3d transition-transform duration-700 ${
                  isExploded
                    ? 'rotate-x-55 -rotate-z-35'
                    : 'rotate-x-15 rotate-z-0'
                }`}
              >
                {WHISK_ISOMETRIC_LAYERS.map((layer) => {
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
                          ? '#00E5FF'
                          : layer.stratumIndex === 2
                          ? 'rgba(124, 77, 255, 0.4)'
                          : layer.stratumIndex === 1
                          ? 'rgba(0, 230, 118, 0.35)'
                          : 'rgba(0, 229, 255, 0.3)',
                      }}
                      className={`absolute inset-0 cursor-pointer rounded-lg border backdrop-blur-md transition-all duration-300 p-2 overflow-hidden ${
                        layer.stratumIndex === 0
                          ? 'bg-[#070B14]/85 shadow-[0_4px_24px_rgba(0,229,255,0.12)]'
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
                      <p className="relative z-10 mt-1 text-[9px] text-[#94A3B8] font-mono line-clamp-1">
                        {layer.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Layer Info Accordion / Badges */}
            <div className="mt-4 space-y-2">
              {WHISK_ISOMETRIC_LAYERS.map((layer) => (
                <div
                  key={layer.id}
                  onClick={() =>
                    setActiveLayerIndex(
                      activeLayerIndex === layer.stratumIndex ? null : layer.stratumIndex
                    )
                  }
                  className={`cursor-pointer rounded-lg border p-2.5 text-xs transition-colors ${
                    activeLayerIndex === layer.stratumIndex
                      ? 'border-[#00E5FF]/60 bg-[#00E5FF]/10 text-white'
                      : 'border-[#131F37] bg-[#070B14]/60 text-[#94A3B8] hover:bg-[#131F37]/50'
                  }`}
                >
                  <div className="flex items-center justify-between font-medium">
                    <span className="font-chivo">{layer.label}</span>
                    <span className="text-[10px] font-mono text-[#00E5FF]">{layer.adrReference}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {layer.telemetryBadges.map((badge) => (
                      <span
                        key={badge}
                        className="rounded bg-black/50 px-1.5 py-0.5 text-[9px] font-mono text-[#94A3B8] border border-white/5"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Broadcast Feed & Overlays (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-[#131F37] bg-[#0D1526]/80 backdrop-blur-md p-5 shadow-lg">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-3">
              <div className="flex items-center gap-2">
                <Tv size={14} className="text-[#00E5FF]" />
                <span className="text-white font-semibold font-chivo">{selectedStream.title}</span>
                <span className="rounded bg-[#131F37] px-1.5 py-0.5 text-[10px] text-[#00E676] font-mono">
                  Veo 2 (1080p60)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowLBar(!showLBar)}
                  className={`rounded px-2 py-1 text-[11px] font-mono transition-colors ${
                    showLBar
                      ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40'
                      : 'bg-[#131F37] text-[#94A3B8]'
                  }`}
                >
                  L-Bar: {showLBar ? 'ACTIVE' : 'OFF'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsPaused(!isPaused)}
                  className="flex items-center gap-1 rounded bg-[#131F37] px-2 py-1 text-[11px] font-mono text-white hover:bg-[#1C2C4E]"
                >
                  {isPaused ? <Play size={12} className="text-[#00E676]" /> : <Pause size={12} className="text-[#FFD600]" />}
                  <span>{isPaused ? 'RESUME' : 'PAUSE'}</span>
                </button>
              </div>
            </div>

            {/* Video Canvas Stage with Safe Zones & SVG Stream */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[#131F37] bg-[#070B14]">
              {/* Fallback & Poster Plate */}
              <img
                src={getStreamAsset(selectedStream.id)}
                alt={selectedStream.title}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              />

              {/* L-Bar Squeezeback Rail (ADR-004 Non-Destructive Aspect Scaling) */}
              {showLBar && (
                <div className="absolute top-0 bottom-0 left-0 w-1/4 bg-[#070B14]/90 backdrop-blur-md border-r border-[#00E5FF]/30 p-3 flex flex-col justify-between transition-all animate-fade-in">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] font-mono text-[#00E5FF]">
                      <Sparkles size={12} />
                      <span>SPONSORED L-BAR</span>
                    </div>
                    <div className="mt-2 rounded bg-[#0D1526] p-2 border border-[#131F37]">
                      <p className="text-xs font-bold text-white font-chivo">Biddigi Signal CTV</p>
                      <p className="text-[10px] text-[#94A3B8] mt-1 font-mono">
                        Non-destructive 80% canvas squeeze
                      </p>
                    </div>
                  </div>
                  <div className="rounded bg-[#00E676]/10 p-2 border border-[#00E676]/30 text-[10px] font-mono">
                    <span className="text-[#94A3B8]">Clearing eCPM:</span>
                    <strong className="text-[#00E676] ml-1 font-bold">
                      ${selectedStream.sampleTelemetry.clearingCpmUsd.toFixed(2)}
                    </strong>
                  </div>
                </div>
              )}

              {/* OTT Pause Glass Overlay (SIMID 1.1) */}
              {isPaused && (
                <div className="absolute inset-0 bg-[#070B14]/75 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
                  <div className="max-w-sm w-full rounded-xl border border-[#7C4DFF]/40 bg-[#0D1526]/95 p-5 shadow-2xl text-center">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#7C4DFF]/20 px-3 py-1 text-xs font-mono text-[#7C4DFF] border border-[#7C4DFF]/40">
                      <ShieldCheck size={14} />
                      <span>VAST 4.2 / SIMID 1.1 PAUSE GLASS</span>
                    </div>
                    <h5 className="mt-3 text-base font-bold text-white font-chivo">
                      Interactive Shoppable Pause Unit
                    </h5>
                    <p className="mt-1 text-xs text-[#94A3B8]">
                      High-impact context-aware placement served without breaking broadcast video decoder state.
                    </p>
                    <div className="mt-4 flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsPaused(false)}
                        className="rounded-lg bg-[#00E5FF] px-4 py-2 text-xs font-semibold text-[#070B14] hover:bg-[#00E5FF]/90 transition-colors font-mono"
                      >
                        Resume Stream
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Telemetry Ticker Overlay */}
              <div className="absolute bottom-2 right-2 rounded bg-[#070B14]/85 px-2.5 py-1 text-[10px] font-mono text-[#94A3B8] border border-white/10 flex items-center gap-3 backdrop-blur-sm">
                <span>DSP: <strong className="text-white">{selectedStream.sampleTelemetry.winningDsp}</strong></span>
                <span>VAST: <strong className="text-[#00E5FF]">{selectedStream.sampleTelemetry.vastVersion}</strong></span>
                <span>Format: <strong className="text-[#00E676]">{selectedStream.sampleTelemetry.adFormat}</strong></span>
              </div>
            </div>
          </div>

          {/* Prompt, Conditioning & SCTE-35 Inspector Toggle */}
          <div className="mt-4 flex flex-col gap-2">
            <div className="rounded-lg bg-[#070B14]/60 p-3 border border-[#131F37] text-xs flex items-center justify-between">
              <span className="font-mono text-[11px] text-[#94A3B8]">
                Seed: <span className="text-[#00E5FF]">{selectedStream.seed}</span> • Aspect: {selectedStream.aspectRatio} • FPS: {selectedStream.fps} • Safe-Zone: &le;{selectedStream.safeZoneSpec.maxRightThirdLuminanceIre} IRE
              </span>
              <button
                type="button"
                onClick={() => setShowInspector(!showInspector)}
                className="flex items-center gap-1 text-[10px] font-mono text-[#00E5FF] hover:underline"
              >
                <Code2 size={12} />
                <span>{showInspector ? 'HIDE SCTE-35 INSPECTOR' : 'INSPECT SCTE-35 CUE'}</span>
              </button>
            </div>

            {/* SCTE-35 & OpenRTB 2.6 Drawer */}
            {showInspector && (
              <div className="rounded-lg bg-[#070B14] p-3 border border-[#00E5FF]/30 font-mono text-[10px] text-[#94A3B8] animate-fade-in">
                <div className="flex items-center gap-2 text-[#00E5FF] pb-1 border-b border-white/5 mb-1.5">
                  <Terminal size={12} />
                  <span>SCTE-35 SPLICE EVENT DESCRIPTOR (0x05)</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>Splice Event ID: <span className="text-white">0x4892A1</span></div>
                  <div>Break Duration: <span className="text-[#00E676]">30.00s</span></div>
                  <div>Program Splice Flag: <span className="text-white">1</span></div>
                  <div>Prebid PBS Cutoff: <span className="text-[#FFD600]">140ms</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
