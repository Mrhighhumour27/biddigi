import React, { useState } from 'react';
import { Monitor, Smartphone, Tv, Sparkles, Check, Eye, Gauge, DollarSign } from 'lucide-react';

interface Format {
  id: string;
  name: string;
  category: string;
  cpm: string;
  viewability: string;
  fillRate: string;
  description: string;
  icon: React.ReactNode;
  specs: string[];
}

export const InteractiveFormatPreviewer: React.FC = () => {
  const formats: Format[] = [
    {
      id: 'banner',
      name: 'Display Banner & Rich Media',
      category: 'DESKTOP & MOBILE WEB',
      cpm: '$3.80 - $6.20',
      viewability: '86.4%',
      fillRate: '99.5%',
      description: 'Banner ads appear in spaces within your website, such as beside an article or between content sections. Choose sizes and placements that suit desktop and mobile readers.',
      icon: <Monitor className="w-5 h-5 text-[#FF5C00]" />,
      specs: ['Prebid Universal Creative', 'Sticky anchor & interstitial', 'HTML5 & Responsive'],
    },
    {
      id: 'video',
      name: 'In-Article Outstream Video',
      category: 'HIGH IMPACT EDITORIAL',
      cpm: '$12.50 - $18.00',
      viewability: '91.2%',
      fillRate: '98.8%',
      description: 'Video ads can appear between article paragraphs, giving publishers a way to introduce video advertising alongside written content.',
      icon: <Sparkles className="w-5 h-5 text-[#FF5C00]" />,
      specs: ['VAST 2.0 - 4.2 compliant', 'Autoplay on 50% viewport', 'Zero video player cost'],
    },
    {
      id: 'mobile',
      name: 'In-App Rewarded & Native',
      category: 'IOS & ANDROID SDK',
      cpm: '$14.20 - $22.50',
      viewability: '95.8%',
      fillRate: '99.1%',
      description: 'Native ads fit the surrounding app content. Rewarded ads let users choose to watch an ad in exchange for an in-app benefit, such as an extra life in a game.',
      icon: <Smartphone className="w-5 h-5 text-[#FF5C00]" />,
      specs: ['Sub-800KB SDK binary', 'app-ads.txt ready', 'Custom native card template'],
    },
    {
      id: 'ctv',
      name: 'Connected TV & OTT Streams',
      category: 'BIG SCREEN PROGRAMMATIC',
      cpm: '$22.00 - $35.00',
      viewability: '98.4%',
      fillRate: '97.6%',
      description: 'Connected TV and streaming ads appear during video playback on supported TV apps and devices. Integration requirements depend on your player and streaming setup.',
      icon: <Tv className="w-5 h-5 text-[#FF5C00]" />,
      specs: ['SSAI / CSAM compatible', 'VPAID & VAST 4.0', '1080p / 4K UHD streaming'],
    },
  ];

  const [activeFormat, setActiveFormat] = useState<Format>(formats[0]);

  return (
    <section className="py-24 relative overflow-hidden bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-[#FF5C00] font-semibold mb-4">
            <span>CHOOSE ADS THAT FIT YOUR CONTENT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-6">
            Ads for Websites, Apps,{' '}
            <span className="font-serif italic font-normal text-[#FF5C00]">
              Video and TV.
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Display ads sit within a page. Video ads appear alongside or within video content. In-app ads can fit a feed or offer an optional reward. Connected TV ads reach streaming viewers. Explore examples below; all performance figures are illustrative and availability depends on your integration.
          </p>
        </div>

        {/* Interactive Format Selector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {formats.map(fmt => (
            <button
              key={fmt.id}
              onClick={() => setActiveFormat(fmt)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                activeFormat.id === fmt.id
                  ? 'liquid-glass-light-orange border-[#FF5C00] shadow-md shadow-[#FF5C00]/15'
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100/60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  {fmt.icon}
                </div>
                {activeFormat.id === fmt.id && (
                  <span className="w-2 h-2 rounded-full bg-[#FF5C00] animate-pulse"></span>
                )}
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block tracking-wider">
                  {fmt.category}
                </span>
                <span className="text-sm font-bold text-slate-900 block mt-1">
                  {fmt.name}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Interactive Mockup & Metric Card */}
        <div className="liquid-glass-light p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5C00]/10 border border-[#FF5C00]/20 text-xs font-mono font-bold text-[#FF5C00]">
              <span>ACTIVE AD UNIT</span>
            </div>

            <h3 className="text-3xl font-extrabold text-slate-950 tracking-tight">
              {activeFormat.name}
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {activeFormat.description}
            </p>

            {/* Metric Pills */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-1">
                  <DollarSign className="w-3.5 h-3.5 text-[#FF5C00]" />
                  <span>Est. eCPM</span>
                </div>
                <div className="text-lg font-bold font-mono text-slate-900">{activeFormat.cpm}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-1">
                  <Eye className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Viewability</span>
                </div>
                <div className="text-lg font-bold font-mono text-slate-900">{activeFormat.viewability}</div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-1">
                  <Gauge className="w-3.5 h-3.5 text-blue-500" />
                  <span>Fill Rate</span>
                </div>
                <div className="text-lg font-bold font-mono text-slate-900">{activeFormat.fillRate}</div>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {activeFormat.specs.map((spec, sIdx) => (
                <div key={sIdx} className="flex items-center gap-2 text-xs font-mono text-slate-700">
                  <Check className="w-4 h-4 text-[#FF5C00]" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Creative Simulation */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col justify-between min-h-[320px] relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              </div>
              <span>PREVIEW CANVAS</span>
            </div>

            {/* Interactive Creative Area */}
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center mb-4 text-[#FF5C00] border border-slate-200">
                {activeFormat.icon}
              </div>
              <div className="font-bold text-sm text-slate-900 mb-1">
                {activeFormat.name}
              </div>
              <div className="text-xs text-slate-500 font-mono max-w-xs">
                Example placement: see how this ad format fits within your content.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-[11px] font-mono text-slate-600">
              <span>ILLUSTRATIVE EXAMPLE</span>
              <span className="text-emerald-600 font-bold">FORMAT PREVIEW</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
