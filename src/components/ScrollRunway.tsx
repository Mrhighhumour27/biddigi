import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Layers, Zap, Cpu, Sparkles } from 'lucide-react';

export const ScrollRunway: React.FC = () => {
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      time: '0ms',
      tag: '01 / EVENT DISPATCH',
      title: 'Consent & Prebid Signal Forwarding',
      description: 'The instant a visitor accesses your page, BidDigi asynchronously packages bid requests with TCF 2.2 and IAB identity signals. Zero layout shift, 100% Core Web Vitals safety.',
      icon: <Layers className="w-6 h-6 text-[#FF5C00]" />,
      stats: 'Async Load < 1.8KB',
      status: 'SIGNAL BROADCAST ACTIVE',
    },
    {
      time: '4ms',
      tag: '02 / EDGE MULTI-CAST',
      title: 'Parallel S2S Auction Across 180+ DSPs',
      description: 'Rather than bogging down the visitor browser with 20 sequential calls, BidDigi edge server clusters (London, Ashburn, Mumbai, Frankfurt) fire parallel OpenRTB requests to premier demand sources.',
      icon: <Zap className="w-6 h-6 text-[#FF5C00]" />,
      stats: '180+ Parallel Bids',
      status: 'GLOBAL EDGE ROUTING',
    },
    {
      time: '8ms',
      tag: '03 / AI MAXIMIZATION',
      title: 'Dynamic Floor Pricing & Anti-Shading',
      description: 'Buyers employ algorithms to shade bids to the lowest acceptable threshold. BidDigi machine-learning models predict buyer willingness-to-pay and protect publisher yield.',
      icon: <Cpu className="w-6 h-6 text-[#FF5C00]" />,
      stats: '+38% Value Unlocked',
      status: 'XGBOOST FLOOR ARBITRATION',
    },
    {
      time: '12ms',
      tag: '04 / INSTANT RENDER',
      title: 'Winning Creative Rendered & Revenue Credited',
      description: 'The highest bidder wins the auction in under 12 milliseconds. High-impact creative renders seamlessly while net revenue streams into your transparent Expoworld publisher ledger.',
      icon: <Sparkles className="w-6 h-6 text-[#FF5C00]" />,
      stats: '99.4% Fill Rate',
      status: 'AUCTION SETTLED • NET REVENUE EARNED',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!runwayRef.current) return;
      const rect = runwayRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDistance = rect.height - windowHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, totalDistance)));

      const stageIndex = Math.min(stages.length - 1, Math.floor(progress * stages.length));
      setActiveStage(stageIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [stages.length]);

  return (
    <section id="how-it-works" ref={runwayRef} className="relative min-h-[220vh] bg-white border-b border-slate-200">
      <div className="sticky top-0 h-screen flex flex-col justify-center px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-[#FF5C00] font-semibold mb-3">
            <span>MOTION LIFECYCLE • STICKY SCROLL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950">
            How Every Ad Impression Maximizes in{' '}
            <span className="font-serif italic font-normal text-[#FF5C00]">
              &lt; 12 Milliseconds.
            </span>
          </h2>
        </div>

        {/* Sticky Interactive Stage Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto w-full">
          {/* Left Progress Timeline & Selector (Col 5) */}
          <div className="lg:col-span-5 space-y-3">
            {stages.map((stage, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStage(idx)}
                className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  activeStage === idx
                    ? 'liquid-glass-light-orange border-[#FF5C00] shadow-md shadow-[#FF5C00]/15'
                    : 'bg-slate-50/80 border-slate-200/80 hover:bg-slate-100/60 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                    activeStage === idx ? 'bg-[#FF5C00] text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-slate-900">
                      {stage.title}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">
                      Timestamp: {stage.time}
                    </div>
                  </div>
                </div>

                <div className="font-mono text-xs font-bold text-[#FF5C00]">
                  {activeStage === idx && <span className="animate-pulse">● Active</span>}
                </div>
              </div>
            ))}

            <p className="text-xs text-center text-slate-400 font-mono pt-2">
              ↓ Scroll page to advance stages automatically
            </p>
          </div>

          {/* Right Stage Detail Showcase (Col 7) */}
          <div className="lg:col-span-7">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="liquid-glass-light p-8 md:p-12 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-3.5 rounded-2xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 text-[#FF5C00]">
                  {stages[activeStage].icon}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-100 border border-slate-200 font-bold text-slate-700">
                    {stages[activeStage].time}
                  </span>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                    {stages[activeStage].stats}
                  </span>
                </div>
              </div>

              <span className="text-xs font-mono text-[#FF5C00] font-bold tracking-widest block mb-2">
                {stages[activeStage].tag}
              </span>

              <h3 className="text-2xl sm:text-3xl font-bold text-slate-950 mb-4 tracking-tight">
                {stages[activeStage].title}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                {stages[activeStage].description}
              </p>

              {/* Status Banner */}
              <div className="p-4 rounded-xl bg-slate-900 text-white font-mono text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-slate-300 font-medium">STATUS:</span>
                  <span className="text-[#FF5C00] font-bold">{stages[activeStage].status}</span>
                </div>
                <span className="text-slate-400 text-[10px]">PREBID SLA: PASS</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
