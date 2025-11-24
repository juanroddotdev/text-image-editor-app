# Roadmap Changelog

**Last Updated**: November 23, 2025  
**Current Version**: 2.4

---

## Version 2.4 (November 23, 2025)

### Completed Items
- ✅ **Item #7: Deletion (Drag-to-Delete Zone)** - Mobile UX Checklist item completed
  - Visual delete zone appears when dragging objects toward bottom (120px threshold)
  - Red gradient UI with trash icon and "Release to Delete" text
  - Delete objects by releasing in delete zone
  - Prevents activation during gestures (pinch/rotate)
  - Files modified: `src/components/containers/EditorCanvasContainer.tsx`, `src/state/editorStore.ts`, `src/App.tsx`
  - Completion date: 2025-11-23

- ✅ **Color Picker** - Mobile-friendly color selection modal
  - Semi-transparent modal (85% opacity) for real-time preview
  - Preset color swatches and custom color input
  - Swipe-down gesture to close, stays open on selection
  - Files modified: `src/App.tsx`
  - Completion date: 2025-11-23

- ✅ **Font Picker** - Mobile-friendly font selection modal
  - Semi-transparent modal matching color picker design
  - Scrollable font list with preview text
  - Swipe-down gesture to close, stays open on selection
  - Files modified: `src/App.tsx`
  - Completion date: 2025-11-23

- ✅ **UI Icon and Visibility Improvements**
  - Changed Add Text button icon to I-Beam cursor
  - Changed Font button icon to "Aa"
  - Hide control panel until image is loaded
  - Files modified: `src/App.tsx`
  - Completion date: 2025-11-23

### Progress Updates
- Mobile UX Checklist: 8/10 items complete (80%) - up from 70%
- Core Features: 11/12 complete (92%) - up from 67%
- Overall Completion: ~51% - up from ~42%

---

## Version 2.3 (November 23, 2025)

### Completed Items
- ✅ **Fix Mobile Browser Layout Issue** (Item #0) - Critical bug fixed
  - Implemented JavaScript-based viewport height calculation using CSS variable `--vh`
  - Container now uses actual `window.innerHeight` instead of `100dvh`
  - Bottom toolbar now visible immediately on mobile browsers
  - Files modified: `src/App.tsx`, `src/index.css`, `index.html`
  - Completion date: 2025-11-23

---

## Version 2.2 (November 23, 2025)

### New Items Added
- 🔴 **Critical Bug**: Fix Mobile Browser Layout - Bottom toolbar hidden on load (Item #0)
  - Added to high-priority as critical blocking issue
  - Must be fixed before Mobile UX Checklist items
  - Issue: Bottom toolbar appears below viewport, user must scroll
- 🟠 **Feature**: Background Image Manipulation - Move, scale, rotate background image (Item #12)
  - Added to high-priority as feature enhancement
  - Allows users to manipulate background image like text objects
  - Deferred until after critical bug and Mobile UX Checklist complete

---

## Version 2.1 (November 23, 2025)

### Priority Shift: Mobile UX Checklist First
- 🎯 **NEW PRIORITY**: Complete Mobile UX Checklist items before other roadmap work
- 📋 Added Item #7 (Deletion - Drag-to-Delete Zone) to high-priority - Currently working on
- 📋 Added Item #8 (Layering - Bring to Front) to high-priority - Next
- 📋 Added Item #9 (Font Scaling Display) to high-priority - Next
- 📋 Updated active work to reflect Mobile UX Checklist focus
- 📋 Deferred all other high-priority items until Mobile UX Checklist is 100% complete
- 📋 Updated Phase 2 status: 70% complete (7/10 Mobile UX Checklist items done)

---

## Version 2.0 (November 23, 2025)

### Roadmap Reorganization
- 📋 Reorganized roadmap from single file to multi-file structure
- 📋 Created `roadmap/` directory with organized subdirectories
- 📋 Added status dashboard and navigation structure
- 📋 Separated completed, active, and planned work

### New Items Added
- 📋 Added Item #1 (Complete UI Controls) to high-priority roadmap
- 📋 Added Item #2 (Add Testing Infrastructure) to high-priority roadmap
- 📋 Added Item #3 (Replace Alert() with Toast System) to high-priority roadmap
- 📋 Added Item #4 (Remove Console.log Statements) to high-priority roadmap
- 📋 Added Item #5-8 (Mobile UX, TypeScript, Constants) to high-priority roadmap
- 📋 Added Item #1-8 (Medium priority enhancements) to medium-priority roadmap
- 📋 Added Item #1-15 (Future features) to future roadmap

### Completed Items Documented
- ✅ Multi-Touch Gesture Engine - Drag, Pinch, Rotate support
- ✅ Trackpad Gesture Mocking - Option+Drag (Scale) and Control+Drag (Rotate)
- ✅ Selection Style Configuration - Mobile-friendly cyan handles
- ✅ Canvas Configuration System - Configurable selection styles

---

## Version 1.0 (November 23, 2025)

### Initial Roadmap
- 📋 Created initial roadmap document (`docs/roadmap.md`)
- 📋 Defined Phase 1: Web MVP (Foundation)
- 📋 Defined Phase 2: Mobile Readiness (Touch & Polish)
- 📋 Defined Phase 3: Future Enhancements (Expansion)

### Phase 1 Items (Completed)
- ✅ Smart Image Upload
- ✅ Text Manipulation
- ✅ Font Size Slider
- ✅ Export Pipeline
- ✅ Trackpad Gesture Mocking
- ✅ Keyboard Shortcuts

---

**← [Back to Roadmap Overview](./README.md)**

