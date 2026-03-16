import { 
  Megaphone,
  ClipboardList,
  Truck,
  Share2,
  Shield,
  Palette,
  Sparkles,
  Cpu,
  Lightbulb,
  Camera
} from 'lucide-react';
import GlowCard from '../ui/GlowCard';

export default function TeamSection({ name, icon: Icon, subtitle }) {
  return (
    <GlowCard variant="cyan" className="p-6 text-center border-cyan/10 bg-cyan/5">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 bg-cyan/10 flex items-center justify-center rounded-lg text-cyan mb-4">
          <Icon size={24} />
        </div>
        <h4 className="font-ui text-lg text-primary font-bold tracking-wider uppercase mb-1">{name}</h4>
        {subtitle && (
          <p className="font-mono text-[9px] text-muted italic tracking-[1px] uppercase">{subtitle}</p>
        )}
      </div>
    </GlowCard>
  );
}
