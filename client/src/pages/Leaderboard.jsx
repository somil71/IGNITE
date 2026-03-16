import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageTransition from '../components/layout/PageTransition';
import EventSelector from '../components/leaderboard/EventSelector';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import api from '@/services/api';

export default function Leaderboard() {
  const [selectedSlug, setSelectedSlug] = useState(null);

  const { data: events = [], isLoading: eventsLoading } = useQuery({
    queryKey: ['leaderboard-events'],
    queryFn: async () => {
      const res = await api.get('/leaderboard');
      return res.data.leaderboard.map(item => ({
        ...item.event,
        entryCount: item.entries.length
      }));
    }
  });

  useEffect(() => {
    if (events.length > 0 && !selectedSlug) {
      setSelectedSlug(events[0].slug);
    }
  }, [events, selectedSlug]);

  return (
    <PageTransition className="min-h-screen bg-void pt-[120px] pb-24 relative overflow-hidden">
      {/* SCANNING LINE EFFECT */}
      <div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.03]" 
        style={{ 
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
          backgroundSize: '100% 2px, 3px 100%'
        }} 
      />
      
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col h-full relative z-10">
        {/* TERMINAL HEADER */}
        <header className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[1px] bg-fire" />
              <span className="font-mono text-[10px] text-fire uppercase tracking-[40%]">MISSION STATUS: LIVE</span>
            </div>
            <h1 className="font-display text-7xl md:text-[140px] text-white leading-none uppercase tracking-tighter">
              RANKINGS
            </h1>
          </div>
          
          <div className="text-right hidden md:block">
            <div className="font-mono text-[10px] text-secondary uppercase mb-1">DATA SOURCE // IGNITE_INTEL_2026</div>
            <div className="font-mono text-[11px] text-fire uppercase font-bold">IILM UNIVERSITY // GREATER NOIDA</div>
          </div>
        </header>

        {/* TWO PANEL TERMINAL */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-[1px] bg-white/5 border border-white/10">
          
          {/* LEFT SIDEBAR: EVENT ACCESS */}
          <div className="lg:col-span-3 bg-surface overflow-hidden flex flex-col min-h-[500px]">
            <div className="p-5 border-b border-white/5 bg-black/20">
              <span className="font-mono text-[10px] text-fire uppercase tracking-widest">DRIVE_ACCESS / EVENTS</span>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <EventSelector 
                events={events}
                selectedSlug={selectedSlug}
                onSelect={setSelectedSlug}
                isLoading={eventsLoading}
              />
            </div>
          </div>

          {/* RIGHT VIEWPORT: DATA STREAM */}
          <div className="lg:col-span-9 bg-surface/50 overflow-hidden flex flex-col min-h-[600px]">
             <div className="p-5 border-b border-white/5 bg-black/20 flex items-center justify-between">
               <span className="font-mono text-[10px] text-fire uppercase tracking-widest">VIEWPORT / ACTIVE_STREAM</span>
               <div className="flex gap-4">
                 <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-fire animate-pulse" />
                   <span className="font-mono text-[9px] text-secondary">REAL-TIME</span>
                 </div>
               </div>
             </div>
             <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
               <LeaderboardTable 
                 selectedSlug={selectedSlug}
                 isLoading={eventsLoading}
               />
             </div>
          </div>

        </div>

        {/* TERMINAL FOOTER */}
        <footer className="mt-8 flex items-center justify-between border-t border-white/5 pt-6 opacity-40">
           <div className="font-mono text-[8px] tracking-[0.3em] uppercase">SECURE ENCRYPTION ENABLED</div>
           <div className="font-mono text-[8px] tracking-[0.3em] uppercase">SYSTEM VERSION 2.0.26</div>
        </footer>
      </div>
    </PageTransition>
  );
}
