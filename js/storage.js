/**
 * To-Do List App - Storage Service
 * 
 * This module handles all LocalStorage operations.
 * Provides abstraction layer for data persistence with error handling.
 */

'use strict';

/**
 * Storage Service Module
 * Encapsulated using IIFE pattern to avoid global pollution
 */
const StorageService = (function() {
  
  /**
   * Storage key for the application state
   * Using namespace to avoid collisions with other apps
   */
  const STORAGE_KEY = 'todo-app-state';
  
  /**
   * Get default application state
   * @returns {Object} Default state object
   */
  function getDefaultState() {
    return {
      tasks: [],
      filter: 'all',
      lastSynced: null
    };
  }
  
  /**
   * Check if LocalStorage is available
   * Handles private browsing mode and disabled storage
   * @returns {boolean} True if LocalStorage is available
   */
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
  
  /**
   * Load application state from LocalStorage
   * Handles corrupted data, missing data, and migration
   * @returns {Object} Application state or default state
   */
  function load() {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      
      // Return default state if nothing stored
      if (serialized === null || serialized === undefined) {
        return getDefaultState();
      }
      
      // Parse stored state
      const state = JSON.parse(serialized);
      
      // Validate state structure
      if (!isValidState(state)) {
        console.warn('Invalid state loaded from storage, resetting to default');
        return getDefaultState();
      }
      
      return state;
    } catch (error) {
      console.error('Failed to load state from LocalStorage:', error);
      return getDefaultState();
    }
  }
  
  /**
   * Save application state to LocalStorage
   * Handles quota exceeded and security errors
   * @param {Object} state - Application state to save
   * @returns {boolean} Success indicator
   */
  function save(state) {
    try {
      // Validate state before saving
      if (!isValidState(state)) {
        console.error('Attempted to save invalid state');
        return false;
      }
      
      // Serialize state
      const serialized = JSON.stringify(state);
      
      // Save to LocalStorage
      localStorage.setItem(STORAGE_KEY, serialized);
      
      return true;
    } catch (error) {
      handleStorageError(error);
      return false;
    }
  }
  
  /**
   * Clear all application data from LocalStorage
   * @returns {boolean} Success indicator
   */
  function clear() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Failed to clear LocalStorage:', error);
      return false;
    }
  }
  
  /**
   * Get storage usage information
   * @returns {Object} Usage statistics
   */
  function getUsage() {
    try {
      let totalSize = 0;
      
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          totalSize += localStorage[key].length + key.length;
        }
      }
      
      const estimatedQuota = 5 * 1024 * 1024; // 5MB estimate
      
      return {
        totalSize: totalSize,
        estimatedQuota: estimatedQuota,
        percentUsed: (totalSize / estimatedQuota) * 100
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
  
  /**
   * Validate state structure
   * @param {Object} state - State to validate
   * @returns {boolean} True if state is valid
   */
  function isValidState(state) {
    if (!state || typeof state !== 'object') return false;
    if (!Array.isArray(state.tasks)) return false;
    if (!['all', 'active', 'completed'].includes(state.filter)) return false;
    if (state.lastSynced !== null && typeof state.lastSynced !== 'number') return false;
    
    // Validate each task
    for (const task of state.tasks) {
      if (!isValidTask(task)) return false;
    }
    
    return true;
  }
  
  /**
   * Validate task structure
   * @param {Object} task - Task to validate
   * @returns {boolean} True if task is valid
   */
  function isValidTask(task) {
    if (!task || typeof task !== 'object') return false;
    if (typeof task.id !== 'string') return false;
    if (typeof task.title !== 'string') return false;
    if (typeof task.completed !== 'boolean') return false;
    if (typeof task.createdAt !== 'number') return false;
    return true;
  }
  
  /**
   * Handle storage errors with appropriate user feedback
   * @param {Error} error - The error that occurred
   */
  function handleStorageError(error) {
    switch (error.name) {
      case 'QuotaExceededError':
        console.error('LocalStorage quota exceeded:', error);
        // Dispatch custom event for UI to handle
        window.dispatchEvent(new CustomEvent('storage:quotaExceeded', { 
          detail: { error: error }
        }));
        break;
        
      case 'SecurityError':
        console.error('LocalStorage security error:', error);
        // Dispatch custom event for UI to handle
        window.dispatchEvent(new CustomEvent('storage:securityError', { 
          detail: { error: error }
        }));
        break;
        
      default:
        console.error('Unexpected LocalStorage error:', error);
        window.dispatchEvent(new CustomEvent('storage:error', { 
          detail: { error: error }
        }));
    }
  }
  
  // Public API
  return {
    load: load,
    save: save,
    clear: clear,
    isAvailable: isAvailable,
    getUsage: getUsage,
    getDefaultState: getDefaultState
  };
  
})();
