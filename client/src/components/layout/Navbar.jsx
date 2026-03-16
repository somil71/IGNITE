import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, ChevronRight } from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/react';
import { useAuth } from '../../hooks/useAuth';

const navLinks = [
  { label: 'Events', path: '/events' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Winners', path: '/winners' },
  { label: 'Team', path: '/team' },
  { label: 'Sponsors', path: '/sponsors' },
  { label: 'Contact', path: '/contact' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/95 backdrop-blur-md border-b border-[var(--border-subtle)]' : 'bg-transparent'
      }`}
      style={{ paddingTop: '2px' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-gradient-fire flex items-center justify-center">
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <div className="font-display text-2xl text-primary leading-none tracking-widest uppercase">IGNITE</div>
            <div className="font-mono text-[9px] text-secondary tracking-[3px]">TECHFEST 2026</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`font-ui font-600 text-[13px] tracking-[2px] uppercase transition-colors relative group ${
                location.pathname === path ? 'text-fire' : 'text-secondary hover:text-primary'
              }`}
            >
              {label}
              <span className={`absolute -bottom-1 left-0 h-[1px] bg-fire transition-all duration-300 ${
                location.pathname === path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
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

        {/* Mobile Hamburger */}
        <button className="lg:hidden text-primary" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface border-t border-[var(--border-subtle)] px-6 py-6 h-screen">
          <div className="flex flex-col gap-6">
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
