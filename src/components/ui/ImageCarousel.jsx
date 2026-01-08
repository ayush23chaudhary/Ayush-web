import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * Image Carousel Component
 * Displays project images in a carousel with lightbox support
 */
const ImageCarousel = ({ images, title, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') goToPrevious(e);
    if (e.key === 'ArrowRight') goToNext(e);
    if (e.key === 'Escape') onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="dialog"
      aria-label={`Image gallery for ${title}`}
    >
      {/* Close button */}
      <motion.button
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Close gallery"
      >
        <X className="w-6 h-6" />
      </motion.button>

      {/* Title */}
      <div className="absolute top-4 left-4 text-white font-medium">
        {title}
      </div>

      {/* Image counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      <motion.button
        className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        onClick={goToPrevious}
        whileHover={{ scale: 1.1, x: -2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8" />
      </motion.button>

      {/* Main image */}
      <div className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center px-16">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${title} screenshot ${currentIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />
        </AnimatePresence>
      </div>

      {/* Next button */}
      <motion.button
        className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        onClick={goToNext}
        whileHover={{ scale: 1.1, x: 2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8" />
      </motion.button>

      {/* Thumbnail dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-6'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

/**
 * Mini Carousel for Project Cards
 * Shows thumbnails with navigation
 */
export const MiniCarousel = ({ images, title, onExpand }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length <= 1) {
    return null;
  }

  return (
    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
      {/* Thumbnail indicators */}
      <div className="flex gap-1.5">
        {images.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIndex(index);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-4'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
        {images.length > 5 && (
          <span className="text-white/70 text-xs ml-1">+{images.length - 5}</span>
        )}
      </div>

      {/* View all button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onExpand();
        }}
        className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/30 transition-colors"
      >
        View All
      </button>
    </div>
  );
};

export default ImageCarousel;
