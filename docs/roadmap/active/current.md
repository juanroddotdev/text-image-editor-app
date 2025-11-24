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
- **Progress**: 7/10 items complete (70%)
- **Remaining Items**: 3 items left to complete

**Active Items** (from Mobile UX Checklist):
1. **Item #7: Deletion (Drag-to-Delete Zone)** - 🚧 **CURRENTLY WORKING ON**
   - Drag selected text object towards bottom of screen
   - Visual Delete Zone (trash can) appears
   - Releasing object in zone triggers deletion
   - Intuitive, high-confidence gesture for object removal

2. **Item #8: Layering** - ⏸️ **NEXT**
   - Dedicated "Bring to Front" button/icon in control panel when selected
   - Moves object to top of stack
   - Essential for stacking multiple objects

3. **Item #9: Font Scaling Display** - ⏸️ **NEXT**
   - When scaling via pinch/handles, Font Size Slider updates in real-time
   - Bridges gap between touch input and numerical input

**Reference**: See [Mobile UX Checklist](../../mobile_ux_checklist.md) for full details

---

## Items On Hold (After Mobile UX Checklist Complete)

### High Priority Items (Deferred)
1. **Complete UI Controls** - Connect Font/Color picker icons to actual functionality
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

