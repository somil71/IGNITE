import PageTransition from '../components/layout/PageTransition';
import ScrambleText from '../components/ui/ScrambleText';
import FacultyCard from '../components/team/FacultyCard';
import TeamSection from '../components/team/TeamSection';
import useScrollReveal from '../hooks/useScrollReveal';
import { 
  Megaphone, ClipboardList, Truck, Share2, Shield, 
  Palette, Sparkles, Cpu, Lightbulb, Camera 
} from 'lucide-react';

const techfestInCharge = [
  { name: "Prof. (Dr.) A K Jain", role: "Dean Students Welfare" },
  { name: "Mr. Arpit Varshney", role: "Faculty Technical Secretary" },
  { name: "Dr. Navneet Singh", role: "Faculty Convener" },
  { name: "Ms. Heena Khera", role: "Faculty Co-Convener" },
  { name: "Mr. Rajeev Kumar", role: "Faculty Coordinator" },
  { name: "Ms. Aina Mehta", role: "Faculty Coordinator" },
  { name: "Mr. Paras Yadav", role: "Faculty Coordinator" },
];

const studentOrganisers = [
  { name: "Ayush Arnav", role: "Student General Secretary" },
  { name: "Anamika Pandey", role: "Student Joint Secretary" },
  { name: "Mayank Bhardwaj", role: "Student Technical Head" },
  { name: "Yashasvi Singh", role: "Student Creative Head" },
];

const teams = [
  { name: "PR Team", icon: Megaphone },
  { name: "Registration Team", icon: ClipboardList },
  { name: "Logistics Team", icon: Truck },
  { name: "Social Media Team", icon: Share2 },
  { name: "Discipline Team", icon: Shield },
  { name: "Designing Team", icon: Palette },
  { name: "Decoration Team", icon: Sparkles },
  { name: "Technical Team", subtitle: "GDG IILM", icon: Cpu },
  { name: "Creative Team", subtitle: "The Srijan Society", icon: Lightbulb },
  { name: "Digital Media Team", subtitle: "CampusLens IILM", icon: Camera }
];

export default function Team() {
  const reveal1 = useScrollReveal();
  const reveal2 = useScrollReveal();
  const reveal3 = useScrollReveal();

  return (
    <PageTransition className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <h1 className="font-display text-5xl md:text-8xl text-primary mb-4 tracking-[6px]">
            <ScrambleText text="THE TEAM" />
          </h1>
          <p className="font-mono text-secondary tracking-[4px] text-xs md:text-sm uppercase">
            The powerhouses behind IGNITE 2026
          </p>
        </header>

        <section ref={reveal1} className="mb-24">
          <h2 className="font-display text-3xl text-fire tracking-widest mb-10 border-l-4 border-fire pl-4">TECHFEST IN-CHARGE</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
            {techfestInCharge.map((person, i) => (
              <FacultyCard key={i} {...person} />
            ))}
          </div>
        </section>

        <section ref={reveal2} className="mb-24">
          <h2 className="font-display text-3xl text-cyan tracking-widest mb-10 border-l-4 border-cyan pl-4">STUDENT ORGANISERS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
            {studentOrganisers.map((person, i) => (
              <FacultyCard key={i} {...person} variant="cyan" />
            ))}
          </div>
        </section>

        <section ref={reveal3}>
          <h2 className="font-display text-3xl text-primary tracking-widest mb-10 border-l-4 border-[var(--border-subtle)] pl-4 uppercase">Organising Teams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 reveal-stagger">
            {teams.map((team, i) => (
              <TeamSection key={i} {...team} />
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
