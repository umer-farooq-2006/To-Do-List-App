# Storage Contract: LocalStorage Integration

**Branch**: `001-todo-list-app` | **Date**: 2026-02-28 | **Phase**: 1

---

## Overview

This document defines the contract for LocalStorage integration, including the API, error handling, and data serialization strategies.

---

## 1. Storage Key

### Application Namespace
```javascript
const STORAGE_KEY = 'todo-app-state';
```

**Rationale**: Namespacing prevents collisions with other applications using LocalStorage.

---

## 2. Storage Service API

### Module Interface

```javascript
const StorageService = (function() {
  'use strict';
  
  const STORAGE_KEY = 'todo-app-state';
  
  /**
   * Load application state from LocalStorage
   * @returns {Object} Application state or default state
   */
  function load() {
    // Implementation
  }
  
  /**
   * Save application state to LocalStorage
   * @param {Object} state - Application state to save
   * @returns {boolean} Success indicator
   */
  function save(state) {
    // Implementation
  }
  
  /**
   * Clear all application data from LocalStorage
   * @returns {boolean} Success indicator
   */
  function clear() {
    // Implementation
  }
  
  /**
   * Check if LocalStorage is available
   * @returns {boolean} Availability indicator
   */
  function isAvailable() {
    // Implementation
  }
  
  /**
   * Get storage usage information
   * @returns {Object} Usage statistics
   */
  function getUsage() {
    // Implementation
  }
  
  // Public API
  return {
    load: load,
    save: save,
    clear: clear,
    isAvailable: isAvailable,
    getUsage: getUsage
  };
})();
```

---

## 3. Operation Specifications

### 3.1 Load Operation

**Signature**: `load() → Object`

**Behavior**:
1. Attempt to read from LocalStorage
2. Parse JSON string
3. Validate state structure
4. Return state or default state

**Implementation**:
```javascript
function load() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    
    if (serialized === null || serialized === undefined) {
      return getDefaultState();
    }
    
    const state = JSON.parse(serialized);
    
    if (!isValidState(state)) {
      console.warn('Invalid state loaded, resetting to default');
      return getDefaultState();
    }
    
    return state;
  } catch (error) {
    console.error('Failed to load state from LocalStorage:', error);
    return getDefaultState();
  }
}
```

**Error Handling**:
- `null` value → Return default state
- `JSON.parse` error → Return default state, log error
- Invalid state structure → Return default state, log warning
- SecurityError (private browsing) → Return default state

---

### 3.2 Save Operation

**Signature**: `save(state: Object) → boolean`

**Behavior**:
1. Validate state structure
2. Serialize to JSON
3. Write to LocalStorage
4. Return success indicator

**Implementation**:
```javascript
function save(state) {
  try {
    if (!isValidState(state)) {
      console.error('Attempted to save invalid state');
      return false;
    }
    
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
    return true;
  } catch (error) {
    handleStorageError(error);
    return false;
  }
}
```

**Error Handling**:
- Invalid state → Return false, log error
- QuotaExceededError → Show user warning, return false
- SecurityError → Return false, degrade to session-only mode

---

### 3.3 Clear Operation

**Signature**: `clear() → boolean`

**Behavior**:
1. Remove item from LocalStorage
2. Return success indicator

**Implementation**:
```javascript
function clear() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Failed to clear LocalStorage:', error);
    return false;
  }
}
```

---

### 3.4 Availability Check

**Signature**: `isAvailable() → boolean`

**Behavior**:
1. Test LocalStorage access
2. Return availability indicator

**Implementation**:
```javascript
function isAvailable() {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}
```

**Use Cases**:
- Application initialization
- Graceful degradation decision
- User notification trigger

---

### 3.5 Usage Information

**Signature**: `getUsage() → Object`

**Behavior**:
1. Calculate storage usage
2. Return statistics

**Implementation**:
```javascript
function getUsage() {
  try {
    let totalSize = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalSize += localStorage[key].length + key.length;
      }
    }
    
    return {
      totalSize: totalSize,
      estimatedQuota: 5 * 1024 * 1024, // 5MB estimate
      percentUsed: (totalSize / (5 * 1024 * 1024)) * 100
    };
  } catch (error) {
    return {
      totalSize: 0,
      estimatedQuota: 5 * 1024 * 1024,
      percentUsed: 0,
      error: error.message
    };
  }
}
```

---

## 4. Error Taxonomy

### Error Types

| Error Name | Cause | User Impact | Handling |
|------------|-------|-------------|----------|
| `QuotaExceededError` | Storage limit reached | Cannot save new tasks | Show warning, offer export |
| `SecurityError` | Private browsing, disabled storage | Data not persistent | Show info, session-only mode |
| `DataCloneError` | Invalid data structure | Save fails | Log error, validate before save |
| `SyntaxError` | JSON parse failure | Load fails, data reset | Reset to default, log warning |

### Error Handler

```javascript
function handleStorageError(error) {
  switch (error.name) {
    case 'QuotaExceededError':
      console.error('LocalStorage quota exceeded:', error);
      showQuotaExceededWarning();
      break;
      
    case 'SecurityError':
      console.error('LocalStorage security error:', error);
      showStorageDisabledWarning();
      break;
      
    default:
      console.error('Unexpected LocalStorage error:', error);
      showGenericStorageError();
  }
}
```

---

## 5. User Notifications

### Quota Exceeded Warning

```javascript
function showQuotaExceededWarning() {
  const message = 'Storage limit reached. Some tasks may not be saved. ' +
                  'Consider exporting your data or deleting old tasks.';
  showNotification(message, 'warning');
}
```

### Storage Disabled Warning

```javascript
function showStorageDisabledWarning() {
  const message = 'Browser storage is unavailable. Your tasks will not ' +
                  'be saved after you close the browser.';
  showNotification(message, 'info');
}
```

### Notification Display

```html
<div class="notification notification--warning" role="alert" aria-live="assertive">
  <span class="notification__message">Storage limit reached...</span>
  <button class="notification__dismiss" aria-label="Dismiss warning">×</button>
</div>
```

---

## 6. Data Serialization

### Serialization Strategy

```javascript
// Custom replacer for JSON.stringify
function serializeReplacer(key, value) {
  // Remove undefined values
  if (value === undefined) {
    return null;
  }
  return value;
}

// Custom reviver for JSON.parse
function deserializeReviver(key, value) {
  // Ensure boolean types
  if (key === 'completed') {
    return Boolean(value);
  }
  // Ensure number types
  if (key === 'createdAt' || key === 'lastSynced') {
    return Number(value) || null;
  }
  return value;
}

// Usage
const serialized = JSON.stringify(state, serializeReplacer);
const state = JSON.parse(serialized, deserializeReviver);
```

### Data Validation After Deserialization

```javascript
function validateLoadedState(state) {
  const requiredFields = ['tasks', 'filter', 'lastSynced'];
  
  // Check required fields exist
  for (const field of requiredFields) {
    if (!(field in state)) {
      return false;
    }
  }
  
  // Validate tasks array
  if (!Array.isArray(state.tasks)) {
    return false;
  }
  
  // Validate each task
  for (const task of state.tasks) {
    if (!isValidTask(task)) {
      return false;
    }
  }
  
  // Validate filter
  if (!['all', 'active', 'completed'].includes(state.filter)) {
    return false;
  }
  
  return true;
}
```

---

## 7. Sync Strategy

### Sync on Mutation

```javascript
function setState(newState) {
  state = newState;
  ui.render(state);
  
  // Async save to avoid blocking UI
  requestAnimationFrame(() => {
    const success = StorageService.save(state);
    if (success) {
      state.lastSynced = Date.now();
    }
  });
}
```

### Debounced Saves

```javascript
let saveTimeout = null;

function scheduleSave(state) {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  
  saveTimeout = setTimeout(() => {
    StorageService.save(state);
  }, 100); // 100ms debounce
}
```

### Load on Initialization

```javascript
function init() {
  const state = StorageService.load();
  appState = state;
  ui.render(state);
}
```

---

## 8. Private Browsing Detection

### Detection Strategy

```javascript
function isPrivateBrowsing() {
  return !StorageService.isAvailable();
}

// Safari private browsing throws on quota check
function isSafariPrivate() {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return false;
  } catch (error) {
    return true;
  }
}
```

### Fallback Behavior

```javascript
if (isPrivateBrowsing()) {
  // Use in-memory storage only
  window.addEventListener('beforeunload', () => {
    showUnsavedDataWarning();
  });
}
```

---

## 9. Data Export/Import

### Export Function

```javascript
function exportData() {
  const state = StorageService.load();
  const serialized = JSON.stringify(state, null, 2);
  const blob = new Blob([serialized], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `todo-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  
  URL.revokeObjectURL(url);
}
```

### Import Function

```javascript
function importData(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const state = JSON.parse(e.target.result);
        
        if (!validateLoadedState(state)) {
          throw new Error('Invalid backup file');
        }
        
        StorageService.save(state);
        resolve(state);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.readAsText(file);
  });
}
```

---

## 10. Testing Checklist

**LocalStorage Operations**:
- [ ] Load returns default state when empty
- [ ] Load returns saved state after save
- [ ] Load handles corrupted JSON gracefully
- [ ] Save persists state correctly
- [ ] Save returns false on quota exceeded
- [ ] Clear removes all data
- [ ] isAvailable returns correct boolean

**Error Handling**:
- [ ] QuotaExceededError shows warning
- [ ] SecurityError degrades gracefully
- [ ] Invalid state resets to default
- [ ] Private browsing detected and handled

**Data Integrity**:
- [ ] State survives serialize/deserialize cycle
- [ ] Task IDs remain unique
- [ ] Timestamps preserved correctly
- [ ] Boolean types maintained
- [ ] Array order preserved

---

**Storage Contract Status**: Complete
**Next**: Quick Start Guide (`quickstart.md`)
