/**
 * To-Do List App - Utility Functions
 * 
 * This module provides utility functions for the application.
 * Includes ID generation, date formatting, and helper functions.
 */

'use strict';

/**
 * Utility Module
 * Encapsulated using IIFE pattern to avoid global pollution
 */
const Utils = (function() {
  
  /**
   * Generate a unique task ID
   * Uses timestamp + random suffix for uniqueness
   * @returns {string} Unique task ID in format "task-{timestamp}-{random}"
   */
  function generateUniqueId() {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substr(2, 6);
    return `task-${timestamp}-${randomSuffix}`;
  }
  
  /**
   * Format a timestamp into a readable date string
   * @param {number} timestamp - Unix timestamp in milliseconds
   * @returns {string} Formatted date string
   */
  function formatCreatedAt(timestamp) {
    const date = new Date(timestamp);
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  }
  
  /**
   * Debounce a function call
   * Prevents rapid successive executions
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  /**
   * Escape HTML to prevent XSS attacks
   * @param {string} text - Text to escape
   * @returns {string} Escaped text safe for HTML insertion
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  /**
   * Check if a string is empty or whitespace only
   * @param {string} str - String to check
   * @returns {boolean} True if empty or whitespace only
   */
  function isEmptyOrWhitespace(str) {
    if (typeof str !== 'string') return true;
    return str.trim().length === 0;
  }
  
  // Public API
  return {
    generateUniqueId: generateUniqueId,
    formatCreatedAt: formatCreatedAt,
    debounce: debounce,
    escapeHtml: escapeHtml,
    isEmptyOrWhitespace: isEmptyOrWhitespace
  };
  
})();
