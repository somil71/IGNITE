import { useState } from 'react';
import { Upload, CircleCheck, AlertCircle } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function PaymentUpload({ fee, formData, setFormData, paymentTimestamp }) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  // Fee Logic
  const rawFee = fee || formData?.selectedEvent?.registrationFee;
  const displayFee = (rawFee && rawFee > 0) ? `₹${rawFee}` : '?';
  const showFeeWarning = !rawFee || rawFee === 0;

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validation
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    const formDataToUpload = new FormData();
    formDataToUpload.append('file', file);

    setUploading(true);
    setUploadError(null);
    setUploadProgress(10);

    try {
      const response = await api.post('/upload/payment-proof', formDataToUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 90) / progressEvent.total) + 10;
          setUploadProgress(percent);
        }
      });

      if (response.data.success) {
        setFormData(prev => ({ 
          ...prev, 
          paymentScreenshot: response.data.url,
          paymentPublicId: response.data.publicId 
        }));
        setUploadedFileName(file.name);
        toast.success('Payment proof uploaded successfully');
      }
    } catch (err) {
      console.error('[Upload] Error:', err);
      const msg = err.response?.data?.message || 'Upload failed. Please try again.';
      setUploadError(msg);
      toast.error(msg);
    } finally {
      setUploading(false);
    }
  };

  const formattedTime = paymentTimestamp 
    ? new Date(paymentTimestamp).toLocaleTimeString('en-IN') 
    : '--:--:--';

  return (
    <div className="space-y-6">
      {/* 1. FEE BAR */}
      <div className="w-full bg-fire/5 border border-fire/20 p-6 flex items-center justify-between">
        <div className="font-mono text-[10px] text-fire uppercase tracking-[2px]">Registration Fee</div>
        <div className="font-display text-4xl text-fire">{displayFee}</div>
      </div>

      {/* 2. TIME WARNING BANNER */}
      {paymentTimestamp && (
        <div className="bg-amber-500 p-3 flex items-center gap-3 w-full">
          <AlertCircle size={18} className="text-void" />
          <div className="font-mono text-[10px] text-void font-bold uppercase tracking-wider">
            QR GENERATED AT {formattedTime} — COMPLETE PAYMENT WITHIN 10 MINUTES
          </div>
        </div>
      )}

      {/* 3. QR CODE SECTION */}
      <div className="text-center mb-6">
        <div className="font-mono text-[9px] text-fire uppercase tracking-[0.3em] mb-3">
          SCAN TO PAY — UPI
        </div>
        
        <div className="w-[200px] h-[200px] bg-white mx-auto p-3 shadow-2xl flex items-center justify-center relative overflow-hidden">
          <img 
            src={`/qr.jpeg?v=${Date.now()}`} 
            alt="Payment QR" 
            className="w-full h-full object-contain relative z-10"
            onError={(e) => {
              // Fallback to dynamic UPI QR if local image fails
              const upiId = 'ignite.techfest@iilm';
              const amount = fee || 0;
              const name = 'IGNITE 2026';
              const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
              e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}`;
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-void gap-1 opacity-20 pointer-events-none">
             <div className="font-mono text-[8px] font-bold">LOADING QR...</div>
          </div>
        </div>

        <div className="font-mono text-[11px] text-white/50 tracking-[0.1em] mt-3">
          ignite.techfest@iilm
        </div>

        <div className="font-mono text-[11px] text-fire mt-1 font-bold uppercase">
          {showFeeWarning ? (
            <span className="text-amber-500">CONFIRM FEE WITH COORDINATOR</span>
          ) : (
            <>PAY {displayFee} EXACTLY</>
          )}
        </div>
      </div>

      {/* 4. UPLOAD SECTION */}
      <div className="space-y-3">
        <label className="font-mono text-[9px] text-white/30 uppercase tracking-[3px] block">Payment Screenshot *</label>
        
        {!uploading && !uploadedFileName && !uploadError && (
          <label className="block w-full h-[160px] border-2 border-dashed border-white/15 bg-void/50 hover:border-fire/40 transition-colors cursor-pointer">
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <Upload size={32} className="text-white/20 mb-3" />
              <div className="font-display text-lg text-white/40 mb-1">CLICK OR DRAG TO UPLOAD</div>
              <div className="font-mono text-[9px] text-white/20 uppercase tracking-widest">JPG, PNG, WEBP — MAX 5MB</div>
            </div>
          </label>
        )}

        {uploading && (
          <div className="w-full h-[160px] border-2 border-dashed border-fire bg-fire/5 flex flex-col items-center justify-center p-8">
            <div className="font-mono text-[10px] text-fire uppercase tracking-[2px] mb-4">Uploading...</div>
            <div className="w-full h-[6px] bg-void rounded-full overflow-hidden">
              <div 
                className="h-full bg-fire transition-all duration-200" 
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <div className="font-mono text-[10px] text-fire mt-3">{uploadProgress}%</div>
          </div>
        )}

        {uploadedFileName && !uploading && (
          <label className="block w-full h-[160px] border-2 border-green-500/50 bg-green-500/5 hover:bg-green-500/10 transition-colors cursor-pointer">
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <CircleCheck size={32} className="text-green-500 mb-3" />
              <div className="font-display text-lg text-green-500 mb-1">UPLOADED</div>
              <div className="font-mono text-[9px] text-white/40 mb-1 truncate max-w-full px-4">{uploadedFileName}</div>
              <div className="font-mono text-[8px] text-white/20 uppercase tracking-widest mt-2">Click to change</div>
            </div>
          </label>
        )}

        {uploadError && !uploading && (
          <label className="block w-full h-[160px] border-2 border-red-500/50 bg-red-500/5 hover:bg-red-500/10 transition-colors cursor-pointer">
            <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <AlertCircle size={32} className="text-red-500 mb-3" />
              <div className="font-display text-lg text-red-500 mb-1">UPLOAD FAILED</div>
              <div className="font-mono text-[9px] text-white/40 mb-1 px-4">{uploadError}</div>
              <div className="font-mono text-[8px] text-fire uppercase tracking-widest mt-2">Click to try again</div>
            </div>
          </label>
        )}
      </div>

      {/* 5. TRANSACTION ID FIELD */}
      <div className="space-y-3">
        <label className="font-mono text-[9px] text-white/30 uppercase tracking-[3px] block">UPI Transaction / Reference ID (Optional)</label>
        <div className="font-mono text-[8px] text-white/20 uppercase tracking-widest -mt-2">Helps faster verification if screenshot is blurry</div>
        <input 
          type="text"
          className="w-full bg-void border border-white/10 p-4 font-mono text-sm text-white focus:border-fire/60 outline-none transition-all"
          placeholder="e.g. 40228XXXXXXX"
          value={formData.transactionId || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, transactionId: e.target.value.toUpperCase() }))}
        />
      </div>
    </div>
  );
}
