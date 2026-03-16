import { useEffect, useRef } from 'react';

export default function GridBackground() {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!overlayRef.current) return;
      const { clientX: x, clientY: y } = e;
      overlayRef.current.style.background = `radial-gradient(
        circle 300px at ${x}px ${y}px,
        rgba(255, 107, 0, 0.06) 0%,
        transparent 70%
      )`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="ignite-grid-bg" />
      <div
        ref={overlayRef}
        className="fixed inset-0 z-0 pointer-events-none transition-none"
      />
    </>
  );
}
