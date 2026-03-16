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
  const headerRef = useScrollReveal();

  const { data: events = [] } = useQuery({
    queryKey: ['leaderboard-events'],
    queryFn: async () => {
      // Mock: In a real app we'd fetch events that have leaderboard data
      try {
        const res = await eventsService.getAll();
        return res.data.events.slice(0, 10);
      } catch (err) {
        return [];
      }
    },
    onSuccess: (data) => {
      if (data.length > 0 && !selectedEvent) setSelectedEvent(data[0]);
    }
  });

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['leaderboard', selectedEvent?._slug],
    queryFn: async () => {
      if (!selectedEvent) return [];
      const res = await leaderboardService.getByEvent(selectedEvent.slug);
      return res.data.entries;
    },
    enabled: !!selectedEvent
  });

  return (
    <PageTransition className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header ref={headerRef} className="mb-16 reveal-element">
          <h1 className="font-display text-5xl md:text-8xl text-primary mb-4 tracking-[4px]">
            <ScrambleText text="LEADERBOARD" />
          </h1>
          <p className="font-mono text-secondary tracking-[3px] text-xs md:text-sm uppercase">
            Rankings updated in real-time as scores are verified
          </p>
        </header>

        <EventSelector 
          events={events} 
          selectedId={selectedEvent?._id} 
          onSelect={setSelectedEvent} 
        />

        <div className="ignite-card p-1 border-fire/10 bg-elevated/40 backdrop-blur-xl">
          {isLoading ? (
            <div className="py-32 flex justify-center">
              <div className="w-10 h-10 border-2 border-fire border-t-transparent animate-spin" />
            </div>
          ) : entries.length > 0 ? (
            <LeaderboardTable entries={entries} />
          ) : (
            <div style={{
              minHeight: '60vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
            }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(48px, 6vw, 80px)',
                color: 'rgba(255,255,255,0.06)',
                letterSpacing: '0.1em',
              }}>LEADERBOARD</div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.3em',
                color: 'rgba(255,255,255,0.2)',
                textTransform: 'uppercase',
              }}>RANKINGS PUBLISHED DURING THE FEST</div>
              <div style={{
                width: '40px',
                height: '1px',
                background: '#FF5500',
                opacity: 0.4,
              }} />
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
