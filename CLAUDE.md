# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit application showcasing reusable technology capabilities organized by architecture layers. The app displays an interactive landing page with capability cards organized into categories like Business, Application, Data, Infrastructure, and Security Architecture.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Run type checking
- `npm run check:watch` - Run type checking in watch mode
- `npm run format` - Format code with Prettier
- `npm run lint` - Run linting (Prettier + ESLint)
- `npm run test:unit` - Run unit tests with Vitest
- `npm run test` - Run all tests

## Architecture

### Core Structure
- **SvelteKit 2.x** with TypeScript
- **Tailwind CSS v4** for styling with shadcn/ui components
- **Vite** for build tooling
- **Vitest** for testing
- **Cloudflare Pages** deployment (wrangler.jsonc)

### Data Layer
- Static data stored in `src/lib/data/capabilities.json`
- Contains architecture layers (Business, Application, Data, Infrastructure, Security)
- Each layer has capabilities with detailed metadata including definitions, examples, benefits, technologies, and maturity levels

### Component Structure
- **UI Components**: `src/lib/components/ui/` - shadcn/ui components
- **Block Components**: `src/lib/components/blocks/` - Page-level components
- **Routes**: `src/routes/` - SvelteKit routing
  - `/` - Main architecture landing page
  - `/capability/[id]` - Individual capability detail pages

### Key Files
- `src/lib/components/blocks/architecture-landing.svelte` - Main landing page component
- `src/lib/components/blocks/capability-detail.svelte` - Individual capability page
- `src/lib/data/capabilities.json` - Core data structure
- `src/routes/+page.svelte` - Root page wrapper

### Styling
- Uses Tailwind CSS v4 with custom color palette
- Color scheme includes: midnight-blue, watercourse, purple-heart, mariner, golf
- Responsive design with mobile-first approach
- Hover effects and smooth transitions

## Development Notes

### Component Patterns
- Uses modern Svelte 5 syntax with `<script lang="ts">`
- Imports from `$lib/` alias for library components
- Icon system uses Lucide Svelte icons with mapping in components

### Data Flow
- Static JSON data loaded at build time
- Dynamic routing for capability details using `[id]` parameter
- Hover cards for capability previews

### Testing
- Unit tests with Vitest and Testing Library
- Browser testing capabilities configured

When making changes, ensure consistency with the existing component patterns and maintain the responsive design principles.