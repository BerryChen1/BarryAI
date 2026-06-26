import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, ZoomOut, RotateCcw, X, GripHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

interface ZoomableLightboxProps {
  url: string;
  onClose: () => void;
  language?: "zh" | "en";
  t: (zh: string, en: string) => string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export function ZoomableLightbox({ url, onClose, language = "zh", t, onNext, onPrev, hasNext, hasPrev }: ZoomableLightboxProps) {
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset scale and position when url changes
  useEffect(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, [url]);

  // Handle keyboard shortcuts (Esc, Arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && hasPrev && onPrev) {
        onPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, hasNext, hasPrev]);

  // Limit position to stop image from panning out of bounds when zoomed is a nice feature, 
  // but a simple clamp based on scale and window/image dimensions or just letting standard scroll/drag is great.
  // We'll dynamically clamp the relative panning so the image stays in viewport
  const clampPosition = (newX: number, newY: number, currentScale: number) => {
    if (currentScale <= 1) return { x: 0, y: 0 };
    
    // Allow generous panning bounds matching the scale representation
    const boundaryX = (currentScale - 1) * 350;
    const boundaryY = (currentScale - 1) * 350;
    
    return {
      x: Math.max(-boundaryX, Math.min(boundaryX, newX)),
      y: Math.max(-boundaryY, Math.min(boundaryY, newY))
    };
  };

  const handleZoomIn = () => {
    setScale(prev => {
      const next = Math.min(prev + 0.4, 4);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleZoomOut = () => {
    setScale(prev => {
      const next = Math.max(prev - 0.4, 1);
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Double click / Double tap to toggle zoom
  const handleImageDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (scale > 1) {
      handleReset();
    } else {
      // Zoom into clicked coordinate approx
      setScale(2);
      // Optional: offset position to center the click
      setPosition({ x: 0, y: 0 });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scale <= 1) return; // Only drag when zoomed
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || scale <= 1) return;
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    setPosition(clampPosition(newX, newY, scale));
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (scale <= 1) return;
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = {
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || scale <= 1 || e.touches.length !== 1) return;
    const newX = e.touches[0].clientX - dragStart.current.x;
    const newY = e.touches[0].clientY - dragStart.current.y;
    setPosition(clampPosition(newX, newY, scale));
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const zoomIntensity = 0.1;
    const delta = e.deltaY < 0 ? 1 : -1;
    
    setScale(prev => {
      const next = Math.max(1, Math.min(prev + delta * zoomIntensity, 4));
      if (next === 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[250] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md select-none touch-none"
    >
      {/* Top Bar Indicators & Close */}
      <div className="absolute top-0 inset-x-0 h-16 pointer-events-none px-6 flex items-center justify-between z-10 bg-gradient-to-b from-black/60 to-transparent">
        <div className="text-zinc-400 text-xs font-mono font-light pointer-events-auto">
          {scale > 1 ? (
            <span className="bg-sky-500/10 text-sky-400 px-2.5 py-1 rounded-full border border-sky-500/20">
              {Math.round(scale * 100)}%
            </span>
          ) : (
            <span className="bg-white/5 text-zinc-400 px-2.5 py-1 rounded-full border border-white/5">
              {t("标准尺寸", "Default View")}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="pointer-events-auto w-10 h-10 rounded-full bg-black/50 border border-white/10 text-white hover:bg-neutral-900 flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer shadow-lg"
          title={t("关闭", "Close")}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUpOrLeave}
        onWheel={handleWheel}
        className="w-full h-full flex items-center justify-center overflow-hidden p-4 relative"
      >
        {/* Navigation Arrows */}
        {hasPrev && onPrev && (
          <button
            onClick={(e) => { e.stopPropagation(); onPrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 border border-white/10 text-white hover:bg-neutral-800 flex items-center justify-center transition-all duration-300 active:scale-95 shadow-2xl backdrop-blur-md"
            title={t("上一张", "Previous")}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {hasNext && onNext && (
          <button
            onClick={(e) => { e.stopPropagation(); onNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/50 border border-white/10 text-white hover:bg-neutral-800 flex items-center justify-center transition-all duration-300 active:scale-95 shadow-2xl backdrop-blur-md"
            title={t("下一张", "Next")}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <motion.div
          animate={{
            x: position.x,
            y: position.y,
            scale: scale,
          }}
          transition={isDragging ? { type: 'keyframes', duration: 0 } : { type: 'spring', damping: 25, stiffness: 200 }}
          onDoubleClick={handleImageDoubleClick}
          className={`relative max-w-4xl max-h-[80vh] flex items-center justify-center ${
            scale > 1 
              ? isDragging 
                ? 'cursor-grabbing' 
                : 'cursor-grab' 
              : 'cursor-zoom-in'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm') || url.toLowerCase().endsWith('.mov') ? (
            <video
              src={url}
              controls
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
              autoPlay
              preload="auto"
              loop
              playsInline
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/5"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              ref={imageRef}
              src={url}
              alt="Large detailed zoomable view"
              className="max-w-full max-h-[80vh] object-contain rounded-lg select-none shadow-2xl border border-white/5"
              draggable={false}
              referrerPolicy="no-referrer"
            />
          )}

          {/* BarryAI Repeated Faint Watermark Overlay */}
          <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden select-none z-10 flex flex-col justify-between py-8 md:py-12">
            {Array.from({ length: 3 }).map((_, rowIdx) => (
              <div 
                key={rowIdx} 
                className={`flex justify-around items-center w-full ${rowIdx % 2 === 0 ? 'translate-x-[5%]' : '-translate-x-[5%]'}`}
              >
                {Array.from({ length: 3 }).map((_, colIdx) => {
                  const isCenter = rowIdx === 1 && colIdx === 1;
                  return (
                    <div 
                      key={colIdx} 
                      className={`text-zinc-500 font-black tracking-wider uppercase select-none transform -rotate-[22deg] whitespace-nowrap transition-opacity duration-350 ${
                        isCenter ? 'opacity-0 h-0 w-0 pointer-events-none' : 'text-2xl md:text-5xl opacity-[0.11]'
                      }`}
                      style={{ fontStyle: 'italic' }}
                    >
                      {!isCenter && "BarryAI"}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Control Toolbar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-neutral-900/95 border border-white/10 px-5 py-2.5 rounded-full shadow-2xl backdrop-blur-md">
        <button
          onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
          disabled={scale <= 1}
          className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          title={t("缩小", "Zoom Out")}
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <span className="text-[11px] font-mono text-zinc-300 min-w-[36px] text-center font-medium">
          {Math.round(scale * 100)}%
        </span>

        <button
          onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
          disabled={scale >= 4}
          className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          title={t("放大", "Zoom In")}
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-4 bg-white/10" />

        <button
          onClick={(e) => { e.stopPropagation(); handleReset(); }}
          disabled={scale === 1 && position.x === 0 && position.y === 0}
          className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 active:scale-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          title={t("重置", "Reset")}
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation overlay tips */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 font-sans tracking-wide text-center pointer-events-none md:block hidden animate-fade-in">
        {scale > 1 
          ? t("可拖动图片查看细节 • 双击重置", "Drag to pan • Double click to reset") 
          : t("双击图片或使用滚轮可快速放大 • 滚轮上下滚动调焦", "Double click or scroll wheel to zoom • Scroll up/down to adjust focus")
        }
      </div>
    </motion.div>
  );
}
