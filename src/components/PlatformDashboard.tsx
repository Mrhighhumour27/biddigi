import React, { useState } from 'react';
import { 
  TrendingUp, 
  Activity, 
  Tv, 
  Smartphone, 
  Monitor
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PlatformDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'yield' | 'demand' | 'formats'>('yield');
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '1y'>('30d');

  return (
    <section id="platform" className="py-24 relative overflow-hidden bg-slate-50/70 border-b border-slate-200">
      {/* Background ambient light halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-[#FF5C00]/10 via-[#FF7A1A]/5 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-[#FF5C00] font-semibold mb-4 shadow-sm">
            <Activity className="w-3.5 h-3.5" />
            <span>UNDERSTAND YOUR AD PERFORMANCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-6">
            See What Your Ads Earn.{' '}
            <span className="font-serif italic font-normal text-[#FF5C00]">
              All in One View.
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            See revenue, buyer activity, and performance across your ad spaces. eCPM shows earnings per 1,000 ads; fill rate shows how often an ad request is filled. Explore the sample dashboard below—figures are illustrative, not live customer results.
          </p>

          {/* Interactive Tab Switcher */}
          <div className="inline-flex p-1.5 rounded-full bg-white border border-slate-200 mt-8 shadow-sm">
            <button
              onClick={() => setActiveTab('yield')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'yield'
                  ? 'bg-[#FF5C00] text-white shadow-md shadow-[#FF5C00]/25'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Revenue & Earnings
            </button>
            <button
              onClick={() => setActiveTab('demand')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'demand'
                  ? 'bg-[#FF5C00] text-white shadow-md shadow-[#FF5C00]/25'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Buyer Activity
            </button>
            <button
              onClick={() => setActiveTab('formats')}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer ${
                activeTab === 'formats'
                  ? 'bg-[#FF5C00] text-white shadow-md shadow-[#FF5C00]/25'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Ad Formats
            </button>
          </div>
        </div>

        {/* Realistic Dashboard Showcase Container */}
        <div className="liquid-glass-light p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-xl relative overflow-hidden bg-white">
          {/* Dashboard Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                <span className="w-3 h-3 rounded-full bg-slate-200"></span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-700">
                Sample dashboard / illustrative data
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-400">Timeframe:</span>
              {(['30d', '90d', '1y'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                    timeRange === r
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'yield' && (
              <motion.div
                key="yield"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs text-slate-500 font-mono block mb-1">Average eCPM</span>
                    <div className="text-2xl font-extrabold text-slate-950 font-mono flex items-center gap-2">
                      <span>$4.82</span>
                      <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        +38.4%
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono mt-1 block">vs. Legacy Waterfall</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs text-slate-500 font-mono block mb-1">Fill Rate</span>
                    <div className="text-2xl font-extrabold text-slate-950 font-mono flex items-center gap-2">
                      <span>99.4%</span>
                      <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        +4.1%
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono mt-1 block">Across 180+ DSPs</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs text-slate-500 font-mono block mb-1">Auction Latency</span>
                    <div className="text-2xl font-extrabold text-slate-950 font-mono flex items-center gap-2">
                      <span>8.4ms</span>
                      <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                        -72%
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono mt-1 block">Edge S2S Prebid</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <span className="text-xs text-slate-500 font-mono block mb-1">Net Revenue Index</span>
                    <div className="text-2xl font-extrabold text-[#FF5C00] font-mono flex items-center gap-2">
                      <span>138.4</span>
                      <TrendingUp className="w-4 h-4 text-[#FF5C00]" />
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono mt-1 block">Baseline = 100</span>
                  </div>
                </div>

                {/* Visual Area Chart (Comparing Legacy Waterfall vs BidDigi) */}
                <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">
                        Cumulative Publisher Yield Growth
                      </h4>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">
                        Performance comparison: Legacy Ad Waterfall vs. BidDigi Parallel Auction Engine
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-[#FF5C00]"></span>
                        <span className="font-bold text-slate-800">BidDigi Header Bidding</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                        <span className="text-slate-500">Legacy Waterfall</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Line / Area Graph */}
                  <div className="h-48 w-full relative">
                    <svg viewBox="0 0 800 200" className="w-full h-full overflow-visible">
                      <defs>
                        <linearGradient id="biddigiGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#FF5C00" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines */}
                      <line x1="0" y1="40" x2="800" y2="40" stroke="#E2E8F0" strokeDasharray="4 4" />
                      <line x1="0" y1="90" x2="800" y2="90" stroke="#E2E8F0" strokeDasharray="4 4" />
                      <line x1="0" y1="140" x2="800" y2="140" stroke="#E2E8F0" strokeDasharray="4 4" />

                      {/* Legacy Curve */}
                      <path
                        d="M 0 160 Q 200 155, 400 150 T 800 145"
                        fill="none"
                        stroke="#94A3B8"
                        strokeWidth="2.5"
                        strokeDasharray="6 6"
                      />

                      {/* BidDigi Gradient Area */}
                      <path
                        d="M 0 160 Q 200 120, 400 80 T 800 30 L 800 200 L 0 200 Z"
                        fill="url(#biddigiGrad)"
                      />

                      {/* BidDigi Curve */}
                      <path
                        d="M 0 160 Q 200 120, 400 80 T 800 30"
                        fill="none"
                        stroke="#FF5C00"
                        strokeWidth="3.5"
                      />

                      {/* End Highlight Dot */}
                      <circle cx="800" cy="30" r="5" fill="#FF5C00" />
                    </svg>

                    <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-3 pt-2 border-t border-slate-200">
                      <span>Week 1 (Migration)</span>
                      <span>Week 2 (Prebid S2S)</span>
                      <span>Week 3 (Floor Tuning)</span>
                      <span className="font-bold text-[#FF5C00]">Week 4 (+38.4% Peak Yield)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'demand' && (
              <motion.div
                key="demand"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Google AdX', qps: '14,200/s', uptime: '99.99%', latency: '8.1ms', status: 'Optimal' },
                    { name: 'The Trade Desk', qps: '18,500/s', uptime: '99.98%', latency: '7.8ms', status: 'Optimal' },
                    { name: 'Magnite (Telaria CTV)', qps: '9,400/s', uptime: '99.97%', latency: '11.4ms', status: 'Optimal' },
                    { name: 'Amazon TAM', qps: '12,100/s', uptime: '99.99%', latency: '9.2ms', status: 'Optimal' },
                    { name: 'PubMatic', qps: '11,800/s', uptime: '99.95%', latency: '8.9ms', status: 'Optimal' },
                    { name: 'OpenX', qps: '8,600/s', uptime: '99.94%', latency: '7.4ms', status: 'Optimal' },
                  ].map((dsp) => (
                    <div key={dsp.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span>{dsp.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          QPS: {dsp.qps} • Latency: {dsp.latency}
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                        {dsp.uptime}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'formats' && (
              <motion.div
                key="formats"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              >
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#FF5C00] mb-3">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-sm text-slate-900">Display & Rich Media</h5>
                  <p className="text-xs text-slate-500 mt-1">Standard IAB banners, interstitial anchors, and dynamic units with 86%+ viewability.</p>
                  <span className="text-xs font-mono font-bold text-[#FF5C00] mt-3 block">eCPM: $3.80 - $6.20</span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#FF5C00] mb-3">
                    <Tv className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-sm text-slate-900">In-Article Video & CTV</h5>
                  <p className="text-xs text-slate-500 mt-1">Sound-off outstream video, VAST 4.2 pre-roll, and Connected TV programmatic insertions.</p>
                  <span className="text-xs font-mono font-bold text-[#FF5C00] mt-3 block">eCPM: $12.50 - $28.00</span>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#FF5C00] mb-3">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h5 className="font-bold text-sm text-slate-900">Mobile In-App SDK</h5>
                  <p className="text-xs text-slate-500 mt-1">Ultralight iOS & Android binary under 800KB. Native rewarded ads and zero crash rate.</p>
                  <span className="text-xs font-mono font-bold text-[#FF5C00] mt-3 block">eCPM: $14.00 - $22.50</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
