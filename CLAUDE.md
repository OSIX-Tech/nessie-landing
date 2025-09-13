# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nessie Landing - A modern, minimalist React/TypeScript landing page for an enterprise documentation AI assistant. Features a sophisticated monochrome design system inspired by Apple's design language, with smooth animations and responsive layouts.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (runs TypeScript check + Vite build)
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Architecture

### Tech Stack
- **React 19** with TypeScript for UI components
- **Vite 7** for ultra-fast development and optimized builds
- **Tailwind CSS v4** with PostCSS for utility-first styling
- **Recharts** for data visualization components
- **ESLint 9** with TypeScript support for code quality

### Project Structure
```
src/
├── components/           # React UI components
│   ├── Hero.tsx         # Landing hero with animations
│   ├── Features.tsx     # Feature grid and AI showcase
│   ├── FeatureCard3D.tsx # Individual 3D feature cards
│   ├── Performance.tsx  # Performance metrics with charts
│   ├── Pricing.tsx      # Pricing cards with comparison
│   ├── Wishlist.tsx     # Early access signup form
│   ├── Navbar.tsx       # Navigation header
│   └── Footer.tsx       # Site footer
├── hooks/               # Custom React hooks
│   ├── useCountUp.ts    # Animated number counting
│   ├── useParallax.ts   # Parallax scroll effects
│   ├── useScrollAnimation.ts # Scroll-triggered animations
│   └── useTilt.ts       # Mouse tilt interactions
├── App.tsx              # Main app component
├── main.tsx             # React entry point
├── index.css            # Global styles and Tailwind imports
└── vite-env.d.ts        # Vite TypeScript declarations
```

### Key Architecture Patterns
- **Single Page Application** with component-based sections
- **Custom Hook Pattern** for reusable animation and interaction logic
- **Inline animations** using CSS-in-JS for complex effects  
- **Responsive-first design** with mobile breakpoints (sm/md/lg)
- **Performance optimized** with lazy loading potential
- **Type-safe** components with TypeScript interfaces
- **Composition over inheritance** for component reusability

## Styling System

### Design Language
- **Monochrome palette** inspired by macOS aesthetic
- **Minimalist approach** with focus on typography and spacing
- **Subtle animations** for enhanced user experience
- **Glass morphism** effects for depth and hierarchy

### Color System (CSS Variables)
```css
--color-black: 0 0 0
--color-gray-[50-900]: Grayscale spectrum
--color-white: 255 255 255
```

### Component Patterns
- **Buttons**: `.btn-primary`, `.btn-secondary` with pill shape
- **Cards**: Rounded corners (24px), subtle shadows
- **Typography**: SF Pro inspired font stack, fluid sizing
- **Animations**: Fade-in, slide-up, float, rotate effects

## Custom Hooks & Animations

### Animation Hooks
- **useCountUp**: Provides animated counting effects for numbers
- **useParallax**: Creates parallax scrolling effects for backgrounds
- **useScrollAnimation**: Triggers animations based on scroll position
- **useTilt**: Adds mouse-following tilt effects to interactive elements

### Animation Patterns
- Scroll-triggered fade-ins and slide-ups
- Mouse interaction tilt effects for cards
- Parallax backgrounds for depth
- Smooth number counting for statistics
- CSS transforms preferred over position changes

## Git & Commit Guidelines

### Repository Structure
- **Origin remote**: `git@github.com:OSIX-Tech/nessie-landing.git` (official OSIX repository)
- **Fork remote**: `git@github.com:mateobodenlle/nessie-landing.git` (personal fork)
- Always commit and push to the **origin** (OSIX repository), NOT the fork

### Commit Message Convention
Follow OSIX Tech naming conventions as seen in existing commits:
```bash
v0.6.1 feat[landing]: description of changes
v0.5.2 fix[hero]: resolve specific issue
v0.4.1 fix[types]: type safety improvements
```

**Format**: `v{version} {type}[{scope}]: {description}`
- **Version**: Follow semantic versioning (patch for fixes, minor for features)
- **Type**: `feat`, `fix`, `refactor`, `docs`, `style`, `test`
- **Scope**: Component or area affected (landing, hero, types, etc.)
- **Description**: Clear, concise description without period

### Commit Rules
- **NEVER** include Claude Code attribution or co-authoring
- **NEVER** push to personal fork unless explicitly requested
- Use author credentials: `mateo.bodenlle@rai.usc.es`, `Mateo Bodenlle`
- Always push to `origin` remote (OSIX repository)
- Commits should be authored by the user, not AI-assisted tools

## Build & Deployment
- TypeScript compilation runs before Vite build
- Production builds output to `dist/` directory
- Static assets served from `public/` directory
- Optimized for modern browsers with ESNext target