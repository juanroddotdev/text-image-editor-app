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

## 📋 Implementation Priority Order

1. **Add Accessibility Features** - Important for inclusivity
2. **Performance Optimizations** - Improves user experience
3. **Create Deployment Documentation** - Essential for production
4. **Asset Lazy Loading** - Performance improvement
5. **Canvas Bitmapping/Caching** - Performance improvement
6. **Touch Hit-Testing Optimization** - Mobile UX improvement
7. **Seamless Gesture Transitions** - Mobile UX improvement
8. **Haptic Feedback** - Nice-to-have enhancement

---

**← [Back to Roadmap Overview](../README.md)**  
**See [High Priority](./high-priority.md)** for critical items  
**See [Future Considerations](./future.md)** for backlog

