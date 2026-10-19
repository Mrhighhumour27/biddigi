import React, { useState } from 'react';
import { 
  Zap, 
  Layers, 
  Smartphone, 
  Tv, 
  ShieldCheck, 
  Cpu, 
  BarChart3, 
  Check, 
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';

interface SolutionsProps {
  onOpenDemo: () => void;
}

export const SolutionsSection: React.FC<SolutionsProps> = ({ onOpenDemo }) => {
  const [activeTab, setActiveTab] = useState<'publishers' | 'advertisers'>('publishers');

  const publisherFeatures = [
    {
      icon: <Layers className="w-6 h-6 text-[#FF5C00]" />,
      title: 'Next-Gen Header Bidding',
      tag: 'CLIENT & S2S PREBID',
      description: 'Run simultaneous auctions across 180+ global demand sources with client-side Prebid.js or cloud-based Prebid Server, eliminating ad waterfall latency.',
      perks: ['Prebid 8.0 compliant', 'Zero page jank or layout shift', 'Parallel DSP auctions'],
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#FF5C00]" />,
      title: 'AI Dynamic Floor Pricing',
      tag: 'YIELD ENGINE',
      description: 'Automated machine learning adjusts floor prices dynamically based on geo, time, device, and buyer history to extract maximum value on every impression.',
      perks: ['Prevents bid shading', '+38% average revenue uplift', 'Granular slot-level floors'],
    },
    {
      icon: <Tv className="w-6 h-6 text-[#FF5C00]" />,
      title: 'Omnichannel & Video / CTV',
      tag: 'HIGH-CPM FORMATS',
      description: 'Support high-value video (VAST 2.0-4.2, VPAID), rewarded video, native in-feed widgets, and Connected TV ad inventory with universal player compatibility.',
      perks: ['High-impact rich media', 'Interactive rewarded ads', 'CTV & OTT programmatic'],
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#FF5C00]" />,
      title: 'Ultralight Mobile App SDK',
      tag: 'IOS & ANDROID',
      description: 'A modular, memory-efficient SDK for native apps. Delivers rapid ad rendering, seamless background caching, and full app-ads.txt compliance.',
      perks: ['Under 800KB footprint', 'Crash-free architecture', 'Native interstitial & banner'],
    },
  ];

  const advertiserFeatures = [
    {
      icon: <Zap className="w-6 h-6 text-[#FF5C00]" />,
      title: 'OpenRTB 3.0 Direct Pipe',
      tag: 'DSP INTEGRATION',
      description: 'Direct server-to-server connections with global DSPs, providing instant access to curated supply with ultra-low query drop rates and high QPS capacity.',
      perks: ['OpenRTB 2.5 & 3.0 support', 'Low latency bid streams', 'Custom QPS throttling'],
    },
    {
      icon: <Lock className="w-6 h-6 text-[#FF5C00]" />,
      title: 'Private Marketplaces (PMP)',
      tag: 'CURATED SUPPLY',
      description: 'Execute bespoke programmatic deals (PMP, Programmatic Guaranteed, Preferred Deals) across top-tier editorial and gaming inventory.',
      perks: ['First-look inventory access', 'Custom Deal IDs', 'Audience segmentation'],
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#FF5C00]" />,
      title: 'Brand Safety & Anti-Fraud',
      tag: 'TAG & ADS.TXT VERIFIED',
      description: 'Strict multi-layered traffic verification filtering out bot nets, domain spoofing, and invalid traffic (IVT) with 100% sellers.json transparency.',
      perks: ['TAG Certified Against Fraud', 'Real-time pre-bid filtering', 'Sellers.json & ads.txt verified'],
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#FF5C00]" />,
      title: 'Contextual & Cookieless Targeting',
      tag: 'PRIVACY ERA READY',
      description: 'Reach high-intent audiences without third-party cookies using deep on-page natural language processing and first-party taxonomy signals.',
      perks: ['IAB Content Categories 3.0', 'GDPR, CCPA & TCF 2.2 compliant', 'Zero identity degradation'],
    },
  ];

  return (
    <section id="solutions" className="py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-[#FF5C00] font-semibold mb-4">
            <span>THE SOLUTIONS ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-6">
            Engineered For Both Sides of the{' '}
            <span className="font-serif italic font-normal text-[#FF5C00]">
              Auction Table.
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Whether you are monetizing digital properties or deploying performance ad spend, 
            BidDigi delivers transparent, high-efficiency programmatic infrastructure.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex p-1.5 rounded-full bg-slate-100 border border-slate-200 mt-8 shadow-inner">
            <button
              onClick={() => setActiveTab('publishers')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === 'publishers'
                  ? 'bg-white text-slate-950 shadow-md shadow-slate-900/5 border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              For Media Publishers
            </button>
            <button
              onClick={() => setActiveTab('advertisers')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                activeTab === 'advertisers'
                  ? 'bg-white text-slate-950 shadow-md shadow-slate-900/5 border border-slate-200/80'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              For Advertisers & DSPs
            </button>
          </div>
        </div>

        {/* Feature Grid with Light Glass Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {(activeTab === 'publishers' ? publisherFeatures : advertiserFeatures).map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="liquid-glass-light-orange p-8 md:p-10 flex flex-col justify-between group hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 text-[#FF5C00] group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-slate-500 font-semibold px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-950 mb-3 tracking-tight group-hover:text-[#FF5C00] transition-colors">
                  {feature.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              <div className="border-t border-slate-100 pt-6 mt-4">
                <div className="space-y-2.5">
                  {feature.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2.5 text-xs text-slate-700 font-mono font-medium">
                      <Check className="w-4 h-4 text-[#FF5C00] shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-12 liquid-glass-light p-6 md:p-8 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FF5C00]/10 border border-[#FF5C00]/20 flex items-center justify-center text-[#FF5C00] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Looking for custom header bidding setups or direct PMP deals?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Our ad operations team configures bespoke floor models and deal IDs in under 24 hours.
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenDemo}
            className="shrink-0 px-6 py-3 rounded-full text-xs font-semibold bg-[#FF5C00] text-white hover:bg-[#FF6D1A] transition-all flex items-center gap-2 shadow-md shadow-[#FF5C00]/20"
          >
            <span>Speak With AdOps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
