/**
 * Container Component - Text Controls
 * Bridges UI controls to Zustand store
 */

import React from 'react';
import { useEditorStore } from '../../state/editorStore';
import { ColorPicker } from '../presentational/ColorPicker';
import { FontPicker } from '../presentational/FontPicker';
import { FontSizeSlider } from '../presentational/FontSizeSlider';
import { Button } from '../presentational/Button';
import { validateFontSize } from '../../core-logic/textUtils';

export const TextControlsContainer: React.FC = () => {
  const { objects, activeObjectId, updateObject, deleteObject } = useEditorStore();

  const activeObject = objects.find((obj) => obj.id === activeObjectId);

  if (!activeObject || activeObject.type !== 'text') {
    return (
      <div className="bg-neutral-100 rounded-lg p-4 text-center text-neutral-500">
        Select a text object to edit
      </div>
    );
  }

  const handleColorChange = (color: string) => {
    updateObject(activeObjectId!, { fill: color });
  };

  const handleFontChange = (font: string) => {
    updateObject(activeObjectId!, { fontFamily: font });
  };

  const handleFontSizeChange = (size: number) => {
    const validSize = validateFontSize(size);
    updateObject(activeObjectId!, { fontSize: validSize });
  };

  const handleDelete = () => {
    deleteObject(activeObjectId!);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <h3 className="text-lg font-semibold text-neutral-800 mb-4">Text Properties</h3>

      <ColorPicker
        label="Color"
        value={activeObject.fill || '#000000'}
        onChange={handleColorChange}
      />

      <FontPicker
        value={activeObject.fontFamily || 'Inter'}
        onChange={handleFontChange}
      />

      <FontSizeSlider
        value={activeObject.fontSize || 30}
        onChange={handleFontSizeChange}
      />

      <div className="pt-4 border-t border-neutral-200">
        <Button variant="danger" onClick={handleDelete} className="w-full">
          Delete Text
        </Button>
      </div>
    </div>
  );
};
