"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Home, BookOpen, Settings, ChevronUp, ChevronDown } from 'lucide-react';
import Image from 'next/image';
interface MangaPage {
  id: number;
  imageUrl: string;
  alt: string;
}

const MangaReader: React.FC = () => {
  // Sample manga pages data
  const mangaPages: MangaPage[] = [
    { id: 1, imageUrl: '/assets/card/800x1200.png', alt: 'Page 1' },
    { id: 2, imageUrl: '/assets/card/800x1200.png', alt: 'Page 2' },
    { id: 3, imageUrl: '/assets/card/800x1200.png', alt: 'Page 3' },
    { id: 4, imageUrl: '/assets/card/800x1200.png', alt: 'Page 4' },
    { id: 5, imageUrl: '/assets/card/800x1200.png', alt: 'Page 5' },
    { id: 6, imageUrl: '/assets/card/800x1200.png', alt: 'Page 6' },
    { id: 7, imageUrl: '/assets/card/800x1200.png', alt: 'Page 7' },
    { id: 8, imageUrl: '/assets/card/800x1200.png', alt: 'Page 8' },
    { id: 9, imageUrl: '/assets/card/800x1200.png', alt: 'Page 9' },
    { id: 10, imageUrl: '/assets/card/800x1200.png', alt: 'Page 10' },
  ];

  const [zoom, setZoom] = useState(100);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentVisiblePage, setCurrentVisiblePage] = useState(1);
  const [readingProgress, setReadingProgress] = useState(0);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(0);
  const [showScrollButtons, setShowScrollButtons] = useState(true);
  
  const readerContainerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoScrollRef = useRef<number | null>(null);

  // Handle scroll to update progress and current page
  const handleScroll = useCallback(() => {
    if (!readerContainerRef.current) return;

    const container = readerContainerRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    setReadingProgress(Math.min(Math.max(progress, 0), 100));

    // Find current visible page
    let currentPage = 1;
    pageRefs.current.forEach((pageRef, index) => {
      if (pageRef) {
        const rect = pageRef.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        if (rect.top <= containerRect.top + containerRect.height / 2 && 
            rect.bottom >= containerRect.top + containerRect.height / 2) {
          currentPage = index + 1;
        }
      }
    });
    
    setCurrentVisiblePage(currentPage);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!readerContainerRef.current) return;

      const container = readerContainerRef.current;
      const scrollAmount = window.innerHeight * 0.8;

      switch (e.key) {
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          container.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
          break;
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
          break;
        case 'Home':
          e.preventDefault();
          container.scrollTo({ top: 0, behavior: 'smooth' });
          break;
        case 'End':
          e.preventDefault();
          container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
          break;
        case '+':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case 'r':
          e.preventDefault();
          resetZoom();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Auto scroll functionality
  useEffect(() => {
    if (autoScrollSpeed > 0) {
      autoScrollRef.current = window.setInterval(() => {
        if (readerContainerRef.current) {
          readerContainerRef.current.scrollBy({ top: autoScrollSpeed, behavior: 'auto' });
        }
      }, 50);
    } else if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [autoScrollSpeed]);

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 300));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const resetZoom = () => {
    setZoom(100);
  };

  const scrollToPage = (pageIndex: number) => {
    const pageRef = pageRefs.current[pageIndex];
    if (pageRef && readerContainerRef.current) {
      const container = readerContainerRef.current;
      const pageRect = pageRef.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scrollTop = container.scrollTop + pageRect.top - containerRect.top;
      
      container.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  };

  const scrollUp = () => {
    if (readerContainerRef.current) {
      readerContainerRef.current.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (readerContainerRef.current) {
      readerContainerRef.current.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <button className="hover:bg-gray-700 p-2 rounded-lg transition-colors">
            <Home size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <BookOpen size={20} />
            <h1 className="text-lg font-semibold">Manga Title</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-300">
            Trang {currentVisiblePage} / {mangaPages.length}
          </span>
          <span className="text-sm text-gray-300">
            {readingProgress.toFixed(1)}%
          </span>
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="hover:bg-gray-700 p-2 rounded-lg transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Settings Panel */}
      {isSettingsOpen && (
        <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 sticky top-16 z-40">
          <div className="flex items-center justify-between max-w-4xl mx-auto flex-wrap gap-4">
            <div className="flex items-center space-x-6 flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">Zoom:</span>
                <span className="text-sm font-mono">{zoom}%</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">Auto scroll:</span>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={autoScrollSpeed}
                  onChange={(e) => setAutoScrollSpeed(Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-xs text-gray-400">{autoScrollSpeed}x</span>
              </div>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showScrollButtons}
                  onChange={(e) => setShowScrollButtons(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-300">Hiện nút scroll</span>
              </label>
            </div>
            
            <div className="text-xs text-gray-400">
              Phím tắt: ↑/↓ (scroll), +/- (zoom), R (reset), Home/End (đầu/cuối)
            </div>
          </div>
        </div>
      )}

      {/* Main Reader Container */}
      <div className="flex-1 relative">
        <div 
          ref={readerContainerRef}
          className="h-screen overflow-y-auto overflow-x-hidden bg-black"
          onScroll={handleScroll}
        >
          {/* Manga Pages Container */}
          <div className="flex flex-col items-center py-4">
            {mangaPages.map((page, index) => (
              <div
                key={page.id}
                ref={el => { pageRefs.current[index] = el; }}
                className="mb-2 flex justify-center w-full"
                style={{
                  transform: `scale(${zoom / 100})`,
                  transformOrigin: 'center top'
                }}
              >
                <Image
                  src={page.imageUrl}
                  alt={page.alt}
                  className="max-w-full h-auto block"
                  style={{ 
                    maxWidth: zoom > 100 ? 'none' : '100%',
                    width: zoom > 100 ? 'auto' : '100%'
                  }}
                  loading="lazy"
                />
              </div>
            ))}
            
            {/* End of chapter indicator */}
            <div className="bg-gray-800 rounded-lg p-8 m-4 text-center">
              <h3 className="text-xl font-semibold mb-2">Hết chương</h3>
              <p className="text-gray-400 mb-4">Bạn đã đọc xong chương này</p>
              <div className="flex space-x-4 justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors">
                  Chương tiếp theo
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors">
                  Danh sách chương
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-30 flex flex-col space-y-2">
          <button 
            onClick={zoomOut}
            className="bg-black bg-opacity-70 hover:bg-opacity-90 p-3 rounded-lg transition-all shadow-lg"
            title="Zoom out (-)"
          >
            <ZoomOut size={18} />
          </button>
          <button 
            onClick={resetZoom}
            className="bg-black bg-opacity-70 hover:bg-opacity-90 p-3 rounded-lg transition-all shadow-lg"
            title="Reset zoom (R)"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={zoomIn}
            className="bg-black bg-opacity-70 hover:bg-opacity-90 p-3 rounded-lg transition-all shadow-lg"
            title="Zoom in (+)"
          >
            <ZoomIn size={18} />
          </button>
        </div>

        {/* Scroll Navigation Buttons */}
        {showScrollButtons && (
          <>
            <button 
              onClick={scrollUp}
              className="fixed top-1/3 left-4 z-30 bg-black bg-opacity-70 hover:bg-opacity-90 p-3 rounded-lg transition-all shadow-lg"
              title="Scroll up (↑)"
            >
              <ChevronUp size={20} />
            </button>
            
            <button 
              onClick={scrollDown}
              className="fixed bottom-1/3 left-4 z-30 bg-black bg-opacity-70 hover:bg-opacity-90 p-3 rounded-lg transition-all shadow-lg"
              title="Scroll down (↓)"
            >
              <ChevronDown size={20} />
            </button>
          </>
        )}

        {/* Page Navigation Sidebar */}
        <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-20 bg-gray-800 bg-opacity-90 rounded-r-lg p-2 max-h-96 overflow-y-auto">
          <div className="flex flex-col space-y-1">
            {mangaPages.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToPage(index)}
                className={`text-xs px-3 py-2 rounded transition-colors ${
                  currentVisiblePage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800 border-t border-gray-700 sticky bottom-0 z-50">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between text-sm text-gray-300 mb-1">
            <span>Tiến độ đọc</span>
            <span>{readingProgress.toFixed(1)}% • Trang {currentVisiblePage}/{mangaPages.length}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaReader;