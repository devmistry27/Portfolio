import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: "solarsight",
    title: "SolarSight",
    description: "Hybrid YOLOv8-OBB model for precise rooftop solar panel localization in satellite imagery.",
    longDescription: "SolarSight is a computer vision pipeline for geographical mapping of solar-related infrastructure. It utilizes satellite images via Google Maps Static API and performs inference on a YOLOv8-Medium model with Oriented Bounding Boxes (OBBs) for precise location, area calculation in m², and tilt angle determination. The SolarSight pipeline also includes checks via Euclidean distance and provides annotated visual artifacts based on confidence levels. This pipeline has been created using FastAPI for inference and React for the EcoInnovators Ideathon.",
    category: "Computer Vision",
    image: "/images/SolarSight.png",
    detailImage: "/images/SolarSight_UI.png",
    techStack: ["YOLOv8-OBB", "PyTorch", "FastAPI", "React", "Google Maps Static API"],
    githubUrl: "https://github.com/devmistry27/eco-innovators-ideathon-round-2",
    metrics: [
      { label: "mAP@50", value: "86.7%" },
      { label: "Precision", value: "85.5%" },
      { label: "Recall", value: "81.5%" }
    ],
    architecture: `Google Maps Static API → Satellite Image Fetch →\n  Adaptive Buffer Zone Classification (1200/2400 sq.ft) →\n    YOLOv8-Medium OBB Inference (1024px) →\n      Area Estimation + Euclidean Distance Verification →\n        FastAPI (Uvicorn) → React + Leaflet Client`
  },
  {
    id: "resonance",
    title: "Resonance",
    description: "Conversational AI built from scratch with a custom GPT-2 implementation, RAG, and real-time streaming.",
    longDescription: "Resonance is a full-stack LLM, built from scratch, using a completely custom implementation of the GPT-2 transformer architecture using the PyTorch library. It leverages a fine-tuned GPT-2 Large model (774M parameters), served through a lightning-fast FastAPI backend utilizing Server-Sent Events (SSE) for real-time streaming of tokens. The AI inference pipeline is further enhanced through a dynamic implementation of Retrieval-Augmented Generation (RAG), integrated with DuckDuckGo for context-aware web search injection. The entire conversational experience is hosted within a modern, glassmorphic React interface.",
    category: "Generative AI",
    image: "/images/Resonance.png",
    detailImage: "/images/Resonance_UI.png",
    techStack: ["PyTorch", "GPT-2 (774M, SFT)", "FastAPI", "React", "RAG"],
    githubUrl: "https://github.com/devmistry27/Resonance",
    metrics: [
      { label: "Model Parameters", value: "774M" },
      { label: "Transformer Blocks", value: "36 Layers" },
      { label: "Attention Heads", value: "20 Heads" },
      { label: "Context Window", value: "1,024 Tokens" },
      { label: "Vocabulary Size", value: "50,257 Tokens" },
      { label: "Hidden Size", value: "1,280" }
    ],
    architecture: `React 19 Client (UI & TailwindCSS) → SSE / REST →\n  FastAPI Backend Gateway → Session Manager →\n    DuckDuckGo Search Service (RAG) → Context Aggregation →\n      Model Service (tiktoken + Inference Engine) →\n        Custom PyTorch GPT-2 Large (36 Blocks × 20-Head Attn, 774M)`
  }
];

export const projectCategories = ['All', 'Computer Vision', 'Generative AI'];
