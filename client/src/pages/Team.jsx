import PageTransition from '../components/layout/PageTransition';
import FacultyCard from '../components/team/FacultyCard';
import TeamSection from '../components/team/TeamSection';
import { Star } from 'lucide-react';

const techfestInCharge = [
  { name: "Prof. (Dr.) A K Jain", role: "Dean Students Welfare", initials: "AJ", photo: null },
  { name: "Mr. Arpit Varshney", role: "Faculty Technical Secretary", initials: "AV", photo: null },
  { name: "Dr. Rajeev Kumar", role: "Faculty Coordinator", initials: "RK", photo: null },
  { name: "Ms. Heena Khera", role: "Faculty Co-Convener", initials: "HK", photo: null },
  { name: "Ms. Aina Mehta", role: "Faculty Coordinator", initials: "AM", photo: null },
  { name: "Dr. Navneet Singh", role: "Faculty Convener", initials: "NS", photo: null },
  { name: "Mr. Paras Yadav", role: "Faculty Coordinator", initials: "PY", photo: null }
];

const studentOrganisers = [
  { name: "Ayush Arnav", role: "Student General Secretary", initials: "AA", accent: "cyan", photo: null },
  { name: "Anamika Pandey", role: "Student Joint Secretary", initials: "AP", accent: "cyan", photo: null },
  { name: "Mayank Bhardwaj", role: "Student Technical Head", initials: "MB", accent: "fire", photo: null },
  { name: "Yashasvi Singh", role: "Student Creative Head", initials: "YS", accent: "fire", photo: null }
];

const organisingTeams = [
  { name: "PR Team", icon: "Megaphone", color: "#FF5500", members: ["Member Name", "Member Name"] },
  { name: "Registration Team", icon: "ClipboardList", color: "#FF7A00", members: ["Member Name", "Member Name", "Member Name", "Member Name", "Member Name", "Member Name"] },
  { name: "Logistics Team", icon: "Truck", color: "#FF5500", members: ["Member Name", "Member Name"] },
  { name: "Social Media Team", icon: "Share2", color: "#00D4FF", members: ["Member Name", "Member Name"] },
  { name: "Discipline Team", icon: "ShieldCheck", color: "#FF5500", members: ["Member Name", "Member Name"] },
  { name: "Designing Team", icon: "Palette", color: "#FF7A00", members: ["Member Name", "Member Name"] },
  { name: "Decoration Team", icon: "Sparkles", color: "#FF5500", members: ["Member Name", "Member Name"] },
  { name: "Technical Team", icon: "Cpu", color: "#00D4FF", subtitle: "GDG IILM", members: ["Member Name", "Member Name"] },
  { name: "Creative Team", icon: "Lightbulb", color: "#FF7A00", subtitle: "The Srijan Society", members: ["Member Name", "Member Name"] },
  { name: "Digital Media Team", icon: "Camera", color: "#00FF94", subtitle: "CampusLens IILM", members: ["Member Name", "Member Name"] }
];

export default function Team() {
  // Removed useScrollReveal hooks as they are no longer used
  // const revealHeader = useScrollReveal();
  // const revealFaculty = useScrollReveal();
  // const revealStudents = useScrollReveal();
  // const revealTeams = useScrollReveal();

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '12px',
    width: '100%',
    boxSizing: 'border-box'
  };

  const sectionStyle = {
    marginBottom: '80px',
    width: '100%',
    boxSizing: 'border-box'
  };

  return (
    <PageTransition 
      className="relative z-10 pt-[120px] pb-24 px-6 md:px-12"
      style={{
        position: 'relative',
        zIndex: 1,
        width: '100%'
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        
        {/* PAGE HEADER */}
        <header style={sectionStyle}> {/* Removed ref={revealHeader} */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ width: '32px', height: '1px', background: '#FF5500' }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', color: '#FF5500', textTransform: 'uppercase', letterSpacing: '0.4em' }}>
              —— THE PEOPLE BEHIND IGNITE
            </span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(64px, 10vw, 120px)', color: '#fff', textTransform: 'uppercase', lineHeight: 0.9, margin: '0 0 16px 0' }}>
            THE TEAM
          </h1>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
            Powering IGNITE 2026 at IILM University
          </p>
        </header>

        {/* SECTION 2: TECHFEST IN-CHARGE */}
        <section style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ width: '40px', height: '1px', background: '#FF5500' }} />
            <h2 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', color: '#FF5500', textTransform: 'uppercase', letterSpacing: '0.3em', margin: 0 }}>
              TECHFEST IN-CHARGE
            </h2>
          </div>
          <div style={gridStyle}> {/* Removed ref={revealFaculty} and className="reveal-stagger" */}
            {techfestInCharge.map((person, idx) => (
              <FacultyCard key={idx} {...person} />
            ))}
          </div>
        </section>

        {/* SECTION 3: STUDENT ORGANISERS */}
        <section style={sectionStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ width: '40px', height: '1px', background: '#FF5500' }} />
            <h2 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', color: '#FF5500', textTransform: 'uppercase', letterSpacing: '0.3em', margin: 0 }}>
              STUDENT ORGANISERS
            </h2>
          </div>
          <div style={gridStyle}> {/* Removed ref={revealStudents} and className="reveal-stagger" */}
            {studentOrganisers.map((person, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <FacultyCard {...person} />
                {(person.name === "Ayush Arnav" || person.name === "Anamika Pandey") && (
                   <Star 
                     size={10} 
                     style={{ 
                       position: 'absolute', 
                       bottom: '64px', 
                       right: '16px', 
                       zIndex: 30,
                       color: person.accent === 'cyan' ? '#00D4FF' : '#FF5500', 
                       fill: person.accent === 'cyan' ? '#00D4FF' : '#FF5500' 
                     }} 
                   />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: ORGANISING TEAMS */}
        <section style={{ width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ width: '40px', height: '1px', background: '#FF5500' }} />
            <h2 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '9px', color: '#FF5500', textTransform: 'uppercase', letterSpacing: '0.3em', margin: 0 }}>
              ORGANISING TEAMS
            </h2>
          </div>
          <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
            The people making it happen behind the scenes.
          </p>
          <div 
            style={{ // Removed ref={revealTeams} and className="reveal-stagger"
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
              gap: '8px', 
              width: '100%', 
              maxWidth: '1200px',
              paddingBottom: '20px'
            }}
          >
            {organisingTeams.map((team, idx) => (
              <TeamSection key={idx} {...team} />
            ))}
          </div>
        </section>

      </div>
    </PageTransition>
  );
}
