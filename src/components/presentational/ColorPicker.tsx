/**
 * Presentational Component - Color Picker
 * Simple color input with label
 */

import React from 'react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-neutral-700 min-w-[60px]">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded-lg border-2 border-neutral-300 cursor-pointer"
        />
        <span className="text-sm font-mono text-neutral-600">{value}</span>
      </div>
    </div>
  );
};
