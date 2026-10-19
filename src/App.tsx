import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LiveAuctionTicker } from './components/LiveAuctionTicker';
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
    <div className="min-h-screen bg-[#08090C] text-[#E4E4E7] selection:bg-[#FF5C00]/30 selection:text-white relative">
      {/* Floating Navbar */}
      <Navbar onOpenDemo={() => setIsModalOpen(true)} />

      <main>
        {/* Hero Section with Interactive Canvas */}
        <Hero onOpenDemo={() => setIsModalOpen(true)} />

        {/* Live Programmatic Marquee Ticker */}
        <LiveAuctionTicker />

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
