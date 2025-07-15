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
- `description`: Detailed explanation
- `examples`: Array of concrete examples
- `benefits`: Array of business/technical benefits
- `keyComponents`: Array of key components
- `technologies`: Array of specific tools/platforms
- `maturityLevels`: Object with Plan/Build/Operate structure

### New Maturity Model (Plan/Build/Operate)
The maturity model has been updated to focus on reuse levels rather than organizational maturity:

```json
"maturityLevels": {
  "plan": { 
    "available": true/false, 
    "description": "Reference architectures, patterns, frameworks, and design guides available" 
  },
  "build": { 
    "available": true/false, 
    "description": "Tools, libraries, SDKs, platforms, and software to build solutions available" 
  },
  "operate": { 
    "available": true/false, 
    "description": "Managed services, cloud platforms, and fully-operated solutions available" 
  },
  "score": 0-3
}
```

### Maturity Level Definitions
- **Plan (Level 1)**: Guidance and frameworks for implementation
  - Reference architectures, design patterns, best practices
  - Implementation guides, methodology templates
  - Architecture decision records, design principles
  
- **Build (Level 2)**: Tools and components for development
  - Libraries, SDKs, development frameworks
  - Build tools, deployment templates, starter kits
  - Integration APIs, development platforms
  
- **Operate (Level 3)**: Managed services and platforms
  - Fully managed cloud services, SaaS platforms
  - Outsourced operations, service providers
  - Platform-as-a-service, managed infrastructure

### Data Quality Guidelines
- All capabilities should have consistent metadata with complete schema
- Examples should be concrete and recognizable
- Benefits should be business-focused and measurable
- Technologies should be current and relevant market solutions
- Maturity levels should accurately reflect what's available in the market
- Available field should be `true` for most capabilities unless genuine market gaps exist

### Usage in Application
- Loaded statically at build time
- Used by routing system for capability detail pages
- Rendered in capability cards on landing page
- Supports search and filtering functionality
- Maturity levels displayed with Plan/Build/Operate badges and overall score

## offerings.json

Contains specific organizational offerings and their actual maturity levels for each capability (0-3 scale).

## Editing Notes
- When adding new capabilities, follow the existing schema exactly
- Ensure all required fields are populated including the new maturity structure
- Maintain consistency in tone and style across all capabilities
- Test capability detail pages after changes to verify rendering
- Consider impact on UI layout for long content
- Use `available: true` as default unless there's a specific reason otherwise