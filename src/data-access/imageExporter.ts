/**
 * Data Access Layer - Export Abstraction
 * Platform-specific export will be injected
 */

export interface ExportOptions {
  format: 'png' | 'jpeg';
  quality?: number; // 0-1 for JPEG
  filename?: string;
}

/**
 * Export function type that will be implemented differently on web vs mobile
 * Web: Uses canvas.toDataURL() and triggers download
 * Mobile: Uses native image saving APIs
 */
export type ExportFunction = (dataUrl: string, options: ExportOptions) => Promise<void>;

/**
 * Web implementation of image export
 * @param dataUrl - Data URL from canvas
 * @param options - Export options
 */
export async function exportImageWeb(
  dataUrl: string,
  options: ExportOptions
): Promise<void> {
  const { filename = 'text-image-editor-export' } = options;

  // Create temporary anchor element
  const link = document.createElement('a');
  link.download = `${filename}.${options.format}`;
  link.href = dataUrl;

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generates a timestamp-based filename
 * @returns Filename string with timestamp
 */
export function generateExportFilename(): string {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
  return `story-${timestamp}`;
}
