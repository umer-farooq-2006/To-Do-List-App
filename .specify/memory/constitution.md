<!--
SYNC IMPACT REPORT
==================
Version change: 0.0.0 → 1.0.0 (Initial)
Modified principles: None (initial creation)
Added sections:
  - Project Vision
  - Development Philosophy
  - Scope Definition
  - Scope Limitations (Non-Goals)
  - Architecture Principles
  - Coding Standards
  - Naming Conventions
  - UI/UX Guidelines
  - Responsiveness Requirements
  - State Management Rules
  - Data Structure Rules
  - LocalStorage Persistence Rules
  - Error Handling Policy
  - Performance Constraints
  - Accessibility Guidelines
  - Git & Version Control Policy
  - Definition of Done
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ No updates needed (generic)
  - .specify/templates/spec-template.md ✅ No updates needed (generic)
  - .specify/templates/tasks-template.md ✅ No updates needed (generic)
Follow-up TODOs: None
-->

# To-Do List App Constitution

## Core Principles

### I. Separation of Concerns
HTML defines structure, CSS defines presentation, JavaScript defines behavior. Each
technology MUST operate in its own file with no inline styles or inline scripts.
HTML files MUST contain only semantic markup. CSS files MUST contain only styling
rules. JavaScript files MUST contain only application logic.

**Rationale:** Enforces maintainability, enables independent testing of each layer,
and ensures clean architecture suitable for professional evaluation.

### II. Single Responsibility
Every function MUST perform exactly one logical operation. Functions exceeding 25
lines of code MUST be refactored. Each module or file MUST have one clear purpose.
Classes or object factories MUST encapsulate a single domain concept.

**Rationale:** Promotes reusability, simplifies debugging, and enables granular
unit testing. Critical for internship evaluation clarity.

### III. No Global Pollution
The global namespace MUST remain uncontaminated. All code MUST be encapsulated
within modules, IIFEs, or block scopes. Only explicitly exported APIs MAY be
exposed globally, and only when necessary for inter-module communication.

**Rationale:** Prevents naming collisions, ensures predictable behavior, and
maintains code integrity in browser environments.

### IV. Deterministic State
Application state MUST be predictable and traceable. State mutations MUST occur
only through explicit, documented functions. No hidden side effects allowed. All
state changes MUST be synchronous and immediate unless explicitly async.

**Rationale:** Enables reliable debugging, ensures consistent user experience,
and simplifies state persistence to LocalStorage.

### V. Data-First Architecture
Tasks MUST be stored as structured objects, never as plain strings. Each task
MUST have a unique identifier, creation timestamp, and defined properties. All
data operations MUST validate input structure before processing.

**Rationale:** Ensures data integrity, enables future extensibility, and prevents
type-related bugs in LocalStorage operations.

### VI. Pure Functions Priority
Business logic functions MUST be pure: same input always produces same output.
Side effects (DOM manipulation, LocalStorage access) MUST be isolated in dedicated
functions. Pure functions MUST NOT access external state.

**Rationale:** Enables reliable testing, simplifies reasoning about code, and
prevents unintended side effects.

### VII. Progressive Enhancement
Core functionality MUST work without JavaScript for HTML structure. Enhanced
interactions layer on top. Application MUST remain functional if individual
features fail. Graceful degradation required for error scenarios.

**Rationale:** Ensures accessibility, improves resilience, and demonstrates
professional development practices.

## Project Vision

The To-Do List App is a browser-based task management tool designed to demonstrate
professional frontend development skills using vanilla web technologies. The
application MUST provide a clean, intuitive interface for creating, organizing,
and tracking tasks with persistent storage via browser LocalStorage.

**Primary Goals:**
- Demonstrate mastery of HTML5 semantic markup
- Showcase CSS3 styling capabilities with responsive design
- Exhibit clean, modular JavaScript architecture
- Implement reliable data persistence without external dependencies
- Produce code suitable for internship evaluation

**Success Metrics:**
- Zero external library dependencies
- 100% functionality using only browser APIs
- Lighthouse accessibility score ≥ 90
- Code reviewable without external documentation

## Development Philosophy

**Simplicity Over Complexity:** Start with the simplest working solution. Add
complexity only when requirements demand it. YAGNI (You Ain't Gonna Need It)
applies to all features, abstractions, and optimizations.

**Explicit Over Implicit:** All behavior MUST be obvious from reading the code.
No magic numbers, hidden dependencies, or implicit conventions. Configuration
MUST be explicit and documented.

**Testability By Design:** Code MUST be structured for testability even if formal
tests are not written. Functions MUST be isolatable. Dependencies MUST be injectable.

**Readability First:** Code is read more often than written. Prioritize clarity
over cleverness. Variable and function names MUST be self-documenting.

## Scope Definition

**In Scope:**
- Task creation with title, description, and due date
- Task listing with filtering (all, active, completed)
- Task status toggling (complete/incomplete)
- Task deletion with confirmation
- Task editing (inline or modal)
- LocalStorage persistence across sessions
- Responsive design for mobile, tablet, desktop
- Basic accessibility (keyboard navigation, ARIA labels)
- Input validation and error feedback
- Clear visual feedback for user actions

**Out of Scope (Non-Goals):**
- User authentication or multi-user support
- Server-side storage or cloud sync
- Task categories or tags beyond basic filtering
- Drag-and-drop reordering
- Recurring tasks
- Email or push notifications
- File attachments
- Collaboration features
- Dark mode or theme switching (unless explicitly added later)
- PWA or offline-first architecture beyond LocalStorage

## Architecture Principles

**Layered Architecture:**
```
┌─────────────────────────┐
│   Presentation Layer    │  (DOM manipulation, event handling)
├─────────────────────────┤
│   Application Layer     │  (State management, business logic)
├─────────────────────────┤
│   Data Layer            │  (LocalStorage, data validation)
└─────────────────────────┘
```

**Module Organization:**
- `index.html` — Single HTML entry point
- `css/styles.css` — All stylesheets (may split into multiple files)
- `js/main.js` — Application bootstrap
- `js/state.js` — State management module
- `js/storage.js` — LocalStorage abstraction
- `js/ui.js` — DOM manipulation module
- `js/validators.js` — Input validation utilities

**Dependency Flow:** UI → State → Storage (never reverse)

**Event Architecture:** Custom events for cross-module communication when
direct coupling is undesirable.

## Coding Standards

**JavaScript:**
- Use ES6+ features (const/let, arrow functions, template literals, destructuring)
- Strict mode mandatory (`'use strict'`)
- No var keyword
- Semicolons required
- Single quotes for strings (consistent)
- 2-space indentation
- Maximum line length: 100 characters
- JSDoc comments for public functions
- No console.log in production code

**HTML:**
- HTML5 doctype required
- Semantic elements (header, main, footer, section, article, nav)
- ARIA attributes for accessibility
- No inline styles or scripts
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for all images (if any)
- Proper form labeling

**CSS:**
- CSS custom properties for theming
- BEM or similar naming methodology
- Mobile-first media queries
- No !important unless absolutely necessary
- Organized by component/feature
- Comments for major sections

## Naming Conventions

**JavaScript:**
- Variables: camelCase (`taskList`, `currentFilter`)
- Functions: camelCase with verb prefix (`getTaskById`, `renderTaskList`)
- Constants: UPPER_SNAKE_CASE (`MAX_TASK_LENGTH`, `STORAGE_KEY`)
- Classes/Constructors: PascalCase (`TaskManager`, `StorageService`)
- Private members: underscore prefix (`_internalState`, `_validateInput`)
- Event handlers: `handle[Event][Element]` (`handleTaskSubmit`, `handleDeleteClick`)

**CSS:**
- Classes: BEM format (`.block`, `.block__element`, `.block--modifier`)
- IDs: Avoid (use for anchor links only)
- Custom properties: `--component-property` (`--primary-color`, `--spacing-md`)

**HTML:**
- Data attributes: `data-[component]-[property]` (`data-task-id`, `data-filter-type`)
- ARIA: Follow WAI-ARIA specification exactly

## UI/UX Guidelines

**Visual Design:**
- Clean, minimalist aesthetic
- Consistent spacing (8px grid system)
- Clear visual hierarchy
- Sufficient color contrast (WCAG AA minimum)
- Obvious interactive elements
- Consistent button styles

**Interaction Design:**
- Immediate feedback for all actions
- Loading states for async operations
- Confirmation for destructive actions
- Undo capability where feasible
- Clear error messages with recovery guidance
- Success confirmation for task completion

**Empty States:**
- Friendly messaging when no tasks exist
- Clear call-to-action for first task
- Helpful illustrations or icons (if used)

## Responsiveness Requirements

**Breakpoints:**
- Mobile: 320px - 767px (primary design target)
- Tablet: 768px - 1023px
- Desktop: 1024px and above

**Mobile Requirements:**
- Touch-friendly tap targets (minimum 44x44px)
- No horizontal scrolling
- Readable text without zooming (16px minimum)
- Accessible form inputs
- Bottom navigation for primary actions (thumb-friendly)

**Tablet Requirements:**
- Two-column layout acceptable for task lists
- Maintain touch-friendly interactions
- Optimize use of screen real estate

**Desktop Requirements:**
- Multi-column layouts where beneficial
- Hover states for interactive elements
- Keyboard shortcut support (optional enhancement)
- Centered content with max-width constraints

## State Management Rules

**Single Source of Truth:** Application state MUST be stored in a central state
object managed by the state module. DOM state MUST reflect application state,
not drive it.

**State Shape:**
```javascript
{
  tasks: [/* array of task objects */],
  filter: 'all', // 'all' | 'active' | 'completed'
  editingTaskId: null, // ID of task being edited or null
  lastSynced: null // timestamp of last LocalStorage sync
}
```

**State Mutations:** All state changes MUST go through dedicated setter functions
that emit change events. Direct state mutation is prohibited.

**State Persistence:** State MUST sync to LocalStorage after every mutation.
Sync failures MUST be logged and handled gracefully.

## Data Structure Rules

**Task Object Schema:**
```javascript
{
  id: string,        // UUID or timestamp-based unique identifier
  title: string,     // Required, 1-100 characters
  description: string, // Optional, max 500 characters
  completed: boolean, // false by default
  createdAt: number,  // Unix timestamp (milliseconds)
  updatedAt: number,  // Unix timestamp (milliseconds)
  dueDate: number|null // Unix timestamp or null if not set
}
```

**Validation Rules:**
- Task ID MUST be unique within the collection
- Title MUST be non-empty after trimming
- Title MUST NOT exceed 100 characters
- Description MUST NOT exceed 500 characters
- Timestamps MUST be positive integers
- Boolean fields MUST be strictly boolean (no truthy/falsy coercion)

**Data Operations:** All CRUD operations MUST validate data structure before
LocalStorage write. Invalid data MUST be rejected with descriptive error.

## LocalStorage Persistence Rules

**Storage Key:** Application MUST use a single namespaced key: `todo-app-state`

**Serialization:** State MUST be serialized with `JSON.stringify()` before storage.
Deserialization MUST use `JSON.parse()` with error handling.

**Sync Strategy:**
- Load state from LocalStorage on application initialization
- Save state to LocalStorage after every mutation
- Handle quota exceeded errors gracefully
- Handle private browsing mode (Storage may be unavailable)

**Data Migration:** Schema changes MUST include migration logic. Old data MUST
be migrated or gracefully deprecated with user notification.

**Error Handling:** Storage failures MUST NOT crash the application. Users MUST
be notified of persistence issues with clear guidance.

## Error Handling Policy

**Error Categories:**
1. **Validation Errors:** User input failures — show inline feedback
2. **Storage Errors:** LocalStorage failures — show banner notification
3. **Runtime Errors:** Unexpected exceptions — log and show generic error
4. **Network Errors:** N/A (no network calls in scope)

**Error Display:**
- User-facing messages MUST be clear and actionable
- Technical details MUST be logged to console (development only)
- Error states MUST not block core functionality
- Recovery paths MUST be provided

**Error Logging:**
- Use custom error handler for uncaught exceptions
- Include context (function name, parameters, state) in error messages
- No sensitive data in error messages

## Performance Constraints

**Load Time:** Application MUST be interactive within 1 second on modern devices.

**Rendering:**
- DOM updates MUST be batched to minimize reflows
- Event delegation MUST be used for dynamic lists
- No memory leaks (event listeners must be cleaned up)

**LocalStorage:**
- Read/write operations MUST be synchronous and fast
- Large datasets (>1000 tasks) MUST trigger pagination or virtualization
- Storage size MUST stay under 5MB (LocalStorage limit safety margin)

**Bundle Size:**
- Total JavaScript: < 50KB (minified)
- Total CSS: < 20KB (minified)
- Total HTML: < 10KB

**Memory:**
- No global variable accumulation
- Detached DOM references MUST be garbage collected
- Task list in memory MUST not exceed 10MB

## Accessibility Guidelines

**WCAG Level:** Target WCAG 2.1 Level AA compliance

**Keyboard Navigation:**
- All interactive elements MUST be keyboard accessible
- Tab order MUST follow visual order
- Focus indicators MUST be visible
- No keyboard traps

**Screen Reader Support:**
- Semantic HTML structure
- ARIA labels for icon-only buttons
- Live regions for dynamic content updates
- Proper form labeling

**Visual Accessibility:**
- Color contrast ratio ≥ 4.5:1 for normal text
- Color contrast ratio ≥ 3:1 for large text
- No reliance on color alone for information
- Resizable text up to 200% without loss of functionality

**Motion:**
- Respect `prefers-reduced-motion` media query
- No auto-playing animations
- Provide pause/stop controls for any motion

## Git & Version Control Policy

**Branch Strategy:**
- `main` — Production-ready code only
- `develop` — Integration branch (optional for solo projects)
- `feature/*` — Feature branches from main, merge back via PR

**Commit Messages:**
- Use conventional commits format
- Format: `type(scope): description`
- Types: feat, fix, docs, style, refactor, test, chore
- Body: Explain what and why, not how
- References: Include issue numbers when applicable

**Example:**
```
feat(tasks): add task filtering by status

Implemented filter buttons for all/active/completed tasks.
Updates state.filter and re-renders task list on change.

Closes #12
```

**Code Review:**
- All changes reviewed before merge (self-review acceptable for solo projects)
- PRs MUST reference related issues
- CI checks MUST pass before merge (if configured)

## Definition of Done

A feature or task is considered complete when ALL criteria are met:

**Code Quality:**
- [ ] Code follows all constitution principles
- [ ] No inline styles or scripts
- [ ] No global variable pollution
- [ ] Functions follow single responsibility
- [ ] Code is properly commented (JSDoc for public APIs)

**Functionality:**
- [ ] Feature works as specified
- [ ] All edge cases handled
- [ ] Error states implemented
- [ ] Input validation working

**Testing:**
- [ ] Manual testing completed for all user scenarios
- [ ] Edge cases tested (empty state, max length, etc.)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Responsive testing (mobile, tablet, desktop)

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Screen reader testing passed
- [ ] Color contrast verified
- [ ] Focus indicators visible

**Performance:**
- [ ] No console errors or warnings
- [ ] No memory leaks (DevTools check)
- [ ] Lighthouse score ≥ 90 for Performance, Accessibility, Best Practices

**Documentation:**
- [ ] Code is self-documenting with clear names
- [ ] Complex logic has explanatory comments
- [ ] README updated if feature affects usage

**Version Control:**
- [ ] Changes committed with descriptive message
- [ ] No sensitive data committed
- [ ] Branch cleaned up after merge

---

**Version**: 1.0.0 | **Ratified**: 2026-02-28 | **Last Amended**: 2026-02-28
