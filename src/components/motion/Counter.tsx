'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView, useSpring, useTransform, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// =====================================================
// Counter Component
// Animated number counter with scroll trigger
// =====================================================

export interface CounterProps {
  /** Target number to count to */
  value: number;
  /** Duration in seconds */
  duration?: number;
  /** Delay before starting */
  delay?: number;
  /** Prefix (e.g., "$") */
  prefix?: string;
  /** Suffix (e.g., "+", "%", "M") */
  suffix?: string;
  /** Number of decimal places */
  decimals?: number;
  /** Use thousand separators */
  separator?: boolean;
  /** Additional class names */
  className?: string;
  /** Trigger animation once */
  once?: boolean;
}

export function Counter({
  value,
  duration = 2,
  delay = 0,
  prefix = '',
  suffix = '',
  decimals = 0,
  separator = true,
  className,
  once = true,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const [hasStarted, setHasStarted] = useState(false);

  // Spring animation for smooth counting
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  // Transform spring value to formatted string
  const displayValue = useTransform(springValue, (latest) => {
    const num = decimals > 0 ? latest.toFixed(decimals) : Math.round(latest);
    if (separator) {
      return Number(num).toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    return num.toString();
  });

  // Start animation when in view
  useEffect(() => {
    if (isInView && !hasStarted) {
      const timeout = setTimeout(() => {
        springValue.set(value);
        setHasStarted(true);
      }, delay * 1000);

      return () => clearTimeout(timeout);
    }
  }, [isInView, hasStarted, value, springValue, delay]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

// =====================================================
// StatCounter Component
// Complete stat display with label
// =====================================================

export interface StatCounterProps extends CounterProps {
  /** Label text below the number */
  label: string;
  /** Label color */
  labelColor?: 'default' | 'muted' | 'white';
  /** Number color */
  numberColor?: 'default' | 'gold' | 'white';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

export function StatCounter({
  label,
  labelColor = 'muted',
  numberColor = 'default',
  size = 'md',
  ...counterProps
}: StatCounterProps) {
  const numberSizes = {
    sm: 'text-3xl md:text-4xl',
    md: 'text-4xl md:text-5xl lg:text-stat',
    lg: 'text-5xl md:text-6xl lg:text-7xl',
  };

  const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const numberColors = {
    default: 'text-earth-anchor',
    gold: 'text-highland-gold',
    white: 'text-paper-white',
  };

  const labelColors = {
    default: 'text-earth-anchor',
    muted: 'text-neutral-500',
    white: 'text-paper-white/70',
  };

  return (
    <div className="text-center">
      <Counter
        {...counterProps}
        className={cn(
          'block font-light tracking-tight',
          numberSizes[size],
          numberColors[numberColor]
        )}
      />
      <span
        className={cn(
          'block mt-2 uppercase tracking-wider',
          labelSizes[size],
          labelColors[labelColor]
        )}
      >
        {label}
      </span>
    </div>
  );
}

export default Counter;
