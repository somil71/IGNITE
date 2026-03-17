import { useQuery } from '@tanstack/react-query';
import { eventsService } from '@/services/events.service';
import EventCard from '../ui/EventCard';
import ScrambleText from '../ui/ScrambleText';
import IgniteButton from '../ui/IgniteButton';
import eventsFallback from '@/data/events';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function EventsPreview() {
  const revealRef = useScrollReveal();

  const { data: events, isLoading } = useQuery({
    queryKey: ['events-preview'],
    queryFn: async () => {
      try {
        const res = await eventsService.getAll();
        return res.data.events.slice(0, 6);
      } catch (err) {
        return eventsFallback.slice(0, 6);
      }
    },
  });

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="font-display text-4xl md:text-6xl text-primary mb-2">
            <ScrambleText text="FEATURED EVENTS" trigger="scroll" />
          </h2>
          <div className="w-24 h-1 bg-fire" />
        </div>
        <IgniteButton variant="ghost" to="/events" className="hidden md:flex">
          VIEW ALL 30+ EVENTS →
        </IgniteButton>
      </div>

      <div ref={revealRef} className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="ignite-card p-6 h-64 animate-pulse bg-card/50" />
          ))
        ) : (
          events?.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))
        )}
      </div>

      <div className="mt-12 flex justify-center md:hidden">
        <IgniteButton variant="ghost" to="/events">
          VIEW ALL 30+ EVENTS →
        </IgniteButton>
      </div>
    </section>
  );
}
