'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Text, Heading } from '@/components/ui';

// =====================================================
// Gallery Section Component
// AWWWARDS-inspired bento grid with lightbox
// =====================================================

interface GalleryImage {
  src: string;
  alt: string;
  span: 'normal' | 'wide' | 'tall' | 'large';
}

// Gallery images with varied sizes for bento grid
const galleryImages: GalleryImage[] = [
  { src: '/gallery/IMG_7010.JPG', alt: 'ZG Business Group Event', span: 'large' },
  { src: '/gallery/IMG_5532.JPG', alt: 'Company Activities', span: 'normal' },
  { src: '/gallery/IMG_7672.JPG', alt: 'Business Operations', span: 'tall' },
  { src: '/gallery/IMG_8148.jpg', alt: 'Team Collaboration', span: 'wide' },
  { src: '/gallery/IMG_6953.JPG', alt: 'Corporate Event', span: 'normal' },
  { src: '/gallery/IMG_7022.JPG', alt: 'Business Meeting', span: 'normal' },
  { src: '/gallery/IMG_8353.jpg', alt: 'Company Achievement', span: 'wide' },
  { src: '/gallery/IMG_9326.jpg', alt: 'ZG Group Activities', span: 'tall' },
  { src: '/gallery/IMG_8385.JPG', alt: 'Team Event', span: 'normal' },
  { src: '/gallery/IMG_1216.JPG', alt: 'Business Operations', span: 'normal' },
  { src: '/gallery/IMG_7725.JPG', alt: 'Corporate Gathering', span: 'large' },
  { src: '/gallery/IMG_9400.jpg', alt: 'Company Event', span: 'normal' },
  { src: '/gallery/IMG_8341.JPG', alt: 'Business Activity', span: 'wide' },
  { src: '/gallery/IMG_1460.JPG', alt: 'Team Collaboration', span: 'normal' },
  { src: '/gallery/IMG_7043.JPG', alt: 'Corporate Event', span: 'normal' },
  { src: '/gallery/20250729_093232.jpg', alt: 'Recent Event', span: 'tall' },
  { src: '/gallery/IMG_9498.JPG', alt: 'Business Meeting', span: 'normal' },
  { src: '/gallery/Cirtificate.jpg', alt: 'Certificate of Recognition', span: 'wide' },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Open lightbox
  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  // Navigate lightbox
  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % galleryImages.length
      : (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
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
        className="relative py-24 md:py-32 lg:py-40 bg-paper-white overflow-hidden"
        aria-label="Gallery"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-highland-gold/30 to-transparent" />
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-highland-gold/5 blur-[120px]" />
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-earth-anchor/5 blur-[100px]" />
        </div>

        <Container className="relative z-10">
          {/* Section Header */}
          <motion.div
            style={{ y, opacity }}
            className="text-center mb-16 md:mb-20"
          >
            <Text
              size="caption"
              className="text-highland-gold uppercase tracking-[0.25em] mb-4"
            >
              Our Journey
            </Text>
            <Heading as="h2" size="h2" className="text-earth-anchor mb-6">
              Gallery
            </Heading>
            <p className="text-neutral-600 max-w-2xl mx-auto text-lg">
              Moments that define our commitment to excellence and community impact
            </p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {galleryImages.map((image, index) => (
              <GalleryItem
                key={image.src}
                image={image}
                index={index}
                onClick={() => openLightbox(image, index)}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox
            image={selectedImage}
            currentIndex={currentIndex}
            totalImages={galleryImages.length}
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
// Gallery Item with 3D Tilt Effect
// =====================================================

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  onClick: () => void;
}

function GalleryItem({ image, index, onClick }: GalleryItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  // Determine grid span classes
  const spanClasses = {
    normal: 'col-span-1 row-span-1',
    wide: 'col-span-2 row-span-1',
    tall: 'col-span-1 row-span-2',
    large: 'col-span-2 row-span-2',
  };

  // Staggered animation
  const variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        spanClasses[image.span],
        'relative cursor-pointer group'
      )}
      style={{
        perspective: 1000,
      }}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        className="relative w-full h-full overflow-hidden rounded-xl bg-neutral-100"
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Aspect ratio container */}
        <div className={cn(
          'relative w-full',
          image.span === 'tall' ? 'aspect-[3/4]' :
          image.span === 'wide' ? 'aspect-[16/9]' :
          image.span === 'large' ? 'aspect-square' :
          'aspect-square'
        )}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className={cn(
              'object-cover transition-transform duration-700',
              'group-hover:scale-110'
            )}
            sizes={
              image.span === 'large' ? '(max-width: 768px) 100vw, 33vw' :
              image.span === 'wide' ? '(max-width: 768px) 100vw, 33vw' :
              '(max-width: 768px) 50vw, 16vw'
            }
          />

          {/* Gradient overlay */}
          <div className={cn(
            'absolute inset-0 bg-gradient-to-t from-earth-anchor/60 via-earth-anchor/0 to-transparent',
            'opacity-0 group-hover:opacity-100 transition-opacity duration-500'
          )} />

          {/* Hover content */}
          <motion.div
            className="absolute inset-0 flex items-end p-4 md:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-paper-white text-sm font-medium">{image.alt}</p>
            </div>
          </motion.div>

          {/* Corner accent */}
          <div className={cn(
            'absolute top-3 right-3 w-8 h-8',
            'border-t-2 border-r-2 border-highland-gold rounded-tr-lg',
            'opacity-0 group-hover:opacity-100 transition-all duration-500',
            'transform translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0'
          )} />

          {/* View icon */}
          <motion.div
            className={cn(
              'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
              'w-12 h-12 rounded-full bg-highland-gold/90 backdrop-blur-sm',
              'flex items-center justify-center',
              'opacity-0 group-hover:opacity-100 transition-all duration-300',
              'scale-50 group-hover:scale-100'
            )}
          >
            <svg className="w-5 h-5 text-earth-anchor" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
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
        className="absolute inset-0 bg-earth-anchor/95 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6">
          <div className="flex items-center gap-4">
            <span className="text-highland-gold font-semibold text-lg">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <div className="w-16 h-0.5 bg-paper-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-highland-gold"
                initial={{ width: 0 }}
                animate={{ width: `${((currentIndex + 1) / totalImages) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-paper-white/40 text-sm">
              {String(totalImages).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={onClose}
            className={cn(
              'w-12 h-12 rounded-full',
              'bg-paper-white/10 hover:bg-paper-white/20',
              'flex items-center justify-center',
              'text-paper-white transition-all duration-300'
            )}
            aria-label="Close gallery"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center px-4 md:px-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={image.src}
              className="relative max-w-5xl w-full aspect-video"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
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

        {/* Footer with navigation */}
        <div className="flex items-center justify-between p-4 md:p-6">
          <p className="text-paper-white/60 text-sm max-w-md truncate">
            {image.alt}
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onPrev}
              className={cn(
                'w-12 h-12 rounded-full',
                'border border-paper-white/20 bg-transparent',
                'hover:bg-highland-gold hover:border-highland-gold hover:text-earth-anchor',
                'flex items-center justify-center',
                'text-paper-white transition-all duration-300'
              )}
              aria-label="Previous image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={onNext}
              className={cn(
                'w-12 h-12 rounded-full',
                'border border-paper-white/20 bg-transparent',
                'hover:bg-highland-gold hover:border-highland-gold hover:text-earth-anchor',
                'flex items-center justify-center',
                'text-paper-white transition-all duration-300'
              )}
              aria-label="Next image"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Gallery;
