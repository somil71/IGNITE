import { useState, useEffect } from 'react';

const TARGET_DATE = new Date('2026-04-15T09:00:00'); // Update with actual fest date

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = TARGET_DATE - new Date();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HRS', value: timeLeft.hours },
    { label: 'MIN', value: timeLeft.minutes },
    { label: 'SEC', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center gap-3 sm:gap-6">
      {units.map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="text-center">
            <div className="font-display text-4xl sm:text-5xl text-primary tabular-nums min-w-[2ch] leading-none">
              {String(value).padStart(2, '0')}
            </div>
            <div className="font-mono text-[9px] text-muted tracking-[3px] mt-1">{label}</div>
          </div>
          {i < 3 && (
            <div className="font-display text-3xl text-fire animate-pulse mb-4">:</div>
          )}
        </div>
      ))}
    </div>
  );
}
