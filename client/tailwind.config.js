/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void': '#050508',
        'surface': '#0D0D14',
        'elevated': '#13131E',
        'card': '#1A1A28',
        'fire': '#FF6B00',
        'ember': '#FF9500',
        'cyan': '#00D4FF',
        'green': '#00FF94',
        'primary': '#F0F0F5',
        'secondary': '#8888AA',
        'muted': '#44445A',
      },
      fontFamily: {
        'display': ['"Bebas Neue"', 'cursive'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
        'ui': ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'grid-pulse': 'gridPulse 8s ease-in-out infinite',
        'cursor-ring': 'cursorRing 0.3s ease-out',
        'flicker': 'flicker 3s linear infinite',
        'count-up': 'countUp 2s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        gridPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        flicker: {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': { opacity: '1' },
          '20%, 22%, 24%, 55%': { opacity: '0.4' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255,107,0,0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255,107,0,0.8), 0 0 60px rgba(255,107,0,0.4)' },
        },
      },
      boxShadow: {
        'fire': '0 0 20px rgba(255,107,0,0.5)',
        'fire-lg': '0 0 40px rgba(255,107,0,0.6), 0 0 80px rgba(255,107,0,0.3)',
        'cyan': '0 0 20px rgba(0,212,255,0.5)',
        'cyan-lg': '0 0 40px rgba(0,212,255,0.6)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.6), 0 0 1px rgba(0,212,255,0.3)',
      },
      backgroundImage: {
        'gradient-fire': 'linear-gradient(135deg, #FF6B00, #FF9500)',
        'gradient-cyber': 'linear-gradient(135deg, #00D4FF, #00FF94)',
        'gradient-card': 'linear-gradient(135deg, rgba(255,107,0,0.05), rgba(0,212,255,0.03))',
        'grid-pattern': `
          linear-gradient(rgba(255,107,0,0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,107,0,0.08) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}
