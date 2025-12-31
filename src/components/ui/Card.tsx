'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Overline, Heading, Text } from './Typography';

// =====================================================
// Card Component
// Versatile card with hover animations
// =====================================================

export interface CardProps extends Omit<HTMLMotionProps<'article'>, 'ref'> {
  /** Card variant */
  variant?: 'default' | 'elevated' | 'bordered' | 'ghost';
  /** Enable hover effects */
  interactive?: boolean;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Border radius */
  radius?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = forwardRef<HTMLElement, CardProps>(
  (
    {
      className,
      variant = 'default',
      interactive = false,
      padding = 'md',
      radius = 'md',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.article
        ref={ref}
        className={cn(
          'relative overflow-hidden',

          // Variant styles
          {
            default: 'bg-paper-white',
            elevated: 'bg-paper-white shadow-card',
            bordered: 'bg-paper-white border border-neutral-200',
            ghost: 'bg-transparent',
          }[variant],

          // Padding
          {
            none: 'p-0',
            sm: 'p-4',
            md: 'p-6',
            lg: 'p-8',
          }[padding],

          // Border radius
          {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
          }[radius],

          // Interactive styles
          interactive && 'cursor-pointer card-hover',

          className
        )}
        {...(interactive && {
          whileHover: { y: -4 },
          transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
        })}
        {...props}
      >
        {children}
      </motion.article>
    );
  }
);

Card.displayName = 'Card';

export { Card };

// =====================================================
// Industry Card Component
// For displaying business sectors
// =====================================================

export interface IndustryCardProps extends HTMLAttributes<HTMLAnchorElement> {
  /** Industry name */
  name: string;
  /** Industry tagline */
  tagline?: string;
  /** URL slug */
  slug: string;
  /** Background image URL */
  image?: string;
  /** Icon (SVG string or component) */
  icon?: React.ReactNode;
  /** Card size */
  size?: 'sm' | 'md' | 'lg';
}

const IndustryCard = forwardRef<HTMLAnchorElement, IndustryCardProps>(
  (
    {
      className,
      name,
      tagline,
      slug,
      image,
      icon,
      size = 'md',
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: 'aspect-square',
      md: 'aspect-[4/3]',
      lg: 'aspect-[3/2]',
    };

    return (
      <Link
        ref={ref}
        href={`/industries/${slug}`}
        className={cn(
          'group relative block overflow-hidden rounded-lg',
          sizes[size],
          className
        )}
        {...props}
      >
        {/* Background Image */}
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            className={cn(
              'object-cover transition-all duration-slow ease-out-expo',
              'grayscale group-hover:grayscale-0',
              'scale-100 group-hover:scale-105'
            )}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZThlNGRmIi8+PC9zdmc+"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Overlay */}
        <div
          className={cn(
            'absolute inset-0',
            'bg-gradient-to-t from-earth-anchor/80 via-earth-anchor/40 to-transparent',
            'transition-opacity duration-normal',
            'opacity-100 group-hover:opacity-90'
          )}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          {/* Icon */}
          {icon && (
            <div className="mb-3 text-paper-white/80">
              {icon}
            </div>
          )}

          {/* Name */}
          <Heading
            as="h3"
            size="h4"
            color="white"
            className="mb-1"
          >
            {name}
          </Heading>

          {/* Tagline */}
          {tagline && (
            <Text
              size="sm"
              className="text-paper-white/70 line-clamp-2"
            >
              {tagline}
            </Text>
          )}

          {/* Explore CTA */}
          <motion.span
            className={cn(
              'mt-3 inline-flex items-center gap-2',
              'text-sm text-highland-gold font-medium',
              'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0',
              'transition-all duration-normal ease-out-expo'
            )}
          >
            Explore
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.span>
        </div>
      </Link>
    );
  }
);

IndustryCard.displayName = 'IndustryCard';

export { IndustryCard };

// =====================================================
// News Card Component
// For displaying news articles
// =====================================================

export interface NewsCardProps extends HTMLAttributes<HTMLAnchorElement> {
  /** Article title */
  title: string;
  /** Article excerpt */
  excerpt?: string;
  /** Category label */
  category: string;
  /** Publish date */
  date: string;
  /** URL slug */
  slug: string;
  /** Featured image */
  image?: string;
  /** Card layout */
  layout?: 'vertical' | 'horizontal';
}

const NewsCard = forwardRef<HTMLAnchorElement, NewsCardProps>(
  (
    {
      className,
      title,
      excerpt,
      category,
      date,
      slug,
      image,
      layout = 'vertical',
      ...props
    },
    ref
  ) => {
    const isHorizontal = layout === 'horizontal';

    return (
      <Link
        ref={ref}
        href={`/news/${slug}`}
        className={cn(
          'group block card-hover',
          isHorizontal ? 'flex gap-6' : 'flex flex-col',
          className
        )}
        {...props}
      >
        {/* Image */}
        {image && (
          <div
            className={cn(
              'relative overflow-hidden rounded-lg bg-neutral-100',
              isHorizontal ? 'w-48 flex-shrink-0 aspect-square' : 'aspect-editorial mb-4'
            )}
          >
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-slow ease-out-expo group-hover:scale-105"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZThlNGRmIi8+PC9zdmc+"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Content */}
        <div className={cn('flex flex-col', isHorizontal && 'flex-1 py-1')}>
          {/* Meta */}
          <div className="flex items-center gap-3 mb-2">
            <Overline color="gold">{category}</Overline>
            <span className="text-neutral-300">•</span>
            <Text size="caption" color="muted">{date}</Text>
          </div>

          {/* Title */}
          <Heading
            as="h3"
            size="h4"
            className={cn(
              'mb-2 line-clamp-2',
              'group-hover:text-highland-gold transition-colors duration-fast'
            )}
          >
            {title}
          </Heading>

          {/* Excerpt */}
          {excerpt && (
            <Text size="sm" color="muted" className="line-clamp-2">
              {excerpt}
            </Text>
          )}

          {/* Read more */}
          <span
            className={cn(
              'mt-auto pt-3 inline-flex items-center gap-2',
              'text-sm font-medium text-earth-anchor',
              'group-hover:text-highland-gold transition-colors duration-fast'
            )}
          >
            Read more
            <svg
              className="w-4 h-4 transition-transform duration-fast group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </div>
      </Link>
    );
  }
);

NewsCard.displayName = 'NewsCard';

export { NewsCard };

// =====================================================
// Project Card Component
// For displaying portfolio projects
// =====================================================

export interface ProjectCardProps extends HTMLAttributes<HTMLAnchorElement> {
  /** Project title */
  title: string;
  /** Project location */
  location: string;
  /** Industry/sector */
  sector: string;
  /** Project status */
  status: 'completed' | 'in_progress' | 'planned';
  /** URL slug */
  slug: string;
  /** Featured image */
  image?: string;
}

const ProjectCard = forwardRef<HTMLAnchorElement, ProjectCardProps>(
  (
    {
      className,
      title,
      location,
      sector,
      status,
      slug,
      image,
      ...props
    },
    ref
  ) => {
    const statusLabels = {
      completed: 'Completed',
      in_progress: 'In Progress',
      planned: 'Planned',
    };

    return (
      <Link
        ref={ref}
        href={`/projects/${slug}`}
        className={cn(
          'group block card-hover',
          className
        )}
        {...props}
      >
        {/* Image */}
        <div className="relative aspect-editorial overflow-hidden rounded-lg bg-neutral-100 mb-4">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-slow ease-out-expo group-hover:scale-105"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZThlNGRmIi8+PC9zdmc+"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          {/* Status badge */}
          <div
            className={cn(
              'absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium',
              {
                completed: 'bg-eucalyptus text-paper-white',
                in_progress: 'bg-highland-gold text-earth-anchor',
                planned: 'bg-neutral-200 text-neutral-600',
              }[status]
            )}
          >
            {statusLabels[status]}
          </div>
        </div>

        {/* Content */}
        <div>
          {/* Meta */}
          <div className="flex items-center gap-2 mb-2">
            <Text size="caption" color="muted">{sector}</Text>
            <span className="text-neutral-300">•</span>
            <Text size="caption" color="muted">{location}</Text>
          </div>

          {/* Title */}
          <Heading
            as="h3"
            size="h4"
            className="group-hover:text-highland-gold transition-colors duration-fast"
          >
            {title}
          </Heading>
        </div>
      </Link>
    );
  }
);

ProjectCard.displayName = 'ProjectCard';

export { ProjectCard };
