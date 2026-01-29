'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// =====================================================
// Zoom Parallax Section
// Oliver Larose style zoom parallax effect
// Source: https://github.com/olivierlarose/zoom-parallax
// Enhanced with background pattern and text overlay
// Desktop: Full zoom parallax effect
// Mobile: Simplified static grid for performance
// =====================================================

// Image configuration with Oliver Larose positioning
// Optimized WebP images (~98% smaller than originals)
const pictures = [
  {
    src: '/images/optimized/parallax-3.webp',
    scale: [1, 4] as [number, number],
    // Center image - no offset
  },
  {
    src: '/images/optimized/farming.webp',
    scale: [1, 5] as [number, number],
    style: { top: '-30vh', left: '5vw', width: '35vw', height: '30vh' },
  },
  {
    src: '/images/optimized/general-trading.webp',
    scale: [1, 6] as [number, number],
    style: { top: '-10vh', left: '-25vw', width: '20vw', height: '45vh' },
  },
  {
    src: '/images/optimized/tourism.webp',
    scale: [1, 5] as [number, number],
    style: { left: '27.5vw', width: '25vw', height: '25vh' },
  },
  {
    src: '/images/optimized/parallax-2.webp',
    scale: [1, 6] as [number, number],
    style: { top: '27.5vh', left: '5vw', width: '20vw', height: '25vh' },
  },
  {
    src: '/images/optimized/parallax-4.webp',
    scale: [1, 8] as [number, number],
    style: { top: '27.5vh', left: '-22.5vw', width: '30vw', height: '25vh' },
  },
  {
    src: '/images/optimized/parallax-5.webp',
    scale: [1, 9] as [number, number],
    style: { top: '22.5vh', left: '25vw', width: '15vw', height: '15vh' },
  },
];

export interface ZoomParallaxProps {
  /** Optional headline text */
  headline?: string;
  /** Optional subheadline */
  subheadline?: string;
  /** Optional className */
  className?: string;
}

export function ZoomParallax({
  headline = 'Building Tomorrow',
  subheadline = 'Across 11 industries',
  className,
}: ZoomParallaxProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Render mobile version
  if (isMobile) {
    return <ZoomParallaxMobile headline={headline} subheadline={subheadline} className={className} />;
  }

  // Render desktop version
  return <ZoomParallaxDesktop headline={headline} subheadline={subheadline} className={className} />;
}

// =====================================================
// Desktop Version - Full zoom parallax effect
// =====================================================

function ZoomParallaxDesktop({
  headline,
  subheadline,
  className,
}: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // Create scale transforms for each image
  const scale1 = useTransform(scrollYProgress, [0, 1], pictures[0].scale);
  const scale2 = useTransform(scrollYProgress, [0, 1], pictures[1].scale);
  const scale3 = useTransform(scrollYProgress, [0, 1], pictures[2].scale);
  const scale4 = useTransform(scrollYProgress, [0, 1], pictures[3].scale);
  const scale5 = useTransform(scrollYProgress, [0, 1], pictures[4].scale);
  const scale6 = useTransform(scrollYProgress, [0, 1], pictures[5].scale);
  const scale7 = useTransform(scrollYProgress, [0, 1], pictures[6].scale);

  const scales = [scale1, scale2, scale3, scale4, scale5, scale6, scale7];

  // Text animations
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%']);

  return (
    <div ref={container} className={`h-[300vh] relative ${className || ''}`}>
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden bg-earth-anchor">
        {/* Background Pattern - Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial gradient overlay for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, rgba(26,24,20,0.4) 100%)',
          }}
        />

        {/* Animated text overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
          style={{
            scale: textScale,
            opacity: textOpacity,
            y: textY,
          }}
        >
          <h2
            className="text-[8vw] text-white/90 uppercase tracking-tight leading-none text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {headline}
          </h2>
          <p className="text-[1.5vw] text-highland-gold uppercase tracking-[0.3em] mt-4">
            {subheadline}
          </p>
        </motion.div>

        {/* Parallax images */}
        {pictures.map((picture, index) => (
          <ZoomElement
            key={index}
            src={picture.src}
            scale={scales[index]}
            style={picture.style}
            index={index}
          />
        ))}

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-earth-anchor to-transparent z-20" />
      </div>
    </div>
  );
}

// =====================================================
// Mobile Version - Swipeable carousel gallery
// =====================================================

function ZoomParallaxMobile({
  headline,
  subheadline,
  className,
}: ZoomParallaxProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Only show first 5 images for mobile carousel
  const mobileImages = pictures.slice(0, 5);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -500) {
      // Swipe left - next
      setCurrentIndex((prev) => Math.min(prev + 1, mobileImages.length - 1));
    } else if (offset > threshold || velocity > 500) {
      // Swipe right - previous
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className={`bg-earth-anchor py-12 overflow-hidden ${className || ''}`}>
      {/* Header */}
      <div className="text-center mb-8 px-4">
        <h2
          className="text-3xl sm:text-4xl text-white/90 uppercase tracking-tight leading-none"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {headline}
        </h2>
        <p className="text-xs text-highland-gold uppercase tracking-[0.2em] mt-2">
          {subheadline}
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative px-4">
        <motion.div
          className="flex gap-4 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={{
            x: `-${currentIndex * 85}%`,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          style={{ touchAction: 'pan-y' }}
        >
          {mobileImages.map((picture, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[80%] relative"
              animate={{
                scale: currentIndex === index ? 1 : 0.9,
                opacity: currentIndex === index ? 1 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={picture.src}
                  alt={`ZG Business Group - ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="80vw"
                  quality={75}
                  draggable={false}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor/60 via-transparent to-transparent" />

                {/* Image number badge */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-xs font-medium">
                    {index + 1}/{mobileImages.length}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {mobileImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === index
                ? 'w-6 h-2 bg-highland-gold'
                : 'w-2 h-2 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe hint */}
      <p className="text-center text-white/40 text-xs mt-4 uppercase tracking-wider">
        Swipe to explore
      </p>
    </section>
  );
}

// =====================================================
// Individual zoom element component (Desktop only)
// =====================================================

interface ZoomElementProps {
  src: string;
  scale: MotionValue<number>;
  index: number;
  style?: {
    top?: string;
    left?: string;
    width?: string;
    height?: string;
  };
}

function ZoomElement({ src, scale, style, index }: ZoomElementProps) {
  return (
    <motion.div
      style={{ scale }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className="relative overflow-hidden rounded-sm shadow-2xl"
        style={{
          width: style?.width ?? '25vw',
          height: style?.height ?? '25vh',
          top: style?.top ?? 0,
          left: style?.left ?? 0,
        }}
      >
        <Image
          src={src}
          alt={`ZG Business Group - Image ${index + 1}`}
          fill
          className="object-cover"
          sizes="35vw"
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMDBAMBAAAAAAAAAAAAAQIDBAAFEQYSITETQVFh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQADAAMAAAAAAAAAAAAAAAAAAQIRITH/2gAMAwEAAhEDEEA8APKtO0m4qdLyH3G1KPal4qNZ/tKCOQT7xWT1UatNdVqYpI//2Q=="
        />
        {/* Subtle overlay on images */}
        <div className="absolute inset-0 bg-earth-anchor/10" />
      </div>
    </motion.div>
  );
}

// =====================================================
// ZoomParallaxHero - Simplified single image zoom
// =====================================================

export interface ZoomParallaxHeroProps {
  image: string;
  alt?: string;
  children?: React.ReactNode;
  sectionHeight?: string;
}

export function ZoomParallaxHero({
  image,
  alt = 'Hero background',
  children,
  sectionHeight = '200vh',
}: ZoomParallaxHeroProps) {
  const container = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.2 : 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  return (
    <div ref={container} style={{ height: isMobile ? '150vh' : sectionHeight }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale }}>
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            quality={80}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <motion.div
          className="relative z-10 h-full flex items-center justify-center"
          style={{ opacity }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default ZoomParallax;
