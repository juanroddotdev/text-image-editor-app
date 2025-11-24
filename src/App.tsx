/**
 * Main Application Component
 */

import React, { useRef, useEffect, useState } from 'react';
import { useEditorStore } from './state/editorStore';
import { EditorCanvasContainer, getCanvasDataURL } from './components/containers/EditorCanvasContainer';
import { loadImageAsset, isValidImageFile } from './data-access/imageLoader';
import { exportImageWeb, generateExportFilename } from './data-access/imageExporter';

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const { baseImage, setBaseImage, addTextObject, objects, activeObjectId } = useEditorStore();

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

        {/* Right Edge Control Panel - Floating Buttons (Instagram-style) */}
        <div 
          className={`absolute right-0 top-0 bottom-0 flex flex-col items-center justify-center gap-4 transition-all duration-300 z-20 ${
            isPanelCollapsed ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          }`}
          style={{
            paddingRight: '8px', // Small padding from edge
          }}
        >
          {/* Add Text Button - Always visible (Aa icon) */}
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
            <span className="text-white text-lg font-bold" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
              Aa
            </span>
          </button>

          {/* Text Controls - Only show when text is selected */}
          {activeObjectId && (
            <>
              {/* Font Family Button */}
              <button 
                className="w-12 h-12 flex items-center justify-center rounded-full transition-all shadow-lg"
                style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
                aria-label="Font family"
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>

              {/* Color Picker Button */}
              <button 
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

        {/* Bottom Center - Add Image Button */}
        <button
          onClick={handleUploadClick}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full transition-all shadow-lg z-20"
          style={{
            opacity: baseImage ? 0.7 : 1, // Adjust opacity when image is loaded
          }}
          aria-label={baseImage ? "Change image" : "Upload image"}
        >
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;
