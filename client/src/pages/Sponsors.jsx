import PageTransition from '../components/layout/PageTransition';
import ScrambleText from '../components/ui/ScrambleText';
import IgniteButton from '../components/ui/IgniteButton';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Sponsors() {
  const reveal1 = useScrollReveal();
  const reveal2 = useScrollReveal();

  const tiers = [
    { title: 'TITLE SPONSOR', count: 1, height: 'h-64', color: 'border-fire' },
    { title: 'GOLD SPONSORS', count: 3, height: 'h-48', color: 'border-ember' },
    { title: 'SILVER SPONSORS', count: 4, height: 'h-40', color: 'border-muted' },
    { title: 'COMMUNITY PARTNERS', count: 5, height: 'h-32', color: 'border-muted' },
  ];

  return (
    <PageTransition className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="font-display text-5xl md:text-8xl text-primary mb-4 tracking-[6px]">
            <ScrambleText text="OUR SPONSORS" />
          </h1>
          <p className="font-mono text-secondary tracking-[4px] text-xs md:text-sm uppercase">
            Powering the future of technical education
          </p>
        </header>

        <div className="space-y-24">
          {tiers.map((tier, idx) => (
            <section key={tier.title} className="animate-fade-up" style={{ animationDelay: `${idx * 200}ms` }}>
              <h3 className="font-ui text-sm text-muted tracking-[6px] uppercase mb-8 border-b border-[var(--border-subtle)] pb-4">
                {tier.title}
              </h3>
              <div className="flex flex-wrap gap-8 justify-center">
                {[...Array(tier.count)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 min-w-[200px] ${tier.height} border-2 border-dashed ${tier.color} bg-surface/30 flex flex-col items-center justify-center opacity-40 group hover:opacity-100 transition-opacity`}
                  >
                    <div className="font-display text-xl text-muted group-hover:text-primary transition-colors">LOGO COMING SOON</div>
                    <div className="font-mono text-[9px] text-muted tracking-[2px] uppercase mt-2">{tier.title.split(' ')[0]} PARTNER</div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section ref={reveal2} className="mt-40 text-center py-24 border-t border-[var(--border-subtle)] relative overflow-hidden">
          <div className="absolute inset-0 bg-fire/5 blur-[120px] rounded-full -z-10" />
          <h2 className="font-display text-4xl md:text-6xl text-primary mb-6 tracking-wider">
            WANT TO SPONSOR <span className="text-fire">IGNITE 2026</span>?
          </h2>
          <p className="font-mono text-secondary mb-12 tracking-[2px] uppercase text-sm">
            Reach 5000+ students and showcase your brand.
          </p>
          <IgniteButton variant="primary" size="lg" onClick={() => window.location.href = 'mailto:ignite.techfest@iilm.edu'}>
            BECOME A SPONSOR
          </IgniteButton>
        </section>
      </div>
    </PageTransition>
  );
}
