'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// =====================================================
// FadeIn Component
// Scroll-triggered fade animation with variants
// =====================================================

export interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  /** Animation direction */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Animation delay in seconds */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Distance to travel in pixels */
  distance?: number;
  /** Trigger animation once or every time in view */
  once?: boolean;
  /** Viewport threshold to trigger animation */
  threshold?: number;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

export function FadeIn({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 24,
  once = true,
  threshold = 0.2,
  as: Component = 'div',
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  // Calculate initial position based on direction
  const initialPosition = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...initialPosition,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 1, 0.5, 1], // ease-out-quart
      },
    },
  };

  // Use motion component with dynamic element
  const MotionComponent = motion[Component as keyof typeof motion] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </MotionComponent>
  );
}

// =====================================================
// FadeInStagger Component
// Container for staggered children animations
// =====================================================

export interface FadeInStaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay between children */
  stagger?: number;
  /** Base delay before stagger starts */
  delay?: number;
  /** Trigger animation once */
  once?: boolean;
  /** Viewport threshold */
  threshold?: number;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

export function FadeInStagger({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  once = true,
  threshold = 0.2,
  as: Component = 'div',
}: FadeInStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const MotionComponent = motion[Component as keyof typeof motion] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {children}
    </MotionComponent>
  );
}

// =====================================================
// FadeInStaggerItem Component
// Child item for FadeInStagger
// =====================================================

export interface FadeInStaggerItemProps {
  children: React.ReactNode;
  className?: string;
  /** Animation direction */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Distance to travel */
  distance?: number;
  /** Animation duration */
  duration?: number;
  /** HTML element to render */
  as?: keyof JSX.IntrinsicElements;
}

export function FadeInStaggerItem({
  children,
  className,
  direction = 'up',
  distance = 24,
  duration = 0.5,
  as: Component = 'div',
}: FadeInStaggerItemProps) {
  const initialPosition = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }[direction];

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      ...initialPosition,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  const MotionComponent = motion[Component as keyof typeof motion] as typeof motion.div;

  return (
    <MotionComponent className={className} variants={itemVariants}>
      {children}
    </MotionComponent>
  );
}

export default FadeIn;
