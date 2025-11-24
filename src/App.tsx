/**
 * Main Application Component
 */

import React, { useRef, useEffect } from 'react';
import { useEditorStore } from './state/editorStore';
import { EditorCanvasContainer, getCanvasDataURL } from './components/containers/EditorCanvasContainer';
import { loadImageAsset, isValidImageFile } from './data-access/imageLoader';
import { exportImageWeb, generateExportFilename } from './data-access/imageExporter';

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { baseImage, setBaseImage, addTextObject, objects, activeObjectId, updateObject, deleteObject } = useEditorStore();

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

        {baseImage ? (
          <>
            {/* Canvas Area - Full Screen */}
            <div className="flex-1 relative overflow-hidden min-h-0">
              <EditorCanvasContainer />
            </div>

            {/* Bottom Toolbar Overlay - Fixed at bottom */}
            <div className="bg-dark-panel/95 backdrop-blur-sm border-t border-white/10 flex-shrink-0">
              {/* Text Controls Row */}
              {activeObjectId && (
                <div className="px-4 py-3 flex items-center justify-between border-b border-white/10">
                  {/* Left: Text styling icons */}
                  <div className="flex items-center gap-3">
                    {/* Font Family Icon */}
                    <button className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                      </svg>
                    </button>

                    {/* Color Picker Icon */}
                    <button className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </button>

                    {/* Alignment Icon */}
                    <button className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Right: Delete button */}
                  <button
                    onClick={() => deleteObject(activeObjectId)}
                    className="w-10 h-10 flex items-center justify-center text-red-500 hover:text-red-400 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Font Size Slider */}
              {activeObjectId && (
                <div className="px-4 py-4 flex items-center gap-3 border-b border-white/10">
                  <span className="text-white/80 text-sm font-medium">Tt</span>
                  <input
                    type="range"
                    min="8"
                    max="200"
                    value={objects.find(obj => obj.id === activeObjectId)?.fontSize || 48}
                    onChange={(e) => updateObject(activeObjectId, { fontSize: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent"
                    style={{
                      background: `linear-gradient(to right, #3b9eff 0%, #3b9eff ${((objects.find(obj => obj.id === activeObjectId)?.fontSize || 48) - 8) / 192 * 100}%, rgba(255,255,255,0.2) ${((objects.find(obj => obj.id === activeObjectId)?.fontSize || 48) - 8) / 192 * 100}%, rgba(255,255,255,0.2) 100%)`
                    }}
                  />
                  <span className="text-white/80 text-sm font-medium min-w-[3rem] text-right">
                    {objects.find(obj => obj.id === activeObjectId)?.fontSize || 48}pt
                  </span>
                </div>
              )}

              {/* Bottom Action Buttons */}
              <div className="px-4 py-4 flex items-center justify-between">
                {/* Add Text Button */}
                <button
                  onClick={addTextObject}
                  className="w-12 h-12 flex items-center justify-center bg-dark-card hover:bg-dark-card/80 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>

                {/* Download Button */}
                <button
                  onClick={handleExport}
                  className="w-12 h-12 flex items-center justify-center bg-accent hover:bg-accent-hover rounded-lg transition-colors shadow-lg"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Upload Screen */
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
            {/* Icon */}
            <div className="w-32 h-32 bg-dark-panel rounded-3xl flex items-center justify-center mb-8">
              <svg className="w-16 h-16 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Text */}
            <h2 className="text-white text-xl font-semibold mb-2">Upload an Image</h2>
            <p className="text-white/60 text-sm text-center mb-8">
              Tap to choose a photo from your device
            </p>

            {/* Button */}
            <button
              onClick={handleUploadClick}
              className="w-full max-w-sm bg-accent hover:bg-accent-hover text-white font-medium py-4 rounded-full transition-colors shadow-lg"
            >
              Choose Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
