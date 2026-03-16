import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Users, DollarSign, Calendar, User } from 'lucide-react';
import { useUser, useClerk } from '@clerk/react';
import PageTransition from '../components/layout/PageTransition';
import ScrambleText from '../components/ui/ScrambleText';
import CategoryBadge from '../components/ui/CategoryBadge';
import IgniteButton from '../components/ui/IgniteButton';
import { eventsService } from '@/services/events.service';
import eventsFallback from '@/data/events';
import useScrollReveal from '../hooks/useScrollReveal';
import EventCard from '../components/ui/EventCard';

export default function EventDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const aboutRef = useScrollReveal();
  const rulesRef = useScrollReveal();
  const coordRef = useScrollReveal();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', slug],
    queryFn: async () => {
      try {
        const res = await eventsService.getBySlug(slug);
        return res.data.event;
      } catch (err) {
        const found = eventsFallback.find(e => e.slug === slug);
        if (!found) throw err;
        return found;
      }
    },
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center pt-24">
      <div className="w-12 h-12 border-2 border-fire border-t-transparent animate-spin" />
    </div>
  );

  if (error || !event) return (
    <PageTransition className="flex flex-col items-center justify-center pt-32 text-center px-6">
      <h1 className="font-display text-6xl text-fire mb-4">404</h1>
      <p className="font-mono text-secondary mb-8">EVENT NOT FOUND IN THE GRID</p>
      <IgniteButton variant="ghost" to="/events">BACK TO ALL EVENTS</IgniteButton>
    </PageTransition>
  );

  const relatedEvents = eventsFallback
    .filter(e => e.category === event.category && e.slug !== event.slug)
    .slice(0, 3);
  const fallbackEvent = eventsFallback.find(e => e.slug === slug);
  const displayRules = Array.isArray(event.rules) && event.rules.length > 0
    ? event.rules
    : (fallbackEvent?.rules || []);

  return (
    <PageTransition className="pb-24">
      {/* 1. HERO */}
      <section className="relative min-h-[50vh] flex flex-col justify-end pt-32 pb-16 px-6 md:px-12 overflow-hidden border-b border-[var(--border-subtle)]">
        <div className={`absolute inset-0 z-0 opacity-10 bg-gradient-to-b ${
          event.category === 'Technical' ? 'from-cyan/50 to-void' : 
          event.category === 'Fun' ? 'from-fire/50 to-void' : 
          'from-ember/50 to-void'
        }`} />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <nav className="flex items-center gap-2 font-ui text-[10px] md:text-xs text-muted tracking-[2px] uppercase mb-8">
            <Link to="/" className="hover:text-primary transition-colors">HOME</Link>
            <span>/</span>
            <Link to="/events" className="hover:text-primary transition-colors">EVENTS</Link>
            <span>/</span>
            <span className="text-secondary">{event.category.toUpperCase()}</span>
          </nav>

          <h1 className="font-display text-5xl md:text-8xl lg:text-9xl text-primary leading-none mb-8">
            <ScrambleText text={event.title.toUpperCase()} />
          </h1>

          <div className="flex flex-wrap items-center gap-6">
            <CategoryBadge category={event.category} size="lg" />
            <div className="flex items-center gap-2 font-mono text-xs text-secondary uppercase tracking-[1px]">
              <Users size={14} className="text-fire" />
              {event.teamSize.label}
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-secondary uppercase tracking-[1px]">
              <DollarSign size={14} className="text-fire" />
              FEE: {event.registrationFee === 0 ? 'FREE' : `₹${event.registrationFee} ${event.feeType === 'per_team' ? '/ Team' : '/ Person'}`}
            </div>
            
            {event.maxParticipants && event.registrationCount >= event.maxParticipants ? (
              <IgniteButton variant="ghost" className="ml-0 md:ml-4 border-fire/20 text-fire hover:bg-fire/5 cursor-not-allowed">
                REGISTRATIONS CLOSED (FULL)
              </IgniteButton>
            ) : event.registrationDeadline && new Date() > new Date(event.registrationDeadline) ? (
              <IgniteButton variant="ghost" className="ml-0 md:ml-4 border-fire/20 text-fire hover:bg-fire/5 cursor-not-allowed">
                REGISTRATION DEADLINE PASSED
              </IgniteButton>
            ) : (
              <button
                onClick={() => {
                  if (!isSignedIn) {
                    openSignIn({ redirectUrl: `/register?event=${event.slug}` });
                    return;
                  }
                  navigate(`/register?event=${event.slug}`);
                }}
                className="ml-0 md:ml-4 inline-flex items-center justify-center gap-2 px-8 py-3 bg-fire text-void font-display text-lg tracking-[4px] uppercase hover:bg-ember transition-colors cursor-pointer"
              >
                {isSignedIn ? 'REGISTER FOR THIS EVENT' : 'SIGN IN TO REGISTER'}
              </button>
            )}
          </div>
          
          {event.registrationDeadline && new Date() <= new Date(event.registrationDeadline) && (
            <div className="mt-8 font-mono text-[10px] text-ember tracking-[2px] uppercase">
              Deadline: {new Date(event.registrationDeadline).toLocaleString()}
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <section ref={aboutRef} className="mb-20 reveal-element">
              <h2 className="font-display text-3xl text-primary tracking-widest mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-fire" /> ABOUT THE EVENT
              </h2>
              <p className="font-mono text-secondary leading-relaxed text-sm md:text-base whitespace-pre-wrap">
                {event.description}
              </p>
            </section>

            <section className="mb-20">
              <h2 className="font-display text-3xl text-primary tracking-widest mb-10 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-fire" /> RULES & GUIDELINES
              </h2>
              <div className="space-y-6">
                {displayRules.length > 0 ? displayRules.map((rule, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="font-display text-4xl text-muted group-hover:text-fire transition-colors pt-1">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="font-mono text-secondary text-sm md:text-base leading-relaxed pt-2">
                      {rule}
                    </div>
                  </div>
                )) : (
                  <p className="font-mono text-muted uppercase tracking-widest">General techfest guidelines apply. Detail-specific rules will be shared on the official WhatsApp group.</p>
                )}
              </div>
            </section>

            <section className="mb-20 reveal-element">
              <h2 className="font-display text-3xl text-primary tracking-widest mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-fire" /> PRIZES & RECOGNITION
              </h2>
              <div className="p-6 bg-fire/5 border border-fire/20 rounded-sm">
                <p className="font-mono text-primary text-sm tracking-wide uppercase">
                  {event.prize?.description || 'Certificates + Recognition for all winners'}
                </p>
              </div>
            </section>

            <section className="mb-20 reveal-element">
              <h2 className="font-display text-3xl text-primary tracking-widest mb-6 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-fire" /> ELIGIBILITY
              </h2>
              <p className="font-mono text-secondary text-sm leading-relaxed uppercase tracking-[1px]">
                {event.eligibility || 'Open to all university students'}
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            <div className="ignite-card p-8 border-fire/20 bg-fire/5">
              <h3 className="font-display text-2xl text-fire mb-6 flex items-center gap-2">
                <Calendar size={20} /> SCHEDULE
              </h3>
              <div className="font-mono text-xs text-secondary tracking-[1px]">
                <div className="flex justify-between border-b border-fire/10 py-3">
                  <span>DATE</span>
                  <span className="text-primary">APRIL 15, 2026</span>
                </div>
                <div className="flex justify-between border-b border-fire/10 py-3">
                  <span>TIME</span>
                  <span className="text-primary">09:00 AM onwards</span>
                </div>
                <div className="flex justify-between py-3">
                  <span>VENUE</span>
                  <span className="text-primary">IILM Greater Noida</span>
                </div>
              </div>
            </div>

            <div ref={coordRef} className="reveal-stagger">
              <h3 className="font-display text-2xl text-primary mb-6 flex items-center gap-2">
                <User size={20} className="text-cyan" /> COORDINATORS
              </h3>
              
              <div className="space-y-6">
                {event.facultyCoordinators.length > 0 && (
                  <div>
                    <div className="font-mono text-[9px] text-muted tracking-[3px] uppercase mb-4">FACULTY</div>
                    <div className="space-y-3">
                      {event.facultyCoordinators.map((c, i) => (
                        <div key={i} className="bg-elevated p-3 border border-[var(--border-subtle)]">
                          <div className="font-ui text-sm text-primary font-600">{c.name}</div>
                          {c.contact && c.contact !== 'TBA' ? (
                            <a href={`tel:${c.contact}`} className="font-mono text-[10px] text-cyan hover:text-fire transition-colors mt-1 block">
                              {c.contact}
                            </a>
                          ) : c.contact === 'TBA' ? (
                            <div className="font-mono text-[10px] text-muted mt-1">CONTACT TBA</div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {event.studentCoordinators.length > 0 && (
                  <div>
                    <div className="font-mono text-[9px] text-muted tracking-[3px] uppercase mb-4">STUDENTS</div>
                    <div className="space-y-3">
                      {event.studentCoordinators.map((c, i) => (
                        <div key={i} className="bg-elevated p-3 border border-[var(--border-subtle)]">
                          <div className="font-ui text-sm text-primary font-600">{c.name}</div>
                          {c.contact && c.contact !== 'TBA' ? (
                            <a href={`tel:${c.contact}`} className="font-mono text-[10px] text-cyan hover:text-fire transition-colors mt-1 block">
                              {c.contact}
                            </a>
                          ) : c.contact === 'TBA' ? (
                            <div className="font-mono text-[10px] text-muted mt-1">CONTACT TBA</div>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {event.facultyCoordinators.length === 0 && event.studentCoordinators.length === 0 && (
                  <div className="font-mono text-xs text-muted italic">TO BE ANNOUNCED</div>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <section className="mt-32 pt-20 border-t border-[var(--border-subtle)]">
            <h2 className="font-display text-3xl text-primary tracking-widest mb-12 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-fire" /> MORE {event.category.toUpperCase()} EVENTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedEvents.map(e => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
}
