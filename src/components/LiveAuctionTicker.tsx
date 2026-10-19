import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const LiveAuctionTicker: React.FC = () => {
  const transactions = [
    { exchange: 'Google AdX', format: 'Banner 300x250', cpm: '$4.85', latency: '9ms', status: 'WIN' },
    { exchange: 'Magnite CTV', format: 'Pre-Roll 1080p', cpm: '$18.40', latency: '12ms', status: 'WIN' },
    { exchange: 'The Trade Desk', format: 'Leaderboard 728x90', cpm: '$6.12', latency: '8ms', status: 'WIN' },
    { exchange: 'Amazon TAM', format: 'Sticky Footer', cpm: '$3.95', latency: '11ms', status: 'WIN' },
    { exchange: 'PubMatic', format: 'Interstitial Video', cpm: '$11.80', latency: '14ms', status: 'WIN' },
    { exchange: 'OpenX', format: 'Native Widget', cpm: '$4.30', latency: '10ms', status: 'WIN' },
    { exchange: 'Xandr / AppNexus', format: 'Medium Rectangle', cpm: '$5.20', latency: '7ms', status: 'WIN' },
    { exchange: 'Index Exchange', format: 'Reward Video', cpm: '$14.50', latency: '13ms', status: 'WIN' },
  ];

  const duplicated = [...transactions, ...transactions];

  return (
    <div className="py-6 border-y border-white/5 bg-[#050608]/80 backdrop-blur-md overflow-hidden relative">
      {/* Edge gradient mask for smooth fade-in and fade-out */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#08090C] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#08090C] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-4">
        {duplicated.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#FF5C00]/40 transition-colors shrink-0"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-semibold text-neutral-200">{item.exchange}</span>
            </div>

            <span className="text-[11px] text-neutral-400 font-mono">
              {item.format}
            </span>

            <div className="flex items-center gap-1 bg-[#FF5C00]/10 border border-[#FF5C00]/20 px-2 py-0.5 rounded text-[11px] font-mono font-semibold text-[#FF7A1A]">
              <span>CPM {item.cpm}</span>
              <ArrowUpRight className="w-3 h-3 text-[#FF5C00]" />
            </div>

            <span className="text-[10px] text-neutral-500 font-mono">
              {item.latency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
