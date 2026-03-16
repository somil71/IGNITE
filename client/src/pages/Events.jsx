import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';
import ScrambleText from '../components/ui/ScrambleText';
import EventCard from '../components/ui/EventCard';
import { eventsService } from '@/services/events.service';
import eventsFallback from '@/data/events';
import useScrollReveal from '../hooks/useScrollReveal';

const CATEGORIES = ['ALL', 'TECHNICAL', 'CREATIVE & INNOVATION', 'FUN'];

export default function Events() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [search, setSearch] = useState('');
  const headerRef = useScrollReveal();
  const gridRef = useScrollReveal();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      try {
        const res = await eventsService.getAll();
        return res.data.events;
      } catch (err) {
        console.warn('API unavailable, using fallback data');
        return eventsFallback;
      }
    },
    initialData: eventsFallback,
  });

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchesTab = activeTab === 'ALL' || e.category.toUpperCase() === activeTab || (activeTab === 'CREATIVE & INNOVATION' && e.category === 'Creative & Innovation');
      const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [events, activeTab, search]);

  const stats = useMemo(() => {
    const tech = events.filter(e => e.category === 'Technical').length;
    const creative = events.filter(e => e.category === 'Creative & Innovation').length;
    const fun = events.filter(e => e.category === 'Fun').length;
    return { tech, creative, fun };
  }, [events]);

  return (
    <PageTransition className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header ref={headerRef} className="mb-16 reveal-element">
          <h1 className="font-display text-5xl md:text-8xl text-primary mb-4">
            <ScrambleText text="ALL EVENTS" />
          </h1>
          <p className="font-mono text-secondary tracking-[3px] text-xs md:text-sm uppercase mb-8">
            35 Competitions across 3 Categories
          </p>
          <div className="flex flex-wrap gap-4 font-mono text-[10px] tracking-[2px]">
            <span className="px-3 py-1 bg-fire/10 text-fire border border-fire/20 uppercase">{stats.tech} Technical</span>
            <span className="px-3 py-1 bg-cyan/10 text-cyan border border-cyan/20 uppercase">{stats.creative} Creative</span>
            <span className="px-3 py-1 bg-ember/10 text-ember border border-ember/20 uppercase">{stats.fun} Fun</span>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="sticky top-20 z-30 bg-void/80 backdrop-blur-md border-b border-[var(--border-subtle)] py-4 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 reveal-element">
          <div className="flex gap-4 md:gap-8 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`font-ui font-700 text-[11px] md:text-[13px] tracking-[2px] uppercase whitespace-nowrap transition-all relative ${
                  activeTab === cat ? 'text-fire' : 'text-muted hover:text-secondary'
                }`}
              >
                {cat}
                {activeTab === cat && (
                  <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-fire" />
                )}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="SEARCH EVENTS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-elevated border border-[var(--border-subtle)] focus:border-fire/50 outline-none pl-12 pr-4 py-2.5 font-mono text-xs tracking-[1px] text-primary transition-colors"
            />
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="ignite-card p-6 h-64 animate-pulse bg-card/50" />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div ref={gridRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border border-dashed border-[var(--border-subtle)]">
            <div className="font-display text-3xl text-muted">
              <ScrambleText text="NO EVENTS FOUND" />
            </div>
            <p className="font-mono text-[10px] text-muted tracking-[2px] mt-2 uppercase">Try adjusting your filters or search</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
