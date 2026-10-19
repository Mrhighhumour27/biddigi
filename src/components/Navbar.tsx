import React, { useState } from 'react';
import { ArrowRight, Menu, X, Activity } from 'lucide-react';

interface NavbarProps {
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-5 inset-x-0 z-50 px-4 md:px-8 max-w-7xl mx-auto">
      <nav className="liquid-glass-pill rounded-full px-5 py-3 flex items-center justify-between transition-all duration-300">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative flex items-center">
            <img 
              src="/logo.png" 
              alt="BidDigi Logo" 
              className="h-7 md:h-8 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,92,0,0.3)] transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider bg-white/5 border border-white/10 text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] animate-pulse"></span>
            BY EXPOWORLD
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a href="#solutions" className="hover:text-white transition-colors duration-200">
            Solutions
          </a>
          <a href="#calculator" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5">
            Yield Calculator
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#FF5C00]/20 text-[#FF7A1A] border border-[#FF5C00]/30">
              Live
            </span>
          </a>
          <a href="#architecture" className="hover:text-white transition-colors duration-200">
            Architecture
          </a>
          <a href="#metrics" className="hover:text-white transition-colors duration-200">
            Network
          </a>
        </div>

        {/* Right Action & Status Area */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/5 text-[11px] font-mono text-neutral-400">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="text-neutral-300 font-semibold">4.2ms</span> SLA
          </div>

          <button 
            onClick={onOpenDemo}
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide bg-[#FF5C00] text-white overflow-hidden shadow-[0_0_20px_rgba(255,92,0,0.35)] hover:shadow-[0_0_30px_rgba(255,92,0,0.55)] hover:bg-[#FF6D1A] active:scale-95 transition-all duration-300"
          >
            <span>Monetize With Us</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full hover:bg-white/10 text-neutral-300"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 liquid-glass-orange p-6 border border-white/10 shadow-2xl flex flex-col gap-4 text-sm animate-hero-reveal">
          <a 
            href="#solutions" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-neutral-200 hover:text-white border-b border-white/5"
          >
            Solutions (Publishers & Advertisers)
          </a>
          <a 
            href="#calculator" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-neutral-200 hover:text-white border-b border-white/5"
          >
            Yield Calculator
          </a>
          <a 
            href="#architecture" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-neutral-200 hover:text-white border-b border-white/5"
          >
            Infrastructure & Prebid
          </a>
          <a 
            href="#metrics" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 text-neutral-200 hover:text-white border-b border-white/5"
          >
            Global Marketplace
          </a>

          <div className="pt-2 flex flex-col gap-3">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF5C00] font-semibold text-white shadow-lg shadow-[#FF5C00]/30"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
