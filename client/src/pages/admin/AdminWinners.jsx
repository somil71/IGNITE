import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import ScrambleText from '../../components/ui/ScrambleText';
import IgniteButton from '../../components/ui/IgniteButton';
import toast from 'react-hot-toast';
import { Trophy, Award, Zap, X } from 'lucide-react';

export default function AdminWinners() {
  const queryClient = useQueryClient();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingPos, setEditingPos] = useState(null); // 1, 2, or 3
  const [formData, setFormData] = useState({ teamName: '', members: '', prize: '' });

  const { data: events = [] } = useQuery({
    queryKey: ['admin-events-winners'],
    queryFn: async () => {
      const res = await adminService.getAllEvents();
      return res.data.events;
    },
    onSuccess: (data) => {
      if (data.length > 0 && !selectedEvent) setSelectedEvent(data[0]);
    }
  });

  const { data: winnerData } = useQuery({
    queryKey: ['admin-winners', selectedEvent?.slug],
    queryFn: async () => {
      if (!selectedEvent) return null;
      const res = await adminService.getWinners(selectedEvent.slug);
      return res.data.winners[0]; // winners is an array, we take first match
    },
    enabled: !!selectedEvent
  });

  const upsertMutation = useMutation({
    mutationFn: (data) => adminService.upsertWinner(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-winners']);
      toast.success('Winners list updated');
      setEditingPos(null);
      setFormData({ teamName: '', members: '', prize: '' });
    }
  });

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      eventId: selectedEvent._id,
      [editingPos === 1 ? 'first' : editingPos === 2 ? 'second' : 'third']: {
        ...formData,
        members: formData.members.split(',').map(m => m.trim())
      }
    };
    upsertMutation.mutate(payload);
  };

  const positions = [
    { id: 1, label: '1ST PLACE', icon: <Trophy size={48} className="text-fire" />, color: 'border-fire' },
    { id: 2, label: '2ND PLACE', icon: <Award size={48} className="text-secondary" />, color: 'border-secondary' },
    { id: 3, label: '3RD PLACE', icon: <Award size={48} className="text-ember" />, color: 'border-ember' },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="pb-12 border-b border-fire/10">
        <h1 className="font-display text-4xl md:text-6xl text-primary tracking-[4px] mb-2 uppercase">
          <ScrambleText text="HALL OF FAME" />
        </h1>
        <p className="font-mono text-secondary text-[11px] tracking-[4px] uppercase flex items-center gap-2">
           <Zap size={14} className="text-fire" /> Official Announcement Panel // Permanent Record
        </p>
      </header>

      {/* Selector */}
      <div className="flex flex-wrap gap-4">
        {events.map((e) => (
          <button
            key={e._id}
            onClick={() => { setSelectedEvent(e); setEditingPos(null); }}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
        {positions.map((pos) => {
          const winnerKey = pos.id === 1 ? 'first' : pos.id === 2 ? 'second' : 'third';
          const winner = winnerData?.[winnerKey];

          return (
            <div key={pos.id} className={`ignite-card p-10 border-2 ${pos.color} bg-void/30 flex flex-col items-center text-center relative overflow-hidden group`}>
               <div className="absolute top-4 left-4 font-display text-4xl opacity-10">0{pos.id}</div>
               
               <div className="mb-8 p-6 bg-white/5 rounded-full transition-transform group-hover:scale-110">
                 {pos.icon}
               </div>

               <h3 className={`font-ui text-xs tracking-[4px] font-bold mb-8 ${pos.id === 1 ? 'text-fire' : pos.id === 2 ? 'text-secondary' : 'text-ember'}`}>
                 {pos.label}
               </h3>

               {winner ? (
                 <div className="space-y-4 w-full">
                    <div>
                       <div className="font-display text-2xl text-primary uppercase leading-tight">{winner.teamName}</div>
                       <div className="font-mono text-[9px] text-muted tracking-[1px] mt-1">{winner.members.join(', ')}</div>
                    </div>
                    <div className="pt-4 border-t border-white/5 font-mono text-xs text-secondary italic">
                       PRIZE: {winner.prize || 'CERTIFICATE + TROPHY'}
                    </div>
                    <button 
                      onClick={() => {
                        setEditingPos(pos.id);
                        setFormData({ teamName: winner.teamName, members: winner.members.join(', '), prize: winner.prize });
                      }}
                      className="text-[9px] text-muted hover:text-cyan transition-colors uppercase tracking-[2px] mt-4"
                    >
                      [ EDIT DETAILS ]
                    </button>
                 </div>
               ) : (
                 <button 
                   onClick={() => { setEditingPos(pos.id); setFormData({ teamName: '', members: '', prize: '' }); }}
                   className="mt-4 p-4 border border-dashed border-white/10 text-muted hover:text-primary hover:border-white/30 font-mono text-[10px] tracking-[2px] uppercase transition-all"
                 >
                   + ASSIGN WINNER
                 </button>
               )}
            </div>
          );
        })}
      </div>

      {editingPos && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
           <div className="absolute inset-0 bg-void/90 backdrop-blur-md" onClick={() => setEditingPos(null)} />
           <div className="ignite-card max-w-md w-full bg-[#0A0A15] border-fire/20 relative z-10 overflow-hidden animate-scale-in">
              <div className="p-8 border-b border-fire/10 flex justify-between items-center bg-fire/5">
                 <div className="font-display text-2xl text-primary">ASSIGN {positions[editingPos-1].label}</div>
                  <button onClick={() => setEditingPos(null)} className="text-muted hover:text-fire"><X size={24} /></button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6">
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
                 <div className="space-y-1">
                    <label className="text-[9px] text-muted tracking-[2px] uppercase">Prize Description</label>
                    <input 
                      required
                      value={formData.prize}
                      onChange={e => setFormData({...formData, prize: e.target.value})}
                      className="w-full bg-void border border-white/5 p-3 font-mono text-xs text-primary focus:border-fire/50 outline-none"
                    />
                 </div>
                 <IgniteButton type="submit" variant="primary" className="w-full" loading={upsertMutation.isPending}>
                   SAVE WINNER
                 </IgniteButton>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}

