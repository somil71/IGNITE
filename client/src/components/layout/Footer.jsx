import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[var(--border-subtle)] bg-surface mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-6 group">
              <img 
                src="/logo.jpeg" 
                alt="IGNITE Logo" 
                className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="font-mono text-[12px] text-secondary leading-relaxed mb-2">
              IILM University, Greater Noida
            </p>
            <p className="font-mono text-[12px] text-secondary leading-relaxed mb-6">
              Annual Techfest 2026 — 30+ Events — ₹2,15,500+ Prize Pool
            </p>
            <a
              href="mailto:ignite.techfest@iilm.edu"
              className="inline-flex items-center gap-2 font-mono text-[12px] text-fire hover:text-ember transition-colors"
            >
              <Mail size={14} />
              ignite.techfest@iilm.edu
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <div className="font-mono text-[10px] text-muted tracking-[3px] uppercase mb-4">Navigate</div>
            <div className="flex flex-col gap-3">
              {[
                ['/events', 'Events'],
                ['/leaderboard', 'Leaderboard'],
                ['/winners', 'Winners'],
                ['/team', 'Our Team'],
                ['/sponsors', 'Sponsors'],
                ['/support', 'Support'],
              ].map(([path, label]) => (
                <Link
                  key={path}
                  to={path}
                  className="font-ui text-[13px] text-secondary hover:text-fire transition-colors tracking-[1px]"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <div className="font-mono text-[10px] text-muted tracking-[3px] uppercase mb-4">Follow</div>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/ignite_iilm' },
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/ignite-techfest-8544a12b9' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[var(--border-subtle)] flex items-center justify-center text-secondary hover:text-fire hover:border-fire transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="mt-6 p-4 border border-[var(--border-fire)] bg-[rgba(255,107,0,0.05)]">
              <div className="font-mono text-[10px] text-secondary tracking-[2px] uppercase mb-1">Prize Pool</div>
              <div className="font-display text-2xl text-fire">₹2,15,500+</div>
              <div className="font-mono text-11px text-secondary">+ GOODIES</div>
            </div>
          </div>
        </div>

        <div className="section-divider" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-[11px] text-muted">
            © 2026 IGNITE Techfest — IILM University. All rights reserved.
          </div>
          <div className="font-mono text-[11px] text-muted uppercase tracking-[1px]">
            Website designed + developed by : - <span className="text-secondary">SOMIL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
