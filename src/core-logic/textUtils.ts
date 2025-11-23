/**
 * Core Logic Layer - 100% Portable
 * Text object configuration and validation
 */

import { theme } from '../styles/theme';

export interface TextBoxData {
  content: string;
  fontFamily: string;
  fontSize: number;
  fill: string;
  fontWeight: string;
  textAlign: string;
}

/**
 * Returns default configuration for a new text box
 * @returns Default text box data object
 */
export function getDefaultTextBoxData(): TextBoxData {
  return {
    content: 'Your Text Here',
    fontFamily: theme.fonts.families[0], // 'Inter'
    fontSize: theme.fonts.sizes['3xl'], // 30
    fill: theme.colors.text.default, // '#000000'
    fontWeight: 'normal',
    textAlign: 'left',
  };
}

/**
 * Validates font size is within acceptable bounds
 * @param size - Font size to validate
 * @returns Clamped font size between min and max
 */
export function validateFontSize(size: number): number {
  const MIN_FONT_SIZE = 8;
  const MAX_FONT_SIZE = 200;

  return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Math.round(size)));
}

/**
 * Validates font family is in the allowed list
 * @param fontFamily - Font family to validate
 * @returns Valid font family or default
 */
export function validateFontFamily(fontFamily: string): string {
  const validFonts = theme.fonts.families;

  if (validFonts.includes(fontFamily as any)) {
    return fontFamily;
  }

  return validFonts[0]; // Return default font
}
