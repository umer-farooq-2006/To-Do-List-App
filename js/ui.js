/**
 * To-Do List App - UI Module
 * 
 * This module handles all DOM manipulation and rendering.
 * Uses efficient rendering with DocumentFragment for batch updates.
 */

'use strict';

/**
 * UI Module
 * Encapsulated using IIFE pattern to avoid global pollution
 */
const UI = (function() {
  
  /**
   * DOM element references (cached for performance)
   */
  let elements = {};
  
  /**
   * Cache DOM element references
   */
  function cacheElements() {
    elements = {
      taskForm: document.querySelector('[data-component="task-form"]'),
      taskInput: document.getElementById('task-input'),
      taskInputError: document.getElementById('task-input-error'),
      filterControls: document.querySelector('[data-component="filter-controls"]'),
      taskCount: document.querySelector('[data-component="task-count"]'),
      taskCountNumber: document.querySelector('.task-count__number'),
      taskList: document.querySelector('[data-component="task-list"]'),
      emptyState: document.querySelector('[data-component="empty-state"]'),
      main: document.querySelector('.main')
    };
  }
  
  /**
   * Initialize UI module
   */
  function init() {
    cacheElements();
  }
  
  /**
   * Get cached DOM elements
   * @returns {Object} Cached DOM elements
   */
  function getElements() {
    return { ...elements };
  }
  
  /**
   * Create a task item DOM element
   * @param {Object} task - Task object
   * @returns {HTMLElement} Task list item element
   */
  function createTaskItemElement(task) {
    const li = document.createElement('li');
    li.className = `task${task.completed ? ' task--completed' : ''}`;
    li.dataset.taskId = task.id;
    
    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task__checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`);
    
    // Title
    const span = document.createElement('span');
    span.className = 'task__title';
    span.textContent = task.title;
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'task__delete';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.setAttribute('aria-label', `Delete task: ${task.title}`);
    
    // Assemble
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    
    return li;
  }
  
  /**
   * Render the task list
   * Uses DocumentFragment for efficient batch DOM updates
   */
  function renderTaskList() {
    const tasks = State.getFilteredTasks();
    const taskList = elements.taskList;
    
    // Clear existing tasks
    taskList.innerHTML = '';
    
    // Create document fragment for batch insertion
    const fragment = document.createDocumentFragment();
    
    // Create and append task elements
    tasks.forEach(task => {
      const taskElement = createTaskItemElement(task);
      fragment.appendChild(taskElement);
    });
    
    // Append all tasks at once
    taskList.appendChild(fragment);
  }
  
  /**
   * Render the empty state
   * Shows/hides based on task count
   */
  function renderEmptyState() {
    const tasks = State.getState().tasks;
    const emptyState = elements.emptyState;
    
    if (tasks.length === 0) {
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
    }
  }
  
  /**
   * Render the task count
   * Shows number of active (incomplete) tasks
   */
  function renderTaskCount() {
    const count = State.getActiveTaskCount();
    elements.taskCountNumber.textContent = count;
  }
  
  /**
   * Render filter controls
   * Updates active button state
   */
  function renderFilterControls() {
    const currentFilter = State.getState().filter;
    const buttons = elements.filterControls.querySelectorAll('.filter-controls__button');
    
    buttons.forEach(button => {
      const filter = button.dataset.filter;
      const isActive = filter === currentFilter;
      
      button.classList.toggle('filter-controls__button--active', isActive);
      button.setAttribute('aria-pressed', isActive.toString());
    });
  }
  
  /**
   * Master render function
   * Renders all UI components
   */
  function render() {
    renderTaskList();
    renderEmptyState();
    renderTaskCount();
    renderFilterControls();
  }
  
  /**
   * Show input error message
   * @param {string} message - Error message to display
   */
  function showInputError(message) {
    const input = elements.taskInput;
    const errorDiv = elements.taskInputError;
    
    input.classList.add('task-form__input--error');
    errorDiv.textContent = message;
    input.setAttribute('aria-invalid', 'true');
  }
  
  /**
   * Clear input error message
   */
  function clearInputError() {
    const input = elements.taskInput;
    const errorDiv = elements.taskInputError;
    
    input.classList.remove('task-form__input--error');
    errorDiv.textContent = '';
    input.removeAttribute('aria-invalid');
  }
  
  /**
   * Clear the task input field
   */
  function clearInput() {
    elements.taskInput.value = '';
    elements.taskInput.focus();
  }
  
  /**
   * Show a notification message
   * @param {string} message - Message to display
   * @param {string} type - Notification type (info, warning, success, error)
   */
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    const messageEl = document.createElement('p');
    messageEl.className = 'notification__message';
    messageEl.textContent = message;
    
    const dismissBtn = document.createElement('button');
    dismissBtn.className = 'notification__dismiss';
    dismissBtn.innerHTML = '&times;';
    dismissBtn.setAttribute('aria-label', 'Dismiss notification');
    dismissBtn.addEventListener('click', () => notification.remove());
    
    notification.appendChild(messageEl);
    notification.appendChild(dismissBtn);
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
  
  /**
   * Scroll to top of main content
   */
  function scrollToTop() {
    elements.main.scrollTop = 0;
  }
  
  // Public API
  return {
    init: init,
    getElements: getElements,
    createTaskItemElement: createTaskItemElement,
    render: render,
    renderTaskList: renderTaskList,
    renderEmptyState: renderEmptyState,
    renderTaskCount: renderTaskCount,
    renderFilterControls: renderFilterControls,
    showInputError: showInputError,
    clearInputError: clearInputError,
    clearInput: clearInput,
    showNotification: showNotification,
    scrollToTop: scrollToTop
  };
  
})();
