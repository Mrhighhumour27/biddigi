import React from 'react';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';

interface CTAProps {
  onOpenDemo: () => void;
}

export const CallToAction: React.FC<CTAProps> = ({ onOpenDemo }) => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Intense ambient orange glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#FF5C00]/20 via-[#FF7A1A]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="liquid-glass-orange p-10 md:p-16 border border-[#FF5C00]/30 shadow-[0_0_80px_rgba(255,92,0,0.18)] text-center relative overflow-hidden">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-white mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#FF7A1A]" />
            <span>INSTANT INTEGRATION • ZERO UPFRONT COMMITMENT</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6">
            Ready to Accelerate Your{' '}
            <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] via-[#FF5C00] to-white">
              Programmatic Revenue?
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-neutral-300 text-base sm:text-lg mb-10 leading-relaxed">
            Get a complimentary inventory audit and see how our sub-12ms header bidding engine 
            can boost your eCPMs by 35%+ in your first 30 days.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenDemo}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide bg-[#FF5C00] text-white shadow-[0_0_35px_rgba(255,92,0,0.4)] hover:shadow-[0_0_55px_rgba(255,92,0,0.65)] hover:bg-[#FF6D1A] active:scale-95 transition-all duration-300"
            >
              <span>Request Free Yield Audit</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <a
              href="#calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-neutral-200 liquid-glass-subtle hover:bg-white/10 active:scale-95 transition-all duration-300"
            >
              <span>Explore Yield Calculator</span>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-400 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>&lt; 24h Setup Time</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Net-30 Fast Payouts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>No Exclusivity Required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
