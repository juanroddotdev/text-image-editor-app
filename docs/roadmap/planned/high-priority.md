# High Priority - Planned Features

**Status**: Planned - Ready to implement  
**Last Updated**: November 23, 2025

---

## Overview

These are high-priority features that should be implemented next. They represent essential functionality, critical user flows, or important fixes that significantly impact user experience.

---

## ✅ COMPLETED: Mobile Browser Layout Fix

### 0. Fix Mobile Browser Layout - Bottom Toolbar Hidden
- **Priority**: 🔴 Critical Bug
- **Status**: ✅ **COMPLETE** (Completed: 2025-11-23)
- **Issue**: Bottom toolbar is hidden on mobile browser load, user has to scroll to see it

**Problem**: 
- Bottom toolbar appears below viewport on mobile browsers
- User must scroll down to access controls on initial load
- Poor initial user experience
- May be related to viewport height calculation (`100vh` vs `100dvh`) or safe area handling

**Expected Behavior**: 
- Bottom toolbar should be visible immediately on page load
- No scrolling required to access controls
- Layout should fit within viewport on all mobile devices

**Implementation**:
- **Task 1**: Investigate viewport height issue
  - Check if `100vh` is causing problems on mobile browsers (address bar affects height)
  - Test with `100dvh` (dynamic viewport height) if supported
  - Use `100dvh` for modern browsers that support it, fallback to `100vh`
  - Check for safe area insets affecting layout
- **Task 2**: Fix layout to ensure toolbar visible
  - Adjust container height calculation in `App.tsx`
  - Ensure flex layout properly constrains content (`flex-1` on canvas, fixed height toolbar)
  - Use `min-h-screen` or `h-screen` appropriately
  - Consider using CSS Grid instead of Flexbox for better control
- **Task 3**: Prevent scrolling on initial load
  - Ensure page fits within viewport
  - Lock scroll position if needed (`overflow-hidden` on body)
  - Verify on different screen sizes (iPhone SE, iPhone 14 Pro, Android devices)
  - Test with browser address bar visible and hidden

**Files to Modify**: 
- `src/App.tsx` (layout container, viewport handling)
- `src/index.css` (viewport meta tag, CSS adjustments, body overflow)
- `index.html` (viewport meta tag if needed)

**Testing**:
- Test on iOS Safari (various iPhone models)
- Test on Chrome Android
- Test with browser address bar visible and hidden
- Test on different screen sizes
- Verify no horizontal scrolling

---

## 🎯 CURRENT PRIORITY: Complete Mobile UX Checklist

**⚠️ IMPORTANT**: These items from the [Mobile UX Checklist](../../mobile_ux_checklist.md) must be completed.

### 1. Deletion (Drag-to-Delete Zone)
- **Priority**: 🔴 Critical (Mobile UX Checklist Item #7)
- **Status**: ✅ **COMPLETE** (Completed: 2025-11-23)
- **Source**: [Mobile UX Checklist](../../mobile_ux_checklist.md) - Item #7

**Task**: Drag the selected text object towards the bottom of the screen.

**Expected Behavior**: 
- A Visual Delete Zone (e.g., trash can) appears when dragging towards bottom
- Releasing the object in this zone triggers deletion
- Intuitive, high-confidence gesture for object removal

**Implementation**:
- **Task 1**: Detect drag gesture towards bottom of screen
  - Monitor drag position during object movement
  - Calculate distance from bottom edge
  - Trigger threshold (e.g., within 100px of bottom)
- **Task 2**: Display Visual Delete Zone
  - Show trash can icon or delete zone indicator
  - Animate appearance when threshold reached
  - Visual feedback (color change, animation)
- **Task 3**: Handle deletion on release
  - Check if object released within delete zone
  - Trigger delete action
  - Remove object from canvas and store

**Files to Modify**: 
- `src/components/containers/EditorCanvasContainer.tsx` (drag handling, delete zone)
- `src/App.tsx` (delete zone UI component if needed)

**Reference**: See [Mobile UX Checklist](../../mobile_ux_checklist.md)

---

### 2. Layering (Bring to Front)
- **Priority**: 🔴 Critical (Mobile UX Checklist Item #8)
- **Status**: 🚧 **CURRENTLY WORKING ON**
- **Source**: [Mobile UX Checklist](../../mobile_ux_checklist.md) - Item #8

**Task**: A dedicated "Bring to Front" button or icon is visible in the control panel when selected.

**Expected Behavior**: 
- Moves object to top of stack
- Essential for stacking multiple objects

**Implementation**:
- **Task 1**: Add "Bring to Front" button to control panel
  - Display when text object is selected
  - Icon or button in toolbar
- **Task 2**: Implement layer reordering
  - Update object z-index or array order
  - Move selected object to end of objects array (top layer)
  - Update canvas to reflect new order

**Files to Modify**: 
- `src/App.tsx` (add button to toolbar)
- `src/state/editorStore.ts` (add bringToFront action)
- `src/components/containers/EditorCanvasContainer.tsx` (update canvas order)

**Reference**: See [Mobile UX Checklist](../../mobile_ux_checklist.md)

---

### 3. Font Scaling Display
- **Priority**: 🔴 Critical (Mobile UX Checklist Item #9)
- **Status**: ⏸️ **NEXT**
- **Source**: [Mobile UX Checklist](../../mobile_ux_checklist.md) - Item #9

**Task**: Scale via pinch/handles.

**Expected Behavior**: 
- The corresponding Font Size Slider value in the controls panel updates in real-time
- Bridges the gap between touch input and numerical input

**Implementation**:
- **Task 1**: Calculate font size from scale
  - When object is scaled via pinch/handles, calculate equivalent font size
  - Formula: `fontSize = baseFontSize * scaleX` (or average of scaleX/scaleY)
- **Task 2**: Update slider in real-time
  - Sync slider value with calculated font size
  - Update as user scales object
  - Ensure slider reflects current scale

**Files to Modify**: 
- `src/components/containers/EditorCanvasContainer.tsx` (calculate font size from scale)
- `src/App.tsx` (update slider value)
- `src/state/editorStore.ts` (sync fontSize with scale)

**Reference**: See [Mobile UX Checklist](../../mobile_ux_checklist.md)

---

## 🔴 CRITICAL PRIORITY (Deferred Until Mobile UX Checklist Complete)

### 4. Complete UI Controls
- **Priority**: 🔴 Critical
- **Status**: 🟡 **PARTIALLY COMPLETE** (Font & Color pickers done, Alignment pending)
- **Current State**: Font and Color pickers implemented, Alignment still missing

**Completed**: 
- ✅ Font Family picker - Mobile-friendly modal with preview (Completed: 2025-11-23)
- ✅ Color Picker - Mobile-friendly modal with swatches and custom input (Completed: 2025-11-23)

**Remaining**:
- ❌ Text Alignment controls - Still needs implementation
  - Add alignment buttons (Left, Center, Right)
  - Update active object's `textAlign` property
  - Or remove icon if alignment not needed

**Files to Modify**: 
- `src/App.tsx` (connect icons to components)
- `src/components/presentational/FontPicker.tsx` (create or update)
- `src/components/presentational/ColorPicker.tsx` (create or update)

**Reference**: See existing components in `src/components/presentational/`

---

### 5. Add Testing Infrastructure
- **Priority**: 🔴 Critical
- **Status**: ❌ Not Implemented
- **Current State**: No automated tests exist

**Problem**: 
- No unit tests for core logic
- No integration tests for state management
- No component tests
- High risk for regressions

**Implementation**:
- **Task 1**: Set up testing framework
  - Install Vitest (or Jest) for unit tests
  - Install React Testing Library for component tests
  - Configure test scripts in `package.json`
- **Task 2**: Write unit tests for core logic
  - `colorUtils.ts` - Test hex ↔ RGB conversion
  - `textUtils.ts` - Test defaults and validation
  - `canvasUtils.ts` - Test serialization and ID generation
- **Task 3**: Write integration tests for state management
  - Test Zustand store actions
  - Test state updates and side effects
- **Task 4**: Write component tests
  - Test presentational components (Button, ColorPicker, etc.)
  - Test container components (EditorCanvasContainer)

**Files to Create**: 
- `src/core-logic/__tests__/colorUtils.test.ts`
- `src/core-logic/__tests__/textUtils.test.ts`
- `src/core-logic/__tests__/canvasUtils.test.ts`
- `src/state/__tests__/editorStore.test.ts`
- `src/components/presentational/__tests__/Button.test.tsx`

**Dependencies**: 
- None (foundation work)

---

### 6. Replace Alert() with Toast System
- **Priority**: 🔴 Critical
- **Status**: ❌ Not Implemented
- **Current State**: Using `alert()` for errors (not user-friendly)

**Problem**: 
- `alert()` blocks UI and provides poor UX
- No consistent error notification system
- No success/info notifications

**Implementation**:
- **Task 1**: Install toast library
  - Install `sonner` or `react-hot-toast`
  - Add Toaster component to App root
- **Task 2**: Replace all `alert()` calls
  - Find all `alert()` usages in codebase
  - Replace with toast notifications
  - Add appropriate toast types (error, success, info)
- **Task 3**: Add error boundaries
  - Create React Error Boundary component
  - Wrap app in error boundary
  - Display user-friendly error messages

**Files to Modify**: 
- `src/App.tsx` (add Toaster, error boundary)
- `src/data-access/imageLoader.ts` (replace alerts)
- `src/data-access/imageExporter.ts` (replace alerts)
- All components with error handling

**Dependencies**: 
- None

---

### 7. Remove Console.log Statements
- **Priority**: 🔴 Critical
- **Status**: ❌ Not Implemented
- **Current State**: Multiple `console.log()` statements in production code

**Problem**: 
- Console logs in `canvasConfig.ts` and other files
- Should use proper logging utility or remove for production

**Implementation**:
- **Task 1**: Audit codebase for console.log
  - Search for all `console.log()` statements
  - Identify which are debug vs. necessary
- **Task 2**: Remove or replace
  - Remove debug console.logs
  - Replace necessary logs with proper logging utility (optional)
  - Or use environment-based logging (dev only)

**Files to Modify**: 
- `src/config/canvasConfig.ts` (multiple console.logs)
- `src/components/containers/EditorCanvasContainer.tsx` (if any)
- Any other files with console.logs

**Dependencies**: 
- None

---

## 🟠 HIGH PRIORITY (Deferred Until Mobile UX Checklist Complete)

### 8. Mobile UX - Virtual Keyboard Handling
- **Priority**: 🟠 High
- **Status**: ❌ Not Implemented
- **Current State**: Canvas may resize/shift when mobile keyboard opens

**Implementation**:
- **Task 1**: Detect keyboard open/close
  - Use viewport height changes
  - Or Visual Viewport API
- **Task 2**: Prevent canvas resizing
  - Lock canvas dimensions when keyboard opens
  - Maintain scroll position
- **Task 3**: Handle text editing focus
  - Ensure text input is visible above keyboard
  - Scroll to active text object if needed

**Files to Modify**: 
- `src/components/containers/EditorCanvasContainer.tsx`
- `src/App.tsx`

**Reference**: See [Mobile UX Checklist](../../mobile_ux_checklist.md)

---

### 9. Mobile UX - Safe Area Management
- **Priority**: 🟠 High
- **Status**: ❌ Not Implemented
- **Current State**: UI may overlap with notches/home indicator

**Implementation**:
- **Task 1**: Detect safe areas
  - Use CSS `env(safe-area-inset-*)` variables
  - Or JavaScript detection
- **Task 2**: Adjust UI layout
  - Add padding for safe areas
  - Ensure controls are accessible
  - Adjust toolbar positioning

**Files to Modify**: 
- `src/App.tsx`
- `src/index.css`

**Reference**: See [Mobile UX Checklist](../../mobile_ux_checklist.md)

---

### 10. Improve TypeScript Types
- **Priority**: 🟠 High
- **Status**: ❌ Not Implemented
- **Current State**: Some `any` types in codebase

**Problem**: 
- `any` types in `EditorCanvasContainer.tsx` (lines 58, 79)
- Fabric.js object extensions need proper typing

**Implementation**:
- **Task 1**: Create Fabric.js type extensions
  - Define interface for objects with `objectId` property
  - Create proper types for Fabric.js object extensions
- **Task 2**: Replace `any` types
  - Replace `(obj as any).objectId` with proper types
  - Add type guards where needed
- **Task 3**: Enable stricter TypeScript settings
  - Check `tsconfig.json` for strict mode
  - Enable `noImplicitAny` if not already

**Files to Modify**: 
- `src/components/containers/EditorCanvasContainer.tsx`
- `src/types/` (create if needed)

---

### 11. Extract Magic Numbers to Constants

---

## 🟠 HIGH PRIORITY (Feature Enhancements)

### 12. Background Image Manipulation
- **Priority**: 🟠 High
- **Status**: ❌ Not Implemented
- **Current State**: Background image is static, cannot be moved, scaled, or rotated

**Problem**: 
- Users can only manipulate text objects
- Background image cannot be repositioned, resized, or rotated
- Limits creative control and composition options

**Expected Behavior**: 
- Background image should be selectable and manipulable like text objects
- Users can move, scale, and rotate the background image
- Background image should have selection handles when selected
- Should work with same gesture controls (drag, pinch, rotate)

**Implementation**:
- **Task 1**: Make background image selectable
  - Add background image as a Fabric.js object (FabricImage)
  - Enable selection on background image
  - Add selection handles when background is selected
- **Task 2**: Implement manipulation controls
  - Enable drag to move background
  - Enable resize handles to scale background
  - Enable rotation handle to rotate background
  - Sync with Zustand store for state management
- **Task 3**: Update state management
  - Add background image transform properties to store (x, y, scaleX, scaleY, rotation)
  - Update `baseImage` interface to include transform properties
  - Persist background position/scale/rotation
- **Task 4**: Handle edge cases
  - Prevent background from being deleted
  - Ensure background stays behind all text objects (z-index)
  - Handle canvas resize with background transforms
  - Maintain aspect ratio option (optional)

**Files to Modify**: 
- `src/components/containers/EditorCanvasContainer.tsx` (make background selectable, add manipulation)
- `src/state/editorStore.ts` (add background transform properties)
- `src/App.tsx` (may need UI indicator when background is selected)

**Considerations**:
- Background should always be behind text objects (z-index)
- May want to disable deletion for background
- Consider adding "Reset Background" button to restore original position/scale
- May want to add "Fit to Canvas" option

**Reference**: Similar to text object manipulation, but for background image
- **Priority**: 🟠 High
- **Status**: ❌ Not Implemented
- **Current State**: Magic numbers scattered in code

**Problem**: 
- Numbers like `430`, `700` in `editorStore.ts`
- Hard to understand and maintain

**Implementation**:
- **Task 1**: Create constants file
  - Create `src/config/constants.ts`
  - Define canvas dimension limits
  - Define font size limits
  - Define other magic numbers
- **Task 2**: Replace magic numbers
  - Update `editorStore.ts` to use constants
  - Update other files as needed

**Files to Create**: 
- `src/config/constants.ts`

**Files to Modify**: 
- `src/state/editorStore.ts`
- Any other files with magic numbers

---

## 📋 Implementation Priority Order

### ✅ COMPLETED
0. **Fix Mobile Browser Layout** - ✅ Complete (2025-11-23)
1. **Deletion (Drag-to-Delete Zone)** - ✅ Complete (2025-11-23)
- **Font & Color Pickers** - ✅ Complete (2025-11-23)

### 🎯 CURRENT FOCUS: Mobile UX Checklist (Items 2-3)
2. **Layering (Bring to Front)** - 🚧 Currently working on
3. **Font Scaling Display** - Next

### ⏸️ DEFERRED (After Mobile UX Checklist Complete)
4. **Complete UI Controls** - Font & Color done, Alignment pending
5. **Add Testing Infrastructure** - Critical for code quality
6. **Replace Alert() with Toast System** - Essential UX improvement
7. **Remove Console.log Statements** - Quick cleanup
8. **Background Image Manipulation** - Feature enhancement
9. **Mobile UX - Virtual Keyboard Handling** - Essential for mobile
10. **Mobile UX - Safe Area Management** - Essential for mobile
11. **Improve TypeScript Types** - Code quality
12. **Extract Magic Numbers** - Code maintainability

---

**← [Back to Roadmap Overview](../README.md)**  
**See [Medium Priority](./medium-priority.md)** for next phase  
**See [Active Work](../active/current.md)** for current sprint

