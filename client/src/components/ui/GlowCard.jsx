export default function GlowCard({ children, className = '', glowColor = 'fire' }) {
  const glowClass = glowColor === 'cyan' ? 'hover:shadow-cyan hover:border-[var(--border-glow)]'
    : 'hover:shadow-fire hover:border-[var(--border-fire)]';

  return (
    <div className={`ignite-card ${glowClass} ${className}`}>
      {children}
    </div>
  );
}
