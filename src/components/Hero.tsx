import React, { useState } from 'react';
import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onOpenDemo: () => void;
}

interface DSPNode {
  id: string;
  name: string;
  category: string;
  latency: string;
  protocol: string;
  cpm: string;
  x: string;
  y: string;
  routePath: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo }) => {
  const dspNodes: DSPNode[] = [
    {
      id: 'google',
      name: 'Google AdX',
      category: 'Global Marketplace',
      latency: '8.1ms',
      protocol: 'OpenRTB 3.0',
      cpm: '$4.85 avg',
      x: '25%',
      y: '14%',
      routePath: 'M 100 48 Q 200 48 200 160',
    },
    {
      id: 'ttd',
      name: 'The Trade Desk',
      category: 'Omnichannel DSP',
      latency: '7.8ms',
      protocol: 'OpenRTB 3.0',
      cpm: '$6.20 avg',
      x: '75%',
      y: '14%',
      routePath: 'M 300 48 Q 200 48 200 160',
    },
    {
      id: 'magnite',
      name: 'Magnite CTV',
      category: 'Connected TV & Video',
      latency: '11.4ms',
      protocol: 'VAST 4.2',
      cpm: '$18.40 avg',
      x: '86%',
      y: '36%',
      routePath: 'M 345 115 Q 200 115 200 160',
    },
    {
      id: 'amazon',
      name: 'Amazon TAM',
      category: 'Retail & Display',
      latency: '9.2ms',
      protocol: 'Transparent Ad Market',
      cpm: '$4.10 avg',
      x: '84%',
      y: '66%',
      routePath: 'M 335 210 Q 200 210 200 160',
    },
    {
      id: 'pubmatic',
      name: 'PubMatic',
      category: 'Header Bidding',
      latency: '8.9ms',
      protocol: 'OpenRTB 3.0',
      cpm: '$5.15 avg',
      x: '74%',
      y: '88%',
      routePath: 'M 295 280 Q 200 280 200 160',
    },
    {
      id: 'openx',
      name: 'OpenX',
      category: 'Server-to-Server',
      latency: '7.4ms',
      protocol: 'Edge Prebid S2S',
      cpm: '$4.30 avg',
      x: '26%',
      y: '88%',
      routePath: 'M 105 280 Q 200 280 200 160',
    },
    {
      id: 'equativ',
      name: 'Equativ',
      category: 'Direct PMP & Native',
      latency: '9.8ms',
      protocol: 'OpenRTB 3.0',
      cpm: '$4.90 avg',
      x: '16%',
      y: '66%',
      routePath: 'M 65 210 Q 200 210 200 160',
    },
    {
      id: 'xandr',
      name: 'Xandr',
      category: 'Premium Video & App',
      latency: '8.5ms',
      protocol: 'OpenRTB 3.0',
      cpm: '$5.40 avg',
      x: '14%',
      y: '36%',
      routePath: 'M 55 115 Q 200 115 200 160',
    },
  ];

  const [selectedDSP, setSelectedDSP] = useState<DSPNode>(dspNodes[0]);

  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-grid-pattern border-b border-slate-200">
      {/* Soft Ambient Radial Warmth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1100px] h-[550px] bg-gradient-to-b from-[#FF5C00]/8 via-[#FF5C00]/3 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* 2-Column Hero Grid (Text Left + Interactive Ecosystem Illustration Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
          
          {/* Left Column: Value Prop, Copy & CTAs (Col 6) */}
          <div className="lg:col-span-6 text-left">
            {/* Top Status Pill */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full liquid-glass-pill-light mb-6 flex-wrap shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5C00]"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wide text-slate-700 font-medium">
                AD MONETIZATION FOR PUBLISHERS
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-xs font-mono text-[#FF5C00] font-semibold">Web • App • Video</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 mb-5 leading-[1.08]"
            >
              Earn more from your{' '}
              <br />
              <span className="font-serif italic font-normal text-[#FF5C00]">
                website and app ads.
              </span>
            </motion.h1>

            {/* Narrative Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-6"
            >
              BidDigi helps website owners, app developers, and video publishers sell their ad space to advertising buyers. We bring buyers into competition, help improve your ad setup, and bring performance reporting into one place—so you can focus on your content and audience.
            </motion.p>

            {/* Benefits Checkpoints with clean icons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="space-y-2.5 mb-8 text-sm text-slate-700 font-medium"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF5C00] shrink-0" />
                <span>Connect your ad spaces with competing advertising buyers</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF5C00] shrink-0" />
                <span>Improve ad placements and pricing with performance insights</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF5C00] shrink-0" />
                <span>Understand your earnings with clear, consolidated reporting</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-3.5"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpenDemo}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide bg-[#FF5C00] text-white shadow-[0_8px_25px_rgba(255,92,0,0.35)] hover:shadow-[0_12px_35px_rgba(255,92,0,0.5)] hover:bg-[#FF6D1A] transition-all duration-300 cursor-pointer"
              >
                <span>Discuss My Ad Revenue</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-slate-800 liquid-glass-pill-light hover:bg-white border border-slate-200 transition-all duration-300"
              >
                <Zap className="w-4 h-4 text-[#FF5C00]" />
                <span>See How It Works</span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: mFusion-style Interactive Connected Demand Ecosystem (Col 6) */}
          <div className="lg:col-span-6">
            <div className="liquid-glass-light p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-xl bg-white relative">
              {/* Ecosystem Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#FF5C00] font-bold block">
                    YOUR AD SPACE. CONNECTED.
                  </span>
                  <span className="text-xs text-slate-500">
                    Illustration: how buyers connect through BidDigi
                  </span>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-900 text-white">
                  Ad buyers
                </span>
              </div>

              {/* Interactive Orbital Ecosystem Canvas */}
              <div className="relative w-full h-[320px] sm:h-[350px] flex items-center justify-center overflow-hidden">
                {/* Concentric Faint Orbit Circles */}
                <div className="absolute w-[300px] h-[300px] rounded-full border border-slate-200/60 pointer-events-none -z-0" />
                <div className="absolute w-[200px] h-[200px] rounded-full border border-slate-200/80 pointer-events-none -z-0" />
                <div className="absolute w-[100px] h-[100px] rounded-full border border-dashed border-[#FF5C00]/30 pointer-events-none -z-0" />

                {/* SVG Connecting Flow Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none -z-0" viewBox="0 0 400 320" preserveAspectRatio="none">
                  {dspNodes.map((node) => {
                    const isSelected = selectedDSP.id === node.id;
                    return (
                      <g key={node.id}>
                        <path
                          d={node.routePath}
                          fill="none"
                          stroke={isSelected ? '#FF5C00' : '#E2E8F0'}
                          strokeWidth={isSelected ? '2.5' : '1.5'}
                          strokeDasharray={isSelected ? 'none' : '4 4'}
                          className="transition-colors duration-300"
                        />
                        {isSelected && (
                          <circle r="4" fill="#FF5C00">
                            <animateMotion path={node.routePath} dur="1.8s" repeatCount="indefinite" />
                          </circle>
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Central BidDigi Core Hub */}
                <div className="relative z-10 p-5 rounded-2xl bg-white border-2 border-[#FF5C00] shadow-lg shadow-[#FF5C00]/15 text-center flex flex-col items-center justify-center min-w-[140px]">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#FF5C00] animate-ping" />
                    <span className="font-extrabold text-sm tracking-tight text-slate-950">BIDDIGI</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                    Ad auction
                  </span>
                  <span className="text-[9px] font-mono text-[#FF5C00] mt-1 bg-orange-50 px-2 py-0.5 rounded-full font-semibold">
                    Buyers compete
                  </span>
                </div>

                {/* 8 Satellite DSP Interactive Nodes */}
                {dspNodes.map((dsp) => {
                  const isSelected = selectedDSP.id === dsp.id;

                  return (
                    <button
                      key={dsp.id}
                      onClick={() => setSelectedDSP(dsp)}
                      style={{ left: dsp.x, top: dsp.y }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-xl border text-[11px] font-mono font-bold transition-all duration-200 cursor-pointer shadow-sm z-20 ${
                        isSelected
                          ? 'bg-[#FF5C00] text-white border-[#FF5C00] shadow-md shadow-[#FF5C00]/30 scale-110'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                      }`}
                    >
                      {dsp.name}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Selection Pill (mFusion style: All your marketing data indicator) */}
              <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <div>
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <span>{selectedDSP.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white border border-slate-200 text-slate-600">
                        {selectedDSP.category}
                      </span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">
                      Select a buyer to explore the illustration. Availability depends on your setup.
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-slate-400">
                  <span>Connect</span>
                  <span>→</span>
                  <span className="text-slate-700">Bid in Parallel</span>
                  <span>→</span>
                  <span className="text-[#FF5C00]">Earn from ads</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Live Telemetry Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto"
        >
          <div className="liquid-glass-light p-4 md:p-5 text-left hover:border-[#FF5C00]/40 transition-colors bg-white">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              Web
            </div>
            <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-mono font-medium">
              Website ad spaces
            </div>
          </div>

          <div className="liquid-glass-light p-4 md:p-5 text-left hover:border-[#FF5C00]/40 transition-colors bg-white">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              App
            </div>
            <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-mono font-medium">
              Mobile app advertising
            </div>
          </div>

          <div className="liquid-glass-light p-4 md:p-5 text-left hover:border-[#FF5C00]/40 transition-colors bg-white">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              Video
            </div>
            <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-mono font-medium">
              Ads alongside video
            </div>
          </div>

          <div className="liquid-glass-light p-4 md:p-5 text-left hover:border-[#FF5C00]/40 transition-colors bg-white">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              CTV
            </div>
            <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-mono font-medium">
              Connected TV advertising
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
