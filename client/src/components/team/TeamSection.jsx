import { ChevronRight, Megaphone, ClipboardList, Truck, Share2, ShieldCheck, Palette, Sparkles, Cpu, Lightbulb, Camera } from 'lucide-react';

const ICONS = {
  Megaphone,
  ClipboardList,
  Truck,
  Share2,
  ShieldCheck,
  Palette,
  Sparkles,
  Cpu,
  Lightbulb,
  Camera
};

export default function TeamSection({ name, icon, subtitle, color = "#FF5500" }) {
  const IconComponent = ICONS[icon] || Share2;

  return (
    <div className="group relative flex items-center gap-4 p-[18px] px-5 bg-card border border-white/5 hover:bg-elevated hover:border-[#FF550059] transition-all duration-200 cursor-pointer overflow-hidden">
      {/* Background shimmer element */}
      <div 
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 pointer-events-none z-0"
        style={{ 
          background: `linear-gradient(105deg, transparent 30%, ${color}0A 50%, transparent 70%)` 
        }}
      />

      {/* Icon Block */}
      <div 
        className="relative w-11 h-11 flex items-center justify-center shrink-0 border border-white/[0.25] group-hover:bg-opacity-20 transition-colors z-10"
        style={{ 
          backgroundColor: `${color}1F`, // 12%
          borderColor: `${color}40`, // 25%
          color: color
        }}
      >
        <IconComponent size={20} />
      </div>

      {/* Middle — Text block */}
      <div className="relative flex-1 min-w-0 z-10">
        <h4 className="font-ui font-bold text-[15px] text-white tracking-wide uppercase truncate leading-tight">
          {name}
        </h4>
        {subtitle && (
          <p 
            className="font-mono text-[9px] uppercase tracking-[0.1em] mt-0.5 truncate"
            style={{ color: color }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Right — Chevron */}
      <ChevronRight 
        size={14} 
        className="relative text-white/25 group-hover:translate-x-[3px] transition-all z-10"
        style={{ color: color }}
      />
    </div>
  );
}
