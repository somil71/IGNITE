import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard.service';
import PageTransition from '../components/layout/PageTransition';
import ProfileCard from '../components/dashboard/ProfileCard';
import EventsRegistered from '../components/dashboard/EventsRegistered';
import IgniteButton from '../components/ui/IgniteButton';
import { HelpCircle, Bell, Loader2, LayoutDashboard, CheckCircle2 } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import { formatDistanceToNow } from 'date-fns';

/**
 * PHASE 3C: Dashboard — Performance Overhaul
 * Implements skeleton loaders and O(1) data resolution.
 */
export default function Dashboard() {
  const sec1 = useScrollReveal();
  const sec2 = useScrollReveal();

  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await dashboardService.getDashboard();
      return res.data;
    },
    // Industry Standard: Frequent refetching for payment/registration status
    staleTime: 0,
    gcTime: 1000 * 60 * 5, // 5 mins
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 1000 * 30, // Every 30s
  });

  if (isLoading) return <DashboardSkeleton />;

  return (
    <PageTransition className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
          <StatBox icon={<LayoutDashboard size={14} />} label="Total Events" value={dashboard?.stats?.total || 0} color="text-primary" />
          <StatBox icon={<CheckCircle2 size={14} />} label="Confirmed" value={dashboard?.stats?.confirmed || 0} color="text-green" />
          <StatBox icon={<Loader2 size={14} />} label="Pending" value={dashboard?.stats?.pending || 0} color="text-fire" />
          <div className="hidden md:flex flex-col justify-center px-6 border-l border-white/5">
             <div className="font-mono text-[8px] text-muted tracking-[3px] uppercase">Nexus Protocol</div>
             <div className="font-display text-lg text-secondary tracking-widest">ACTIVE // SECURE</div>
          </div>
        </div>

        {/* Profile Section */}
        <div ref={sec1} className="reveal-left">
          <ProfileCard user={dashboard?.user} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content: Registrations */}
          <div ref={sec2} className="lg:col-span-2 space-y-8 reveal-stagger">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-3xl text-primary tracking-[4px] flex items-center gap-3">
                <span className="w-8 h-[1px] bg-fire" /> REGISTERED EVENTS
              </h3>
              <IgniteButton variant="ghost" to="/events" className="py-2 text-[10px]">
                + REGISTER NEW
              </IgniteButton>
            </div>
            <EventsRegistered registrations={dashboard?.registrations} />
          </div>

          {/* Sidebar: Notifications & Help */}
          <div className="space-y-10 animate-fade-in-up">
             {/* Unified Activity Feed */}
             <div className="ignite-card p-6 border-fire/20 bg-fire/[0.02]">
                <h3 className="font-display text-2xl text-fire mb-6 flex items-center gap-2">
                  <Bell size={18} /> ACTIVITY FEED
                </h3>
                <div className="space-y-4">
                    {dashboard?.notifications?.length > 0 ? (
                      dashboard.notifications.map((n) => (
                        <NotificationItem key={n.id} notification={n} />
                      ))
                    ) : (
                      <div className="p-4 bg-void/50 border border-white/5 text-center">
                         <p className="font-mono text-[10px] text-muted uppercase tracking-[1px]">No recent data packets found.</p>
                      </div>
                    )}
                   <div className="text-center font-mono text-[8px] text-muted uppercase tracking-[2px] pt-4 border-t border-white/5">
                      Operational Log End
                   </div>
                </div>
             </div>

             <div className="ignite-card p-8 border-cyan/20 bg-cyan/[0.02]">
                <h3 className="font-display text-2xl text-cyan mb-4 flex items-center gap-2">
                  <HelpCircle size={18} /> SUPPORT
                </h3>
                <p className="font-mono text-[11px] text-secondary mb-6 leading-relaxed">
                   Encountered a system error or payment window issue? Our logistics team is monitoring the uplink.
                </p>
                <IgniteButton variant="ghost" onClick={() => window.open('mailto:ignite.techfest@iilm.edu')} className="w-full border-cyan/30 text-cyan hover:bg-cyan/5">
                  EMAIL LOGISTICS TEAM →
                </IgniteButton>
             </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

function StatBox({ icon, label, value, color }) {
  return (
    <div className="ignite-card p-5 bg-white/[0.01] border-white/5 flex flex-col gap-2">
      <div className="flex items-center gap-2 font-mono text-[8px] text-muted tracking-[2px] uppercase">
        {icon} {label}
      </div>
      <div className={`font-display text-3xl ${color}`}>{value.toString().padStart(2, '0')}</div>
    </div>
  );
}

function NotificationItem({ notification: n }) {
  const getColors = () => {
    if (n.type === 'CONFIRMED') return 'text-green border-green/20 bg-green/5';
    if (n.type === 'REJECTED' || n.type === 'ERROR') return 'text-red-500 border-red-500/20 bg-red-500/5';
    if (n.type === 'WARNING') return 'text-ember border-ember/20 bg-ember/5';
    return 'text-fire border-fire/10 bg-void/50';
  };

  return (
    <div className={`p-4 border font-mono text-[10px] leading-relaxed relative overflow-hidden transition-all group hover:border-white/20 ${getColors()}`}>
      <div className="flex justify-between items-start mb-2">
        <span className="uppercase tracking-widest font-bold">{n.type}</span>
        <span className="text-muted text-[8px] tracking-[1px]">
          {formatDistanceToNow(new Date(n.timestamp), { addSuffix: true }).toUpperCase()}
        </span>
      </div>
      <div className="text-secondary">{n.message}</div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12 skeleton-pulse">
      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-24 bg-white/5 border border-white/5" />
        ))}
      </div>

      {/* Profile Card */}
      <div className="h-40 bg-white/5 border border-white/5" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
           <div className="h-10 w-48 bg-white/5" />
           {[1, 2, 3].map(i => (
             <div key={i} className="h-32 bg-white/5 border border-white/5" />
           ))}
        </div>
        <div className="space-y-10">
           <div className="h-80 bg-white/5 border border-white/5" />
           <div className="h-40 bg-white/5 border border-white/5" />
        </div>
      </div>
    </div>
  );
}
