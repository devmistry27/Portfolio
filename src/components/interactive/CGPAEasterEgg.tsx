import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const CGPAEasterEgg: React.FC = () => {
  const [state, setState] = useState<'idle' | 'loading' | 'revealed'>('idle');

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (state === 'loading') {
      timer = setTimeout(() => {
        setState('revealed');
      }, 1500);
    } else if (state === 'revealed') {
      // Auto-reset back to idle after 3.5 seconds
      timer = setTimeout(() => {
        setState('idle');
      }, 3500);
    }
    
    // Cleanup timeout to prevent memory leaks if component unmounts
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state]);

  // Framer Motion shared fade props matching reference site behavior 
  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 } // Removed string ease to fix TS union type lint error
  };

  const handleToggle = () => {
    if (state === 'idle') setState('loading');
    else if (state === 'revealed') setState('idle');
  };

  return (
    <div className="min-h-[28px] pl-3 flex items-center gap-3 relative flex-wrap md:flex-nowrap">
      
      {/* Permanent Toggle Switch */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-light-taupe text-sm font-light">CGPA:</span>
        <button
          onClick={handleToggle}
          disabled={state === 'loading'}
          className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none ${
            state === 'idle' ? 'bg-dark-border' : 'bg-brand-orange'
          }`}
          aria-label="Toggle CGPA reveal"
        >
          <motion.div
            className="inline-block h-3 w-3 rounded-full bg-light-cream shadow-sm"
            animate={{ x: state === 'idle' ? 2 : 18 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>

      <AnimatePresence mode="wait">
        
        {/* INITIAL TEXT */}
        {state === 'idle' && (
          <motion.div
            key="idle"
            {...fadeVariants}
            className="text-light-taupe/50 text-xs italic"
          >
            (Toggle to reveal)
          </motion.div>
        )}

        {/* LOADING STATE */}
        {state === 'loading' && (
          <motion.div
            key="loading"
            {...fadeVariants}
            className="flex items-center gap-2 text-brand-orange/80 text-[10px] font-mono tracking-widest uppercase"
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span className="animate-pulse">hmm, let me check 👀</span>
          </motion.div>
        )}

        {/* PUNCHLINE STATE */}
        {state === 'revealed' && (
          <motion.div
            key="revealed"
            {...fadeVariants}
            className="flex items-center"
          >
            <span className="text-light-cream text-sm italic font-light">
              nah, i dont really feel like telling it.
            </span>
          </motion.div>
        )}
        
      </AnimatePresence>
    </div>
  );
};


