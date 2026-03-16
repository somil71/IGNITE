import { useDropzone } from 'react-dropzone';
import { Upload, CircleCheck, QrCode, AlertCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@clerk/react';
import { uploadToFirebaseStorage } from '../../firebase/storage';
import toast from 'react-hot-toast';

/**
 * PHASE 5: PaymentUpload — CORS & Path Fix
 * Implements Clerk-derived paths and resumeable progress tracking.
 */
export default function PaymentUpload({ fee, formData, setFormData, paymentTimestamp }) {
  const { user: clerkUser } = useUser();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  // Fee Validation: Ensure we never pay ₹0
  const displayFee = fee || formData?.selectedEvent?.registrationFee || 100;

  const formattedTime = paymentTimestamp ? new Date(paymentTimestamp).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }) : '--:--:--';

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // 1. File Validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPG/PNG).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadError(null);

    // 2. Sanitize Path & Validate User
    if (!clerkUser?.id) {
      toast.error('Authentication required for upload.');
      setUploading(false);
      return;
    }

    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.-]/g, '');
    const storagePath = `payment-proofs/${clerkUser.id}/${timestamp}-${sanitizedName}`;

    try {
      // 3. Resumable Upload with Progress Watchdog
      console.log('Initiating Firebase Upload to:', storagePath);
      
      const downloadURL = await uploadToFirebaseStorage(file, storagePath, (progress) => {
        console.log(`Upload Progress: ${progress}%`);
        setUploadProgress(progress);
      });

      // 4. Success Handling
      setFormData(prev => ({ ...prev, paymentProofUrl: downloadURL }));
      setUploadProgress(100);
      setUploading(false);
      toast.success('Payment proof uploaded successfully!');
    } catch (err) {
      // 5. Error Handling
      console.error('CRITICAL UPLOAD ERROR:', err);
      setUploadError(err.message || 'Upload failed due to connection issues');
      setUploading(false);
      setUploadProgress(0);
      toast.error(`Upload Failed: ${err.message || 'Check your connection'}`);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    maxFiles: 1,
    disabled: uploading
  });

  return (
    <div className="space-y-8 animate-fade-in child-stagger">
      {/* 1. FEE DISPLAY BAR */}
      <div className="flex items-center justify-between p-4 bg-[#0A0A10] border-l-4 border-fire shadow-2xl">
        <div className="font-mono text-[10px] text-muted tracking-[3px] uppercase">Registration Fee</div>
        <div className="font-display text-4xl text-fire">₹{displayFee}</div>
      </div>

      {/* 2. TIME WARNING BANNER */}
      {paymentTimestamp && (
        <div className="bg-amber-500/10 border border-amber-500/20 p-4 flex items-center gap-4 animate-pulse">
          <div className="w-10 h-10 bg-amber-500/20 flex items-center justify-center shrink-0">
            <AlertCircle size={20} className="text-amber-500" />
          </div>
          <div className="font-mono text-[10px] leading-relaxed tracking-[1px] text-amber-200">
            <span className="text-amber-500 font-bold uppercase">Urgent Uplink Required</span><br />
            QR GENERATED AT {formattedTime} — COMPLETE WITHIN 10 MINUTES
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* 3. QR CODE BLOCK */}
        <div className="ignite-card p-6 bg-void/50 border-white/5 text-center flex flex-col items-center">
          <div className="font-ui text-[9px] text-muted tracking-[3px] uppercase mb-4">Scan to Pay — UPI</div>
          <div className="w-48 h-48 bg-white p-3 shadow-2xl mb-4 group overflow-hidden relative">
            <img 
              src="/qr.jpeg" 
              alt="UPI QR Code" 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden absolute inset-0 bg-void flex flex-col items-center justify-center p-4">
              <QrCode size={48} className="text-fire mb-2" />
              <div className="font-mono text-[10px] text-fire">QR OFFLINE</div>
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[11px] text-primary tracking-[1.5px] select-all cursor-pointer">
              ignite.techfest@iilm
            </p>
            <p className="font-mono text-[9px] text-fire/70 uppercase tracking-[1px]">Pay ₹{displayFee} Exactly</p>
          </div>
        </div>

        {/* 4. UPLOAD SECTION */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="font-ui text-[10px] text-muted tracking-[3px] uppercase">Payment Screenshot *</label>
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed p-8 text-center transition-all cursor-pointer relative min-h-[160px] flex flex-col items-center justify-center ${
                isDragActive ? 'border-fire bg-fire/5' : 
                formData.paymentProofUrl ? 'border-green-500/40 bg-green-500/5' : 
                uploadError ? 'border-red-500/40 bg-red-500/5' :
                'border-white/10 hover:border-fire/40 bg-void/30'
              } ${uploading ? 'cursor-wait pointer-events-none' : ''}`}
            >
              <input {...getInputProps()} />
              
              {uploading ? (
                <div className="flex flex-col items-center gap-4 w-full px-6">
                  <div className="w-full h-1 bg-white/5 overflow-hidden rounded-full">
                    <div 
                      className="h-full bg-fire transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }} 
                    />
                  </div>
                  <div className="font-mono text-[10px] text-fire tracking-[2px] animate-pulse flex items-center gap-2">
                    <Loader2 size={12} className="animate-spin" /> UPLOADING... {uploadProgress}%
                  </div>
                </div>
              ) : formData.paymentProofUrl ? (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/20 text-green-500 flex items-center justify-center rounded-full">
                    <CircleCheck size={24} />
                  </div>
                  <div className="font-mono text-[10px] text-green-500 uppercase tracking-[2px]">Proof Secured</div>
                  <div className="font-mono text-[8px] text-muted underline">Click to change screenshot</div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 text-muted flex items-center justify-center rounded-sm">
                    <Upload size={20} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-secondary uppercase tracking-[2px] mb-1">Click or Drag to Upload</div>
                    <div className="font-mono text-[9px] text-muted">JPG, PNG — Max 5MB</div>
                  </div>
                </div>
              )}

              {uploadError && (
                <div className="absolute bottom-4 left-0 right-0 font-mono text-[9px] text-red-400 px-4">
                  ⚠ {uploadError}. Click to try again.
                </div>
              )}
            </div>
          </div>

          {/* 5. TRANSACTION ID FIELD */}
          <div className="space-y-2">
            <label className="font-ui text-[10px] text-muted tracking-[3px] uppercase">
              UPI Transaction ID <span className="text-[8px] opacity-50">(Optional)</span>
            </label>
            <input 
              name="transactionId" 
              placeholder="e.g. 40228XXXXXXX" 
              value={formData.transactionId || ''} 
              onChange={(e) => setFormData(prev => ({ ...prev, transactionId: e.target.value.toUpperCase() }))}
              className="w-full bg-[#0A0A10] border border-white/10 focus:border-fire/50 outline-none px-5 py-4 font-mono text-sm text-primary transition-all tracking-[1px]"
            />
            <p className="font-mono text-[8px] text-muted uppercase tracking-[1px]">helps faster audit if screenshot is blurry</p>
          </div>
        </div>
      </div>
    </div>
  );
}
