/*
 * ADDING PHOTOS — Instructions for when photos are ready
 *
 * Step 1: Compress photos to max 200KB using squoosh.app
 * Step 2: Crop to square (1:1 ratio) for best display
 * Step 3: Upload to client/public/team/ folder
 *   Name format: firstname-lastname.jpg
 *   Example: ayush-arnav.jpg, ak-jain.jpg
 * Step 4: Update the photo field from null to the path:
 *   photo: "/team/ayush-arnav.jpg"
 *
 * OR upload to Cloudinary ignite-2026/team/ folder
 * and use the secure_url as the photo value.
 *
 * No other code changes needed. Photos appear automatically.
 */

import PageTransition from '../components/layout/PageTransition';
import FacultyCard from '../components/team/FacultyCard';
import TeamSection from '../components/team/TeamSection';
import useScrollReveal from '../hooks/useScrollReveal';
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
  { name: "PR Team", icon: "Megaphone", color: "#FF5500", subtitle: null },
  { name: "Registration Team", icon: "ClipboardList", color: "#FF7A00", subtitle: null },
  { name: "Logistics Team", icon: "Truck", color: "#FF5500", subtitle: null },
  { name: "Social Media Team", icon: "Share2", color: "#00D4FF", subtitle: null },
  { name: "Discipline Team", icon: "ShieldCheck", color: "#FF5500", subtitle: null },
  { name: "Designing Team", icon: "Palette", color: "#FF7A00", subtitle: null },
  { name: "Decoration Team", icon: "Sparkles", color: "#FF5500", subtitle: null },
  { name: "Technical Team", icon: "Cpu", color: "#00D4FF", subtitle: "GDG IILM" },
  { name: "Creative Team", icon: "Lightbulb", color: "#FF7A00", subtitle: "The Srijan Society" },
  { name: "Digital Media Team", icon: "Camera", color: "#00FF94", subtitle: "CampusLens IILM" }
];

export default function Team() {
  const revealHeader = useScrollReveal();
  const revealFaculty = useScrollReveal();
  const revealStudents = useScrollReveal();
  const revealTeams = useScrollReveal();

  return (
    <PageTransition className="pt-[120px] pb-24 px-6 md:px-12 relative z-10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* PAGE HEADER */}
        <header ref={revealHeader} className="mb-20 px-[48px] reveal-element">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#FF5500]" />
            <span className="font-mono text-[9px] text-[#FF5500] uppercase tracking-[0.4em]">—— THE PEOPLE BEHIND IGNITE</span>
          </div>
          <h1 className="font-display text-[64px] md:text-[min(120px,10vw)] text-white uppercase leading-[0.9] mb-4">
            THE TEAM
          </h1>
          <p className="font-mono text-[12px] text-secondary">
            Powering IGNITE 2026 at IILM University
          </p>
        </header>

        {/* SECTION 2: TECHFEST IN-CHARGE */}
        <section className="mb-20 px-[48px] reveal-element">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[1px] bg-[#FF5500]" />
            <h2 className="font-mono text-[9px] text-[#FF5500] uppercase tracking-[0.3em]">TECHFEST IN-CHARGE</h2>
          </div>
          <div ref={revealFaculty} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 reveal-stagger">
            {techfestInCharge.map((person, idx) => (
              <FacultyCard key={idx} {...person} />
            ))}
          </div>
        </section>

        {/* SECTION 3: STUDENT ORGANISERS */}
        <section className="mb-20 px-[48px] reveal-element">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-[1px] bg-[#FF5500]" />
            <h2 className="font-mono text-[9px] text-[#FF5500] uppercase tracking-[0.3em]">STUDENT ORGANISERS</h2>
          </div>
          <div ref={revealStudents} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 reveal-stagger">
            {studentOrganisers.map((person, idx) => (
              <div key={idx} className="relative">
                <FacultyCard {...person} />
                {(person.name === "Ayush Arnav" || person.name === "Anamika Pandey") && (
                   <Star 
                     size={10} 
                     className="absolute bottom-16 right-4 z-30" 
                     style={{ color: person.accent === 'cyan' ? '#00D4FF' : '#FF5500', fill: person.accent === 'cyan' ? '#00D4FF' : '#FF5500' }} 
                   />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: ORGANISING TEAMS */}
        <section className="px-[48px] reveal-element">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-10 h-[1px] bg-[#FF5500]" />
            <h2 className="font-mono text-[9px] text-[#FF5500] uppercase tracking-[0.3em]">ORGANISING TEAMS</h2>
          </div>
          <p className="font-mono text-[11px] text-white/40 mb-6">
            The people making it happen behind the scenes.
          </p>
          <div ref={revealTeams} className="grid grid-cols-1 sm:grid-cols-2 gap-2 reveal-stagger max-w-[1200px]">
            {organisingTeams.map((team, idx) => (
              <TeamSection key={idx} {...team} />
            ))}
          </div>
        </section>

      </div>

    </PageTransition>
  );
}
  );
}
