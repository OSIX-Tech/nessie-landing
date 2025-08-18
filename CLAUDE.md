# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nessie Landing - A React/TypeScript landing page for an enterprise documentation AI assistant product. Built with Vite, styled with Tailwind CSS, and featuring GSAP animations.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Architecture

### Tech Stack
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS v4** (with PostCSS) for styling
- **GSAP** for animations and scroll-triggered effects
- **ESLint** for code linting

### Component Structure
All components are in `src/components/`:
- **BackgroundFX**: Visual background effects
- **BrandMark**: Brand logo/mark component
- **ChatMock**: Simulated chat interface showcasing Nessie's capabilities
- **Footer**: Page footer
- **LogoMarquee**: Logo carousel/marquee
- **Navbar**: Navigation bar
- **Pricing**: Pricing plans display
- **StatsBar**: Statistics display
- **Testimonials**: Customer testimonials section

### Key Patterns
- Components use TypeScript with proper type definitions
- GSAP animations registered in `useEffect` hooks with ScrollTrigger
- Tailwind utility classes for styling with custom CSS variables for colors
- Custom color scheme using CSS variables (`--color-navy-950`, `--color-cyan-300`, `--color-emerald-400`)
- Responsive grid layouts using Tailwind's grid system
- `.reveal-on-scroll` class pattern for scroll-triggered animations

## Styling Conventions
- Use Tailwind utilities primarily
- Custom colors defined as RGB values in CSS variables
- Glass morphism effects using `bg-white/5`, `border-white/10`, `backdrop-blur`
- Consistent spacing with Tailwind's spacing scale
- Button styles: `btn-shine` class for primary CTAs with shadow effects

## TypeScript Configuration
- Separate configs for app (`tsconfig.app.json`) and node (`tsconfig.node.json`)
- Module resolution set to ESNext
- React components use `.tsx` extension

## Build Output
- Production builds output to `dist/` directory
- TypeScript compilation runs before Vite build