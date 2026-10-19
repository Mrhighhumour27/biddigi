import React from 'react';
import { Globe, Cpu, Shield } from 'lucide-react';

export const TechArchitecture: React.FC = () => {
  return (
    <section id="architecture" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#FF7A1A] mb-4">
            <span>04 / INFRASTRUCTURE & BENCHMARKS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Engineered For Zero Latency.{' '}
            <span className="font-serif italic font-normal text-[#FF7A1A]">
              Tested at Scale.
            </span>
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg">
            Traditional ad tech waterfalls destroy user experience. BidDigi operates an edge-routed, 
            multi-tenant Prebid cluster with real-time telemetry.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Multi-Region Edge Clusters (Col-span 2) */}
          <div className="md:col-span-2 liquid-glass-subtle p-8 md:p-10 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5C00]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-white/5 text-[#FF5C00] border border-white/10">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                Global Edge Presence
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Multi-Region Edge Prebid Server Clusters
            </h3>

            <p className="text-neutral-300 text-sm max-w-xl mb-8 leading-relaxed">
              Auctions execute at the closest edge point-of-presence (PoP) to your visitors. 
              Our distributed cluster processes 180+ simultaneous DSP calls without taxing visitor device CPUs or mobile batteries.
            </p>

            {/* Edge Nodes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LHR-01
                </div>
                <div className="text-white mt-1">London, UK</div>
                <div className="text-neutral-400 text-[10px] mt-0.5">3.8ms Latency</div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  BOM-02
                </div>
                <div className="text-white mt-1">Mumbai, IN</div>
                <div className="text-neutral-400 text-[10px] mt-0.5">5.1ms Latency</div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  IAD-03
                </div>
                <div className="text-white mt-1">Ashburn, USA</div>
                <div className="text-neutral-400 text-[10px] mt-0.5">4.2ms Latency</div>
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  SIN-04
                </div>
                <div className="text-white mt-1">Singapore</div>
                <div className="text-neutral-400 text-[10px] mt-0.5">6.4ms Latency</div>
              </div>
            </div>
          </div>

          {/* Card 2: AI Floor Price Engine */}
          <div className="liquid-glass-orange p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="p-2.5 rounded-xl bg-white/5 text-[#FF5C00] border border-white/10 w-fit mb-6">
                <Cpu className="w-5 h-5" />
              </div>

              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                Machine Learning
              </span>

              <h3 className="text-xl font-bold text-white mb-3">
                Dynamic Bid Shading Countermeasures
              </h3>

              <p className="text-neutral-300 text-xs leading-relaxed mb-6">
                Buyers use algorithms to bid the bare minimum. Our real-time price discovery models predict buyer willingness-to-pay and protect high-value inventory.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/5 font-mono text-[11px] text-neutral-300 space-y-1.5">
              <div className="text-[#FF7A1A]">&gt; Model: XGBoost YieldFloor v4</div>
              <div>&gt; Input Signals: 24 Contextual Features</div>
              <div className="text-emerald-400">&gt; Fill Rate Impact: +0.4%</div>
              <div className="text-white font-bold">&gt; Net eCPM Gain: +34.2%</div>
            </div>
          </div>

          {/* Card 3: Privacy & Identity Resolution */}
          <div className="liquid-glass-subtle p-8 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="p-2.5 rounded-xl bg-white/5 text-[#FF5C00] border border-white/10 w-fit mb-6">
                <Shield className="w-5 h-5" />
              </div>

              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
                Post-Cookie Stack
              </span>

              <h3 className="text-xl font-bold text-white mb-3">
                Universal ID & Clean Rooms
              </h3>

              <p className="text-neutral-300 text-xs leading-relaxed">
                Native integration with Unified ID 2.0 (UID2), ID5, LiveRamp RampID, and SharedID to monetize safari and cookieless chrome traffic without leaks.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-[11px] font-mono text-neutral-400">
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">UID 2.0</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">ID5 Universal</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">RampID</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10">TCF 2.2</span>
            </div>
          </div>

          {/* Card 4: 1-Line Embed SDK (Col-span 2) */}
          <div className="md:col-span-2 liquid-glass-subtle p-8 md:p-10 border border-white/10 flex flex-col justify-between">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                  Developer Experience
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Drop-In Script Integration
                </h3>
              </div>

              <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full w-fit">
                Async Non-Blocking &lt; 2KB
              </span>
            </div>

            {/* Code snippet block */}
            <div className="p-5 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs text-neutral-300 overflow-x-auto">
              <div className="text-neutral-500 mb-2">// In the &lt;head&gt; of your publication</div>
              <div>
                <span className="text-[#FF7A1A]">&lt;script</span> <span className="text-neutral-400">async src=</span><span className="text-emerald-300">"https://engine.biddigi.io/prebid.min.js"</span> <span className="text-neutral-400">data-account=</span><span className="text-emerald-300">"EXP-BIDDIGI-8492"</span><span className="text-[#FF7A1A]">&gt;&lt;/script&gt;</span>
              </div>
              <div className="mt-3 text-neutral-500">// Instant prebid auctions, Google Ad Manager sync, and automatic lazy-loading</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
