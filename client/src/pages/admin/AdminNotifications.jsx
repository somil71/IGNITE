import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import ScrambleText from '../../components/ui/ScrambleText';
import IgniteButton from '../../components/ui/IgniteButton';
import toast from 'react-hot-toast';
import { Bell, Send, History, Info, ShieldAlert } from 'lucide-react';
import GlowCard from '../../components/ui/GlowCard';

export default function AdminNotifications() {
  const [formData, setFormData] = useState({ title: '', body: '', target: 'all', link: '' });
  const [selectedEventId, setSelectedEventId] = useState('');

  const { data: events = [] } = useQuery({
    queryKey: ['admin-events-notif'],
    queryFn: async () => {
      const res = await adminService.getAllEvents();
      return res.data.events;
    }
  });

  const broadcastMutation = useMutation({
    mutationFn: (data) => adminService.broadcast(data),
    onSuccess: () => {
      toast.success('FCM Broadcast deployed successfully');
      setFormData({ title: '', body: '', target: 'all', link: '' });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Broadcast failure');
    }
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body) return;

    if (window.confirm(`Deploy broadcast to ${formData.target === 'all' ? 'ALL participants' : 'event participants'}?`)) {
      broadcastMutation.mutate({
        ...formData,
        targetEvent: formData.target === 'event' ? selectedEventId : null
      });
    }
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="pb-12 border-b border-fire/10">
        <h1 className="font-display text-4xl md:text-6xl text-primary tracking-[4px] mb-2 uppercase">
          <ScrambleText text="SIGNAL BROADCAST" />
        </h1>
        <p className="font-mono text-secondary text-[11px] tracking-[4px] uppercase flex items-center gap-2">
           <Bell size={14} className="text-fire" /> FCM Decryptor // Global Push Notifications
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">
        {/* Composer */}
        <section className="space-y-8">
           <h2 className="font-display text-2xl text-primary tracking-[3px] flex items-center gap-3 italic">
             <span className="w-8 h-[1px] bg-fire" /> COMPOSE TRANSMISSION
           </h2>
           
           <GlowCard variant="fire" className="p-8 border-fire/10 bg-[#0A0A15]">
              <form onSubmit={handleSend} className="space-y-6">
                 <div className="space-y-2">
                    <label className="font-mono text-[9px] text-muted tracking-[3px] uppercase">Message Title*</label>
                    <input 
                      required
                      placeholder="e.g. RESULTS ARE LIVE!"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-void border border-white/10 p-4 font-mono text-sm text-primary focus:border-fire outline-none"
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="font-mono text-[9px] text-muted tracking-[3px] uppercase">Notification Body*</label>
                    <textarea 
                      required
                      rows="4"
                      placeholder="Enter the transmission details..."
                      value={formData.body}
                      onChange={e => setFormData({...formData, body: e.target.value})}
                      className="w-full bg-void border border-white/10 p-4 font-mono text-sm text-primary focus:border-fire outline-none resize-none"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="font-mono text-[9px] text-muted tracking-[3px] uppercase">Target Audience</label>
                       <select 
                         value={formData.target}
                         onChange={e => setFormData({...formData, target: e.target.value})}
                         className="w-full bg-void border border-white/10 p-4 font-mono text-xs text-primary outline-none"
                       >
                          <option value="all">ALL PARTICIPANTS</option>
                          <option value="event">EVENT SPECIFIC</option>
                       </select>
                    </div>
                    {formData.target === 'event' && (
                       <div className="space-y-2 animate-fade-in">
                          <label className="font-mono text-[9px] text-muted tracking-[3px] uppercase">Select Sector</label>
                          <select 
                            value={selectedEventId}
                            onChange={e => setSelectedEventId(e.target.value)}
                            className="w-full bg-void border border-fire/30 p-4 font-mono text-xs text-fire outline-none"
                          >
                             <option value="">CHOOSE EVENT</option>
                             {events.map(e => <option key={e._id} value={e._id}>{e.title.toUpperCase()}</option>)}
                          </select>
                       </div>
                    )}
                 </div>

                 <div className="space-y-2">
                    <label className="font-mono text-[9px] text-muted tracking-[3px] uppercase">Deeplink (Optional)</label>
                    <input 
                      placeholder="/winners, /leaderboard, etc."
                      value={formData.link}
                      onChange={e => setFormData({...formData, link: e.target.value})}
                      className="w-full bg-void border border-white/10 p-4 font-mono text-sm text-primary focus:border-cyan outline-none"
                    />
                 </div>

                 <div className="pt-4">
                    <IgniteButton variant="primary" type="submit" className="w-full py-5" loading={broadcastMutation.isPending}>
                       INITIATE GLOBAL DEPLOYMENT <Send size={18} className="ml-2" />
                    </IgniteButton>
                 </div>
              </form>
           </GlowCard>
        </section>

        {/* Preview & History */}
        <section className="space-y-12">
            <div className="space-y-8">
               <h2 className="font-display text-2xl text-primary tracking-[3px] flex items-center gap-3 italic">
                 <span className="w-8 h-[1px] bg-cyan" /> SIGNAL PREVIEW
               </h2>
               <div className="p-8 border border-white/10 bg-[#0F0F1A] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2"><Info size={16} className="text-muted opacity-20" /></div>
                  <div className="flex gap-4 items-start">
                     <div className="w-12 h-12 bg-fire/20 border border-fire/40 flex items-center justify-center text-fire">
                        <Bell size={24} />
                     </div>
                     <div className="space-y-1">
                        <div className="font-display text-xl text-primary">{formData.title || 'NOTIFICATION TITLE'}</div>
                        <div className="font-mono text-[10px] text-secondary leading-relaxed max-w-[300px]">
                           {formData.body || 'Your message transmission will appear here as it would on a participant\'s device.'}
                        </div>
                        <div className="font-mono text-[8px] text-muted pt-2">NOW • IGNITE 2026</div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-6 bg-fire/5 border border-fire/20 flex gap-4">
               <ShieldAlert size={24} className="text-fire shrink-0" />
               <p className="font-mono text-[9px] text-muted uppercase tracking-[1.5px] leading-relaxed">
                  Broadcasts are sent via Firebase Cloud Messaging. Ensure your message is accurate as this action triggers immediate push notifications across all active participant sessions and devices.
               </p>
            </div>

            <div className="space-y-8">
               <h2 className="font-display text-2xl text-primary tracking-[3px] flex items-center gap-3 italic">
                 <span className="w-8 h-[1px] bg-muted" /> RECENT DEPLOYMENTS
               </h2>
               <div className="ignite-card p-6 border-white/5 bg-surface/20 text-center py-12 opacity-30">
                  <History size={40} className="mx-auto mb-4 text-muted" />
                  <div className="font-mono text-[9px] uppercase tracking-[3px]">Transmission logs archived</div>
               </div>
            </div>
        </section>
      </div>
    </div>
  );
}
