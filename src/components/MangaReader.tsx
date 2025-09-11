"use client"
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize, RotateCcw, Home, BookOpen, Settings } from 'lucide-react';
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
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [readingMode, setReadingMode] = useState<'single' | 'double'>('single');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPreviousPage();
          break;
        case 'ArrowRight':
          goToNextPage();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'r':
          resetZoom();
          break;
        case '+':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage]);

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < mangaPages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 300));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const resetZoom = () => {
    setZoom(100);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg px-4 py-3 flex items-center justify-between">
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
            Trang {currentPage + 1} / {mangaPages.length}
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
        <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">Chế độ đọc:</span>
                <select 
                  value={readingMode} 
                  onChange={(e) => setReadingMode(e.target.value as 'single' | 'double')}
                  className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 text-sm"
                >
                  <option value="single">Trang đơn</option>
                  <option value="double">Trang kép</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">Zoom:</span>
                <span className="text-sm font-mono">{zoom}%</span>
              </div>
            </div>
            
            <div className="text-xs text-gray-400">
              Phím tắt: ← → (chuyển trang), F (toàn màn hình), +/- (zoom), R (reset)
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Reader Container */}
          <div 
            ref={imageContainerRef}
            className="relative bg-black rounded-lg overflow-hidden shadow-2xl"
            style={{ minHeight: '70vh' }}
          >
            {/* Navigation Arrows */}
            <button 
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 disabled:bg-opacity-20 p-3 rounded-full transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={goToNextPage}
              disabled={currentPage === mangaPages.length - 1}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 disabled:bg-opacity-20 p-3 rounded-full transition-all"
            >
              <ChevronRight size={24} />
            </button>

            {/* Control Panel */}
            <div className="absolute top-4 right-4 z-10 flex space-x-2">
              <button 
                onClick={zoomOut}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-lg transition-all"
              >
                <ZoomOut size={16} />
              </button>
              <button 
                onClick={resetZoom}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-lg transition-all"
              >
                <RotateCcw size={16} />
              </button>
              <button 
                onClick={zoomIn}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-lg transition-all"
              >
                <ZoomIn size={16} />
              </button>
              <button 
                onClick={toggleFullscreen}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 p-2 rounded-lg transition-all"
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
            </div>

            {/* Manga Page Display */}
            <div className="flex justify-center items-center min-h-[70vh] p-4">
              {readingMode === 'single' ? (
                <Image
                  src={mangaPages[currentPage].imageUrl}
                  alt={mangaPages[currentPage].alt}
                  className="max-w-full max-h-full object-contain transition-transform duration-200"
                  style={{ 
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'center'
                  }}
                />
              ) : (
                <div className="flex space-x-4">
                  <img
                    src={mangaPages[currentPage].imageUrl}
                    alt={mangaPages[currentPage].alt}
                    className="max-w-1/2 max-h-full object-contain transition-transform duration-200"
                    style={{ 
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: 'center'
                    }}
                  />
                  {currentPage + 1 < mangaPages.length && (
                    <img
                      src={mangaPages[currentPage + 1].imageUrl}
                      alt={mangaPages[currentPage + 1].alt}
                      className="max-w-1/2 max-h-full object-contain transition-transform duration-200"
                      style={{ 
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'center'
                      }}
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Page Navigation */}
          <div className="mt-6 flex justify-center">
            <div className="bg-gray-800 rounded-lg p-4 max-w-4xl w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Điều hướng trang</h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={goToPreviousPage}
                    disabled={currentPage === 0}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Trang trước
                  </button>
                  <button 
                    onClick={goToNextPage}
                    disabled={currentPage === mangaPages.length - 1}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Trang sau
                  </button>
                </div>
              </div>
              
              {/* Page Thumbnails */}
              <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
                {mangaPages.map((page, index) => (
                  <button
                    key={page.id}
                    onClick={() => goToPage(index)}
                    className={`relative aspect-[3/4] rounded overflow-hidden transition-all ${
                      currentPage === index 
                        ? 'ring-2 ring-blue-500 bg-blue-600 bg-opacity-20' 
                        : 'hover:ring-1 hover:ring-gray-500'
                    }`}
                  >
                    <img
                      src={page.imageUrl}
                      alt={`Page ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-xs py-1 text-center">
                      {index + 1}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
            <span>Tiến độ đọc</span>
            <span>{Math.round(((currentPage + 1) / mangaPages.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentPage + 1) / mangaPages.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MangaReader;