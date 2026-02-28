# Tasks: To-Do List App

**Input**: Design documents from `specs/001-todo-list-app/`
**Prerequisites**: plan.md (required), specify.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual testing tasks included for each user story (no automated test framework required for this internship project)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., [US1], [US2], [US3], [US4])
- Include exact file paths in descriptions

## Path Conventions

Single project structure with files at repository root:
- `index.html` - Main HTML file
- `css/` - Stylesheets
- `js/` - JavaScript modules

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic file structure

- [X] T001 Create project root structure: index.html, css/, js/, assets/ directories
- [X] T002 [P] Create index.html with HTML5 doctype, semantic structure (header, main, footer), and CSS/JS file links
- [X] T003 [P] Create css/styles.css with CSS custom properties (colors, spacing, typography, borders, shadows)
- [X] T004 [P] Create css/components.css with base BEM component classes structure
- [X] T005 [P] Create css/responsive.css with mobile-first media query breakpoints (768px, 1024px)
- [X] T006 [P] Create js/utils.js with generateUniqueId() and formatCreatedAt() utility functions
- [X] T007 [P] Create js/validators.js with isValidTitle(), isValidTask(), and validation functions
- [X] T008 [P] Create js/storage.js with STORAGE_KEY constant and isAvailable() function
- [X] T009 [P] Create js/state.js with DEFAULT_STATE object and getState() getter function
- [X] T010 [P] Create js/ui.js with render() master function and component render function stubs
- [X] T011 [P] Create js/main.js with DOMContentLoaded event listener and init() function stub

**Checkpoint**: ✅ Project structure ready - foundational implementation can begin

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T012 Implement HTML semantic structure in index.html: header with h1 title, main element with role="main", task form section, filter controls section, task list container with aria-live="polite", empty state container
- [X] T013 Implement CSS custom properties in css/styles.css: define --color-primary, --color-success, --color-danger, --color-text, --color-text-muted, --spacing-xs/sm/md/lg, --font-family, --font-size-base, --border-radius, --shadow-sm/md
- [X] T014 Implement base layout styles in css/components.css: .header, .main, .footer container classes with proper padding and max-width constraints
- [X] T015 Implement StorageService.load() in js/storage.js: try-catch, JSON.parse, return state or getDefaultState(), handle null/undefined/corrupted data
- [X] T016 Implement StorageService.save() in js/storage.js: try-catch, JSON.stringify, handle QuotaExceededError and SecurityError, return boolean success indicator
- [X] T017 Implement StorageService.clear() in js/storage.js: removeItem with error handling
- [X] T018 Implement state management in js/state.js: setState(newState) with validation, updateState(updates) for partial updates, subscribe(callback) for change listeners
- [X] T019 Implement createTask() factory in js/utils.js: generate unique ID with timestamp + random suffix, return task object with id, title, completed, createdAt
- [X] T020 Implement validation functions in js/validators.js: validateTaskTitle(title), validateTaskObject(task) with proper error messages
- [X] T021 Implement error notification system in js/ui.js: showNotification(message, type) function with CSS classes for warning/info/success types
- [X] T022 Wire up module initialization in js/main.js: load state from storage, initialize all event listeners, render initial UI

**Checkpoint**: ✅ Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Create and View Tasks (Priority: P1) 🎯 MVP

**Goal**: Users can create new tasks with titles and see all tasks displayed in a list

**Independent Test**: Can be fully tested by adding multiple tasks and verifying they appear in the task list immediately without page refresh

### Implementation for User Story 1

- [ ] T023 [US1] Implement task form HTML in index.html: form with class="task-form", input field with id="task-input" and proper label, submit button with text "Add Task"
- [ ] T024 [US1] Implement task form styles in css/components.css: .task-form, .task-form__input, .task-form__button with proper spacing and visual hierarchy
- [ ] T025 [US1] Implement task list container HTML in index.html: ul element with class="task-list" and data-component="task-list" attribute
- [ ] T026 [US1] Implement empty state HTML in index.html: div with class="empty-state", message "No tasks yet. Add your first task!", hidden attribute by default
- [ ] T027 [US1] Implement empty state styles in css/components.css: .empty-state with centered text, muted color, padding
- [ ] T028 [US1] Implement task item template in js/ui.js: createTaskItemElement(task) function that returns li element with checkbox, title span, delete button
- [ ] T029 [US1] Implement task item styles in css/components.css: .task, .task__checkbox, .task__title, .task__delete with flexbox layout
- [ ] T030 [US1] Implement completed task modifier in css/components.css: .task--completed .task__title with text-decoration: line-through and muted color
- [ ] T031 [US1] Implement renderTaskList() in js/ui.js: clear list, get filtered tasks, create task elements, append to DOM using DocumentFragment
- [ ] T032 [US1] Implement renderEmptyState() in js/ui.js: show/hide empty state based on task count
- [ ] T033 [US1] Implement handleTaskSubmit() in js/main.js: preventDefault, validate title, create task via state update, re-render UI, clear input
- [ ] T034 [US1] Add form submit event listener in js/main.js: taskForm.addEventListener('submit', handleTaskSubmit)
- [ ] T035 [US1] Implement LocalStorage persistence for task creation: ensure setState() triggers StorageService.save() after state update
- [ ] T036 [US1] Implement input validation feedback in js/main.js: show error notification for empty/whitespace titles, add error state styling to input
- [ ] T037 [US1] Implement task count display in index.html: div with class="task-count" showing "X items left"
- [ ] T038 [US1] Implement renderTaskCount() in js/ui.js: update task count text with number of active (incomplete) tasks
- [ ] T039 [US1] Test manually: Create task with valid title → verify appears in list immediately
- [ ] T040 [US1] Test manually: Create task with empty title → verify error shown, no task created
- [ ] T041 [US1] Test manually: Create multiple tasks → verify all appear, order maintained
- [ ] T042 [US1] Test manually: Refresh page → verify tasks persist and display correctly

**Checkpoint**: User Story 1 complete - MVP ready for independent testing and demo

---

## Phase 4: User Story 2 - Mark Tasks as Complete (Priority: P2)

**Goal**: Users can toggle task completion status and see visual feedback

**Independent Test**: Can be fully tested by clicking on a task's checkbox and verifying the visual state changes and persists after page reload

### Implementation for User Story 2

- [ ] T043 [US2] Implement checkbox change handler in js/main.js: handleTaskListChange(e) with event delegation on task list container
- [ ] T044 [US2] Implement toggleTaskCompleted() in js/state.js: find task by ID, flip completed boolean, return new state
- [ ] T045 [US2] Add change event listener in js/main.js: taskList.addEventListener('change', handleTaskListChange)
- [ ] T046 [US2] Implement checkbox data binding in js/main.js: extract task ID from data-task-id attribute, call toggleTaskCompleted, update state
- [ ] T047 [US2] Implement visual completion state in js/ui.js: add/remove .task--completed class based on task.completed boolean
- [ ] T048 [US2] Implement checkbox checked state in js/ui.js: set checkbox.checked = task.completed when rendering
- [ ] T049 [US2] Test manually: Click checkbox on incomplete task → verify visual completion styling applied
- [ ] T050 [US2] Test manually: Click checkbox on completed task → verify visual styling removed
- [ ] T051 [US2] Test manually: Toggle task, refresh page → verify completion state persists
- [ ] T052 [US2] Test manually: Toggle multiple tasks rapidly → verify all state changes saved correctly

**Checkpoint**: User Stories 1 AND 2 both work independently - can demo complete create + complete flow

---

## Phase 5: User Story 3 - Delete Tasks (Priority: P3)

**Goal**: Users can remove tasks from the list with immediate visual feedback

**Independent Test**: Can be fully tested by deleting a task and verifying it's removed from the display and storage immediately

### Implementation for User Story 3

- [ ] T053 [US3] Implement delete button HTML in js/ui.js: add button element with class="task__delete", text "×", aria-label="Delete task: {title}"
- [ ] T054 [US3] Implement delete button styles in css/components.css: .task__delete with hover state, red color, proper sizing
- [ ] T055 [US3] Implement delete click handler in js/main.js: handleTaskListClick(e) with event delegation, check for .task__delete target
- [ ] T056 [US3] Implement deleteTask() in js/state.js: filter out task by ID, return new state without deleted task
- [ ] T057 [US3] Add click event listener in js/main.js: taskList.addEventListener('click', handleTaskListClick)
- [ ] T058 [US3] Implement task deletion flow in js/main.js: extract task ID, call deleteTask, update state, re-render UI
- [ ] T059 [US3] Implement empty state after delete in js/ui.js: ensure renderEmptyState() shows when last task deleted
- [ ] T060 [US3] Test manually: Delete task from middle of list → verify removed immediately, no page refresh
- [ ] T061 [US3] Test manually: Delete last task → verify empty state message appears
- [ ] T062 [US3] Test manually: Delete task, refresh page → verify deleted task does not reappear
- [ ] T063 [US3] Test manually: Rapid delete clicks → verify no duplicate deletions or errors

**Checkpoint**: User Stories 1, 2, AND 3 all work independently - full CRUD functionality complete

---

## Phase 6: User Story 4 - Filter and View Task Statuses (Priority: P4)

**Goal**: Users can filter tasks by status (all, active, completed) to focus on specific subsets

**Independent Test**: Can be fully tested by clicking filter buttons and verifying only matching tasks are displayed

### Implementation for User Story 4

- [ ] T064 [US4] Implement filter controls HTML in index.html: div with class="filter-controls", three buttons: "All", "Active", "Completed"
- [ ] T065 [US4] Implement filter button styles in css/components.css: .filter-controls, .filter-controls__button, .filter-controls__button--active
- [ ] T066 [US4] Implement filter click handler in js/main.js: handleFilterClick(e) with event delegation
- [ ] T067 [US4] Implement setFilter() in js/state.js: validate filter value ('all'|'active'|'completed'), update state.filter
- [ ] T068 [US4] Implement getFilteredTasks() in js/state.js: return tasks array filtered by current filter state
- [ ] T069 [US4] Add filter click listener in js/main.js: filterControls.addEventListener('click', handleFilterClick)
- [ ] T070 [US4] Implement filter button active state in js/ui.js: add .filter-controls__button--active to selected filter button
- [ ] T071 [US4] Update renderTaskList() in js/ui.js: call getFilteredTasks() instead of state.tasks directly
- [ ] T072 [US4] Test manually: Click "Active" filter → verify only incomplete tasks shown
- [ ] T073 [US4] Test manually: Click "Completed" filter → verify only completed tasks shown
- [ ] T074 [US4] Test manually: Click "All" filter → verify all tasks shown again
- [ ] T075 [US4] Test manually: Switch filters multiple times → verify correct tasks shown each time
- [ ] T076 [US4] Test manually: Filter + toggle completion → verify task appears/disappears based on filter
- [ ] T077 [US4] Test manually: Filter + delete → verify filter maintained after deletion

**Checkpoint**: All 4 user stories complete - full feature set ready for polish phase

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Accessibility, responsiveness, error handling, and final polish

### Accessibility Implementation

- [ ] T078 [P] Add ARIA labels in index.html: aria-label on icon-only delete buttons, aria-live="polite" on task list
- [ ] T079 [P] Add visually-hidden label in index.html: label for task input with class="visually-hidden"
- [ ] T080 [P] Implement focus styles in css/components.css: :focus outline with 2px solid --color-primary, outline-offset
- [ ] T081 Test keyboard navigation: Tab through all elements → verify visible focus indicators
- [ ] T082 Test keyboard activation: Press Enter/Space on buttons → verify actions trigger correctly
- [ ] T083 Test screen reader: Enable NVDA/VoiceOver → verify task additions announced via live region

### Responsiveness Implementation

- [ ] T084 [P] Implement mobile styles in css/responsive.css: single column layout, full-width input/buttons, touch targets ≥44x44px
- [ ] T085 [P] Implement tablet styles in css/responsive.css: two-column layout option, centered content with max-width
- [ ] T086 [P] Implement desktop styles in css/responsive.css: centered layout, hover states on interactive elements
- [ ] T087 Test mobile view (320px): Verify no horizontal scroll, readable text, accessible inputs
- [ ] T088 Test tablet view (768px): Verify layout adapts appropriately
- [ ] T089 Test desktop view (1024px): Verify centered layout with max-width constraint

### Error Handling

- [ ] T090 [P] Implement LocalStorage error handling in js/storage.js: showQuotaExceededWarning(), showStorageDisabledWarning()
- [ ] T091 [P] Implement global error handler in js/main.js: window.onerror handler for uncaught exceptions
- [ ] T092 Test LocalStorage quota exceeded: Fill storage → verify warning shown, app continues
- [ ] T093 Test LocalStorage unavailable: Disable storage → verify graceful degradation message

### Edge Cases

- [ ] T094 Implement long title handling in css/components.css: text-overflow: ellipsis or word-wrap: break-word for titles >100 chars
- [ ] T095 Implement rapid click prevention in js/main.js: debounce task creation with 100ms delay
- [ ] T096 Test whitespace-only title: Enter only spaces → verify rejected with validation error
- [ ] T097 Test special characters: Enter titles with quotes, emojis → verify stored and displayed correctly

### Final Validation

- [ ] T098 [P] Remove console.log statements: Search all JS files, remove or comment out debug logs
- [ ] T099 [P] Add JSDoc comments: Document all public functions in each module
- [ ] T100 [P] Create README.md: Project description, features, usage instructions, browser requirements
- [ ] T101 Cross-browser test Chrome: Verify all functionality works in latest Chrome
- [ ] T102 Cross-browser test Firefox: Verify all functionality works in latest Firefox
- [ ] T103 Cross-browser test Safari: Verify all functionality works in latest Safari
- [ ] T104 Cross-browser test Edge: Verify all functionality works in latest Edge
- [ ] T105 Run Lighthouse audit: Verify Performance ≥90, Accessibility ≥90, Best Practices ≥90
- [ ] T106 Verify no console errors: Open DevTools console, fix any errors or warnings
- [ ] T107 Verify no memory leaks: Use DevTools Memory profiler, check for detached DOM references

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - **BLOCKS all user stories**
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent, may integrate with US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent, may integrate with US1/US2
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Independent, builds on previous stories

### Within Each User Story

1. HTML structure tasks first
2. CSS styling tasks (can run in parallel with HTML)
3. JavaScript implementation tasks
4. Event listener wiring
5. Manual testing tasks (MUST run after implementation)

### Parallel Opportunities

**Phase 1 (Setup)** - All tasks marked [P] can run in parallel:
- T002-T011: Different files, no dependencies

**Phase 2 (Foundational)** - Tasks can run in parallel by file:
- HTML/CSS tasks: T012-T014
- JavaScript module tasks: T015-T022

**After Foundational Complete** - All user stories can run in parallel:
- Developer A: User Story 1 (T023-T042)
- Developer B: User Story 2 (T043-T052)
- Developer C: User Story 3 (T053-T063)
- Developer D: User Story 4 (T064-T077)

**Within User Stories** - Parallel opportunities:
- HTML + CSS tasks can run in parallel
- Multiple implementation tasks with different file targets

---

## Parallel Example: User Story 1

```bash
# Launch HTML and CSS tasks together:
Task: "T023 [US1] Implement task form HTML in index.html"
Task: "T024 [US1] Implement task form styles in css/components.css"
Task: "T025 [US1] Implement task list container HTML in index.html"

# After HTML/CSS complete, launch JavaScript tasks:
Task: "T028 [US1] Implement task item template in js/ui.js"
Task: "T031 [US1] Implement renderTaskList() in js/ui.js"
Task: "T033 [US1] Implement handleTaskSubmit() in js/main.js"

# Final testing tasks (sequential):
Task: "T039 [US1] Test manually: Create task with valid title"
Task: "T040 [US1] Test manually: Create task with empty title"
Task: "T041 [US1] Test manually: Create multiple tasks"
Task: "T042 [US1] Test manually: Refresh page, verify persistence"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T011)
2. Complete Phase 2: Foundational (T012-T022) **⚠️ CRITICAL - BLOCKS ALL STORIES**
3. Complete Phase 3: User Story 1 (T023-T042)
4. **STOP and VALIDATE**: Test User Story 1 independently
   - Can create tasks
   - Can view tasks
   - Tasks persist after refresh
5. Deploy/demo if ready for MVP

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → **Deploy/Demo (MVP!)**
3. Add User Story 2 → Test independently → Deploy/Demo (add completion tracking)
4. Add User Story 3 → Test independently → Deploy/Demo (add deletion)
5. Add User Story 4 → Test independently → Deploy/Demo (add filtering)
6. Complete Phase 7: Polish → Final release
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done (T022 complete):
   - Developer A: User Story 1 (T023-T042)
   - Developer B: User Story 2 (T043-T052)
   - Developer C: User Story 3 (T053-T063)
   - Developer D: User Story 4 (T064-T077)
3. Stories complete and integrate independently
4. Team reconvenes for Phase 7: Polish tasks

---

## Task Summary

| Phase | Description | Task Count | Story |
|-------|-------------|------------|-------|
| Phase 1 | Setup | 11 tasks | N/A |
| Phase 2 | Foundational | 11 tasks | N/A |
| Phase 3 | User Story 1 | 20 tasks | P1 (MVP) |
| Phase 4 | User Story 2 | 10 tasks | P2 |
| Phase 5 | User Story 3 | 11 tasks | P3 |
| Phase 6 | User Story 4 | 14 tasks | P4 |
| Phase 7 | Polish | 30 tasks | Cross-cutting |
| **Total** | **All phases** | **107 tasks** | **All stories** |

### Task Breakdown by Category

- **Setup/Infrastructure**: 22 tasks (Phases 1-2)
- **User Story Implementation**: 55 tasks (Phases 3-6)
- **Testing**: 20 tasks (embedded in each story)
- **Polish & Cross-Cutting**: 30 tasks (Phase 7)

### Independent Test Criteria Summary

| User Story | Independent Test |
|------------|------------------|
| US1 (P1) | Add tasks, view in list, persist after refresh |
| US2 (P2) | Toggle completion, visual feedback, persists |
| US3 (P3) | Delete tasks, immediate removal, persists |
| US4 (P4) | Filter by status, correct tasks shown |

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Manual testing tasks included (no automated test framework required)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- **CRITICAL**: Complete Phase 2 (Foundational) before starting ANY user story

---

**Tasks Status**: Ready for implementation
**Next Command**: `/sp.implement` to begin Phase 1 implementation
