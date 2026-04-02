import React, { useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { projectsData } from '../../data/projects';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../config/animations';


export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsData.find(p => p.id === id);

  useLayoutEffect(() => {
    // Synchronously resets scroll before browser paints, preventing visual flash
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-light-100 mb-4">Project Not Found</h2>
          <Link to="/" className="text-tech-blue hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 relative">

      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <Link 
          to="/" 
          onClick={() => {
            setTimeout(() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
          className="inline-flex items-center font-mono text-xs tracking-widest uppercase text-light-taupe hover:text-brand-orange transition-colors duration-300 mb-10 group mt-4 relative z-20"
        >
          <ArrowLeft size={16} className="mr-3 group-hover:-translate-x-2 transition-transform duration-500 ease-premium" /> 
          Back to Portfolio
        </Link>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="mb-10">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-navy-800 border border-light-300/10 text-xs font-mono text-tech-cyan mb-4">
              {project.category}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-light-100 mb-6">{project.title}</h1>
            
            <div className="flex flex-wrap items-center gap-3 md:gap-5 mt-6 md:mt-8">
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="group relative flex items-center gap-3 px-7 py-3.5 bg-transparent border border-dark-border rounded-full hover:border-light-taupe/50 hover:bg-light-taupe/5 transition-all duration-500 ease-premium text-light-taupe hover:text-light-cream font-mono text-xs uppercase tracking-widest overflow-hidden">
                <Github size={16} className="relative z-10 group-hover:scale-110 transition-transform duration-500 ease-premium" />
                <span className="relative z-10">Source Code</span>
              </a>
              {project.liveUrl && project.liveUrl !== '#' && (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="group relative flex items-center gap-3 px-7 py-3.5 bg-light-cream text-dark-bg border border-transparent rounded-full hover:bg-brand-orange hover:text-light-cream hover:shadow-[0_4px_20px_rgba(255,102,0,0.25)] transition-all duration-500 ease-premium font-mono text-xs font-bold uppercase tracking-widest overflow-hidden">
                  <ExternalLink size={16} className="relative z-10 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-500 ease-premium" />
                  <span className="relative z-10">Live Demo</span>
                </a>
              )}
            </div>
          </motion.div>
          
          {/* Main Image */}
          <motion.div variants={fadeInUp} className="w-full h-auto rounded-2xl overflow-hidden mb-12 shadow-2xl shadow-brand-orange/5 border border-dark-border/40 relative group bg-dark-bg">
            <div className="absolute inset-0 bg-dark-bg/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <img src={project.detailImage || project.image} alt={project.title} className="w-full h-auto object-contain transform scale-[1.02] group-hover:scale-100 transition-transform duration-700 ease-out" />
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content */}
            <motion.div variants={fadeInUp} className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-lg md:text-xl lg:text-2xl font-display font-medium text-light-warm mb-4 md:mb-6 flex items-center gap-3">
                  <span className="text-brand-orange text-sm font-mono tracking-widest">(01)</span> 
                  Overview
                </h3>
                <p className="text-light-taupe leading-relaxed font-sans text-sm md:text-base whitespace-pre-line">
                  {project.longDescription}
                </p>
              </section>
              
              <section>
                <h3 className="text-lg md:text-xl lg:text-2xl font-display font-medium text-light-warm mb-4 md:mb-6 flex items-center gap-3">
                  <span className="text-brand-orange text-sm font-mono tracking-widest">(02)</span> 
                  Architecture Flow
                </h3>
                <div className="flex flex-col gap-4 mt-6 relative">
                  {/* Left Spine Line */}
                  <div className="absolute left-[15px] top-6 bottom-6 w-px bg-dark-border z-0"></div>
                  
                  {(project.architecture || `Data Ingestion\nPreprocessing & Augmentation\nModel Inference (TensorRT/ONNX)\nPost-processing Hook\nAPI Gateway (FastAPI)`).split('\n').map((line, idx) => {
                    const cleanLine = line.replace(/→\s*$/, '').trim();
                    if (!cleanLine) return null;
                    return (
                      <div key={idx} className="flex items-start gap-6 relative z-10 group">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-bg border border-dark-border flex items-center justify-center font-mono text-[10px] text-brand-orange group-hover:border-brand-orange/50 group-hover:bg-brand-orange/10 transition-colors shadow-sm mt-1">
                          0{idx + 1}
                        </div>
                        <div className="flex-grow p-4 md:p-5 rounded-xl bg-dark-tertiary/30 border border-dark-border/40 text-light-taupe font-sans text-sm group-hover:border-brand-orange/30 group-hover:bg-dark-tertiary/50 group-hover:text-light-cream transition-all duration-300">
                          {cleanLine}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </motion.div>

            {/* Sidebar List */}
            <motion.div variants={fadeInUp} className="md:col-span-1 space-y-8">
              <div className="p-6 rounded-2xl bg-dark-tertiary/20 border border-dark-border/40 border-t-2 border-t-brand-orange backdrop-blur-md hover:border-dark-border transition-colors duration-300">
                <h4 className="font-display font-medium text-lg text-light-warm mb-5">Core Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1.5 text-xs font-mono rounded-full bg-dark-bg/80 border border-dark-border text-light-taupe hover:text-light-cream hover:border-brand-orange/40 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.metrics && (
                <div className="p-5 md:p-6 rounded-2xl bg-dark-tertiary/20 border border-dark-border/40 border-t-2 border-t-brand-red backdrop-blur-md hover:border-dark-border transition-colors duration-300">
                  <h4 className="font-display font-medium text-lg text-light-warm mb-4">Key Results</h4>
                  <ul className="space-y-3">
                    {project.metrics.map(metric => (
                      <li key={metric.label} className="flex justify-between items-center border-b border-dark-border/50 pb-2.5 last:border-0 last:pb-0">
                        <span className="text-xs md:text-sm font-sans tracking-wide text-light-taupe leading-tight">{metric.label}</span>
                        <span className="font-mono text-xs md:text-sm font-semibold text-brand-orange text-right ml-4 leading-tight">{metric.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};
