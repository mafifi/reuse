# Data Layer - CLAUDE.md

This directory contains the core data structure for the reusable technology capabilities application.

## capabilities.json

This is the primary data file containing the complete architecture taxonomy organized by layers:

### Structure
- **Architecture Layers**: Business, Application, Data, Infrastructure, Security
- **Categories**: Logical groupings within each layer
- **Subcategories**: Optional deeper groupings (used in Application and Infrastructure layers)
- **Capabilities**: Individual technology capabilities with full metadata

### Capability Schema
Each capability includes:
- `id`: Unique identifier
- `name`: Display name
- `definition`: Brief technical definition
- `description`: Detailed explanation (optional)
- `examples`: Array of concrete examples
- `benefits`: Array of business/technical benefits
- `keyComponents`: Array of key components (optional)
- `technologies`: Array of specific tools/platforms
- `maturityLevels`: Array of 5 maturity levels (Basic → Optimized)

### Data Quality Guidelines
- All capabilities should have consistent metadata
- Examples should be concrete and recognizable
- Benefits should be business-focused
- Technologies should be current and relevant
- Maturity levels should follow a logical progression

### Usage in Application
- Loaded statically at build time
- Used by routing system for capability detail pages
- Rendered in capability cards on landing page
- Supports search and filtering functionality

## Editing Notes
- When adding new capabilities, follow the existing schema exactly
- Ensure all required fields are populated
- Maintain consistency in tone and style
- Test capability detail pages after changes
- Consider impact on UI layout for long content