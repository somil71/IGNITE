import { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase/config';
import { 
  collection, query, orderBy, onSnapshot, 
  addDoc, serverTimestamp, updateDoc, doc 
} from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import ScrambleText from '../../components/ui/ScrambleText';
import IgniteButton from '../../components/ui/IgniteButton';
import { 
  MessageSquare, User, Clock, 
  Send, Loader2 
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminSupport() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [filter, setFilter] = useState('open'); // open, resolved, all
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  // Fetch Tickets
  useEffect(() => {
    const q = query(
      collection(db, 'supportRequests'),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ticketList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTickets(ticketList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Fetch Messages for Selected Ticket
  useEffect(() => {
    if (!selectedTicket) return;

    const q = query(
      collection(db, 'supportRequests', selectedTicket.id, 'messages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });

    return () => unsubscribe();
  }, [selectedTicket]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!reply.trim() || !selectedTicket) return;

    try {
      // Add message
      await addDoc(collection(db, 'supportRequests', selectedTicket.id, 'messages'), {
        text: reply,
        sender: 'admin',
        senderName: user.name,
        createdAt: serverTimestamp(),
        read: false
      });

      // Update ticket updatedAt and unread status
      await updateDoc(doc(db, 'supportRequests', selectedTicket.id), {
        updatedAt: serverTimestamp(),
        lastMessage: reply,
        status: 'open'
      });

      setReply('');
    } catch (err) {
      toast.error('Failed to send reply');
      console.error(err);
    }
  };

  const toggleStatus = async (ticket) => {
    const newStatus = ticket.status === 'open' ? 'resolved' : 'open';
    try {
      await updateDoc(doc(db, 'supportRequests', ticket.id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      toast.success(`Ticket marked as ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const filteredTickets = tickets.filter(t => 
    filter === 'all' || t.status === filter
  );

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col animate-fade-in">
      <header className="pb-8 border-b border-fire/10 flex justify-between items-end">
        <div>
          <h1 className="font-display text-4xl text-primary tracking-[4px] mb-1 uppercase">
            <ScrambleText text="SUPPORT INBOX" />
          </h1>
          <p className="font-mono text-secondary text-[10px] tracking-[3px] uppercase">
             Sector 7 // Real-time Communication Bridge
          </p>
        </div>
        <div className="flex bg-[#0A0A15] border border-white/5 p-1 rounded-sm">
          {['all', 'open', 'resolved'].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 font-ui text-[9px] tracking-[2px] uppercase transition-all ${
                filter === s ? 'bg-fire text-white' : 'text-muted hover:text-primary'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden pt-8 gap-8">
        {/* Ticket List */}
        <div className="w-[380px] flex flex-col gap-4 overflow-y-auto no-scrollbar pb-8">
          {loading ? (
             <div className="flex flex-col items-center justify-center h-40 opacity-20">
                <Loader2 size={32} className="animate-spin mb-4" />
                <div className="font-mono text-[10px] uppercase tracking-[3px]">Mapping Tickets...</div>
             </div>
          ) : filteredTickets.length === 0 ? (
             <div className="text-center py-20 opacity-40 italic font-mono text-xs">NO TICKETS IN THIS SECTOR</div>
          ) : (
            filteredTickets.map(t => (
              <div 
                key={t.id}
                onClick={() => setSelectedTicket(t)}
                className={`ignite-card p-5 cursor-pointer transition-all border-l-4 group ${
                  selectedTicket?.id === t.id 
                    ? 'border-l-fire bg-fire/5 bg-[#1A1A25]' 
                    : t.status === 'open' ? 'border-l-cyan bg-surface/40 hover:bg-elevated/60' : 'border-l-muted bg-surface/20'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                   <div className="font-display text-lg text-primary group-hover:text-fire transition-colors uppercase tracking-wider">{t.userName}</div>
                   <div className={`px-2 py-0.5 font-mono text-[8px] border ${
                     t.status === 'open' ? 'border-cyan text-cyan' : 'border-muted text-muted'
                   }`}>
                     {t.status.toUpperCase()}
                   </div>
                </div>
                <div className="font-mono text-[10px] text-muted truncate mb-3">{t.lastMessage || 'NEW TICKET CREATED'}</div>
                <div className="flex justify-between items-center text-[8px] font-mono text-muted/60 uppercase tracking-[1px]">
                   <div className="flex items-center gap-1"><Clock size={10} /> {t.updatedAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                   <div>{t.userEmail}</div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col ignite-card overflow-hidden border-fire/10 bg-[#0A0A10]/50 relative">
          {selectedTicket ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-white/5 bg-fire/5 flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan">
                       <User size={20} />
                    </div>
                    <div>
                       <div className="font-display text-xl text-primary uppercase">{selectedTicket.userName}</div>
                       <div className="font-mono text-[9px] text-muted uppercase tracking-[1px]">{selectedTicket.userEmail}</div>
                    </div>
                 </div>
                 <IgniteButton 
                   variant="ghost" 
                   onClick={() => toggleStatus(selectedTicket)}
                   className={`text-[10px] px-6 ${selectedTicket.status === 'open' ? 'text-green border-green/20 hover:bg-green/10' : 'text-ember border-ember/20 hover:bg-ember/10'}`}
                 >
                   {selectedTicket.status === 'open' ? 'MARK RESOLVED ✓' : 'REOPEN TICKET ↺'}
                 </IgniteButton>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-8 space-y-8">
                 {messages.map((m, i) => (
                   <div key={m.id || i} className={`flex ${m.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] space-y-2 ${m.sender === 'admin' ? 'items-end' : 'items-start'}`}>
                         <div className={`p-4 font-mono text-xs leading-relaxed ${
                           m.sender === 'admin' 
                             ? 'bg-fire/10 border border-fire/30 text-primary rounded-l-md rounded-tr-md' 
                             : 'bg-elevated border border-white/10 text-secondary rounded-r-md rounded-tl-md'
                         }`}>
                           {m.text}
                         </div>
                         <div className="font-mono text-[8px] text-muted/50 uppercase tracking-[2px] px-1">
                            {m.sender === 'admin' ? 'YOU' : m.senderName} • {m.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         </div>
                      </div>
                   </div>
                 ))}
                 <div ref={scrollRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleReply} className="p-6 border-t border-white/5 bg-void/30 flex gap-4">
                 <input 
                   type="text"
                   value={reply}
                   onChange={e => setReply(e.target.value)}
                   placeholder="TYPE ENCRYPTED REPLY..."
                   className="flex-1 bg-void border border-white/10 focus:border-fire/50 outline-none px-6 py-4 font-mono text-xs text-primary"
                 />
                 <button 
                   type="submit"
                   disabled={!reply.trim()}
                   className="w-14 h-14 bg-fire/10 border border-fire/30 text-fire hover:bg-fire hover:text-white flex items-center justify-center transition-all disabled:opacity-30"
                 >
                   <Send size={20} />
                 </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center opacity-20 text-center p-20 select-none">
               <MessageSquare size={120} className="mb-8" />
               <div className="font-display text-4xl tracking-[8px] mb-4">TERMINAL IDLE</div>
               <div className="font-mono text-[10px] uppercase tracking-[4px]">Select a communication sector to begin transmission</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
