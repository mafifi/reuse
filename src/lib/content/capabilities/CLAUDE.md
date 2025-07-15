# Capability Content - CLAUDE.md

This directory contains MDSvex (.svx) files for precise technical definitions of capabilities with code examples.

## Purpose
Two-part technical explanations for each capability:
1. **Definition with Code**: Precise explanation using accessible TypeScript examples
2. **Benefits through Complexity Reduction**: Code examples showing what you DON'T have to do

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
- **Approach**: Before/after code comparisons
- **Examples**: 
  - Manual invalidation vs automatic
  - Complex state management vs simplified
  - Multiple API calls vs single reactive system
  - Custom queue/messaging vs built-in reactivity
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

### Benefits Examples
```typescript
// WITHOUT the capability (complex):
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

// Manual invalidation on user action
const handleUserUpdate = async (id) => {
  await updateUser(id);
  setUsers(await fetchUsers()); // Manual refetch
};

// WITH the capability (simple):
const query = useQuery(['users'], fetchUsers);
const mutation = useMutation(updateUser, {
  onSuccess: () => query.invalidateQueries(['users'])
});
```

## Technical Implementation
- Files are imported dynamically: `import('/content/capabilities/{id}.svx')`
- Processed through mdsvex with VS Code Dark+ theme
- Rendered within capability-detail.svelte component
- TypeScript syntax highlighting for all code examples

## Current Files
- `data-warehousing.svx`: Example data architecture content
- `infrastructure-as-code.svx`: Example infrastructure content

## Adding New Content
1. Create `{capability-id}.svx` file
2. Write Definition section with TypeScript examples
3. Write Benefits section showing complexity reduction
4. Test rendering in capability detail page
5. Ensure syntax highlighting works correctly