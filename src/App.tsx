/**
 * Main Application Component
 */

import React, { useRef, useEffect, useState } from 'react';
import { useEditorStore } from './state/editorStore';
import { EditorCanvasContainer, getCanvasDataURL } from './components/containers/EditorCanvasContainer';
import { loadImageAsset, isValidImageFile } from './data-access/imageLoader';
import { exportImageWeb, generateExportFilename } from './data-access/imageExporter';
import { theme } from './styles/theme';
import type { CanvasObject } from './core-logic/canvasUtils';

// Color Picker Modal Component with swipe-to-close
interface ColorPickerModalProps {
  activeObject: CanvasObject;
  onColorChange: (color: string) => void;
  onClose: () => void;
}

const ColorPickerModal: React.FC<ColorPickerModalProps> = ({ activeObject, onColorChange, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY;
    
    // Only allow dragging down (positive diff)
    if (diff > 0) {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    // If dragged down more than 100px, close the modal
    if (dragOffset > 100) {
      onClose();
    }
    setDragOffset(0);
    setTouchStartY(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end"
      onClick={onClose}
    >
      {/* Backdrop - Lighter for better visibility */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Modal Content - Semi-transparent */}
      <div 
        ref={modalRef}
        className="relative w-full rounded-t-3xl shadow-2xl p-6 max-h-[60vh] overflow-y-auto"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          transform: `translateY(${dragOffset}px)`,
          transition: dragOffset === 0 ? 'transform 0.2s ease-out' : 'none',
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-neutral-800">Choose Color</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100"
          >
            <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drag indicator */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1 bg-neutral-300 rounded-full" />
        </div>

        {/* Color Swatches */}
        <div className="grid grid-cols-6 gap-4 mb-6">
          {/* Preset Colors */}
          {Object.entries(theme.colors.text).map(([name, color]) => (
            <button
              key={name}
              onClick={() => onColorChange(color)}
              className="w-12 h-12 rounded-full border-2 border-neutral-300 hover:scale-110 transition-transform shadow-md"
              style={{ backgroundColor: color }}
              aria-label={`Select color ${name}`}
            />
          ))}
        </div>

        {/* Custom Color Picker */}
        <div className="border-t border-neutral-200 pt-6">
          <label className="block text-sm font-medium text-neutral-700 mb-3">
            Custom Color
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={activeObject.fill || '#000000'}
              onChange={(e) => onColorChange(e.target.value)}
              className="w-16 h-16 rounded-lg border-2 border-neutral-300 cursor-pointer"
            />
            <div className="flex-1">
              <input
                type="text"
                value={activeObject.fill || '#000000'}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-full px-3 py-2 border-2 border-neutral-300 rounded-lg font-mono text-sm"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Font Picker Modal Component with swipe-to-close
interface FontPickerModalProps {
  activeObject: CanvasObject;
  onFontChange: (fontFamily: string) => void;
  onClose: () => void;
}

const FontPickerModal: React.FC<FontPickerModalProps> = ({ activeObject, onFontChange, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - touchStartY;
    
    // Only allow dragging down (positive diff)
    if (diff > 0) {
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = () => {
    // If dragged down more than 100px, close the modal
    if (dragOffset > 100) {
      onClose();
    }
    setDragOffset(0);
    setTouchStartY(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-end"
      onClick={onClose}
    >
      {/* Backdrop - Lighter for better visibility */}
      <div className="absolute inset-0 bg-black/20" />
      
      {/* Modal Content - Semi-transparent */}
      <div 
        ref={modalRef}
        className="relative w-full rounded-t-3xl shadow-2xl p-6 max-h-[60vh] overflow-y-auto"
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          transform: `translateY(${dragOffset}px)`,
          transition: dragOffset === 0 ? 'transform 0.2s ease-out' : 'none',
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-neutral-800">Choose Font</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100"
          >
            <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Drag indicator */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1 bg-neutral-300 rounded-full" />
        </div>

        {/* Font List */}
        <div className="space-y-2">
          {theme.fonts.families.map((font) => (
            <button
              key={font}
              onClick={() => onFontChange(font)}
              className={`w-full px-4 py-4 rounded-lg text-left transition-all ${
                activeObject.fontFamily === font
                  ? 'bg-primary-100 border-2 border-primary-500'
                  : 'bg-neutral-50 hover:bg-neutral-100 border-2 border-transparent'
              }`}
              style={{ fontFamily: font }}
            >
              <div className="text-lg font-medium text-neutral-800">{font}</div>
              <div className="text-sm text-neutral-500 mt-1" style={{ fontFamily: font }}>
                The quick brown fox jumps over the lazy dog
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);
  const { baseImage, setBaseImage, addTextObject, objects, activeObjectId, isDeleteZoneActive, updateObject } = useEditorStore();

  // Set container height to actual viewport height (fixes mobile browser issue)
  // This ensures the layout uses window.innerHeight instead of 100dvh which can be incorrect on mobile
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight;
      // Set CSS custom property with actual viewport height
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    
    // Update on resize and orientation change
    const handleResize = () => {
      setViewportHeight();
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Swipe gesture handling for panel - only detect swipes on right edge
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchX = e.touches[0].clientX;
    const screenWidth = window.innerWidth;
    const rightEdgeThreshold = screenWidth * 0.15; // Right 15% of screen
    
    // Only track if touch starts on right edge
    if (touchX > screenWidth - rightEdgeThreshold) {
      setTouchStartX(touchX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    
    const touchX = e.touches[0].clientX;
    const diffX = touchStartX - touchX;
    const threshold = 50; // Minimum swipe distance

    // Swipe left to hide panel (if visible)
    if (diffX > threshold && !isPanelCollapsed) {
      setIsPanelCollapsed(true);
      setTouchStartX(null);
    }
    // Swipe right to show panel (if hidden)
    else if (diffX < -threshold && isPanelCollapsed) {
      setIsPanelCollapsed(false);
      setTouchStartX(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };


  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      alert('Please select a valid image file (JPG, PNG, or WebP)');
      return;
    }

    try {
      const imageAsset = await loadImageAsset(file);
      setBaseImage({
        src: imageAsset.src,
        width: imageAsset.width,
        height: imageAsset.height,
      });
    } catch (error) {
      console.error('Failed to load image:', error);
      alert('Failed to load image. Please try again.');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleExport = async () => {
    const dataUrl = getCanvasDataURL('png');
    if (!dataUrl) {
      alert('No canvas to export');
      return;
    }

    try {
      await exportImageWeb(dataUrl, {
        format: 'png',
        filename: generateExportFilename(),
      });
    } catch (error) {
      console.error('Failed to export image:', error);
      alert('Failed to export image. Please try again.');
    }
  };

  // Get active object data
  const activeObject = activeObjectId ? objects.find(obj => obj.id === activeObjectId) : null;

  // Color picker handlers
  const handleColorChange = (color: string) => {
    if (activeObjectId) {
      updateObject(activeObjectId, { fill: color });
      // Don't close the drawer - let user preview and close manually
    }
  };

  // Font picker handlers
  const handleFontChange = (fontFamily: string) => {
    if (activeObjectId) {
      updateObject(activeObjectId, { fontFamily });
      // Don't close the drawer - let user preview and close manually
    }
  };

  return (
    <div 
      className="md:p-8 md:flex md:items-start md:justify-center bg-dark-bg overflow-hidden"
      style={{
        height: 'var(--vh, 100vh)', // Use CSS variable set by JS, fallback to 100vh
      }}
    >
      {/* Mobile screen container - full width on mobile, fixed width on desktop */}
      <div className="w-full h-full md:max-w-mobile md:mx-auto relative md:h-[844px] flex flex-col"
      >

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Canvas Area - Full Screen */}
        <div 
          className="flex-1 relative overflow-hidden min-h-0"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {baseImage && <EditorCanvasContainer />}
        </div>

        {/* Top Right - Download Button */}
        {baseImage && (
          <button
            onClick={handleExport}
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full transition-all shadow-lg z-20"
            aria-label="Download image"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        )}

        {/* Right Edge Control Panel - Floating Buttons (Instagram-style) - Only show when image is loaded */}
        {baseImage && (
          <div 
            className={`absolute right-0 top-0 bottom-0 flex flex-col items-center justify-center gap-4 transition-all duration-300 z-20 ${
              isPanelCollapsed ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
            }`}
            style={{
              paddingRight: '8px', // Small padding from edge
            }}
          >
          {/* Add Text Button - Always visible (I-Beam cursor icon) */}
          <button
            onClick={addTextObject}
            className="w-12 h-12 flex items-center justify-center rounded-full transition-all shadow-lg"
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}
            aria-label="Add text"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              {/* I-Beam cursor icon - vertical line with horizontal caps */}
              <path strokeLinecap="round" d="M12 2v20" />
              <path strokeLinecap="round" d="M8 2h8" />
              <path strokeLinecap="round" d="M8 22h8" />
            </svg>
          </button>

          {/* Text Controls - Only show when text is selected */}
          {activeObjectId && (
            <>
              {/* Font Family Button */}
              <button 
                onClick={() => setShowFontPicker(true)}
                className="w-12 h-12 flex items-center justify-center rounded-full transition-all shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
                aria-label="Font family"
              >
                <span className="text-white text-lg font-bold" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                  Aa
                </span>
              </button>

              {/* Color Picker Button */}
              <button 
                onClick={() => setShowColorPicker(true)}
                className="w-12 h-12 flex items-center justify-center rounded-full transition-all shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
                aria-label="Color picker"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </button>

              {/* Font Size Display (read-only, shows current size) */}
              <div 
                className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <span className="text-white/90 text-xs font-semibold">
                  {objects.find(obj => obj.id === activeObjectId)?.fontSize || 48}
                </span>
              </div>

            </>
          )}
          </div>
        )}

        {/* Handwritten "Select Image" with Arrow - Only show when no image */}
        {!baseImage && (
          <div 
            className="absolute bottom-24 left-1/2 flex flex-col items-center z-20 bounce-subtle"
            style={{
              transform: 'translateX(-50%)',
            }}
          >
            {/* Handwritten Text */}
            <div 
              className="text-white text-3xl font-bold mb-3"
              style={{
                fontFamily: "'Caveat', cursive",
                transform: 'rotate(-3deg)',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.6), 0 0 20px rgba(59, 158, 255, 0.3)',
                letterSpacing: '0.5px',
              }}
            >
              Select Image
            </div>
            
            {/* Hand-drawn Arrow pointing down (wavy/imperfect) */}
            <svg 
              width="50" 
              height="35" 
              viewBox="0 0 50 35" 
              className="text-white"
              style={{
                filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.5))',
              }}
            >
              {/* Arrow line (wavy to look hand-drawn) */}
              <path
                d="M 25 2 Q 27 10 25 14 Q 23 18 25 22 Q 27 26 25 30 Q 23 32 25 33"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Arrow head (asymmetric, hand-drawn style) */}
              <path
                d="M 25 33 L 18 27 M 25 33 L 28 28"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* Delete Zone - Appears at bottom when dragging object towards bottom */}
        {baseImage && isDeleteZoneActive && (
          <div 
            className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-8 z-30 transition-all duration-300"
            style={{
              background: 'linear-gradient(to top, rgba(239, 68, 68, 0.9), rgba(239, 68, 68, 0.7))',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
            }}
          >
            <div className="flex flex-col items-center gap-3">
              {/* Trash Can Icon */}
              <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-full border-2 border-white/40">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              {/* Delete Text */}
              <div className="text-white text-sm font-semibold">
                Release to Delete
              </div>
            </div>
          </div>
        )}

        {/* Bottom Center - Add Image Button */}
        <button
          onClick={handleUploadClick}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full transition-all shadow-lg z-20"
          style={{
            opacity: baseImage ? 0.7 : 1, // Adjust opacity when image is loaded
            // Hide when delete zone is active to avoid overlap
            visibility: isDeleteZoneActive ? 'hidden' : 'visible',
          }}
          aria-label={baseImage ? "Change image" : "Upload image"}
        >
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {/* Color Picker Modal */}
        {showColorPicker && activeObject && (
          <ColorPickerModal
            activeObject={activeObject}
            onColorChange={handleColorChange}
            onClose={() => setShowColorPicker(false)}
          />
        )}

        {/* Font Picker Modal */}
        {showFontPicker && activeObject && (
          <FontPickerModal
            activeObject={activeObject}
            onFontChange={handleFontChange}
            onClose={() => setShowFontPicker(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
