import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface CalculatorProps {
  onOpenDemo: () => void;
}

export const InteractiveYieldCalculator: React.FC<CalculatorProps> = ({ onOpenDemo }) => {
  // State for monthly impressions (in millions) and current average CPM
  const [impressions, setImpressions] = useState<number>(5000000); // 5 Million
  const [cpm, setCpm] = useState<number>(2.5); // $2.50

  // Calculations
  const currentMonthlyRevenue = (impressions / 1000) * cpm;
  const upliftPercentage = 0.38; // 38% average uplift
  const additionalMonthlyRevenue = currentMonthlyRevenue * upliftPercentage;
  const projectedMonthlyRevenue = currentMonthlyRevenue + additionalMonthlyRevenue;
  const projectedAnnualExtra = additionalMonthlyRevenue * 12;

  // Format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatNumber = (val: number) => {
    if (val >= 1000000) {
      return (val / 1000000).toFixed(1) + 'M';
    }
    return (val / 1000).toFixed(0) + 'K';
  };

  return (
    <section id="calculator" className="py-24 relative overflow-hidden bg-[#060709]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#FF7A1A] mb-4">
            <span>03 / REVENUE FORECASTING ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Calculate Your Projected{' '}
            <span className="font-serif italic font-normal text-[#FF7A1A]">
              Revenue Uplift.
            </span>
          </h2>

          <p className="text-neutral-400 text-base sm:text-lg">
            See how much incremental revenue our sub-12ms parallel header bidding 
            and AI dynamic floor pricing unlocks for your ad inventory.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls Side */}
          <div className="lg:col-span-7 liquid-glass-subtle p-8 md:p-10 border border-white/10">
            {/* Slider 1: Monthly Ad Impressions */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-white tracking-wide">
                  Monthly Ad Impressions
                </label>
                <span className="text-xl font-bold text-[#FF7A1A] font-mono px-3 py-1 rounded-lg bg-[#FF5C00]/10 border border-[#FF5C00]/20">
                  {formatNumber(impressions)}
                </span>
              </div>

              <input
                type="range"
                min="500000"
                max="50000000"
                step="500000"
                value={impressions}
                onChange={(e) => setImpressions(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#FF5C00]"
              />

              {/* Quick Presets */}
              <div className="flex gap-2 mt-3">
                {[1000000, 5000000, 15000000, 30000000].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setImpressions(preset)}
                    className={`text-[11px] font-mono px-2.5 py-1 rounded border transition-colors ${
                      impressions === preset
                        ? 'bg-[#FF5C00] text-white border-[#FF5C00]'
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {formatNumber(preset)}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 2: Current Average CPM */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-semibold text-white tracking-wide">
                  Current Average eCPM ($)
                </label>
                <span className="text-xl font-bold text-[#FF7A1A] font-mono px-3 py-1 rounded-lg bg-[#FF5C00]/10 border border-[#FF5C00]/20">
                  ${cpm.toFixed(2)}
                </span>
              </div>

              <input
                type="range"
                min="0.5"
                max="12.0"
                step="0.1"
                value={cpm}
                onChange={(e) => setCpm(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#FF5C00]"
              />

              <div className="flex gap-2 mt-3">
                {[1.2, 2.5, 4.0, 7.5].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setCpm(preset)}
                    className={`text-[11px] font-mono px-2.5 py-1 rounded border transition-colors ${
                      cpm === preset
                        ? 'bg-[#FF5C00] text-white border-[#FF5C00]'
                        : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                    }`}
                  >
                    ${preset.toFixed(2)}
                  </button>
                ))}
              </div>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5C00] shrink-0 mt-0.5" />
                <span>Zero upfront integration cost</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5C00] shrink-0 mt-0.5" />
                <span>Net-30 automatic payouts</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF5C00] shrink-0 mt-0.5" />
                <span>Dedicated yield engineer</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 liquid-glass-orange p-8 md:p-10 border border-[#FF5C00]/30 shadow-[0_0_50px_rgba(255,92,0,0.15)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                  Projected Annual Uplift
                </span>
                <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full">
                  +38% GAIN
                </span>
              </div>

              {/* Massive Annual Number */}
              <div className="mb-6">
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                  +{formatCurrency(projectedAnnualExtra)}
                </div>
                <div className="text-xs text-neutral-400 mt-2 font-mono">
                  Additional annualized net earnings
                </div>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-3.5 py-6 border-y border-white/10 text-sm">
                <div className="flex justify-between items-center text-neutral-300">
                  <span>Current Baseline Revenue:</span>
                  <span className="font-mono text-white">{formatCurrency(currentMonthlyRevenue)} /mo</span>
                </div>

                <div className="flex justify-between items-center text-neutral-300">
                  <span>Estimated Additional Revenue:</span>
                  <span className="font-mono text-emerald-400 font-semibold">+{formatCurrency(additionalMonthlyRevenue)} /mo</span>
                </div>

                <div className="flex justify-between items-center text-white font-bold pt-2 border-t border-white/5">
                  <span>Projected BidDigi Monthly:</span>
                  <span className="font-mono text-[#FF7A1A] text-lg">{formatCurrency(projectedMonthlyRevenue)} /mo</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={onOpenDemo}
                className="w-full group flex items-center justify-center gap-2 py-4 rounded-xl bg-[#FF5C00] hover:bg-[#FF6D1A] text-white font-semibold text-sm shadow-[0_0_25px_rgba(255,92,0,0.45)] active:scale-95 transition-all duration-300"
              >
                <span>Unlock This Revenue</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="text-[11px] text-center text-neutral-400 mt-3 font-mono">
                Based on historical Expoworld publisher migration benchmark data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
