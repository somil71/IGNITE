import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { registrationService } from '@/services/registration.service';
import { eventsService } from '@/services/events.service';
import { userService } from '@/services/user.service';
import PageTransition from '../components/layout/PageTransition';
import ScrambleText from '../components/ui/ScrambleText';
import RegistrationForm from '../components/registration/RegistrationForm';
import CollegeFields from '../components/registration/CollegeFields';
import PaymentUpload from '../components/registration/PaymentUpload';
import IgniteButton from '../components/ui/IgniteButton';
import toast from 'react-hot-toast';
import eventsFallback from '@/data/events';
import { CircleCheck, ArrowRight, ArrowLeft, Zap, Copy, AlertTriangle, Mail, MailCheck } from 'lucide-react';

/**
 * PHASE 3A: Register — Complete Form Overhaul
 * Industry Grade UX inspired by Unstop/Devfolio.
 */
export default function Register() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', phone: '', courseLevel: 'UG',
    collegeType: 'IILM', collegeName: '', year: '', course: '', rollNumber: '', studentIdUrl: '',
    eventId: '', selectedEvent: null,
    teamName: '',
    teamMembers: [],
    paymentProofUrl: '', transactionId: '',
    paymentTimestamp: null
  });
  const [submitResult, setSubmitResult] = useState(null);

  const { data: events = [] } = useQuery({
    queryKey: ['events-reg'],
    queryFn: async () => {
      try {
        const res = await eventsService.getAll();
        return res.data.events;
      } catch (err) {
        return eventsFallback;
      }
    },
  });

  useEffect(() => {
    const slug = searchParams.get('event');
    if (slug && events.length > 0) {
      const ev = events.find(e => e.slug === slug);
      if (ev) setFormData(prev => ({ ...prev, eventId: ev._id, selectedEvent: ev }));
    }
  }, [searchParams, events]);

  const steps = ['PERSONAL', 'COLLEGE', 'EVENT & TEAM', 'PAYMENT'];

  const validateStep = () => {
    if (step === 1) return !!(formData.name && formData.phone);
    if (step === 2) {
      if (formData.collegeType === 'IILM') return !!(formData.course && formData.year);
      return !!(formData.collegeName && formData.studentIdUrl);
    }
    if (step === 3) {
      if (!formData.eventId) return false;
      const { selectedEvent: ev, teamName, teamMembers } = formData;
      if (ev.teamSize.max > 1) {
        if (!teamName || teamName.trim() === '') return false;
        const total = teamMembers.length + 1;
        if (total < ev.teamSize.min) return false;
        return teamMembers.every(m => m.name && m.email && m.phone && m.college);
      }
      return true;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 3) {
      const { selectedEvent: ev, teamName, teamMembers } = formData;
      if (ev.teamSize.max > 1) {
        if (!teamName || teamName.trim() === '') return toast.error('Team Name is required');
        
        const total = teamMembers.length + 1;
        if (total < ev.teamSize.min) {
           return toast.error(`Min participants for this event is ${ev.teamSize.min}`);
        }

        const allValid = teamMembers.every(m => m.name && m.email && m.phone && m.college);
        if (!allValid) return toast.error('Please fill all team member details');

        // Check duplicates
        const emails = [formData.email, ...teamMembers.map(m => m.email.toLowerCase())];
        if (new Set(emails).size !== emails.length) return toast.error('Duplicate emails in team list');
      }
      
      // ON ADVANCING TO STEP 4
      const timestamp = new Date().toISOString();
      setFormData(prev => ({ ...prev, paymentTimestamp: timestamp }));
      setStep(4);
    } else if (validateStep()) {
      setStep(s => s + 1);
    } else {
      toast.error('Please complete all required fields');
    }
  };

  const regMutation = useMutation({
    mutationFn: (data) => registrationService.create(data),
    onSuccess: (res) => {
      setSubmitResult(res.data);
      setStep(5);
      toast.success('Registration Transmitted!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Transmission failed');
    }
  });

  const handleSubmit = () => {
    if (!formData.paymentProofUrl) return;

    regMutation.mutate({
      eventId: formData.eventId,
      teamName: formData.teamName,
      teamMembers: formData.teamMembers,
      participantDetails: {
        name: formData.name,
        phone: formData.phone,
        college: formData.collegeType === 'IILM' ? 'IILM University, Greater Noida' : formData.collegeName,
        course: formData.course,
        year: formData.year,
        rollNumber: formData.rollNumber,
        officialEmail: formData.officialEmail,
        studentIdUrl: formData.studentIdUrl
      },
      collegeType: formData.collegeType,
      paymentProofUrl: formData.paymentProofUrl,
      transactionId: formData.transactionId,
      paymentTimestamp: formData.paymentTimestamp
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to buffer');
  };

  return (
    <PageTransition className="pt-32 pb-24 px-4 md:px-12 flex justify-center">
      <div className="max-w-4xl w-full">
        {step < 5 && (
          <>
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-6xl text-primary mb-2">
                <ScrambleText text="EVENT REGISTRATION" />
              </h1>
              <div className="font-mono text-[9px] text-muted tracking-[5px] uppercase">Sector 4 // Uplink Established</div>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-16 relative px-2">
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/5 -z-10" />
              {steps.map((label, i) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <div className={`w-8 h-8 flex items-center justify-center font-display text-sm transition-all duration-500 rounded-sm ${
                    step > i + 1 ? 'bg-fire text-white' : 
                    step === i + 1 ? 'border border-fire text-fire animate-pulse bg-void shadow-[0_0_15px_-3px_rgba(255,85,0,0.3)]' : 
                    'border border-white/10 text-muted bg-void'
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`font-ui text-[8px] tracking-[2px] uppercase whitespace-nowrap hidden sm:block ${
                    step === i + 1 ? 'text-fire' : 'text-muted'
                  }`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="ignite-card p-6 sm:p-8 md:p-12 bg-surface/20 border-white/5 backdrop-blur-xl">
              {step === 1 && <RegistrationForm step={step} formData={formData} setFormData={setFormData} />}
              {step === 2 && <CollegeFields formData={formData} setFormData={setFormData} />}
              
              {step === 3 && (
                <div className="space-y-10 animate-fade-in child-stagger">
                  {/* Event Selector */}
                  <div className="space-y-3">
                    <label className="font-ui text-[10px] text-muted tracking-[3px] uppercase block">Select Target Event</label>
                    <div className="relative">
                      <select 
                        value={formData.eventId} 
                        onChange={(e) => {
                          const ev = events.find(ev => ev._id === e.target.value);
                          let autoMembers = [];
                          if (ev && ev.teamSize.min > 1) {
                            autoMembers = Array.from({ length: ev.teamSize.min - 1 }, () => ({ name: '', email: '', phone: '', college: '', accountFound: null }));
                          }
                          setFormData(prev => ({ ...prev, eventId: e.target.value, selectedEvent: ev, teamMembers: autoMembers }));
                        }}
                        className="w-full bg-[#0A0A10] border border-white/10 focus:border-fire/50 outline-none px-6 py-4 font-mono text-sm text-primary transition-all appearance-none uppercase"
                      >
                        <option value="">SCANNING DIRECTORY...</option>
                        {['Technical', 'Creative & Innovation', 'Fun'].map(cat => (
                          <optgroup key={cat} label={cat.toUpperCase()} className="bg-void">
                            {events.filter(e => e.category === cat).map(e => (
                              <option key={e._id} value={e._id}>{e.title.toUpperCase()}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-fire">▼</div>
                    </div>
                  </div>

                  {formData.selectedEvent && (
                    <>
                      {/* Event Info Summary */}
                      <div className="flex flex-col sm:flex-row gap-4 p-5 bg-white/[0.02] border border-white/5 rounded-sm">
                        <div className="flex-1">
                          <div className="font-display text-2xl text-fire mb-1 tracking-wider">{formData.selectedEvent.title.toUpperCase()}</div>
                          <div className="font-mono text-[9px] text-muted tracking-[2px] uppercase">{formData.selectedEvent.category} SECTOR</div>
                        </div>
                        <div className="flex flex-wrap gap-2 shrink-0">
                          <div className="px-3 py-1 bg-fire/10 border border-fire/20 text-fire font-mono text-[10px] flex items-center gap-2">
                             FEE: {formData.selectedEvent.registrationFee === 0 ? 'FREE' : `₹${formData.selectedEvent.registrationFee} / ${formData.selectedEvent.feeType === 'per_team' ? 'Team' : 'Person'}`}
                          </div>
                          <div className="px-3 py-1 bg-white/5 border border-white/10 text-secondary font-mono text-[10px] flex items-center gap-2 uppercase">
                             {formData.selectedEvent.teamSize.label}
                          </div>
                        </div>
                      </div>

                      {/* Team Section */}
                      {formData.selectedEvent.teamSize.max > 1 && (
                        <div className="space-y-12 animate-fade-in-up">
                          {/* Team Name */}
                          <div className="space-y-3">
                            <label className="font-ui text-[10px] text-muted tracking-[3px] uppercase block">
                              Team Name <span className="text-fire">*</span>
                            </label>
                            <input 
                              placeholder="e.g. CYBER KNIGHTS" 
                              value={formData.teamName}
                              onChange={(e) => setFormData(prev => ({ ...prev, teamName: e.target.value.toUpperCase() }))}
                              className="w-full bg-[#0A0A10] border border-white/10 focus:border-fire/40 outline-none px-6 py-4 font-mono text-sm text-primary transition-all tracking-[2px]"
                            />
                            <p className="font-mono text-[8px] text-muted uppercase tracking-[1px]">Choose a unique identifier for your squad</p>
                          </div>

                          {/* Team Roster */}
                          <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                              <div>
                                <h3 className="font-display text-xl text-primary tracking-widest">TEAM ROSTER</h3>
                                <p className="font-mono text-[9px] text-muted uppercase tracking-[1px] mt-1">Verification status will update on email blur</p>
                              </div>
                              <div className="text-right">
                                <div className="font-display text-3xl text-fire leading-none">{formData.teamMembers.length + 1} / {formData.selectedEvent.teamSize.max}</div>
                                <div className="font-mono text-[8px] text-muted uppercase tracking-[2px]">Participants</div>
                              </div>
                            </div>

                            {formData.teamMembers.map((member, idx) => (
                              <TeamMemberCard 
                                key={idx} 
                                index={idx} 
                                member={member} 
                                onRemove={() => {
                                  const newMembers = [...formData.teamMembers];
                                  newMembers.splice(idx, 1);
                                  setFormData(prev => ({ ...prev, teamMembers: newMembers }));
                                }}
                                onChange={(field, val) => {
                                  const newMembers = [...formData.teamMembers];
                                  newMembers[idx][field] = val;
                                  setFormData(prev => ({ ...prev, teamMembers: newMembers }));
                                }}
                                isRequired={idx < (formData.selectedEvent.teamSize.min - 1)}
                              />
                            ))}

                            {formData.teamMembers.length < (formData.selectedEvent.teamSize.max - 1) && (
                              <button 
                                type="button"
                                onClick={() => {
                                  setFormData(prev => ({ ...prev, teamMembers: [...prev.teamMembers, { name: '', email: '', phone: '', college: '', accountFound: null }] }));
                                }}
                                className="w-full py-6 border border-dashed border-white/10 bg-white/[0.01] hover:bg-fire/[0.02] hover:border-fire/30 transition-all text-muted hover:text-fire font-mono text-[10px] tracking-[4px] uppercase flex flex-col items-center gap-2"
                              >
                                <span>+ DEPLOY ADDITIONAL MEMBER</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Individual Message */}
                      {formData.selectedEvent.teamSize.max === 1 && (
                        <div className="p-8 border border-cyan/20 bg-cyan/5 text-center flex flex-col items-center gap-2">
                          <Zap size={24} className="text-cyan animate-pulse" />
                          <div className="font-display text-xl text-cyan tracking-widest uppercase">Solo Expedition</div>
                          <div className="font-mono text-[10px] text-muted uppercase tracking-[2px]">No team members required for this sector</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {step === 4 && (
                <PaymentUpload 
                  fee={
                    formData.selectedEvent?.registrationFee === 0
                      ? 0
                      : formData.selectedEvent?.feeType === 'per_team'
                      ? formData.selectedEvent.registrationFee
                      : (formData.selectedEvent?.registrationFee || 0) * (formData.teamMembers.length + 1)
                  } 
                  formData={formData} 
                  setFormData={setFormData}
                  paymentTimestamp={formData.paymentTimestamp}
                />
              )}

              {/* Unified Button Row */}
              <div className="mt-16 pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-stretch gap-4">
                  {step > 1 && (
                    <IgniteButton 
                      variant="ghost" 
                      onClick={() => setStep(s => s - 1)} 
                      className="flex-1 min-h-[56px] py-0 flex items-center justify-center"
                    >
                      <ArrowLeft size={16} className="mr-3 shrink-0" /> <span className="uppercase">Retreat</span>
                    </IgniteButton>
                  )}
                  
                  {step < 4 ? (
                    <IgniteButton 
                      variant="primary" 
                      onClick={handleNext} 
                      className="flex-[2] min-h-[56px] py-0 flex items-center justify-center"
                    >
                      <span className="uppercase">Advance to {steps[step]?.toUpperCase()}</span> <ArrowRight size={16} className="ml-3 shrink-0" />
                    </IgniteButton>
                  ) : (
                    <IgniteButton 
                      variant="primary" 
                      onClick={handleSubmit} 
                      className={`flex-[2] min-h-[56px] py-0 flex items-center justify-center ${!formData.paymentProofUrl ? 'opacity-40 cursor-not-allowed' : ''}`}
                      loading={regMutation.isPending}
                      disabled={!formData.paymentProofUrl}
                    >
                      <span className="uppercase">Complete Registration</span> <Zap size={16} className="ml-3 shrink-0" />
                    </IgniteButton>
                  )}
                </div>

                {step === 4 && !formData.paymentProofUrl && (
                  <div className="text-center font-mono text-[9px] text-fire uppercase tracking-[2px] animate-pulse">
                    Upload payment screenshot above to continue
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {step === 5 && submitResult && (
          <div className="animate-fade-in space-y-12 max-w-2xl mx-auto">
            {submitResult.warning === 'TIME_EXCEEDED' ? (
              /* TIME EXCEEDED STATE */
              <div className="text-center space-y-8">
                <div className="w-24 h-24 bg-red-500/10 text-red-500 flex items-center justify-center rounded-full mx-auto shadow-[0_0_30px_-5px_rgba(239,68,68,0.4)]">
                  <AlertTriangle size={48} />
                </div>
                <div className="space-y-4">
                  <h2 className="font-display text-5xl md:text-7xl text-white tracking-wider uppercase leading-tight">
                    PAYMENT WINDOW<br />EXCEEDED
                  </h2>
                  <div className="font-mono text-red-400 text-xs tracking-[2px] uppercase p-4 border border-red-500/20 bg-red-500/5 max-w-md mx-auto">
                    Screenshot uploaded {submitResult.payment.minutesElapsed} minutes after QR generation. Window limit: 10 mins.
                  </div>
                </div>

                <RegistrationIdCard id={submitResult.registrationId} onCopy={handleCopy} />

                <div className="space-y-6 text-center">
                  <p className="font-mono text-secondary text-[11px] tracking-[1px] uppercase leading-relaxed max-w-sm mx-auto">
                    Your registration has been flagged for manual administrative review. Contact support to rescue this entry.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <IgniteButton 
                      variant="primary" 
                      onClick={() => window.open(`mailto:ignite.techfest@iilm.edu?subject=Payment Window Issue - ${submitResult.registrationId}&body=Reg ID: ${submitResult.registrationId}%0AEvent: ${submitResult.registration.eventId.title}%0AElapsed: ${submitResult.payment.minutesElapsed} minutes%0A-----------------%0APlease help me resolve this.`)}
                      className="bg-red-500 hover:bg-red-600 text-white border-none"
                    >
                       CONTACT SUPPORT
                    </IgniteButton>
                    <IgniteButton variant="ghost" to="/dashboard">VIEW PENDING ENTRY</IgniteButton>
                  </div>
                </div>
              </div>
            ) : (
              /* NORMAL SUCCESS STATE */
              <div className="text-center space-y-10">
                <div className="w-24 h-24 bg-green/10 text-green flex items-center justify-center rounded-full mx-auto shadow-[0_0_30px_-5px_rgba(34,197,94,0.4)] animate-bounce-subtle">
                  <CircleCheck size={48} />
                </div>
                <div className="space-y-3">
                  <h2 className="font-display text-6xl md:text-8xl text-primary tracking-wide uppercase">SUCCESS</h2>
                  <div className="font-mono text-cyan text-[11px] tracking-[4px] uppercase">OPERATIONAL // ENTRY LOGGED</div>
                </div>

                <RegistrationIdCard id={submitResult.registrationId} onCopy={handleCopy} />

                <div className="ignite-card p-6 bg-white/[0.02] border-white/5 space-y-4 text-left font-mono">
                  <div className="grid grid-cols-2 gap-y-4">
                    <div>
                      <label className="text-[8px] text-muted tracking-[2px] uppercase block">Assigned Event</label>
                      <div className="text-sm text-primary uppercase">{submitResult.registration.teamName ? `${formData.selectedEvent.title} (${formData.teamName})` : formData.selectedEvent.title}</div>
                    </div>
                    <div className="text-right">
                      <label className="text-[8px] text-muted tracking-[2px] uppercase block">Linked Accounts</label>
                      <div className="text-sm text-green">{submitResult.teamMembersLinked > 0 ? `${submitResult.teamMembersLinked} MEMBERS RESOLVED` : 'SOLO / INVITES SENT'}</div>
                    </div>
                    <div>
                      <label className="text-[8px] text-muted tracking-[2px] uppercase block">Payment Status</label>
                      <div className="text-sm text-ember uppercase">UNDER REVIEW</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <IgniteButton variant="primary" to="/dashboard">GO TO DASHBOARD</IgniteButton>
                  <IgniteButton variant="ghost" onClick={() => { setStep(1); setFormData(p => ({ ...p, paymentProofUrl: '', transactionId: '', teamMembers: [] })); }}>
                    REGISTER ANOTHER EVENT
                  </IgniteButton>
                </div>
                <p className="font-mono text-[9px] text-muted uppercase tracking-[1.5px]">A confirmation bundle has been dispatched to your email</p>
              </div>
            )}
          </div>
        )}
      </div>
    </PageTransition>
  );
}

function TeamMemberCard({ index, member, onRemove, onChange, isRequired }) {
  const [checking, setChecking] = useState(false);
  
  const handleBlur = async () => {
    if (!member.email || !member.email.includes('@')) return;
    setChecking(true);
    try {
      const res = await userService.checkEmail(member.email);
      onChange('accountFound', res.data.exists ? res.data.name : false);
    } catch {
      onChange('accountFound', null);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className={`ignite-card p-6 border relative transition-all duration-500 overflow-hidden ${
      isRequired ? 'border-fire/20 bg-fire/[0.02]' : 'border-white/5 bg-void/50'
    }`}>
      {/* Decorative vertical line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isRequired ? 'bg-fire' : 'bg-white/10'}`} />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-8 h-8 flex items-center justify-center font-display text-sm rounded ${
            isRequired ? 'bg-fire text-white' : 'bg-white/5 text-muted'
          }`}>
            {index + 2}
          </div>
          <div>
            <div className="font-mono text-[10px] text-primary tracking-[2px] uppercase">MEMBER {index + 2}</div>
            <div className="font-mono text-[8px] text-muted tracking-[1px] uppercase">
              {isRequired ? '⚡ Core Requirement' : 'Optional Deployment'}
            </div>
          </div>
        </div>
        {!isRequired && (
          <button 
            type="button" 
            onClick={onRemove}
            className="text-muted hover:text-fire font-mono text-[9px] tracking-[2px] flex items-center gap-2 px-3 py-1 border border-white/5 hover:border-fire/20 transition-all uppercase"
          >
            ✕ Terminate
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Full Name" value={member.name} onChange={v => onChange('name', v.toUpperCase())} placeholder="OPERATIVE NAME" />
        <div className="space-y-2">
           <Field label="Email Address" value={member.email} onChange={v => onChange('email', v.toLowerCase())} onBlur={handleBlur} placeholder="EMAIL@SYSTEM.COM" type="email" />
           <div className="h-4 flex items-center gap-2">
              {checking ? (
                <div className="font-mono text-[8px] text-muted animate-pulse">SEARCHING DIRECTORY...</div>
              ) : member.accountFound ? (
                <div className="font-mono text-[8px] text-green flex items-center gap-1.5 bg-green/5 px-2 py-0.5 border border-green/20 rounded-full">
                   <MailCheck size={10} /> IGNITE ACCOUNT FOUND: {member.accountFound.toUpperCase()}
                </div>
              ) : member.accountFound === false ? (
                <div className="font-mono text-[8px] text-secondary flex items-center gap-1.5 bg-white/5 px-2 py-0.5 border border-white/10 rounded-full">
                   <Mail size={10} /> NO ACCOUNT — INVITE WILL BE DISPATCHED
                </div>
              ) : null}
           </div>
        </div>
        <Field label="Phone Number" value={member.phone} onChange={v => onChange('phone', v)} placeholder="+91 XXXXXXXXXX" />
        <Field label="College Name" value={member.college} onChange={v => onChange('college', v.toUpperCase())} placeholder="UNIVERSITY SECTOR" />
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", onBlur }) {
  return (
    <div className="space-y-1.5">
      <label className="font-ui text-[9px] text-muted tracking-[2px] uppercase block">{label}</label>
      <input 
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full bg-[#050508] border border-white/10 focus:border-fire/40 outline-none px-4 py-3 font-mono text-xs text-primary transition-all tracking-[1.5px]"
      />
    </div>
  );
}

function RegistrationIdCard({ id, onCopy }) {
  return (
    <div className="p-8 bg-[#0A0A15] border border-fire/20 shadow-[0_0_40px_-5px_rgba(255,85,0,0.15)] max-w-sm mx-auto group">
      <div className="font-mono text-[10px] text-muted tracking-[5px] uppercase mb-4 text-center">Your Registration ID</div>
      <div className="flex items-center justify-between gap-6 px-6 py-4 bg-void border border-white/10">
        <div className="font-display text-4xl text-fire tracking-[4px]">{id}</div>
        <button 
          onClick={() => onCopy(id)}
          className="p-3 text-muted hover:text-fire hover:bg-fire/5 border border-white/5 hover:border-fire/20 transition-all rounded-sm"
        >
          <Copy size={20} />
        </button>
      </div>
    </div>
  );
}
