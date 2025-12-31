'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Container, Heading, Text, AccentLine, Skeleton, ErrorState } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';
import { formatDate } from '@/lib/utils';

// =====================================================
// Latest News Section Component
// Recent news and announcements
// =====================================================

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publish_date: string;
  is_featured: boolean;
}

// Placeholder images for news articles (African/Ethiopian context)
const newsImages = [
  'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80', // African market
  'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80', // African business
  'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80', // African commerce
];

export function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        // Use proxy route in production (HTTPS) to avoid mixed content blocking
        const apiUrl = window.location.protocol === 'https:'
          ? '/api/directus/items/news?limit=3'
          : `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/news?limit=3`;
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('Failed to fetch news');
        const data = await res.json();
        setNews(data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Unable to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <section
      className="py-20 md:py-28 lg:py-36 bg-neutral-50"
      aria-label="Latest News"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <FadeIn>
              <Text
                size="caption"
                color="gold"
                className="uppercase tracking-wider mb-4"
              >
                Latest Updates
              </Text>
              <AccentLine size="md" className="mb-6" />
            </FadeIn>

            <FadeIn delay={0.1}>
              <Heading as="h2" size="h2">
                News & Insights
              </Heading>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-earth-anchor font-medium hover:text-highland-gold transition-colors"
            >
              View All News
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </FadeIn>
        </div>

        {/* News Grid */}
        {loading ? (
          <NewsGridSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        ) : (
          <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {news.map((article, index) => (
              <FadeInStaggerItem key={article.id}>
                <NewsCardCustom
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category || 'News'}
                  date={article.publish_date ? formatDate(article.publish_date) : ''}
                  slug={article.slug}
                  image={newsImages[index % newsImages.length]}
                />
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        )}
      </Container>
    </section>
  );
}

// =====================================================
// Custom News Card for this section
// =====================================================

interface NewsCardCustomProps {
  title: string;
  excerpt: string;
  category: string;
  categoryColor?: string;
  date: string;
  slug: string;
  image: string;
}

function NewsCardCustom({
  title,
  excerpt,
  category,
  categoryColor = '#C4A035',
  date,
  slug,
  image,
}: NewsCardCustomProps) {
  return (
    <Link
      href={`/news/${slug}`}
      className={cn(
        'group flex flex-col h-full',
        'bg-paper-white rounded-lg overflow-hidden',
        'border border-neutral-200',
        'transition-all duration-normal ease-out-quart',
        'hover:border-neutral-300 hover:shadow-card'
      )}
    >
      {/* Image */}
      <div className="relative aspect-editorial bg-neutral-100 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-slow group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: categoryColor }}
          >
            {category}
          </span>
          <span className="text-neutral-300">•</span>
          <Text size="caption" color="muted">
            {date}
          </Text>
        </div>

        {/* Title */}
        <Heading
          as="h3"
          size="h4"
          className={cn(
            'mb-3 line-clamp-2',
            'group-hover:text-highland-gold transition-colors duration-fast'
          )}
        >
          {title}
        </Heading>

        {/* Excerpt */}
        <Text size="sm" color="muted" className="line-clamp-3 mb-4">
          {excerpt}
        </Text>

        {/* Read More */}
        <div className="mt-auto pt-4">
          <span
            className={cn(
              'inline-flex items-center gap-2',
              'text-sm font-medium text-earth-anchor',
              'group-hover:text-highland-gold transition-colors duration-fast'
            )}
          >
            Read article
            <svg
              className="w-4 h-4 transition-transform duration-fast group-hover:translate-x-1"
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
          </span>
        </div>
      </div>
    </Link>
  );
}

export default LatestNews;

// =====================================================
// News Grid Skeleton
// =====================================================

function NewsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex flex-col bg-paper-white rounded-lg overflow-hidden border border-neutral-200"
        >
          {/* Image placeholder */}
          <div className="relative aspect-editorial bg-neutral-200 overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6">
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
            <Skeleton className="h-4 w-full mb-1" radius="sm" />
            <Skeleton className="h-4 w-2/3 mb-4" radius="sm" />

            {/* Read more */}
            <div className="mt-auto pt-4">
              <Skeleton className="h-4 w-24" radius="sm" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
