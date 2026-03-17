import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, ChevronRight, Zap } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react';
import { useAuth } from '../../hooks/useAuth';

const navLinks = [
  { label: 'Events', path: '/events' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Winners', path: '/winners' },
  { label: 'Team', path: '/team' },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'Contact', path: '/contact' },
];

const aboutOptions = [
  { label: 'About IGNITE TechFest', href: '/#about-ignite' },
  { label: 'About IILM University', href: '/#about-iilm' },
  { label: 'IILM Leadership', href: '/#leadership' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isSignedIn, isLoaded } = useUser();
  const { user } = useAuth(); // MongoDB user with .role

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const userButtonAppearance = {
    elements: {
      avatarBox: {
        width: 32,
        height: 32,
        border: '1px solid var(--accent-fire)',
      },
      userButtonPopoverCard: {
        background: '#0f0f0f',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '0px',
      },
      userButtonPopoverActionButton: {
        color: '#999',
        fontFamily: "'IBM Plex Mono', monospace",
        '&:hover': {
          background: 'rgba(255,255,255,0.05)',
          color: '#fff',
        }
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-void/40 backdrop-blur-xl border-b border-fire/20 shadow-[0_4px_20px_rgba(255,107,0,0.1)]' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group relative">
          <div className="absolute inset-0 bg-fire/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 animate-pulse-slow transition-opacity" />
          <img 
            src="/logo.jpeg" 
            alt="IGNITE Logo" 
            className="h-16 md:h-20 w-auto object-contain transition-transform duration-500 group-hover:scale-110 relative z-10"
          />
          <span className="font-ignite text-2xl md:text-3xl text-white tracking-[2px] hidden sm:block relative z-10">
            IGNITE
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {/* About Dropdown */}
          <div className="relative group/about">
            <button className="font-ui font-600 text-[13px] tracking-[2px] uppercase text-secondary hover:text-primary transition-colors flex items-center gap-1 py-4">
              About
              <ChevronRight size={14} className="rotate-90 group-hover/about:rotate-[-90deg] transition-transform" />
            </button>
            <div className="absolute top-full left-0 w-64 bg-surface border border-white/10 opacity-0 invisible group-hover/about:opacity-100 group-hover/about:visible transition-all duration-300 translate-y-2 group-hover/about:translate-y-0 z-50">
              {aboutOptions.map((opt) => (
                <a
                  key={opt.href}
                  href={opt.href}
                  className="block px-6 py-4 font-ui text-[11px] tracking-[2px] uppercase text-secondary hover:text-fire hover:bg-white/5 transition-all border-b border-white/5 last:border-0"
                >
                  {opt.label}
                </a>
              ))}
            </div>
          </div>

          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`font-ui font-600 text-[13px] tracking-[2px] uppercase transition-all duration-300 relative py-2 group ${
                location.pathname === path ? 'text-white' : 'text-secondary hover:text-white'
              }`}
            >
              <span className="relative z-10 group-hover:animate-flicker">
                {label}
              </span>
              {/* Lit Fuse Effect Indicator */}
              <motion.div 
                className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-fire to-ember shadow-[0_0_10px_#FF5500]`}
                initial={false}
                animate={{ 
                  width: location.pathname === path ? '100%' : '0%',
                  opacity: location.pathname === path ? 1 : 0
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
              <div className="absolute -bottom-1 left-0 h-[1px] bg-white/10 w-full" />
            </Link>
          ))}
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className={`font-ui font-600 text-[13px] tracking-[2px] uppercase text-accent-fire hover:brightness-125 transition-all`}
            >
              ADMIN
            </Link>
          )}
        </div>

        {/* Auth */}
        <div className="hidden lg:flex items-center gap-4">
          {!isLoaded ? (
            <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
          ) : isSignedIn ? (
            <>
              <Link
                to="/dashboard"
                className="font-ui font-600 text-[12px] tracking-[2px] uppercase text-secondary hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" appearance={userButtonAppearance} />
            </>
          ) : (
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="font-ui font-600 text-[12px] tracking-[2px] uppercase text-secondary hover:text-white transition-colors">SignIn</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="ignite-btn ignite-btn-primary py-2 px-5 text-[12px]">
                  <span>Register</span>
                </button>
              </SignUpButton>
            </div>
          )}
        </div>

        <button className="lg:hidden text-fire relative z-50 p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          <motion.div animate={{ rotate: mobileOpen ? 135 : 0 }} transition={{ type: 'spring', damping: 20 }}>
            {mobileOpen ? (
              <X size={28} className="drop-shadow-fire" />
            ) : (
              <div className="relative">
                <Zap size={28} fill="currentColor" className="drop-shadow-fire" />
                <motion.div 
                  className="absolute inset-0 bg-fire blur-xl opacity-40 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            )}
          </motion.div>
        </button>
      </div>

      {/* Scrolling Ticker Strip */}
      <div className="bg-fire text-black overflow-hidden py-1 border-t border-black/10">
        <div className="whitespace-nowrap flex animate-marquee font-mono text-[10px] font-bold tracking-[2px] uppercase">
          {[...Array(3)].map((_, i) => (
            <span key={i} className="flex items-center">
              IGNITE TECHFEST 2026  ·  6–8 APRIL  ·  IILM UNIVERSITY, GREATER NOIDA  ·  30+ EVENTS  ·  ₹2,15,500 IN PRIZES  ·  INNOVATE · INTEGRATE · IGNITE  ·&nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface border-t border-[var(--border-subtle)] px-6 py-6 h-screen">
          <div className="flex flex-col gap-6">
            {/* Mobile About */}
            <div className="flex flex-col gap-4">
              <div className="font-ui font-600 text-[18px] tracking-[2px] uppercase text-fire">About</div>
              <div className="flex flex-col gap-3 pl-4 border-l border-white/10">
                {aboutOptions.map((opt) => (
                  <a key={opt.href} href={opt.href} onClick={() => setMobileOpen(false)} className="font-ui text-[14px] tracking-[1px] uppercase text-secondary hover:text-white">
                    {opt.label}
                  </a>
                ))}
              </div>
            </div>

            {navLinks.map(({ label, path }) => (
              <Link key={path} to={path} className="font-ui font-600 text-[18px] tracking-[2px] uppercase text-secondary hover:text-fire flex items-center justify-between">
                {label} <ChevronRight size={16} />
              </Link>
            ))}
            {user?.role === 'admin' && (
              <Link to="/admin" className="font-ui font-600 text-[18px] tracking-[2px] uppercase text-accent-fire flex items-center justify-between">
                ADMIN <ChevronRight size={16} />
              </Link>
            )}
            <div className="h-[1px] bg-[var(--border-subtle)] my-2" />
            {isSignedIn ? (
              <>
                <Link to="/dashboard" className="font-ui text-[18px] tracking-[2px] uppercase text-primary">My Dashboard</Link>
                <div className="pt-4 flex items-center gap-4">
                   <UserButton afterSignOutUrl="/" appearance={userButtonAppearance} />
                   <span className="text-secondary font-mono text-sm leading-none">Manage Account</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <SignInButton mode="modal">
                  <button className="text-left font-ui text-[18px] tracking-[2px] uppercase text-secondary">SignIn</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="ignite-btn ignite-btn-primary w-full py-4 text-[16px]">REGISTER NOW →</button>
                </SignUpButton>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
