'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Text, Heading } from '@/components/ui';

// =====================================================
// Gallery Section Component
// AWWWARDS-inspired infinite marquee gallery
// =====================================================

interface GalleryImage {
  src: string;
  alt: string;
  width: 'narrow' | 'normal' | 'wide';
}

// Row 1 - scrolls left
const row1Images: GalleryImage[] = [
  { src: '/gallery/IMG_7010.JPG', alt: 'Award Ceremony', width: 'wide' },
  { src: '/gallery/IMG_5532.JPG', alt: 'Business Meeting', width: 'normal' },
  { src: '/gallery/IMG_7672.JPG', alt: 'Corporate Event', width: 'normal' },
  { src: '/gallery/IMG_8148.jpg', alt: 'Team Collaboration', width: 'wide' },
  { src: '/gallery/IMG_6953.JPG', alt: 'Achievement Award', width: 'normal' },
  { src: '/gallery/IMG_7022.JPG', alt: 'Business Operations', width: 'normal' },
  { src: '/gallery/IMG_8353.jpg', alt: 'Partnership Signing', width: 'wide' },
];

// Row 2 - scrolls right
const row2Images: GalleryImage[] = [
  { src: '/gallery/IMG_9326.jpg', alt: 'Community Event', width: 'normal' },
  { src: '/gallery/IMG_8385.JPG', alt: 'Team Event', width: 'wide' },
  { src: '/gallery/IMG_1216.JPG', alt: 'Business Operations', width: 'normal' },
  { src: '/gallery/IMG_7725.JPG', alt: 'Corporate Gathering', width: 'wide' },
  { src: '/gallery/IMG_9400.jpg', alt: 'Company Event', width: 'normal' },
  { src: '/gallery/IMG_8341.JPG', alt: 'Business Activity', width: 'normal' },
  { src: '/gallery/IMG_1460.JPG', alt: 'Team Collaboration', width: 'normal' },
];

// Row 3 - scrolls left (slower)
const row3Images: GalleryImage[] = [
  { src: '/gallery/IMG_7043.JPG', alt: 'Corporate Event', width: 'normal' },
  { src: '/gallery/20250729_093232.jpg', alt: 'Recent Event', width: 'wide' },
  { src: '/gallery/IMG_9498.JPG', alt: 'Business Meeting', width: 'normal' },
  { src: '/gallery/Cirtificate.jpg', alt: 'Certificate of Recognition', width: 'wide' },
  { src: '/gallery/IMG_8133.png', alt: 'Company Achievement', width: 'normal' },
];

const allImages = [...row1Images, ...row2Images, ...row3Images];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Open lightbox
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // Get current index for navigation
  const currentIndex = selectedImage ? allImages.findIndex(img => img.src === selectedImage.src) : 0;

  // Navigate lightbox
  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % allImages.length
      : (currentIndex - 1 + allImages.length) % allImages.length;
    setSelectedImage(allImages[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <>
      <section
        ref={containerRef}
        className="relative py-12 md:py-16 bg-earth-anchor overflow-hidden"
        aria-label="Gallery"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }} />

        {/* Section Header */}
        <motion.div style={{ opacity }} className="relative z-10">
          <Container className="mb-8 md:mb-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <Text
                  size="caption"
                  className="text-highland-gold uppercase tracking-[0.25em] mb-3"
                >
                  Visual Stories
                </Text>
                <Heading as="h2" size="h2" className="text-paper-white">
                  Our Gallery
                </Heading>
              </div>
              <p className="text-paper-white/60 max-w-md text-base">
                Capturing moments of excellence, partnership, and community impact across our journey.
              </p>
            </div>
          </Container>
        </motion.div>

        {/* Marquee Rows */}
        <div className="space-y-3 md:space-y-4">
          <MarqueeRow
            images={row1Images}
            direction="left"
            speed={40}
            isPaused={isPaused}
            onImageClick={openLightbox}
          />
          <MarqueeRow
            images={row2Images}
            direction="right"
            speed={35}
            isPaused={isPaused}
            onImageClick={openLightbox}
          />
          <MarqueeRow
            images={row3Images}
            direction="left"
            speed={30}
            isPaused={isPaused}
            onImageClick={openLightbox}
          />
        </div>

        {/* Gradient overlays for fade effect */}
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-earth-anchor to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-earth-anchor to-transparent z-10 pointer-events-none" />
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            currentIndex={currentIndex}
            totalImages={allImages.length}
            onClose={closeLightbox}
            onPrev={() => navigateLightbox('prev')}
            onNext={() => navigateLightbox('next')}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// =====================================================
// Marquee Row Component
// =====================================================

interface MarqueeRowProps {
  images: GalleryImage[];
  direction: 'left' | 'right';
  speed: number;
  isPaused: boolean;
  onImageClick: (image: GalleryImage) => void;
}

function MarqueeRow({ images, direction, speed, isPaused, onImageClick }: MarqueeRowProps) {
  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images, ...images];

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex gap-3 md:gap-4"
        animate={{
          x: direction === 'left' ? ['0%', '-33.333%'] : ['-33.333%', '0%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: speed,
            ease: 'linear',
          },
        }}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedImages.map((image, index) => (
          <GalleryCard
            key={`${image.src}-${index}`}
            image={image}
            onClick={() => onImageClick(image)}
          />
        ))}
      </motion.div>
    </div>
  );
}

// =====================================================
// Gallery Card Component
// =====================================================

interface GalleryCardProps {
  image: GalleryImage;
  onClick: () => void;
}

function GalleryCard({ image, onClick }: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const widthClasses = {
    narrow: 'w-[220px] md:w-[260px]',
    normal: 'w-[260px] md:w-[320px]',
    wide: 'w-[340px] md:w-[420px]',
  };

  return (
    <motion.div
      className={cn(
        'relative flex-shrink-0 cursor-pointer group',
        widthClasses[image.width]
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-earth-anchor/50">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={cn(
            'object-cover transition-all duration-700',
            isHovered ? 'scale-110' : 'scale-100'
          )}
          sizes="(max-width: 768px) 320px, 520px"
        />

        {/* Overlay */}
        <div className={cn(
          'absolute inset-0 transition-all duration-500',
          'bg-gradient-to-t from-earth-anchor via-earth-anchor/20 to-transparent',
          isHovered ? 'opacity-90' : 'opacity-0'
        )} />

        {/* Hover content */}
        <div className={cn(
          'absolute inset-0 flex flex-col justify-end p-5 md:p-6',
          'transition-all duration-500',
          isHovered ? 'opacity-100' : 'opacity-0'
        )}>
          {/* Gold line accent */}
          <motion.div
            className="w-12 h-0.5 bg-highland-gold mb-3"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? 48 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />

          <p className="text-paper-white font-medium text-sm md:text-base">
            {image.alt}
          </p>

          {/* View indicator */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-highland-gold flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <svg className="w-4 h-4 text-earth-anchor" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        </div>

        {/* Border glow on hover */}
        <div className={cn(
          'absolute inset-0 rounded-xl border-2 transition-all duration-500',
          isHovered ? 'border-highland-gold/50' : 'border-transparent'
        )} />
      </div>
    </motion.div>
  );
}

// =====================================================
// Lightbox Component
// =====================================================

interface LightboxProps {
  image: GalleryImage;
  currentIndex: number;
  totalImages: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

function Lightbox({ image, currentIndex, totalImages, onClose, onPrev, onNext }: LightboxProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-earth-anchor/98 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-paper-white/10 hover:bg-paper-white/20 flex items-center justify-center text-paper-white transition-all duration-300"
        aria-label="Close gallery"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3">
        <span className="text-highland-gold font-semibold text-xl">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <span className="text-paper-white/30">/</span>
        <span className="text-paper-white/50 text-sm">
          {String(totalImages).padStart(2, '0')}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={image.src}
            className="relative w-full h-full max-w-6xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={onPrev}
          className="w-14 h-14 rounded-full border border-paper-white/20 bg-paper-white/5 hover:bg-highland-gold hover:border-highland-gold hover:text-earth-anchor flex items-center justify-center text-paper-white transition-all duration-300"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="px-4">
          <p className="text-paper-white/80 text-sm font-medium text-center max-w-xs">
            {image.alt}
          </p>
        </div>

        <button
          onClick={onNext}
          className="w-14 h-14 rounded-full border border-paper-white/20 bg-paper-white/5 hover:bg-highland-gold hover:border-highland-gold hover:text-earth-anchor flex items-center justify-center text-paper-white transition-all duration-300"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default Gallery;
