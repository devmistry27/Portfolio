<div align="center">

# Dev Mistry — AI/ML Engineer Portfolio

[![React](https://img.shields.io/badge/React-19-blue.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6.svg?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF.svg?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)

*A premium, highly interactive portfolio showcasing cutting-edge engineering at the intersection of Artificial Intelligence and Frontend Web Development.*

</div>

---

## Overview

This repository houses the source code for my personal portfolio. Designed to act as a living showcase of technical capabilities, the platform seamlessly translates complex AI/ML architectures into beautiful, human-readable user experiences. 

Far from a standard static site, this portfolio features complex physics, custom WebGL/Three.js interactivity, seamless buttery-smooth scrolling (`Lenis`), dynamic feature modules, and a highly polished dark-mode-first aesthetic aimed to impress developers and design teams alike.

## Key Features

- **Neural Architecture Aesthetics:** Implements a hacker/cyber motif with highly saturated accents, glassmorphism, glowing micro-animations, and dynamic visual telemetry (`NeuralHUD`).
- **State-of-the-Art Interactive UI:** Fully custom `<MechanicalKeyboard />` skills orbit mapping out 34+ deep learning, data science, and web frameworks.
- **Deep-Dive Engineering Case Studies:** Dedicated detail pages showcasing in-depth architecture flows, confidence metrics (e.g., mAP@50), and technologies for models like `SolarSight` (YOLOv8) and `Resonance` (Custom GPT-2).
- **Butter-Smooth Parallax:** Heavy integration of `framer-motion` to handle multi-tiered scroll parallax effects, fading text layers, and custom cursor followers.
- **Feature-Sliced Design (FSD):** A meticulously organized source map built for enterprise-scale scaling, readability, and performance.

---

## Technology Stack

### Core
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Routing:** React Router v7

### Styling & Animation
- **CSS:** Tailwind CSS, `clsx`, `tailwind-merge`
- **Animation Hub:** Framer Motion
- **Scroll Engine:** Lenis Smooth Scroll
- **3D & Canvas Graphics:** Three.js, React-Three-Fiber, React-Three-Drei
- **Iconography:** Lucide React

---

## Project Architecture

The codebase adheres strictly to the **Feature-Sliced Design (FSD)** paradigm, enforcing clean separation between visual primitives, app configuration, data payloads, and complex domain features.

```text
src/
 ├── app/                  # Application core setup & context (App.tsx, main.tsx)
 ├── assets/               # Bundler-compiled assets (e.g., interactive SVGs/Icons)
 ├── components/           # Reusable generic blocks
 │    ├── common/          # Low-level UI primitives (CustomCursor, ThemeToggle)
 │    ├── interactive/     # Complex WebGL/Canvas elements (NeuralHUD)
 │    └── layout/          # Page structural wrappers (Navbar, Footer, SmoothScroll)
 ├── config/               # Global states & constants (Framer Motion settings)
 ├── data/                 # Highly-typed local datasets powering the UI dynamically
 ├── features/             # Isolated domains/features (MechanicalKeyboard)
 ├── hooks/                # Custom utility hooks (Theme/Palette management)
 ├── pages/                # Route entry points (Home, ProjectDetail)
 │    └── Home/
 │         └── sections/   # View-specific sections bound to the Home context
 ├── styles/               # Global standard CSS entry points
 ├── types/                # Reusable Typescript Interfaces (Project, Experience)
 └── utils/                # Helper utilities (`cn` Tailwind merge processor)
```
*(Note: Standard `/public` handles large static runtime assets like data images and resume binaries.)*

---

## Getting Started

To run this portfolio locally, ensure you have [Node.js](https://nodejs.org/) installed *(v18 or higher recommended)*. No backend/database setup is required as the data drives locally from strictly typed `.ts` resources.

### 1. Clone the repository
```bash
git clone https://github.com/devmistry27/portfolio.git
cd portfolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Spin up the development server
```bash
npm run dev
```

### 4. Build for Production
To optimize the build with Vite and compile the TypeScript execution paths, run:
```bash
npm run build
```
This generates your production-ready minified payload within the `/dist` directory.

---

> *"Crafting Intelligence."*
