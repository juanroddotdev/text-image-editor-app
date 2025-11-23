/**
 * Presentational Component - Font Size Slider
 * Slider for adjusting font size
 */

import React from 'react';

interface FontSizeSliderProps {
  value: number;
  onChange: (size: number) => void;
  min?: number;
  max?: number;
}

export const FontSizeSlider: React.FC<FontSizeSliderProps> = ({
  value,
  onChange,
  min = 8,
  max = 200,
}) => {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-neutral-700 min-w-[60px]">
        Size
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
      />
      <span className="text-sm font-medium text-neutral-700 min-w-[40px] text-right">
        {value}px
      </span>
    </div>
  );
};
