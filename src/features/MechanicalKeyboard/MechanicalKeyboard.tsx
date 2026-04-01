import React, { useState, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeColors } from '../../hooks/useThemeColors';

// ── Dynamic Icon Import ────────────────────────────────────────────────────
const iconModules = import.meta.glob('../../assets/icons/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

// ── Skill Metadata ─────────────────────────────────────────────────────────
interface SkillMeta {
  name: string;
  legend: string;
  glow: string;
  tooltip: string;
  /** Icons that are dark/monochrome SVGs — invert them in dark mode so they remain visible */
  needsDarkInvert?: boolean;
}

const SKILL_MAP: Record<string, SkillMeta> = {
  'Azure.svg': {
    name: 'Azure',
    legend: 'AZ',
    glow: '#0078D4',
    tooltip: "Microsoft's cloud-based platform for deploying scalable ML endpoints, cognitive services, and containerised AI workloads.",
  },
  'C++ (CPlusPlus).svg': {
    name: 'C++',
    legend: 'C++',
    glow: '#00599C',
    tooltip: "High-performance inference engines, custom kernels, and robotics control loops use system-level languages.",
  },
  'C.svg': {
    name: 'C',
    legend: 'C',
    glow: '#A8B9CC',
    tooltip: "Low-level systems programming, memory management, and pointer arithmetic, and the foundation of embedded ML firmware.",
  },
  'Docker.svg': {
    name: 'Docker',
    legend: 'DK',
    glow: '#2496ED',
    tooltip: "Containerises ML environments for perfectly reproducible training, evaluation, and production inference pipelines.",
  },
  'FastAPI.svg': {
    name: 'FastAPI',
    legend: 'FA',
    glow: '#009688',
    tooltip: "Async Python framework for building high-throughput async Python applications that wrap machine learning models into production-grade REST APIs with auto-generated OpenAPI docs.",
  },
  'Git.svg': {
    name: 'Git',
    legend: 'GT',
    glow: '#F05032',
    tooltip: "Distributed version control for experiment branching, model checkpoint tracking, and code review.",
  },
  'GitHub.svg': {
    name: 'GitHub',
    legend: 'GH',
    glow: '#9B9B9B',
    tooltip: "Version control and open source collaboration platform -- PRs, Actions CI/CD pipelines, and the public portfolio of every serious developer.",
    needsDarkInvert: true,
  },
  'Google Cloud.svg': {
    name: 'Google Cloud',
    legend: 'GCP',
    glow: '#4285F4',
    tooltip: "Cloud infrastructure for scalable training on TPUs, Vertex AI model registry, and BigQuery data analytics.",
  },
  'JavaScript.svg': {
    name: 'JavaScript',
    legend: 'JS',
    glow: '#F7DF1E',
    tooltip: "Enables browser-side ML inference via TensorFlow.js and powers rich interactive data-driven web interfaces.",
  },
  'Keras.svg': {
    name: 'Keras',
    legend: 'KR',
    glow: '#D00000',
    tooltip: "High-level neural network API for rapid prototyping of deep learning architectures with clean, readable model definitions.",
  },
  'Matplotlib.svg': {
    name: 'Matplotlib',
    legend: 'MPL',
    glow: '#11557C',
    tooltip: "Go-to Python visualisation library for plotting training curves, confusion matrices, and feature distribution analysis.",
  },
  'Microsoft-Power-Bi--Streamline-Svg-Logos.svg': {
    name: 'Power BI',
    legend: 'PBI',
    glow: '#F2C811',
    tooltip: "Business intelligence platform for building interactive dashboards that translate ML insights into executive-ready reports.",
  },
  'MongoDB.svg': {
    name: 'MongoDB',
    legend: 'MDB',
    glow: '#47A248',
    tooltip: "Flexible document store for persisting unstructured training metadata, model logs, and real-time inference results.",
  },
  'MySQL.svg': {
    name: 'MySQL',
    legend: 'MY',
    glow: '#4479A1',
    tooltip: "Relational database for structured feature stores, experiment tracking tables, and data pipeline orchestration.",
  },
  'Neural-Network-2.svg': {
    name: 'Neural Networks',
    legend: 'NN',
    glow: '#8E44AD',
    tooltip: "Architecting and training dense, convolutional, and recurrent networks from first principles for classification, detection, and generation.",
    needsDarkInvert: true,
  },
  'NumPy.svg': {
    name: 'NumPy',
    legend: 'NP',
    glow: '#4DABF7',
    tooltip: "The numerical backbone of the Python ML ecosystem, providing vectorised array operations that underpin every major framework.",
  },
  'Pandas.svg': {
    name: 'Pandas',
    legend: 'PD',
    glow: '#E67E00',
    tooltip: "DataFrame library for high-velocity data wrangling, feature engineering, and exploratory statistical analysis.",
    needsDarkInvert: true,
  },
  'React.svg': {
    name: 'React',
    legend: 'RCT',
    glow: '#61DAFB',
    tooltip: "Component-based UI framework for building interactive ML dashboards, annotation tools, and model demo interfaces.",
  },
  'SQL Developer.svg': {
    name: 'SQL',
    legend: 'SQL',
    glow: '#F80000',
    tooltip: "Declarative query language for extracting, transforming, and aggregating data directly from relational feature stores.",
  },
  'Tailwind CSS.svg': {
    name: 'Tailwind CSS',
    legend: 'TW',
    glow: '#06B6D4',
    tooltip: "Utility-first CSS framework for rapidly building responsive, design-consistent ML product interfaces.",
  },
  'TensorFlow.svg': {
    name: 'TensorFlow',
    legend: 'TF',
    glow: '#FF6F00',
    tooltip: "Google's end-to-end ML platform for large-scale training, TFLite edge deployment, and TF Serving production inference.",
  },
  'ci-cd-svgrepo-com.svg': {
    name: 'CI/CD',
    legend: 'CD',
    glow: '#5DADE2',
    tooltip: "Automated build, test, and deploy pipelines via GitHub Actions & Docker — shipping ML models to production without manual steps.",
    needsDarkInvert: true,
  },
  'data-science.png': {
    name: 'Data Science',
    legend: 'DS',
    glow: '#845EF7',
    tooltip: "Interdisciplinary practice of extracting actionable insights from complex datasets using statistics, ML, and domain expertise.",
  },
  'deep-learning-svgrepo-com.svg': {
    name: 'Deep Learning',
    legend: 'DL',
    glow: '#1ABC9C',
    tooltip: "Multi-layer representation learning — CNNs, RNNs, Transformers, and attention mechanisms for computer vision and NLP.",
    needsDarkInvert: true,
  },
  'icons8-yolo.svg': {
    name: 'YOLOv8',
    legend: 'YL',
    glow: '#00FFAA',
    tooltip: "State-of-the-art single-shot object detector delivering real-time inference at extraordinary accuracy for production vision pipelines.",
  },
  'machine-learning-svgrepo-com.svg': {
    name: 'Machine Learning',
    legend: 'ML',
    glow: '#FF6B6B',
    tooltip: "The discipline of building systems that learn statistical patterns from data to make predictions without explicit programming.",
    needsDarkInvert: true,
  },
  'model-optimization.png': {
    name: 'Model Optim.',
    legend: 'OPT',
    glow: '#FFA94D',
    tooltip: "Pruning, quantisation, and distillation techniques that shrink model size up to 10x without significant accuracy degradation.",
    needsDarkInvert: true,
  },
  'nlp_10306045.png': {
    name: 'NLP',
    legend: 'NLP',
    glow: '#74C0FC',
    tooltip: "Teaching machines to understand, generate, and reason over human language -- from tokenisation to transformer fine-tuning.",
  },
  'object.png': {
    name: 'Object Detect.',
    legend: 'OBJ',
    glow: '#63E6BE',
    tooltip: "Localising and classifying multiple entities within an image frame -- the cornerstone of computer vision in production systems.",
  },
  'opencv-svgrepo-com.svg': {
    name: 'OpenCV',
    legend: 'CV',
    glow: '#5C3EE8',
    tooltip: "Industry-standard computer vision library for real-time image preprocessing, contour analysis, and camera calibration.",
  },
  'pytorch-icon.svg': {
    name: 'PyTorch',
    legend: 'PT',
    glow: '#EE4C2C',
    tooltip: "Dynamic autograd framework of choice for cutting-edge research -- from custom loss functions to transformer architecture experiments.",
  },
  'python-icon.svg': {
    name: 'Python',
    legend: 'PY',
    glow: '#3776AB',
    tooltip: "The lingua franca of AI/ML -- clean syntax, a universe of libraries, and the backbone of every major data science and deep learning pipeline.",
  },
  'rag.png': {
    name: 'RAG',
    legend: 'RAG',
    glow: '#F783AC',
    tooltip: "Retrieval-Augmented Generation grounds LLM outputs in verified external knowledge to eliminate hallucinations in production.",
  },
  'scikit-learn.svg': {
    name: 'Scikit-Learn',
    legend: 'SKL',
    glow: '#F7931E',
    tooltip: "The gold standard ML library for classical algorithms, model selection pipelines, and rigorous cross-validated benchmarking.",
  },
  'transformers.png': {
    name: 'Transformers',
    legend: 'HF',
    glow: '#FFD21E',
    tooltip: "Hugging Face Transformers -- instant access to 200K+ pretrained models for NLP, vision, and multimodal fine-tuning tasks.",
  },
};

// ── Build Resolved Skill List ────────────────────────────────────────────────
interface Skill {
  id: string;
  name: string;
  legend: string;
  glow: string;
  tooltip: string;
  iconUrl: string;
  needsDarkInvert?: boolean;
}

// Skills sorted alphabetically — 34 total
const skills: Skill[] = Object.entries(iconModules)
  .map(([path, url]): Skill | null => {
    const filename = path.split('/').pop() ?? '';
    const meta = SKILL_MAP[filename];
    if (!meta) return null;
    return { id: filename, name: meta.name, legend: meta.legend, glow: meta.glow, tooltip: meta.tooltip, iconUrl: url, needsDarkInvert: meta.needsDarkInvert };
  })
  .filter((s): s is Skill => s !== null)
  .sort((a, b) => a.name.localeCompare(b.name));

// ── 5-Row layout Configuration ───────────────────────────────────────────────
interface ModKey {
  label: string;
  sub: string;
  u: number;
}

interface RowConfig {
  left: ModKey[];
  skillCount: number;
  right: ModKey[];
  isBottomRow?: boolean;
}

const ROW_LAYOUTS: RowConfig[] = [
  {
    left: [{ label: '`', sub: '~', u: 1.25 }],
    skillCount: 6,
    right: [
      { label: '-', sub: '_', u: 1 },
      { label: '=', sub: '+', u: 1 },
      { label: 'BACKSPACE', sub: '⌫', u: 2.75 }
    ]
  },
  {
    left: [{ label: 'TAB', sub: '⇥', u: 1.5 }],
    skillCount: 7,
    right: [
      { label: '[', sub: '{', u: 1 },
      { label: ']', sub: '}', u: 1 },
      { label: '\\', sub: '|', u: 1.5 }
    ]
  },
  {
    left: [{ label: 'CAPS LOCK', sub: '', u: 1.75 }],
    skillCount: 8,
    right: [
      { label: 'ENTER', sub: '↵', u: 2.25 }
    ]
  },
  {
    left: [{ label: 'SHIFT', sub: '⇧', u: 2.25 }],
    skillCount: 7,
    right: [{ label: 'SHIFT', sub: '⇧', u: 2.75 }]
  },
  {
    left: [
      { label: 'CTRL', sub: '', u: 1.25 },
      { label: 'WIN', sub: '', u: 1.25 }
    ],
    skillCount: 6,
    right: [
      { label: 'ALT', sub: '', u: 1.0 }
    ],
    isBottomRow: true
  }
];

// Helper to calc width dynamically using CSS variables defined in the container
const uWidth = (u: number) => `calc(${u} * var(--key-base) + (${u} - 1) * var(--key-gap))`;

// ── Function Row Key Component ───────────────────────────────────────────────
interface FRowKeyProps {
  label: string;
  isLightMode: boolean;
  width?: string;
  Icon?: React.FC<{ className?: string; style?: React.CSSProperties }>;
  iconText?: string;
}

const FRowKey: React.FC<FRowKeyProps> = ({ label, isLightMode, width = 'var(--key-base)', Icon, iconText }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const bgBase = isLightMode ? '#D5CDC6' : '#1A1817';
  const bgHover = isLightMode ? '#DFD8D2' : '#22201E';
  const bgPressed = isLightMode ? '#C8BFB7' : '#141210';

  const shadowBase = isLightMode
    ? 'inset 0 1px 0 rgba(255,255,255,0.7), 0 4px 0 #A89F9A, 0 5px 6px rgba(0,0,0,0.15)'
    : 'inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 0 #050404, 0 5px 8px rgba(0,0,0,0.5)';
    
  const shadowPressed = isLightMode
    ? 'inset 0 2px 4px rgba(0,0,0,0.1), 0 0px 0 #A89F9A, 0 1px 1px rgba(0,0,0,0.1)'
    : 'inset 0 2px 5px rgba(0,0,0,0.5), 0 0px 0 #050404, 0 1px 1px rgba(0,0,0,0.2)';

  // Primary Icon color (Stronger presence, centered)
  const iconColor = isLightMode ? 'rgba(50, 40, 35, 0.85)' : 'rgba(230, 215, 205, 0.85)';
  // Secondary Sub-Legend color (Muted presence, top-left)
  const labelColor = isLightMode ? 'rgba(70, 55, 45, 0.45)' : 'rgba(210, 195, 185, 0.35)';

  return (
    <button
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsPressed(false); setIsHovered(false); }}
      className="relative flex-shrink-0 rounded-[4px] md:rounded-[6px] select-none cursor-pointer overflow-hidden"
      style={{
        width,
        height: 'calc(var(--key-base) * 0.7)',
        background: isPressed ? bgPressed : isHovered ? bgHover : bgBase,
        boxShadow: isPressed ? shadowPressed : shadowBase,
        border: `1px solid ${isLightMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.04)'}`,
        transform: isPressed ? 'translateY(4px)' : 'translateY(0)',
        transition: 'transform 0.08s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.08s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.1s ease',
      }}
    >
      {label === 'ESC' || label === 'DEL' ? (
        <div className="absolute inset-0 flex items-center justify-center gap-1.5 pointer-events-none">
          {Icon && (
            <Icon className="w-[18%] h-[18%] transition-colors duration-200" style={{ color: iconColor }} />
          )}
          <span 
            className="font-mono font-bold tracking-wider leading-none" 
            style={{ color: labelColor, fontSize: 'calc(var(--key-base) * 0.22)' }}
          >
            {label}
          </span>
        </div>
      ) : (
        <>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-[5%]">
            {Icon && (
              <Icon className="w-[38%] h-[38%] transition-colors duration-200" style={{ color: iconColor }} />
            )}
            {iconText && (
              <span 
                className="font-mono font-bold uppercase leading-none text-center whitespace-nowrap" 
                style={{ color: iconColor, fontSize: 'calc(var(--key-base) * 0.14)', letterSpacing: '0.02em', transition: 'color 0.2s' }}
              >
                {iconText}
              </span>
            )}
          </div>
          <span 
            className="absolute font-mono tracking-widest leading-none pointer-events-none" 
            style={{ 
              color: labelColor, 
              fontSize: 'calc(var(--key-base) * 0.15)', 
              bottom: 'calc(var(--key-base) * 0.08)', 
              right: 'calc(var(--key-base) * 0.1)',
              transition: 'color 0.2s' 
            }}
          >
            {label}
          </span>
        </>
      )}

      {/* Sheen effect for 3D realism */}
      <div className="absolute top-0 left-0.5 right-0.5 h-[1px] rounded-full pointer-events-none"
        style={{ background: isLightMode ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.04)' }}
      />
    </button>
  );
};

// ── Modifier Key Component ───────────────────────────────────────────────────
interface ModifierKeyProps {
  label: string;
  sub: string;
  u: number;
  isLightMode: boolean;
}

const ModifierKey: React.FC<ModifierKeyProps> = ({ label, sub, u, isLightMode }) => {
  const [isPressed, setIsPressed] = useState(false);

  const bg = isLightMode ? '#D6CFC9' : '#161412';
  const bgPressed = isLightMode ? '#C8C1BB' : '#0F0D0C';
  const border = isLightMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.05)';
  const shadow = isLightMode
    ? `inset 0 1px 0 rgba(255,255,255,0.85), 3px 5px 10px rgba(0,0,0,0.14), -2px -2px 7px rgba(255,255,255,0.7)`
    : `inset 0 1px 0 rgba(255,255,255,0.05), 4px 5px 14px rgba(0,0,0,0.55), -2px -2px 7px rgba(255,255,255,0.02)`;
  const shadowPressed = isLightMode
    ? `inset 0 2px 5px rgba(0,0,0,0.12)`
    : `inset 0 3px 8px rgba(0,0,0,0.65)`;
  const labelColor = isLightMode ? 'rgba(70,55,48,0.7)' : 'rgba(180,160,145,0.6)';
  const subColor = isLightMode ? 'rgba(70,55,48,0.4)' : 'rgba(180,160,145,0.3)';

  const isWordCombo = label.length > 1;

  return (
    <button
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`relative flex-shrink-0 flex items-center justify-center select-none cursor-pointer modifier-key rounded-[6px] md:rounded-xl overflow-hidden ${isWordCombo ? 'flex-row gap-1.5' : 'flex-col'}`}
      style={{
        width: uWidth(u),
        height: 'var(--key-base)',
        background: isPressed ? bgPressed : bg,
        boxShadow: isPressed ? shadowPressed : shadow,
        border: `1px solid ${border}`,
        transform: isPressed ? 'translateY(2px)' : 'translateY(0)',
        transition: 'transform 0.06s ease, box-shadow 0.1s ease, background 0.1s ease',
      }}
    >
      {isWordCombo ? (
        <>
          {sub && <span className="leading-none pb-[1px]" style={{ color: subColor, fontSize: 'calc(var(--key-base) * 0.28)' }}>{sub}</span>}
          <span className="font-mono font-semibold tracking-widest uppercase leading-none" style={{ color: labelColor }}>
            {label}
          </span>
        </>
      ) : (
        <>
          {sub && <span className="leading-none pb-[4px] md:pb-[6px]" style={{ color: subColor }}>{sub}</span>}
          <span className="font-mono font-semibold tracking-widest uppercase leading-none" style={{ color: labelColor }}>
            {label}
          </span>
        </>
      )}
      {/* Sheen */}
      <div className="absolute top-0 left-2 right-2 h-[1px] rounded-full pointer-events-none"
        style={{ background: isLightMode ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.08)' }}
      />
    </button>
  );
};

// ── Tooltip Portal (shared by HeroKey & Keycap) ──────────────────────────────
interface TooltipPortalProps {
  anchorRef: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  width: number;
  isLightMode: boolean;
  glow: string;
  name: string;
  tooltipText: string;
}

const TOOLTIP_HEIGHT_APPROX = 120;

const TooltipPortal: React.FC<TooltipPortalProps> = ({ anchorRef, isVisible, width, isLightMode, glow, name, tooltipText }) => {
  if (typeof document === 'undefined') return null;

  const computePos = () => {
    if (!anchorRef.current) return null;
    const r = anchorRef.current.getBoundingClientRect();
    const flipDown = r.top < TOOLTIP_HEIGHT_APPROX + 16;
    const rawLeft = r.left + r.width / 2 - width / 2;
    return {
      top: flipDown ? r.bottom + 8 : r.top - TOOLTIP_HEIGHT_APPROX - 8,
      left: Math.max(8, Math.min(window.innerWidth - width - 8, rawLeft)),
      flipDown,
    };
  };

  const arrowStyle: React.CSSProperties = {
    background: isLightMode ? 'rgba(255,249,244,0.92)' : 'rgba(22,18,16,0.92)',
    border: `1px solid ${isLightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)'}`,
  };

  return createPortal(
    <AnimatePresence>
      {isVisible && (() => {
        const p = computePos();
        if (!p) return null;
        return (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: p.flipDown ? -8 : 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: p.flipDown ? -6 : 6, scale: 0.94 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: p.top,
              left: p.left,
              width,
              zIndex: 99999,
              pointerEvents: 'none',
            }}
          >
            <div
              className="rounded-xl px-3.5 py-3 text-center"
              style={{
                background: isLightMode ? 'rgba(255,249,244,0.88)' : 'rgba(22,18,16,0.88)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: `1px solid ${isLightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)'}`,
                boxShadow: `0 4px 28px rgba(0,0,0,${isLightMode ? '0.1' : '0.45'}), 0 0 18px ${glow}44`,
              }}
            >
              <p className="text-xs font-mono font-bold uppercase tracking-widest mb-1.5" style={{ color: glow, textShadow: `0 0 16px ${glow}99` }}>
                {name}
              </p>
              <p className="text-[11px] leading-relaxed font-sans font-light" style={{ color: isLightMode ? '#4A3E38' : '#C8B8A8' }}>
                {tooltipText}
              </p>
            </div>
            {/* Arrow — points down when tooltip is above key, up when below */}
            <div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 rounded-sm"
              style={{
                ...arrowStyle,
                ...(p.flipDown
                  ? { top: '-6px', borderBottom: 'none', borderRight: 'none' }
                  : { bottom: '-6px', borderTop: 'none', borderLeft: 'none' }),
              }}
            />
          </motion.div>
        );
      })()}
    </AnimatePresence>,
    document.body
  );
};

// ── Hero Python Key ──────────────────────────────────────────────────────────
interface HeroKeyProps {
  skill: Skill;
  isLightMode: boolean;
}

const HeroKey: React.FC<HeroKeyProps> = ({ skill, isLightMode }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const keyRef = useRef<HTMLDivElement>(null);

  const shadowBase = isLightMode
    ? `inset 0 1px 0 rgba(255,255,255,0.95), 3px 5px 14px rgba(0,0,0,0.14), -2px -3px 8px rgba(255,255,255,0.8)`
    : `inset 0 1px 0 rgba(255,255,255,0.09), 4px 6px 18px rgba(0,0,0,0.55), -2px -2px 8px rgba(255,255,255,0.04)`;
  const shadowHover = isLightMode
    ? `inset 0 1px 0 rgba(255,255,255,0.95), 3px 5px 16px rgba(0,0,0,0.16), -2px -3px 8px rgba(255,255,255,0.8), 0 0 28px ${skill.glow}66, 0 0 60px ${skill.glow}22`
    : `inset 0 1px 0 rgba(255,255,255,0.12), 4px 6px 20px rgba(0,0,0,0.6), -2px -2px 8px rgba(255,255,255,0.04), 0 0 30px ${skill.glow}77, 0 0 70px ${skill.glow}33`;
  const shadowPressed = isLightMode
    ? `inset 0 2px 8px rgba(0,0,0,0.12), inset 0 1px 4px rgba(0,0,0,0.08)`
    : `inset 0 3px 10px rgba(0,0,0,0.65), inset 0 1px 5px rgba(0,0,0,0.45)`;

  const bg = isLightMode ? '#EBE5E0' : '#1E1C1B';
  const bgHover = isLightMode ? '#F2EDE8' : '#27231F';
  const bgPressed = isLightMode ? '#DDD7D2' : '#181614';
  const legendColor = isLightMode ? 'rgba(80,60,50,0.4)' : 'rgba(200,180,160,0.3)';
  const borderColor = isLightMode
    ? (isHovered ? `${skill.glow}66` : 'rgba(0,0,0,0.08)')
    : (isHovered ? `${skill.glow}77` : 'rgba(255,255,255,0.06)');

  return (
    <div className="relative flex flex-col items-center">
      <TooltipPortal
        anchorRef={keyRef}
        isVisible={isHovered && !isPressed}
        width={240}
        isLightMode={isLightMode}
        glow={skill.glow}
        name={skill.name}
        tooltipText={skill.tooltip}
      />

      {/* Wide Hero Keycap */}
      <motion.div
        ref={keyRef}
        animate={{ y: isPressed ? 3 : 0, scale: isHovered && !isPressed ? 1.04 : 1 }}
        transition={{ y: { duration: 0.06, ease: 'easeOut' }, scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
        className="relative cursor-pointer select-none rounded-xl flex items-center justify-center gap-3 px-5 hero-key"
        style={{
          width: uWidth(2.5),
          height: 'var(--key-base)',
          background: isPressed ? bgPressed : isHovered ? bgHover : bg,
          boxShadow: isPressed ? shadowPressed : isHovered ? shadowHover : shadowBase,
          border: `1px solid ${borderColor}`,
          transition: 'background 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        }}
      >
        <img
          src={skill.iconUrl}
          alt={skill.name}
          className="w-9 h-9 object-contain flex-shrink-0"
          draggable={false}
          style={{
            filter: [
              (!isLightMode && skill.needsDarkInvert) ? 'brightness(0) invert(1) opacity(0.92)' : '',
              isHovered ? `drop-shadow(0 0 8px ${skill.glow}dd)` : '',
            ].filter(Boolean).join(' ') || 'none',
            transition: 'filter 0.25s ease',
          }}
        />
        <div className="flex flex-col items-start min-w-0">
          <span className="font-mono font-bold leading-none tracking-wider whitespace-nowrap" style={{ fontSize: 'calc(var(--key-base) * 0.25)', color: isHovered ? skill.glow : (isLightMode ? 'rgba(60,44,36,0.85)' : 'rgba(220,200,185,0.85)'), transition: 'color 0.2s ease' }}>
            Python
          </span>
          <span className="font-mono tracking-widest mt-[5%] leading-none whitespace-nowrap" style={{ fontSize: 'calc(var(--key-base) * 0.16)', color: legendColor }}>
            PY&nbsp;&nbsp;3.x
          </span>
        </div>
        <div className="absolute top-0 left-3 right-3 h-[1px] rounded-full pointer-events-none"
          style={{ background: isLightMode ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.12)' }}
        />
      </motion.div>
    </div>
  );
};

// ── Standard Skill Keycap ───────────────────────────────────────────────────
interface KeycapProps {
  skill: Skill;
  isLightMode: boolean;
}

const Keycap: React.FC<KeycapProps> = ({ skill, isLightMode }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const keyRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(() => setIsPressed(true), []);
  const handleMouseUp = useCallback(() => setIsPressed(false), []);
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => { setIsHovered(false); setIsPressed(false); }, []);

  const shadowBase = isLightMode
    ? `inset 0 1px 0 rgba(255,255,255,0.95), 3px 5px 12px rgba(0,0,0,0.12), -2px -3px 8px rgba(255,255,255,0.8)`
    : `inset 0 1px 0 rgba(255,255,255,0.07), 4px 6px 16px rgba(0,0,0,0.5), -2px -2px 8px rgba(255,255,255,0.03)`;
  const shadowPressed = isLightMode
    ? `inset 0 2px 6px rgba(0,0,0,0.1), inset 0 1px 3px rgba(0,0,0,0.08)`
    : `inset 0 3px 8px rgba(0,0,0,0.6), inset 0 1px 4px rgba(0,0,0,0.4)`;
  const shadowHover = isLightMode
    ? `inset 0 1px 0 rgba(255,255,255,0.95), 3px 5px 14px rgba(0,0,0,0.14), -2px -3px 8px rgba(255,255,255,0.8), 0 0 20px ${skill.glow}55, 0 0 40px ${skill.glow}22`
    : `inset 0 1px 0 rgba(255,255,255,0.1), 4px 6px 18px rgba(0,0,0,0.55), -2px -2px 8px rgba(255,255,255,0.04), 0 0 20px ${skill.glow}66, 0 0 50px ${skill.glow}33`;

  const keycapBg = isLightMode ? '#EBE5E0' : '#1E1C1B';
  const keycapBgHover = isLightMode ? '#F0EBE6' : '#242220';
  const keycapBgPressed = isLightMode ? '#DDD7D2' : '#181614';
  const legendColor = isLightMode ? 'rgba(80,60,50,0.45)' : 'rgba(200,180,160,0.35)';
  const borderColor = isLightMode
    ? (isHovered ? `${skill.glow}55` : 'rgba(0,0,0,0.08)')
    : (isHovered ? `${skill.glow}66` : 'rgba(255,255,255,0.06)');

  const currentBg = isPressed ? keycapBgPressed : isHovered ? keycapBgHover : keycapBg;
  const currentShadow = isPressed ? shadowPressed : isHovered ? shadowHover : shadowBase;

  return (
    <div className="relative flex flex-col items-center flex-shrink-0">
      <TooltipPortal
        anchorRef={keyRef}
        isVisible={isHovered && !isPressed}
        width={208}
        isLightMode={isLightMode}
        glow={skill.glow}
        name={skill.name}
        tooltipText={skill.tooltip}
      />

      {/* Keycap Body */}
      <motion.div
        ref={keyRef}
        animate={{ y: isPressed ? 3 : 0, scale: isHovered && !isPressed ? 1.07 : 1 }}
        transition={{ y: { duration: 0.06, ease: 'easeOut' }, scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative cursor-pointer select-none rounded-xl flex flex-col items-center justify-center flex-shrink-0 standard-key"
        style={{
          width: 'var(--key-base)',
          height: 'var(--key-base)',
          background: currentBg,
          boxShadow: currentShadow,
          border: `1px solid ${borderColor}`,
          transition: 'background 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        }}
      >
        <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center mb-0.5">
          <img
            src={skill.iconUrl}
            alt={skill.name}
            className="w-full h-full object-contain"
            draggable={false}
            style={{
              filter: [
                (!isLightMode && skill.needsDarkInvert) ? 'brightness(0) invert(1) opacity(0.92)' : '',
                isHovered ? `drop-shadow(0 0 6px ${skill.glow}cc)` : '',
              ].filter(Boolean).join(' ') || 'none',
              transition: 'filter 0.25s ease',
            }}
          />
        </div>
        <span
          className="absolute font-mono tracking-widest leading-none pointer-events-none"
          style={{ color: legendColor }}
        >
          {skill.legend}
        </span>
        <div
          className="absolute top-0 left-2 right-2 h-[1px] rounded-full pointer-events-none"
          style={{ background: isLightMode ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.12)' }}
        />
      </motion.div>
    </div>
  );
};

// Inline Icons mapped to standard macOS/Windows media keys
const F1Icon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>;
const F2Icon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
const F3Icon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>;
const F4Icon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="6 4 14 12 6 20 6 4"/><rect x="18" y="4" width="2" height="16"/></svg>;
const F5Icon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 13h18v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6z"/><path d="M12 9v-4"/><path d="M8 8l-2-2"/><path d="M16 8l2-2"/><line x1="7" y1="17" x2="7.01" y2="17"/><line x1="12" y1="17" x2="12.01" y2="17"/><line x1="17" y1="17" x2="17.01" y2="17"/></svg>;
const F6Icon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="4"/><path d="M12 4v2M12 18v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M4 12h2M18 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
const F7Icon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="5"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>;
const F8Icon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="4" width="20" height="14" rx="2" ry="2"/><path d="M8 22h8"/><path d="M12 18v4"/><path d="M6 14c1.5 0 2.5-1 2.5-2.5"/><path d="M6 10c3.5 0 6 2.5 6 6.5"/></svg>;
const DelIcon = (props: any) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>;

export const MechanicalKeyboard: React.FC = () => {
  const themeColors = useThemeColors();
  const isLightMode = themeColors?.bg === '#FAF5EF';

  const pythonSkill = skills.find(s => s.name.toLowerCase().includes('python')) ?? null;
  const otherSkills = skills.filter(s => !s.name.toLowerCase().includes('python'));
  const heroSkill = pythonSkill ?? otherSkills.find(s => s.name === 'PyTorch') ?? null;
  const nonHeroSkills = heroSkill ? skills.filter(s => s.id !== heroSkill.id) : skills;

  const rows: typeof nonHeroSkills[] = [];
  let cursor = 0;
  for (const layout of ROW_LAYOUTS) {
    rows.push(nonHeroSkills.slice(cursor, cursor + layout.skillCount));
    cursor += layout.skillCount;
  }

  // F-Key Layout Mapping
  const F_BLOCK_1 = [
    { label: 'F1', icon: F1Icon },
    { label: 'F2', icon: F2Icon },
    { label: 'F3', icon: F3Icon },
    { label: 'F4', icon: F4Icon },
  ];
  
  const F_BLOCK_2 = [
    { label: 'F5', icon: F5Icon },
    { label: 'F6', icon: F6Icon },
    { label: 'F7', icon: F7Icon },
    { label: 'F8', icon: F8Icon },
  ];
  
  const F_BLOCK_3 = [
    { label: 'F9', iconText: 'PRT SC' },
    { label: 'F10', iconText: 'HOME' },
    { label: 'F11', iconText: 'END' },
    { label: 'F12', iconText: 'INSERT' },
  ];

  return (
    <div className="w-[88%] max-w-[88%] mx-auto flex flex-col items-center py-6 px-1 md:py-10 md:px-2 overflow-x-hidden keyboard-wrapper">
      <style>{`
        /* Base (mobile) — class rule so media queries below can override.
           Key sizes are calculated so 12u rows fit within ~88vw at each breakpoint:
           Row total = 12×key-base + 11×key-gap + shell-padding(48px at md+) */
        .keyboard-wrapper { --key-base: 26px; --key-gap: 3px; }
        @media (min-width: 480px)  { .keyboard-wrapper { --key-base: 34px;  --key-gap: 4px;  } }
        @media (min-width: 640px)  { .keyboard-wrapper { --key-base: 44px;  --key-gap: 5px;  } }
        @media (min-width: 768px)  { .keyboard-wrapper { --key-base: 54px;  --key-gap: 6px;  } }
        @media (min-width: 1024px) { .keyboard-wrapper { --key-base: 64px;  --key-gap: 8px;  } }
        @media (min-width: 1280px) { .keyboard-wrapper { --key-base: 78px;  --key-gap: 10px; } }
        @media (min-width: 1536px) { .keyboard-wrapper { --key-base: 94px;  --key-gap: 12px; } }
        .hero-key img { width: calc(var(--key-base) * 0.44); height: calc(var(--key-base) * 0.44); }
        .standard-key .w-7 { width: calc(var(--key-base) * 0.4); height: calc(var(--key-base) * 0.4); }
        .modifier-key span:first-child { font-size: calc(var(--key-base) * 0.2); }
        .modifier-key span:last-child  { font-size: calc(var(--key-base) * 0.25); }
        .standard-key span { font-size: calc(var(--key-base) * 0.15); bottom: calc(var(--key-base) * 0.08); right: calc(var(--key-base) * 0.1); }
      `}</style>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-[20px] md:rounded-[36px] p-3 sm:p-4 md:p-8"
        style={{
          background: isLightMode
            ? 'linear-gradient(160deg, #D8D0CA 0%, #C9C1BB 100%)'
            : 'linear-gradient(160deg, #141210 0%, #0A0806 100%)',
          boxShadow: isLightMode
            ? `0 20px 40px -10px rgba(0,0,0,0.15), 0 8px 16px -8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.75)`
            : `0 20px 40px -10px rgba(0,0,0,0.8), 0 8px 16px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`,
          border: isLightMode ? '1px solid rgba(0,0,0,0.07)' : '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div className="mb-4 px-1 text-left">
          <div className="text-[9px] font-mono tracking-[0.3em] uppercase opacity-40" style={{ color: isLightMode ? '#4A3E38' : '#C8B8A8' }}>
            TECH&middot;STACK
          </div>
        </div>

        <div className="flex flex-col gap-[var(--key-gap)] items-center">
          {/* ── Function Key Row ── */}
          <motion.div 
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full justify-between items-end mb-2 md:mb-3 px-0.5"
          >
            <FRowKey label="ESC" isLightMode={isLightMode} width="calc(var(--key-base) * 1.1)" />
            <div className="flex gap-[calc(var(--key-gap)*0.75)]">
              {F_BLOCK_1.map(key => <FRowKey key={key.label} label={key.label} Icon={key.icon} isLightMode={isLightMode} width="calc(var(--key-base) * 0.8)" />)}
            </div>
            <div className="flex gap-[calc(var(--key-gap)*0.75)]">
              {F_BLOCK_2.map(key => <FRowKey key={key.label} label={key.label} Icon={key.icon} isLightMode={isLightMode} width="calc(var(--key-base) * 0.8)" />)}
            </div>
            <div className="flex gap-[calc(var(--key-gap)*0.75)]">
              {F_BLOCK_3.map(key => <FRowKey key={key.label} label={key.label} iconText={key.iconText} isLightMode={isLightMode} width="calc(var(--key-base) * 0.8)" />)}
            </div>
            <FRowKey label="DEL" isLightMode={isLightMode} width="calc(var(--key-base) * 0.9)" Icon={DelIcon} />
          </motion.div>

          {rows.map((rowSkills, rowIdx) => {
            const layout = ROW_LAYOUTS[rowIdx];
            return (
              <motion.div
                key={rowIdx}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.08 + rowIdx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-[var(--key-gap)] w-full justify-start"
              >
                {layout.left.map((mod, i) => (
                  <ModifierKey key={`l-${i}`} label={mod.label} sub={mod.sub} u={mod.u} isLightMode={isLightMode} />
                ))}

                {!layout.isBottomRow ? (
                  rowSkills.map((skill) => <Keycap key={skill.id} skill={skill} isLightMode={isLightMode} />)
                ) : (
                  <>
                    {rowSkills.slice(0, 3).map((skill) => <Keycap key={skill.id} skill={skill} isLightMode={isLightMode} />)}
                    {heroSkill && <HeroKey skill={heroSkill} isLightMode={isLightMode} />}
                    {rowSkills.slice(3, 6).map((skill) => <Keycap key={skill.id} skill={skill} isLightMode={isLightMode} />)}
                  </>
                )}

                {layout.right.map((mod, i) => (
                  <ModifierKey key={`r-${i}`} label={mod.label} sub={mod.sub} u={mod.u} isLightMode={isLightMode} />
                ))}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
