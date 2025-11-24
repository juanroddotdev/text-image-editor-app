# Future Considerations

**Status**: Backlog & Ideas  
**Last Updated**: November 23, 2025

---

## Overview

These are future features and enhancements that are not currently prioritized but represent potential growth areas for the application. They are organized by category for easy reference.

---

## 🎨 Creative Tools Expansion

### 1. Advanced Text Effects
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- Stroke/Outline support for text
- Drop shadows with configurable blur/offset
- Background highlight colors for text
- Text gradients
- 3D text effects

**Estimated Effort**: Medium-High

---

### 2. Visual Layer Management Panel
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- Visual layer panel/drawer (similar to design tools like Figma, Canva)
- Layer list showing all objects (text, images, shapes) with:
  - Layer thumbnails/previews
  - Layer type icons (T for text, image thumbnail for images)
  - Layer names/labels (truncated text content for text layers)
- Drag-and-drop reordering of layers
- Layer selection from panel (selects object on canvas)
- Layer visibility toggle (eye icon)
- Layer locking (lock icon)
- "Bring to Front" / "Send to Back" controls within panel
- Panel toggle button (layers icon)
- Mobile-friendly swipeable panel

**UI Design**:
- Panel slides in from side or bottom
- Each layer entry shows:
  - Icon/thumbnail on left
  - Layer name/label in center
  - Visibility/lock controls on right
- Active/selected layer highlighted
- Smooth animations for reordering

**Estimated Effort**: Medium-High

**Note**: This provides a more intuitive way to manage layer stacking compared to the automatic "bring to front on selection" behavior. Users can see all layers at once and reorder them visually.

---

### 3. Sticker Library
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- Drag-and-drop asset system
- Emoji library
- Sticker packs
- Custom sticker upload

**Estimated Effort**: High

---

### 4. Image Filters
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- Grayscale filter
- Sepia filter
- Brightness/Contrast adjustment
- Saturation adjustment
- Blur effects

**Estimated Effort**: Medium

---

### 5. Custom Shapes
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- Rectangles
- Circles
- Arrows
- Lines
- Custom shape drawing

**Estimated Effort**: High

---

## 💾 Project Management

### 6. Undo/Redo Functionality
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- History stack for all canvas operations
- Undo/redo keyboard shortcuts
- History panel (optional)
- Max history limit

**Estimated Effort**: Medium

---

### 7. Save/Load Projects
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- Save projects to localStorage
- Load saved projects
- Project naming
- Multiple project support
- Export project as JSON

**Estimated Effort**: Low-Medium

---

### 8. Cloud Sync
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- Save drafts to Firebase
- Sync across devices
- User authentication
- Project sharing (optional)

**Estimated Effort**: High

---

## 📱 Mobile App Conversion

### 9. React Native Conversion
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low (Future Phase)

**Implementation**:
- Rewrite UI components for React Native
- Replace Fabric.js with React Native Skia
- Implement native image picker
- Implement native export (CameraRoll)
- iOS App Store submission
- Android Play Store submission

**Estimated Effort**: Very High

**Reference**: See [Architecture Guide](../../ARCHITECTURE.md) for conversion strategy

---

### 10. Native Mobile Features
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- Camera integration
- Native share sheet
- Push notifications
- In-app purchases (premium fonts)
- Biometric authentication

**Estimated Effort**: High

---

## 🎯 Advanced Features

### 11. Templates
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- Pre-set layouts for Instagram Stories
- Pre-set layouts for Instagram Posts
- Pre-set layouts for TikTok
- Custom template creation
- Template marketplace (future)

**Estimated Effort**: Medium

---

### 12. Multiple Pages/Slides
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- Multi-page canvas
- Page navigation
- Page duplication
- Page reordering

**Estimated Effort**: High

---

### 13. Collaboration Features
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- Real-time multiplayer editing
- Share projects with others
- Comments/annotations
- Version history

**Estimated Effort**: Very High

---

### 14. Analytics & Monitoring
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- Usage analytics
- Error tracking
- Performance monitoring
- User behavior tracking

**Estimated Effort**: Medium

---

## 💰 Monetization (Future)

### 15. Premium Features
- **Status**: ⏸️ Planned
- **Priority**: 🔵 Low

**Features**:
- Premium font packs ($2.99/month)
- Advanced filters ($4.99/month)
- Watermark removal ($1.99 one-time)
- Unlimited projects
- Priority support

**Estimated Effort**: High

---

## 📋 Notes

- These items are not currently prioritized
- Implementation order may change based on user feedback
- Some items may be combined or split as development progresses
- Estimated effort is rough and may vary significantly

---

**← [Back to Roadmap Overview](../README.md)**  
**See [High Priority](./high-priority.md)** for critical items  
**See [Medium Priority](./medium-priority.md)** for enhancements

