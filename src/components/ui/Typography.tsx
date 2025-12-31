import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// =====================================================
// Typography Components
// Consistent text styling across the application
// =====================================================

// ─────────────────────────────────────────────────
// Heading Component
// ─────────────────────────────────────────────────

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Heading level (semantic) */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /** Visual size (can differ from semantic level) */
  size?: 'display-xl' | 'display-lg' | 'h1' | 'h2' | 'h3' | 'h4';
  /** Color variant */
  color?: 'default' | 'muted' | 'gold' | 'white';
  /** Text balance for better wrapping */
  balance?: boolean;
}

const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      as: Component = 'h2',
      size,
      color = 'default',
      balance = true,
      children,
      ...props
    },
    ref
  ) => {
    // Default size based on semantic level if not specified
    const visualSize = size || {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h4',
      h6: 'h4',
    }[Component] as HeadingProps['size'];

    return (
      <Component
        ref={ref}
        className={cn(
          'font-semibold tracking-tight',

          // Size styles
          {
            'display-xl': 'text-5xl md:text-6xl lg:text-display-xl leading-[0.96]',
            'display-lg': 'text-4xl md:text-5xl lg:text-display-lg leading-[0.97]',
            h1: 'text-3xl md:text-4xl lg:text-h1 leading-[1.05]',
            h2: 'text-2xl md:text-3xl lg:text-h2 leading-[1.1]',
            h3: 'text-xl md:text-2xl lg:text-h3 leading-[1.2]',
            h4: 'text-lg md:text-xl lg:text-h4 leading-[1.3]',
          }[visualSize!],

          // Color styles
          {
            default: 'text-earth-anchor',
            muted: 'text-neutral-600',
            gold: 'text-highland-gold',
            white: 'text-paper-white',
          }[color],

          // Text balance
          balance && 'text-balance',

          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';

export { Heading };

// ─────────────────────────────────────────────────
// Text Component (Body text)
// ─────────────────────────────────────────────────

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Text size variant */
  size?: 'lg' | 'base' | 'sm' | 'caption';
  /** Color variant */
  color?: 'default' | 'muted' | 'gold' | 'white' | 'inherit';
  /** Font weight */
  weight?: 'normal' | 'medium' | 'semibold';
  /** Render as different element */
  as?: 'p' | 'span' | 'div';
  /** Lead paragraph (first paragraph styling) */
  lead?: boolean;
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      size = 'base',
      color = 'default',
      weight = 'normal',
      as: Component = 'p',
      lead = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          // Size styles
          lead
            ? 'text-lg md:text-xl lg:text-body-lg leading-relaxed'
            : {
                lg: 'text-lg md:text-body-lg leading-relaxed',
                base: 'text-base md:text-body leading-relaxed',
                sm: 'text-sm md:text-body-sm leading-normal',
                caption: 'text-xs md:text-caption leading-normal',
              }[size],

          // Color styles
          {
            default: 'text-earth-anchor',
            muted: 'text-neutral-500',
            gold: 'text-highland-gold',
            white: 'text-paper-white',
            inherit: 'text-inherit',
          }[color],

          // Weight styles
          {
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
          }[weight],

          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = 'Text';

export { Text };

// ─────────────────────────────────────────────────
// Overline Component
// ─────────────────────────────────────────────────

export interface OverlineProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color variant */
  color?: 'default' | 'gold' | 'white' | 'muted';
}

const Overline = forwardRef<HTMLSpanElement, OverlineProps>(
  ({ className, color = 'gold', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'text-xs md:text-overline font-medium uppercase tracking-wider',

          // Color styles
          {
            default: 'text-earth-anchor',
            gold: 'text-highland-gold',
            white: 'text-paper-white',
            muted: 'text-neutral-500',
          }[color],

          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Overline.displayName = 'Overline';

export { Overline };

// ─────────────────────────────────────────────────
// Stat Component (Large numbers)
// ─────────────────────────────────────────────────

export interface StatProps extends HTMLAttributes<HTMLSpanElement> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  color?: 'default' | 'gold' | 'white';
}

const Stat = forwardRef<HTMLSpanElement, StatProps>(
  ({ className, size = 'md', color = 'default', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'font-light tracking-tight tabular-nums',

          // Size styles
          {
            sm: 'text-3xl md:text-4xl lg:text-stat-sm',
            md: 'text-4xl md:text-5xl lg:text-stat',
            lg: 'text-5xl md:text-6xl lg:text-7xl',
          }[size],

          // Color styles
          {
            default: 'text-earth-anchor',
            gold: 'text-highland-gold',
            white: 'text-paper-white',
          }[color],

          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Stat.displayName = 'Stat';

export { Stat };

// ─────────────────────────────────────────────────
// Rich Text Component (For CMS content)
// ─────────────────────────────────────────────────

export interface RichTextProps extends HTMLAttributes<HTMLDivElement> {
  /** HTML content from CMS */
  html: string;
  /** Size variant */
  size?: 'sm' | 'base' | 'lg';
}

const RichText = forwardRef<HTMLDivElement, RichTextProps>(
  ({ className, html, size = 'base', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'prose prose-earth max-w-none',

          // Size variants
          {
            sm: 'prose-sm',
            base: 'prose-base',
            lg: 'prose-lg',
          }[size],

          // Custom prose styles
          'prose-headings:font-semibold prose-headings:tracking-tight',
          'prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg',
          'prose-p:text-neutral-700 prose-p:leading-relaxed',
          'prose-a:text-highland-gold prose-a:no-underline hover:prose-a:underline',
          'prose-strong:text-earth-anchor prose-strong:font-semibold',
          'prose-ul:list-disc prose-ol:list-decimal',
          'prose-li:text-neutral-700',
          'prose-blockquote:border-l-highland-gold prose-blockquote:text-neutral-600',
          'prose-img:rounded-lg',

          className
        )}
        dangerouslySetInnerHTML={{ __html: html }}
        {...props}
      />
    );
  }
);

RichText.displayName = 'RichText';

export { RichText };

// ─────────────────────────────────────────────────
// Accent Line Component
// ─────────────────────────────────────────────────

export interface AccentLineProps extends HTMLAttributes<HTMLDivElement> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
}

const AccentLine = forwardRef<HTMLDivElement, AccentLineProps>(
  ({ className, size = 'md', orientation = 'horizontal', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-highland-gold',

          orientation === 'horizontal'
            ? {
                sm: 'w-4 h-0.5',
                md: 'w-6 h-0.5',
                lg: 'w-12 h-0.5',
              }[size]
            : {
                sm: 'w-0.5 h-4',
                md: 'w-0.5 h-6',
                lg: 'w-0.5 h-12',
              }[size],

          className
        )}
        {...props}
      />
    );
  }
);

AccentLine.displayName = 'AccentLine';

export { AccentLine };
