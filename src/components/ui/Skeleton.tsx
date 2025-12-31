'use client';

import { cn } from '@/lib/utils';

// =====================================================
// Base Skeleton Component
// Animated placeholder for loading states
// =====================================================

export interface SkeletonProps {
  className?: string;
  /** Animation style */
  animation?: 'pulse' | 'shimmer' | 'none';
  /** Border radius */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  /** Custom inline styles */
  style?: React.CSSProperties;
}

export function Skeleton({
  className,
  animation = 'shimmer',
  radius = 'md',
  style,
}: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-neutral-200',
        // Border radius
        {
          none: 'rounded-none',
          sm: 'rounded-sm',
          md: 'rounded-md',
          lg: 'rounded-lg',
          full: 'rounded-full',
        }[radius],
        // Animation
        animation === 'pulse' && 'animate-pulse',
        animation === 'shimmer' && 'skeleton-shimmer',
        className
      )}
      style={style}
    />
  );
}

// =====================================================
// Skeleton Text
// For text placeholders
// =====================================================

export interface SkeletonTextProps extends SkeletonProps {
  /** Number of lines */
  lines?: number;
  /** Last line width percentage */
  lastLineWidth?: number;
}

export function SkeletonText({
  className,
  lines = 1,
  lastLineWidth = 75,
  animation = 'shimmer',
}: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          animation={animation}
          radius="sm"
          className={cn(
            'h-4',
            i === lines - 1 && lines > 1 ? `w-[${lastLineWidth}%]` : 'w-full'
          )}
          style={i === lines - 1 && lines > 1 ? { width: `${lastLineWidth}%` } : undefined}
        />
      ))}
    </div>
  );
}

// =====================================================
// Industry Card Skeleton
// Matches IndustryCard layout
// =====================================================

export interface IndustryCardSkeletonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function IndustryCardSkeleton({
  className,
  size = 'md',
}: IndustryCardSkeletonProps) {
  const sizes = {
    sm: 'aspect-square',
    md: 'aspect-[4/3]',
    lg: 'aspect-[3/2]',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-neutral-200',
        sizes[size],
        className
      )}
    >
      {/* Shimmer overlay */}
      <div className="absolute inset-0 skeleton-shimmer" />

      {/* Content placeholders */}
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        {/* Icon placeholder */}
        <Skeleton className="w-8 h-8 mb-3" radius="sm" animation="none" />

        {/* Title placeholder */}
        <Skeleton className="h-6 w-3/4 mb-2" radius="sm" animation="none" />

        {/* Tagline placeholder */}
        <Skeleton className="h-4 w-1/2" radius="sm" animation="none" />
      </div>
    </div>
  );
}

// =====================================================
// News Card Skeleton
// Matches NewsCard layout
// =====================================================

export interface NewsCardSkeletonProps {
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

export function NewsCardSkeleton({
  className,
  layout = 'vertical',
}: NewsCardSkeletonProps) {
  const isHorizontal = layout === 'horizontal';

  return (
    <div
      className={cn(
        isHorizontal ? 'flex gap-6' : 'flex flex-col',
        className
      )}
    >
      {/* Image placeholder */}
      <Skeleton
        className={cn(
          isHorizontal ? 'w-48 flex-shrink-0 aspect-square' : 'aspect-editorial mb-4'
        )}
        radius="lg"
      />

      {/* Content */}
      <div className={cn('flex flex-col flex-1', isHorizontal && 'py-1')}>
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <Skeleton className="h-3 w-16" radius="sm" />
          <Skeleton className="h-3 w-20" radius="sm" />
        </div>

        {/* Title */}
        <Skeleton className="h-6 w-full mb-2" radius="sm" />
        <Skeleton className="h-6 w-3/4 mb-3" radius="sm" />

        {/* Excerpt */}
        <Skeleton className="h-4 w-full mb-1" radius="sm" />
        <Skeleton className="h-4 w-2/3 mb-4" radius="sm" />

        {/* Read more */}
        <Skeleton className="h-4 w-24 mt-auto" radius="sm" />
      </div>
    </div>
  );
}

// =====================================================
// Project Card Skeleton
// Matches ProjectCard layout
// =====================================================

export interface ProjectCardSkeletonProps {
  className?: string;
}

export function ProjectCardSkeleton({ className }: ProjectCardSkeletonProps) {
  return (
    <div className={cn('flex flex-col', className)}>
      {/* Image placeholder with status badge */}
      <div className="relative aspect-editorial overflow-hidden rounded-lg bg-neutral-200 mb-4">
        <div className="absolute inset-0 skeleton-shimmer" />

        {/* Status badge placeholder */}
        <Skeleton
          className="absolute top-4 left-4 h-6 w-20"
          radius="full"
          animation="none"
        />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 mb-2">
        <Skeleton className="h-3 w-20" radius="sm" />
        <Skeleton className="h-3 w-24" radius="sm" />
      </div>

      {/* Title */}
      <Skeleton className="h-6 w-3/4" radius="sm" />
    </div>
  );
}

// =====================================================
// Stat Card Skeleton
// For statistics display
// =====================================================

export interface StatCardSkeletonProps {
  className?: string;
}

export function StatCardSkeleton({ className }: StatCardSkeletonProps) {
  return (
    <div className={cn('text-center', className)}>
      {/* Value */}
      <Skeleton className="h-12 w-24 mx-auto mb-2" radius="sm" />
      {/* Label */}
      <Skeleton className="h-4 w-20 mx-auto" radius="sm" />
    </div>
  );
}

// =====================================================
// Hero Skeleton
// For hero section loading states
// =====================================================

export interface HeroSkeletonProps {
  className?: string;
}

export function HeroSkeleton({ className }: HeroSkeletonProps) {
  return (
    <div className={cn('py-20 md:py-28', className)}>
      {/* Caption */}
      <Skeleton className="h-3 w-24 mb-4" radius="sm" />

      {/* Accent line */}
      <Skeleton className="h-1 w-16 mb-8" radius="none" />

      {/* Heading */}
      <Skeleton className="h-12 w-full max-w-3xl mb-4" radius="sm" />
      <Skeleton className="h-12 w-2/3 max-w-2xl mb-6" radius="sm" />

      {/* Description */}
      <Skeleton className="h-6 w-full max-w-xl mb-2" radius="sm" />
      <Skeleton className="h-6 w-3/4 max-w-lg" radius="sm" />
    </div>
  );
}

// =====================================================
// Section Skeleton
// For entire section loading states
// =====================================================

export interface SectionSkeletonProps {
  className?: string;
  /** Number of cards to show */
  cardCount?: number;
  /** Card type */
  cardType?: 'industry' | 'news' | 'project' | 'stat';
  /** Grid columns */
  cols?: 2 | 3 | 4;
}

export function SectionSkeleton({
  className,
  cardCount = 3,
  cardType = 'news',
  cols = 3,
}: SectionSkeletonProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  const CardSkeleton = {
    industry: IndustryCardSkeleton,
    news: NewsCardSkeleton,
    project: ProjectCardSkeleton,
    stat: StatCardSkeleton,
  }[cardType];

  return (
    <div className={cn('py-16', className)}>
      {/* Section header */}
      <div className="mb-12">
        <Skeleton className="h-3 w-20 mb-4" radius="sm" />
        <Skeleton className="h-8 w-64 mb-4" radius="sm" />
        <Skeleton className="h-5 w-96 max-w-full" radius="sm" />
      </div>

      {/* Cards grid */}
      <div className={cn('grid gap-8', gridCols[cols])}>
        {Array.from({ length: cardCount }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
