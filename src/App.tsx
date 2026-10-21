import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomepageExplainer, HomepageFAQ } from './components/HomepageExplainer';
import { PlatformDashboard } from './components/PlatformDashboard';
import { InteractiveFormatPreviewer } from './components/InteractiveFormatPreviewer';
import { SolutionsSection } from './components/SolutionsSection';
import { InteractiveYieldCalculator } from './components/InteractiveYieldCalculator';
import { CompanyHeritage } from './components/CompanyHeritage';
import { CallToAction } from './components/CallToAction';
import { Footer } from './components/Footer';
import { AuditModal } from './components/AuditModal';
import { JioHotstarAds } from './pages/JioHotstarAds';
import { JioHotstarTeaser } from './components/JioHotstarTeaser';

export function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isServicePage = window.location.pathname.replace(/\/$/, '') === '/jiohotstar-ads';
  const openContact = () => {
    if (isServicePage) document.getElementById('campaign-enquiry')?.scrollIntoView({ behavior: 'smooth' });
    else setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F172A] selection:bg-[#FF5C00]/20 selection:text-[#FF5C00] relative">
      {/* Floating Light Pill Navbar */}
      <Navbar onOpenDemo={openContact} />

      {isServicePage ? <JioHotstarAds /> : <main>
        {/* Hero Section with Interactive Canvas & Parallax */}
        <Hero onOpenDemo={() => setIsModalOpen(true)} />
        <HomepageExplainer />
        <SolutionsSection onOpenDemo={() => setIsModalOpen(true)} />

        {/* Real-Time Platform Yield Telemetry Dashboard */}
        <PlatformDashboard />

        {/* Interactive Ad Format Benchmark Previewer */}
        <InteractiveFormatPreviewer />


        {/* Dynamic Yield Uplift Calculator */}
        <InteractiveYieldCalculator onOpenDemo={() => setIsModalOpen(true)} />

        {/* Expoworld Heritage & Compliance */}
        <CompanyHeritage />
        <HomepageFAQ />
        <JioHotstarTeaser />

        {/* Call to Action Banner */}
        <CallToAction onOpenDemo={() => setIsModalOpen(true)} />
      </main>}

      {/* Comprehensive Footer */}
      <Footer />

      {/* Interactive Audit Request Modal */}
      <AuditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
