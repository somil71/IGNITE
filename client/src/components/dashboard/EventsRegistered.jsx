import CategoryBadge from '../ui/CategoryBadge';
import PaymentStatus from './PaymentStatus';
import IgniteButton from '../ui/IgniteButton';
import { ExternalLink, Download, Upload, Loader2, Users, User, ShieldAlert, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage } from '../../firebase-setup/config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../../hooks/useAuth';
import { paymentService } from '@/services/payment.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * PHASE 3D: EventsRegistered — Context-Aware Updates
 * Shows team roles and smart actions for window-exceeded scenarios.
 */
export default function EventsRegistered({ registrations }) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [uploadingId, setUploadingId] = useState(null);
  const [progressData, setProgressData] = useState({});
  const [txInputs, setTxInputs] = useState({});

  const reuploadMutation = useMutation({
    mutationFn: ({ id, data }) => paymentService.reuploadProof(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['dashboard']);
      toast.success('Payment proof re-submitted for verification!');
      setUploadingId(null);
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Upload failed')
  });

  const onDrop = async (acceptedFiles, reg) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadingId(reg.payment._id);
    const storageRef = ref(storage, `payment-proofs/${user.uid}/reupload_${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        setProgressData(prev => ({ ...prev, [reg.payment._id]: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 }));
      }, 
      (error) => {
        console.error(error);
        toast.error('File upload failed');
        setUploadingId(null);
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const txId = txInputs[reg.payment._id] || '';
        reuploadMutation.mutate({ id: reg.payment._id, data: { paymentProofUrl: downloadURL, transactionId: txId } });
      }
    );
  };

  const DropzoneArea = ({ reg }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
      onDrop: (files) => onDrop(files, reg), 
      accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
      maxFiles: 1 
    });
    
    const isUploading = uploadingId === reg.payment._id;
    const progress = progressData[reg.payment._id] || 0;

    return (
      <div className="mt-6 pt-6 border-t border-fire/10 w-full animate-fade-in">
        <div className="flex items-center gap-3 mb-4">
          <ShieldAlert size={16} className="text-fire animate-pulse" />
          <h4 className="font-display text-lg text-fire tracking-[2px] uppercase">Re-upload Payment Proof</h4>
        </div>
        <div className="space-y-4">
          <input 
            placeholder="Enter UPI Transaction ID (Required for re-upload)" 
            value={txInputs[reg.payment._id] || ''}
            onChange={(e) => setTxInputs(prev => ({ ...prev, [reg.payment._id]: e.target.value.toUpperCase() }))}
            className="w-full bg-[#0A0A10] border border-white/10 outline-none px-5 py-3 font-mono text-xs text-primary focus:border-fire/50 transition-colors"
          />
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
              isDragActive ? 'border-fire bg-fire/5' : 'border-white/5 bg-void/30 hover:border-fire/30'
            }`}
          >
            <input {...getInputProps()} />
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 size={16} className="animate-spin text-fire" />
                <div className="font-mono text-[9px] text-fire uppercase tracking-[2px]">Uploading... {Math.round(progress)}%</div>
              </div>
            ) : reuploadMutation.isPending && uploadingId === reg.payment._id ? (
              <div className="flex flex-col items-center gap-2 text-cyan">
                <Loader2 size={16} className="animate-spin" />
                <div className="font-mono text-[9px] uppercase tracking-[2px]">Linking Proof...</div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted group-hover:text-secondary">
                <Upload size={20} className="mb-1" />
                <span className="font-mono text-[9px] uppercase tracking-[2px]">Drop new screenshot here</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!registrations || registrations.length === 0) {
    return (
      <div className="text-center py-24 bg-white/[0.01] border border-dashed border-white/5">
        <div className="font-display text-3xl text-muted mb-6 uppercase tracking-widest">No Active Uplinks Found</div>
        <IgniteButton variant="primary" to="/events">BROWSE COMPETITIONS →</IgniteButton>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {registrations.map((reg) => {
        const event = reg.eventId || {};
        const isTimeExceeded = reg.payment?.paymentStatus === 'time_exceeded';
        const isRejected = reg.status === 'rejected';
        
        return (
          <div key={reg._id} className="ignite-card p-6 md:p-8 bg-surface/40 hover:bg-elevated/40 transition-all group border-fire/10 relative overflow-hidden">
            {/* Team Member Overlay Stripe */}
            {!reg.isLeader && (
              <div className="absolute top-0 right-0 py-1 px-4 bg-cyan/10 border-l border-b border-cyan/20 font-mono text-[8px] text-cyan tracking-[2px] uppercase">
                TEAM MEMBER
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              {/* Left Column: Event Details */}
              <div className="flex-1 space-y-5">
                <div className="flex flex-wrap items-center gap-4">
                  <CategoryBadge category={event.category || 'Technical'} />
                  <h3 className="font-display text-3xl text-primary tracking-wider uppercase group-hover:text-fire transition-colors">
                    {event.title || 'Unknown Sector'}
                  </h3>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[10px] text-muted tracking-[1.5px] uppercase">
                  <div className="flex items-center gap-2">
                    <span className="text-secondary opacity-50"># ID:</span> 
                    <span className="text-ember font-bold select-all">{reg.registrationId}</span>
                  </div>
                  {reg.teamName && (
                    <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                      <Users size={12} className="text-cyan" /> 
                      <span className="text-secondary">{reg.teamName}</span>
                      <span className="text-muted text-[8px]">({reg.teamMembers?.length + 1} SQUAD)</span>
                    </div>
                  )}
                  {!reg.teamName && (
                    <div className="flex items-center gap-2">
                      <User size={12} className="text-fire/50" /> 
                      <span className="text-secondary">Solo Entry</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Status & Actions */}
              <div className="w-full md:w-auto flex flex-col items-end gap-5 shrink-0">
                 <PaymentStatus status={reg.status} payment={reg.payment} />
                 
                 <div className="flex gap-4">
                    {isTimeExceeded ? (
                      <IgniteButton 
                        variant="ghost" 
                        onClick={() => window.open(`mailto:ignite.techfest@iilm.edu?subject=Time Limit Exceeded - ${reg.registrationId}`)}
                        className="py-2.5 px-4 text-[10px] border-red-500/30 text-red-400 hover:bg-red-500/5"
                      >
                         <Mail size={14} className="mr-2" /> CONTACT SUPPORT
                      </IgniteButton>
                    ) : (
                      <Link 
                        to={`/events/${event.slug || ''}`}
                        className="flex items-center gap-2 px-4 py-2.5 border border-white/5 text-[9px] font-mono text-muted hover:text-cyan hover:border-cyan/40 transition-all uppercase tracking-[2px]"
                        title="View Event Details"
                      >
                        <ExternalLink size={14} /> VIEW SECTOR
                      </Link>
                    )}

                    {reg.status === 'confirmed' && (
                      <button 
                        className="flex items-center gap-2 px-4 py-2.5 bg-green/10 border border-green/20 text-[9px] font-mono text-green hover:bg-green/20 transition-all uppercase tracking-[2px]"
                        title="Download Receipt"
                        onClick={() => toast.success('Dispatching receipt to buffer...')}
                      >
                        <Download size={14} /> RECEIPT
                      </button>
                    )}
                 </div>
              </div>
            </div>
            
            {/* Conditional Sub-Action: Re-upload */}
            {(isRejected || (reg.status === 'pending' && isTimeExceeded)) && reg.isLeader && reg.payment && (
              <DropzoneArea reg={reg} />
            )}
          </div>
        );
      })}
    </div>
  );
}
