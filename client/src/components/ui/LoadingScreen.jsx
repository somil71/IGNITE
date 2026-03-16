import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const [displayText, setDisplayText] = useState('IGNITE');

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        'IGNITE'.split('').map((char, idx) => {
          if (idx < iteration) return 'IGNITE'[idx];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iteration >= 6) clearInterval(interval);
      iteration += 0.3;
    }, 50);

    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progressInterval); return 100; }
        return p + 2;
      });
    }, 30);

    return () => { clearInterval(interval); clearInterval(progressInterval); };
  }, []);

  return (
    <div className="loading-screen">
      <div className="ignite-grid-bg" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="font-display text-7xl md:text-9xl tracking-[16px] text-fire mb-2">
          {displayText}
        </div>
        <div className="font-mono text-[11px] text-secondary tracking-[6px] mb-12">
          TECHFEST 2026 // IILM UNIVERSITY
        </div>
        <div className="w-48 h-[1px] bg-[var(--border-subtle)] relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-fire transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="font-mono text-[10px] text-muted tracking-[3px] mt-3">
          LOADING... {progress}%
        </div>
      </div>
    </div>
  );
}
