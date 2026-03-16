import { useState, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

export default function useScrambleText(originalText) {
  const [text, setText] = useState(originalText);

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setText(
        originalText.split('').map((char, idx) => {
          if (char === ' ') return ' ';
          if (idx < iteration) return originalText[idx];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );
      if (iteration >= originalText.length) clearInterval(interval);
      iteration += 0.4;
    }, 35);
  }, [originalText]);

  return { text, scramble };
}
