'use client';

import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

// =====================================================
// AWWWARDS-Style Section Transitions
// Premium scroll-based animations and reveals
// =====================================================

// -----------------------------------------------------
// Parallax Section - Content moves at different speeds
// -----------------------------------------------------

export interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /** Parallax intensity - negative moves up, positive moves down */
  offset?: number;
  /** Whether to apply scale effect */
  scale?: boolean;
  /** Whether to apply opacity fade */
  fade?: boolean;
}

export function ParallaxSection({
  children,
  className,
  offset = 50,
  scale = false,
  fade = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      style={{
        y: smoothY,
        scale: scale ? scaleValue : 1,
        opacity: fade ? opacity : 1,
      }}
    >
      {children}
    </motion.div>
  );
}

// -----------------------------------------------------
// Reveal Section - Clip-path reveal on scroll
// -----------------------------------------------------

export interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  /** Direction of reveal */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Delay before animation starts */
  delay?: number;
}

// Clip path values for each direction
const clipPathConfig = {
  up: {
    from: 'inset(100% 0% 0% 0%)',
    to: 'inset(0% 0% 0% 0%)',
  },
  down: {
    from: 'inset(0% 0% 100% 0%)',
    to: 'inset(0% 0% 0% 0%)',
  },
  left: {
    from: 'inset(0% 100% 0% 0%)',
    to: 'inset(0% 0% 0% 0%)',
  },
  right: {
    from: 'inset(0% 0% 0% 100%)',
    to: 'inset(0% 0% 0% 0%)',
  },
};

export function RevealSection({
  children,
  className,
  direction = 'up',
  delay = 0,
}: RevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'start 35%'],
  });

  const config = clipPathConfig[direction];
  const clipPath = useTransform(scrollYProgress, [0, 1], [config.from, config.to]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <motion.div
        style={{ clipPath }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// -----------------------------------------------------
// Horizontal Scroll Section - Side-scrolling content
// -----------------------------------------------------

export interface HorizontalScrollSectionProps {
  children: ReactNode;
  className?: string;
  /** Inner content width as viewport width multiplier */
  contentWidth?: number;
}

export function HorizontalScrollSection({
  children,
  className,
  contentWidth = 3,
}: HorizontalScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${(contentWidth - 1) * 100}%`]
  );
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={ref}
      className={cn('relative', className)}
      style={{ height: `${contentWidth * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full"
          style={{ x: smoothX, width: `${contentWidth * 100}vw` }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

// -----------------------------------------------------
// Mask Reveal - Text/Image revealed through mask
// -----------------------------------------------------

export interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  /** Background color for the mask */
  maskColor?: string;
}

export function MaskReveal({
  children,
  className,
  maskColor = 'bg-highland-gold',
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'start 30%'],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const originX = useTransform(scrollYProgress, [0, 0.5, 0.5, 1], [0, 0, 1, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.5, 1], [0, 0, 1, 1]);

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {/* Content */}
      <motion.div style={{ opacity: contentOpacity }}>
        {children}
      </motion.div>

      {/* Mask overlay */}
      <motion.div
        className={cn('absolute inset-0', maskColor)}
        style={{
          scaleX,
          originX,
        }}
      />
    </div>
  );
}

// -----------------------------------------------------
// Stagger Reveal - Items reveal one by one
// -----------------------------------------------------

export interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay between items */
  stagger?: number;
  /** Animation duration */
  duration?: number;
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
  duration = 0.8,
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerRevealItemProps {
  children: ReactNode;
  className?: string;
  /** Animation type */
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'blur';
}

export function StaggerRevealItem({
  children,
  className,
  animation = 'fade-up',
}: StaggerRevealItemProps) {
  const variants = {
    'fade-up': {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 },
    },
    'fade-down': {
      hidden: { opacity: 0, y: -40 },
      visible: { opacity: 1, y: 0 },
    },
    'fade-left': {
      hidden: { opacity: 0, x: 40 },
      visible: { opacity: 1, x: 0 },
    },
    'fade-right': {
      hidden: { opacity: 0, x: -40 },
      visible: { opacity: 1, x: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
    blur: {
      hidden: { opacity: 0, filter: 'blur(10px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants[animation]}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// -----------------------------------------------------
// Split Text Reveal - Character by character reveal
// -----------------------------------------------------

export interface SplitTextRevealProps {
  text: string;
  className?: string;
  /** Character stagger delay */
  stagger?: number;
  /** Animation type */
  animation?: 'fade' | 'slide' | 'rotate';
}

export function SplitTextReveal({
  text,
  className,
  stagger = 0.02,
  animation = 'slide',
}: SplitTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger * 4,
      },
    },
  };

  const wordVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  const charVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    slide: {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    rotate: {
      hidden: { opacity: 0, rotateX: 90, y: 20 },
      visible: { opacity: 1, rotateX: 0, y: 0 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn('flex flex-wrap', className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-flex mr-[0.25em]"
          variants={wordVariants}
          style={{ perspective: 1000 }}
        >
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              variants={charVariants[animation]}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformOrigin: 'bottom' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
}

// -----------------------------------------------------
// Zoom Parallax - Zoom effect on scroll
// -----------------------------------------------------

export interface ZoomParallaxProps {
  children: ReactNode;
  className?: string;
  /** Maximum zoom scale */
  maxScale?: number;
}

export function ZoomParallax({
  children,
  className,
  maxScale = 1.5,
}: ZoomParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, maxScale, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        style={{ scale, opacity }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

// -----------------------------------------------------
// Section Divider - Animated divider between sections
// -----------------------------------------------------

export interface SectionDividerProps {
  className?: string;
  /** Divider style */
  variant?: 'line' | 'wave' | 'angle' | 'curve';
  /** Color of divider */
  color?: string;
  /** Flip direction */
  flip?: boolean;
}

export function SectionDivider({
  className,
  variant = 'wave',
  color = 'fill-paper-white',
  flip = false,
}: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const smoothPathLength = useSpring(pathLength, { stiffness: 100, damping: 30 });

  const paths = {
    line: 'M0,50 L1440,50',
    wave: 'M0,96L48,90.7C96,85,192,75,288,74.7C384,75,480,85,576,96C672,107,768,117,864,112C960,107,1056,85,1152,80C1248,75,1344,85,1392,90.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    angle: 'M0,0 L1440,96 L1440,0 L0,0 Z',
    curve: 'M0,96 Q720,0 1440,96 L1440,0 L0,0 Z',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative w-full h-24 overflow-hidden',
        flip && 'rotate-180',
        className
      )}
    >
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1440 96"
        preserveAspectRatio="none"
      >
        {variant === 'line' ? (
          <motion.path
            d={paths.line}
            className="stroke-highland-gold"
            strokeWidth="2"
            fill="none"
            style={{ pathLength: smoothPathLength }}
          />
        ) : (
          <path d={paths[variant]} className={color} />
        )}
      </svg>
    </div>
  );
}

// -----------------------------------------------------
// Scroll Progress Indicator
// -----------------------------------------------------

export interface ScrollProgressProps {
  className?: string;
  /** Position of indicator */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Color of progress bar */
  color?: string;
}

export function ScrollProgress({
  className,
  position = 'top',
  color = 'bg-highland-gold',
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const positionClasses = {
    top: 'top-0 left-0 right-0 h-1',
    bottom: 'bottom-0 left-0 right-0 h-1',
    left: 'top-0 left-0 bottom-0 w-1',
    right: 'top-0 right-0 bottom-0 w-1',
  };

  const isVertical = position === 'left' || position === 'right';

  return (
    <motion.div
      className={cn(
        'fixed z-50',
        positionClasses[position],
        color,
        className
      )}
      style={{
        scaleX: isVertical ? 1 : scaleX,
        scaleY: isVertical ? scaleX : 1,
        transformOrigin: isVertical ? 'top' : 'left',
      }}
    />
  );
}

const SectionTransitions = {
  ParallaxSection,
  RevealSection,
  HorizontalScrollSection,
  MaskReveal,
  StaggerReveal,
  StaggerRevealItem,
  SplitTextReveal,
  ZoomParallax,
  SectionDivider,
  ScrollProgress,
};

export default SectionTransitions;
