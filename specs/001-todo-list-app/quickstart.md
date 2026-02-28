# Quick Start Guide: To-Do List App

**Branch**: `001-todo-list-app` | **Date**: 2026-02-28 | **Phase**: 1

---

## Overview

This guide provides quick setup instructions for developers and users of the To-Do List App.

---

## For Users

### System Requirements

**Browsers** (one of the following):
- Chrome 60 or later
- Firefox 55 or later
- Safari 11 or later
- Edge 79 or later

**Features Required**:
- JavaScript enabled
- LocalStorage enabled (default in most browsers)

### Installation

**No installation required!** This is a web application that runs entirely in your browser.

### Usage

1. **Open the Application**
   - Double-click `index.html` in your file browser, OR
   - Open your browser and navigate to the file location

2. **Create Your First Task**
   - Type a task title in the input field
   - Click "Add" button or press Enter

3. **Manage Your Tasks**
   - Click checkbox to mark tasks as complete
   - Click × button to delete tasks
   - Use filter buttons to view All, Active, or Completed tasks

4. **Your Data is Saved Automatically**
   - Tasks persist in your browser's LocalStorage
   - Data remains even after closing the browser
   - No account or sign-up required

### Troubleshooting

**Tasks not saving?**
- Check that JavaScript is enabled in your browser
- Check that LocalStorage is not disabled
- Try a different browser

**"Storage limit reached" warning?**
- Delete old or completed tasks
- Export your data as backup
- Contact support if issue persists

---

## For Developers

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Text editor (VS Code, Sublime Text, Atom, etc.)
- Git (optional, for version control)

### Project Structure

```
To-Do List App/
├── index.html           # Main HTML file
├── css/
│   ├── styles.css       # Base styles and custom properties
│   ├── components.css   # Component-specific styles (BEM)
│   └── responsive.css   # Media queries
├── js/
│   ├── main.js          # Application initialization
│   ├── state.js         # State management
│   ├── storage.js       # LocalStorage integration
│   ├── ui.js            # DOM manipulation and rendering
│   ├── validators.js    # Input validation
│   └── utils.js         # Utility functions
├── specs/
│   └── 001-todo-list-app/
│       ├── specify.md   # Feature specification
│       ├── plan.md      # Implementation plan
│       ├── research.md  # Technology research
│       ├── data-model.md # Data schema
│       └── contracts/
│           └── storage-contract.md
└── README.md
```

### Development Setup

**Step 1: Clone or Download**
```bash
git clone <repository-url>
cd To-Do-List-App
```

**Step 2: Open in Browser**
- Simply open `index.html` in your browser
- No build step required
- No dependencies to install

**Step 3: Start Developing**
- Edit files in your text editor
- Refresh browser to see changes
- Use browser DevTools for debugging

### Development Workflow

1. **Make Changes**
   - Edit HTML, CSS, or JavaScript files
   - Follow code style guidelines (see README)

2. **Test Changes**
   - Refresh browser
   - Test all affected functionality
   - Check browser console for errors

3. **Debug Issues**
   - Open browser DevTools (F12)
   - Use Console for logging
   - Use Debugger for breakpoints
   - Use Network tab to inspect storage

4. **Cross-Browser Testing**
   - Test in Chrome, Firefox, Safari, Edge
   - Check responsive design on mobile
   - Verify accessibility with keyboard

### Build Commands

**There are no build commands!** This is a vanilla JavaScript application with no compilation step.

### Testing

**Manual Testing Checklist**:
```bash
# Open browser console and verify:
- [ ] No errors on page load
- [ ] Tasks can be created
- [ ] Tasks can be completed
- [ ] Tasks can be deleted
- [ ] Filter buttons work
- [ ] Data persists after refresh
- [ ] Keyboard navigation works
```

**Browser Testing**:
- Chrome: Test latest version
- Firefox: Test latest version
- Safari: Test latest version
- Edge: Test latest version

### Deployment

**GitHub Pages** (Recommended):
```bash
# 1. Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repository and push
git remote add origin <repository-url>
git push -u origin main

# 3. Enable GitHub Pages
# Go to repository Settings > Pages
# Select main branch as source
# Save and wait for deployment
```

**Netlify** (Alternative):
1. Drag and drop project folder to netlify.com
2. Site deploys instantly
3. Custom domain available in settings

**Vercel** (Alternative):
```bash
npm install -g vercel
vercel
```

### Code Style

**JavaScript**:
- Use ES6+ features (const/let, arrow functions, template literals)
- Strict mode mandatory (`'use strict'`)
- 2-space indentation
- Single quotes for strings
- Semicolons required
- JSDoc comments for public functions

**CSS**:
- BEM naming methodology
- CSS custom properties for theming
- Mobile-first media queries
- No !important unless necessary

**HTML**:
- Semantic elements
- ARIA attributes for accessibility
- Proper heading hierarchy
- No inline styles or scripts

### Resources

**Documentation**:
- [Feature Specification](./specify.md)
- [Implementation Plan](./plan.md)
- [Data Model](./data-model.md)
- [Storage Contract](./contracts/storage-contract.md)

**External References**:
- [MDN Web Docs](https://developer.mozilla.org/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [BEM Methodology](https://en.bem.info/methodology/)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## Common Issues

### Issue: Tasks not persisting

**Cause**: LocalStorage disabled or unavailable

**Solution**:
1. Check browser settings for storage permissions
2. Try a different browser
3. Check if in private/incognito mode

### Issue: Page not loading

**Cause**: JavaScript disabled or file path incorrect

**Solution**:
1. Enable JavaScript in browser settings
2. Ensure `index.html` is opened directly
3. Check browser console for errors

### Issue: Styles not applying

**Cause**: CSS files not linked correctly

**Solution**:
1. Verify CSS file paths in `index.html`
2. Check browser Network tab for 404 errors
3. Clear browser cache

### Issue: Application slow or unresponsive

**Cause**: Too many tasks (>1000) or memory leak

**Solution**:
1. Delete old or completed tasks
2. Refresh the page
3. Check DevTools Memory tab for leaks

---

## Support

**For Users**: 
- Check the Troubleshooting section above
- Try a different browser
- Clear browser cache and reload

**For Developers**:
- Review documentation in `specs/` folder
- Check browser console for errors
- Consult MDN Web Docs for API references

---

**Quick Start Status**: Complete
**Next**: Begin implementation with `/sp.tasks` command
