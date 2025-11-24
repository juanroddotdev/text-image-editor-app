# Active Development

**Last Updated**: November 23, 2025

---

## ⚠️ Important: Update Roadmap When Completing Items

**When you complete an item listed here, please update the roadmap files!**

👉 **See [Quick Checklist](../UPDATE_CHECKLIST.md)** for step-by-step instructions

**Quick Checklist:**
- [ ] Move item to appropriate `completed/` file
- [ ] Update `README.md` statistics
- [ ] Update `changelog.md`
- [ ] Remove from this file (or move to "Recently Completed")
- [ ] Update `phases.md` if applicable

---

## Currently In Progress

### 🎯 PRIORITY: Complete Mobile UX Checklist
- **Status**: 🟡 **IN PROGRESS**
- **Current Focus**: Complete all remaining items from [Mobile UX Checklist](../../mobile_ux_checklist.md)
- **Progress**: 9/10 items complete (90%)
- **Remaining Items**: 1 item left to complete

**Active Items** (from Mobile UX Checklist):
1. **Item #8: Layering** - ✅ **COMPLETE** (Fabric.js handles automatically on selection)
   - Objects automatically bring to front when selected
   - No explicit button needed - selection handles layering
   - Visual layer management panel added to future roadmap

**Note**: Item #9 (Font Scaling Display) is complete - touch scaling works. Manual input deferred to accessibility features.

**Reference**: See [Mobile UX Checklist](../../mobile_ux_checklist.md) for full details

---

## Items On Hold (After Mobile UX Checklist Complete)

### High Priority Items (Deferred)
2. **Add Testing Infrastructure** - Set up Vitest/Jest for unit tests
3. **Replace Alert() with Toast System** - Implement proper error notifications
4. **Remove Console.log Statements** - Clean up production code
5. **Seamless Gesture Transitions** - Ensure zero-latency switching between drag and gesture modes
6. **Touch Hit-Testing** - Optimize touch target sizes (min 44px) for fingers
7. **Virtual Keyboard Handling** - Prevent canvas resizing when mobile keyboard opens
8. **Safe Area Management** - Adjust UI for notches and home indicator bars
9. **Background Image Manipulation** - Add ability to move, scale, rotate the background image

### Medium Priority Items (Ready Soon)
- Add accessibility features (ARIA labels, keyboard navigation)
- Improve TypeScript types (remove `any` types)
- Extract magic numbers to constants
- Performance optimizations (memoization)

---

## Blocked Items

_No items currently blocked_

---

## Recently Completed (From Active Work)

- ✅ **Item #8: Layering** - Automatic bring-to-front on selection (Completed: 2025-11-23)
  - Fabric.js automatically brings selected objects to front
  - No explicit button needed - selection handles layering naturally
  - Visual layer management panel added to future roadmap for advanced use cases
  - Files modified: `src/App.tsx`, `src/state/editorStore.ts`, `src/components/containers/EditorCanvasContainer.tsx`
- ✅ **Item #9: Font Scaling Display** - Touch scaling sufficient (Completed: 2025-11-23)
  - Touch scaling via pinch/handles works smoothly
  - Removed read-only font size display for minimal UI
  - Manual font size input deferred to accessibility features
  - Files modified: `src/App.tsx`
- ✅ **Item #7: Deletion (Drag-to-Delete Zone)** - Drag-to-delete functionality implemented (Completed: 2025-11-23)
  - Visual delete zone appears when dragging objects toward bottom (120px threshold)
  - Red gradient UI with trash icon and "Release to Delete" text
  - Prevents activation during gestures (pinch/rotate)
  - Files modified: `src/components/containers/EditorCanvasContainer.tsx`, `src/state/editorStore.ts`, `src/App.tsx`
- ✅ **Color Picker** - Mobile-friendly color selection modal (Completed: 2025-11-23)
  - Semi-transparent modal (85% opacity) for real-time preview
  - Preset color swatches and custom color input
  - Swipe-down gesture to close, stays open on selection
  - Files modified: `src/App.tsx`
- ✅ **Font Picker** - Mobile-friendly font selection modal (Completed: 2025-11-23)
  - Semi-transparent modal matching color picker design
  - Scrollable font list with preview text
  - Swipe-down gesture to close, stays open on selection
  - Files modified: `src/App.tsx`
- ✅ **UI Improvements** - Icon updates and visibility controls (Completed: 2025-11-23)
  - Changed Add Text button icon to I-Beam cursor
  - Changed Font button icon to "Aa"
  - Hide control panel until image is loaded
  - Files modified: `src/App.tsx`
- ✅ **Fix Mobile Browser Layout Issue** - Bottom toolbar now visible on mobile browsers (Completed: 2025-11-23)
  - Fixed viewport height calculation using JavaScript-set CSS variable `--vh`
  - Container now uses actual `window.innerHeight` instead of `100dvh`
  - Toolbar stays within viewport on all mobile devices
  - Files modified: `src/App.tsx`, `src/index.css`, `index.html`
- ✅ Multi-Touch Gesture Engine - Drag, Pinch, Rotate support (Completed: 2025-11-23)
- ✅ Trackpad Gesture Mocking - Option+Drag (Scale) and Control+Drag (Rotate) (Completed: 2025-11-23)
- ✅ Selection Style Configuration - Mobile-friendly cyan handles (Completed: 2025-11-23)
- ✅ Canvas Configuration System - Configurable selection styles and control visibility (Completed: 2025-11-23)

---

**← [Back to Roadmap Overview](../README.md)**  
**See [Planned Features](../planned/)** for future work

