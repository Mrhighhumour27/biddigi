import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, Sparkles, Mail, Globe, User } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [role, setRole] = useState<'publisher' | 'advertiser'>('publisher');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [traffic, setTraffic] = useState('1M - 5M');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-lg liquid-glass-orange p-8 md:p-10 border border-[#FF5C00]/40 shadow-[0_0_60px_rgba(255,92,0,0.25)] text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
            <p className="text-sm text-neutral-300 max-w-sm mx-auto mb-6">
              Our AdOps team has received your information for <span className="text-[#FF7A1A] font-semibold">{url || 'your property'}</span>. 
              We will prepare your custom yield audit within 12 business hours.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5C00]/15 border border-[#FF5C00]/30 text-xs font-mono text-[#FF7A1A] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CONFIDENTIAL AUDIT</span>
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
              Start Monetizing With BidDigi
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Connect with an Expoworld yield strategist to review your header bidding setup.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setRole('publisher')}
                  className={`py-2 rounded-lg transition-colors ${
                    role === 'publisher'
                      ? 'bg-[#FF5C00] text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  I'm a Media Publisher
                </button>
                <button
                  type="button"
                  onClick={() => setRole('advertiser')}
                  className={`py-2 rounded-lg transition-colors ${
                    role === 'advertiser'
                      ? 'bg-[#FF5C00] text-white'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  I'm an Advertiser / DSP
                </button>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Sameer Phatak"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#FF5C00]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Corporate Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sameer@expoworld.co"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#FF5C00]"
                  />
                </div>
              </div>

              {/* Website or App URL */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Website or App URL</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#FF5C00]"
                  />
                </div>
              </div>

              {/* Monthly Impressions */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">Monthly Traffic / Impressions</label>
                <select
                  value={traffic}
                  onChange={(e) => setTraffic(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF5C00]"
                >
                  <option value="Under 1M">Under 1M Impressions</option>
                  <option value="1M - 5M">1M - 5M Impressions</option>
                  <option value="5M - 20M">5M - 20M Impressions</option>
                  <option value="20M+">20M+ Impressions</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 rounded-xl bg-[#FF5C00] hover:bg-[#FF6D1A] text-white font-semibold text-xs tracking-wide shadow-lg shadow-[#FF5C00]/30 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <span>Processing Audit Request...</span>
                ) : (
                  <>
                    <span>Submit & Request Audit</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
