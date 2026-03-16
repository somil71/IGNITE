import PageTransition from '../components/layout/PageTransition';
import IgniteButton from '../components/ui/IgniteButton';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <PageTransition className="min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="text-center relative">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="relative"
        >
          {/* Glitch Effect layers */}
          <span className="font-display text-[150px] md:text-[250px] leading-none text-fire opacity-20 absolute top-0 left-0 -translate-x-1 animate-pulse">404</span>
          <span className="font-display text-[150px] md:text-[250px] leading-none text-cyan opacity-20 absolute top-0 left-0 translate-x-1 animate-pulse" style={{ animationDelay: '0.1s' }}>404</span>
          
          <h1 className="font-display text-[150px] md:text-[250px] leading-none text-primary relative z-10 drop-shadow-fire">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-20 mt-[-20px] md:mt-[-40px]"
        >
          <h2 className="font-display text-4xl md:text-6xl text-primary mb-4 tracking-[8px]">
            PAGE NOT FOUND
          </h2>
          <p className="font-mono text-secondary tracking-[2px] mb-12 uppercase text-xs md:text-sm max-w-md mx-auto leading-relaxed">
            The page you're looking for has been purged or never existed in this sector.
          </p>
          <IgniteButton variant="primary" to="/">
            ← BACK TO HOME BASE
          </IgniteButton>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fire/5 blur-[150px] rounded-full pointer-events-none" />
      </div>
    </PageTransition>
  );
}
