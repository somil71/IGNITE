import { Link } from 'react-router-dom';
import { Users, DollarSign, ArrowRight } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import ScrambleText from './ScrambleText';

export default function EventCard({ event }) {
  const { title, slug, category, teamSize, registrationFee, description, feeType } = event;

  return (
    <Link to={`/events/${slug}`} className="block ignite-card p-6 group cursor-none">
      <div className="flex items-start justify-between gap-4 mb-4">
        <CategoryBadge category={category} />
        <div className="flex items-center gap-1 text-[11px] font-mono text-muted">
          <DollarSign size={11} />
          {registrationFee === 0 ? 'FREE' : `₹${registrationFee} ${feeType === 'per_team' ? '/ Team' : '/ Person'}`}
        </div>
      </div>

      <h3 className="font-display text-xl text-primary leading-tight mb-3 tracking-wide group-hover:text-fire transition-colors">
        <ScrambleText text={title.toUpperCase()} trigger="hover" />
      </h3>

      <p className="font-mono text-[12px] text-secondary leading-relaxed line-clamp-2 mb-5">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
          <Users size={12} />
          <span>{teamSize?.label || 'Individual'}</span>
        </div>
        <div className="flex items-center gap-1 font-ui text-[12px] text-fire font-600 tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
          VIEW <ArrowRight size={12} />
        </div>
      </div>

      {/* Glow indicator bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-fire to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
}
