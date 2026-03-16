import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import ScrambleText from '../../components/ui/ScrambleText';
import IgniteButton from '../../components/ui/IgniteButton';
import toast from 'react-hot-toast';
import { Search, Eye, X, Download } from 'lucide-react';

export default function AdminRegistrations() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedReg, setSelectedReg] = useState(null);

  const { data: registrations = [], isLoading } = useQuery({
    queryKey: ['admin-registrations'],
    queryFn: async () => {
      const res = await adminService.getRegistrations();
      return res.data.registrations;
    }
  });
  
  const { data: events = [] } = useQuery({
    queryKey: ['admin-events-list'],
    queryFn: async () => {
      const res = await adminService.getAllEvents();
      return res.data.events;
    }
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => adminService.updateRegistrationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-registrations']);
      toast.success('Registration status updated');
      setSelectedReg(null);
    }
  });

  const filtered = (registrations || []).filter(r => {
    try {
      const matchesStatus = statusFilter === 'ALL' || r?.status?.toUpperCase() === statusFilter.toUpperCase();
      const matchesSearch = (r?.participantDetails?.name?.toLowerCase() || '').includes(search.toLowerCase()) || 
                            (r?.registrationId?.toLowerCase() || '').includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    } catch (err) {
      console.error('Registration Filter Error:', err, r);
      return false;
    }
  });

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r?.status === 'pending').length,
    confirmed: registrations.filter(r => r?.status === 'confirmed').length,
  };

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-fire/10">
        <div>
          <h1 className="font-display text-4xl md:text-6xl text-primary tracking-[4px] mb-2 uppercase">
            <ScrambleText text="REGISTRATION LOG" />
          </h1>
          <p className="font-mono text-secondary text-[11px] tracking-[4px] uppercase">
             Monitor // Verify // Manage Participant Entry
          </p>
        </div>
        <div className="flex gap-4">
           {Object.entries(stats).map(([k, v]) => (
             <div key={k} className="px-6 py-3 bg-white/5 border border-white/5 text-center">
                <div className="font-display text-2xl text-fire">{v}</div>
                <div className="font-mono text-[8px] text-muted uppercase tracking-[2px]">{k}</div>
             </div>
           ))}
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="flex bg-[#0A0A15] border border-white/5 p-1 rounded-sm w-full md:w-auto overflow-x-auto no-scrollbar">
          {['ALL', 'PENDING', 'CONFIRMED', 'REJECTED'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 md:px-6 py-2.5 font-ui text-[10px] tracking-[2px] uppercase transition-all whitespace-nowrap ${
                statusFilter === s ? 'bg-cyan text-white' : 'text-muted hover:text-primary'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <select
              className="w-full bg-[#0A0A15] border border-white/5 outline-none px-4 py-3 font-mono text-[10px] text-primary focus:border-fire/50 appearance-none uppercase tracking-[1px]"
              onChange={(e) => {
                if(e.target.value) {
                  window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/admin/registrations/export?eventId=${e.target.value}`, '_blank');
                  e.target.value = ''; // reset 
                }
              }}
            >
              <option value="">EXPORT EVENT CSV...</option>
              {events.map(ev => (
                <option key={ev._id} value={ev._id}>{ev.title}</option>
              ))}
            </select>
            <Download size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          </div>

          <div className="relative flex-1 md:w-80">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="SEARCH NAME / ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0A0A15] border border-white/5 focus:border-fire/50 outline-none pl-12 pr-4 py-3 font-mono text-xs text-primary"
            />
          </div>
        </div>
      </div>

      <div className="ignite-card overflow-x-auto border-fire/5 bg-[#0A0A10]/50 no-scrollbar">
        <table className="admin-table">
          <thead>
            <tr>
              <th>REG ID</th>
              <th>PARTICIPANT</th>
              <th>EVENT</th>
              <th>COLLEGE</th>
              <th>FEE</th>
              <th>STATUS</th>
              <th className="text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="6" className="text-center py-20 animate-pulse font-mono text-xs">SYNCHRONIZING SECTORS...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-20 text-muted font-mono text-xs uppercase tracking-[2px]">Log database empty for current query</td></tr>
            ) : (
              filtered.map(reg => (
                <tr key={reg._id}>
                  <td className="font-bold text-fire">{reg.registrationId || 'N/A'}</td>
                  <td>
                    <div className="text-primary font-bold">{reg.participantDetails?.name?.toUpperCase() || 'UNKNOWN'}</div>
                    <div className="text-[10px] text-muted">{reg.participantDetails?.phone || 'NO PHONE'}</div>
                  </td>
                  <td>{reg.eventId?.title || 'DELETED EVENT'}</td>
                  <td className="text-secondary italic">{reg.participantDetails?.college || 'N/A'}</td>
                  <td>
                    {(() => {
                      if (!reg.eventId?.registrationFee) return <span className="text-green text-xs font-bold font-mono">FREE</span>;
                      const fee = reg.eventId.registrationFee;
                      const type = reg.eventId.feeType;
                      const total = type === 'per_team' ? fee : fee * ((reg.teamMembers?.length || 0) + 1);
                      return <span className="text-fire font-mono font-bold text-xs">₹{total}</span>;
                    })()}
                  </td>
                  <td>
                    <span className={`px-2 py-1 text-[9px] font-bold border ${
                      reg.status === 'confirmed' ? 'border-green text-green' : 
                      reg.status === 'pending' ? 'border-ember text-ember' : 'border-fire text-fire'
                    }`}>
                      {reg.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="text-right">
                    <button 
                      onClick={() => setSelectedReg(reg)}
                      className="p-2 bg-white/5 hover:bg-cyan/10 text-muted hover:text-cyan transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
           <div className="absolute inset-0 bg-void/90 backdrop-blur-md" onClick={() => setSelectedReg(null)} />
           <div className="ignite-card max-w-2xl w-full bg-[#0A0A15] border-fire/20 relative z-10 overflow-hidden animate-scale-in">
              <div className="p-8 border-b border-fire/10 flex justify-between items-center bg-fire/5">
                 <div>
                    <div className="text-[10px] text-fire tracking-[4px] font-bold uppercase mb-1">Entry Profile</div>
                    <div className="font-display text-3xl text-primary">{selectedReg.registrationId}</div>
                 </div>
                 <button onClick={() => setSelectedReg(null)} className="text-muted hover:text-fire"><X size={24} /></button>
              </div>

              <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto no-scrollbar font-mono">
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1">
                       <label className="text-[9px] text-muted tracking-[2px] uppercase">Participant</label>
                       <div className="text-sm text-primary uppercase font-bold">{selectedReg.participantDetails?.name || 'N/A'}</div>
                    </div>
                    <div className="space-y-1 text-right">
                       <label className="text-[9px] text-muted tracking-[2px] uppercase">Event</label>
                       <div className="text-sm text-cyan uppercase font-bold">{selectedReg.eventId?.title || 'DELETED EVENT'}</div>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[9px] text-muted tracking-[2px] uppercase">College</label>
                       <div className="text-xs text-secondary">{selectedReg.participantDetails?.college || 'N/A'}</div>
                    </div>
                    <div className="space-y-1 text-right">
                       <label className="text-[9px] text-muted tracking-[2px] uppercase">Registered At</label>
                       <div className="text-xs text-secondary">{new Date(selectedReg.createdAt).toLocaleString()}</div>
                    </div>
                 </div>

                 <div className="p-4 bg-void/50 border border-white/5 space-y-2">
                    <label className="text-[9px] text-muted tracking-[2px] uppercase block mb-2">Team Members</label>
                    {selectedReg.teamMembers?.length > 0 ? (
                      selectedReg.teamMembers.map((m, i) => (
                        <div key={i} className="text-[11px] text-primary flex justify-between border-b border-white/5 pb-1 last:border-0">
                           <span>{m.name}</span>
                           <span className="text-muted">{m.email || 'NO EMAIL'}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-[10px] text-muted italic italic">SOLO PARTICIPANT</div>
                    )}
                 </div>

                 {selectedReg.participantDetails?.studentIdUrl && (
                   <div className="space-y-2">
                      <label className="text-[9px] text-muted tracking-[2px] uppercase">Student ID Proof</label>
                      <a href={selectedReg.participantDetails?.studentIdUrl} target="_blank" rel="noreferrer" className="block p-4 border border-dashed border-cyan/20 bg-cyan/5 text-center group">
                         <span className="text-[10px] text-cyan group-hover:underline">VIEW DOCUMENT IN NEW TAB</span>
                      </a>
                   </div>
                 )}
              </div>

              <div className="p-8 border-t border-fire/10 bg-void/50 flex gap-4">
                 <IgniteButton 
                   variant="primary" 
                   onClick={() => statusMutation.mutate({ id: selectedReg._id, status: 'confirmed' })}
                   className="flex-1"
                   loading={statusMutation.isPending}
                 >
                   CONFIRM ENTRY
                 </IgniteButton>
                 <IgniteButton 
                   variant="ghost" 
                   onClick={() => statusMutation.mutate({ id: selectedReg._id, status: 'rejected' })}
                   className="flex-1 border-fire/20 text-fire hover:bg-fire/10"
                   loading={statusMutation.isPending}
                 >
                   REJECT
                 </IgniteButton>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
