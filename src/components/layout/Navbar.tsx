import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { ThemeToggle } from '../common/ThemeToggle';

// Custom Native X Logo mirroring Lucide-React Props
const XIcon = (props: any) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="currentColor" className={props.className}>
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'contact'];
      let current = 'home';
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Offset by 150px to detect early
          if (rect.top <= 150) {
            current = s;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  let navThemeClasses = "bg-transparent text-light-primary";
  let ctaThemeClasses = "bg-transparent border border-light-primary/30 text-light-primary hover:bg-light-primary hover:text-dark-bg hover:border-light-primary mix-blend-difference";

  if (scrolled) {
    if (activeSection === 'about') {
      navThemeClasses = "bg-dark-bg text-light-primary border border-dark-border";
      ctaThemeClasses = "bg-light-primary text-dark-bg hover:bg-light-taupe hover:text-dark-bg border border-transparent";
    } else if (activeSection === 'contact') {
      navThemeClasses = "bg-light-cream text-dark-bg border border-transparent shadow-xl";
      ctaThemeClasses = "bg-dark-bg text-light-cream hover:bg-dark-tertiary hover:text-light-cream border border-transparent";
    } else {
      navThemeClasses = "bg-dark-secondary text-light-primary border border-dark-border";
      ctaThemeClasses = "bg-light-primary text-dark-bg hover:bg-light-taupe hover:text-dark-bg border border-transparent";
    }
  }
  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className={cn(
          "fixed top-4 left-4 right-4 md:top-6 md:left-8 md:right-8 z-[100] transition-colors duration-500 pointer-events-none"
        )}
      >
        <div className={cn(
          "max-w-[1920px] mx-auto grid grid-cols-2 lg:grid-cols-3 items-center px-4 md:px-6 transition-all duration-500 h-[56px] lg:h-[72px] pointer-events-auto rounded-none",
          navThemeClasses
        )}>
          {/* Left: Logo */}
          <div className="justify-self-start">
            <a href="#home" className="font-display font-medium text-xl md:text-2xl tracking-tight relative group overflow-hidden inline-block" onClick={() => setMenuOpen(false)}>
              <span className={cn("inline-block transition-transform duration-500 group-hover:-translate-y-full", !scrolled && "mix-blend-difference")}>Dev Mistry</span>
              <span className="absolute inset-0 translate-y-full inline-block transition-transform duration-500 group-hover:translate-y-0 text-brand-orange">Dev Mistry</span>
            </a>
          </div>

          {/* Center: Menu Button & Mobile Theme Toggle (Right on Mobile) */}
          <div className="justify-self-end lg:justify-self-center flex items-center gap-4 lg:gap-0">
            <ThemeToggle className="lg:hidden" />
            <button 
              className={cn(
                "group relative flex items-center gap-1.5 font-mono text-sm tracking-widest uppercase transition-colors hover:text-brand-orange focus:outline-none z-[110]"
              )}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <div className="relative h-6 w-[54px] overflow-hidden">
                <span className={cn("absolute inset-0 flex items-center justify-start transition-transform duration-500 ease-premium", menuOpen ? "-translate-y-full" : "translate-y-0", !scrolled && !menuOpen ? "mix-blend-difference" : "")}>MENU</span>
                <span className={cn("absolute inset-0 flex items-center justify-start transition-transform duration-500 ease-premium text-brand-orange", menuOpen ? "translate-y-0" : "translate-y-full")}>CLOSE</span>
              </div>

              {/* 2-Line Hamburger Morphing to X */}
              <div className="relative w-5 h-[8px] flex flex-col justify-between items-center">
                 <motion.span 
                   initial={false}
                   animate={{ 
                     rotate: menuOpen ? 45 : 0, 
                     y: menuOpen ? 3 : 0 
                   }}
                   transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                   className={cn("w-full h-[1.5px] block transform origin-center transition-colors duration-500", !scrolled && !menuOpen ? "mix-blend-difference bg-light-primary" : (menuOpen ? "bg-brand-orange" : "bg-current"))}
                 />
                 <motion.span 
                   initial={false}
                   animate={{ 
                     rotate: menuOpen ? -45 : 0, 
                     y: menuOpen ? -3 : 0 
                   }}
                   transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                   className={cn("w-full h-[1.5px] block transform origin-center transition-colors duration-500", !scrolled && !menuOpen ? "mix-blend-difference bg-light-primary" : (menuOpen ? "bg-brand-orange" : "bg-current"))}
                 />
              </div>
            </button>
          </div>

          {/* Right: CTA Button & Desktop Theme Toggle (Hidden on Mobile) */}
          <div className="hidden lg:flex justify-self-end items-center gap-6">
             <ThemeToggle />
             <a href="#contact" className={cn(
               "group relative inline-flex items-center justify-center overflow-hidden px-6 py-2.5 rounded-full font-sans text-sm font-medium transition-all duration-300",
               ctaThemeClasses
             )}>
              <span className="relative flex items-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-x-3">
                Let's Talk
              </span>
              <ArrowUpRight 
                size={16} 
                className="absolute right-4 text-brand-orange opacity-0 translate-x-4 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:opacity-100 group-hover:translate-x-0" 
              />
            </a>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-dark-bg z-[90] flex flex-col justify-center px-6 md:px-12 pt-24 pb-12 overflow-y-auto overflow-x-hidden"
          >
            <div className="w-full h-full flex flex-col lg:flex-row justify-between lg:items-end mt-12 lg:mt-0">
              
              {/* Massive Links List */}
              <div className="flex flex-col gap-2 md:gap-4 flex-1 justify-center">
                {['Home', 'About', 'Projects', 'Skills', 'Experience', 'Contact'].map((item, i) => (
                  <div key={item} className="overflow-hidden">
                    <motion.a 
                      href={`#${item.toLowerCase()}`}
                      onClick={() => {
                        // Allow smooth scroll to handle it, but close menu
                        setMenuOpen(false);
                      }}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ delay: 0.1 * i, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                      className="group flex flex-col font-display font-bold text-[clamp(2rem,8vw,5.5rem)] leading-[0.85] w-max uppercase relative"
                    >
                      <span className="text-outline-bright transition-all duration-500 group-hover:text-light-warm group-hover:-webkit-text-stroke-transparent group-hover:opacity-100">{item}</span>
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[0.1em] bg-brand-orange transition-all duration-500 ease-premium group-hover:w-full mix-blend-difference pointer-events-none"></span>
                    </motion.a>
                  </div>
                ))}
              </div>

              {/* Info Column */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="mt-16 lg:mt-0 flex flex-col lg:items-end justify-center gap-12 lg:w-1/3 lg:pb-12"
              >
                
                {/* Location */}
                <div className="lg:text-right flex flex-col gap-3 group">
                  <h4 className="text-light-taupe/70 text-xs font-mono uppercase tracking-[0.2em]">Based In</h4>
                  <div className="flex items-center lg:justify-end gap-3">
                    <p className="text-light-primary text-2xl font-display font-light tracking-tight group-hover:text-brand-orange transition-colors duration-500">
                      Gujarat, India
                    </p>
                  </div>
                </div>

                {/* Social Connect */}
                <div className="lg:text-right flex flex-col gap-4">
                  <h4 className="text-light-taupe/70 text-xs font-mono uppercase tracking-[0.2em]">Connect</h4>
                  <div className="flex lg:justify-end gap-3">
                    {[
                      { icon: Github, href: "https://github.com/devmistry27", label: "GitHub" },
                      { icon: Linkedin, href: "https://linkedin.com/in/devm27", label: "LinkedIn" },
                      { icon: XIcon, href: "https://x.com/devmistry1027", label: "X (Twitter)" },
                      { icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=devmistry1027@gmail.com", label: "Email" }
                    ].map((social, idx) => (
                      <a 
                        key={idx}
                        href={social.href} 
                        target="_blank" 
                        rel="noreferrer" 
                        aria-label={social.label}
                        className="group/social relative flex items-center justify-center w-12 h-12 rounded-full border border-dark-border/50 bg-dark-tertiary/20 hover:bg-brand-orange hover:border-brand-orange transition-all duration-500 ease-premium transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,102,0,0.2)]"
                      >
                        <social.icon size={20} strokeWidth={1.5} className="text-light-taupe group-hover/social:text-light-cream transition-colors duration-500" />
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Availability Badge */}
                <div className="lg:text-right flex flex-col gap-4 mt-2">
                  <h4 className="text-light-taupe/70 text-xs font-mono uppercase tracking-[0.2em] hidden lg:block">Status</h4>
                  <div className="inline-flex items-center lg:justify-end gap-3 px-5 py-2.5 rounded-full border border-brand-orange/20 bg-brand-orange/5 backdrop-blur-sm self-start lg:self-end hover:bg-brand-orange/10 transition-colors duration-500">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                    </span>
                    <span className="text-light-primary font-mono text-xs uppercase tracking-widest pt-px">
                      Open to new opportunities
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
