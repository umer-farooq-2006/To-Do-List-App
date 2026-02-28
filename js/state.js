/**
 * To-Do List App - State Management
 * 
 * This module manages the application state.
 * Provides immutable state updates and change subscriptions.
 */

'use strict';

/**
 * State Management Module
 * Encapsulated using IIFE pattern to avoid global pollution
 */
const State = (function() {
  
  /**
   * Current application state (private)
   */
  let state = null;
  
  /**
   * Array of subscriber callbacks (private)
   */
  let subscribers = [];
  
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
   * Initialize state from storage or default
   */
  function init() {
    state = StorageService.load();
    notifySubscribers();
  }
  
  /**
   * Get current state (immutable copy)
   * @returns {Object} Frozen copy of current state
   */
  function getState() {
    return Object.freeze({ ...state });
  }
  
  /**
   * Get tasks filtered by current filter
   * @returns {Array} Filtered array of tasks
   */
  function getFilteredTasks() {
    const { tasks, filter } = state;
    
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default: // 'all'
        return tasks;
    }
  }
  
  /**
   * Get count of active (incomplete) tasks
   * @returns {number} Active task count
   */
  function getActiveTaskCount() {
    return state.tasks.filter(task => !task.completed).length;
  }
  
  /**
   * Set complete new state
   * @param {Object} newState - New state object
   */
  function setState(newState) {
    state = { ...newState };
    state.lastSynced = Date.now();
    notifySubscribers();
    persistState();
  }
  
  /**
   * Update state with partial updates
   * @param {Object} updates - Object with properties to update
   */
  function updateState(updates) {
    state = {
      ...state,
      ...updates
    };
    state.lastSynced = Date.now();
    notifySubscribers();
    persistState();
  }
  
  /**
   * Add a new task to the state
   * @param {string} title - Task title
   * @returns {Object} The created task
   * @throws {Error} If title is invalid
   */
  function addTask(title) {
    const validation = Validators.validateTaskTitle(title);
    
    if (!validation.isValid) {
      throw new Error(validation.message);
    }
    
    const newTask = {
      id: Utils.generateUniqueId(),
      title: title.trim(),
      completed: false,
      createdAt: Date.now()
    };
    
    state = {
      ...state,
      tasks: [...state.tasks, newTask]
    };
    state.lastSynced = Date.now();
    
    notifySubscribers();
    persistState();
    
    // Dispatch custom event for task creation
    window.dispatchEvent(new CustomEvent('task:created', { 
      detail: { task: newTask }
    }));
    
    return newTask;
  }
  
  /**
   * Toggle task completion status
   * @param {string} taskId - ID of task to toggle
   * @returns {boolean} New completion status
   * @throws {Error} If task not found
   */
  function toggleTaskCompleted(taskId) {
    const taskIndex = state.tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const updatedTask = {
      ...state.tasks[taskIndex],
      completed: !state.tasks[taskIndex].completed
    };
    
    const newTasks = [...state.tasks];
    newTasks[taskIndex] = updatedTask;
    
    state = {
      ...state,
      tasks: newTasks
    };
    state.lastSynced = Date.now();
    
    notifySubscribers();
    persistState();
    
    // Dispatch custom event for task update
    window.dispatchEvent(new CustomEvent('task:updated', { 
      detail: { task: updatedTask }
    }));
    
    return updatedTask.completed;
  }
  
  /**
   * Delete a task from the state
   * @param {string} taskId - ID of task to delete
   * @throws {Error} If task not found
   */
  function deleteTask(taskId) {
    const taskIndex = state.tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      throw new Error('Task not found');
    }
    
    const deletedTask = state.tasks[taskIndex];
    
    state = {
      ...state,
      tasks: state.tasks.filter(task => task.id !== taskId)
    };
    state.lastSynced = Date.now();
    
    notifySubscribers();
    persistState();
    
    // Dispatch custom event for task deletion
    window.dispatchEvent(new CustomEvent('task:deleted', { 
      detail: { task: deletedTask }
    }));
  }
  
  /**
   * Set the current filter
   * @param {string} filter - New filter value
   * @throws {Error} If filter is invalid
   */
  function setFilter(filter) {
    if (!Validators.validateFilter(filter)) {
      throw new Error('Invalid filter value');
    }
    
    state = {
      ...state,
      filter: filter
    };
    
    notifySubscribers();
    
    // Dispatch custom event for filter change
    window.dispatchEvent(new CustomEvent('filter:changed', { 
      detail: { filter: filter }
    }));
  }
  
  /**
   * Persist state to LocalStorage
   * (private function)
   */
  function persistState() {
    const success = StorageService.save(state);
    
    if (!success) {
      console.warn('Failed to persist state to LocalStorage');
    }
  }
  
  /**
   * Notify all subscribers of state change
   * (private function)
   */
  function notifySubscribers() {
    subscribers.forEach(callback => {
      try {
        callback(getState());
      } catch (error) {
        console.error('Error in state subscriber:', error);
      }
    });
  }
  
  /**
   * Subscribe to state changes
   * @param {Function} callback - Function to call on state change
   * @returns {Function} Unsubscribe function
   */
  function subscribe(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Subscriber must be a function');
    }
    
    subscribers.push(callback);
    
    // Return unsubscribe function
    return function unsubscribe() {
      subscribers = subscribers.filter(sub => sub !== callback);
    };
  }
  
  /**
   * Clear all subscribers
   * (primarily for testing)
   */
  function clearSubscribers() {
    subscribers = [];
  }
  
  // Public API
  return {
    init: init,
    getState: getState,
    setState: setState,
    updateState: updateState,
    getFilteredTasks: getFilteredTasks,
    getActiveTaskCount: getActiveTaskCount,
    addTask: addTask,
    toggleTaskCompleted: toggleTaskCompleted,
    deleteTask: deleteTask,
    setFilter: setFilter,
    subscribe: subscribe,
    clearSubscribers: clearSubscribers
  };
  
})();
