/**
 * Text Alignment Controls Component
 * 
 * Note: This component is currently not used in the UI but kept for future use.
 * The alignment logic is preserved here and can be easily re-integrated.
 */

import React from 'react';
import { useEditorStore } from '../../state/editorStore';

interface TextAlignmentControlsProps {
  activeObjectId: string | null;
  activeObject: any;
  canvasWidth: number;
}

export const TextAlignmentControls: React.FC<TextAlignmentControlsProps> = ({
  activeObjectId,
  activeObject,
  canvasWidth,
}) => {
  const { updateObject } = useEditorStore();

  // Alignment handler
  // Note: Position calculation will be done in EditorCanvasContainer after we get actual text width
  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    if (activeObjectId && activeObject) {
      console.log('🔀 [Alignment Button Clicked]', {
        alignment,
        activeObjectId,
        currentTextAlign: activeObject.textAlign,
        currentX: activeObject.x,
        currentY: activeObject.y,
        textBoxWidth: activeObject.textBoxWidth,
        canvasWidth,
      });
      
      // Just update alignment - position will be calculated in EditorCanvasContainer
      // after we can measure the actual rendered text width
      updateObject(activeObjectId, { 
        textAlign: alignment,
      });
    }
  };

  if (!activeObjectId || !activeObject || activeObject.type !== 'text') {
    return null;
  }

  const currentAlign = activeObject.textAlign || 'left';

  return (
    <div className="flex flex-col gap-2">
      {/* Text Alignment Buttons */}
      <div className="flex gap-2">
        {/* Left Align */}
        <button
          onClick={() => handleAlignmentChange('left')}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all shadow-lg ${
            currentAlign === 'left'
              ? 'bg-cyan-500/80 backdrop-blur-md border-2 border-cyan-300'
              : 'bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20'
          }`}
          aria-label="Align text left"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h8" />
          </svg>
        </button>

        {/* Center Align */}
        <button
          onClick={() => handleAlignmentChange('center')}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all shadow-lg ${
            currentAlign === 'center'
              ? 'bg-cyan-500/80 backdrop-blur-md border-2 border-cyan-300'
              : 'bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20'
          }`}
          aria-label="Align text center"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M8 12h8M4 18h16" />
          </svg>
        </button>

        {/* Right Align */}
        <button
          onClick={() => handleAlignmentChange('right')}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all shadow-lg ${
            currentAlign === 'right'
              ? 'bg-cyan-500/80 backdrop-blur-md border-2 border-cyan-300'
              : 'bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20'
          }`}
          aria-label="Align text right"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

