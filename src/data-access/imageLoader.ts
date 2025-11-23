/**
 * Data Access Layer - 100% Portable
 * Asset loading and management abstraction
 */

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  name: string;
}

/**
 * Loads an image file and extracts metadata
 * Web implementation using File API
 * @param file - File object from input
 * @returns Promise resolving to ImageAsset
 */
export async function loadImageAsset(file: File): Promise<ImageAsset> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const src = e.target?.result as string;

      // Create temporary image to get dimensions
      const img = new Image();

      img.onload = () => {
        resolve({
          src,
          width: img.width,
          height: img.height,
          name: file.name,
        });
      };

      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };

      img.src = src;
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Validates if a file is a supported image format
 * @param file - File to validate
 * @returns True if file is a valid image
 */
export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
}

/**
 * Gets maximum canvas dimensions based on image size
 * @param imageWidth - Original image width
 * @param imageHeight - Original image height
 * @param maxWidth - Maximum allowed width
 * @param maxHeight - Maximum allowed height
 * @returns Scaled dimensions maintaining aspect ratio
 */
export function getScaledDimensions(
  imageWidth: number,
  imageHeight: number,
  maxWidth: number = 1200,
  maxHeight: number = 800
): { width: number; height: number } {
  const aspectRatio = imageWidth / imageHeight;

  let width = imageWidth;
  let height = imageHeight;

  // Scale down if too large
  if (width > maxWidth) {
    width = maxWidth;
    height = width / aspectRatio;
  }

  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspectRatio;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
}
