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
      title: 'More Buyers Competing for Your Ads',
      tag: 'HEADER BIDDING',
      description: 'Invite multiple buyers to bid for your available ad spaces at the same time. More competition gives you a clearer view of what buyers are willing to pay.',
      perks: ['Simultaneous buyer bids', 'Website and server integrations', 'Fit your existing ad setup'],
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#FF5C00]" />,
      title: 'Smarter Pricing for Your Ad Space',
      tag: 'PRICING OPTIMIZATION',
      description: 'A floor price is the minimum bid you accept. Adjusting that price helps balance what you earn per ad with how often your available ad spaces are filled.',
      perks: ['Review minimum bid prices', 'Compare revenue and fill rate', 'Tune individual ad placements'],
    },
    {
      icon: <Tv className="w-6 h-6 text-[#FF5C00]" />,
      title: 'Ad Formats That Fit Your Audience',
      tag: 'WEB, VIDEO & TV',
      description: 'Explore banners, native placements, video ads, and connected TV advertising. Choose formats around your content and viewing experience, with integration options reviewed for your property.',
      perks: ['Display and native ads', 'Video advertising', 'Connected TV and streaming'],
    },
    {
      icon: <Smartphone className="w-6 h-6 text-[#FF5C00]" />,
      title: 'Advertising Within Your Mobile App',
      tag: 'IOS & ANDROID',
      description: 'Earn from ad placements inside your app. Explore banners, ads that fit your content feed, and optional rewarded ads, with setup matched to your app and audience.',
      perks: ['Banner and full-screen placements', 'Native ads within app content', 'Optional rewarded experiences'],
    },
  ];

  const advertiserFeatures = [
    {
      icon: <Zap className="w-6 h-6 text-[#FF5C00]" />,
      title: 'Connect Your Buying Platform',
      tag: 'DSP INTEGRATION',
      description: 'Demand-side platforms (DSPs) help advertisers buy ad space. Discuss a bidding connection to access inventory that matches your buying requirements.',
      perks: ['Discuss technical integration', 'Review available inventory', 'Agree bidding requirements'],
    },
    {
      icon: <Lock className="w-6 h-6 text-[#FF5C00]" />,
      title: 'Arrange Private Advertising Deals',
      tag: 'CURATED SUPPLY',
      description: 'A private marketplace is a buying arrangement with selected publishers. Discuss the audience, ad formats, and inventory you need before agreeing deal terms.',
      perks: ['Selected publisher inventory', 'Agreed deal terms', 'Audience and format requirements'],
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#FF5C00]" />,
      title: 'Review Supply Quality',
      tag: 'SUPPLY TRANSPARENCY',
      description: 'Understand where your ads can appear and how inventory is sold. Review publisher authorization, traffic quality requirements, and available controls with the team.',
      perks: ['Publisher authorization review', 'Inventory quality requirements', 'Supply path transparency'],
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#FF5C00]" />,
      title: 'Find Relevant Content Environments',
      tag: 'CONTENT & AUDIENCE FIT',
      description: 'Discuss the content categories, audience locations, and device types that fit your campaign. Available targeting depends on the inventory and signals provided.',
      perks: ['Relevant content categories', 'Audience location and device', 'Available consented signals'],
    },
  ];

  return (
    <section id="solutions" className="py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-[#FF5C00] font-semibold mb-4">
            <span>WHO WE HELP</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-6">
            For Publishers Who Sell Ad Space.{' '}
            <span className="font-serif italic font-normal text-[#FF5C00]">
              For Buyers Who Need It.
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Publishers use BidDigi to connect ad inventory with buyers and improve monetization. Advertisers and demand partners can discuss access to inventory suited to their campaigns. Choose your role to explore how we can help.
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
                Unsure which solution fits your business?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Tell us what you publish or what you want to buy. We can discuss the next steps.
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenDemo}
            className="shrink-0 px-6 py-3 rounded-full text-xs font-semibold bg-[#FF5C00] text-white hover:bg-[#FF6D1A] transition-all flex items-center gap-2 shadow-md shadow-[#FF5C00]/20"
          >
            <span>Talk to Our Team</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
