import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';
import ScrambleText from '../ui/ScrambleText';

const leadership = [
  { name: 'Nihar Amoncar', role: 'Vice-Chancellor' },
  { name: 'Munish Sabarwal', role: 'Director SCSE & Dean SOE' },
  { name: 'Arvind Kumar Jain', role: 'Dean Student Welfare & Dean SOS' },
  { name: 'Alok Aggarwal', role: 'Dean SCSE' },
  { name: 'Dr. Babita Singh', role: 'Director SOL' },
  { name: 'Ms. Neeta Mathur', role: 'Dean SOM' },
  { name: 'Prof. Dr. Anupama Srivastava', role: 'Dean School of Humanities & Social Sciences' },
  { name: 'Brigadier SS Gill', role: 'Registrar' },
];

export default function AboutSections() {
  const revealIgnite = useScrollReveal();
  const revealIILM = useScrollReveal();
  const revealLeadership = useScrollReveal();

  return (
    <>
      {/* 3a. About IGNITE TechFest 2026 */}
      <section id="about-ignite" ref={revealIgnite} className="py-24 px-6 border-b border-[var(--border-subtle)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fire/5 blur-[120px] rounded-full -mr-32 -mt-32" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-6xl text-primary mb-6">
              <ScrambleText text="ABOUT IGNITE" trigger="scroll" />
              <span className="text-fire block text-3xl md:text-5xl">TECHFEST 2026</span>
            </h2>
            <div className="w-24 h-1 bg-fire mb-8" />
            <div className="space-y-4 font-mono text-sm md:text-base text-secondary leading-relaxed">
              <p>
                IGNITE TechFest 2026, the annual flagship technical festival of IILM University, Greater Noida, will be held from 6th to 8th April 2026. The festival celebrates innovation, creativity, and technological advancement, providing students a platform to showcase their skills and ideas.
              </p>
              <p>
                This year, IGNITE promises to be bigger, more exciting, and more impactful, featuring a wider range of events and greater student participation. The three-day festival brings together students from different disciplines to compete, collaborate, and explore emerging technologies across domains such as artificial intelligence, robotics, coding, entrepreneurship, gaming, photography, writing, and innovation showcases.
              </p>
              <p>
                Through coding challenges, startup pitching, AI contests, model presentations, photography events, and e-sports tournaments, participants apply their knowledge to real-world challenges. IGNITE TechFest 2026 fosters collaboration, innovation, and knowledge sharing — not just a technical festival, but a celebration of innovation, talent, and future-ready thinking. 🚀
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-fire/20 blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            <img 
              src="/logo.jpeg" 
              alt="IGNITE 2026" 
              className="w-full h-auto border border-fire/30 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-fire" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-fire" />
          </div>
        </div>
      </section>

      {/* 3b. About IILM University */}
      <section id="about-iilm" ref={revealIILM} className="py-24 px-6 bg-surface/30 border-b border-[var(--border-subtle)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="font-display text-4xl md:text-6xl text-primary mb-4">
              <ScrambleText text="IILM UNIVERSITY" trigger="scroll" />
              <span className="text-fire block text-2xl tracking-[4px]">GREATER NOIDA</span>
            </h2>
            <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-fire to-transparent" />
          </div>
          
          <div className="font-mono text-sm md:text-base text-secondary leading-relaxed max-w-4xl mx-auto">
            <p className="mb-6">
              IILM University, Greater Noida is a premier private university dedicated to quality education, innovation-driven learning, and global exposure across diverse disciplines. Established to nurture future leaders, innovators, and professionals, it offers undergraduate, postgraduate, and doctoral programs in engineering, management, law, liberal arts, computer science, and technology.
            </p>
            <p>
              The university emphasizes experiential learning, industry integration, and research-oriented education, with modern infrastructure, advanced laboratories, smart classrooms, and a vibrant campus. IILM strongly promotes innovation, entrepreneurship, and skill development through incubation centers, technical festivals, research projects, and industry collaborations. Located in the educational hub of Greater Noida, IILM provides excellent opportunities for networking, internships, and industry exposure — shaping future-ready professionals equipped to contribute meaningfully to society and the global workforce.
            </p>
          </div>
        </div>
      </section>

      {/* 3c. IILM Leadership */}
      <section id="leadership" ref={revealLeadership} className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-display text-4xl md:text-6xl text-primary mb-2">
              <ScrambleText text="IILM LEADERSHIP" trigger="scroll" />
            </h2>
            <div className="w-24 h-1 bg-fire" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((person, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="ignite-card p-6 flex flex-col items-center text-center group relative overflow-hidden"
              >
                {/* Background glow */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-fire to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-fire/20 rounded-full blur-xl scale-0 group-hover:scale-100 transition-transform duration-500" />
                  <div className="w-32 h-32 rounded-full border-2 border-fire/30 p-1 relative z-10">
                    <img 
                      src="/logo.jpeg" // Using logo as a placeholder since specific leadership image wasn't found
                      alt={person.name}
                      className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-fire opacity-40" />
                </div>

                <h3 className="font-display text-xl text-primary mb-1 tracking-wider">{person.name}</h3>
                <p className="font-mono text-[10px] text-fire uppercase tracking-[2px]">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
