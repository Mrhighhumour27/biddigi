import React, { useEffect, useRef } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface HeroProps {
  onOpenDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemo }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Nodes definition: DSP nodes surrounding the central Biddigi auction engine
    const dspNodes = [
      { name: 'Google AdX', angle: 0.2, distance: 0.38, cpm: '$5.40' },
      { name: 'Magnite CTV', angle: 1.3, distance: 0.36, cpm: '$18.20' },
      { name: 'Amazon TAM', angle: 2.3, distance: 0.40, cpm: '$4.10' },
      { name: 'The Trade Desk', angle: 3.4, distance: 0.37, cpm: '$7.80' },
      { name: 'PubMatic', angle: 4.5, distance: 0.39, cpm: '$5.15' },
      { name: 'OpenX', angle: 5.6, distance: 0.35, cpm: '$3.90' },
    ];

    interface Particle {
      sourceIndex: number;
      progress: number;
      speed: number;
      cpm: string;
      color: string;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 16; i++) {
      particles.push({
        sourceIndex: Math.floor(Math.random() * dspNodes.length),
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.006,
        cpm: (3 + Math.random() * 12).toFixed(2),
        color: Math.random() > 0.4 ? '#FF5C00' : '#FFA04D',
      });
    }

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const baseRadius = Math.min(width, height);

      // Draw faint concentric telemetry rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      [0.2, 0.3, 0.4].forEach((scale) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, baseRadius * scale, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw DSP outer nodes & connection beams
      dspNodes.forEach((node, idx) => {
        const orbitAngle = node.angle + Math.sin(time * 0.5 + idx) * 0.05;
        const nodeX = centerX + Math.cos(orbitAngle) * (baseRadius * node.distance);
        const nodeY = centerY + Math.sin(orbitAngle) * (baseRadius * node.distance * 0.85);

        // Gradient connection line to center
        const grad = ctx.createLinearGradient(nodeX, nodeY, centerX, centerY);
        grad.addColorStop(0, 'rgba(255, 92, 0, 0.3)');
        grad.addColorStop(0.5, 'rgba(255, 92, 0, 0.08)');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.02)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.moveTo(nodeX, nodeY);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
        ctx.setLineDash([]);

        // Outer DSP node point
        ctx.fillStyle = 'rgba(255, 92, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FF5C00';
        ctx.beginPath();
        ctx.arc(nodeX, nodeY, 4, 0, Math.PI * 2);
        ctx.fill();

        // Node Label
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.textAlign = 'center';
        ctx.fillText(node.name, nodeX, nodeY - 12);
      });

      // Animate flowing bid packets
      particles.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.sourceIndex = Math.floor(Math.random() * dspNodes.length);
        }

        const node = dspNodes[p.sourceIndex];
        const orbitAngle = node.angle + Math.sin(time * 0.5 + p.sourceIndex) * 0.05;
        const startX = centerX + Math.cos(orbitAngle) * (baseRadius * node.distance);
        const startY = centerY + Math.sin(orbitAngle) * (baseRadius * node.distance * 0.85);

        const curX = startX + (centerX - startX) * p.progress;
        const curY = startY + (centerY - startY) * p.progress;

        // Packet glow
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#FF5C00';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(curX, curY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Central Biddigi Engine Core Node
      const corePulse = Math.sin(time * 2) * 4;
      const coreGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        5,
        centerX,
        centerY,
        45 + corePulse
      );
      coreGrad.addColorStop(0, '#FF5C00');
      coreGrad.addColorStop(0.4, 'rgba(255, 92, 0, 0.4)');
      coreGrad.addColorStop(1, 'rgba(255, 92, 0, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 45 + corePulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#08090C';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FF5C00';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 9px Plus Jakarta Sans, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('BIDDIGI', centerX, centerY + 3);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="relative pt-36 md:pt-44 pb-20 md:pb-28 overflow-hidden min-h-[92svh] flex flex-col justify-center">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[500px] bg-gradient-to-b from-[#FF5C00]/15 via-[#FF5C00]/5 to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* Interactive Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 md:opacity-75 -z-10"
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 text-center relative z-10">
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full liquid-glass-pill mb-8 animate-hero-reveal">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5C00]"></span>
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-300">
            Next-Gen Programmatic Architecture
          </span>
          <span className="text-white/20">|</span>
          <span className="text-xs font-mono text-[#FF7A1A]">Prebid 8.0 & OpenRTB 3.0</span>
        </div>

        {/* Dual-Font Staggered Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.05] animate-hero-reveal">
          MAXIMIZE YOUR YIELD.{' '}
          <br className="hidden sm:inline" />
          <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] via-[#FF5C00] to-[#FFA756]">
            Without Compromise.
          </span>
        </h1>

        {/* Narrative Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed mb-10 animate-hero-reveal delay-100">
          BidDigi bridges world-class digital publishers and top programmatic buyers. 
          Harness sub-12ms header bidding, AI floor pricing, and multi-cloud server auctions 
          engineered by <strong className="text-white font-medium">Expoworld</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-hero-reveal delay-200">
          <button
            onClick={onOpenDemo}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-sm font-semibold tracking-wide bg-[#FF5C00] text-white shadow-[0_0_35px_rgba(255,92,0,0.4)] hover:shadow-[0_0_50px_rgba(255,92,0,0.65)] hover:bg-[#FF6D1A] active:scale-95 transition-all duration-300"
          >
            <span>Monetize Your Traffic</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <a
            href="#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-medium text-neutral-200 liquid-glass-subtle hover:bg-white/5 hover:text-white border border-white/10 active:scale-95 transition-all duration-300"
          >
            <TrendingUp className="w-4 h-4 text-[#FF7A1A]" />
            <span>Calculate Yield Uplift</span>
          </a>
        </div>

        {/* Real-Time Live Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto animate-hero-reveal delay-300">
          <div className="liquid-glass-subtle p-4 md:p-5 text-left border border-white/5 hover:border-[#FF5C00]/30 transition-colors">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
              &lt; 12<span className="text-[#FF5C00]">ms</span>
            </div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-mono">
              Auction Latency
            </div>
          </div>

          <div className="liquid-glass-subtle p-4 md:p-5 text-left border border-white/5 hover:border-[#FF5C00]/30 transition-colors">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
              +38<span className="text-[#FF5C00]">%</span>
            </div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-mono">
              Avg. CPM Uplift
            </div>
          </div>

          <div className="liquid-glass-subtle p-4 md:p-5 text-left border border-white/5 hover:border-[#FF5C00]/30 transition-colors">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
              450M<span className="text-[#FF5C00]">+</span>
            </div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-mono">
              Daily Bid Queries
            </div>
          </div>

          <div className="liquid-glass-subtle p-4 md:p-5 text-left border border-white/5 hover:border-[#FF5C00]/30 transition-colors">
            <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
              180<span className="text-[#FF5C00]">+</span>
            </div>
            <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-mono">
              Global DSP Partners
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
