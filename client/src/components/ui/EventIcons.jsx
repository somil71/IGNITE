import React from 'react';

// Premium Cyberpunk SVG Icons for IGNITE 2026
const IconWrapper = ({ children, color = "currentColor" }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const Icons = {
  Food: (props) => (
    <IconWrapper {...props}>
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </IconWrapper>
  ),
  Debate: (props) => (
    <IconWrapper {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
    </IconWrapper>
  ),
  Treasure: (props) => (
    <IconWrapper {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </IconWrapper>
  ),
  Poster: (props) => (
    <IconWrapper {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </IconWrapper>
  ),
  Globe: (props) => (
    <IconWrapper {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </IconWrapper>
  ),
  Meme: (props) => (
    <IconWrapper {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M7 10h10" />
      <path d="M7 14h5" />
      <path d="M3 13h18" />
    </IconWrapper>
  ),
  Squid: (props) => (
    <IconWrapper {...props}>
      <circle cx="12" cy="7" r="4" />
      <rect x="8" y="11" width="8" height="8" rx="1" />
      <path d="M12 11v8" />
    </IconWrapper>
  ),
  Bot: (props) => (
    <IconWrapper {...props}>
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </IconWrapper>
  ),
  Shark: (props) => (
    <IconWrapper {...props}>
      <path d="M22 2c-3.5 0-6.5 2-8 5-1 .5-2 1-3 1.5V11c1-1 3-2.5 5-2.5 3 0 4 1.5 4 1.5" />
      <path d="M11 8.5C8 10 5 13 4 17a12 12 0 0 0 10 2c3 0 5-1 7-3.5" />
      <path d="M11 8.5L7 2" />
    </IconWrapper>
  ),
  Marketing: (props) => (
    <IconWrapper {...props}>
      <path d="M11 15h.01" />
      <path d="M9.5 20h5" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-1" />
      <path d="M17.5 20a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </IconWrapper>
  ),
  Innovation: (props) => (
    <IconWrapper {...props}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </IconWrapper>
  ),
  Math: (props) => (
    <IconWrapper {...props}>
      <path d="M18 7h-6" />
      <path d="M18 17h-6" />
      <path d="M15 12h-9" />
      <path d="M18 12h-3" />
      <path d="M9 18l-3-6 3-6" />
    </IconWrapper>
  ),
  Quiz: (props) => (
    <IconWrapper {...props}>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
      <circle cx="12" cy="12" r="10" />
    </IconWrapper>
  ),
  Drone: (props) => (
    <IconWrapper {...props}>
      <path d="M12 12V3" />
      <path d="M3 12h18" />
      <path d="M12 12l-6-6" />
      <path d="M12 12l6-6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M17 17a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z" />
      <path d="M7 17a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z" />
      <path d="M23 17a3 3 0 1 0-6 0 3 3 0 0 0 6 0Z" />
    </IconWrapper>
  ),
  Speech: (props) => (
    <IconWrapper {...props}>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </IconWrapper>
  ),
  Cine: (props) => (
    <IconWrapper {...props}>
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
    </IconWrapper>
  ),
  Vigyan: (props) => (
    <IconWrapper {...props}>
      <path d="M4.5 3h15" />
      <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
      <path d="M6 14h12" />
    </IconWrapper>
  ),
  Writing: (props) => (
    <IconWrapper {...props}>
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l5 5" />
      <path d="M9.5 14.5L16 8" />
    </IconWrapper>
  ),
  Camera: (props) => (
    <IconWrapper {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </IconWrapper>
  ),
  Escape: (props) => (
    <IconWrapper {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </IconWrapper>
  ),
  Code: (props) => (
    <IconWrapper {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </IconWrapper>
  ),
  Prompt: (props) => (
    <IconWrapper {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.5 8.5 0 0 1 3.5.7l4.3-1.4z" />
      <path d="M12 17h.01" />
      <path d="M12 13.5V11" />
      <path d="M12 8h.01" />
    </IconWrapper>
  ),
  Gaming: (props) => (
    <IconWrapper {...props}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 12h4" />
      <path d="M8 10v4" />
      <circle cx="15" cy="10" r="1" />
      <circle cx="15" cy="14" r="1" />
      <circle cx="18" cy="12" r="1" />
    </IconWrapper>
  ),
  Trail: (props) => (
    <IconWrapper {...props}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </IconWrapper>
  ),
  Samvad: (props) => (
    <IconWrapper {...props}>
      <path d="M17 6.1H3c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2z" />
      <path d="M23 9.1l-4 3 4 3z" />
    </IconWrapper>
  ),
  Hackathon: (props) => (
    <IconWrapper {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </IconWrapper>
  ),
  Racing: (props) => (
    <IconWrapper {...props}>
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      <path d="M10 9h5l4 8H5l4-8Z" />
      <path d="M15 6h-5" />
    </IconWrapper>
  ),
  Debug: (props) => (
    <IconWrapper {...props}>
      <path d="M6 13c1 0 2-1 2-2V5" />
      <path d="M18 13c-1 0-2-1-2-2V5" />
      <rect x="8" y="5" width="8" height="14" rx="4" />
      <path d="M12 19v3" />
      <path d="M5 19l3-3" />
      <path d="M19 19l-3-3" />
    </IconWrapper>
  ),
  Forensic: (props) => (
    <IconWrapper {...props}>
      <path d="m21 21-4.35-4.35" />
      <circle cx="11" cy="11" r="8" />
      <path d="M11 7v8" />
      <path d="M7 11h8" />
    </IconWrapper>
  ),
  Storytelling: (props) => (
    <IconWrapper {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </IconWrapper>
  ),
  Maze: (props) => (
    <IconWrapper {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 3v4h4v4h4v4h4" />
      <path d="M3 11h4v4h4v4" />
    </IconWrapper>
  ),
  Soccer: (props) => (
    <IconWrapper {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m12 12-4-4" />
      <path d="m12 12 4-4" />
      <path d="m12 12-4 4" />
      <path d="m12 12 4 4" />
      <path d="M12 2v20" />
      <path d="M2 12h20" />
    </IconWrapper>
  )
};
