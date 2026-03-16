import { useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import { Mail, MapPin, Users, MessageSquare, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { db } from '../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

export default function Support() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name) return toast.error('Full Name is required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error('Valid email is required');
    if (!formData.subject) return toast.error('Subject is required');
    if (formData.message.length < 10) return toast.error('Message must be at least 10 characters');

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'contactQueries'), {
        ...formData,
        status: 'open',
        createdAt: serverTimestamp()
      });
      setSubmitting(false);
      setSubmitted(true);
      toast.success('Message sent successfully');
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitting(false);
      toast.error('Failed to send. Please email us directly at ignite.techfest@iilm.edu');
    }
  };

  return (
    <PageTransition>
      <div className="relative z-10 pt-[120px] px-6 md:px-12 pb-20 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[9px] text-fire uppercase tracking-[3px]">IGNITE 2026 // SUPPORT</span>
          </div>
          <h1 className="font-display text-[48px] md:text-[96px] leading-none text-white uppercase mb-4">
            GET IN TOUCH
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16">
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-4 space-y-10">
            <p className="font-mono text-xs text-secondary leading-relaxed uppercase tracking-wider">
              For registration issues, payment queries, event rules, or sponsorship enquiries contact us through the channels below.
            </p>

            <div className="space-y-3">
              {/* Card 1: Email */}
              <a href="mailto:ignite.techfest@iilm.edu" className="flex items-center gap-4 p-4 bg-card border border-white/5 hover:border-fire/40 transition-all group">
                <div className="w-11 h-11 bg-fire flex items-center justify-center flex-shrink-0 text-void">
                  <Mail size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-ui text-[10px] text-fire font-bold uppercase tracking-[3px] mb-1">WRITE TO US</div>
                  <div className="font-mono text-[13px] text-white">ignite.techfest@iilm.edu</div>
                </div>
              </a>

              {/* Card 2: Location */}
              <a href="https://www.google.com/maps/search/IILM+University+Greater+Noida" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 bg-card border border-white/5 hover:border-fire/40 transition-all group">
                <div className="w-11 h-11 bg-fire flex items-center justify-center flex-shrink-0 text-void">
                  <MapPin size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-ui text-[10px] text-fire font-bold uppercase tracking-[3px] mb-1">FIND US</div>
                  <div className="font-mono text-[13px] text-white">IILM University, Knowledge Park II<br/>Greater Noida, UP 201306</div>
                </div>
              </a>

              {/* Card 3: Team */}
              <a href="/team" className="flex items-center gap-4 p-4 bg-card border border-white/5 hover:border-fire/40 transition-all group">
                <div className="w-11 h-11 bg-fire flex items-center justify-center flex-shrink-0 text-void">
                  <Users size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-ui text-[10px] text-fire font-bold uppercase tracking-[3px] mb-1">COORDINATOR CONTACTS</div>
                  <div className="font-mono text-[13px] text-white">View event coordinators →</div>
                </div>
              </a>

              {/* Card 4: Live Support */}
              <a href="/support" className="flex items-center gap-4 p-4 bg-card border border-white/5 hover:border-cyan/40 transition-all group">
                <div className="w-11 h-11 bg-fire flex items-center justify-center flex-shrink-0 text-void">
                  <MessageSquare size={20} />
                </div>
                <div className="flex-1">
                  <div className="font-ui text-[10px] text-fire font-bold uppercase tracking-[3px] mb-1">LIVE SUPPORT</div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,136,0.6)]" />
                    <div className="font-mono text-[13px] text-white">Chat with our team</div>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6">
            <div className="font-mono text-[9px] text-fire uppercase tracking-[4px] mb-8">SEND A QUERY</div>

            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white/[0.02] border border-white/5">
                <CheckCircle2 size={56} className="text-green-500 mb-6" />
                <h2 className="font-display text-4xl text-white uppercase mb-4">MESSAGE SENT</h2>
                <div className="font-mono text-xs text-secondary leading-relaxed max-w-sm mb-10">
                  WE WILL REPLY TO {formData.email.toUpperCase()} SHORTLY.<br/>OUR SUPPORT TEAM IS AVAILABLE DURING FEST HOURS.
                </div>
                <button 
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                  className="font-ui text-[12px] font-bold text-white border border-white/20 px-8 py-3 hover:bg-white/5 transition-all uppercase tracking-[2px]"
                >
                  SEND ANOTHER QUERY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] text-white/40 uppercase tracking-[3px] block">FULL NAME</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-white/5 p-4 font-mono text-sm text-white focus:border-fire/60 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-[9px] text-white/40 uppercase tracking-[3px] block">EMAIL ADDRESS</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/40 border border-white/5 p-4 font-mono text-sm text-white focus:border-fire/60 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[9px] text-white/40 uppercase tracking-[3px] block">SUBJECT</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/5 p-4 font-mono text-sm text-white focus:border-fire/60 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-mono text-[9px] text-white/40 uppercase tracking-[3px] block">MESSAGE</label>
                  <textarea 
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/5 p-4 font-mono text-sm text-white focus:border-fire/60 outline-none transition-all resize-none"
                  />
                </div>

                <div>
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-fire text-void font-display text-xl py-4 flex items-center justify-center gap-3 hover:bg-fire/90 active:scale-[0.99] transition-all disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span>SENDING...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>
                  <div className="font-mono text-[10px] text-muted text-center mt-4 tracking-widest uppercase">
                    We typically respond within 2-4 hours during the fest.
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
