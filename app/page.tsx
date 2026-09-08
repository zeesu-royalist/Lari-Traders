import Hero from '@/components/Hero';
import CinematicSection from '@/components/CinematicSection';
import PricingSection from '@/components/PricingSection';
import CinematicCurations from '@/components/CinematicCurations';
import FeatureMatrix from '@/components/FeatureMatrix';
import TradingDashboard from '@/components/TradingDashboard';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#080A19] text-white selection:bg-white selection:text-black">
      {/* 
        STICKY HERO:
        Stays fixed in place at the top of the viewport (z-0, 100vh) while scrolling.
        Maintains original size, position, and design without moving upward.
      */}
      <div className="sticky top-0 h-screen w-full z-0 overflow-hidden">
        <Hero />
      </div>

      {/* 
        OVERLAPPING CONTENT LAYER:
        Sits above the Hero (z-10) and scrolls upward OVER the fixed Hero section,
        creating an elegant layered curtain effect with smooth rounded edges and shadow.
      */}
      <div className="relative z-10 bg-[#080A19] rounded-t-[32px] sm:rounded-t-[48px] border-t border-white/[0.08] shadow-[0_-30px_60px_rgba(0,0,0,0.9)]">
        {/* Institutional Masterclasses & Video Showcase */}
        <CinematicSection />

        {/* Real-Time Market Analytics & Risk Telemetry */}
        <TradingDashboard />

        {/* Tuition & Membership Plans */}
        <PricingSection />

        {/* On-Demand Masterclass Library */}
        <CinematicCurations />

        {/* Systematic Methodology & Risk Matrix */}
        <FeatureMatrix />

        <Footer />
      </div>
    </main>
  );
}
