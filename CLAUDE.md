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
├── components/       # All React components
│   ├── Hero.tsx     # Landing hero section with animations
│   ├── Features.tsx # Feature grid and AI showcase
│   ├── Performance.tsx # Performance metrics with charts
│   ├── Pricing.tsx  # Pricing cards with comparison
│   ├── Wishlist.tsx # Early access signup form
│   └── Navbar.tsx   # Navigation header
├── App.tsx          # Main app component
├── main.tsx         # React entry point
└── index.css        # Global styles and Tailwind imports
```

### Key Architecture Patterns
- **Single Page Application** with component-based sections
- **Inline animations** using CSS-in-JS for complex effects
- **Responsive-first design** with mobile breakpoints (sm/md/lg)
- **Performance optimized** with lazy loading potential
- **Type-safe** components with TypeScript interfaces

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

## Build & Deployment
- TypeScript compilation runs before Vite build
- Production builds output to `dist/` directory
- Static assets served from `public/` directory
- Optimized for modern browsers with ESNext target