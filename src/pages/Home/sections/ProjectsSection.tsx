/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projectsData } from '../../../data/projects';
import { Link } from 'react-router-dom';
import type { Project } from '../../../types';
import { ArrowUpRight, Github } from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative bg-dark-bg min-h-screen lg:min-h-[300vh] w-full h-auto"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 h-full relative">
        
        {/* Sticky Header Left Column */}
        <div className="lg:col-span-5 relative h-auto lg:h-full">
          <div className="lg:sticky top-0 h-auto lg:h-screen flex flex-col justify-center py-16 lg:py-24">
            <motion.h2 
              className="text-6xl md:text-8xl font-display font-medium text-light-warm uppercase tracking-tighter leading-[0.85] mb-8"
            >
              Selected<br/>
              <span className="text-outline-bright italic inline-block transform -translate-x-2">Works</span>
            </motion.h2>
            <p className="text-light-taupe text-lg max-w-sm font-light leading-relaxed mb-12">
              A collection of my most recent projects.
            </p>


            <a 
              href="https://github.com/devmistry27"
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile"
              className="group relative hidden lg:inline-flex items-center gap-3 px-5 py-3 rounded-full bg-dark-tertiary/50 border border-dark-border transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(255,102,0,0.15)] hover:border-brand-orange/40 w-fit"
            >
              <Github className="w-5 h-5 text-light-taupe group-hover:text-brand-orange transition-colors duration-300" strokeWidth={1.5} />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                </span>
                <span className="text-light-cream font-medium text-sm tracking-wide transition-colors duration-300 pt-px">
                  View GitHub Profile
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Scrolling Projects Right Column */}
        <div className="lg:col-span-7 flex flex-col gap-24 lg:gap-[30vh] pt-12 lg:pt-[20vh] pb-24 lg:pb-[50vh] relative z-10">
          {projectsData.map((project, i) => {
            const isEven = i % 2 === 0;
            return (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={i} 
                isEven={isEven}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};



const ProjectCard = ({ project, index, isEven }: { project: Project, index: number, isEven: boolean }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Parallax the image internally
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className={`group flex flex-col ${isEven ? 'items-start' : 'items-end'}`}
    >
      {/* Numbering */}
      <div className="text-light-taupe font-mono text-sm mb-4">
        (0{index + 1}) — {project.category}
      </div>

      <Link to={`/project/${project.id}`} className="relative block w-full md:w-[85%] lg:w-[90%] overflow-hidden bg-dark-tertiary">
        <div className="absolute inset-0 bg-dark-bg/40 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
        <motion.img 
          style={{ y: imgY, scale: 1.15 }}
          src={project.image} 
          alt={project.title} 
          className="w-full h-auto aspect-[4/3] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
        />
        
        {/* Animated Hover Overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-red/10 backdrop-blur-sm">
           <div className="w-24 h-24 rounded-full bg-light-cream text-dark-bg flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
             <span className="font-sans font-medium text-sm">View Project</span>
           </div>
        </div>
      </Link>

      <div className="mt-8 flex flex-col items-start w-full md:w-[85%] lg:w-[90%]">
        <Link 
          to={`/project/${project.id}`} 
          className="flex flex-row items-center gap-4 sm:gap-6 w-fit group/header cursor-pointer"
        >
          <h3 className="text-3xl md:text-4xl font-display font-medium text-light-warm group-hover/header:text-brand-orange transition-colors duration-300">
            {project.title}
          </h3>
          
          <div className="relative w-7 h-7 md:w-8 md:h-8 flex items-center justify-center z-20 flex-shrink-0 ml-1">
            {/* Holographic Shard Architecture */}
            <div className="absolute inset-0 border-[1.5px] border-dark-border transform rotate-45 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/header:rotate-90 group-hover/header:scale-[1.3] group-hover/header:border-brand-orange group-hover/header:rounded-md mix-blend-screen" />
            <div className="absolute inset-0 bg-brand-orange opacity-0 transform transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover/header:-rotate-45 group-hover/header:scale-90 group-hover/header:opacity-100 group-hover/header:shadow-[0_0_20px_rgba(255,102,0,0.4)]" />
            
            <ArrowUpRight 
              strokeWidth={1.5} 
              className="relative z-10 w-3 h-3 md:w-4 md:h-4 text-light-taupe group-hover/header:text-dark-bg transition-colors duration-500 delay-75" 
            />
          </div>
        </Link>
        
        <div className="flex flex-wrap gap-2 mt-5">
          {project.techStack.map((tech: string) => (
            <span key={tech} className="text-xs font-mono px-3 py-1 border border-dark-border rounded-full text-light-primary group-hover:border-brand-orange/30 transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>

    </motion.div>
  );
};
