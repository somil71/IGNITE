import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@/services/admin.service';
import ScrambleText from '../../components/ui/ScrambleText';
import IgniteButton from '../../components/ui/IgniteButton';
import toast from 'react-hot-toast';
import { Check, X, ExternalLink, Image as ImageIcon, Clock, ShieldCheck, Banknote, History, Zap, Loader2 } from 'lucide-react';

/**
 * PHASE 3E: AdminPayments — Window Override Logic
 * Allows admins to rescue time-exceeded registrations.
 */
export default function AdminPayments() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('uploaded'); // uploaded, verified, rejected, time_exceeded

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['admin-payments', filter],
    queryFn: async () => {
      const res = await adminService.getPayments({ status: filter });
      return res.data.payments;
    }
  });

  const verifyMutation = useMutation({
    mutationFn: ({ id, status, note }) => adminService.verifyPayment(id, status, note),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(['admin-payments']);
      queryClient.invalidateQueries(['admin-stats']);
      toast.success(variables.status === 'verified' ? 'Payment Verified' : 'Payment Rejected');
    }
  });

  const overrideMutation = useMutation({
    mutationFn: ({ id, note }) => adminService.overridePayment(id, note),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-payments']);
      toast.success('Payment Window Restored');
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Override failed')
  });

  const tabs = [
    { id: 'uploaded', label: 'PENDING', icon: <Clock size={14} /> },
    { id: 'time_exceeded', label: 'TIME EXCEEDED', icon: <History size={14} /> },
    { id: 'verified', label: 'VERIFIED', icon: <Check size={14} /> },
    { id: 'rejected', label: 'REJECTED', icon: <X size={14} /> },
  ];

  return (
    <div className="space-y-12 animate-fade-in">
      <header className="pb-12 border-b border-fire/10">
        <h1 className="font-display text-4xl md:text-6xl text-primary tracking-[4px] mb-2 uppercase">
          <ScrambleText text="AUDIT TERMINAL" />
        </h1>
        <p className="font-mono text-secondary text-[11px] tracking-[4px] uppercase flex items-center gap-2">
           <ShieldCheck size={14} className="text-fire" /> Financial Ops // Manually Overriding Nexus Protocols
        </p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex bg-[#0A0A15] border border-white/5 p-1 rounded-sm w-fit flex-wrap gap-1">
        {tabs.map(s => (
          <button
            key={s.id}
            onClick={() => setFilter(s.id)}
            className={`px-6 py-2.5 font-ui text-[10px] tracking-[2px] uppercase transition-all flex items-center gap-2 ${
              filter === s.id ? 'bg-fire text-white' : 'text-muted hover:text-primary hover:bg-white/[0.02]'
            }`}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 py-20 px-4 justify-items-center skeleton-pulse">
           {[1, 2, 3].map(i => (
             <div key={i} className="w-full h-[500px] border border-white/5 bg-surface/20 rounded-sm" />
           ))}
        </div>
      ) : payments.length === 0 ? (
        <div className="py-32 text-center border-2 border-dashed border-white/5 bg-surface/10 flex flex-col items-center gap-4">
           <Banknote size={48} className="text-muted opacity-10" />
           <div className="font-mono text-xs text-muted tracking-[3px] uppercase">No data packets in this sector</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {payments.map((p) => (
            <div key={p._id} className="ignite-card flex flex-col border-white/5 bg-[#0A0A15]/60 hover:border-fire/20 transition-all group overflow-hidden">
               {/* Card Header */}
               <div className={`p-4 border-b border-white/5 flex justify-between items-center ${
                 filter === 'time_exceeded' ? 'bg-red-500/10' : 'bg-fire/5'
               }`}>
                  <div className={`font-mono text-[9px] font-bold tracking-[2px] uppercase ${
                    filter === 'time_exceeded' ? 'text-red-400' : 'text-fire'
                  }`}>
                    {filter === 'time_exceeded' ? 'WINDOW EXCEPTION' : 'AUDIT TARGET'}
                  </div>
                  <div className="font-mono text-[8px] text-muted">{new Date(p.createdAt).toLocaleDateString()}</div>
               </div>
               
               {/* Card Body */}
               <div className="p-6 flex-1 space-y-6">
                  <div className="space-y-4">
                     <div>
                        <div className="font-display text-2xl text-primary mb-1 uppercase tracking-wider">{p.user?.name || 'Unknown User'}</div>
                        <div className="font-mono text-[9px] text-muted truncate">{p.user?.email}</div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-void border border-white/5">
                           <div className="text-[7px] text-muted uppercase tracking-[1.5px] mb-1">Fee</div>
                           <div className="font-display text-xl text-primary">₹{p.amount}</div>
                        </div>
                        <div className="p-3 bg-void border border-fire/10 overflow-hidden">
                           <div className="text-[7px] text-fire uppercase tracking-[1.5px] mb-1">Transaction ID</div>
                           <div className="font-mono text-[9px] text-primary truncate select-all">{p.transactionId || '---'}</div>
                        </div>
                     </div>
                  </div>

                  {filter === 'time_exceeded' && (
                    <div className="p-4 bg-red-500/5 border border-red-500/20 space-y-2">
                       <div className="font-mono text-[8px] text-red-400 uppercase tracking-[2px]">Timing metrics</div>
                       <div className="font-mono text-[10px] text-primary">ELAPSED: <span className="text-red-400 font-bold">{p.minutesElapsed} MINUTES</span></div>
                       <div className="text-[8px] text-muted italic">Limit: 10 minutes</div>
                    </div>
                  )}

                  <div className="space-y-3">
                     <label className="font-mono text-[8px] text-muted uppercase tracking-[2px] flex items-center gap-2">
                        <ImageIcon size={10} /> PAYMENT PROOF ENCRYPTED PREVIEW
                     </label>
                     <div className="aspect-[4/3] bg-void border border-white/5 relative overflow-hidden flex items-center justify-center p-2 group/proof">
                        <img 
                          src={p.paymentProofUrl} 
                          alt="Proof" 
                          className="w-full h-full object-contain"
                        />
                        <a 
                          href={p.paymentProofUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="absolute inset-0 bg-void/80 flex flex-col items-center justify-center opacity-0 group-hover/proof:opacity-100 transition-opacity gap-3"
                        >
                           <div className="p-3 bg-fire text-white rounded-full shadow-[0_0_20px_rgba(255,107,0,0.4)]">
                              <ExternalLink size={20} />
                           </div>
                           <span className="font-mono text-[9px] text-primary tracking-[2px] uppercase">Decrypt Full Image</span>
                        </a>
                     </div>
                  </div>
               </div>

               {/* Card Footer Actions */}
               <div className="p-6 border-t border-white/5 bg-white/[0.01]">
                {(filter === 'uploaded' || filter === 'time_exceeded') && (
                  <div className="grid grid-cols-1 gap-4">
                     {filter === 'time_exceeded' && (
                       <button 
                         onClick={() => {
                           const note = prompt('Enter override justification:');
                           if (note) overrideMutation.mutate({ id: p._id, note });
                         }}
                         disabled={overrideMutation.isPending}
                         className="w-full py-3 bg-cyan/10 border border-cyan/30 text-cyan font-mono text-[10px] tracking-[2px] uppercase hover:bg-cyan/20 transition-all flex items-center justify-center gap-2"
                       >
                         {overrideMutation.isPending ? <Loader2 size={12} className="animate-spin" /> : <Zap size={12} />}
                         MANUAL OVERRIDE WINDOW
                       </button>
                     )}
                     
                     <div className="grid grid-cols-2 gap-4">
                        <IgniteButton 
                          variant="primary" 
                          onClick={() => verifyMutation.mutate({ id: p._id, status: 'verified' })}
                          loading={verifyMutation.isPending}
                          className="py-3"
                        >
                          APPROVE
                        </IgniteButton>
                        <IgniteButton 
                          variant="ghost" 
                          onClick={() => {
                            const note = prompt('Enter rejection reason:');
                            if (note) verifyMutation.mutate({ id: p._id, status: 'rejected', note });
                          }}
                          loading={verifyMutation.isPending}
                          className="py-3 border-red-500/20 text-red-400 hover:bg-red-500/5 hover:border-red-500/40"
                        >
                          REJECT
                        </IgniteButton>
                     </div>
                  </div>
                )}
                
                {filter === 'verified' && (
                   <div className="flex items-center gap-2 text-green font-mono text-[10px] uppercase tracking-[2px] justify-center">
                     <Check size={14} /> Audit Successful
                   </div>
                )}

                {filter === 'rejected' && (
                   <div className="flex flex-col gap-2 items-center text-red-500 font-mono text-[10px] uppercase tracking-[2px] justify-center">
                     <div className="flex items-center gap-2"><X size={14} /> Entry Terminated</div>
                     {p.rejectionReason && <div className="text-[8px] text-muted lowercase text-center">Reason: {p.rejectionReason}</div>}
                   </div>
                )}
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
