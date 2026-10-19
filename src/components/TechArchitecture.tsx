import React from 'react';
import { Globe, Cpu, Shield } from 'lucide-react';

export const TechArchitecture: React.FC = () => {
  return (
    <section id="architecture" className="py-24 relative overflow-hidden bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-[#FF5C00] font-semibold mb-4">
            <span>INFRASTRUCTURE & PREBID BENCHMARKS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-6">
            Engineered For Zero Latency.{' '}
            <span className="font-serif italic font-normal text-[#FF5C00]">
              Tested at Scale.
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Traditional ad tech waterfalls destroy page load and user experience. 
            BidDigi operates a distributed, edge-routed Prebid cluster with real-time log telemetry.
          </p>
        </div>

        {/* Bento Grid in Light Theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Multi-Region Edge Clusters (Col-span 2) */}
          <div className="md:col-span-2 liquid-glass-light p-8 md:p-10 relative overflow-hidden group">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-[#FF5C00]/10 text-[#FF5C00] border border-[#FF5C00]/20">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-slate-500 font-bold uppercase tracking-widest">
                Global Edge Presence
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-950 mb-4">
              Multi-Region Edge Prebid Server Clusters
            </h3>

            <p className="text-slate-600 text-sm max-w-xl mb-8 leading-relaxed">
              Auctions execute at the closest edge point-of-presence (PoP) to your visitors. 
              Our distributed cluster processes 180+ simultaneous DSP calls without taxing visitor device CPUs or mobile batteries.
            </p>

            {/* Edge Nodes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  LHR-01
                </div>
                <div className="text-slate-900 font-semibold mt-1">London, UK</div>
                <div className="text-slate-500 text-[10px] mt-0.5">3.8ms Latency</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  BOM-02
                </div>
                <div className="text-slate-900 font-semibold mt-1">Mumbai, IN</div>
                <div className="text-slate-500 text-[10px] mt-0.5">5.1ms Latency</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  IAD-03
                </div>
                <div className="text-slate-900 font-semibold mt-1">Ashburn, USA</div>
                <div className="text-slate-500 text-[10px] mt-0.5">4.2ms Latency</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-emerald-700 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  SIN-04
                </div>
                <div className="text-slate-900 font-semibold mt-1">Singapore</div>
                <div className="text-slate-500 text-[10px] mt-0.5">6.4ms Latency</div>
              </div>
            </div>
          </div>

          {/* Card 2: AI Floor Price Engine */}
          <div className="liquid-glass-light-orange p-8 flex flex-col justify-between">
            <div>
              <div className="p-2.5 rounded-xl bg-[#FF5C00]/10 text-[#FF5C00] border border-[#FF5C00]/20 w-fit mb-6">
                <Cpu className="w-5 h-5" />
              </div>

              <span className="text-xs font-mono text-slate-500 font-bold uppercase tracking-widest block mb-2">
                Machine Learning
              </span>

              <h3 className="text-xl font-bold text-slate-950 mb-3">
                Dynamic Bid Shading Countermeasures
              </h3>

              <p className="text-slate-600 text-xs leading-relaxed mb-6">
                Buyers use algorithms to bid the bare minimum. Our real-time price discovery models predict buyer willingness-to-pay and protect high-value inventory.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 font-mono text-[11px] text-slate-300 space-y-1.5">
              <div className="text-[#FF5C00]">&gt; Model: XGBoost YieldFloor v4</div>
              <div>&gt; Input Signals: 24 Contextual Features</div>
              <div className="text-emerald-400">&gt; Fill Rate Impact: +0.4%</div>
              <div className="text-white font-bold">&gt; Net eCPM Gain: +34.2%</div>
            </div>
          </div>

          {/* Card 3: Privacy & Identity Resolution */}
          <div className="liquid-glass-light p-8 flex flex-col justify-between">
            <div>
              <div className="p-2.5 rounded-xl bg-[#FF5C00]/10 text-[#FF5C00] border border-[#FF5C00]/20 w-fit mb-6">
                <Shield className="w-5 h-5" />
              </div>

              <span className="text-xs font-mono text-slate-500 font-bold uppercase tracking-widest block mb-2">
                Post-Cookie Stack
              </span>

              <h3 className="text-xl font-bold text-slate-950 mb-3">
                Universal ID & Clean Rooms
              </h3>

              <p className="text-slate-600 text-xs leading-relaxed">
                Native integration with Unified ID 2.0 (UID2), ID5, LiveRamp RampID, and SharedID to monetize safari and cookieless traffic without leaks.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-mono text-slate-600">
              <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">UID 2.0</span>
              <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">ID5 Universal</span>
              <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">RampID</span>
              <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-200">TCF 2.2</span>
            </div>
          </div>

          {/* Card 4: 1-Line Embed SDK (Col-span 2) */}
          <div className="md:col-span-2 liquid-glass-light p-8 md:p-10 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono text-slate-500 font-bold uppercase tracking-widest block mb-1">
                  Developer Integration
                </span>
                <h3 className="text-2xl font-bold text-slate-950">
                  Drop-In Script Integration
                </h3>
              </div>

              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full w-fit font-bold">
                Async Non-Blocking &lt; 2KB
              </span>
            </div>

            {/* Code snippet block */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
              <div className="text-slate-500 mb-2">// In the &lt;head&gt; of your publication</div>
              <div>
                <span className="text-[#FF5C00]">&lt;script</span> <span className="text-slate-400">async src=</span><span className="text-emerald-300">"https://engine.biddigi.io/prebid.min.js"</span> <span className="text-slate-400">data-account=</span><span className="text-emerald-300">"EXP-BIDDIGI-8492"</span><span className="text-[#FF5C00]">&gt;&lt;/script&gt;</span>
              </div>
              <div className="mt-3 text-slate-500">// Instant prebid auctions, Google Ad Manager sync, and automatic lazy-loading</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
