import React, { useState } from 'react';
import { Play, RotateCcw, Zap, CheckCircle2, TrendingUp, Sparkles, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DSPBid {
  name: string;
  bid: number;
  latency: number;
  status: 'pending' | 'bidding' | 'cleared' | 'won' | 'lost';
}

export const InteractiveAuctionSimulator: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState('Leaderboard (728x90)');
  const [floorPrice, setFloorPrice] = useState(2.0);
  const [isAuctionRunning, setIsAuctionRunning] = useState(false);
  const [auctionFinished, setAuctionFinished] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [winningBid, setWinningBid] = useState<{ dsp: string; cpm: number; uplift: number } | null>(null);

  const initialDSPs: DSPBid[] = [
    { name: 'Google AdX', bid: 0, latency: 9, status: 'pending' },
    { name: 'Magnite CTV', bid: 0, latency: 12, status: 'pending' },
    { name: 'The Trade Desk', bid: 0, latency: 8, status: 'pending' },
    { name: 'Amazon TAM', bid: 0, latency: 11, status: 'pending' },
    { name: 'PubMatic', bid: 0, latency: 10, status: 'pending' },
    { name: 'OpenX', bid: 0, latency: 7, status: 'pending' },
  ];

  const [dsps, setDsps] = useState<DSPBid[]>(initialDSPs);

  const triggerAuction = () => {
    setIsAuctionRunning(true);
    setAuctionFinished(false);
    setElapsedMs(0);
    setWinningBid(null);

    // Reset status
    setDsps(initialDSPs.map(d => ({ ...d, status: 'bidding', bid: 0 })));

    let timer = 0;
    const interval = setInterval(() => {
      timer += 1;
      setElapsedMs(timer);

      if (timer >= 12) {
        clearInterval(interval);

        // Generate final bids respecting the floor price
        const finalBids: DSPBid[] = initialDSPs.map(d => {
          const generatedBid = Number((floorPrice + Math.random() * 4.5 + (d.name.includes('Trade') || d.name.includes('Magnite') ? 1.5 : 0)).toFixed(2));
          return {
            ...d,
            bid: generatedBid,
            status: 'cleared',
          };
        });

        // Determine winner
        let highestBid = finalBids[0];
        finalBids.forEach(b => {
          if (b.bid > highestBid.bid) highestBid = b;
        });

        const markedBids = finalBids.map(b => ({
          ...b,
          status: b.name === highestBid.name ? ('won' as const) : ('lost' as const),
        }));

        const legacyWaterfallValue = Number((highestBid.bid * 0.72).toFixed(2));
        const upliftPercentage = Math.round(((highestBid.bid - legacyWaterfallValue) / legacyWaterfallValue) * 100);

        setDsps(markedBids);
        setWinningBid({
          dsp: highestBid.name,
          cpm: highestBid.bid,
          uplift: upliftPercentage,
        });
        setIsAuctionRunning(false);
        setAuctionFinished(true);
      }
    }, 80);
  };

  return (
    <section id="simulator" className="py-24 relative overflow-hidden bg-slate-50/60 border-y border-slate-200/80">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#FF5C00]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-[#FF5C00] font-semibold mb-4 shadow-sm">
            <Zap className="w-3.5 h-3.5" />
            <span>INTERACTIVE REAL-TIME AUCTION PLAYGROUND</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-950 mb-6">
            Experience the Sub-12ms{' '}
            <span className="font-serif italic font-normal text-[#FF5C00]">
              Auction Arena.
            </span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg">
            Witness how BidDigi coordinates 6+ tier-1 programmatic buyers in parallel. 
            Adjust your floor price, select an ad unit, and run a live simulated auction.
          </p>
        </div>

        {/* Interactive Simulator Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls & Parameters (Col 4) */}
          <div className="lg:col-span-4 liquid-glass-light p-6 md:p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 font-mono">
                1. Select Ad Format
              </label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  'Leaderboard (728x90)',
                  'Medium Rectangle (300x250)',
                  'Outstream Video (1080p)',
                  'Connected TV (CTV High-Impact)'
                ].map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => {
                      setSelectedFormat(fmt);
                      if (auctionFinished) triggerAuction();
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold text-left transition-all duration-200 flex items-center justify-between ${
                      selectedFormat === fmt
                        ? 'bg-[#FF5C00] text-white shadow-md shadow-[#FF5C00]/25'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100/60'
                    }`}
                  >
                    <span>{fmt}</span>
                    {selectedFormat === fmt && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Floor Price Slider */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                  2. AI Dynamic Floor Price
                </label>
                <span className="text-sm font-bold text-[#FF5C00] font-mono bg-[#FF5C00]/10 px-2.5 py-0.5 rounded border border-[#FF5C00]/20">
                  ${floorPrice.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="6.0"
                step="0.25"
                value={floorPrice}
                onChange={e => setFloorPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF5C00]"
              />
              <p className="text-[11px] text-slate-500 mt-2 font-mono">
                BidDigi AI prevents bid shading by dynamically enforcing optimal floor thresholds.
              </p>
            </div>

            {/* Run Button */}
            <div className="pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={isAuctionRunning}
                onClick={triggerAuction}
                className="w-full py-4 rounded-xl font-bold text-sm tracking-wide bg-[#FF5C00] hover:bg-[#FF6D1A] text-white shadow-[0_8px_25px_rgba(255,92,0,0.35)] flex items-center justify-center gap-2.5 transition-all disabled:opacity-60 cursor-pointer"
              >
                {isAuctionRunning ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Executing Parallel Bids ({elapsedMs}ms)...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Trigger Real-Time Auction</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Right Live Visual Auction Arena (Col 8) */}
          <div className="lg:col-span-8 liquid-glass-light-orange p-6 md:p-8">
            {/* Top Bar with Live Telemetry */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                  Target Unit: {selectedFormat}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  Parallel DSP Bidding Arena
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm font-mono text-xs flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isAuctionRunning ? 'bg-[#FF5C00] animate-ping' : 'bg-emerald-500'}`}></span>
                  <span className="text-slate-600">Timer:</span>
                  <span className="font-bold text-slate-900">{elapsedMs}ms</span>
                </div>
              </div>
            </div>

            {/* Live DSP Bidders Grid */}
            <div className="py-6 space-y-3.5">
              {dsps.map(dsp => {
                const isWinner = dsp.status === 'won';
                const isBidding = dsp.status === 'bidding';

                return (
                  <motion.div
                    key={dsp.name}
                    layout
                    className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isWinner
                        ? 'bg-[#FF5C00]/10 border-[#FF5C00] shadow-md shadow-[#FF5C00]/15'
                        : 'bg-white/80 border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isWinner ? 'bg-[#FF5C00] text-white' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isWinner ? <Award className="w-5 h-5" /> : dsp.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          <span>{dsp.name}</span>
                          {isWinner && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FF5C00] text-white uppercase tracking-wider font-semibold">
                              Winning Bid
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono">
                          Response SLA: {dsp.latency}ms
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar / Price Indicator */}
                    <div className="flex items-center gap-4">
                      {isBidding && (
                        <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-[#FF5C00]"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.9, ease: 'linear' }}
                          />
                        </div>
                      )}

                      <div className="text-right min-w-[90px]">
                        <span className="text-xs text-slate-400 block font-mono">Submitted CPM</span>
                        <span className={`text-base font-mono font-bold ${
                          isWinner ? 'text-[#FF5C00]' : 'text-slate-800'
                        }`}>
                          {dsp.bid > 0 ? `$${dsp.bid.toFixed(2)}` : (isBidding ? 'Bidding...' : 'Standby')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Winning Outcome Card */}
            <AnimatePresence>
              {winningBid && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-[#FF5C00]/15 via-white to-emerald-50 border border-[#FF5C00]/40 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-[#FF5C00] text-white flex items-center justify-center shadow-lg shadow-[#FF5C00]/30 shrink-0">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-[#FF5C00] font-bold">
                        Auction Cleared at {elapsedMs}ms
                      </div>
                      <div className="text-base font-extrabold text-slate-950">
                        {winningBid.dsp} wins at <span className="text-[#FF5C00]">${winningBid.cpm.toFixed(2)} CPM</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-xl text-emerald-700 font-mono font-bold text-sm">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>+{winningBid.uplift}% Net Yield Gain</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
