import React from 'react';
import { ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface CTAProps {
  onOpenDemo: () => void;
}

export const CallToAction: React.FC<CTAProps> = ({ onOpenDemo }) => {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Intense ambient orange glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-[#FF5C00]/15 via-[#FF7A1A]/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="liquid-glass-light-orange p-10 md:p-16 border border-[#FF5C00]/30 shadow-[0_20px_60px_rgba(255,92,0,0.12)] text-center relative overflow-hidden bg-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono text-slate-800 font-semibold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FF5C00]" />
            <span>LET’S REVIEW YOUR AD SETUP</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 mb-6">
            Ready to Make More of Your{' '}
            <span className="font-serif italic font-normal text-[#FF5C00]">
              Ad Space?
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg mb-10 leading-relaxed">
            Tell us about your website or app, your audience, and how you run ads today. We can discuss where BidDigi fits, what integration involves, and the opportunities to improve your ad revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenDemo}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold tracking-wide bg-[#FF5C00] text-white shadow-[0_8px_25px_rgba(255,92,0,0.35)] hover:shadow-[0_12px_35px_rgba(255,92,0,0.5)] hover:bg-[#FF6D1A] transition-all cursor-pointer"
            >
              <span>Discuss My Ad Setup</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              href="#calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition-all cursor-pointer"
            >
              <span>Try the Revenue Calculator</span>
            </motion.a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Review your current setup</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Discuss integration options</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Confirm commercial terms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
