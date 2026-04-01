import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export const AboutSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section id="about" className="relative py-20 md:py-32 bg-dark-secondary overflow-hidden">
      
      {/* Infinite scrolling marquee background */}
      <div className="absolute top-1/4 left-0 w-full whitespace-nowrap opacity-[0.03] select-none pointer-events-none z-0 transform -rotate-2">
        <h2 className="text-[15vw] font-display font-bold uppercase animate-marquee-left">
          Data Science • Machine Learning • Deep Learning 
        </h2>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          
          {/* Header Column */}
          <div className="md:col-span-4">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-4xl md:text-5xl font-display font-medium text-light-warm uppercase tracking-tight"
            >
              The Dev<br />
              Behind <span className="text-brand-red italic">Dev</span>
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-[1px] h-24 bg-dark-border mt-8 origin-top hidden md:block"
            ></motion.div>
          </div>

          {/* Editorial Text Column */}
          <div className="md:col-span-8 flex flex-col gap-10 lg:gap-14">
            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="text-2xl md:text-3xl lg:text-4xl font-light leading-snug text-light-primary"
            >
              I develop AI systems that think smart and look sharp. I specialize in <span className="text-brand-orange drop-shadow-[0_0_8px_rgba(255,102,0,0.5)] font-normal">Machine Learning</span> and <span className="text-brand-orange drop-shadow-[0_0_8px_rgba(255,102,0,0.5)] font-normal">Deep Learning</span>, building tools that not only crunch numbers but also <span className="text-light-warm font-medium">solve real-world problems</span> and feel <span className="text-light-warm font-medium italic">intuitive to use.</span>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="grid grid-cols-1 xl:grid-cols-12 gap-10 text-light-taupe text-base md:text-lg leading-relaxed font-light"
            >
              <div className="xl:col-span-7 flex flex-col gap-6">
                <p>
                  Most of my work involves taking models from <span className="text-brand-orange drop-shadow-[0_0_8px_rgba(255,102,0,0.4)]">messy notebooks</span> to production-ready systems that actually scale. Clean architecture, thoughtful design, and robust deployment matter to me just as much as the accuracy metrics on my training runs.
                </p>
                <p>
                  I believe powerful tech <span className="text-light-primary">deserves beautiful interfaces.</span> Great systems shouldn't just work well, they should <span className="text-light-primary italic">feel right too.</span>
                </p>
                <p>
                  When I'm not optimizing models, you'll find me cheering for <span className="text-light-primary font-medium tracking-wide drop-shadow-[0_0_8px_rgba(235,229,218,0.3)]">Real Madrid</span>, geeking out over the latest tech drops, grinding through PC games, or sketching cool stuffs.
                </p>
              </div>

              {/* Metadata Area */}
              <div className="xl:col-span-5 flex items-start xl:justify-end">
                <div className="p-6 md:p-8 border-gradient bg-dark-bg/50 w-full sm:w-fit h-fit transition-all duration-300">
                  <div className="text-brand-orange font-mono text-sm mb-6">++ Metadata</div>
                  <ul className="space-y-4 font-mono text-sm tracking-wide">
                    <li className="flex items-start justify-between gap-8 sm:gap-16 border-b border-dark-border pb-3">
                      <span className="text-light-taupe mt-1">Focus</span>
                      <span className="text-light-primary text-right">Machine Learning<br/>Deep Learning</span>
                    </li>
                    <li className="flex items-start justify-between gap-8 sm:gap-16 border-b border-dark-border pb-3">
                      <span className="text-light-taupe mt-1">Stack</span>
                      <span className="text-light-primary text-right">Python<br/>PyTorch<br/>Tensorflow</span>
                    </li>
                    <li className="flex items-start justify-between gap-8 sm:gap-16 border-b border-dark-border pb-1">
                      <span className="text-light-taupe mt-1">Hobbies</span>
                      <span className="text-light-primary text-right w-32 sm:w-40 leading-relaxed">Pitch to Pixels to Playstation to Pencil</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Standalone Tagline Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="mt-12 md:mt-16 w-full border-y border-dark-border py-8 md:py-12 bg-dark-bg/30 backdrop-blur-sm transition-colors duration-700 hover:bg-dark-tertiary/20 flex justify-center items-center overflow-hidden"
        >
          <h3 className="font-display font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight uppercase text-center px-4 whitespace-normal break-words text-balance md:whitespace-nowrap md:text-nowrap bg-gradient-to-br from-light-cream via-light-taupe to-brand-orange bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,102,0,0.15)]">
            ENGINEER BY DAY, GAMER BY NIGHT, ARTIST AT TIMES.
          </h3>
        </motion.div>
      </div>
    </section>
  );
};
