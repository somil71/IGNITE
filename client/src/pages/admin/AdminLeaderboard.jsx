import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import ScrambleText from '../../components/ui/ScrambleText';
import IgniteButton from '../../components/ui/IgniteButton';
import toast from 'react-hot-toast';
import { Plus, Trash2, BarChart3 } from 'lucide-react';
import GlowCard from '../../components/ui/GlowCard';

export default function AdminLeaderboard() {
  const queryClient = useQueryClient();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({ teamName: '', members: '', score: '', college: '' });

  const { data: events = [] } = useQuery({
    queryKey: ['admin-events-list'],
    queryFn: async () => {
      const res = await adminService.getAllEvents();
      return res.data.events;
    },
    onSuccess: (data) => {
      if (data.length > 0 && !selectedEvent) setSelectedEvent(data[0]);
    }
  });

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ['admin-leaderboard', selectedEvent?.slug],
    queryFn: async () => {
      if (!selectedEvent) return [];
      const res = await adminService.getLeaderboard(selectedEvent.slug);
      return res.data.entries;
    },
    enabled: !!selectedEvent
  });

  const upsertMutation = useMutation({
    mutationFn: (data) => adminService.upsertLeaderboard(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-leaderboard']);
      toast.success('Leaderboard updated');
      setFormData({ teamName: '', members: '', score: '', college: '' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => adminService.deleteLeaderboard(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-leaderboard']);
      toast.success('Entry removed');
    }
  });

  const handleAdd = (e) => {
    e.preventDefault();
    upsertMutation.mutate({
      ...formData,
      eventId: selectedEvent._id,
      members: formData.members.split(',').map(m => m.trim())
    });
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="pb-12 border-b border-fire/10">
        <h1 className="font-display text-4xl md:text-6xl text-primary tracking-[4px] mb-2 uppercase">
          <ScrambleText text="LEADERBOARD OPS" />
        </h1>
        <p className="font-mono text-secondary text-[11px] tracking-[4px] uppercase flex items-center gap-2">
           <BarChart3 size={14} className="text-fire" /> Live Ranking Distribution // Real-time Sync
        </p>
      </header>

      {/* Selector */}
      <div className="flex flex-wrap gap-4">
        {events.map((e) => (
          <button
            key={e._id}
            onClick={() => setSelectedEvent(e)}
            className={`px-6 py-2 border font-ui text-[10px] tracking-[2px] uppercase transition-all ${
              selectedEvent?._id === e._id 
                ? 'border-fire bg-fire/10 text-fire shadow-fire' 
                : 'border-white/5 text-muted hover:border-secondary hover:text-primary'
            }`}
          >
            {e.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
        {/* Table */}
        <div className="xl:col-span-2 space-y-6">
          <div className="ignite-card overflow-hidden border-fire/10 bg-[#0A0A10]/50">
            <table className="admin-table">
              <thead>
                <tr>
                  <th className="w-16">RANK</th>
                  <th>TEAM</th>
                  <th>COLLEGE</th>
                  <th>SCORE</th>
                  <th className="text-right">OPS</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan="5" className="text-center py-20 animate-pulse font-mono text-[10px]">RECALCULATING RANKS...</td></tr>
                ) : entries.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-20 text-muted font-mono text-[10px]">NO DATA POOLED FOR THIS COMPETITION</td></tr>
                ) : (
                  entries.map((entry, i) => (
                    <tr key={entry._id}>
                      <td className="font-display text-xl text-fire">#{i + 1}</td>
                      <td>
                         <div className="text-primary font-bold">{entry.teamName.toUpperCase()}</div>
                         <div className="text-[9px] text-muted">{entry.members.join(', ')}</div>
                      </td>
                      <td className="text-secondary text-xs">{entry.college}</td>
                      <td className="font-bold text-primary">{entry.score}</td>
                      <td className="text-right">
                         <button 
                           onClick={() => deleteMutation.mutate(entry._id)}
                           className="p-2 text-muted hover:text-fire hover:bg-fire/5 transition-all"
                         >
                           <Trash2 size={14} />
                         </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form */}
        <div>
          <GlowCard variant="fire" className="p-8 border-fire/10 bg-void/50 sticky top-12">
             <h3 className="font-display text-2xl text-fire mb-8 flex items-center gap-3">
                <Plus size={20} /> ADD ENTRY
             </h3>
             <form onSubmit={handleAdd} className="space-y-6">
                <div className="space-y-1">
                   <label className="text-[9px] text-muted tracking-[2px] uppercase">Team Name</label>
                   <input 
                     required
                     value={formData.teamName}
                     onChange={e => setFormData({...formData, teamName: e.target.value})}
                     className="w-full bg-void border border-white/5 p-3 font-mono text-xs text-primary focus:border-fire/50 outline-none"
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[9px] text-muted tracking-[2px] uppercase">Members (Comma Sep)</label>
                   <input 
                     required
                     value={formData.members}
                     onChange={e => setFormData({...formData, members: e.target.value})}
                     className="w-full bg-void border border-white/5 p-3 font-mono text-xs text-primary focus:border-fire/50 outline-none"
                   />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <label className="text-[9px] text-muted tracking-[2px] uppercase">College</label>
                      <input 
                        required
                        value={formData.college}
                        onChange={e => setFormData({...formData, college: e.target.value})}
                        className="w-full bg-void border border-white/5 p-3 font-mono text-xs text-primary focus:border-fire/50 outline-none"
                      />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[9px] text-muted tracking-[2px] uppercase">Score</label>
                      <input 
                        type="number"
                        required
                        value={formData.score}
                        onChange={e => setFormData({...formData, score: e.target.value})}
                        className="w-full bg-void border border-white/5 p-3 font-mono text-xs text-primary focus:border-fire/50 outline-none"
                      />
                   </div>
                </div>
                <IgniteButton type="submit" variant="primary" className="w-full" loading={upsertMutation.isPending}>
                   COMMIT TO LOG
                </IgniteButton>
             </form>
          </GlowCard>
        </div>
      </div>
    </div>
  );
}
