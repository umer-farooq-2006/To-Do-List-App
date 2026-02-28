# To-Do List App

A simple, accessible, and responsive To-Do List application built with vanilla HTML5, CSS3, and JavaScript. Tasks are persisted in browser LocalStorage, requiring no external dependencies or backend.

## Features

- ✅ **Create Tasks**: Add new tasks with titles (up to 100 characters)
- ✅ **View Tasks**: See all tasks in a clean, organized list
- ✅ **Complete Tasks**: Mark tasks as complete/incomplete with a checkbox
- ✅ **Delete Tasks**: Remove tasks you no longer need
- ✅ **Filter Tasks**: View All, Active, or Completed tasks
- ✅ **Task Count**: See how many tasks remain active
- ✅ **Persistent Storage**: Tasks saved in LocalStorage across browser sessions
- ✅ **Responsive Design**: Works on mobile, tablet, and desktop
- ✅ **Accessible**: WCAG 2.1 AA compliant with keyboard navigation and screen reader support
- ✅ **No Dependencies**: Pure vanilla JavaScript, no external libraries

## Quick Start

### For Users

1. **Open the App**: Double-click `index.html` in your file browser
2. **Add a Task**: Type a task title and click "Add Task" or press Enter
3. **Manage Tasks**: 
   - Click checkbox to mark complete
   - Click × to delete
   - Use filter buttons to view specific task sets
4. **Your Data is Saved**: Tasks persist automatically in your browser

### For Developers

1. **Clone or Download** the repository
2. **Open** `index.html` in a modern browser
3. **No build step required** - works immediately
4. **No dependencies to install**

## Project Structure

```
To-Do List App/
├── index.html              # Single HTML entry point
├── css/
│   ├── styles.css          # Base styles and CSS custom properties
│   ├── components.css      # BEM-styled component classes
│   └── responsive.css      # Media queries and responsive design
├── js/
│   ├── main.js             # Application bootstrap and event handlers
│   ├── state.js            # State management module
│   ├── storage.js          # LocalStorage abstraction layer
│   ├── ui.js               # DOM manipulation and rendering
│   ├── validators.js       # Input validation utilities
│   └── utils.js            # Helper functions (ID generation, etc.)
├── assets/
│   └── images/             # Icons and illustrations (if needed)
├── .gitignore              # Git ignore file
└── README.md               # This file
```

## Browser Requirements

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

**Features Required**:
- JavaScript enabled
- LocalStorage enabled (default in most browsers)

## Architecture

### Three-Tier Architecture

```
┌─────────────────────────┐
│   Presentation Layer    │  (HTML, CSS, ui.js)
│   - Semantic HTML       │
│   - BEM CSS Styling     │
│   - DOM Manipulation    │
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│   Application Layer     │  (state.js, validators.js)
│   - State Management    │
│   - Business Logic      │
│   - Input Validation    │
└─────────────────────────┘
            ↓
┌─────────────────────────┐
│       Data Layer        │  (storage.js, utils.js)
│   - LocalStorage API    │
│   - Data Serialization  │
│   - Error Handling      │
└─────────────────────────┘
```

### Module Pattern

All JavaScript modules use the **IIFE (Immediately Invoked Function Expression)** pattern for encapsulation:

```javascript
const ModuleName = (function() {
  // Private state and functions
  
  return {
    // Public API
  };
})();
```

This prevents global namespace pollution and provides clean module boundaries.

## Task Object Schema

```javascript
{
  id: string,           // Unique identifier (timestamp + random)
  title: string,        // 1-100 characters, trimmed
  completed: boolean,   // false by default
  createdAt: number     // Unix timestamp (milliseconds)
}
```

## State Management

Application state is managed centrally with immutable updates:

```javascript
{
  tasks: Task[],        // Array of task objects
  filter: string,       // 'all' | 'active' | 'completed'
  lastSynced: number    // Timestamp of last LocalStorage sync
}
```

All state changes trigger:
1. UI re-render
2. LocalStorage persistence

## Accessibility

This app follows WCAG 2.1 AA guidelines:

- ✅ Semantic HTML structure
- ✅ ARIA labels and live regions
- ✅ Keyboard navigation (Tab, Enter, Space, Escape)
- ✅ Visible focus indicators
- ✅ Screen reader support
- ✅ Color contrast ≥ 4.5:1
- ✅ Reduced motion support

## Responsive Design

**Mobile (320px+)**:
- Single column layout
- Touch-friendly tap targets (≥44x44px)
- Full-width inputs and buttons

**Tablet (768px+)**:
- Horizontal form layout
- Centered content with max-width

**Desktop (1024px+)**:
- Enhanced hover states
- Optimized spacing
- Multi-column where beneficial

## Error Handling

The app handles errors gracefully:

- **Validation Errors**: Inline feedback on invalid input
- **Storage Quota Exceeded**: Warning notification with guidance
- **Storage Unavailable**: Info message, continues in session-only mode
- **Runtime Errors**: Generic error message, console logging

## Development

### Code Style

**JavaScript**:
- ES6+ features (const/let, arrow functions, template literals)
- Strict mode (`'use strict'`)
- 2-space indentation
- Single quotes for strings
- Semicolons required
- JSDoc comments for public functions

**CSS**:
- BEM naming methodology
- CSS custom properties for theming
- Mobile-first media queries
- No `!important` unless necessary

**HTML**:
- HTML5 semantic elements
- ARIA attributes for accessibility
- Proper heading hierarchy
- No inline styles or scripts

### Testing

**Manual Testing Checklist**:
- [ ] Create task with valid title
- [ ] Create task with empty title (should fail)
- [ ] Toggle task completion
- [ ] Delete task
- [ ] Filter by All/Active/Completed
- [ ] Refresh page (verify persistence)
- [ ] Test keyboard navigation
- [ ] Test on mobile/tablet/desktop
- [ ] Test across browsers

## Deployment

### GitHub Pages

1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select `main` branch as source
4. Access at `https://username.github.io/repo-name`

### Netlify

1. Drag and drop project folder to netlify.com
2. Site deploys instantly

### Local File

Simply open `index.html` in your browser - no server required!

## Troubleshooting

**Tasks not saving?**
- Check that JavaScript is enabled
- Check that LocalStorage is not disabled
- Try a different browser
- Clear browser cache and reload

**Page not loading?**
- Ensure `index.html` is opened directly
- Check browser console for errors (F12)

**Styles not applying?**
- Verify all CSS files are in the `css/` folder
- Check browser Network tab for 404 errors

## License

This project is open source and available for educational purposes.

## Author

Created as an internship submission project demonstrating mastery of vanilla web technologies.

## Version

**Version**: 1.0.0  
**Last Updated**: 2026-02-28

---

**Built with ❤️ using HTML5, CSS3, and Vanilla JavaScript**
