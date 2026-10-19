import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const LiveAuctionTicker: React.FC = () => {
  const transactions = [
    { exchange: 'Google AdX', format: 'Banner 300x250', cpm: '$4.85', latency: '9ms' },
    { exchange: 'Magnite CTV', format: 'Pre-Roll 1080p', cpm: '$18.40', latency: '12ms' },
    { exchange: 'The Trade Desk', format: 'Leaderboard 728x90', cpm: '$6.12', latency: '8ms' },
    { exchange: 'Amazon TAM', format: 'Sticky Footer', cpm: '$3.95', latency: '11ms' },
    { exchange: 'PubMatic', format: 'Interstitial Video', cpm: '$11.80', latency: '14ms' },
    { exchange: 'OpenX', format: 'Native Widget', cpm: '$4.30', latency: '10ms' },
    { exchange: 'Xandr / AppNexus', format: 'Medium Rectangle', cpm: '$5.20', latency: '7ms' },
    { exchange: 'Index Exchange', format: 'Reward Video', cpm: '$14.50', latency: '13ms' },
  ];

  const duplicated = [...transactions, ...transactions];

  return (
    <div className="py-5 border-y border-slate-200/80 bg-white/70 backdrop-blur-md overflow-hidden relative shadow-sm">
      {/* Edge gradient masks */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#FAFAFC] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#FAFAFC] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-4">
        {duplicated.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm hover:border-[#FF5C00]/40 transition-colors shrink-0"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold text-slate-900">{item.exchange}</span>
            </div>

            <span className="text-[11px] text-slate-500 font-mono">
              {item.format}
            </span>

            <div className="flex items-center gap-1 bg-[#FF5C00]/10 border border-[#FF5C00]/20 px-2 py-0.5 rounded text-[11px] font-mono font-bold text-[#FF5C00]">
              <span>CPM {item.cpm}</span>
              <ArrowUpRight className="w-3 h-3 text-[#FF5C00]" />
            </div>

            <span className="text-[10px] text-slate-400 font-mono">
              {item.latency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
