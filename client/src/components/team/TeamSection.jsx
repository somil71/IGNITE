import { 
  Megaphone, ClipboardList, Truck, Share2, 
  ShieldCheck, Palette, Sparkles, Cpu, 
  Lightbulb, Camera, ChevronRight 
} from 'lucide-react';

const ICON_MAP = {
  Megaphone, ClipboardList, Truck, Share2,
  ShieldCheck, Palette, Sparkles, Cpu,
  Lightbulb, Camera
};

export default function TeamSection({ name, icon, subtitle, color = "#FF5500" }) {
  const IconComponent = ICON_MAP[icon] || Share2;

  // Add opacity to hex color for background and border
  const getRGBA = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '18px 20px',
      background: '#1A1A28',
      border: '1px solid rgba(255,255,255,0.08)',
      cursor: 'pointer',
      transition: 'all 200ms ease',
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Icon box */}
      <div style={{
        width: '44px',
        height: '44px',
        flexShrink: 0,
        background: getRGBA(color, 0.12),
        border: `1px solid ${getRGBA(color, 0.3)}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <IconComponent size={20} style={{ color: color }} />
      </div>

      {/* Team name text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h4 style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: '15px',
          color: '#F0F0F5',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.02em',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {name}
        </h4>
        {subtitle && (
          <p style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: '9px',
            color: color,
            letterSpacing: '0.1em',
            margin: '2px 0 0 0',
            textTransform: 'uppercase',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Right chevron */}
      <ChevronRight size={14} style={{ color: color, opacity: 0.25 }} />
    </div>
  );
}
