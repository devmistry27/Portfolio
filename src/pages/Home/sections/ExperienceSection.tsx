import React from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../../../data/experience';
import { CGPAEasterEgg } from '../../../components/interactive/CGPAEasterEgg';

export const ExperienceSection: React.FC = () => {
  const linkedInText = "View LinkedIn Profile"; // Easy to swap with: "Available for opportunities", " connect on LinkedIn"
  const linkedInUrl = "https://www.linkedin.com/in/devm27/"; // Update with actual URL

  return (
    <section id="experience" className="py-16 md:py-32 lg:py-48 bg-dark-bg relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Massive Section Header */}
        <div className="mb-16 md:mb-32 flex flex-col md:flex-row md:items-end md:justify-between border-b border-dark-border pb-8 md:pb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-medium text-light-primary tracking-tighter">
            been there,<br />
            <span className="text-light-taupe italic">done that</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex w-fit mt-10 md:mt-0"
          >
            <a 
              href={linkedInUrl}
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile"
              className="group relative inline-flex items-center gap-3 px-5 py-3 rounded-full bg-dark-tertiary/50 border border-dark-border hover:bg-btn-secondary-hover transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(10,102,194,0.15)]"
            >
              {/* LinkedIn SVG */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-5 h-5 text-light-taupe group-hover:text-[#0A66C2] transition-colors duration-300"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>

              {/* Status Indicator & Text */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-light-cream font-medium text-sm tracking-wide transition-colors duration-300">
                  {linkedInText}
                </span>
              </div>
            </a>
          </motion.div>
        </div>

        {/* Narrative, Staggered Experience Rows instead of a stiff timeline */}
        <div className="flex flex-col gap-14 md:gap-24">
          {experienceData.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 group"
            >
              {/* Year & Metadata (Left Aligned, spanning 3 cols) */}
              <div className="lg:col-span-3 flex flex-row flex-wrap lg:flex-col items-start gap-3">
                
                {/* 💻 Cyber-Styled Terminal ID Badge */}
                <span className="inline-flex items-center gap-2 px-3 py-1 border border-dark-border rounded text-xs font-mono tracking-widest flex-wrap sm:whitespace-nowrap bg-dark-bg/50">
                  <span className="text-brand-orange font-bold animate-pulse">&gt;_</span>
                  <span className="text-light-cream/90">exp_id: 0{index + 1}</span>
                  <span className="text-dark-border">||</span>
                  <span className="text-light-taupe uppercase">{item.period}</span>
                </span>

                <span className="inline-block px-3 py-1 border border-dark-border text-xs font-mono rounded text-light-taupe group-hover:text-brand-orange group-hover:border-brand-orange transition-colors duration-300">
                  {item.type.toUpperCase()}
                </span>
                
                {/* 🛡️ Witty Easter Egg Injection tied specifically to Education */}
                {item.id === 'exp-03' && (
                  <CGPAEasterEgg />
                )}
              </div>

              {/* Core Info (Center, span 5 cols) */}
              <div className="lg:col-span-5">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-light-warm mb-2 group-hover:text-brand-red transition-colors duration-500">
                  {item.role}
                </h3>
                <h4 className="text-base md:text-xl text-light-taupe font-light mb-4 md:mb-8">
                  {item.company}
                </h4>
              </div>

              {/* Details (Right Aligned, span 4 cols) */}
              <div className="lg:col-span-4 text-light-primary/80 font-light leading-relaxed">
                <p className="mb-4">
                  {item.description[0]}
                </p>
                {item.description.length > 1 && (
                  <p className="text-light-taupe text-sm">
                    {item.description.slice(1).join(" ")}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
