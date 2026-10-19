import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-[#040507] text-neutral-400 text-xs py-16 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img 
                src="/logo.png" 
                alt="BidDigi Logo" 
                className="h-8 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,92,0,0.3)]"
              />
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm mb-6">
              Next-generation programmatic advertising marketplace and header bidding yield engine. 
              Delivering sub-12ms auction latency and transparent monetization.
            </p>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 max-w-sm text-[11px] font-mono text-neutral-400">
              <span className="text-white font-semibold">A Product by Expoworld</span>
              <p className="mt-1 text-neutral-400">
                Operating internationally through Expoworld Biddigi Ltd (London, UK) and Expoworld Biddigi Private Limited (Mumbai, India).
              </p>
            </div>
          </div>

          {/* Solutions Col */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider font-mono text-[11px]">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#solutions" className="hover:text-white transition-colors">Header Bidding</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Prebid Server (S2S)</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Mobile App SDK</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Video &amp; CTV (VAST)</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Private Marketplace (PMP)</a></li>
            </ul>
          </div>

          {/* Technology Col */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider font-mono text-[11px]">
              Platform
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#architecture" className="hover:text-white transition-colors">Global Edge Clusters</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">AI Floor Engine</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Yield Calculator</a></li>
              <li><a href="#metrics" className="hover:text-white transition-colors">OpenRTB 3.0 Specs</a></li>
              <li><a href="https://expoworld.co" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                Expoworld.co <ArrowUpRight className="w-3 h-3 text-[#FF5C00]" />
              </a></li>
            </ul>
          </div>

          {/* Compliance & Trust */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider font-mono text-[11px]">
              Trust &amp; Legal
            </h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="hover:text-white transition-colors">Sellers.json Directory</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ads.txt Verification</a></li>
              <li><a href="#" className="hover:text-white transition-colors">TAG Certified Against Fraud</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy &amp; GDPR</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} BidDigi. Backed by Expoworld. All rights reserved. Hosted on Cloudflare Pages.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              All Edge Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
