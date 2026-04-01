import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check initial state from HTML class added by the blocking script
    const isLightMode = document.documentElement.classList.contains('light-mode');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLight(isLightMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isLight ? 'light' : 'dark';
    if (newTheme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
    localStorage.setItem('theme', newTheme);
    setIsLight(!isLight);
  };

  return (
    <button 
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 overflow-hidden group border border-transparent hover:border-brand-orange z-[110]",
        isLight 
          ? "bg-dark-primary text-light-primary hover:bg-brand-orange hover:text-dark-primary" 
          : "bg-light-primary text-dark-bg hover:bg-brand-orange hover:text-light-primary",
        className
      )}
      aria-label="Toggle Theme"
    >
      <motion.div
        initial={false}
        animate={{ y: isLight ? -30 : 0, opacity: isLight ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="absolute pointer-events-none"
      >
        <Sun size={18} className="transition-transform group-hover:rotate-90 duration-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ y: isLight ? 0 : 30, opacity: isLight ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="absolute pointer-events-none"
      >
        <Moon size={18} className="transition-transform group-hover:-rotate-12 duration-500" />
      </motion.div>
    </button>
  );
};
