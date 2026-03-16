import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import PageTransition from '../components/layout/PageTransition';

const GALLERY_ITEMS = [
  { id:1, seed:'ignite01', title:'Robo War Semifinals', category:'Technical', ref:'IGN-2025-0001' },
  { id:2, seed:'ignite02', title:'Drone Racing Arena', category:'Technical', ref:'IGN-2025-0002' },
  { id:3, seed:'ignite03', title:'Hackathon Build Phase', category:'Technical', ref:'IGN-2025-0003' },
  { id:4, seed:'ignite04', title:'Debug X Finals', category:'Technical', ref:'IGN-2025-0004' },
  { id:5, seed:'ignite05', title:'Bharat Bot Expo', category:'Technical', ref:'IGN-2025-0005' },
  { id:6, seed:'ignite06', title:'Forensic Files Round 2', category:'Technical', ref:'IGN-2025-0006' },
  { id:7, seed:'ignite07', title:'Tech Meme War Finale', category:'Creative', ref:'IGN-2025-0007' },
  { id:8, seed:'ignite08', title:'Digital Storytelling', category:'Creative', ref:'IGN-2025-0008' },
  { id:9, seed:'ignite09', title:'CineTech Cover Live', category:'Creative', ref:'IGN-2025-0009' },
  { id:10, seed:'ignite10', title:'Marketing Mantra', category:'Creative', ref:'IGN-2025-0010' },
  { id:11, seed:'ignite11', title:'Penetrix Writing', category:'Creative', ref:'IGN-2025-0011' },
  { id:12, seed:'ignite12', title:'Tech Trail Showcase', category:'Creative', ref:'IGN-2025-0012' },
  { id:13, seed:'ignite13', title:'Squid Dangal 2.0', category:'Fun', ref:'IGN-2025-0013' },
  { id:14, seed:'ignite14', title:'Shark Tank Pitching', category:'Fun', ref:'IGN-2025-0014' },
  { id:15, seed:'ignite15', title:'E-Ranbhoomi Finals', category:'Fun', ref:'IGN-2025-0015' },
  { id:16, seed:'ignite16', title:'Escape Room Challenge', category:'Fun', ref:'IGN-2025-0016' },
  { id:17, seed:'ignite17', title:'Samvad Group Discussion', category:'Fun', ref:'IGN-2025-0017' },
  { id:18, seed:'ignite18', title:'Bharat Bolta Hai', category:'Fun', ref:'IGN-2025-0018' },
  { id:19, seed:'ignite19', title:'Opening Ceremony', category:'Campus', ref:'IGN-2025-0019' },
  { id:20, seed:'ignite20', title:'Prize Distribution', category:'Campus', ref:'IGN-2025-0020' },
  { id:21, seed:'ignite21', title:'Crowd Energy', category:'Campus', ref:'IGN-2025-0021' },
  { id:22, seed:'ignite22', title:'Team Coordinators', category:'Campus', ref:'IGN-2025-0022' },
  { id:23, seed:'ignite23', title:'Campus Decorations', category:'Campus', ref:'IGN-2025-0023' },
  { id:24, seed:'ignite24', title:'Closing Night', category:'Campus', ref:'IGN-2025-0024' },
];

const fullSrc = (seed) => `https://picsum.photos/seed/${seed}/900/600`;
const thumbSrc = (seed) => `https://picsum.photos/seed/${seed}/400/267`;

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedId, setSelectedId] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxId, setLightboxId] = useState(null);

  const stripRef = useRef(null);
  const trackRef = useRef(null);
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    currentX: 0,
    lastX: 0
  });

  const CATEGORIES = ['All', 'Technical', 'Creative', 'Fun', 'Campus'];

  const filtered = useMemo(() =>
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(i => i.category === activeCategory),
    [activeCategory]
  );

  const selectedItem = GALLERY_ITEMS.find(i => i.id === selectedId) || GALLERY_ITEMS[0];
  const selectedIndex = filtered.findIndex(i => i.id === selectedId);

  const clampX = useCallback((x) => {
    if (!trackRef.current || !stripRef.current) return x;
    const trackW = trackRef.current.scrollWidth;
    const stripW = stripRef.current.offsetWidth;
    const maxScroll = Math.max(0, trackW - stripW);
    return Math.min(0, Math.max(-maxScroll, x));
  }, []);

  const applyTransform = useCallback((x) => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(${x}px)`;
  }, []);

  const handleDragStart = useCallback((clientX) => {
    dragState.current.isDragging = true;
    dragState.current.startX = clientX;
    
    // Parse current transform safely using regex if WebKitCSSMatrix is problematic
    const style = window.getComputedStyle(trackRef.current);
    const matrix = style.transform || style.webkitTransform;
    let lastX = 0;
    if (matrix && matrix !== 'none') {
      const values = matrix.match(/matrix.*\((.+)\)/);
      if (values) {
        const parts = values[1].split(', ');
        lastX = parseFloat(parts[4] || parts[12] || 0);
      }
    }
    dragState.current.lastX = lastX;
    
    if (stripRef.current) stripRef.current.style.cursor = 'grabbing';
  }, []);

  const handleDragMove = useCallback((clientX) => {
    if (!dragState.current.isDragging) return;
    const delta = clientX - dragState.current.startX;
    const newX = clampX(dragState.current.lastX + delta);
    dragState.current.currentX = newX;
    applyTransform(newX);
  }, [clampX, applyTransform]);

  const handleDragEnd = useCallback(() => {
    if (!dragState.current.isDragging) return;
    dragState.current.isDragging = false;
    if (stripRef.current) stripRef.current.style.cursor = 'grab';
  }, []);

  useEffect(() => {
    const onMouseMove = (e) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();
    const onTouchMove = (e) => handleDragMove(e.touches[0].clientX);
    const onTouchEnd = () => handleDragEnd();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleDragMove, handleDragEnd]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxOpen) {
        if (e.key === 'ArrowLeft') {
          const idx = GALLERY_ITEMS.findIndex(i => i.id === lightboxId);
          if (idx > 0) setLightboxId(GALLERY_ITEMS[idx - 1].id);
        } else if (e.key === 'ArrowRight') {
          const idx = GALLERY_ITEMS.findIndex(i => i.id === lightboxId);
          if (idx < GALLERY_ITEMS.length - 1) setLightboxId(GALLERY_ITEMS[idx + 1].id);
        } else if (e.key === 'Escape') {
          setLightboxOpen(false);
        }
        return;
      }

      if (e.key === 'ArrowLeft') {
        const idx = filtered.findIndex(i => i.id === selectedId);
        if (idx > 0) setSelectedId(filtered[idx - 1].id);
      } else if (e.key === 'ArrowRight') {
        const idx = filtered.findIndex(i => i.id === selectedId);
        if (idx < filtered.length - 1) setSelectedId(filtered[idx + 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, filtered, lightboxOpen, lightboxId]);

  return (
    <PageTransition className="relative z-1 min-h-screen">
      <div className="pt-[120px] px-6 md:px-[48px] pb-[48px]">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-[1px] bg-fire" />
          <span className="font-mono text-[9px] text-fire uppercase tracking-[0.4em]">—— IGNITE 2026 // VISUAL ARCHIVE</span>
        </div>
        <h1 className="font-display text-[clamp(64px,10vw,120px)] text-white uppercase leading-none">GALLERY</h1>
        <p className="font-mono text-[12px] text-secondary mt-2">Moments captured from the fest</p>
      </div>

      {/* CATEGORY FILTER BAR */}
      <div className="px-6 md:px-[48px] mb-8 flex gap-2 flex-wrap">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setSelectedId(GALLERY_ITEMS.find(i => cat === 'All' || i.category === cat).id); }}
            className={`
              px-5 py-2 font-ui font-bold text-[12px] uppercase tracking-[0.15em] border transition-all duration-200
              ${activeCategory === cat 
                ? 'bg-fire border-fire text-black' 
                : 'bg-transparent border-white/10 text-white/50 hover:text-white hover:border-white/30'}
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FILM STRIP SECTION */}
      <div className="w-full relative mb-12">
        <div className="film-hole-strip top-strip" />
        
        <div 
          ref={stripRef}
          className="w-full bg-[#0A0A0A] py-3 overflow-hidden cursor-grab touch-none select-none"
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        >
          <div 
            ref={trackRef}
            className="flex gap-1 px-6 md:px-[48px] will-change-transform"
          >
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                onDoubleClick={() => { setLightboxId(item.id); setLightboxOpen(true); }}
                className={`
                  relative shrink-0 w-[160px] md:w-[220px] h-[120px] md:h-[160px] cursor-pointer group
                  ${selectedId === item.id ? 'outline outline-2 outline-fire -outline-offset-2' : ''}
                `}
              >
                <img 
                  src={thumbSrc(item.seed)} 
                  alt={item.title}
                  className={`
                    w-full h-full object-cover transition-all duration-300
                    ${selectedId === item.id ? 'grayscale-0 brightness-100' : 'grayscale-[20%] brightness-75 hover:grayscale-0 hover:brightness-[0.95]'}
                  `}
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-2.5 pt-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                   <div className="font-mono text-[10px] text-white truncate">{item.title}</div>
                </div>
                {selectedId === item.id && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-fire" />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="film-hole-strip bottom-strip" />
      </div>

      {/* FEATURED DISPLAY SECTION */}
      <div className="px-6 md:px-[48px] pb-[48px]">
        <div className="featured-container grid grid-cols-1 lg:grid-cols-[60fr_40fr] border border-white/5 min-h-[480px]">
          {/* LEFT — Photo display */}
          <div className="relative overflow-hidden bg-surface group">
            <img 
              key={selectedItem.id}
              src={fullSrc(selectedItem.seed)} 
              alt={selectedItem.title}
              className="w-full h-full object-cover min-h-[280px] md:min-h-[480px]"
            />
            
            {/* Corner brackets */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-fire/70" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-fire/70" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-fire/70" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-fire/70" />

            <div className="absolute top-4 left-4 bg-black/70 px-2.5 py-1 font-mono text-[8px] text-fire uppercase tracking-[0.3em] z-10">
              IGNITE // VISUAL ARCHIVE
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/92 to-transparent p-8 pt-12">
               <div className="flex items-end justify-between">
                 <div>
                    <h2 className="font-display text-[22px] text-white uppercase">{selectedItem.title}</h2>
                    <div className="font-mono text-[10px] text-white/40 mt-1 uppercase tracking-widest">
                      {String(filtered.indexOf(selectedItem) + 1).padStart(2, '0')}/{String(filtered.length).padStart(2, '0')}
                    </div>
                 </div>
                 <ZoomIn 
                   size={16} 
                   className="text-white/30 hover:text-white/70 cursor-pointer transition-colors" 
                   onClick={() => { setLightboxId(selectedId); setLightboxOpen(true); }}
                 />
               </div>
            </div>
          </div>

          {/* RIGHT — Metadata */}
          <div className="bg-surface border-t lg:border-t-0 lg:border-l border-white/5 p-8 flex flex-col">
            <div className="font-mono text-[8px] text-fire uppercase tracking-[0.3em] mb-6">MISSION BRIEFING</div>
            
            <div className="divide-y divide-white/5">
              {[
                { label: 'SUBJECT', value: selectedItem.title },
                { label: 'CATEGORY', value: selectedItem.category },
                { label: 'REF', value: selectedItem.ref }
              ].map((row, idx) => (
                <div key={idx} className="py-3.5">
                  <div className="font-mono text-[8px] text-fire/70 uppercase tracking-[0.25em] mb-1">{row.label}</div>
                  <div className="font-mono text-[13px] text-white">{row.value}</div>
                </div>
              ))}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center border-y border-white/5 my-6 py-6">
              <div className="font-mono text-[8px] text-fire/70 uppercase tracking-[0.3em] mb-1">FRAME</div>
              <div className="flex items-baseline">
                <span className="font-display text-[80px] text-fire leading-none">{String(selectedIndex + 1).padStart(2, '0')}</span>
                <span className="font-display text-[32px] text-white/20 ml-2">/{String(filtered.length).padStart(2, '0')}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setSelectedId(filtered[selectedIndex - 1].id)}
                disabled={selectedIndex === 0}
                className="flex-1 flex items-center justify-center gap-1.5 p-3 border border-white/5 text-white/50 font-ui font-bold text-[12px] uppercase tracking-[0.15em] hover:border-fire hover:text-white transition-all disabled:opacity-25"
              >
                <ChevronLeft size={14} /> PREV
              </button>
              <button 
                onClick={() => setSelectedId(filtered[selectedIndex + 1].id)}
                disabled={selectedIndex === filtered.length - 1}
                className="flex-1 flex items-center justify-center gap-1.5 p-3 border border-white/5 text-white/50 font-ui font-bold text-[12px] uppercase tracking-[0.15em] hover:border-fire hover:text-white transition-all disabled:opacity-25"
              >
                NEXT <ChevronRight size={14} />
              </button>
            </div>
            <div className="font-mono text-[8px] text-white/20 uppercase tracking-[0.2em] text-center mt-3">DRAG STRIP TO BROWSE</div>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      {lightboxOpen && lightboxId && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <X 
            size={24} 
            className="absolute top-5 right-5 text-white/60 hover:text-white cursor-pointer z-50" 
            onClick={() => setLightboxOpen(false)}
          />
          
          <ChevronLeft 
            size={32} 
            className={`absolute left-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer ${GALLERY_ITEMS.findIndex(i => i.id === lightboxId) === 0 ? 'opacity-0' : ''}`}
            onClick={(e) => { e.stopPropagation(); const idx = GALLERY_ITEMS.findIndex(i => i.id === lightboxId); setLightboxId(GALLERY_ITEMS[idx - 1].id); }}
          />
          
          <div className="flex flex-col items-center" onClick={e => e.stopPropagation()}>
            <img 
               src={fullSrc(GALLERY_ITEMS.find(i => i.id === lightboxId).seed)} 
               alt="Gallery Full"
               className="max-w-[90vw] max-h-[85vh] object-contain"
            />
            <div className="text-center mt-4">
              <div className="font-display text-[20px] text-white uppercase">{GALLERY_ITEMS.find(i => i.id === lightboxId).title}</div>
              <div className="font-mono text-[10px] text-fire uppercase tracking-widest">{GALLERY_ITEMS.find(i => i.id === lightboxId).category}</div>
            </div>
          </div>

          <ChevronRight 
            size={32} 
            className={`absolute right-5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white cursor-pointer ${GALLERY_ITEMS.findIndex(i => i.id === lightboxId) === GALLERY_ITEMS.length - 1 ? 'opacity-0' : ''}`}
            onClick={(e) => { e.stopPropagation(); const idx = GALLERY_ITEMS.findIndex(i => i.id === lightboxId); setLightboxId(GALLERY_ITEMS[idx + 1].id); }}
          />
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .film-hole-strip {
          width: 100%;
          height: 28px;
          background: repeating-linear-gradient(90deg, #080808 0px, #080808 6px, transparent 6px, transparent 26px, #080808 26px, #080808 32px);
          position: relative;
          overflow: hidden;
        }
        .film-hole-strip::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(90deg, white 0px, white 18px, transparent 18px, transparent 32px);
          background-size: 32px 16px;
          background-repeat: repeat-x;
          background-position: center;
          height: 16px;
          top: 6px;
          opacity: 0.1;
          border-radius: 2px;
        }
      ` }} />
    </PageTransition>
  );
}
