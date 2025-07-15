# Capability Content - CLAUDE.md

This directory contains MDSvex (.svx) files for precise technical definitions of capabilities with code examples.

## Purpose
Two-part technical explanations for each capability:
1. **Definition with Code**: Precise explanation using accessible TypeScript examples
2. **Benefits through Complexity Reduction**: Code examples showing what you DON'T have to do

## New Maturity Model Context
With the updated Plan/Build/Operate maturity model, the content should reflect:
- **Plan**: How to architect and design solutions using this capability
- **Build**: How to implement and develop with available tools/libraries
- **Operate**: How managed services reduce operational complexity

## File Structure
- **Filename**: `{capability-id}.svx` (matching capability ID from capabilities.json)
- **Format**: MDSvex (Markdown + Svelte)
- **Location**: Imported dynamically by capability-detail.svelte

## Content Structure (Required)

### 1. Definition Section
- **Language**: TypeScript (accessible, widely understood)
- **Purpose**: Show precisely HOW the capability works
- **Approach**: Clear, working code examples that demonstrate the core mechanism
- **Focus**: Technical precision over comprehensive coverage

### 2. Benefits Section
- **Purpose**: Show what complexity is AVOIDED when using this capability
- **Approach**: Before/after code comparisons showing Plan vs Build vs Operate
- **Examples**: 
  - Manual configuration vs automated templates (Plan)
  - Custom implementation vs using libraries/frameworks (Build)
  - Self-managed vs fully-managed services (Operate)
- **Focus**: Material reduction in code complexity and maintenance burden

## Content Guidelines

### Definition Examples
```typescript
// Show the capability in action
const query = useQuery(['users'], fetchUsers);
// Demonstrate key behaviors
if (query.isLoading) return <Loading />;
if (query.error) return <Error />;
return <UserList users={query.data} />;
```

### Benefits Examples - Plan vs Build vs Operate
```typescript
// PLAN Level - Without architectural guidance (complex):
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// Manual cache management, error handling, loading states
const fetchUsers = async () => {
  setLoading(true);
  try {
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error('Failed');
    setUsers(await response.json());
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

// BUILD Level - With libraries/frameworks (simpler):
const query = useQuery(['users'], fetchUsers);
// Automatic loading, error, and caching handled by library

// OPERATE Level - With managed services (simplest):
const { data: users } = useSupabaseQuery('users');
// Managed backend, automatic scaling, monitoring handled by service
```

### Maturity Model Integration
Content should explain how each maturity level reduces complexity:
- **Plan**: Reference architectures and patterns reduce design complexity
- **Build**: Tools and libraries reduce implementation complexity  
- **Operate**: Managed services reduce operational complexity

## Technical Implementation
- Files are imported dynamically: `import('/content/capabilities/{id}.svx')`
- Processed through mdsvex with VS Code Dark+ theme
- Rendered within capability-detail.svelte component
- TypeScript syntax highlighting for all code examples

## Current Files
- `data-warehousing.svx`: Example data architecture content
- `infrastructure-as-code.svx`: Example infrastructure content

## Adding New Content
1. Create `{capability-id}.svx` file matching capability ID
2. Write Definition section with TypeScript examples
3. Write Benefits section showing Plan/Build/Operate complexity reduction
4. Include practical examples showing maturity progression
5. Test rendering in capability detail page
6. Ensure syntax highlighting works correctly

## Content Quality Guidelines
- Keep examples realistic and practical
- Show clear progression from Plan → Build → Operate
- Emphasize reuse value at each maturity level
- Use consistent TypeScript patterns
- Focus on developer experience and complexity reduction