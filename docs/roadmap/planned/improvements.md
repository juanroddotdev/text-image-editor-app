# Improvements & Enhancements

**Status**: Future Improvements  
**Last Updated**: January 2025

---

## Overview

This document tracks improvements and enhancements to existing features. These are not new features, but rather refinements and optimizations to make existing functionality better.

**Note**: These items are lower priority than new features, but represent important UX and functionality improvements that should be addressed when time permits.

---

## Text Box Improvements

### 1. Center Text Box on Screen While Typing
- **Priority**: 🟡 Medium
- **Status**: 📋 Planned
- **Category**: UX Enhancement

**Current Behavior**: 
- Text box stays in its current position while user is typing
- On mobile, this can cause the text box to be partially or fully hidden behind the keyboard
- User may need to manually scroll or adjust view to see what they're typing

**Desired Behavior**:
- When user starts typing (enters edit mode), text box should automatically center on screen
- This ensures the text box and keyboard are both visible
- When user finishes typing (exits edit mode), text box should return to its original position
- Smooth animation/transition between positions

**Implementation Considerations**:
- Detect when text enters edit mode (`editing:entered` event)
- Calculate center position on screen (accounting for keyboard height if possible)
- Temporarily move text box to center
- Store original position
- On exit (`editing:exited` event), restore original position
- Consider smooth animation for better UX
- May need to account for mobile keyboard height to ensure text box is visible above keyboard

**Files to Modify**:
- `src/components/containers/EditorCanvasContainer.tsx` (edit mode detection, position management)
- May need to add state to track original position vs. editing position

**Related**: Mobile UX - Virtual Keyboard Handling (see [High Priority](./high-priority.md))

---

### 2. Text Wrapping Improvements
- **Priority**: 🟡 Medium
- **Status**: 📋 Planned
- **Category**: Functionality Enhancement

**Current Behavior**:
- Text wraps at padding edge (20px from each side)
- Text box sizes to content when text is short
- Text wraps when it reaches max width

**Areas for Improvement**:
- **Better wrapping algorithm**: Ensure text wraps at word boundaries, not mid-word
- **Hyphenation**: Consider adding hyphenation for long words that don't fit
- **Line height control**: Allow users to adjust line spacing for better readability
- **Paragraph spacing**: Add spacing between paragraphs when text wraps to multiple lines
- **Visual feedback**: Show where text will wrap before user types (optional guide line)
- **Smart width calculation**: Better handling of text width calculation to prevent unnecessary wrapping

**Implementation Considerations**:
- Fabric.js `splitByGrapheme` handles basic wrapping, but may need custom logic for word boundaries
- May need to override Fabric.js text rendering for better control
- Consider adding line height and paragraph spacing properties to text objects
- Test with various font sizes and text lengths

**Files to Modify**:
- `src/components/containers/EditorCanvasContainer.tsx` (wrapping logic, text rendering)
- `src/core-logic/textUtils.ts` (text processing utilities)
- May need custom text rendering for advanced features

**Related**: Text Box Improvements (this document)

---

## Other Improvements

_Additional improvements will be added here as they are identified._

---

**← [Back to Roadmap Overview](../README.md)**  
**See [High Priority](./high-priority.md) for critical features**  
**See [Medium Priority](./medium-priority.md) for planned enhancements**  
**See [Future Considerations](./future.md) for new feature ideas**

