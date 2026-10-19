import React from 'react';
import { Award, ShieldCheck, MapPin, Globe2, FileCheck2 } from 'lucide-react';

export const CompanyHeritage: React.FC = () => {
  return (
    <section id="metrics" className="py-20 relative border-t border-white/5 bg-[#06070A]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#FF7A1A] mb-4">
              <span>05 / HERITAGE & GLOBAL PRESENCE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              A Product by{' '}
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] via-[#FF5C00] to-white">
                Expoworld.
              </span>
            </h2>

            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
              BidDigi is backed by the proven media engineering of <strong>Expoworld</strong>. 
              Our ad-tech infrastructure powers high-yield programmatic monetization for hundreds 
              of publishers worldwide, adhering to the highest global trust and transparency standards.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF5C00] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">United Kingdom</div>
                  <div className="text-neutral-400 text-[11px] mt-1">Expoworld Biddigi Ltd<br />London, UK</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF5C00] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">India</div>
                  <div className="text-neutral-400 text-[11px] mt-1">Expoworld Biddigi Pvt Ltd<br />Mumbai, MH</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Trust & Compliance Badges */}
          <div className="lg:col-span-6 liquid-glass-subtle p-8 md:p-10 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 font-mono">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>Trust, Compliance & Standards</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                <FileCheck2 className="w-5 h-5 text-[#FF5C00] shrink-0" />
                <div>
                  <div className="font-semibold text-white">IAB Tech Lab Member</div>
                  <div className="text-neutral-400 text-[11px] mt-1">Full compliance with OpenRTB 3.0 & Prebid standards.</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                <Award className="w-5 h-5 text-[#FF5C00] shrink-0" />
                <div>
                  <div className="font-semibold text-white">TAG Certified Supply</div>
                  <div className="text-neutral-400 text-[11px] mt-1">Pre-bid bot filtering & invalid traffic suppression.</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-[#FF5C00] shrink-0" />
                <div>
                  <div className="font-semibold text-white">Sellers.json & Ads.txt</div>
                  <div className="text-neutral-400 text-[11px] mt-1">100% direct authorized supply paths for buyers.</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#FF5C00] shrink-0" />
                <div>
                  <div className="font-semibold text-white">GDPR & CCPA Compliant</div>
                  <div className="text-neutral-400 text-[11px] mt-1">Certified CMP with TCF 2.2 consent string forwarding.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
