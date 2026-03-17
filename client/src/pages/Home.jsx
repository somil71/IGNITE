import PageTransition from '../components/layout/PageTransition';
import HeroSection from '../components/home/HeroSection';
import PrizePoolBanner from '../components/ui/PrizePoolBanner';
import StatsSection from '../components/home/StatsSection';
import EventsPreview from '../components/home/EventsPreview';
import AboutSections from '../components/home/AboutSections';
import SponsorsStrip from '../components/home/SponsorsStrip';
import IgniteButton from '../components/ui/IgniteButton';
import ScrambleText from '../components/ui/ScrambleText';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Home() {
  const ctaRef = useScrollReveal();

  return (
    <PageTransition>
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. PRIZE BANNER */}
      <div className="px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <PrizePoolBanner />
        </div>
      </div>

      {/* 3. STATS */}
      <StatsSection />

      {/* 4. EVENTS PREVIEW */}
      <EventsPreview />

      {/* 4.5 ABOUT SECTIONS */}
      <AboutSections />

      {/* 5. SPONSORS */}
      <SponsorsStrip />

      {/* 6. BOTTOM CTA */}
      <section ref={ctaRef} className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fire/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-display text-5xl md:text-7xl text-primary mb-4">
            <ScrambleText text="READY TO COMPETE?" trigger="scroll" />
          </h2>
          <p className="font-mono text-secondary tracking-[2px] mb-12 uppercase text-sm md:text-base">
            Innovate. Integrate. Ignite.
          </p>
          <IgniteButton variant="primary" size="lg" to="/register">
            REGISTER FOR IGNITE 2026
          </IgniteButton>
        </div>
      </section>
    </PageTransition>
  );
}
