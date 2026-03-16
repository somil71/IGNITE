import PageTransition from '../components/layout/PageTransition';
import ScrambleText from '../components/ui/ScrambleText';
import SupportChat from '../components/support/SupportChat';
import { useAuth } from '../hooks/useAuth';
import IgniteButton from '../components/ui/IgniteButton';
import { Headphones, Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Support() {
  const { isAuthenticated } = useAuth();
  const reveal = useScrollReveal();

  return (
    <PageTransition className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="font-display text-5xl md:text-8xl text-primary mb-4 tracking-[6px]">
            <ScrambleText text="SUPPORT TERMINAL" />
          </h1>
          <p className="font-mono text-secondary tracking-[4px] text-xs md:text-sm uppercase flex items-center gap-3">
             <span className="w-12 h-[1px] bg-fire" /> HELP CENTER & TICKETING
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Info Side */}
          <div ref={reveal} className="lg:col-span-2 space-y-12">
             <div className="space-y-6">
                <h3 className="font-display text-3xl text-primary tracking-widest uppercase">WE&apos;RE HERE TO HELP</h3>
                <p className="font-mono text-sm text-secondary leading-relaxed uppercase tracking-[1px]">
                  Experiencing technical glitches? Need clarity on event rules? Our operations team is ready to assist you.
                </p>
             </div>

             <div className="space-y-8">
                <div className="flex gap-6 items-start">
                   <div className="p-3 bg-fire/10 border border-fire/20 text-fire"><Mail size={20} /></div>
                   <div>
                      <div className="font-ui text-sm text-primary font-bold tracking-wider mb-1 uppercase">EMAIL SUPPORT</div>
                      <div className="font-mono text-[11px] text-secondary">ignite.techfest@iilm.edu</div>
                      <div className="font-mono text-[9px] text-muted mt-2 uppercase">24-hour response time</div>
                   </div>
                </div>

                <div className="flex gap-6 items-start">
                   <div className="p-3 bg-cyan/10 border border-cyan/20 text-cyan"><MessageSquare size={20} /></div>
                   <div>
                      <div className="font-ui text-sm text-primary font-bold tracking-wider mb-1 uppercase">WHATSAPP PORTAL</div>
                      <div className="font-mono text-[11px] text-secondary">+91 99999 99999</div>
                      <div className="font-mono text-[9px] text-muted mt-2 uppercase">Direct query line</div>
                   </div>
                </div>

                <div className="flex gap-6 items-start">
                   <div className="p-3 bg-muted/10 border border-muted/20 text-muted"><ShieldCheck size={20} /></div>
                   <div>
                      <div className="font-ui text-sm text-primary font-bold tracking-wider mb-1 uppercase">OFFICE SECTOR</div>
                      <div className="font-mono text-[11px] text-secondary">D-Block, 1st Floor, IILM University</div>
                      <div className="font-mono text-[9px] text-muted mt-2 uppercase">On-ground assistance</div>
                   </div>
                </div>
             </div>

             <div className="p-6 bg-surface border border-[var(--border-subtle)] border-l-4 border-l-fire italic">
                <p className="font-mono text-[10px] text-muted leading-relaxed uppercase tracking-[1px]">
                  &quot;IGNITE is not just a fest, it&apos;s a movement. We value every participant&apos;s experience and strive to ensure a seamless journey for all.&quot;
                </p>
             </div>
          </div>

          {/* Chat Side */}
          <div className="lg:col-span-3">
            {isAuthenticated ? (
               <SupportChat />
            ) : (
               <div className="h-[400px] flex flex-col items-center justify-center text-center p-12 ignite-card border-[var(--border-subtle)] bg-surface/20">
                  <Headphones size={64} className="text-muted opacity-20 mb-8" />
                  <h3 className="font-display text-4xl text-primary mb-4 tracking-widest uppercase">ENCRYPTED CHANNEL</h3>
                  <p className="font-mono text-xs text-secondary mb-10 tracking-[1.5px] max-w-xs mx-auto uppercase leading-relaxed">
                    Please log in to your participant portal to access the real-time support terminal.
                  </p>
                  <IgniteButton variant="primary" to="/sign-in">ACCESS TERMINAL</IgniteButton>
               </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
