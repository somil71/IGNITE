import { useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import ScrambleText from '../components/ui/ScrambleText';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import toast from 'react-hot-toast';

export default function Contact() {
  const reveal = useScrollReveal();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      toast.success('QUERY SUBMITTED SUCCESSFULLY. WE WILL GET BACK TO YOU.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1500);
  };

  return (
    <PageTransition className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="font-display text-5xl md:text-8xl text-primary mb-4 tracking-[6px]">
            <ScrambleText text="CONTACT US" />
          </h1>
          <p className="font-mono text-secondary tracking-[4px] text-xs md:text-sm uppercase flex items-center gap-3">
             <span className="w-12 h-[1px] bg-fire" /> CONNECT WITH THE TEAM
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Info Side */}
          <div ref={reveal} className="space-y-12 reveal-element">
            <div className="space-y-6">
              <h3 className="font-display text-3xl text-primary tracking-widest uppercase">GET IN TOUCH</h3>
              <p className="font-mono text-sm text-secondary leading-relaxed uppercase tracking-[1px]">
                Have questions about registrations, event rules, or sponsorships? Reach out to us through any of the following channels.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex gap-6 items-start group">
                <div className="p-4 bg-fire/10 border border-fire/20 text-fire group-hover:bg-fire group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="font-ui text-sm text-primary font-bold tracking-wider mb-1 uppercase">EMAIL US</div>
                  <div className="font-mono text-[11px] text-secondary">ignite.techfest@iilm.edu</div>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="p-4 bg-cyan/10 border border-cyan/20 text-cyan group-hover:bg-cyan group-hover:text-void transition-all">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="font-ui text-sm text-primary font-bold tracking-wider mb-1 uppercase">CALL HELPLINE</div>
                  <div className="font-mono text-[11px] text-secondary">+91 99999 99999</div>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="p-4 bg-muted/10 border border-muted/20 text-muted group-hover:bg-primary group-hover:text-void transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="font-ui text-sm text-primary font-bold tracking-wider mb-1 uppercase">LOCATION</div>
                  <div className="font-mono text-[11px] text-secondary">IILM University, Greater Noida, UP</div>
                </div>
              </div>
            </div>
          </div>

          {/* Query Area */}
          <div className="ignite-card p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <MessageSquare size={120} />
            </div>
            
            <h3 className="font-display text-3xl text-primary tracking-widest uppercase mb-8">QUERY AREA</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="ignite-label">FULL NAME</label>
                  <input
                    type="text"
                    required
                    className="ignite-input"
                    placeholder="ENTER NAME"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="ignite-label">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    className="ignite-input"
                    placeholder="ENTER EMAIL"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="ignite-label">SUBJECT</label>
                <input
                  type="text"
                  required
                  className="ignite-input"
                  placeholder="WHAT IS YOUR QUERY ABOUT?"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="ignite-label">MESSAGE</label>
                <textarea
                  required
                  rows={4}
                  className="ignite-input resize-none"
                  placeholder="DESCRIBE YOUR REQUEST..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="ignite-btn ignite-btn-primary w-full py-4 flex items-center justify-center gap-3"
              >
                <span>{loading ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
                {!loading && <Send size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
