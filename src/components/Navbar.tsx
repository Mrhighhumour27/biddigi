import React, { useState } from 'react';
import { ArrowRight, Menu, X, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header 
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-5 inset-x-0 z-50 px-4 md:px-8 max-w-7xl mx-auto"
    >
      <nav className="liquid-glass-pill-light rounded-full px-5 py-3 flex items-center justify-between transition-all duration-300">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <img 
            src="/logo.png" 
            alt="BidDigi Logo" 
            className="h-7 md:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider bg-slate-100 border border-slate-200 text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C00] animate-pulse"></span>
            BY EXPOWORLD
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#platform" className="hover:text-slate-900 transition-colors duration-200 flex items-center gap-1.5">
            <span>Platform</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#FF5C00]/10 text-[#FF5C00] font-semibold">
              Telemetry
            </span>
          </a>
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors duration-200">
            How It Works
          </a>
          <a href="#solutions" className="hover:text-slate-900 transition-colors duration-200">
            Solutions
          </a>
          <a href="#calculator" className="hover:text-slate-900 transition-colors duration-200">
            Yield Calculator
          </a>
          <a href="#architecture" className="hover:text-slate-900 transition-colors duration-200">
            Infrastructure
          </a>
        </div>

        {/* Right Action & Status Area */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/80 border border-slate-200 text-[11px] font-mono text-slate-600">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span className="text-slate-900 font-semibold">4.2ms</span> SLA
          </div>

          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenDemo}
            className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide bg-[#FF5C00] text-white overflow-hidden shadow-[0_4px_14px_rgba(255,92,0,0.3)] hover:shadow-[0_6px_20px_rgba(255,92,0,0.45)] hover:bg-[#FF6D1A] transition-all duration-300"
          >
            <span>Monetize With Us</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-700"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mt-3 liquid-glass-light p-6 shadow-xl flex flex-col gap-4 text-sm"
          >
            <a 
              href="#platform" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-800 font-medium border-b border-slate-100"
            >
              Platform Telemetry & Dashboard
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-800 font-medium border-b border-slate-100"
            >
              How It Works (12ms Lifecycle)
            </a>
            <a 
              href="#solutions" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-800 font-medium border-b border-slate-100"
            >
              Solutions for Publishers & Advertisers
            </a>
            <a 
              href="#calculator" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-slate-800 font-medium border-b border-slate-100"
            >
              Revenue Yield Calculator
            </a>

            <div className="pt-2">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#FF5C00] font-semibold text-white shadow-md shadow-[#FF5C00]/25"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
