import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageTransition from '../components/layout/PageTransition';
import ScrambleText from '../components/ui/ScrambleText';
import EventSelector from '../components/leaderboard/EventSelector';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import { eventsService } from '@/services/events.service';
import { leaderboardService } from '@/services/leaderboard.service';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Leaderboard() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isGlobal, setIsGlobal] = useState(false);
  const headerRef = useScrollReveal();

  const { data: events = [] } = useQuery({
    queryKey: ['leaderboard-events'],
    queryFn: async () => {
      try {
        const res = await eventsService.getAll();
        return res.data.events;
      } catch (err) {
        return [];
      }
    }
  });

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['leaderboard', selectedEvent?.slug, isGlobal],
    queryFn: async () => {
      if (isGlobal) {
        const res = await leaderboardService.getAll();
        return res.data.leaderboard
          .flatMap(r => r.entries.map(e => ({ ...e, eventName: r.event.title })))
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
      }
      if (!selectedEvent) return [];
      const res = await leaderboardService.getByEvent(selectedEvent.slug);
      return res.data.entries;
    },
    enabled: !!selectedEvent || isGlobal
  });

  return (
    <PageTransition className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header ref={headerRef} className="mb-16 reveal-element flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="font-display text-5xl md:text-8xl text-primary mb-4 tracking-[4px]">
              <ScrambleText text="LEADERBOARD" />
            </h1>
            <p className="font-mono text-secondary tracking-[3px] text-xs md:text-sm uppercase">
              {isGlobal ? 'GLOBAL LEGENDS — OVERALL RANKINGS' : 'RANKINGS UPDATED IN REAL-TIME'}
            </p>
          </div>
          
          <div className="flex bg-void border border-white/5 p-1 rounded-sm overflow-hidden">
            <button 
              onClick={() => setIsGlobal(false)}
              className={`px-6 py-2 font-ui text-[10px] tracking-[2px] transition-all uppercase ${!isGlobal ? 'bg-fire text-void' : 'text-muted hover:text-secondary'}`}
            >
              Event Wise
            </button>
            <button 
              onClick={() => setIsGlobal(true)}
              className={`px-6 py-2 font-ui text-[10px] tracking-[2px] transition-all uppercase ${isGlobal ? 'bg-fire text-void' : 'text-muted hover:text-secondary'}`}
            >
              Global
            </button>
          </div>
        </header>

        {!isGlobal && (
          <EventSelector 
            events={events} 
            selectedId={selectedEvent?._id} 
            onSelect={setSelectedEvent} 
          />
        )}

        <div className="relative group">
          <div className="absolute -inset-4 bg-fire/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative ignite-card p-1 border-fire/10 bg-elevated/40 backdrop-blur-xl overflow-hidden min-h-[50vh]">
            {isLoading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-2 border-fire border-t-transparent animate-spin rounded-full" />
                <div className="font-mono text-[9px] text-fire animate-pulse tracking-[4px] uppercase">Syncing Neural Link...</div>
              </div>
            ) : entries.length > 0 ? (
              <LeaderboardTable entries={entries} showEvent={isGlobal} />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-12 text-center">
                <div className="font-display text-6xl md:text-9xl text-white/[0.02] select-none tracking-[20px] uppercase">STANDBY</div>
                <div className="font-mono text-[10px] text-muted tracking-[4px] uppercase max-w-sm">
                  Rankings are populated as sectors conclude. Expected first uplink within 24 hours.
                </div>
                <div className="w-24 h-[1px] bg-fire opacity-20" />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
