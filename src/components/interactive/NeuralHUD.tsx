import React, { useEffect, useState } from 'react';

export const NeuralHUD: React.FC = () => {
  const [epoch, setEpoch] = useState(840);
  const [loss, setLoss] = useState(0.0142);

  // Simulate training loop for absolute realism
  useEffect(() => {
    const interval = setInterval(() => {
      setEpoch((prev) => (prev < 1000 ? prev + 1 : 1));
      setLoss((prev) => {
        const val = prev * 0.999 + (Math.random() * 0.001 - 0.0005);
        return Math.max(0.001, val);
      });
    }, 400); // Super fast training simulation
    return () => clearInterval(interval);
  }, []);

  const layer1 = [30, 60, 90];
  const layer2 = [20, 46, 73, 100];
  const layer3 = [45, 75];

  return (
    <div className="w-full h-full bg-dark-tertiary/20 backdrop-blur-md rounded-2xl border border-dark-border flex flex-col relative overflow-hidden group shadow-2xl shadow-dark-bg/50">
      
      {/* Top Header: MacOS Style */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-dark-border/50 bg-dark-bg/60">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-dark-border group-hover:bg-[#FF5F56] transition-colors duration-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-dark-border group-hover:bg-[#FFBD2E] transition-colors duration-300"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-brand-orange/50 group-hover:bg-[#27C93F] transition-colors duration-300"></div>
        </div>
        <span className="ml-auto flex items-center gap-2 font-mono text-[9px] text-light-taupe uppercase tracking-widest opacity-80">
          <span className="w-1.5 h-1.5 bg-brand-orange animate-pulse rounded-full"></span>
          CUDA_01 // ACTIVE
        </span>
      </div>

      {/* Interactive Visual Graph area */}
      <div className="flex-1 relative flex items-center justify-center p-2">
        <div className="absolute inset-0 bg-brand-red mix-blend-overlay opacity-0 group-hover:opacity-10 transition-opacity duration-1000"></div>
        
        <svg className="w-full h-full relative z-10" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="gradientLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-brand-orange)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--color-brand-red)" stopOpacity="0.8" />
            </linearGradient>
            
            <style>
              {`
                @keyframes strokeFlow {
                  from { stroke-dashoffset: 20; }
                  to { stroke-dashoffset: 0; }
                }
                .flowing-path {
                  animation: strokeFlow 0.8s linear infinite;
                }
              `}
            </style>
          </defs>

          {/* Background Static Connections Layer 1 -> Layer 2 */}
          {layer1.map((y1, i) =>
            layer2.map((y2, j) => (
              <path key={`bg1-${i}-${j}`} d={`M 30,${y1} C 65,${y1} 65,${y2} 100,${y2}`} className="stroke-dark-border overflow-visible" strokeWidth="1" fill="none" opacity="0.3" />
            ))
          )}
          
          {/* Background Static Connections Layer 2 -> Layer 3 */}
          {layer2.map((y1, i) =>
            layer3.map((y2, j) => (
              <path key={`bg2-${i}-${j}`} d={`M 100,${y1} C 135,${y1} 135,${y2} 170,${y2}`} className="stroke-dark-border overflow-visible" strokeWidth="1" fill="none" opacity="0.3" />
            ))
          )}

          {/* Foreground Animated Firing Connections (subset for visual clarity) */}
          <path d={`M 30,${layer1[1]} C 65,${layer1[1]} 65,${layer2[2]} 100,${layer2[2]}`} stroke="url(#gradientLine)" strokeWidth="1.5" fill="none" strokeDasharray="4 8" className="flowing-path" opacity="0.8" />
          <path d={`M 30,${layer1[0]} C 65,${layer1[0]} 65,${layer2[0]} 100,${layer2[0]}`} stroke="url(#gradientLine)" strokeWidth="1" fill="none" strokeDasharray="4 8" className="flowing-path" opacity="0.5" />
          <path d={`M 100,${layer2[2]} C 135,${layer2[2]} 135,${layer3[1]} 170,${layer3[1]}`} stroke="url(#gradientLine)" strokeWidth="1.5" fill="none" strokeDasharray="4 8" className="flowing-path" opacity="0.8" />
          <path d={`M 100,${layer2[0]} C 135,${layer2[0]} 135,${layer3[0]} 170,${layer3[0]}`} stroke="url(#gradientLine)" strokeWidth="1" fill="none" strokeDasharray="4 8" className="flowing-path" opacity="0.5" />


          {/* Input Nodes */}
          {layer1.map((y, i) => (
            <circle key={`l1-${i}`} cx="30" cy={y} r="3" className="fill-light-taupe group-hover:fill-brand-orange transition-colors duration-500" />
          ))}

          {/* Hidden Nodes */}
          {layer2.map((y, i) => (
            <g key={`l2-${i}`}>
               <circle cx="100" cy={y} r="4" className={i === 2 || i === 0 ? "fill-brand-red animate-pulse" : "fill-dark-border"} />
               {i === 2 && <circle cx="100" cy={y} r="8" className="fill-brand-red/20 animate-ping" />}
            </g>
          ))}

          {/* Output Nodes */}
          {layer3.map((y, i) => (
            <g key={`l3-${i}`}>
               <circle cx="170" cy={y} r="3" className={i === 1 || i === 0 ? "fill-brand-orange" : "fill-light-taupe"} />
            </g>
          ))}
        </svg>
      </div>

      {/* Telemetry Footer */}
      <div className="px-5 py-3 border-t border-dark-border/50 bg-dark-bg/80 flex flex-col gap-1.5 z-20">
        <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono tracking-widest">
          <span className="text-light-taupe/70">EPOCH</span>
          <span className="text-brand-orange transition-all duration-75">{epoch.toString().padStart(4, '0')}/1000</span>
        </div>
        <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono tracking-widest">
          <span className="text-light-taupe/70">VAL_LOSS</span>
          <span className="text-light-cream transition-all duration-75">{loss.toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
};
