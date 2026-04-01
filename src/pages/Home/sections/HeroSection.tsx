import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download } from 'lucide-react';
import { NeuralHUD } from '../../../components/interactive/NeuralHUD';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax effects tied to scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yText1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yText2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef} 
      id="home" 
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-dark-bg"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-dark-midnight/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      
      <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 relative z-10 flex flex-col h-full justify-center gap-8 md:gap-12 lg:gap-16">
        
        {/* Top meta tags */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
          className="flex items-center gap-6"
        >
        </motion.div>

        {/* Massive Typography Group */}
        <div className="relative w-full z-20 flex flex-col gap-8 md:gap-12 lg:gap-16">
          <motion.div style={{ y: yText1, opacity: opacityFade }}>
            <motion.h1 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              className="font-display font-medium text-[13.5vw] sm:text-6xl md:text-[9vw] leading-[0.85] text-light-warm tracking-tighter"
            >
              CRAFTING<br/>
              <span className="text-outline-bright italic inline-block transform -translate-x-2 md:-translate-x-4">INTELLIGENCE</span>
            </motion.h1>
          </motion.div>

          {/* Asymmetrical Floating Image / Focus box */}
          <motion.div 
            style={{ y: yImage }}
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="relative mt-4 md:mt-0 md:absolute md:top-0 right-0 md:right-[10%] w-full h-72 sm:w-96 sm:h-96 md:w-80 md:h-96 z-0 block"
          >
            <NeuralHUD />
          </motion.div>

          <motion.div 
            style={{ y: yText2 }}
            className="inherit relative z-10 w-full flex flex-col gap-8 md:block"
          >
            <motion.p 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="text-light-primary text-lg md:text-2xl font-light leading-relaxed max-w-[90%] md:max-w-[55%] lg:max-w-lg xl:max-w-xl md:ml-[20%] pr-4 md:pr-0"
            >
              Hello World, I am Dev, your friendly neighbourhood AI/ML Engineer.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="md:absolute md:left-0 md:top-1 md:mt-2"
            >
              <a href="/resume/DevMistry_Resume.pdf" download="Dev_Mistry_Resume.pdf" className="group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-sans font-medium text-sm tracking-wide text-dark-bg bg-light-cream border border-transparent transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] hover:-translate-y-1 hover:scale-[1.02] hover:bg-btn-primary-hover hover:border-light-taupe/30 hover:text-btn-primary-text-hover hover:shadow-[0_10px_40px_-10px_rgba(167,146,119,0.4)] active:scale-95 z-10 shrink-0" >
                <div className="absolute inset-0 bg-gradient-to-tr from-light-taupe/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Download size={18} className="relative z-10 transition-transform duration-500 group-hover:-translate-y-0.5" />
                <span className="relative z-10">Resume</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom actions & Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 lg:bottom-12 left-6 lg:left-12 right-6 lg:right-12 flex justify-end items-end z-30 pointer-events-auto"
        >
          <div className="flex flex-col items-center gap-2 text-light-taupe font-mono text-[10px] uppercase tracking-widest">
            <div className="w-[1px] h-12 bg-dark-border relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-orange animate-[float_2s_ease-in-out_infinite]"></div>
            </div>
            Scroll
          </div>
        </motion.div>

      </div>
    </section>
  );
};
