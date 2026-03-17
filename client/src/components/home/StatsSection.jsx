import { useEffect, useRef, useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

function Counter({ value, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let start = 0;
          const end = parseInt(value);
            const stepTime = 30;
            
            const timer = setInterval(() => {
              start += Math.ceil(end / 100);
              if (start >= end) {
                setCount(end);
                clearInterval(timer);
              } else {
                setCount(start);
              }
            }, stepTime);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-5xl md:text-7xl text-fire mb-1">
        {count}{suffix}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const revealRef = useScrollReveal();

  return (
    <section className="py-24 px-6 relative z-10 bg-surface/50 border-y border-[var(--border-subtle)]">
      <div ref={revealRef} className="reveal-stagger max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        <div>
          <Counter value="30" suffix="+" />
          <div className="font-ui text-secondary text-center tracking-[3px] text-xs uppercase">Events</div>
        </div>
        <div>
          <Counter value="1000" suffix="+" />
          <div className="font-ui text-secondary text-center tracking-[3px] text-xs uppercase">Participants</div>
        </div>
        <div>
          <Counter value="3" />
          <div className="font-ui text-secondary text-center tracking-[3px] text-xs uppercase">Categories</div>
        </div>
        <div>
          <Counter value="200000" suffix="+" />
          <div className="font-ui text-secondary text-center tracking-[3px] text-xs uppercase">Prize Pool (₹)</div>
        </div>
      </div>
    </section>
  );
}
