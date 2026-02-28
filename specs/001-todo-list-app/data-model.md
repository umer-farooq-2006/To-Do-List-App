# Data Model: To-Do List App

**Branch**: `001-todo-list-app` | **Date**: 2026-02-28 | **Phase**: 1

---

## Overview

This document defines the data structures, validation rules, and state transitions for the To-Do List App. All data follows strict schemas to ensure consistency and enable reliable LocalStorage persistence.

---

## 1. Task Entity

### Definition
A **Task** represents a single to-do item that a user wants to track and manage.

### Schema
```javascript
{
  id: string,           // Unique identifier
  title: string,        // Task description (1-100 characters)
  completed: boolean,   // Completion status
  createdAt: number     // Unix timestamp (milliseconds)
}
```

### Field Specifications

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `id` | string | Yes | Unique, non-empty | Unique task identifier |
| `title` | string | Yes | 1-100 chars, trimmed | User-visible task description |
| `completed` | boolean | Yes | true/false | Task completion status |
| `createdAt` | number | Yes | Positive integer | Task creation timestamp |

### Example Instance
```javascript
{
  id: "task-1709123456789-abc123",
  title: "Complete project documentation",
  completed: false,
  createdAt: 1709123456789
}
```

### Validation Rules

**ID Validation**:
```javascript
function isValidId(id) {
  return typeof id === 'string' && 
         id.length > 0 && 
         id.startsWith('task-');
}
```

**Title Validation**:
```javascript
function isValidTitle(title) {
  if (typeof title !== 'string') return false;
  const trimmed = title.trim();
  return trimmed.length >= 1 && trimmed.length <= 100;
}
```

**Completed Validation**:
```javascript
function isValidCompleted(completed) {
  return typeof completed === 'boolean';
}
```

**Timestamp Validation**:
```javascript
function isValidTimestamp(timestamp) {
  return typeof timestamp === 'number' && 
         timestamp > 0 && 
         Number.isInteger(timestamp);
}
```

**Complete Task Validation**:
```javascript
function isValidTask(task) {
  if (typeof task !== 'object' || task === null) return false;
  return isValidId(task.id) &&
         isValidTitle(task.title) &&
         isValidCompleted(task.completed) &&
         isValidTimestamp(task.createdAt);
}
```

---

## 2. Application State

### Definition
The **Application State** represents the complete state of the application at any point in time.

### Schema
```javascript
{
  tasks: Task[],          // Array of task objects
  filter: string,         // Current filter: 'all' | 'active' | 'completed'
  lastSynced: number|null // Last LocalStorage sync timestamp
}
```

### Field Specifications

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| `tasks` | Task[] | Yes | Array of valid Task objects | All tasks in the application |
| `filter` | string | Yes | 'all', 'active', or 'completed' | Current view filter |
| `lastSynced` | number|null | Yes | Positive integer or null | Last successful LocalStorage sync |

### Default State
```javascript
const DEFAULT_STATE = {
  tasks: [],
  filter: 'all',
  lastSynced: null
};
```

### State Validation
```javascript
function isValidState(state) {
  if (typeof state !== 'object' || state === null) return false;
  if (!Array.isArray(state.tasks)) return false;
  if (!state.tasks.every(isValidTask)) return false;
  if (!['all', 'active', 'completed'].includes(state.filter)) return false;
  if (state.lastSynced !== null && !isValidTimestamp(state.lastSynced)) return false;
  return true;
}
```

---

## 3. Task Factory

### Purpose
Create new task objects with valid structure and unique identifiers.

### Implementation
```javascript
function createTask(title) {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substr(2, 6);
  
  return {
    id: `task-${timestamp}-${randomSuffix}`,
    title: title.trim(),
    completed: false,
    createdAt: timestamp
  };
}
```

### Usage
```javascript
const newTask = createTask("Buy groceries");
// Result: { id: "task-1709123456789-xyz789", title: "Buy groceries", completed: false, createdAt: 1709123456789 }
```

---

## 4. State Operations

### Get Task by ID
```javascript
function getTaskById(state, taskId) {
  return state.tasks.find(task => task.id === taskId);
}
```

### Add Task
```javascript
function addTask(state, title) {
  if (!isValidTitle(title)) {
    throw new Error('Invalid task title');
  }
  
  const newTask = createTask(title);
  return {
    ...state,
    tasks: [...state.tasks, newTask],
    lastSynced: null
  };
}
```

### Update Task
```javascript
function updateTask(state, taskId, updates) {
  const taskIndex = state.tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  
  const updatedTask = {
    ...state.tasks[taskIndex],
    ...updates,
    id: state.tasks[taskIndex].id, // Prevent ID changes
    createdAt: state.tasks[taskIndex].createdAt // Prevent timestamp changes
  };
  
  if (!isValidTask(updatedTask)) {
    throw new Error('Invalid task after update');
  }
  
  const newTasks = [...state.tasks];
  newTasks[taskIndex] = updatedTask;
  
  return {
    ...state,
    tasks: newTasks,
    lastSynced: null
  };
}
```

### Toggle Task Completion
```javascript
function toggleTaskCompleted(state, taskId) {
  const task = getTaskById(state, taskId);
  if (!task) {
    throw new Error('Task not found');
  }
  
  return updateTask(state, taskId, {
    completed: !task.completed
  });
}
```

### Delete Task
```javascript
function deleteTask(state, taskId) {
  const taskIndex = state.tasks.findIndex(t => t.id === taskId);
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  
  return {
    ...state,
    tasks: state.tasks.filter(t => t.id !== taskId),
    lastSynced: null
  };
}
```

### Set Filter
```javascript
function setFilter(state, filter) {
  if (!['all', 'active', 'completed'].includes(filter)) {
    throw new Error('Invalid filter value');
  }
  
  return {
    ...state,
    filter
  };
}
```

### Get Filtered Tasks
```javascript
function getFilteredTasks(state) {
  switch (state.filter) {
    case 'active':
      return state.tasks.filter(task => !task.completed);
    case 'completed':
      return state.tasks.filter(task => task.completed);
    default: // 'all'
      return state.tasks;
  }
}
```

### Get Active Task Count
```javascript
function getActiveTaskCount(state) {
  return state.tasks.filter(task => !task.completed).length;
}
```

---

## 5. State Transitions

### State Transition Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION STATE                        │
├─────────────────────────────────────────────────────────────┤
│  tasks: Task[]                                               │
│  filter: 'all' | 'active' | 'completed'                      │
│  lastSynced: number | null                                   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
        ┌─────────────────────────────────────────┐
        │                                         │
        ▼                                         ▼
┌───────────────────┐                   ┌───────────────────┐
│   User Action     │                   │   System Action   │
│  (add, toggle,    │                   │  (load, save,     │
│   delete, filter) │                   │   sync)           │
└───────────────────┘                   └───────────────────┘
        │                                         │
        └──────────────────┬──────────────────────┘
                           ▼
                 ┌─────────────────────┐
                 │  State Mutation     │
                 │  (pure function)    │
                 └─────────────────────┘
                           │
                           ▼
                 ┌─────────────────────┐
                 │  UI Re-render       │
                 │  (reflects state)   │
                 └─────────────────────┘
                           │
                           ▼
                 ┌─────────────────────┐
                 │  LocalStorage Sync  │
                 │  (persist state)    │
                 └─────────────────────┘
```

### Transition Rules

1. **All state mutations are pure functions** — Same input produces same output
2. **State is immutable** — Never modify state directly, always create new objects
3. **Single source of truth** — Application state is the authoritative state
4. **UI reflects state** — DOM is always updated to match state
5. **State persists** — Every mutation triggers LocalStorage sync

---

## 6. Data Relationships

### Entity Relationships

```
Application State
    │
    ├── tasks (array of Task objects)
    │       │
    │       ├── Task 1
    │       ├── Task 2
    │       └── Task N
    │
    ├── filter (string enum)
    │
    └── lastSynced (timestamp or null)
```

### Cardinality
- One Application State contains Many Tasks (0 to N)
- Each Task belongs to exactly One Application State
- Filter is a single value property of Application State

---

## 7. Data Migration

### Schema Evolution
If the task schema changes in the future, implement migration:

```javascript
function migrateState(state) {
  // Version 1 → Version 2 example
  if (!state.version) {
    state.version = 1;
  }
  
  if (state.version === 1) {
    // Add new fields with defaults
    state.tasks = state.tasks.map(task => ({
      ...task,
      description: task.description || '' // New field
    }));
    state.version = 2;
  }
  
  return state;
}
```

### Backward Compatibility
- Always provide defaults for new fields
- Never remove fields without migration period
- Test migration with sample data

---

## 8. Edge Cases

### Empty Task List
```javascript
// State with no tasks
{
  tasks: [],
  filter: 'all',
  lastSynced: null
}
```

### Maximum Tasks
- LocalStorage limit: ~5MB
- Estimated task size: ~200 bytes
- Maximum tasks: ~25,000 (theoretical)
- Practical limit: 1,000 tasks (performance)

### Long Titles
- Titles > 100 characters: Truncate with ellipsis in UI
- Storage: Reject titles > 100 characters
- Display: CSS text-overflow for visual truncation

### Special Characters
- Titles may contain quotes, unicode, emojis
- JSON.stringify handles escaping automatically
- Display: Use textContent (not innerHTML) to prevent XSS

---

## 9. Testing Data

### Sample Task Data
```javascript
const SAMPLE_TASKS = [
  {
    id: "task-1709123456789-abc123",
    title: "Complete project proposal",
    completed: false,
    createdAt: 1709123456789
  },
  {
    id: "task-1709123456790-def456",
    title: "Review code changes",
    completed: true,
    createdAt: 1709123456790
  },
  {
    id: "task-1709123456791-ghi789",
    title: "Schedule team meeting",
    completed: false,
    createdAt: 1709123456791
  }
];
```

### Test State
```javascript
const TEST_STATE = {
  tasks: SAMPLE_TASKS,
  filter: 'all',
  lastSynced: 1709123456792
};
```

---

**Data Model Status**: Complete
**Next**: Storage Contract (`contracts/storage-contract.md`)
