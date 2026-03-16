import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import GlowCard from '../../components/ui/GlowCard';
import ScrambleText from '../../components/ui/ScrambleText';
import IgniteButton from '../../components/ui/IgniteButton';
import {
  Users, Calendar, ClipboardCheck, CreditCard,
  MessageSquare, ExternalLink, ArrowUpRight, Zap, Bell
} from 'lucide-react';

export default function AdminDashboard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await adminService.getStats();
      return res.data.stats;
    },
    refetchInterval: 30000 // Refresh every 30s
  });

  const cards = [
    { label: 'TOTAL PARTICIPANTS', value: data?.totalUsers || 0, icon: <Users />, color: 'cyan', delay: 0 },
    { label: 'REGISTRATIONS', value: data?.totalRegistrations || 0, icon: <ClipboardCheck />, color: 'fire', delay: 100 },
    { label: 'CONFIRMED SLOTS', value: data?.confirmedRegistrations || 0, icon: <Zap />, color: 'fire', delay: 200 },
    { label: 'PENDING PAYMENTS', value: data?.pendingPayments || 0, icon: <CreditCard />, color: 'ember', delay: 300 },
    { label: 'ACTIVE EVENTS', value: data?.activeEvents || 35, icon: <Calendar />, color: 'cyan', delay: 400 },
    { label: 'SUPPORT TICKETS', value: 0, icon: <MessageSquare />, color: 'ember', delay: 500 },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-fire/10">
        <div>
          <h1 className="font-display text-4xl md:text-6xl text-primary tracking-[4px] mb-2 uppercase">
            <ScrambleText text="SYSTEM COMMAND" />
          </h1>
          <p className="font-mono text-secondary text-[11px] tracking-[4px] uppercase">
            Ignite Techfest 2026 // Control Center
          </p>
        </div>
        <div className="text-right">
          <div className="font-display text-2xl text-fire tracking-[2px]">
            {time.toLocaleTimeString([], { hour12: false })}
          </div>
          <div className="font-mono text-[9px] text-muted tracking-[3px] uppercase mt-1">
            {time.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => (
          <GlowCard 
            key={card.label} 
            variant={card.color} 
            className="p-8 border-fire/5 bg-[#0A0A15]"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-white/5 text-fire">
                {card.icon}
              </div>
              <div className="font-mono text-[10px] text-muted tracking-[2px] uppercase">
                {card.color === 'fire' ? 'CRITICAL PATH' : 'SYSTEM STATUS'}
              </div>
            </div>
            <div className="font-display text-6xl text-primary mb-2 tabular-nums">
              {isLoading ? '...' : card.value}
            </div>
            <div className={`font-ui text-[12px] font-bold tracking-[3px] uppercase ${card.color === 'fire' ? 'text-fire' : card.color === 'cyan' ? 'text-cyan' : 'text-ember'}`}>
              {card.label}
            </div>
          </GlowCard>
        ))}
      </div>

      {/* Controls & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
        <section className="space-y-8">
          <h2 className="font-display text-2xl text-primary tracking-[3px] flex items-center gap-3 italic">
            <span className="w-8 h-[1px] bg-fire" /> PRIORITY COMMANDS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <IgniteButton variant="primary" to="/admin/payments" className="w-full text-center py-6">
              VERIFY PAYMENTS <ArrowUpRight size={16} className="ml-2" />
            </IgniteButton>
            <IgniteButton variant="ghost" to="/admin/registrations" className="w-full text-center py-6">
              ALL REGISTRATIONS <ExternalLink size={16} className="ml-2" />
            </IgniteButton>
            <IgniteButton variant="ghost" to="/admin/notifications" className="w-full text-center py-6">
              BROADCAST FCM <Bell size={16} className="ml-2" />
            </IgniteButton>
            <IgniteButton variant="ghost" to="/admin/support" className="w-full text-center py-6">
              SUPPORT TERMINAL <MessageSquare size={16} className="ml-2" />
            </IgniteButton>
          </div>
        </section>

        <section className="space-y-8">
           <h2 className="font-display text-2xl text-primary tracking-[3px] flex items-center gap-3 italic">
            <span className="w-8 h-[1px] bg-cyan" /> RECENT SECTOR ACTIVITY
          </h2>
          <div className="ignite-card p-6 border-fire/10 bg-elevated/40 min-h-[300px] flex flex-col justify-center items-center text-center opacity-40">
             <div className="font-display text-xl mb-2">TIMELINE SYNCING...</div>
             <div className="font-mono text-[9px] uppercase tracking-[3px]">Real-time logs will populate here</div>
          </div>
        </section>
      </div>
    </div>
  );
}
