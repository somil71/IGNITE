import GlowCard from '../ui/GlowCard';

export default function FacultyCard({ name, role, contact, variant = 'fire' }) {
  return (
    <GlowCard variant={variant} className={`p-6 border-${variant}/20 bg-${variant}/5 h-full flex flex-col justify-between`}>
      <div>
        <h4 className="font-ui text-lg text-primary font-700 tracking-wider mb-2 uppercase">{name}</h4>
        <p className="font-mono text-[10px] text-secondary tracking-[1.5px] uppercase">{role}</p>
      </div>
      {contact && (
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] font-mono text-[9px] text-muted tracking-[1px]">
          {contact}
        </div>
      )}
    </GlowCard>
  );
}
