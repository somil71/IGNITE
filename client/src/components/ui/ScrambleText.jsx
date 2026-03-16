import { useCallback, useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

export default function ScrambleText({ text, className = '', trigger = 'mount', delay = 0 }) {
  const [display, setDisplay] = useState(trigger === 'mount' ? text : '░'.repeat(text.length));
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  const scramble = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((char, idx) => {
          if (char === ' ') return ' ';
          if (idx < iteration) return text[idx];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 0.4;
    }, 35);
  }, [text]);

  useEffect(() => {
    if (trigger === 'mount') {
      const t = setTimeout(scramble, delay);
      return () => clearTimeout(t);
    }

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) scramble(); },
      { threshold: 0.3 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [delay, scramble, trigger]);

  return (
    <span ref={elementRef} className={`scramble-text ${className}`}>
      {display}
    </span>
  );
}
