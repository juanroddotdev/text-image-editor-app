/**
 * Core Logic Layer - 100% Portable
 * Canvas state serialization and management
 */

export interface CanvasObject {
  id: string;
  type: 'text' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  scaleX: number;
  scaleY: number;
  // Text-specific properties
  content?: string;
  fontFamily?: string;
  fontSize?: number;
  fill?: string;
  fontWeight?: string;
  textAlign?: string;
  textBoxWidth?: number; // Fixed width for text box (enables wrapping and alignment)
  // Image-specific properties
  src?: string;
}

export interface CanvasState {
  baseImage: {
    src: string;
    width: number;
    height: number;
  } | null;
  objects: CanvasObject[];
  canvasWidth: number;
  canvasHeight: number;
}

/**
 * Serializes canvas state to a JSON-friendly format
 * @param state - Canvas state to serialize
 * @returns JSON string representation
 */
export function serializeCanvas(state: CanvasState): string {
  return JSON.stringify(state, null, 2);
}

/**
 * Deserializes canvas state from JSON
 * @param json - JSON string to parse
 * @returns Canvas state object
 */
export function deserializeCanvas(json: string): CanvasState {
  try {
    return JSON.parse(json);
  } catch (error) {
    console.error('Failed to deserialize canvas state:', error);
    return {
      baseImage: null,
      objects: [],
      canvasWidth: 800,
      canvasHeight: 600,
    };
  }
}

/**
 * Generates a unique ID for canvas objects
 * @returns Unique identifier string
 */
export function generateObjectId(): string {
  return `obj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
