/**
 * Canvas Configuration
 * Defines visual styles for canvas controls and selection
 */

import { Canvas } from 'fabric';

export type SelectionStyle = 'default' | 'mobile';
export type ControlVisibility = 'minimal' | 'full';

export interface SelectionStyleConfig {
  borderColor: string;
  cornerColor: string;
  cornerSize: number;
  cornerStyle: 'rect' | 'circle';
  borderScaleFactor: number;
  transparentCorners: boolean;
  cornerStrokeColor: string;
  borderDashArray: number[] | null;
}

export const SELECTION_STYLES: Record<SelectionStyle, SelectionStyleConfig> = {
  default: {
    borderColor: 'rgba(102, 153, 255, 0.75)',
    cornerColor: 'rgba(102, 153, 255, 0.5)',
    cornerSize: 13,
    cornerStyle: 'rect',
    borderScaleFactor: 1,
    transparentCorners: false,
    cornerStrokeColor: 'rgba(102, 153, 255, 1)',
    borderDashArray: null,
  },
  mobile: {
    borderColor: '#00D9FF', // Bright cyan
    cornerColor: '#00D9FF',
    cornerSize: 24, // Larger for touch
    cornerStyle: 'circle',
    borderScaleFactor: 2, // Thicker border
    transparentCorners: false,
    cornerStrokeColor: '#00D9FF',
    borderDashArray: null,
  },
};

// Active selection style
export const ACTIVE_SELECTION_STYLE: SelectionStyle = 'mobile';

// Control visibility mode
// 'minimal': 4 corners + rotate (cleaner, mobile-friendly)
// 'full': 4 corners + 4 middle handles + rotate (more control options)
export const ACTIVE_CONTROL_VISIBILITY: ControlVisibility = 'minimal';

/**
 * Apply selection style to a Fabric.js canvas
 */
export function applySelectionStyle(canvas: Canvas, style: SelectionStyle = ACTIVE_SELECTION_STYLE) {
  const config = SELECTION_STYLES[style];

  console.log('🎨 Applying selection style:', style, config);

  // Apply to canvas defaults
  canvas.set({
    selectionColor: 'rgba(0, 217, 255, 0.1)',
    selectionBorderColor: config.borderColor,
    selectionLineWidth: config.borderScaleFactor,
  });

  // Set global control defaults for Fabric.js
  const controlDefaults = {
    borderColor: config.borderColor,
    cornerColor: config.cornerColor,
    cornerSize: config.cornerSize,
    borderScaleFactor: config.borderScaleFactor,
    transparentCorners: config.transparentCorners,
    cornerStrokeColor: config.cornerStrokeColor,
    padding: 0,
  };

  // Custom render for rotation control (semi-circle with arrows)
  const renderRotateControl = (
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    styleOverride: any,
    fabricObject: any
  ) => {
    console.log('🔄 Rendering rotate control at:', left, top);
    const size = config.cornerSize;
    const color = config.cornerColor;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;

    // Draw semi-circle arc (top half)
    ctx.beginPath();
    ctx.arc(left, top, size / 2, Math.PI, 0, false); // Semi-circle from π to 0
    ctx.stroke();

    // Draw left arrow
    const arrowSize = 6;
    ctx.beginPath();
    ctx.moveTo(left - size / 2, top);
    ctx.lineTo(left - size / 2 - arrowSize, top - arrowSize);
    ctx.lineTo(left - size / 2 - arrowSize, top + arrowSize);
    ctx.closePath();
    ctx.fill();

    // Draw right arrow
    ctx.beginPath();
    ctx.moveTo(left + size / 2, top);
    ctx.lineTo(left + size / 2 + arrowSize, top - arrowSize);
    ctx.lineTo(left + size / 2 + arrowSize, top + arrowSize);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  // Apply to all existing objects on canvas
  const objects = canvas.getObjects();
  console.log('📦 Found', objects.length, 'objects on canvas');

  objects.forEach((obj, index) => {
    console.log(`  Object ${index}:`, obj.type, 'has controls:', !!obj.controls);
    obj.set(controlDefaults);

    // For mobile style, customize control rendering
    if (style === 'mobile' && obj.controls) {
      const controlKeys = Object.keys(obj.controls);
      console.log(`  → Customizing ${controlKeys.length} controls for object ${index}`);

      // Define which controls to show based on visibility mode
      const middleHandles = ['ml', 'mt', 'mr', 'mb']; // Middle handles (left, top, right, bottom)
      const shouldHideMiddleHandles = ACTIVE_CONTROL_VISIBILITY === 'minimal';

      controlKeys.forEach((controlKey) => {
        const control = obj.controls[controlKey];
        if (control) {
          // Hide middle handles in minimal mode
          if (shouldHideMiddleHandles && middleHandles.includes(controlKey)) {
            control.visible = false;
            console.log(`    ✗ Hiding middle handle: ${controlKey}`);
            return;
          }

          console.log(`    ✓ Setting custom render for control: ${controlKey}`);

          // Create a closure that captures the specific control key
          if (controlKey === 'mtr') {
            // Rotation control
            control.render = renderRotateControl;
          } else {
            // Corner controls - create a closure that knows its own key
            control.render = (
              ctx: CanvasRenderingContext2D,
              left: number,
              top: number,
              styleOverride: any,
              fabricObject: any
            ) => {
              const size = config.cornerSize;
              const color = config.cornerColor;

              ctx.save();
              ctx.strokeStyle = color;
              ctx.lineWidth = 3;

              // Check if THIS specific control is being actively dragged
              const activeCorner = fabricObject.__corner;
              const isThisControlActive = activeCorner === controlKey;

              if (isThisControlActive) {
                // Filled circle when THIS control is active
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(left, top, size / 2, 0, 2 * Math.PI);
                ctx.fill();
              } else {
                // Hollow circle (outline only) when inactive
                ctx.beginPath();
                ctx.arc(left, top, size / 2, 0, 2 * Math.PI);
                ctx.stroke();
              }

              ctx.restore();
            };
          }
        }
      });
    }

    obj.setCoords();
  });

  // Set as defaults for future objects
  canvas.set(controlDefaults);

  canvas.requestRenderAll();
  console.log('✅ Selection style applied and canvas re-rendered');
}
