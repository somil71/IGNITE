import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import { useAuth } from '../hooks/useAuth';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { User, Phone, School, Upload, CircleCheck } from 'lucide-react';

export default function CompleteProfile() {
  const { user: clerkUser } = useUser();
  const { refreshUser, setIsProfileComplete } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: clerkUser?.fullName || '',
    phone: '',
    courseLevel: 'UG',
    collegeType: 'IILM',
    year: '1st',
    course: '',
    rollNumber: '',
    officialEmail: '',
    collegeName: '',
    studentIdCardUrl: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.patch('/auth/complete-profile', formData);
      setIsProfileComplete(true);
      await refreshUser();
      toast.success('Profile complete! Welcome to IGNITE 2026', {
        icon: '🔥',
        style: {
          borderRadius: '0',
          background: '#0a0a0a',
          color: '#fff',
          border: '1px solid var(--accent-fire)',
        }
      });
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to complete profile');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 p-3 rounded-none focus:border-accent-fire/50 focus:outline-none transition-colors font-mono text-sm";
  const labelClasses = "block text-xs font-mono text-white/40 uppercase mb-2 tracking-widest";

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 p-8 md:p-12 relative overflow-hidden"
      >
        {/* Glow Decors */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-fire/10 blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-accent-blue/10 blur-[100px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-[1px] bg-accent-fire" />
            <span className="text-accent-fire font-mono text-xs tracking-[0.3em]">STEP 1 OF 1 — ALMOST THERE!</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bebas tracking-tight text-white mb-8">
            COMPLETE YOUR <span className="text-accent-fire">PROFILE</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div>
                <label className={labelClasses}>Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 w-4 h-4 text-white/20" />
                  <input
                    type="text"
                    required
                    className={`${inputClasses} pl-10`}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 w-4 h-4 text-white/20" />
                  <input
                    type="tel"
                    required
                    className={`${inputClasses} pl-10`}
                    value={formData.phone}
                    placeholder="+91 XXXXX XXXXX"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Selection Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={labelClasses}>Course Level</label>
                <div className="flex gap-4">
                  {['UG', 'PG'].map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setFormData({ ...formData, courseLevel: lvl })}
                      className={`flex-1 p-3 font-mono text-sm border transition-all ${
                        formData.courseLevel === lvl 
                        ? 'bg-white text-black border-white' 
                        : 'bg-transparent text-white/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClasses}>College Type</label>
                <div className="flex gap-4">
                  {['IILM', 'Other'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, collegeType: type })}
                      className={`flex-1 p-3 font-mono text-sm border transition-all ${
                        formData.collegeType === type 
                        ? 'bg-accent-fire text-white border-accent-fire' 
                        : 'bg-transparent text-white/40 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Conditional Fields */}
            <AnimatePresence mode="wait">
              {formData.collegeType === 'IILM' ? (
                <motion.div
                  key="iilm-fields"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5"
                >
                  <div>
                    <label className={labelClasses}>Year of Study</label>
                    <select
                      className={inputClasses}
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    >
                      {['1st', '2nd', '3rd', '4th'].map(y => <option key={y} value={y}>{y} Year</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Course Name</label>
                    <input
                      type="text"
                      className={inputClasses}
                      placeholder="e.g. B.Tech CSE"
                      value={formData.course}
                      onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Roll Number</label>
                    <input
                      type="text"
                      className={inputClasses}
                      value={formData.rollNumber}
                      onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Official Email ID</label>
                    <input
                      type="email"
                      className={inputClasses}
                      placeholder="name@iilm.edu"
                      value={formData.officialEmail}
                      onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="other-fields"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6 pt-4 border-t border-white/5"
                >
                  <div>
                    <label className={labelClasses}>College Name</label>
                    <div className="relative">
                      <School className="absolute left-3 top-3.5 w-4 h-4 text-white/20" />
                      <input
                        type="text"
                        required
                        className={`${inputClasses} pl-10`}
                        value={formData.collegeName}
                        onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClasses}>Year</label>
                      <input
                        type="text"
                        className={inputClasses}
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Course</label>
                      <input
                        type="text"
                        className={inputClasses}
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClasses}>Upload Student ID Card</label>
                    <div className="border-2 border-dashed border-white/10 p-8 flex flex-col items-center justify-center gap-3 bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group">
                      <Upload className="w-8 h-8 text-white/20 group-hover:text-accent-fire transition-colors" />
                      <p className="text-xs font-mono text-white/40">Drop your ID card image here or click to browse</p>
                      <p className="text-[10px] font-mono text-white/20 uppercase tracking-tighter">PDF, JPG, PNG (MAX. 5MB)</p>
                    </div>
                    {/* Simplified for now, real upload would link to Firebase */}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-fire text-white font-bebas text-2xl py-4 flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all disabled:opacity-50 group"
            >
              {loading ? (
                <span className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  INITIALIZE PROFILE
                  <CircleCheck size={64} className="text-fire mx-auto mb-6" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
