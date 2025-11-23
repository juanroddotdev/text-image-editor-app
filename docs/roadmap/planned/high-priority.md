# High Priority - Planned Features

**Status**: Planned - Ready to implement  
**Last Updated**: November 23, 2025

---

## Overview

These are high-priority features that should be implemented next. They represent essential functionality, critical user flows, or important fixes that significantly impact user experience.

---

## 🔴 CRITICAL PRIORITY (Core User Flows)

### 1. Complete UI Controls
- **Priority**: 🔴 Critical
- **Status**: ❌ Not Implemented
- **Current State**: Icons exist in UI but no functionality connected

**Problem**: 
- Font Family picker icon exists but doesn't open font selector
- Color Picker icon exists but doesn't open color picker
- Alignment icon exists but doesn't change text alignment

**Implementation**:
- **Task 1**: Connect Font Family icon to FontPicker component
  - Create or use existing `FontPicker` component
  - Display dropdown with 8 Google Fonts
  - Update active object's `fontFamily` property
- **Task 2**: Connect Color Picker icon to ColorPicker component
  - Create or use existing `ColorPicker` component
  - Display color input or custom picker
  - Update active object's `fill` property
- **Task 3**: Implement Text Alignment controls
  - Add alignment buttons (Left, Center, Right)
  - Update active object's `textAlign` property
  - Or remove icon if alignment not needed

**Files to Modify**: 
- `src/App.tsx` (connect icons to components)
- `src/components/presentational/FontPicker.tsx` (create or update)
- `src/components/presentational/ColorPicker.tsx` (create or update)

**Reference**: See existing components in `src/components/presentational/`

---

### 2. Add Testing Infrastructure
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

### 3. Replace Alert() with Toast System
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

### 4. Remove Console.log Statements
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

## 🟠 HIGH PRIORITY (Essential Features)

### 5. Mobile UX - Virtual Keyboard Handling
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

### 6. Mobile UX - Safe Area Management
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

### 7. Improve TypeScript Types
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

### 8. Extract Magic Numbers to Constants
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

1. **Complete UI Controls** - Users expect these to work
2. **Add Testing Infrastructure** - Critical for code quality
3. **Replace Alert() with Toast System** - Essential UX improvement
4. **Remove Console.log Statements** - Quick cleanup
5. **Mobile UX - Virtual Keyboard Handling** - Essential for mobile
6. **Mobile UX - Safe Area Management** - Essential for mobile
7. **Improve TypeScript Types** - Code quality
8. **Extract Magic Numbers** - Code maintainability

---

**← [Back to Roadmap Overview](../README.md)**  
**See [Medium Priority](./medium-priority.md)** for next phase  
**See [Active Work](../active/current.md)** for current sprint

