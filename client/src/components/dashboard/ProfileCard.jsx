import { User, Mail, GraduationCap, MapPin } from 'lucide-react';

export default function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="ignite-card p-8 border-cyan/20 bg-cyan/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan/10 blur-3xl pointer-events-none group-hover:bg-cyan/20 transition-all" />
      
      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        <div className="w-24 h-24 bg-void border-2 border-cyan/30 flex items-center justify-center text-cyan shadow-cyan/20 shadow-lg">
          <User size={48} />
        </div>

        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <div className="font-mono text-[9px] text-cyan tracking-[4px] uppercase mb-1">Participant Portal</div>
            <h2 className="font-display text-4xl text-primary tracking-widest uppercase">{user.name}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-xs text-secondary">
              <Mail size={14} className="text-cyan" /> {user.email}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-xs text-secondary">
              <GraduationCap size={14} className="text-cyan" /> {user.course} · {user.year}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 font-mono text-xs text-secondary md:col-span-2">
              <MapPin size={14} className="text-cyan" /> {user.college}
            </div>
          </div>
        </div>

        <div className="hidden lg:block border-l border-[var(--border-subtle)] pl-8 h-20">
          <div className="font-display text-4xl text-fire leading-none">IGNITE</div>
          <div className="font-mono text-[9px] text-muted tracking-[3px] uppercase mt-2">2026 EDITION</div>
        </div>
      </div>
    </div>
  );
}
