/**
 * Container Component - Editor Canvas
 * Manages Fabric.js canvas and syncs with Zustand store
 */

import React, { useEffect, useRef } from 'react';
import { Canvas, FabricImage, IText } from 'fabric';
import { useEditorStore } from '../../state/editorStore';
import { applySelectionStyle } from '../../config/canvasConfig';

export const EditorCanvasContainer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);

  // Custom Gesture State
  const gestureState = useRef({
    mode: null as 'scaling' | 'rotating' | null,
    startVal: 0,
    startPos: 0,
  });

  // Custom Multi-Touch State
  const touchState = useRef({
    distance: 0,
    angle: 0,
    scale: 1,
    rotation: 0,
    isGesturing: false,
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

    // Apply custom selection style
    applySelectionStyle(canvas);

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

    // --- Custom Multi-Touch Handler (Seamless Drag -> Gesture) ---

    const getDistance = (t1: Touch, t2: Touch) => {
      const dx = t1.clientX - t2.clientX;
      const dy = t1.clientY - t2.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getAngle = (t1: Touch, t2: Touch) => {
      const dx = t1.clientX - t2.clientX;
      const dy = t1.clientY - t2.clientY;
      return Math.atan2(dy, dx) * (180 / Math.PI);
    };

    // Attach raw listeners to the upper canvas (interaction layer)
    const setupTouchListeners = () => {
      const upperCanvas = canvas.upperCanvasEl;
      if (!upperCanvas) return;

      const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 2) {
          // Gesture started
          touchState.current.isGesturing = true;
          touchState.current.distance = getDistance(e.touches[0], e.touches[1]);
          touchState.current.angle = getAngle(e.touches[0], e.touches[1]);

          const target = canvas.getActiveObject();
          if (target) {
            touchState.current.scale = target.scaleX || 1;
            touchState.current.rotation = target.angle || 0;

            // Lock movement during gesture to prevent jittery dragging
            target.lockMovementX = true;
            target.lockMovementY = true;
          }
        }
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 2 && touchState.current.isGesturing) {
          e.preventDefault(); // Prevent browser zoom

          const target = canvas.getActiveObject();
          if (!target) return;

          // Calculate new values
          const newDist = getDistance(e.touches[0], e.touches[1]);
          const newAngle = getAngle(e.touches[0], e.touches[1]);

          // Apply Scale
          const scaleRatio = newDist / touchState.current.distance;
          const newScale = touchState.current.scale * scaleRatio;
          target.scale(newScale);

          // Apply Rotation
          const rotationDiff = newAngle - touchState.current.angle;
          target.rotate(touchState.current.rotation + rotationDiff);

          target.setCoords();
          canvas.requestRenderAll();
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        if (e.touches.length < 2 && touchState.current.isGesturing) {
          // Gesture ended
          touchState.current.isGesturing = false;

          const target = canvas.getActiveObject();
          if (target) {
            // Unlock movement
            target.lockMovementX = false;
            target.lockMovementY = false;

            // Sync with store
            if ((target as any).objectId) {
              updateObject((target as any).objectId, {
                scaleX: target.scaleX,
                scaleY: target.scaleY,
                rotation: target.angle,
              });
            }
          }
        }
      };

      upperCanvas.addEventListener('touchstart', handleTouchStart, { passive: false });
      upperCanvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      upperCanvas.addEventListener('touchend', handleTouchEnd);

      return () => {
        upperCanvas.removeEventListener('touchstart', handleTouchStart);
        upperCanvas.removeEventListener('touchmove', handleTouchMove);
        upperCanvas.removeEventListener('touchend', handleTouchEnd);
      };
    };

    const cleanupTouch = setupTouchListeners();

    return () => {
      if (cleanupTouch) cleanupTouch();
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
    const fabricObjects = canvas.getObjects();

    // 1. Handle Deletions: Remove objects that are no longer in the store
    const storeIds = new Set(objects.map(o => o.id));
    fabricObjects.forEach((obj) => {
      if ((obj as any).objectId && !storeIds.has((obj as any).objectId)) {
        canvas.remove(obj);
      }
    });

    // 2. Handle Updates & Creations
    objects.forEach((storeObj) => {
      let existingObj = fabricObjects.find(o => (o as any).objectId === storeObj.id) as IText;

      if (existingObj) {
        // Update existing object
        // prevent updating content if currently editing to avoid cursor jumps
        if (!existingObj.isEditing) {
          if (existingObj.text !== storeObj.content) existingObj.set('text', storeObj.content);
        }

        // Update other properties if changed
        if (existingObj.left !== storeObj.x) existingObj.set('left', storeObj.x);
        if (existingObj.top !== storeObj.y) existingObj.set('top', storeObj.y);
        if (existingObj.scaleX !== storeObj.scaleX) existingObj.set('scaleX', storeObj.scaleX);
        if (existingObj.scaleY !== storeObj.scaleY) existingObj.set('scaleY', storeObj.scaleY);
        if (existingObj.angle !== storeObj.rotation) existingObj.set('angle', storeObj.rotation);

        // Style updates
        if (existingObj.fontFamily !== storeObj.fontFamily) existingObj.set('fontFamily', storeObj.fontFamily);
        if (existingObj.fontSize !== storeObj.fontSize) existingObj.set('fontSize', storeObj.fontSize);
        if (existingObj.fill !== storeObj.fill) existingObj.set('fill', storeObj.fill);
        if (existingObj.fontWeight !== storeObj.fontWeight) existingObj.set('fontWeight', storeObj.fontWeight);
        if (existingObj.textAlign !== storeObj.textAlign) existingObj.set('textAlign', storeObj.textAlign);

        existingObj.setCoords();
      } else {
        // Create new object
        if (storeObj.type === 'text') {
          const text = new IText(storeObj.content || '', {
            left: storeObj.x,
            top: storeObj.y,
            fontFamily: storeObj.fontFamily,
            fontSize: storeObj.fontSize,
            fill: storeObj.fill,
            fontWeight: storeObj.fontWeight,
            textAlign: storeObj.textAlign,
            scaleX: storeObj.scaleX,
            scaleY: storeObj.scaleY,
            angle: storeObj.rotation,
          });

          // Store reference to object ID
          (text as any).objectId = storeObj.id;

          // Handle text editing
          text.on('changed', () => {
            updateObject(storeObj.id, { content: text.text });
          });

          // Auto-select all text on edit (Mobile UX)
          text.on('editing:entered', () => {
            text.selectAll();
          });

          canvas.add(text);
        }
      }
    });

    // Apply selection style after all objects are added
    applySelectionStyle(canvas);

    canvas.requestRenderAll();
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
