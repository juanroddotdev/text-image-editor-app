/**
 * State Management - 95% Portable
 * Zustand store for application state
 */

import { create } from 'zustand';
import type { CanvasObject } from '../core-logic/canvasUtils';
import { generateObjectId } from '../core-logic/canvasUtils';
import { getDefaultTextBoxData } from '../core-logic/textUtils';
import { getScaledDimensions } from '../data-access/imageLoader';

interface BaseImage {
  src: string;
  width: number;
  height: number;
}

interface EditorState {
  // Canvas state
  baseImage: BaseImage | null;
  canvasWidth: number;
  canvasHeight: number;

  // Objects state
  objects: CanvasObject[];
  activeObjectId: string | null;

  // Delete zone state
  isDeleteZoneActive: boolean;

  // Actions
  setBaseImage: (image: BaseImage) => void;
  setCanvasDimensions: (width: number, height: number) => void;
  addTextObject: () => void;
  updateObject: (id: string, updates: Partial<CanvasObject>) => void;
  deleteObject: (id: string) => void;
  setActiveObject: (id: string | null) => void;
  setDeleteZoneActive: (active: boolean) => void;
  clearCanvas: () => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  // Initial state
  baseImage: null,
  canvasWidth: 800,
  canvasHeight: 600,
  objects: [],
  activeObjectId: null,
  isDeleteZoneActive: false,

  // Actions
  setBaseImage: (image) => {
    // Scale canvas to fit within mobile container (430px max width)
    // and reasonable height (700px max) while maintaining aspect ratio
    const scaledDimensions = getScaledDimensions(
      image.width,
      image.height,
      430,  // Max width for mobile container
      700   // Max height to fit in viewport
    );

    set({
      baseImage: image,
      canvasWidth: scaledDimensions.width,
      canvasHeight: scaledDimensions.height,
      objects: [], // Clear objects when new image is loaded
      activeObjectId: null,
    });
  },

  setCanvasDimensions: (width, height) => {
    set({ canvasWidth: width, canvasHeight: height });
  },

  addTextObject: () => {
    const defaultData = getDefaultTextBoxData();
    const { canvasWidth, canvasHeight } = get();

    const newObject: CanvasObject = {
      id: generateObjectId(),
      type: 'text',
      x: canvasWidth / 2, // Horizontally centered
      y: canvasHeight * 0.35, // 65% from bottom (35% from top)
      width: 200,
      height: 50,
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      ...defaultData,
    };

    set((state) => ({
      objects: [...state.objects, newObject],
      activeObjectId: newObject.id,
    }));
  },

  updateObject: (id, updates) => {
    set((state) => ({
      objects: state.objects.map((obj) =>
        obj.id === id ? { ...obj, ...updates } : obj
      ),
    }));
  },

  deleteObject: (id) => {
    set((state) => ({
      objects: state.objects.filter((obj) => obj.id !== id),
      activeObjectId: state.activeObjectId === id ? null : state.activeObjectId,
    }));
  },

  setActiveObject: (id) => {
    set({ activeObjectId: id });
  },

  setDeleteZoneActive: (active) => {
    set({ isDeleteZoneActive: active });
  },


  clearCanvas: () => {
    set({
      baseImage: null,
      objects: [],
      activeObjectId: null,
      canvasWidth: 800,
      canvasHeight: 600,
      isDeleteZoneActive: false,
    });
  },
}));
