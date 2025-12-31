'use client';

import { ReactNode, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

// =====================================================
// Page Transition Components
// AWWWARDS-style scroll effects and section transitions
// =====================================================

// -----------------------------------------------------
// Scroll Progress Indicator - Golden progress bar
// -----------------------------------------------------

export function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-highland-gold z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}

// -----------------------------------------------------
// Section Wrapper - Adds smooth transitions between sections
// -----------------------------------------------------

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  /** Add a decorative divider at the top */
  divider?: 'wave' | 'curve' | 'angle' | 'none';
  /** Divider fill color */
  dividerColor?: string;
  /** Enable parallax effect */
  parallax?: boolean;
}

export function SectionWrapper({
  children,
  className,
  divider = 'none',
  dividerColor = 'fill-paper-white',
  parallax = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  const dividerPaths = {
    wave: 'M0,64L48,58.7C96,53,192,43,288,42.7C384,43,480,53,576,64C672,75,768,85,864,80C960,75,1056,53,1152,48C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z',
    curve: 'M0,64 Q720,0 1440,64 L1440,0 L0,0 Z',
    angle: 'M0,0 L1440,64 L1440,0 L0,0 Z',
    none: '',
  };

  return (
    <div ref={ref} className={cn('relative', className)}>
      {/* Decorative Divider */}
      {divider !== 'none' && (
        <div className="absolute -top-16 left-0 right-0 h-16 overflow-hidden pointer-events-none">
          <svg
            className="absolute bottom-0 w-full h-full"
            viewBox="0 0 1440 64"
            preserveAspectRatio="none"
          >
            <path d={dividerPaths[divider]} className={dividerColor} />
          </svg>
        </div>
      )}

      {/* Section Content */}
      {parallax ? (
        <motion.div style={{ y: smoothY }}>{children}</motion.div>
      ) : (
        children
      )}
    </div>
  );
}

// -----------------------------------------------------
// Reveal On Scroll - Elements reveal as they enter viewport
// -----------------------------------------------------

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  /** Animation direction */
  direction?: 'up' | 'down' | 'left' | 'right';
  /** Delay in seconds */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
}

export function RevealOnScroll({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.8,
}: RevealOnScrollProps) {
  const directionMap = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { y: 0, x: 60 },
    right: { y: 0, x: -60 },
  };

  const initial = {
    opacity: 0,
    ...directionMap[direction],
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// -----------------------------------------------------
// Magnetic Hover - Elements follow cursor slightly
// -----------------------------------------------------

interface MagneticHoverProps {
  children: ReactNode;
  className?: string;
  /** Magnetic strength (1-10) */
  strength?: number;
}

export function MagneticHover({
  children,
  className,
  strength = 3,
}: MagneticHoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (strength * 2);
    const deltaY = (e.clientY - centerY) / (strength * 2);

    ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)';
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn('transition-transform duration-300 ease-out', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// -----------------------------------------------------
// Smooth Scroll Link - Animated scroll to anchor
// -----------------------------------------------------

interface SmoothScrollLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Offset from top in pixels */
  offset?: number;
}

export function SmoothScrollLink({
  href,
  children,
  className,
  offset = 100,
}: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const target = document.getElementById(targetId);

    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

// -----------------------------------------------------
// Text Scramble Effect - Text scrambles then reveals
// -----------------------------------------------------

interface TextScrambleProps {
  text: string;
  className?: string;
  /** Characters to use for scramble effect */
  chars?: string;
}

export function TextScramble({
  text,
  className,
  chars = '!<>-_\\/[]{}—=+*^?#________',
}: TextScrambleProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// -----------------------------------------------------
// Cursor Follower - Custom cursor that follows mouse
// -----------------------------------------------------

export function CursorFollower() {
  return (
    <motion.div
      className="fixed w-6 h-6 rounded-full border-2 border-highland-gold pointer-events-none z-[200] mix-blend-difference hidden lg:block"
      animate={{
        x: typeof window !== 'undefined' ? 0 : 0,
        y: typeof window !== 'undefined' ? 0 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
      }}
    />
  );
}

const PageTransitions = {
  ScrollProgressIndicator,
  SectionWrapper,
  RevealOnScroll,
  MagneticHover,
  SmoothScrollLink,
  TextScramble,
  CursorFollower,
};

export default PageTransitions;
