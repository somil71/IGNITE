import { useState, useRef } from 'react';

export default function FacultyCard({ name, role, initials, photo, accent = 'fire' }) {
  const [hovered, setHovered] = useState(false);
  const lineRef = useRef(null);
  
  const isCyan = accent === 'cyan';
  const accentColor = isCyan ? '#00D4FF' : '#FF5500';
  
  const handleMouseEnter = () => {
    setHovered(true);
    if (lineRef.current) lineRef.current.style.transform = 'scaleX(1)';
  };
  
  const handleMouseLeave = () => {
    setHovered(false);
    if (lineRef.current) lineRef.current.style.transform = 'scaleX(0)';
  };

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-card, #1A1A28)',
        border: `1px solid ${hovered ? 'rgba(255,107,0,0.4)' : 'rgba(255,255,255,0.12)'}`,
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        transition: 'border-color 250ms ease, transform 250ms ease',
        transform: hovered ? 'translateY(-2px)' : 'none'
      }}
    >
      {/* PHOTO AREA — explicit height */}
      <div style={{
        width: '100%',
        height: '200px',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0D0D14, #1A1A28)',
        flexShrink: 0
      }}>
        {photo ? (
          <img 
            src={photo} 
            alt={name} 
            draggable="false"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            {/* Monogram */}
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '52px',
              color: accentColor,
              lineHeight: 1,
              letterSpacing: '0.05em'
            }}>
              {initials}
            </span>
            
            {/* Subtle Grid Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(${accentColor}0A 1px, transparent 1px), linear-gradient(90deg, ${accentColor}0A 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
              pointerEvents: 'none',
              opacity: 0.4
            }} />
          </div>
        )}

        {/* Status dot (top-right) */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: accentColor,
          animation: 'dotPulse 2s ease-in-out infinite'
        }} />

        {/* Designation badge (bottom-left) */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '8px',
          background: 'rgba(0,0,0,0.85)',
          padding: '3px 8px',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '8px',
          color: accentColor,
          textTransform: 'uppercase',
          letterSpacing: '0.2em'
        }}>
          {role.split(' ').pop()}
        </div>
      </div>

      {/* INFO AREA */}
      <div style={{
        padding: '14px 16px',
        background: 'var(--bg-card, #1A1A28)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: '14px',
          color: '#F0F0F5',
          marginBottom: '4px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {name}
        </div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '10px',
          color: 'rgba(255,255,255,0.4)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}>
          {role}
        </div>

        {/* Bottom accent line */}
        <div 
          ref={lineRef}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: accentColor,
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 300ms ease'
          }}
        />
      </div>
    </div>
  );
}
