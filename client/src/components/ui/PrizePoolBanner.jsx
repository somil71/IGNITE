import { useEffect, useRef, useState } from 'react';
import { Trophy } from 'lucide-react';

export default function PrizePoolBanner() {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const target = 200000;
          const duration = 2000;
          const steps = 60;
          let step = 0;
          const interval = setInterval(() => {
            step++;
            const ease = 1 - Math.pow(1 - step / steps, 3);
            setCount(Math.floor(target * ease));
            if (step >= steps) { setCount(target); clearInterval(interval); }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border border-[var(--border-fire)] bg-[rgba(255,107,0,0.03)] p-8 text-center"
    >
      {/* Glow pulse */}
      <div className="absolute inset-0 animate-glow-pulse" />

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Trophy size={20} className="text-fire" />
          <div className="font-mono text-[11px] text-secondary tracking-[4px] uppercase">Prize Pool</div>
          <Trophy size={20} className="text-fire" />
        </div>
        <div className="font-display text-5xl sm:text-7xl text-fire">
          ₹{count.toLocaleString('en-IN')}
        </div>
        <div className="font-display text-xl sm:text-2xl text-ember mt-1">+ GOODIES</div>
        <div className="font-mono text-[11px] text-muted tracking-[3px] mt-3">ACROSS 35 EVENTS</div>
      </div>
    </div>
  );
}
