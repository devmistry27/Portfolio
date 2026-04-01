import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MechanicalKeyboard } from '../../../features/MechanicalKeyboard/MechanicalKeyboard';

export const SkillsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section id="skills" className="py-32 md:py-48 bg-dark-bg relative overflow-hidden flex flex-col items-center">
      
      {/* Header Area */}
      <div className="max-w-[1200px] w-full px-6 lg:px-12 mb-12 relative z-10 pointer-events-none" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-4xl md:text-6xl font-display font-medium text-light-warm uppercase tracking-tight">
            Tech Stack
          </h2>
          <p className="text-light-taupe text-lg max-w-xl font-light leading-relaxed">
            A keyboard of tools and technologies I build with.
          </p>
        </motion.div>
      </div>

      {/* Interactive Orbit Area */}
      <div className="w-full relative z-10 overflow-hidden">
        <MechanicalKeyboard />
      </div>

      {/* Deep decorative element - extremely subtle */}
      <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-green/5 rounded-full blur-[140px] pointer-events-none mix-blend-screen -z-0"></div>

    </section>
  );
};
