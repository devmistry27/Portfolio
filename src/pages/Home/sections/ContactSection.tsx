import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const footerY = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);

  return (
    <section id="contact" ref={containerRef} className="relative bg-brand-red text-dark-bg overflow-hidden min-h-screen flex flex-col justify-between pt-32 pb-12 w-full clip-path-footer">
      
      {/* Immersive Background element */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none noise-overlay mix-blend-multiply"></div>

      <motion.div style={{ y: footerY }} className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full flex-grow flex flex-col justify-center">
        
        {/* Top Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <h2 className="text-[12vw] md:text-9xl font-display font-bold leading-[0.8] tracking-tighter uppercase mb-6">
              Init<br/>Contact
            </h2>
            <p className="text-dark-primary/80 text-xl md:text-2xl font-medium max-w-lg">
              Whether we're working to move ML models to production, crafting beautiful interfaces, or just geeking out over football, PC gaming, tech releases, and sketching—let's connect
            </p>
          </div>

          <div className="flex flex-col justify-end">
            <a 
              href="https://mail.google.com/mail/?view=cm&fs=1&to=devmistry1027@gmail.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[clamp(1.25rem,6.5vw,2.25rem)] sm:text-4xl md:text-5xl font-display font-medium border-b-2 border-dark-bg/20 hover:border-dark-bg transition-colors pb-2 w-full sm:w-max max-w-full break-all sm:break-normal group flex items-center"
            >
              devmistry1027@gmail.com
              <ArrowUpRight strokeWidth={3} className="ml-4 opacity-0 -translate-x-4 translate-y-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" size={48} />
            </a>
            
            <div className="mt-16 font-medium text-lg">
              <div className="flex flex-col gap-4">
                <span className="text-sm font-mono uppercase tracking-widest text-dark-bg/60 mb-2">Socials</span>
                <div className="flex flex-wrap gap-8">
                  <a href="https://github.com/devmistry27" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-60 transition-opacity">
                    <Github size={24} />
                    <span>GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/devm27/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-60 transition-opacity">
                    <Linkedin size={24} />
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://x.com/devmistry1027" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-60 transition-opacity">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                    </svg>
                    <span>Twitter</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer Bottom Strip */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full pt-8 border-t border-dark-bg/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium h-max relative z-20">
        <div>© 2026 Dev Mistry.</div>
        <div className="flex items-center gap-2 md:absolute md:left-1/2 md:-translate-x-1/2">
          Crafted with intent.
        </div>
        <button 
          onClick={() => window.scrollTo(0, 0)} 
          className="hover:opacity-60 transition-opacity uppercase font-mono tracking-widest">
          You definitely missed something ↑
        </button>
      </div>
    </section>
  );
};
