# Selection Style Configuration

This document explains how to switch between different selection handle styles in the canvas.

## Available Styles

### 1. Default Style
- Standard Fabric.js appearance
- Blue rectangular handles
- Thinner border
- Smaller corner handles

### 2. Mobile Style (Currently Active)
- **Bright cyan color** (#00D9FF)
- **Large circular handles** (24px) - optimized for touch
- **Thicker border** (2x scale)
- High visibility against any background

## How to Switch Styles

Open `src/config/canvasConfig.ts` and change the `ACTIVE_SELECTION_STYLE` constant:

```typescript
// For mobile-friendly cyan style (current)
export const ACTIVE_SELECTION_STYLE: SelectionStyle = 'mobile';

// For standard Fabric.js style
export const ACTIVE_SELECTION_STYLE: SelectionStyle = 'default';
```

Save the file and the dev server will automatically reload with the new style.

## Control Visibility

You can also control how many resize handles are shown:

```typescript
// For minimal controls (4 corners + rotate only) - DEFAULT
export const ACTIVE_CONTROL_VISIBILITY: ControlVisibility = 'minimal';

// For full controls (4 corners + 4 middle handles + rotate)
export const ACTIVE_CONTROL_VISIBILITY: ControlVisibility = 'full';
```

**Minimal mode** (default):
- Shows only 4 corner handles + rotation handle
- Cleaner interface, better for mobile/touch
- Less chance of accidental touches

**Full mode**:
- Shows all 8 resize handles + rotation handle
- More precise control over object dimensions
- Traditional desktop editing experience

## Customizing Styles

You can customize the appearance by editing the `SELECTION_STYLES` object in `canvasConfig.ts`:

```typescript
export const SELECTION_STYLES: Record<SelectionStyle, SelectionStyleConfig> = {
  mobile: {
    borderColor: '#00D9FF',      // Border and handle color
    cornerColor: '#00D9FF',      // Corner fill color
    cornerSize: 24,              // Size of corner handles (px)
    cornerStyle: 'circle',       // 'circle' or 'rect'
    borderScaleFactor: 2,        // Border thickness multiplier
    transparentCorners: false,   // Solid or transparent handles
    cornerStrokeColor: '#00D9FF', // Handle outline color
    borderDashArray: null,       // Solid or dashed border
  },
};
```

## Adding New Styles

To add a new custom style:

1. Add a new key to the `SelectionStyle` type
2. Add the configuration to `SELECTION_STYLES`
3. Update `ACTIVE_SELECTION_STYLE` to use your new style
