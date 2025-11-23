/**
 * Presentational Component - Font Picker
 * Dropdown for font family selection
 */

import React from 'react';
import { theme } from '../../styles/theme';

interface FontPickerProps {
  value: string;
  onChange: (font: string) => void;
}

export const FontPicker: React.FC<FontPickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-medium text-neutral-700 min-w-[60px]">
        Font
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 border-2 border-neutral-300 rounded-lg focus:outline-none focus:border-primary-500"
        style={{ fontFamily: value }}
      >
        {theme.fonts.families.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </select>
    </div>
  );
};
