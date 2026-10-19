import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveAuctionTicker } from './components/LiveAuctionTicker';
import { PlatformDashboard } from './components/PlatformDashboard';
import { ScrollRunway } from './components/ScrollRunway';
import { InteractiveFormatPreviewer } from './components/InteractiveFormatPreviewer';
import { SolutionsSection } from './components/SolutionsSection';
import { InteractiveYieldCalculator } from './components/InteractiveYieldCalculator';
import { TechArchitecture } from './components/TechArchitecture';
import { CompanyHeritage } from './components/CompanyHeritage';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { AuditModal } from './components/AuditModal';

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F172A] selection:bg-[#FF5C00]/20 selection:text-[#FF5C00] relative">
      {/* Floating Light Pill Navbar */}
      <Navbar onOpenDemo={() => setIsModalOpen(true)} />

      <main>
        {/* Hero Section with Interactive Canvas & Parallax */}
        <Hero onOpenDemo={() => setIsModalOpen(true)} />

        {/* Live Programmatic Marquee Ticker */}
        <LiveAuctionTicker />

        {/* Real-Time Platform Yield Telemetry Dashboard */}
        <PlatformDashboard />

        {/* Sticky Scroll Runway: 12ms Ad Lifecycle Storytelling */}
        <ScrollRunway />

        {/* Interactive Ad Format Benchmark Previewer */}
        <InteractiveFormatPreviewer />

        {/* Publisher & Advertiser Solutions */}
        <SolutionsSection onOpenDemo={() => setIsModalOpen(true)} />

        {/* Dynamic Yield Uplift Calculator */}
        <InteractiveYieldCalculator onOpenDemo={() => setIsModalOpen(true)} />

        {/* Technical Architecture & Infrastructure */}
        <TechArchitecture />

        {/* Expoworld Heritage & Compliance */}
        <CompanyHeritage />

        {/* Call to Action Banner */}
        <CallToAction onOpenDemo={() => setIsModalOpen(true)} />
      </main>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Interactive Audit Request Modal */}
      <AuditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
