/**
 * To-Do List App - Validators
 * 
 * This module provides input validation functions.
 * All validation logic is centralized here for consistency.
 */

'use strict';

/**
 * Validators Module
 * Encapsulated using IIFE pattern to avoid global pollution
 */
const Validators = (function() {
  
  /**
   * Constants for validation rules
   */
  const MAX_TITLE_LENGTH = 100;
  const MIN_TITLE_LENGTH = 1;
  
  /**
   * Validate a task title
   * @param {string} title - Title to validate
   * @returns {Object} Validation result with isValid and message
   */
  function validateTaskTitle(title) {
    // Check if title is provided
    if (title === undefined || title === null) {
      return {
        isValid: false,
        message: 'Title is required'
      };
    }
    
    // Check if title is a string
    if (typeof title !== 'string') {
      return {
        isValid: false,
        message: 'Title must be a string'
      };
    }
    
    // Trim and check length
    const trimmed = title.trim();
    
    if (trimmed.length < MIN_TITLE_LENGTH) {
      return {
        isValid: false,
        message: 'Task cannot be empty'
      };
    }
    
    if (trimmed.length > MAX_TITLE_LENGTH) {
      return {
        isValid: false,
        message: `Task title must be ${MAX_TITLE_LENGTH} characters or less`
      };
    }
    
    // Check for whitespace-only titles
    if (/^\s+$/.test(title)) {
      return {
        isValid: false,
        message: 'Task cannot contain only whitespace'
      };
    }
    
    return {
      isValid: true,
      message: ''
    };
  }
  
  /**
   * Validate a complete task object
   * @param {Object} task - Task object to validate
   * @returns {boolean} True if task is valid
   */
  function validateTaskObject(task) {
    if (!task || typeof task !== 'object') {
      return false;
    }
    
    // Check required fields exist
    if (!('id' in task) || 
        !('title' in task) || 
        !('completed' in task) || 
        !('createdAt' in task)) {
      return false;
    }
    
    // Validate id
    if (typeof task.id !== 'string' || task.id.length === 0) {
      return false;
    }
    
    // Validate title
    const titleValidation = validateTaskTitle(task.title);
    if (!titleValidation.isValid) {
      return false;
    }
    
    // Validate completed
    if (typeof task.completed !== 'boolean') {
      return false;
    }
    
    // Validate createdAt
    if (typeof task.createdAt !== 'number' || task.createdAt <= 0) {
      return false;
    }
    
    return true;
  }
  
  /**
   * Validate task ID format
   * @param {string} id - ID to validate
   * @returns {boolean} True if ID is valid
   */
  function validateTaskId(id) {
    if (typeof id !== 'string') return false;
    if (id.length === 0) return false;
    return true;
  }
  
  /**
   * Validate filter value
   * @param {string} filter - Filter value to validate
   * @returns {boolean} True if filter is valid
   */
  function validateFilter(filter) {
    const validFilters = ['all', 'active', 'completed'];
    return validFilters.includes(filter);
  }
  
  // Public API
  return {
    validateTaskTitle: validateTaskTitle,
    validateTaskObject: validateTaskObject,
    validateTaskId: validateTaskId,
    validateFilter: validateFilter,
    MAX_TITLE_LENGTH: MAX_TITLE_LENGTH,
    MIN_TITLE_LENGTH: MIN_TITLE_LENGTH
  };
  
})();
