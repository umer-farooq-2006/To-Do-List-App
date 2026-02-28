# Research: To-Do List App Technology & Patterns

**Branch**: `001-todo-list-app` | **Date**: 2026-02-28 | **Phase**: 0

---

## 1. LocalStorage Best Practices

### Research Question
How to effectively use LocalStorage for persistent data storage in a vanilla JavaScript application?

### Decision
Use synchronous LocalStorage API with comprehensive error handling and fallback strategies.

### Rationale
- LocalStorage is universally supported in modern browsers
- Synchronous API simplifies state management (no async/await complexity)
- 5-10MB storage limit is sufficient for task data (< 1000 tasks)
- No external dependencies required

### Implementation Pattern
```javascript
// Storage key namespacing
const STORAGE_KEY = 'todo-app-state';

// Safe serialization with error handling
function saveState(state) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      // Handle storage full
      showQuotaExceededWarning();
    }
    return false;
  }
}

// Safe deserialization with validation
function loadState() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) return getDefaultState();
    const state = JSON.parse(serialized);
    return validateState(state) ? state : getDefaultState();
  } catch (error) {
    console.error('Failed to load state:', error);
    return getDefaultState();
  }
}
```

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|--------------|
| IndexedDB | Overkill for simple key-value storage, complex API |
| SessionStorage | Data lost on browser close, not suitable for persistence |
| Cookies | Limited size (4KB), sent with HTTP requests unnecessarily |
| Async storage wrapper | Adds complexity without benefit for this use case |

### Best Practices Identified
1. **Namespace keys** to avoid collisions (`todo-app-state`)
2. **Always wrap in try-catch** for quota and security errors
3. **Validate loaded data** before using (schema validation)
4. **Handle private browsing** where storage may be restricted
5. **Debounce saves** if multiple mutations occur rapidly
6. **Export functionality** for data recovery

---

## 2. ES6 Module Patterns

### Research Question
What is the best module pattern for organizing vanilla JavaScript code?

### Decision
Use IIFE (Immediately Invoked Function Expression) with revealing module pattern for ES5 compatibility, or ES6 modules if targeting only modern browsers.

### Rationale
- IIFE provides encapsulation without build tools
- Revealing module pattern exposes clean public API
- Works in all browsers without transpilation
- Prevents global namespace pollution

### Implementation Pattern
```javascript
// IIFE with Revealing Module Pattern
const TodoApp = (function() {
  // Private state
  let state = null;
  let subscribers = [];
  
  // Private functions
  function validateInput(input) {
    return input && input.trim().length > 0;
  }
  
  function notifySubscribers() {
    subscribers.forEach(callback => callback(state));
  }
  
  // Public API
  return {
    init: function() {
      state = loadState();
      notifySubscribers();
    },
    
    getState: function() {
      return Object.freeze({...state});
    },
    
    setState: function(newState) {
      state = newState;
      notifySubscribers();
      saveState(state);
    },
    
    subscribe: function(callback) {
      subscribers.push(callback);
    }
  };
})();

// Usage
TodoApp.init();
TodoApp.subscribe(renderUI);
```

### ES6 Module Alternative (if browser support allows)
```javascript
// state.js
let state = null;

export function getState() {
  return Object.freeze({...state});
}

export function setState(newState) {
  state = newState;
  saveToStorage(state);
}

// main.js
import { getState, setState } from './state.js';
```

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|--------------|
| CommonJS (require/module.exports) | Requires bundler (Webpack, Browserify) |
| AMD (RequireJS) | Adds dependency, outdated pattern |
| UMD | Overly complex for single-app use |
| Global variables | Violates constitution (no global pollution) |

### Browser Compatibility
- IIFE: Works in all browsers (IE6+)
- ES6 Modules: Chrome 61+, Firefox 60+, Safari 11+, Edge 79+
- **Decision**: Use IIFE for maximum compatibility

---

## 3. BEM CSS Methodology

### Research Question
How to organize CSS for maintainability and avoid specificity conflicts?

### Decision
Use BEM (Block-Element-Modifier) naming methodology with CSS custom properties.

### Rationale
- Flat specificity (no nested selectors)
- Clear component boundaries
- Reusable across project
- Easy to understand and modify

### Implementation Pattern
```css
/* Block - standalone component */
.task {
  display: flex;
  align-items: center;
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
}

/* Element - part of block */
.task__checkbox {
  margin-right: var(--spacing-sm);
  width: 20px;
  height: 20px;
}

.task__title {
  flex: 1;
  font-size: var(--font-size-md);
  color: var(--color-text);
}

.task__delete {
  background: transparent;
  border: none;
  color: var(--color-danger);
  cursor: pointer;
  padding: var(--spacing-xs);
}

/* Modifier - state variation */
.task--completed .task__title {
  text-decoration: line-through;
  color: var(--color-text-muted);
}

.task--editing {
  background-color: var(--color-highlight);
}
```

### HTML Usage
```html
<li class="task task--completed" data-task-id="123">
  <input type="checkbox" class="task__checkbox" checked>
  <span class="task__title">Complete project</span>
  <button class="task__delete" aria-label="Delete task">×</button>
</li>
```

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|--------------|
| OOCSS | Less explicit about element relationships |
| SMACSS | More abstract, steeper learning curve |
| Tailwind-style utilities | Requires build step, violates no-library constraint |
| Plain CSS | Leads to specificity wars and naming conflicts |

### Best Practices Identified
1. **Never nest selectors** more than one level
2. **Use CSS custom properties** for theming
3. **Mobile-first media queries** for responsiveness
4. **Avoid !important** unless absolutely necessary
5. **Group related components** in same file

---

## 4. Accessibility Patterns

### Research Question
How to make a dynamic single-page application accessible?

### Decision
Implement WCAG 2.1 AA compliance using semantic HTML, ARIA attributes, and keyboard navigation.

### Rationale
- Legal and ethical requirement
- Demonstrates professional development practices
- Improves usability for all users
- Required for internship evaluation

### Key Patterns Identified

#### Live Regions for Dynamic Content
```html
<ul class="task-list" aria-live="polite" aria-relevant="additions removals">
  <!-- Tasks rendered here -->
</ul>
```

#### Keyboard Navigation
```javascript
// Handle keyboard events
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    if (e.target.matches('[role="button"]')) {
      e.target.click();
    }
  }
});
```

#### Focus Management
```css
/* Visible focus indicator */
:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Skip to main content link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: 8px;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

#### ARIA Labels
```html
<!-- Icon-only button -->
<button class="task__delete" aria-label="Delete task: Complete project">
  ×
</button>

<!-- Form with label -->
<label for="task-input" class="visually-hidden">New task title</label>
<input type="text" id="task-input" class="task-form__input" required>
```

### WCAG 2.1 AA Checklist
- [ ] Color contrast ratio ≥ 4.5:1 (normal text)
- [ ] Color contrast ratio ≥ 3:1 (large text)
- [ ] All functionality keyboard accessible
- [ ] Visible focus indicators
- [ ] No keyboard traps
- [ ] Meaningful link/button text
- [ ] Form labels associated with inputs
- [ ] Error messages linked to inputs
- [ ] Dynamic content announced to screen readers
- [ ] Images have alt text (if any)

### Alternatives Considered
| Alternative | Why Rejected |
|-------------|--------------|
| ARIA only without semantic HTML | Semantic HTML is foundation, ARIA enhances |
| Full WCAG AAA | Overly strict, AA is industry standard |
| No accessibility | Unacceptable, violates constitution |

---

## 5. Event Delegation Strategies

### Research Question
How to efficiently handle events for dynamically created elements?

### Decision
Use event delegation with a single listener on the parent container.

### Rationale
- Single listener instead of one per element
- Automatically handles dynamically added elements
- Better memory management
- Improved performance for large lists

### Implementation Pattern
```javascript
// Event delegation on task list container
const taskList = document.querySelector('.task-list');

taskList.addEventListener('click', (e) => {
  // Find closest matching element
  const deleteButton = e.target.closest('.task__delete');
  const checkbox = e.target.closest('.task__checkbox');
  const taskItem = e.target.closest('.task');
  
  if (deleteButton && taskItem) {
    const taskId = taskItem.dataset.taskId;
    handleDeleteTask(taskId);
    return;
  }
  
  if (checkbox && taskItem) {
    const taskId = taskItem.dataset.taskId;
    handleToggleComplete(taskId, checkbox.checked);
    return;
  }
});
```

### Performance Comparison
| Approach | Listeners | Memory | Performance |
|----------|-----------|--------|-------------|
| Direct (one per element) | N listeners | O(N) | Degrades with N |
| Delegation (parent) | 1 listener | O(1) | Constant |

### Best Practices Identified
1. **Use `closest()`** for finding target elements
2. **Check existence** before processing
3. **Use data attributes** for IDs
4. **Prevent event bubbling** if needed with `stopPropagation()`
5. **Clean up listeners** when removing containers

### Memory Leak Prevention
```javascript
// Good: Single listener on static parent
const listContainer = document.querySelector('.task-list');
listContainer.addEventListener('click', handler);

// Bad: Listener on each dynamic element
tasks.forEach(task => {
  const button = document.createElement('button');
  button.addEventListener('click', handler); // Memory leak risk
});
```

---

## Summary of Decisions

| Topic | Decision | Location |
|-------|----------|----------|
| Storage | Synchronous LocalStorage with error handling | `storage.js` |
| Modules | IIFE with revealing module pattern | All JS files |
| CSS | BEM methodology with custom properties | `css/` files |
| Accessibility | WCAG 2.1 AA compliance | Throughout |
| Events | Event delegation on parent containers | `ui.js` |

---

**Research Status**: Complete
**Next Phase**: Phase 1 - Design & Contracts (data-model.md, storage-contract.md)
