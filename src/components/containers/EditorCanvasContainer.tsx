/**
 * Container Component - Editor Canvas
 * Manages Fabric.js canvas and syncs with Zustand store
 */

import React, { useEffect, useRef } from 'react';
import { Canvas, FabricImage, IText } from 'fabric';
import { useEditorStore } from '../../state/editorStore';

export const EditorCanvasContainer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  // Custom Gesture State
  const gestureState = useRef({
    mode: null as 'scaling' | 'rotating' | null,
    startVal: 0,
    startPos: 0,
  });

  const {
    baseImage,
    canvasWidth,
    canvasHeight,
    objects,
    setActiveObject,
    updateObject,
  } = useEditorStore();

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: '#f5f5f5',
    });

    fabricCanvasRef.current = canvas;

    // Handle object selection
    canvas.on('selection:created', (e) => {
      const selected = e.selected?.[0];
      if (selected && (selected as any).objectId) {
        setActiveObject((selected as any).objectId);
      }
    });

    canvas.on('selection:updated', (e) => {
      const selected = e.selected?.[0];
      if (selected && (selected as any).objectId) {
        setActiveObject((selected as any).objectId);
      }
    });

    canvas.on('selection:cleared', () => {
      setActiveObject(null);
    });



    // Handle object modifications
    canvas.on('object:modified', (e) => {
      const obj = e.target;
      if (obj && (obj as any).objectId) {
        updateObject((obj as any).objectId, {
          x: obj.left || 0,
          y: obj.top || 0,
          scaleX: obj.scaleX || 1,
          scaleY: obj.scaleY || 1,
          rotation: obj.angle || 0,
        });
      }
    });

    // Trackpad-friendly Gestures: Modifier + Drag
    canvas.on('mouse:down', (opt) => {
      const target = canvas.getActiveObject();
      if (!target || !opt.pointer) return;

      if (opt.e.altKey) {
        // Option + Drag = Scale
        gestureState.current = {
          mode: 'scaling',
          startVal: target.scaleX || 1,
          startPos: opt.pointer.y,
        };
        canvas.selection = false; // Disable group selection box
        target.lockMovementX = true;
        target.lockMovementY = true;
      } else if (opt.e.ctrlKey) {
        // Control + Drag = Rotate
        gestureState.current = {
          mode: 'rotating',
          startVal: target.angle || 0,
          startPos: opt.pointer.x,
        };
        canvas.selection = false;
        target.lockMovementX = true;
        target.lockMovementY = true;
      }
    });

    canvas.on('mouse:move', (opt) => {
      const target = canvas.getActiveObject();
      const state = gestureState.current;

      if (!target || !state.mode || !opt.pointer) return;

      if (state.mode === 'scaling') {
        // Drag Up/Down to Scale
        const delta = (state.startPos - opt.pointer.y) / 100; // Sensitivity
        const newScale = Math.max(0.1, state.startVal + delta);

        target.scale(newScale);
      } else if (state.mode === 'rotating') {
        // Drag Left/Right to Rotate
        const delta = (opt.pointer.x - state.startPos);
        target.rotate(state.startVal + delta);
      }

      target.setCoords();
      canvas.requestRenderAll();
    });

    canvas.on('mouse:up', () => {
      const state = gestureState.current;
      const target = canvas.getActiveObject();

      if (state.mode && target) {
        // Reset locks
        target.lockMovementX = false;
        target.lockMovementY = false;
        canvas.selection = true;

        // Sync with store
        if ((target as any).objectId) {
          updateObject((target as any).objectId, {
            scaleX: target.scaleX,
            scaleY: target.scaleY,
            rotation: target.angle,
          });
        }
      }

      gestureState.current = { mode: null, startVal: 0, startPos: 0 };
    });

    // Mobile Multi-Touch Gestures (Fabric.js native support)
    canvas.on('touch:gesture' as any, (e: any) => {
      const target = canvas.getActiveObject();
      if (!target || !e.self) return;

      e.e.preventDefault();
      e.e.stopPropagation();

      if (e.self.state === 'start') {
        // Store initial values if needed, but Fabric often handles relative changes
        // For manual handling:
        gestureState.current.startVal = target.scaleX || 1;
      }

      if (e.self.state === 'change') {
        // Handle Rotation
        if (e.self.rotation) {
          target.rotate((target.angle || 0) + e.self.rotation);
        }

        // Handle Scaling
        if (e.self.scale) {
          const newScale = (target.scaleX || 1) * e.self.scale;
          target.scale(newScale);
        }

        target.setCoords();
        canvas.requestRenderAll();
      }

      if (e.self.state === 'end') {
        // Sync with store
        if ((target as any).objectId) {
          updateObject((target as any).objectId, {
            scaleX: target.scaleX,
            scaleY: target.scaleY,
            rotation: target.angle,
          });
        }
      }
    });

    return () => {
      canvas.dispose();
      fabricCanvasRef.current = null;
    };
  }, []);

  // Update canvas dimensions
  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.setDimensions({
        width: canvasWidth,
        height: canvasHeight,
      });
    }
  }, [canvasWidth, canvasHeight]);

  // Load base image
  useEffect(() => {
    if (!fabricCanvasRef.current || !baseImage) return;

    const canvas = fabricCanvasRef.current;

    FabricImage.fromURL(baseImage.src).then((img) => {
      img.set({
        left: 0,
        top: 0,
        selectable: false,
        evented: false,
      });

      img.scaleToWidth(canvasWidth);
      img.scaleToHeight(canvasHeight);

      canvas.backgroundImage = img;
      canvas.renderAll();
    });
  }, [baseImage, canvasWidth, canvasHeight]);

  // Sync objects from store to canvas
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;

    // Clear existing objects
    canvas.getObjects().forEach((obj) => {
      canvas.remove(obj);
    });

    // Add objects from store
    objects.forEach((obj) => {
      if (obj.type === 'text') {
        const text = new IText(obj.content || '', {
          left: obj.x,
          top: obj.y,
          fontFamily: obj.fontFamily,
          fontSize: obj.fontSize,
          fill: obj.fill,
          fontWeight: obj.fontWeight,
          textAlign: obj.textAlign,
          scaleX: obj.scaleX,
          scaleY: obj.scaleY,
          angle: obj.rotation,
        });

        // Store reference to object ID
        (text as any).objectId = obj.id;

        // Handle text editing
        text.on('changed', () => {
          updateObject(obj.id, { content: text.text });
        });

        canvas.add(text);
      }
    });

    canvas.renderAll();
  }, [objects]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-200 overflow-hidden" style={{ touchAction: 'none' }}>
      <div className="shadow-2xl">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

// Export canvas function for external use
export const getCanvasDataURL = (format: 'png' | 'jpeg' = 'png'): string | null => {
  const canvas = document.querySelector('canvas');
  if (!canvas) return null;

  return canvas.toDataURL(`image/${format}`);
};
