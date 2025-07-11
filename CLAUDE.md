# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SvelteKit application showcasing reusable technology capabilities and offerings. The app features:
- **Architecture Capabilities**: Interactive landing page with capability cards organized by layers (Business, Application, Data, Infrastructure, Security)
- **Offerings Portal**: Comprehensive view of technology offerings with capability heatmaps showing maturity levels
- **Detailed Content**: Rich .svx (Svelte + Markdown) content for capability deep-dives with code examples and implementation guides

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
- **Capabilities**: `src/lib/data/capabilities.json` - Core architecture capabilities with detailed metadata
- **Offerings**: `src/lib/data/offerings.json` - Technology offerings with capability mappings and maturity levels
- **Content**: `src/lib/content/capabilities/` - Rich markdown content (.svx files) for capability implementation guides

### Component Structure
- **UI Components**: `src/lib/components/ui/` - shadcn/ui components
- **Block Components**: `src/lib/components/blocks/` - Page-level components
- **Routes**: `src/routes/` - SvelteKit routing
  - `/` - Main architecture landing page
  - `/capability/[id]` - Individual capability detail pages
  - `/offerings/` - Offerings portal with capability heatmaps

### Key Files
- `src/lib/components/blocks/architecture-landing.svelte` - Main architecture capabilities page
- `src/lib/components/blocks/offerings-landing.svelte` - Offerings portal with heatmaps
- `src/lib/components/blocks/capability-detail.svelte` - Individual capability detail page
- `src/lib/data/capabilities.json` - Core capability definitions and metadata
- `src/lib/data/offerings.json` - Offerings with capability maturity mappings
- `src/routes/+page.svelte` - Root page wrapper
- `src/routes/offerings/+page.svelte` - Offerings portal page

### Content System
- **Capability Guides**: Rich implementation guides in `.svx` format (Svelte + Markdown)
- **Code Examples**: Comprehensive code samples for practical implementation
- **Multi-language Support**: Examples in various languages (SQL, HCL, Java, Python, YAML, etc.)
- **Live Content**: .svx files support both markdown and Svelte components

### Styling
- Uses Tailwind CSS v4 with custom color palette
- Color scheme includes: midnight-blue, watercourse, purple-heart, mariner, golf
- Responsive design with mobile-first approach
- Hover effects and smooth transitions
- Heatmap visualization for capability maturity levels

## Development Notes

### Component Patterns
- Uses modern Svelte 5 syntax with `<script lang="ts">`
- Imports from `$lib/` alias for library components
- Icon system uses Lucide Svelte icons with mapping in components

### Data Flow
- Static JSON data loaded at build time
- Dynamic routing for capability details using `[id]` parameter
- Hover cards for capability previews
- Capability heatmaps showing maturity levels across offerings

### Content Creation
- Use `.svx` files for rich capability content with code examples
- Include practical implementation guides with real-world examples
- Support for syntax highlighting and interactive components
- Maintain consistency with existing content structure

### Testing
- Unit tests with Vitest and Testing Library
- Browser testing capabilities configured

When making changes, ensure consistency with the existing component patterns and maintain the responsive design principles. For new capability content, follow the established .svx format with comprehensive code examples and implementation guidance.