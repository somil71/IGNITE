import { useQuery } from '@tanstack/react-query';
import PageTransition from '../components/layout/PageTransition';
import ScrambleText from '../components/ui/ScrambleText';
import { winnersService } from '@/services/winners.service';
import useScrollReveal from '../hooks/useScrollReveal';
import { Trophy, Award } from 'lucide-react';

export default function Winners() {
  const headerRef = useScrollReveal();
  
  const { data: winners = [], isLoading } = useQuery({
    queryKey: ['winners'],
    queryFn: async () => {
      try {
        const res = await winnersService.getAll();
        return res.data.winners;
      } catch (err) {
        return [];
      }
    }
  });

  return (
    <PageTransition className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header ref={headerRef} className="mb-20 text-center reveal-element">
          <h1 className="font-display text-5xl md:text-8xl text-primary mb-4 tracking-[6px]">
            <ScrambleText text="THE CHAMPIONS" />
          </h1>
          <div className="w-40 h-[1px] bg-fire mx-auto mb-6" />
          <p className="font-mono text-secondary tracking-[4px] text-xs md:text-sm uppercase">
            Celebrating Excellence at IGNITE Techfest 2026
          </p>
        </header>

        {isLoading ? (
          <div className="py-20 text-center">
             <div className="inline-block w-12 h-12 border-2 border-cyan border-t-transparent animate-spin" />
          </div>
        ) : winners.length > 0 ? (
          <div className="space-y-32">
            {winners.map((eventWinners) => (
              <div key={eventWinners._id} className="animate-fade-up">
                <h2 className="font-display text-3xl md:text-5xl text-primary mb-12 flex items-center gap-4">
                   <span className="text-fire">◈</span> {eventWinners.event.title.toUpperCase()}
                </h2>
                
                <div className="flex flex-col md:flex-row items-end justify-center gap-8 md:gap-0 reveal-stagger">
                  {/* 2nd Place */}
                  <div className="w-full md:w-1/3 order-2 md:order-1 px-4">
                    <div className="ignite-card p-8 border-secondary/30 bg-secondary/5 h-[340px] flex flex-col items-center justify-between text-center relative">
                      <div className="absolute top-4 left-4 font-display text-4xl text-secondary/20">02</div>
                      <div className="w-16 h-16 bg-secondary/10 flex items-center justify-center rounded-full text-secondary mb-6 border border-secondary/20">
                         <Award size={32} />
                      </div>
                      <div>
                        <div className="font-display text-2xl text-primary mb-1 uppercase">{eventWinners.second.teamName}</div>
                        <div className="font-mono text-[10px] text-muted uppercase">{eventWinners.second.college}</div>
                      </div>
                      <div className="font-mono text-xs text-secondary tracking-[2px] pt-4 border-t border-secondary/10 w-full">2ND PLACE</div>
                    </div>
                  </div>

                  {/* 1st Place */}
                  <div className="w-full md:w-1/3 order-1 md:order-2 px-4">
                    <div className="ignite-card p-10 border-fire/50 bg-fire/10 h-[420px] flex flex-col items-center justify-between text-center relative shadow-fire/20 shadow-2xl scale-105 z-10">
                      <div className="absolute top-4 left-4 font-display text-6xl text-fire/20">01</div>
                      <div className="w-24 h-24 bg-fire/20 flex items-center justify-center rounded-full text-fire mb-8 shadow-fire/40 shadow-lg border border-fire/30">
                         <Trophy size={48} />
                      </div>
                      <div>
                        <div className="font-display text-4xl text-primary mb-1 uppercase">{eventWinners.first.teamName}</div>
                        <div className="font-mono text-xs text-secondary uppercase tracking-[1px]">{eventWinners.first.college}</div>
                      </div>
                      <div className="font-mono text-sm text-fire tracking-[4px] pt-6 border-t border-fire/20 w-full font-bold">1ST PLACE</div>
                    </div>
                  </div>

                  {/* 3rd Place */}
                  <div className="w-full md:w-1/3 order-3 px-4">
                    <div className="ignite-card p-8 border-ember/30 bg-ember/5 h-[300px] flex flex-col items-center justify-between text-center relative">
                      <div className="absolute top-4 left-4 font-display text-4xl text-ember/20">03</div>
                      <div className="w-16 h-16 bg-ember/10 flex items-center justify-center rounded-full text-ember mb-6 border border-ember/20">
                         <Award size={32} />
                      </div>
                      <div>
                        <div className="font-display text-2xl text-primary mb-1 uppercase">{eventWinners.third.teamName}</div>
                        <div className="font-mono text-[10px] text-muted uppercase">{eventWinners.third.college}</div>
                      </div>
                      <div className="font-mono text-xs text-ember tracking-[2px] pt-4 border-t border-ember/10 w-full">3RD PLACE</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center flex flex-col items-center gap-6 animate-pulse">
             <Trophy size={80} className="text-muted opacity-20" />
             <div className="font-display text-3xl text-muted tracking-widest uppercase">The podium awaits its champions</div>
             <p className="font-mono text-xs text-muted tracking-[2px] uppercase">Results will be announced post-fest</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
