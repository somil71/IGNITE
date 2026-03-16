import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, MapPin, Users, MessageSquare, Send, Loader2, 
  CircleCheck, ChevronRight 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import PageTransition from '../components/layout/PageTransition';
import ScrambleText from '../components/ui/ScrambleText';

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name.trim()) return toast.error('Please enter your name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return toast.error('Please enter a valid email');
    if (!form.subject.trim()) return toast.error('Please enter a subject');
    if (form.message.trim().length < 20) return toast.error('Please describe your query in more detail');

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'contactQueries'), {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        status: 'open',
        source: 'contact-page',
        createdAt: serverTimestamp()
      });
      setSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      setSubmitting(false);
      console.error('Contact form error:', error);
      toast.error('Failed to send. Please email us directly at ignite.techfest@iilm.edu');
    }
  };

  const fieldWrapperStyle = "flex flex-col gap-2 mb-5";
  const labelStyle = "font-mono text-[9px] text-white/35 uppercase tracking-[0.3em]";
  const inputStyle = (fieldName) => `
    w-full bg-black/40 border outline-none
    font-mono text-[13px] text-white box-border transition-all duration-200
    ${focused === fieldName ? 'border-orange-500/60' : 'border-white/10'}
    placeholder:text-white/20 px-4 py-3
  `;

  return (
    <PageTransition className="relative z-1 min-h-screen pb-20">
      {/* SECTION A — HERO HEADER */}
      <section className="contact-hero-section bg-surface border-b border-white/5 pt-[120px] px-[48px] pb-[60px] relative overflow-hidden">
        {/* Ghost Text Watermark */}
        <div className="absolute bottom-[-5%] right-[-5%] font-display text-[20vw] text-fire/[0.03] pointer-events-none select-none z-0 leading-none">
          CONTACT
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-[1px] bg-fire" />
            <span className="font-mono text-[9px] text-fire uppercase tracking-[0.4em]">IGNITE 2026 // SUPPORT OPERATIONS</span>
          </div>

          <h1 className="font-display text-[clamp(56px,9vw,110px)] text-white uppercase leading-[0.9] mb-5">
            <ScrambleText text="GET IN TOUCH" />
          </h1>

          <p className="font-mono text-[13px] text-secondary leading-relaxed max-w-[560px]">
            For registration issues, payment queries, event rules, or sponsorship enquiries — our team is available throughout the fest duration.
          </p>
        </div>
      </section>

      {/* SECTION B — MAIN CONTENT */}
      <main className="contact-grid-main px-[48px] py-[64px] grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-[64px]">
        
        {/* LEFT COLUMN — Contact channels */}
        <div>
          <div className="font-mono text-[9px] text-fire uppercase tracking-[0.3em] mb-5">REACH US THROUGH</div>
          
          <div className="flex flex-col gap-[10px]">
            {/* CARD 1 — Email */}
            <a href="mailto:ignite.techfest@iilm.edu" className="flex items-center gap-[16px] p-[18px_20px] bg-card border border-white/5 hover:border-fire/40 hover:bg-elevated hover:translate-x-[6px] transition-all duration-250 group">
              <div className="w-[46px] h-[46px] flex-shrink-0 bg-fire/10 border border-fire/25 flex items-center justify-center group-hover:bg-fire/20 transition-all">
                <Mail size={20} className="text-fire" />
              </div>
              <div className="flex-1">
                <div className="font-ui text-[10px] text-fire font-bold uppercase tracking-[0.25em] mb-1">WRITE TO US</div>
                <div className="font-mono text-[13px] text-white">ignite.techfest@iilm.edu</div>
              </div>
              <ChevronRight size={14} className="text-white/20 group-hover:text-fire group-hover:translate-x-[3px] transition-all" />
            </a>

            {/* CARD 2 — Location */}
            <a href="https://maps.google.com/?q=IILM+University+Knowledge+Park+II+Greater+Noida" target="_blank" rel="noopener noreferrer" className="flex items-center gap-[16px] p-[18px_20px] bg-card border border-white/5 hover:border-fire/40 hover:bg-elevated hover:translate-x-[6px] transition-all duration-250 group">
              <div className="w-[46px] h-[46px] flex-shrink-0 bg-fire/10 border border-fire/25 flex items-center justify-center group-hover:bg-fire/20 transition-all">
                <MapPin size={20} className="text-fire" />
              </div>
              <div className="flex-1">
                <div className="font-ui text-[10px] text-fire font-bold uppercase tracking-[0.25em] mb-1">FIND US</div>
                <div className="font-mono text-[13px] text-white">IILM University, Knowledge Park II</div>
                <div className="font-mono text-[11px] text-white/50">Greater Noida, Uttar Pradesh 201306</div>
              </div>
              <ChevronRight size={14} className="text-white/20 group-hover:text-fire group-hover:translate-x-[3px] transition-all" />
            </a>

            {/* CARD 3 — Coordinators */}
            <Link to="/team" className="flex items-center gap-[16px] p-[18px_20px] bg-card border border-white/5 hover:border-fire/40 hover:bg-elevated hover:translate-x-[6px] transition-all duration-250 group">
              <div className="w-[46px] h-[46px] flex-shrink-0 bg-fire/10 border border-fire/25 flex items-center justify-center group-hover:bg-fire/20 transition-all">
                <Users size={20} className="text-fire" />
              </div>
              <div className="flex-1">
                <div className="font-ui text-[10px] text-fire font-bold uppercase tracking-[0.25em] mb-1">COORDINATOR CONTACTS</div>
                <div className="font-mono text-[13px] text-white">View event coordinators →</div>
              </div>
              <ChevronRight size={14} className="text-white/20 group-hover:text-fire group-hover:translate-x-[3px] transition-all" />
            </Link>

            {/* CARD 4 — Live Support */}
            <Link to="/support" className="flex items-center gap-[16px] p-[18px_20px] bg-card border border-white/5 hover:border-cyan/40 hover:bg-elevated hover:translate-x-[6px] transition-all duration-250 group">
              <div className="w-[46px] h-[46px] flex-shrink-0 bg-cyan/10 border border-cyan/25 flex items-center justify-center group-hover:bg-cyan/20 transition-all">
                <MessageSquare size={20} className="text-cyan" />
              </div>
              <div className="flex-1">
                <div className="font-ui text-[10px] text-cyan font-bold uppercase tracking-[0.25em] mb-1">LIVE SUPPORT CHAT</div>
                <div className="flex items-center">
                   <span className="w-2 h-2 rounded-full bg-[#00FF94] animate-[dotPulse_2s_infinite] mr-1.5" />
                   <div className="font-mono text-[13px] text-white">Available during fest hours</div>
                </div>
                <div className="font-mono text-[11px] text-white/50">Chat with our team</div>
              </div>
              <ChevronRight size={14} className="text-white/20 group-hover:text-cyan group-hover:translate-x-[3px] transition-all" />
            </Link>
          </div>

          <div className="mt-8">
            <div className="font-mono text-[9px] text-fire uppercase tracking-[0.3em] mb-4">QUICK ANSWERS</div>
            <div className="flex flex-col border-white/5">
              {[
                { q: "How do I register for an event?", path: "/support?q=registration" },
                { q: "My payment was rejected — what do I do?", path: "/support?q=payment" },
                { q: "How do I join my event WhatsApp group?", path: "/support?q=whatsapp" }
              ].map((item, idx) => (
                <Link key={idx} to={item.path} className="flex items-center gap-2.5 py-2.5 border-b border-white/5 text-white/60 hover:text-white transition-colors group">
                  <div className="w-1 h-1 bg-fire" />
                  <span className="font-mono text-[11px] uppercase tracking-wide">{item.q}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — Query Form */}
        <div className="bg-card border border-white/5 p-10">
          <div className="font-mono text-[9px] text-fire uppercase tracking-[0.3em] mb-2">SEND A QUERY</div>
          <div className="font-mono text-[11px] text-white/35 mb-8">We typically respond within 2-4 hours during fest hours.</div>
          
          {submitted ? (
            <div className="py-10 text-center animate-fade-in">
              <CircleCheck size={56} className="text-[#00FF94] mx-auto mb-5" />
              <h2 className="font-display text-[40px] text-white uppercase mb-3">MESSAGE SENT</h2>
              <p className="font-mono text-[12px] text-white/50 leading-relaxed max-w-[360px] mx-auto">
                We received your message and will reply to <span className="text-fire">{form.email}</span> shortly. Our team is available throughout fest hours.
              </p>
              <button 
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                className="mt-8 border border-white/10 font-ui font-bold text-[14px] text-white uppercase tracking-[0.15em] px-6 py-2.5 hover:bg-white/5 transition-all"
              >
                SEND ANOTHER QUERY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={fieldWrapperStyle}>
                  <label className={labelStyle}>FULL NAME</label>
                  <input 
                    type="text"
                    placeholder="Your full name"
                    className={inputStyle('name')}
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div className={fieldWrapperStyle}>
                  <label className={labelStyle}>EMAIL ADDRESS</label>
                  <input 
                    type="email"
                    placeholder="your@email.com"
                    className={inputStyle('email')}
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              <div className={fieldWrapperStyle}>
                <label className={labelStyle}>SUBJECT</label>
                <input 
                  type="text"
                  placeholder="What is your query about?"
                  className={inputStyle('subject')}
                  value={form.subject}
                  onChange={(e) => setForm({...form, subject: e.target.value})}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <div className={fieldWrapperStyle}>
                <label className={labelStyle}>MESSAGE</label>
                <textarea 
                  placeholder="Describe your issue or question in detail..."
                  className={`${inputStyle('message')} min-h-[140px] resize-y`}
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className={`
                  w-full h-[56px] mt-2 bg-fire text-black font-display text-[18px] tracking-[0.1em]
                  flex items-center justify-center gap-[10px] transition-all duration-200
                  ${submitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-fire/90 hover:translate-y-[-1px]'}
                `}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>SEND MESSAGE</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>
    </PageTransition>
  );
}
