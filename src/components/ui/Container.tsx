import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// =====================================================
// Container Component
// Responsive max-width wrapper with consistent margins
// =====================================================

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Container size variant */
  size?: 'default' | 'narrow' | 'prose' | 'full';
  /** Center content vertically */
  centerY?: boolean;
  /** HTML element to render as */
  as?: 'div' | 'section' | 'article' | 'main' | 'aside';
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size = 'default',
      centerY = false,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'w-full mx-auto',
          // Horizontal padding
          'px-5 md:px-10 lg:px-18',

          // Max width based on size
          {
            default: 'max-w-content',    // 1440px
            narrow: 'max-w-narrow',      // 1040px
            prose: 'max-w-prose',        // 672px
            full: 'max-w-none px-0',     // Full width
          }[size],

          // Vertical centering
          centerY && 'flex flex-col justify-center',

          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

export { Container };

// =====================================================
// Section Component
// Semantic section wrapper with consistent vertical spacing
// =====================================================

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Section size - affects vertical padding */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Background color variant */
  background?: 'paper' | 'earth' | 'coffee' | 'neutral';
  /** Container size within section */
  containerSize?: ContainerProps['size'];
  /** Disable container (full-width content) */
  noContainer?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      size = 'md',
      background = 'paper',
      containerSize = 'default',
      noContainer = false,
      children,
      ...props
    },
    ref
  ) => {
    const content = noContainer ? (
      children
    ) : (
      <Container size={containerSize}>{children}</Container>
    );

    return (
      <section
        ref={ref}
        className={cn(
          // Vertical padding based on size
          {
            sm: 'py-12 md:py-16 lg:py-20',
            md: 'py-16 md:py-20 lg:py-24',
            lg: 'py-20 md:py-24 lg:py-32',
            xl: 'py-24 md:py-32 lg:py-40',
          }[size],

          // Background colors
          {
            paper: 'bg-paper-white',
            earth: 'bg-earth-anchor text-paper-white',
            coffee: 'bg-coffee-earth text-paper-white',
            neutral: 'bg-neutral-50',
          }[background],

          className
        )}
        {...props}
      >
        {content}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };

// =====================================================
// Grid Component
// 12-column responsive grid system
// =====================================================

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns on desktop */
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  /** Gap size */
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  /** Align items */
  align?: 'start' | 'center' | 'end' | 'stretch';
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      cols = 12,
      gap = 'md',
      align = 'stretch',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',

          // Column count
          {
            1: 'grid-cols-1',
            2: 'grid-cols-1 md:grid-cols-2',
            3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
            6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
            12: 'grid-cols-4 md:grid-cols-8 lg:grid-cols-12',
          }[cols],

          // Gap sizes
          {
            sm: 'gap-4',
            md: 'gap-6',
            lg: 'gap-8',
            xl: 'gap-12',
          }[gap],

          // Alignment
          {
            start: 'items-start',
            center: 'items-center',
            end: 'items-end',
            stretch: 'items-stretch',
          }[align],

          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

export { Grid };

// =====================================================
// Column Component
// For use within Grid
// =====================================================

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
  /** Column span on mobile */
  span?: number;
  /** Column span on tablet (md) */
  md?: number;
  /** Column span on desktop (lg) */
  lg?: number;
  /** Column start position */
  start?: number;
  /** Start position on tablet */
  mdStart?: number;
  /** Start position on desktop */
  lgStart?: number;
}

const Col = forwardRef<HTMLDivElement, ColProps>(
  (
    {
      className,
      span,
      md,
      lg,
      start,
      mdStart,
      lgStart,
      children,
      ...props
    },
    ref
  ) => {
    // Build dynamic classes
    const spanClasses = [];

    if (span) spanClasses.push(`col-span-${span}`);
    if (md) spanClasses.push(`md:col-span-${md}`);
    if (lg) spanClasses.push(`lg:col-span-${lg}`);
    if (start) spanClasses.push(`col-start-${start}`);
    if (mdStart) spanClasses.push(`md:col-start-${mdStart}`);
    if (lgStart) spanClasses.push(`lg:col-start-${lgStart}`);

    return (
      <div
        ref={ref}
        className={cn(spanClasses.join(' '), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Col.displayName = 'Col';

export { Col };
