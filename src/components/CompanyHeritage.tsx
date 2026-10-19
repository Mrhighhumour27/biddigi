import React from 'react';
import { Award, ShieldCheck, MapPin, Globe2, FileCheck2 } from 'lucide-react';

export const CompanyHeritage: React.FC = () => {
  return (
    <section id="metrics" className="py-20 relative bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-[#FF5C00] font-semibold mb-4 shadow-sm">
              <span>HERITAGE & GLOBAL OFFICES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-6">
              A Product by{' '}
              <span className="font-serif italic font-normal text-[#FF5C00]">
                Expoworld.
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              BidDigi is backed by the proven media engineering of <strong>Expoworld</strong>. 
              Our ad-tech infrastructure powers high-yield programmatic monetization for hundreds 
              of publishers worldwide, adhering to the highest global trust and transparency standards.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF5C00] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">United Kingdom</div>
                  <div className="text-slate-500 text-[11px] mt-1">Expoworld Biddigi Ltd<br />London, UK</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF5C00] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900">India</div>
                  <div className="text-slate-500 text-[11px] mt-1">Expoworld Biddigi Pvt Ltd<br />Mumbai, MH</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Trust & Compliance Badges */}
          <div className="lg:col-span-6 liquid-glass-light p-8 md:p-10">
            <h3 className="text-lg font-bold text-slate-950 mb-6 flex items-center gap-2 font-mono">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Trust, Compliance & Standards</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 flex items-start gap-3">
                <FileCheck2 className="w-5 h-5 text-[#FF5C00] shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">IAB Tech Lab Member</div>
                  <div className="text-slate-500 text-[11px] mt-1">Full compliance with OpenRTB 3.0 & Prebid standards.</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 flex items-start gap-3">
                <Award className="w-5 h-5 text-[#FF5C00] shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">TAG Certified Supply</div>
                  <div className="text-slate-500 text-[11px] mt-1">Pre-bid bot filtering & invalid traffic suppression.</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 flex items-start gap-3">
                <Globe2 className="w-5 h-5 text-[#FF5C00] shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">Sellers.json & Ads.txt</div>
                  <div className="text-slate-500 text-[11px] mt-1">100% direct authorized supply paths for buyers.</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#FF5C00] shrink-0" />
                <div>
                  <div className="font-bold text-slate-900">GDPR & CCPA Compliant</div>
                  <div className="text-slate-500 text-[11px] mt-1">Certified CMP with TCF 2.2 consent string forwarding.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
