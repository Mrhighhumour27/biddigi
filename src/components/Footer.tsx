import React from 'react';
import { ArrowUpRight } from 'lucide-react';
export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-500 text-xs py-16 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <img 
                src="/logo.png" 
                alt="BidDigi Logo" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-slate-600 text-xs leading-relaxed max-w-sm mb-6">
              BidDigi helps publishers earn from ads on websites, apps, video, and connected TV by connecting their ad space with buyers and helping them understand and improve performance.
            </p>
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm max-w-sm text-[11px] font-mono text-slate-600">
              <span className="text-slate-900 font-bold">A Product by Expoworld</span>
              <p className="mt-1 text-slate-500">
                Operating internationally through Expoworld Biddigi Ltd (London, UK) and Expoworld Biddigi Private Limited (Mumbai, India).
              </p>
            </div>
          </div>
          {/* Solutions Col */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider font-mono text-[11px]">
              Solutions
            </h4>
            <ul className="space-y-2.5">
              <li><a href="/jiohotstar-ads" className="hover:text-[#FF5C00] transition-colors font-semibold">JioHotstar Advertising</a></li>
              <li><a href="/#solutions" className="hover:text-[#FF5C00] transition-colors">Header Bidding</a></li>
              <li><a href="/#solutions" className="hover:text-[#FF5C00] transition-colors">Prebid Server (S2S)</a></li>
              <li><a href="/#solutions" className="hover:text-[#FF5C00] transition-colors">Mobile App SDK</a></li>
              <li><a href="/#solutions" className="hover:text-[#FF5C00] transition-colors">Video &amp; CTV (VAST)</a></li>
              <li><a href="/#solutions" className="hover:text-[#FF5C00] transition-colors">Private Marketplace (PMP)</a></li>
            </ul>
          </div>
          {/* Technology Col */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider font-mono text-[11px]">
              Platform
            </h4>
            <ul className="space-y-2.5">
              <li><a href="/#how-it-works" className="hover:text-[#FF5C00] transition-colors">How Ad Auctions Work</a></li>
              <li><a href="/#platform" className="hover:text-[#FF5C00] transition-colors">Revenue Reporting</a></li>
              <li><a href="/#how-it-works" className="hover:text-[#FF5C00] transition-colors">Getting Started</a></li>
              <li><a href="/#calculator" className="hover:text-[#FF5C00] transition-colors">Revenue Calculator</a></li>
              <li><a href="https://expoworld.co" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF5C00] transition-colors flex items-center gap-1 font-semibold">
                Expoworld.co <ArrowUpRight className="w-3 h-3 text-[#FF5C00]" />
              </a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider font-mono text-[11px]">Learn More</h4>
            <ul className="space-y-2.5">
              <li><a href="/#how-it-works" className="hover:text-[#FF5C00]">What BidDigi Does</a></li>
              <li><a href="/#solutions" className="hover:text-[#FF5C00]">Publisher &amp; Buyer Solutions</a></li>
              <li><a href="/#faq" className="hover:text-[#FF5C00]">Frequently Asked Questions</a></li>
              <li><a href="/#metrics" className="hover:text-[#FF5C00]">About BidDigi</a></li>
            </ul>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} BidDigi. Backed by Expoworld. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Web • App • Video • CTV
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
