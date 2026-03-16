import { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase/config';
import { 
  collection, addDoc, query, orderBy, onSnapshot, 
  serverTimestamp, limit 
} from 'firebase/firestore';
import { useAuth } from '../../hooks/useAuth';
import { Send, Loader2 } from 'lucide-react';

export default function SupportChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'supportRequests', user.uid, 'messages'),
      orderBy('createdAt', 'asc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      setLoading(false);
      
      // Auto-scroll
      setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, 'supportRequests', user.uid, 'messages'), {
        text: newMessage,
        sender: 'user',
        senderName: user.name,
        createdAt: serverTimestamp(),
        read: false
      });
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-[400px] border border-[var(--border-subtle)] bg-surface/20">
      <Loader2 size={24} className="animate-spin text-fire mb-2" />
      <span className="font-mono text-[9px] text-muted tracking-[2px] uppercase">Connecting to support...</span>
    </div>
  );

  return (
    <div className="flex flex-col h-[600px] ignite-card overflow-hidden border-fire/20">
      {/* Header */}
      <div className="p-4 border-b border-[var(--border-subtle)] bg-fire/5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green animate-pulse" />
          <span className="font-mono text-[10px] text-primary tracking-[2px] uppercase">Live Support Terminal</span>
        </div>
        <span className="font-mono text-[8px] text-muted uppercase">Encrypted Sector</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
            <div className="font-display text-xl text-muted mb-2 uppercase italic tracking-widest">No messages yet</div>
            <p className="font-mono text-[9px] text-muted uppercase tracking-[1px]">Send a message to start a ticket</p>
          </div>
        ) : (
          messages.map((m) => (
            <div 
              key={m.id} 
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] space-y-1 ${m.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-4 font-mono text-xs leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-fire/10 border border-fire/30 text-primary' 
                    : 'bg-elevated border border-[var(--border-subtle)] text-secondary'
                }`}>
                  {m.text}
                </div>
                <div className="font-mono text-[8px] text-muted uppercase tracking-[1px] px-1">
                  {m.sender === 'user' ? 'YOU' : 'IGNITE MODERATOR'} • {m.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--border-subtle)] bg-surface/50 flex gap-4">
        <input
          type="text"
          placeholder="TYPE MESSAGE..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-void border border-[var(--border-subtle)] focus:border-fire/50 outline-none px-4 py-3 font-mono text-xs tracking-[1px] text-primary"
        />
        <button 
          type="submit" 
          disabled={!newMessage.trim()}
          className="w-12 h-12 flex items-center justify-center bg-fire/10 border border-fire/30 text-fire hover:bg-fire font-bold hover:text-white transition-all disabled:opacity-50"
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
