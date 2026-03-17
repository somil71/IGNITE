import { motion } from 'framer-motion';
import ScrambleText from '../ui/ScrambleText';
import IgniteButton from '../ui/IgniteButton';
import CountdownTimer from '../ui/CountdownTimer';

export default function HeroSection() {
  return (
    <section 
      style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '100px 48px 160px 48px',
        overflow: 'hidden',
      }}
    >
      {/* Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-fire opacity-20"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              scale: 0.5,
            }}
            animate={{
              y: ['-10%', '110%'],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 10 + Math.random() * 15,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
          />
        ))}
      </div>

      {/* Fix 4 — Top Label with Dash Lines */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '10px',
          letterSpacing: '0.4em',
          color: '#FF5500',
          textTransform: 'uppercase',
          marginBottom: '32px',
        }}
      >
        <span style={{
          display: 'inline-block',
          width: '40px',
          height: '1px',
          background: '#FF5500',
          flexShrink: 0,
        }} />
        IILM UNIVERSITY · GREATER NOIDA · 2026
        <span style={{
          display: 'inline-block',
          width: '40px',
          height: '1px',
          background: '#FF5500',
          flexShrink: 0,
        }} />
      </motion.div>

      {/* Main Title Group */}
      <div className="relative z-10 w-full max-w-fit mb-4 overflow-visible">
        <h1 
          className="font-ignite text-white drop-shadow-fire"
          style={{
            fontSize: 'clamp(64px, 14vw, 180px)',
            letterSpacing: '0.02em',
            lineHeight: '1.1',
            fontWeight: 900,
            textTransform: 'uppercase',
          }}
        >
          <ScrambleText text="IGNITE" delay={400} />
        </h1>
        
        <div 
          className="font-display -mt-2 md:-mt-6"
          style={{
            color: 'transparent',
            WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.2)',
            fontSize: 'clamp(32px, 7vw, 90px)',
            letterSpacing: '0.1em',
            lineHeight: '1',
          }}
        >
          TECHFEST 2026
        </div>
      </div>

      {/* Fix 8 — DIVIDER LINE FULL WIDTH */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.2, delay: 1, ease: 'circOut' }}
        style={{
          maxWidth: '560px',
          height: '1px',
          background: 'linear-gradient(90deg, #FF5500 0%, #00D4FF 60%, transparent 100%)',
          marginBottom: '32px',
          marginTop: '8px',
        }}
      />

      {/* Fix 5 — ADD DESCRIPTION TEXT */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.45)',
          letterSpacing: '0.05em',
          lineHeight: '1.8',
          maxWidth: '480px',
          marginBottom: '40px',
        }}
      >
        30+ competitions. ₹2,15,500 in prizes.<br />
        Innovate. Integrate. Ignite.
      </motion.p>

      {/* Countdown Timer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, x: -10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="mb-12"
      >
        <CountdownTimer />
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.2 }}
        className="flex flex-col sm:flex-row gap-6"
      >
        <IgniteButton variant="primary" size="lg" to="/events">
          EXPLORE EVENTS
        </IgniteButton>
        <IgniteButton variant="ghost" size="lg" to="/register">
          REGISTER NOW
        </IgniteButton>
      </motion.div>

      {/* Fix 2 — PRIZE POOL POSITION (Absolute Bottom Left) */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '48px',
        zIndex: 2,
      }}>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '8px',
          letterSpacing: '0.35em',
          color: '#FF5500',
          textTransform: 'uppercase',
          marginBottom: '6px',
        }}>
          PRIZE POOL
        </div>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: '28px',
          letterSpacing: '0.05em',
          color: '#FFFFFF',
          lineHeight: 1,
        }}>
          ₹2,15,500
        </div>
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '9px',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.2em',
          marginTop: '4px',
        }}>
          + GOODIES
        </div>
      </div>

      {/* Fix 2 — SCROLL INDICATOR POSITION (Absolute Bottom Right) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          right: '48px',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div style={{
          width: '1px',
          height: '48px',
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '8px',
          letterSpacing: '0.25em',
          color: 'rgba(255,255,255,0.25)',
          textTransform: 'uppercase',
          writingMode: 'vertical-rl',
        }}>
          SCROLL
        </div>
      </motion.div>
    </section>
  );
}
