# Medium Priority - Planned Features

**Status**: Planned - Future enhancements  
**Last Updated**: November 23, 2025

---

## Overview

These are medium-priority features that enhance the application but are not critical for MVP completion. They improve user experience, code quality, and maintainability.

---

## 🟡 MEDIUM PRIORITY (Enhancements)

### 1. Add Accessibility Features
- **Priority**: 🟡 Medium
- **Status**: ❌ Not Implemented
- **Current State**: Missing ARIA labels and keyboard navigation

**Implementation**:
- **Task 1**: Add ARIA labels
  - Add `aria-label` to all icon buttons
  - Add `aria-describedby` for form inputs
  - Add `role` attributes where needed
- **Task 2**: Keyboard navigation
  - Ensure all interactive elements are keyboard accessible
  - Add keyboard shortcuts documentation
  - Test with keyboard-only navigation
- **Task 3**: Screen reader support
  - Test with screen readers (VoiceOver, NVDA)
  - Add semantic HTML where needed
  - Ensure focus management
- **Task 4**: Manual font size input (accessibility)
  - Add manual font size input field/slider for users who cannot use touch scaling
  - Provides precise control and accessibility for users with motor impairments
  - Consider number input with +/- buttons or slider control
  - Display current font size value (read-only or editable)

**Files to Modify**: 
- `src/App.tsx`
- All component files

**Reference**: WCAG 2.1 AA compliance target

---

### 2. Performance Optimizations
- **Priority**: 🟡 Medium
- **Status**: ❌ Not Implemented
- **Current State**: No memoization, potential unnecessary re-renders

**Implementation**:
- **Task 1**: Add React.memo to presentational components
  - Memoize Button, ColorPicker, FontPicker, FontSizeSlider
- **Task 2**: Use useCallback/useMemo
  - Memoize event handlers in App.tsx
  - Memoize computed values
- **Task 3**: Optimize canvas rendering
  - Profile canvas re-renders
  - Implement object pooling if needed
  - Debounce state updates

**Files to Modify**: 
- `src/App.tsx`
- `src/components/presentational/*.tsx`
- `src/components/containers/EditorCanvasContainer.tsx`

---

### 3. Asset Lazy Loading
- **Priority**: 🟡 Medium
- **Status**: ❌ Not Implemented
- **Current State**: All fonts loaded upfront

**Implementation**:
- **Task 1**: Lazy load Google Fonts
  - Load fonts only when needed
  - Use font-display: swap
- **Task 2**: Optimize image loading
  - Lazy load background images
  - Use appropriate image formats

**Files to Modify**: 
- `index.html` (font loading)
- `src/data-access/imageLoader.ts`

---

### 4. Canvas Bitmapping/Caching
- **Priority**: 🟡 Medium
- **Status**: ❌ Not Implemented
- **Current State**: Background re-renders on every text manipulation

**Implementation**:
- **Task 1**: Cache background layer
  - Create bitmap of background image
  - Only re-render text objects
- **Task 2**: Optimize render cycles
  - Reduce unnecessary canvas redraws
  - Batch state updates

**Files to Modify**: 
- `src/components/containers/EditorCanvasContainer.tsx`

---

### 5. Haptic Feedback (Web)
- **Priority**: 🟡 Medium
- **Status**: ❌ Not Implemented
- **Current State**: No haptic feedback

**Implementation**:
- **Task 1**: Implement vibration API
  - Use `navigator.vibrate()` for supported devices
  - Add haptic feedback on delete actions
  - Add haptic feedback on snap-to-grid (if implemented)

**Files to Modify**: 
- `src/components/containers/EditorCanvasContainer.tsx`
- `src/App.tsx`

**Note**: Web vibration API has limited support, primarily mobile browsers

---

### 6. Touch Hit-Testing Optimization
- **Priority**: 🟡 Medium
- **Status**: ❌ Not Implemented
- **Current State**: Touch targets may be too small

**Implementation**:
- **Task 1**: Audit touch target sizes
  - Ensure minimum 44px × 44px for all interactive elements
  - Check button sizes in toolbar
  - Check control handles on canvas
- **Task 2**: Increase touch targets if needed
  - Adjust button sizes
  - Increase control handle sizes
  - Add padding to touch areas

**Files to Modify**: 
- `src/App.tsx` (toolbar buttons)
- `src/config/canvasConfig.ts` (control handles)

**Reference**: See [Mobile UX Checklist](../../mobile_ux_checklist.md)

---

### 7. Seamless Gesture Transitions
- **Priority**: 🟡 Medium
- **Status**: ❌ Not Implemented
- **Current State**: May require focus tap before gestures work

**Implementation**:
- **Task 1**: Remove focus requirement
  - Ensure gestures work immediately on touch
  - No "focus" tap needed before drag/scale/rotate
- **Task 2**: Smooth mode switching
  - Zero-latency switching between drag and gesture modes
  - Detect gesture intent early

**Files to Modify**: 
- `src/components/containers/EditorCanvasContainer.tsx`

**Reference**: See [Mobile UX Checklist](../../mobile_ux_checklist.md)

---

### 8. Create Deployment Documentation
- **Priority**: 🟡 Medium
- **Status**: ❌ Not Implemented
- **Current State**: Firebase config exists but no deployment guide

**Implementation**:
- **Task 1**: Document build process
  - Document `npm run build` process
  - Document preview process
- **Task 2**: Document Firebase deployment
  - Document `npm run deploy` process
  - Document Firebase hosting setup
  - Document environment variables if needed
- **Task 3**: Document production checklist
  - Pre-deployment checks
  - Post-deployment verification

**Files to Create**: 
- `docs/DEPLOYMENT.md`

**Files Modified**: 
- `README.md` (add link to deployment guide)

---

### 9. Grid Overlay/Guides
- **Priority**: 🟡 Medium
- **Status**: ✅ **COMPLETE** (Completed: 2025-11-23)
- **Current State**: Grid overlay implemented with multiple grid types

**Completed**:
- ✅ Grid picker modal with 6 grid options (None, Rule of Thirds, 4x4, Center Lines, Golden Ratio, Diagonal)
- ✅ Rule of Thirds (3x3) grid overlay
- ✅ 4x4 grid overlay
- ✅ Center lines (crosshair) overlay
- ✅ Golden ratio guides overlay
- ✅ Diagonal guides overlay
- ✅ Grid toggle button in right-edge control panel
- ✅ Semi-transparent grid lines with visual feedback

**Reference**: See [Completed Features](../completed/features.md) for details

---

**Description**: 
Professional compositional aids for optimal text and sticker placement, which is key to a high-quality editor.

**Implementation**:
- **Task 1**: Add toggle button to control panel
  - Add grid overlay toggle button to right-edge control panel
  - Button cycles between: Off → 3x3 Grid → Rule of Thirds → Golden Ratio → Off
  - Visual indicator showing current mode (icon or label)
- **Task 2**: Implement 3x3 Grid overlay
  - Draw simple 3x3 grid lines on canvas
  - Grid lines evenly divide canvas into 9 equal sections
  - Lines drawn above background image but below interactive objects
- **Task 3**: Implement Rule of Thirds Grid
  - Draw Rule of Thirds grid (2 horizontal + 2 vertical lines at 1/3 and 2/3 positions)
  - Standard compositional guide for balanced layouts
- **Task 4**: Implement Golden Ratio overlay
  - Draw Golden Ratio spiral and/or rectangles
  - Provides classical compositional guidance
  - May use Fibonacci spiral approximation
- **Task 5**: Canvas layer management
  - Ensure grid is drawn on separate layer above background
  - Grid must not interfere with object selection/manipulation
  - Grid should be non-interactive (not selectable)

**Technical Considerations**:
- Grid should be drawn using Fabric.js overlay or custom canvas drawing
- Consider using `canvas.renderOnAddRemove = false` during grid drawing for performance
- Grid lines should be semi-transparent (e.g., 30-50% opacity)
- Grid color should contrast with both light and dark images (consider white with shadow or configurable color)

**Files to Create**: 
- `src/components/presentational/GridOverlay.tsx` (optional, if component-based)
- `src/core-logic/gridUtils.ts` (grid calculation functions)

**Files to Modify**: 
- `src/App.tsx` (add toggle button to control panel)
- `src/components/containers/EditorCanvasContainer.tsx` (grid rendering logic)
- `src/state/editorStore.ts` (add grid mode state)

**User Experience**:
- Toggle button should be easily accessible in control panel
- Grid should be subtle but visible
- User can turn grid off when not needed
- Grid helps with professional composition placement

**Reference**: Professional photo editing apps (Photoshop, Canva, etc.) commonly include grid overlays

---

### 10. Smart Alignment Guides (Snap-to-Guide)
- **Priority**: 🟡 Medium
- **Status**: ❌ Not Implemented
- **Current State**: No snap-to-guide functionality exists

**Description**: 
Magnetic snap-to-guide functionality to assist users in achieving perfect composition, similar to alignment aids in professional design software (Figma, Adobe XD, Photoshop).

**Expected Behavior**:
- Objects snap to guide lines when dragged near them
- Visual feedback shows guide lines when snapping occurs
- Snap constraints prevent movement perpendicular to the guide line
- Dual-axis snapping when object aligns to both horizontal and vertical guides

**Implementation**:
- **Task 1**: Define Alignment Targets (Snap Points)
  - Canvas Center: Horizontal (Y-axis middle) and Vertical (X-axis middle)
  - Canvas Quarters: Horizontal and vertical lines at 25%, 50%, and 75% of canvas width/height
  - Calculate snap point coordinates based on canvas dimensions
  - Store snap points in configuration or calculate dynamically
- **Task 2**: Implement Snap Behavior and Tolerance
  - Tolerance Zone: 5-pixel radius around guide lines
  - Magnetic Snap: When object enters tolerance zone, snap to guide line
  - Constrain movement: 
    - If snapped to horizontal line, disable vertical movement
    - If snapped to vertical line, disable horizontal movement
  - Deselection: Release snap constraint when object moves >10px away from line
  - Listen to `object:moving` event on Fabric.js canvas
  - Calculate distance from object's bounding box center/edges to guide coordinates on every movement tick
- **Task 3**: Visual Feedback (Guide Lines)
  - Show guide lines only when object is actively being dragged and within tolerance zone
  - Style: Thin (1px), dashed lines with high contrast color (#FF5733 orange or #33CCFF cyan)
  - Lines disappear when user releases mouse/touch press
  - Draw guide lines using `after:render` event or custom overlay
  - Ensure guide lines don't interfere with object selection/manipulation
- **Task 4**: Intersection and Corner Logic
  - Dual-Axis Snap: Support simultaneous snapping to both horizontal and vertical guide lines
  - Intersection Highlight: Show small contrasting circle/box at intersection point when dual-axis snap occurs
  - Visual confirmation of corner alignment
  - Handle edge cases where object snaps to multiple guides

**Technical Considerations**:
- Use `object:moving` event to detect when object is being dragged
- Calculate snap distances on every movement tick for real-time feedback
- Store snap state (which guide line is active, if any) during drag operation
- Clear snap state on `object:modified` or `mouse:up`/`touch:end` events
- Guide lines should be drawn on separate layer and not interfere with object selection
- Consider performance impact of calculating snap distances on every frame
- May need to debounce or optimize snap calculations for smooth performance

**Files to Create**: 
- `src/core-logic/alignmentUtils.ts` (snap point calculations, distance calculations, snap logic)

**Files to Modify**: 
- `src/components/containers/EditorCanvasContainer.tsx` (snap logic, guide line rendering, event handlers)
- `src/config/canvasConfig.ts` (optional - snap tolerance constants, guide line styling)

**User Experience**:
- Snap should feel natural and not interfere with free-form positioning
- Visual feedback should be clear but not distracting
- Users should be able to easily break out of snap constraints
- Guide lines should appear/disappear smoothly

**Reference**: Similar to alignment guides in Figma, Adobe XD, Sketch, and other professional design tools

---

**Task**: Implement magnetic snap-to-guide functionality to assist users in achieving perfect composition, similar to alignment aids in design software.

**Expected Behavior**:
- Objects snap to guide lines when dragged near them
- Visual feedback shows guide lines when snapping occurs
- Snap constraints prevent movement perpendicular to the guide line
- Dual-axis snapping when object aligns to both horizontal and vertical guides

**Implementation**:
- **Task 1**: Define Alignment Targets (Snap Points)
  - Canvas Center: Horizontal (Y-axis middle) and Vertical (X-axis middle)
  - Canvas Quarters: Horizontal and vertical lines at 25%, 50%, and 75% of canvas width/height
  - Calculate snap point coordinates based on canvas dimensions
- **Task 2**: Implement Snap Behavior and Tolerance
  - Tolerance Zone: 5-pixel radius around guide lines
  - Magnetic Snap: When object enters tolerance zone, snap to guide line
  - Constrain movement: If snapped to horizontal line, disable vertical movement; if snapped to vertical line, disable horizontal movement
  - Deselection: Release snap constraint when object moves >10px away from line
  - Listen to `object:moving` event on Fabric.js canvas
  - Calculate distance from object's bounding box center/edges to guide coordinates
- **Task 3**: Visual Feedback (Guide Lines)
  - Show guide lines only when object is actively being dragged and within tolerance zone
  - Style: Thin (1px), dashed lines with high contrast color (#FF5733 orange or #33CCFF cyan)
  - Lines disappear when user releases mouse/touch press
  - Draw guide lines using `after:render` event or custom overlay
- **Task 4**: Intersection and Corner Logic
  - Dual-Axis Snap: Support simultaneous snapping to both horizontal and vertical guide lines
  - Intersection Highlight: Show small contrasting circle/box at intersection point when dual-axis snap occurs
  - Visual confirmation of corner alignment

**Files to Modify**: 
- `src/components/containers/EditorCanvasContainer.tsx` (snap logic, guide line rendering)
- `src/core-logic/alignmentUtils.ts` (new file - snap point calculations, distance calculations)
- `src/config/canvasConfig.ts` (optional - snap tolerance constants)

**Technical Notes**:
- Use `object:moving` event to detect when object is being dragged
- Calculate snap distances on every movement tick for real-time feedback
- Store snap state (which guide line is active, if any) during drag operation
- Clear snap state on `object:modified` or `mouse:up` events
- Guide lines should be drawn on separate layer and not interfere with object selection

**Reference**: Similar to alignment guides in Figma, Adobe XD, and other design tools

---

## 📋 Implementation Priority Order

1. **Add Accessibility Features** - Important for inclusivity
2. **Performance Optimizations** - Improves user experience
3. **Create Deployment Documentation** - Essential for production
4. **Smart Alignment Guides (Snap-to-Guide)** - Professional alignment aid (complements Grid Overlay)
5. **Asset Lazy Loading** - Performance improvement
6. **Canvas Bitmapping/Caching** - Performance improvement
7. **Touch Hit-Testing Optimization** - Mobile UX improvement
8. **Seamless Gesture Transitions** - Mobile UX improvement
9. **Haptic Feedback** - Nice-to-have enhancement

---

**← [Back to Roadmap Overview](../README.md)**  
**See [High Priority](./high-priority.md)** for critical items  
**See [Future Considerations](./future.md)** for backlog

