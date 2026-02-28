/**
 * To-Do List App - Main Application Bootstrap
 * 
 * This file initializes the application and handles all user interactions.
 * Acts as the entry point that wires up all modules together.
 */

'use strict';

/**
 * Main Application Module
 * Encapsulated using IIFE pattern to avoid global pollution
 */
const TodoApp = (function() {
  
  /**
   * Debounced task creation handler
   * Prevents rapid successive task creation
   */
  const debouncedAddTask = Utils.debounce(function(title) {
    try {
      State.addTask(title);
      UI.clearInput();
      UI.clearInputError();
    } catch (error) {
      UI.showInputError(error.message);
    }
  }, 100);
  
  /**
   * Handle task form submission
   * @param {Event} e - Submit event
   */
  function handleTaskSubmit(e) {
    e.preventDefault();
    
    const input = UI.getElements().taskInput;
    const title = input.value;
    
    // Validate and add task
    try {
      State.addTask(title);
      UI.clearInput();
      UI.clearInputError();
    } catch (error) {
      UI.showInputError(error.message);
    }
  }
  
  /**
   * Handle task list interactions (event delegation)
   * Handles checkbox changes and delete button clicks
   * @param {Event} e - Click or change event
   */
  function handleTaskListInteraction(e) {
    const target = e.target;
    const taskItem = target.closest('.task');
    
    if (!taskItem) return;
    
    const taskId = taskItem.dataset.taskId;
    
    if (!taskId) return;
    
    // Handle checkbox toggle
    if (target.classList.contains('task__checkbox')) {
      try {
        State.toggleTaskCompleted(taskId);
      } catch (error) {
        console.error('Failed to toggle task:', error);
        UI.showNotification('Failed to update task. Please try again.', 'error');
      }
    }
    
    // Handle delete button click
    if (target.classList.contains('task__delete')) {
      try {
        State.deleteTask(taskId);
        UI.showNotification('Task deleted', 'success');
      } catch (error) {
        console.error('Failed to delete task:', error);
        UI.showNotification('Failed to delete task. Please try again.', 'error');
      }
    }
  }
  
  /**
   * Handle filter button clicks
   * @param {Event} e - Click event
   */
  function handleFilterClick(e) {
    const target = e.target;
    const button = target.closest('.filter-controls__button');
    
    if (!button) return;
    
    const filter = button.dataset.filter;
    
    if (!filter) return;
    
    try {
      State.setFilter(filter);
    } catch (error) {
      console.error('Failed to set filter:', error);
      UI.showNotification('Failed to change filter. Please try again.', 'error');
    }
  }
  
  /**
   * Handle keyboard interactions
   * @param {KeyboardEvent} e - Keyboard event
   */
  function handleKeyboard(e) {
    // Handle Enter key on filter buttons
    if (e.key === 'Enter' && e.target.classList.contains('filter-controls__button')) {
      e.target.click();
    }
    
    // Handle Escape key to clear input error
    if (e.key === 'Escape' && e.target.id === 'task-input') {
      UI.clearInputError();
    }
  }
  
  /**
   * Handle storage quota exceeded error
   * @param {CustomEvent} e - Custom event with error details
   */
  function handleQuotaExceeded(e) {
    UI.showNotification(
      'Storage limit reached. Some tasks may not be saved. Consider deleting old tasks.',
      'warning'
    );
  }
  
  /**
   * Handle storage security error (private browsing, disabled storage)
   * @param {CustomEvent} e - Custom event with error details
   */
  function handleStorageError(e) {
    UI.showNotification(
      'Storage is unavailable. Your tasks will not be saved after you close the browser.',
      'info'
    );
  }
  
  /**
   * Initialize all event listeners
   */
  function initEventListeners() {
    const elements = UI.getElements();
    
    // Task form submission
    elements.taskForm.addEventListener('submit', handleTaskSubmit);
    
    // Task list interactions (event delegation)
    elements.taskList.addEventListener('change', handleTaskListInteraction);
    elements.taskList.addEventListener('click', handleTaskListInteraction);
    
    // Filter controls
    elements.filterControls.addEventListener('click', handleFilterClick);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboard);
    
    // Storage error events
    window.addEventListener('storage:quotaExceeded', handleQuotaExceeded);
    window.addEventListener('storage:securityError', handleStorageError);
    window.addEventListener('storage:error', handleStorageError);
  }
  
  /**
   * Initialize state subscription for automatic UI updates
   */
  function initStateSubscription() {
    State.subscribe(function onStateChange(newState) {
      UI.render();
    });
  }
  
  /**
   * Initialize application
   */
  function init() {
    try {
      // Initialize UI module (cache DOM elements)
      UI.init();
      
      // Initialize state (load from storage)
      State.init();
      
      // Initialize event listeners
      initEventListeners();
      
      // Subscribe to state changes for automatic UI updates
      initStateSubscription();
      
      // Initial render
      UI.render();
      
      console.log('To-Do List App initialized successfully');
    } catch (error) {
      console.error('Failed to initialize To-Do List App:', error);
      UI.showNotification('Failed to initialize application. Please refresh the page.', 'error');
    }
  }
  
  // Public API
  return {
    init: init
  };
  
})();

// Bootstrap the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', TodoApp.init);
} else {
  // DOM already loaded
  TodoApp.init();
}
