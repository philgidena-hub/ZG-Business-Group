'use client';

import { forwardRef, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

// =====================================================
// Button Component
// Premium, AWWWARDS-level button with refined interactions
// =====================================================

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children'> {
  children?: ReactNode;
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Full width button */
  fullWidth?: boolean;
  /** Show arrow icon */
  withArrow?: boolean;
  /** Loading state */
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      withArrow = false,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center',
          'font-medium tracking-tight',
          'transition-colors duration-fast ease-out-quart',
          'focus-ring',
          'disabled:pointer-events-none disabled:opacity-50',

          // Variant styles
          {
            // Primary - Highland Gold background
            primary: [
              'bg-highland-gold text-earth-anchor',
              'hover:bg-earth-anchor hover:text-paper-white',
            ],
            // Secondary - Earth Anchor background
            secondary: [
              'bg-earth-anchor text-paper-white',
              'hover:bg-coffee-earth',
            ],
            // Ghost - No background
            ghost: [
              'bg-transparent text-earth-anchor',
              'hover:bg-neutral-100',
            ],
            // Outline - Border only
            outline: [
              'border border-earth-anchor text-earth-anchor bg-transparent',
              'hover:bg-earth-anchor hover:text-paper-white',
            ],
          }[variant],

          // Size styles
          {
            sm: 'h-9 px-4 text-sm gap-2',
            md: 'h-11 px-6 text-base gap-2.5',
            lg: 'h-14 px-8 text-lg gap-3',
          }[size],

          // Full width
          fullWidth && 'w-full',

          className
        )}
        disabled={isDisabled}
        whileTap={{ scale: isDisabled ? 1 : 0.98 }}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            aria-hidden="true"
          >
            <svg
              className="h-5 w-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="sr-only">Loading</span>
          </motion.span>
        )}

        {/* Content */}
        <span
          className={cn(
            'inline-flex items-center gap-inherit',
            isLoading && 'invisible'
          )}
        >
          {children}

          {/* Arrow icon */}
          {withArrow && (
            <motion.svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          )}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };

// =====================================================
// Button Link Variant
// For use with Next.js Link component
// =====================================================

export interface ButtonLinkProps {
  href: string;
  children?: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  withArrow?: boolean;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ href, className, variant = 'primary', size = 'md', fullWidth, withArrow, children }, ref) => {
    return (
      <motion.a
        ref={ref}
        href={href}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center',
          'font-medium tracking-tight',
          'transition-colors duration-fast ease-out-quart',
          'focus-ring',
          'no-underline',

          // Variant styles
          {
            primary: [
              'bg-highland-gold text-earth-anchor',
              'hover:bg-earth-anchor hover:text-paper-white',
            ],
            secondary: [
              'bg-earth-anchor text-paper-white',
              'hover:bg-coffee-earth',
            ],
            ghost: [
              'bg-transparent text-earth-anchor',
              'hover:bg-neutral-100',
            ],
            outline: [
              'border border-earth-anchor text-earth-anchor bg-transparent',
              'hover:bg-earth-anchor hover:text-paper-white',
            ],
          }[variant],

          // Size styles
          {
            sm: 'h-9 px-4 text-sm gap-2',
            md: 'h-11 px-6 text-base gap-2.5',
            lg: 'h-14 px-8 text-lg gap-3',
          }[size],

          fullWidth && 'w-full',

          className
        )}
        whileTap={{ scale: 0.98 }}
      >
        {children}

        {withArrow && (
          <motion.svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </motion.svg>
        )}
      </motion.a>
    );
  }
);

ButtonLink.displayName = 'ButtonLink';
