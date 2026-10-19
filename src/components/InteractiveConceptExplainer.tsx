import React, { useState } from 'react';
import { 
  Zap, 
  Activity, 
  ShieldCheck, 
  Layers, 
  DollarSign, 
  CheckCircle2, 
  Sliders,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InteractiveConceptExplainer: React.FC = () => {
  // Challenge cards toggle state (Problem vs Solution view)
  const [activeSolutions, setActiveSolutions] = useState<{ [key: string]: boolean }>({
    latency: false,
    shading: false,
    reporting: false,
  });

  const toggleSolution = (key: string) => {
    setActiveSolutions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Concept Showcase Stage tab state
  const [activeTab, setActiveTab] = useState<'parallel' | 'lifecycle' | 'floor' | 'normalization' | 'settlement'>('parallel');

  // Stepper state for Tab 2 (The 12ms Ad Lifecycle)
  const [lifecycleStep, setLifecycleStep] = useState<number>(0);

  // Source selector state for Tab 4 (Smart Normalization)
  const [selectedSource, setSelectedSource] = useState<'display' | 'video' | 'ctv' | 'app'>('display');

  // Floor strategy for Tab 3 (Floor Optimization)
  const [floorStrategy, setFloorStrategy] = useState<'unprotected' | 'optimized'>('optimized');

  const lifecycleSteps = [
    {
      step: '01',
      title: 'Container & Prebid Init',
      time: '1.2ms',
      desc: 'Lightweight client SDK initializes ad container and builds OpenRTB bid request payload.',
      param: 'device.w: 1920, imp[0].banner.format: 300x250',
    },
    {
      step: '02',
      title: 'Edge Server-to-Server Dispatch',
      time: '3.4ms',
      desc: 'Bid request broadcast simultaneously to 180+ global DSP endpoints via nearest Cloudflare Edge POP.',
      param: 'bcat: [], battr: [], tmax: 85ms SLA, s2s: true',
    },
    {
      step: '03',
      title: 'AI Floor & Bid Arbitration',
      time: '2.8ms',
      desc: 'Machine learning model evaluates session depth and adjusts floor prices to block DSP bid shading.',
      param: 'bidfloor: $4.20 USD, algorithm: dynamic_yield_v3',
    },
    {
      step: '04',
      title: 'Winning Creative Render',
      time: '4.0ms',
      desc: 'Highest clearing bid selected, creative asset cached and rendered with MRC viewability beacons.',
      param: 'clearing_cpm: $4.85, winner: "Google AdX", latency: 11.4ms',
    },
  ];

  return (
    <section className="py-24 bg-white border-b border-slate-200 relative overflow-hidden" id="how-it-works">
      {/* Ambient background decoration */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#FF5C00]/5 via-[#FF5C00]/2 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-slate-100 to-transparent rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* ========================================================= */}
        {/* PART 1: THE MONETIZATION BOTTLENECKS (BLUEPRINT SCENES) */}
        {/* ========================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-mono text-[#FF5C00] font-semibold mb-4 shadow-sm">
            <Sliders className="w-3.5 h-3.5" />
            <span>THE MONETIZATION BOTTLENECKS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-5 leading-tight">
            The Hidden Flaws Costing Publishers{' '}
            <span className="font-serif italic font-normal text-[#FF5C00]">
              35%+ of Their Yield.
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Traditional ad monetization setups suffer from waterfall latency, programmatic bid shading, 
            and fragmented reporting. Here is how BidDigi re-engineers every layer.
          </p>
        </div>

        {/* 3 Challenge Cards Grid with Interactive SVG Blueprint Scenes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
          {/* Card 1: Waterfall Latency */}
          <div className="rounded-3xl border border-slate-200/90 bg-[#FAFAFC] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
            {/* SVG Blueprint Scene Drawing */}
            <div className="h-44 bg-slate-100/70 border-b border-slate-200/80 p-4 relative flex items-center justify-center overflow-hidden">
              <span className="absolute top-3 left-4 text-xs font-mono font-bold text-slate-400">
                SCENE 01 / LATENCY CASCADE
              </span>

              {/* Schematic Illustration */}
              <svg viewBox="0 0 320 120" className="w-full h-full max-w-[280px]">
                {/* Background Grid */}
                <line x1="20" y1="30" x2="300" y2="30" stroke="#CBD5E1" strokeDasharray="3 3" />
                <line x1="20" y1="60" x2="300" y2="60" stroke="#CBD5E1" strokeDasharray="3 3" />
                <line x1="20" y1="90" x2="300" y2="90" stroke="#CBD5E1" strokeDasharray="3 3" />

                {!activeSolutions.latency ? (
                  // Waterfall sequential drop-off drawing
                  <g>
                    {/* Tier 1 */}
                    <rect x="30" y="20" width="55" height="20" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
                    <text x="57" y="34" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#475569">Tier 1: 60ms</text>
                    <path d="M 85 30 L 105 50" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2 2" />

                    {/* Tier 2 */}
                    <rect x="105" y="40" width="55" height="20" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
                    <text x="132" y="54" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#475569">Tier 2: 140ms</text>
                    <path d="M 160 50 L 180 70" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2 2" />

                    {/* Tier 3 */}
                    <rect x="180" y="60" width="55" height="20" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1" />
                    <text x="207" y="74" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#475569">Tier 3: 240ms</text>
                    <path d="M 235 70 L 255 90" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2 2" />

                    {/* Drop-off outcome */}
                    <rect x="255" y="80" width="55" height="22" rx="4" fill="#FEE2E2" stroke="#EF4444" strokeWidth="1.5" />
                    <text x="282" y="94" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#DC2626" fontWeight="bold">TIMEOUT</text>
                  </g>
                ) : (
                  // BidDigi Parallel Edge Hub drawing
                  <g>
                    {/* Center Core */}
                    <circle cx="160" cy="60" r="24" fill="#FFF7ED" stroke="#FF5C00" strokeWidth="2" />
                    <text x="160" y="63" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#FF5C00" fontWeight="bold">BIDDIGI</text>

                    {/* Simultaneous Parallel Beams */}
                    <path d="M 40 30 Q 100 45 136 55" stroke="#FF5C00" strokeWidth="2" fill="none" />
                    <circle cx="40" cy="30" r="10" fill="#FFFFFF" stroke="#CBD5E1" />
                    <text x="40" y="33" fontSize="7" textAnchor="middle" fill="#0F172A">AdX</text>

                    <path d="M 40 90 Q 100 75 136 65" stroke="#FF5C00" strokeWidth="2" fill="none" />
                    <circle cx="40" cy="90" r="10" fill="#FFFFFF" stroke="#CBD5E1" />
                    <text x="40" y="93" fontSize="7" textAnchor="middle" fill="#0F172A">TTD</text>

                    <path d="M 280 30 Q 220 45 184 55" stroke="#FF5C00" strokeWidth="2" fill="none" />
                    <circle cx="280" cy="30" r="10" fill="#FFFFFF" stroke="#CBD5E1" />
                    <text x="280" y="33" fontSize="7" textAnchor="middle" fill="#0F172A">CTV</text>

                    <path d="M 280 90 Q 220 75 184 65" stroke="#FF5C00" strokeWidth="2" fill="none" />
                    <circle cx="280" cy="90" r="10" fill="#FFFFFF" stroke="#CBD5E1" />
                    <text x="280" y="93" fontSize="7" textAnchor="middle" fill="#0F172A">TAM</text>

                    <rect x="125" y="96" width="70" height="18" rx="4" fill="#ECFDF5" stroke="#10B981" />
                    <text x="160" y="108" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#059669" fontWeight="bold">8.4ms BURST</text>
                  </g>
                )}
              </svg>
            </div>

            {/* Card Content Body */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF5C00] flex items-center justify-center font-bold text-xs">
                    01
                  </span>
                  <h3 className="font-bold text-lg text-slate-900">
                    Waterfall Latency & Drop-Offs
                  </h3>
                </div>

                {!activeSolutions.latency ? (
                  <div className="space-y-3 text-sm text-slate-600">
                    <p>
                      Sequential daisy-chain waterfalls call demand partners one by one. Slow ad responses cause high reader bounce rates and lost impressions.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-500 font-mono pt-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        50–80ms lag per ad network hop
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        18%+ reader bounce before ad loads
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Lost secondary bids from lower tiers
                      </li>
                    </ul>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 text-sm"
                  >
                    <span className="text-[11px] font-mono font-bold text-[#FF5C00] uppercase tracking-wider block">
                      With BidDigi Edge Prebid
                    </span>
                    <h4 className="font-bold text-slate-900 text-base">
                      Parallel Server-to-Server Bidding
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      All 180+ DSPs are queried simultaneously in a single 8.4ms burst via Cloudflare edge workers. Zero client latency and maximum competition.
                    </p>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold flex items-center justify-between">
                      <span>Latency Reduction</span>
                      <span className="text-emerald-700">-72% SLA</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Interactive Toggle Button */}
              <button
                onClick={() => toggleSolution('latency')}
                className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#FF5C00] hover:text-[#E05200] transition-colors cursor-pointer group"
              >
                <span>{activeSolutions.latency ? '← View the Problem' : 'See how BidDigi solves this →'}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 2: DSP Bid Shading */}
          <div className="rounded-3xl border border-slate-200/90 bg-[#FAFAFC] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
            {/* SVG Blueprint Scene Drawing */}
            <div className="h-44 bg-slate-100/70 border-b border-slate-200/80 p-4 relative flex items-center justify-center overflow-hidden">
              <span className="absolute top-3 left-4 text-xs font-mono font-bold text-slate-400">
                SCENE 02 / BID SHADING LOSS
              </span>

              {/* Schematic Illustration */}
              <svg viewBox="0 0 320 120" className="w-full h-full max-w-[280px]">
                {/* Background Grid */}
                <line x1="20" y1="30" x2="300" y2="30" stroke="#CBD5E1" strokeDasharray="3 3" />
                <line x1="20" y1="60" x2="300" y2="60" stroke="#CBD5E1" strokeDasharray="3 3" />
                <line x1="20" y1="90" x2="300" y2="90" stroke="#CBD5E1" strokeDasharray="3 3" />

                {!activeSolutions.shading ? (
                  // DSP Shading diagram
                  <g>
                    {/* True value bar */}
                    <rect x="50" y="30" width="40" height="65" rx="4" fill="#94A3B8" />
                    <text x="70" y="65" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#FFFFFF">$5.20</text>
                    <text x="70" y="105" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="#64748B">True Value</text>

                    {/* Arrow down showing discount */}
                    <path d="M 120 40 L 150 70" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrow)" />
                    <text x="140" y="45" fontSize="8" fontFamily="monospace" fill="#EF4444" fontWeight="bold">-38%</text>

                    {/* Shaded bid */}
                    <rect x="180" y="65" width="40" height="30" rx="4" fill="#F87171" />
                    <text x="200" y="83" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#FFFFFF">$3.20</text>
                    <text x="200" y="105" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="#EF4444">Shaded Bid</text>

                    <rect x="240" y="50" width="60" height="24" rx="4" fill="#FEE2E2" stroke="#EF4444" />
                    <text x="270" y="65" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#DC2626" fontWeight="bold">-$2.00 LOST</text>
                  </g>
                ) : (
                  // AI Floor Defense diagram
                  <g>
                    {/* Baseline */}
                    <rect x="50" y="65" width="40" height="30" rx="4" fill="#CBD5E1" />
                    <text x="70" y="83" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#475569">$3.20</text>
                    <text x="70" y="105" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="#64748B">Unprotected</text>

                    {/* Dynamic AI Floor boundary line */}
                    <line x1="30" y1="42" x2="290" y2="42" stroke="#FF5C00" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="160" y="36" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#FF5C00" fontWeight="bold">
                      AI FLOOR: $4.50
                    </text>

                    {/* Protected Bid */}
                    <rect x="180" y="38" width="45" height="57" rx="4" fill="#FF5C00" />
                    <text x="202" y="68" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#FFFFFF">$4.85</text>
                    <text x="202" y="105" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="#FF5C00" fontWeight="bold">Clearing CPM</text>

                    <rect x="245" y="55" width="60" height="24" rx="4" fill="#ECFDF5" stroke="#10B981" />
                    <text x="275" y="70" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#059669" fontWeight="bold">+38.4% GAIN</text>
                  </g>
                )}
              </svg>
            </div>

            {/* Card Content Body */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF5C00] flex items-center justify-center font-bold text-xs">
                    02
                  </span>
                  <h3 className="font-bold text-lg text-slate-900">
                    DSP Bid Shading & Margin Leak
                  </h3>
                </div>

                {!activeSolutions.shading ? (
                  <div className="space-y-3 text-sm text-slate-600">
                    <p>
                      Demand platforms use machine learning algorithms to shade bids down to the minimum clearing price, pocketing the publisher's margin.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-500 font-mono pt-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Up to 38% lost per auction to DSP shading
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Static floor prices fail during traffic spikes
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Zero algorithmic defense for publishers
                      </li>
                    </ul>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 text-sm"
                  >
                    <span className="text-[11px] font-mono font-bold text-[#FF5C00] uppercase tracking-wider block">
                      With BidDigi Dynamic Floors
                    </span>
                    <h4 className="font-bold text-slate-900 text-base">
                      Predictive Real-Time Floor Tuning
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      BidDigi continuously monitors DSP bidding patterns and raises algorithmic floors just enough to capture full value without sacrificing fill.
                    </p>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold flex items-center justify-between">
                      <span>Net Yield Uplift</span>
                      <span className="text-emerald-700">+38.4% Avg</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Interactive Toggle Button */}
              <button
                onClick={() => toggleSolution('shading')}
                className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#FF5C00] hover:text-[#E05200] transition-colors cursor-pointer group"
              >
                <span>{activeSolutions.shading ? '← View the Problem' : 'See how BidDigi solves this →'}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 3: Disjointed Reporting */}
          <div className="rounded-3xl border border-slate-200/90 bg-[#FAFAFC] overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300">
            {/* SVG Blueprint Scene Drawing */}
            <div className="h-44 bg-slate-100/70 border-b border-slate-200/80 p-4 relative flex items-center justify-center overflow-hidden">
              <span className="absolute top-3 left-4 text-xs font-mono font-bold text-slate-400">
                SCENE 03 / DATA FRAGMENTATION
              </span>

              {/* Schematic Illustration */}
              <svg viewBox="0 0 320 120" className="w-full h-full max-w-[280px]">
                {/* Background Grid */}
                <line x1="20" y1="30" x2="300" y2="30" stroke="#CBD5E1" strokeDasharray="3 3" />
                <line x1="20" y1="60" x2="300" y2="60" stroke="#CBD5E1" strokeDasharray="3 3" />
                <line x1="20" y1="90" x2="300" y2="90" stroke="#CBD5E1" strokeDasharray="3 3" />

                {!activeSolutions.reporting ? (
                  // Disconnected chaotic sheets
                  <g>
                    <rect x="30" y="25" width="60" height="40" rx="4" fill="#FFFFFF" stroke="#94A3B8" />
                    <text x="60" y="45" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="#64748B">DSP 1 (USD)</text>
                    <text x="60" y="55" fontSize="6" fontFamily="monospace" textAnchor="middle" fill="#EF4444">Discrepancy</text>

                    <rect x="130" y="15" width="60" height="40" rx="4" fill="#FFFFFF" stroke="#94A3B8" />
                    <text x="160" y="35" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="#64748B">DSP 2 (EUR)</text>
                    <text x="160" y="45" fontSize="6" fontFamily="monospace" textAnchor="middle" fill="#EF4444">Net 90 Terms</text>

                    <rect x="230" y="30" width="60" height="40" rx="4" fill="#FFFFFF" stroke="#94A3B8" />
                    <text x="260" y="50" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="#64748B">DSP 3 (GBP)</text>
                    <text x="260" y="60" fontSize="6" fontFamily="monospace" textAnchor="middle" fill="#EF4444">IVT Clawbacks</text>

                    <path d="M 90 45 L 130 35" stroke="#CBD5E1" strokeDasharray="3 3" />
                    <path d="M 190 35 L 230 50" stroke="#CBD5E1" strokeDasharray="3 3" />

                    <rect x="110" y="80" width="100" height="20" rx="4" fill="#FEE2E2" stroke="#EF4444" />
                    <text x="160" y="93" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#DC2626" fontWeight="bold">25+ HOURS WASTED</text>
                  </g>
                ) : (
                  // Unified Normalized Stream
                  <g>
                    <rect x="30" y="20" width="60" height="22" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
                    <text x="60" y="34" fontSize="7" textAnchor="middle" fill="#475569">180+ DSPs</text>

                    <rect x="30" y="55" width="60" height="22" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
                    <text x="60" y="69" fontSize="7" textAnchor="middle" fill="#475569">All Formats</text>

                    <path d="M 90 31 L 135 48" stroke="#FF5C00" strokeWidth="2" />
                    <path d="M 90 66 L 135 52" stroke="#FF5C00" strokeWidth="2" />

                    <rect x="135" y="35" width="70" height="30" rx="6" fill="#FFF7ED" stroke="#FF5C00" strokeWidth="2" />
                    <text x="170" y="53" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#FF5C00" fontWeight="bold">BIDDIGI HUB</text>

                    <path d="M 205 50 L 235 50" stroke="#10B981" strokeWidth="2" />

                    <rect x="235" y="32" width="75" height="36" rx="6" fill="#ECFDF5" stroke="#10B981" />
                    <text x="272" y="47" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="#059669" fontWeight="bold">1 CLEAR VIEW</text>
                    <text x="272" y="58" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="#059669">Net 30 Payout</text>
                  </g>
                )}
              </svg>
            </div>

            {/* Card Content Body */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF5C00] flex items-center justify-center font-bold text-xs">
                    03
                  </span>
                  <h3 className="font-bold text-lg text-slate-900">
                    Disjointed Reporting & Chaos
                  </h3>
                </div>

                {!activeSolutions.reporting ? (
                  <div className="space-y-3 text-sm text-slate-600">
                    <p>
                      Reconciling 15+ different DSP portals with disparate currencies, conflicting metrics, and delayed Net 60/90 payment terms causes severe administrative strain.
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-500 font-mono pt-2">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        20+ hours wasted monthly on spreadsheets
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Unhedged FX currency loss across DSPs
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Unresolved clawbacks & payment disputes
                      </li>
                    </ul>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3 text-sm"
                  >
                    <span className="text-[11px] font-mono font-bold text-[#FF5C00] uppercase tracking-wider block">
                      With BidDigi Unified Core
                    </span>
                    <h4 className="font-bold text-slate-900 text-base">
                      Unified Telemetry & Net 30 Settlement
                    </h4>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      BidDigi normalizes all currencies and viewability metrics in real-time. You receive a single consolidated Net 30 wire transfer with 100% audit transparency.
                    </p>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold flex items-center justify-between">
                      <span>Reporting Time Saved</span>
                      <span className="text-emerald-700">85% Automated</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Interactive Toggle Button */}
              <button
                onClick={() => toggleSolution('reporting')}
                className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#FF5C00] hover:text-[#E05200] transition-colors cursor-pointer group"
              >
                <span>{activeSolutions.reporting ? '← View the Problem' : 'See how BidDigi solves this →'}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PART 2: THE INTERACTIVE CONCEPT SHOWCASE (MFUSION STAGE) */}
        {/* ========================================================= */}
        <div className="liquid-glass-light p-6 md:p-12 rounded-3xl border border-slate-200/90 shadow-xl bg-white relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#FF5C00] font-bold block mb-2">
              HOW PROGRAMMATIC YIELD ACTUALLY WORKS
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              One Unified Engine. Complete Clarity.
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Click through the interactive architectural tabs below to explore how BidDigi orchestrates 
              every millisecond of the ad monetization lifecycle.
            </p>
          </div>

          {/* 2-Column Showcase Layout (Vertical Tabs Left + Interactive Stage Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Interactive Concept Tabs (Col 5) */}
            <div className="lg:col-span-5 space-y-2.5">
              {[
                {
                  id: 'parallel',
                  icon: Zap,
                  title: 'Instant DSP Parallelization',
                  subtitle: 'Simultaneous sub-12ms queries across 180+ global demand partners',
                },
                {
                  id: 'lifecycle',
                  icon: Activity,
                  title: 'The 12ms Ad Request Lifecycle',
                  subtitle: 'Step-by-step trace from ad container trigger to winning render',
                },
                {
                  id: 'floor',
                  icon: ShieldCheck,
                  title: 'Dynamic AI Floor Protection',
                  subtitle: 'Algorithmic defense against programmatic DSP bid shading',
                },
                {
                  id: 'normalization',
                  icon: Layers,
                  title: 'Smart AdOps Normalization',
                  subtitle: 'Automated multi-currency, MRC viewability, and anti-fraud standard',
                },
                {
                  id: 'settlement',
                  icon: DollarSign,
                  title: 'Unified Net 30 Settlement',
                  subtitle: 'Single monthly guaranteed wire transfer with zero reconciliation',
                },
              ].map((tab) => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 border ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/10'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#FF5C00] text-white' : 'bg-white text-[#FF5C00] border border-slate-200'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {tab.title}
                        </div>
                        <div className={`text-xs mt-0.5 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                          {tab.subtitle}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-[#FF5C00] translate-x-1' : 'text-slate-400'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Right Column: Interactive Stage Container (Col 7) */}
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-slate-50/60 p-6 md:p-8 min-h-[460px] flex flex-col justify-between">
              {/* Stage Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-medium">
                  EXPLORE BIDDIGI ARCHITECTURE
                </span>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-[#FF5C00]">
                  Interactive Preview
                </span>
              </div>

              {/* Dynamic Tab Stage Content */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  {/* TAB 1: PARALLEL HEADER BIDDING */}
                  {activeTab === 'parallel' && (
                    <motion.div
                      key="stage-parallel"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="text-xl font-bold text-slate-950">
                          Two Connections. Unlimited Global Scale.
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                          Bring Google AdX, The Trade Desk, Magnite, and Amazon into a unified parallel bidstream without page slowdown.
                        </p>
                      </div>

                      {/* Interactive Diagram */}
                      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-around gap-4 mb-4">
                          <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                            Google AdX
                          </div>
                          <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                            The Trade Desk
                          </div>
                          <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                            Magnite CTV
                          </div>
                        </div>

                        {/* Flow Arrows into Center */}
                        <svg viewBox="0 0 400 60" className="w-full h-12">
                          <path d="M 70 5 Q 70 35 200 50" fill="none" stroke="#FF5C00" strokeWidth="2" strokeDasharray="4 4" />
                          <path d="M 200 5 L 200 50" fill="none" stroke="#FF5C00" strokeWidth="2" strokeDasharray="4 4" />
                          <path d="M 330 5 Q 330 35 200 50" fill="none" stroke="#FF5C00" strokeWidth="2" strokeDasharray="4 4" />
                        </svg>

                        {/* Central BidDigi Engine */}
                        <div className="mx-auto max-w-xs p-4 rounded-xl bg-orange-50 border border-[#FF5C00]/40 text-center">
                          <span className="text-xs font-mono font-bold text-[#FF5C00] block">
                            BIDDIGI PARALLEL PREBID ENGINE
                          </span>
                          <span className="text-[11px] text-slate-600 block mt-0.5">
                            Sub-12ms S2S Broadcast & Yield Arbitration
                          </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
                          <span>Real-Time Demand: 180+ DSPs</span>
                          <span className="text-emerald-600 font-bold">Latency: 8.4ms SLA</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: THE 12MS AD REQUEST LIFECYCLE */}
                  {activeTab === 'lifecycle' && (
                    <motion.div
                      key="stage-lifecycle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="text-xl font-bold text-slate-950">
                          Follow the Sub-Second Path to Clearing.
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                          Click each milestone below to inspect the OpenRTB payload transmitted during the 12 millisecond lifecycle.
                        </p>
                      </div>

                      {/* Interactive Touchpoint Stepper Rail */}
                      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
                        <div className="relative mb-6">
                          {/* Rail Line */}
                          <div className="absolute top-5 left-4 right-4 h-1 bg-slate-200 -z-0">
                            <motion.div 
                              className="h-full bg-[#FF5C00]"
                              animate={{ width: `${(lifecycleStep / (lifecycleSteps.length - 1)) * 100}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>

                          {/* 4 Interactive Steps */}
                          <div className="flex items-center justify-between relative z-10">
                            {lifecycleSteps.map((step, idx) => {
                              const isActive = lifecycleStep === idx;
                              const isPast = lifecycleStep >= idx;

                              return (
                                <button
                                  key={step.step}
                                  onClick={() => setLifecycleStep(idx)}
                                  className="flex flex-col items-center group cursor-pointer focus:outline-none"
                                >
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                                    isActive
                                      ? 'bg-[#FF5C00] text-white ring-4 ring-[#FF5C00]/20 shadow-md scale-110'
                                      : isPast
                                      ? 'bg-slate-900 text-white'
                                      : 'bg-white text-slate-500 border border-slate-300'
                                  }`}>
                                    {step.step}
                                  </div>
                                  <span className={`text-[10px] font-mono mt-1.5 font-semibold ${
                                    isActive ? 'text-[#FF5C00]' : 'text-slate-500'
                                  }`}>
                                    {step.time}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Active Step Payload Inspector */}
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-[#FF5C00]">
                                STEP {lifecycleSteps[lifecycleStep].step}
                              </span>
                              <span className="text-xs font-bold text-slate-900">
                                {lifecycleSteps[lifecycleStep].title}
                              </span>
                            </div>
                            <span className="text-xs font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              {lifecycleSteps[lifecycleStep].time}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 mb-3">
                            {lifecycleSteps[lifecycleStep].desc}
                          </p>

                          <div className="p-2.5 rounded-lg bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto">
                            <code>{`// OpenRTB 3.0 Telemetry:\n${lifecycleSteps[lifecycleStep].param}`}</code>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: DYNAMIC FLOOR PROTECTION */}
                  {activeTab === 'floor' && (
                    <motion.div
                      key="stage-floor"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="text-xl font-bold text-slate-950">
                          Outsmart DSP Bid Shading Algorithms.
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                          Toggle between an unoptimized floor and BidDigi's real-time AI floor optimizer to see the revenue impact.
                        </p>
                      </div>

                      {/* Interactive Floor Switcher */}
                      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-6">
                        <div className="flex items-center justify-center gap-3">
                          <button
                            onClick={() => setFloorStrategy('unprotected')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                              floorStrategy === 'unprotected'
                                ? 'bg-rose-50 text-rose-700 border border-rose-300'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            Unprotected (Bid Shaded)
                          </button>
                          <button
                            onClick={() => setFloorStrategy('optimized')}
                            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                              floorStrategy === 'optimized'
                                ? 'bg-[#FF5C00] text-white shadow-md shadow-[#FF5C00]/25'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            BidDigi AI Floor Protected
                          </button>
                        </div>

                        {/* Comparative Visual Bars */}
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-xs font-mono mb-1">
                              <span className="text-slate-600">DSP Submitted Value</span>
                              <span className="font-bold text-slate-900">$5.10 CPM</span>
                            </div>
                            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full bg-slate-400 w-[85%]" />
                            </div>
                          </div>

                          <div>
                            <div className="flex justify-between text-xs font-mono mb-1">
                              <span className="text-slate-600">Publisher Clearing Price</span>
                              <span className={`font-bold ${floorStrategy === 'optimized' ? 'text-[#FF5C00]' : 'text-rose-600'}`}>
                                {floorStrategy === 'optimized' ? '$4.85 CPM (+38.4%)' : '$3.20 CPM (Shaded)'}
                              </span>
                            </div>
                            <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                              <motion.div 
                                className={`h-full ${floorStrategy === 'optimized' ? 'bg-[#FF5C00]' : 'bg-rose-500'}`}
                                animate={{ width: floorStrategy === 'optimized' ? '80%' : '52%' }}
                                transition={{ duration: 0.4 }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                          <span className="font-mono text-slate-600">Effective Monthly Revenue Gain:</span>
                          <span className="font-mono font-bold text-emerald-600 text-sm">
                            {floorStrategy === 'optimized' ? '+$18,400.00' : '$0.00'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: SMART ADOPS NORMALIZATION */}
                  {activeTab === 'normalization' && (
                    <motion.div
                      key="stage-normalization"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="text-xl font-bold text-slate-950">
                          Universal Normalization. One Format.
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                          Select an omnichannel ad source to see how BidDigi normalizes currencies, viewability, and anti-fraud protocols in real time.
                        </p>
                      </div>

                      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
                        {/* Source Selectors */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'display', label: 'Web Display' },
                            { id: 'video', label: 'In-Article Video' },
                            { id: 'ctv', label: 'Connected TV' },
                            { id: 'app', label: 'Mobile SDK' },
                          ].map((s) => (
                            <button
                              key={s.id}
                              onClick={() => setSelectedSource(s.id as any)}
                              className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                                selectedSource === s.id
                                  ? 'bg-slate-900 text-white'
                                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>

                        {/* Normalized Compliance Table */}
                        <div className="divide-y divide-slate-100 text-xs font-mono">
                          <div className="py-2.5 flex items-center justify-between">
                            <span className="text-slate-500">Currency Alignment</span>
                            <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Real-time USD / EUR / GBP FX
                            </span>
                          </div>
                          <div className="py-2.5 flex items-center justify-between">
                            <span className="text-slate-500">Viewability Standard</span>
                            <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" /> MRC 100% Verified
                            </span>
                          </div>
                          <div className="py-2.5 flex items-center justify-between">
                            <span className="text-slate-500">Anti-Fraud & IVT</span>
                            <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" /> TAG Certified & ads.txt 1.1
                            </span>
                          </div>
                          <div className="py-2.5 flex items-center justify-between">
                            <span className="text-slate-500">Auction Protocol</span>
                            <span className="text-slate-900 font-bold">OpenRTB 3.0 Edge S2S</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 5: UNIFIED NET 30 SETTLEMENT */}
                  {activeTab === 'settlement' && (
                    <motion.div
                      key="stage-settlement"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-6"
                    >
                      <div>
                        <h4 className="text-xl font-bold text-slate-950">
                          Zero Clawbacks. Guaranteed Net 30 Payouts.
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1">
                          No more chasing 15 different ad networks for delayed wire transfers. One transparent statement.
                        </p>
                      </div>

                      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-3 font-mono text-xs">
                        <div className="flex justify-between py-2 border-b border-slate-100 text-slate-600">
                          <span>Gross Programmatic Bids (180+ DSPs):</span>
                          <span className="font-bold text-slate-900">$148,250.00</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100 text-slate-600">
                          <span>Transparent Publisher Direct Share:</span>
                          <span className="font-bold text-[#FF5C00]">90% Direct ($133,425.00)</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-100 text-slate-600">
                          <span>IVT Fraud Chargeback Insurance:</span>
                          <span className="font-bold text-emerald-600">$0.00 (Zero Deductions)</span>
                        </div>
                        <div className="flex justify-between py-3 rounded-xl bg-emerald-50 px-4 border border-emerald-200 text-emerald-800 text-sm font-bold">
                          <span>Guaranteed Net 30 Wire:</span>
                          <span>$133,425.00</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Stage Bottom Caption */}
              <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Unified in app.biddigi.io</span>
                <span className="text-[#FF5C00] font-bold">Engineered by Expoworld</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
