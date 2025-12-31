'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getIndustryImageUrl } from '@/lib/directus';
import { Container, Heading, Text, AccentLine, Skeleton, ErrorState } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';
import type { BusinessSector } from '@/types';

// =====================================================
// Industries Section Component
// Grid of business sectors with images
// =====================================================

// Industry icons as simple SVG components
const industryIcons: Record<string, React.ReactNode> = {
  'import-export': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  ),
  'agro-industry': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  ),
  'manufacturing': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
    </svg>
  ),
  'construction': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  'real-estate': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
    </svg>
  ),
  'hospitality': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
    </svg>
  ),
  'tourism': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
    </svg>
  ),
  'general-trading': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  'farming': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  ),
  'social-development': (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
};

export function Industries() {
  const [sectors, setSectors] = useState<BusinessSector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSectors() {
      try {
        // Use proxy route in production (HTTPS) to avoid mixed content blocking
        const apiUrl = window.location.protocol === 'https:'
          ? '/api/directus/items/business_sectors'
          : `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/business_sectors`;
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('Failed to fetch industries');
        const data = await res.json();
        setSectors(data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching sectors:', err);
        setError('Unable to load industries. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchSectors();
  }, []);

  // Grid layout pattern - alternating sizes for visual interest
  const gridPattern = [
    { cols: 'md:col-span-6 lg:col-span-4', aspect: 'aspect-[4/3]' },
    { cols: 'md:col-span-6 lg:col-span-4', aspect: 'aspect-[4/3]' },
    { cols: 'md:col-span-12 lg:col-span-4', aspect: 'aspect-[4/3] lg:aspect-[3/2]' },
    { cols: 'md:col-span-6 lg:col-span-6', aspect: 'aspect-[16/9]' },
    { cols: 'md:col-span-6 lg:col-span-6', aspect: 'aspect-[16/9]' },
    { cols: 'md:col-span-4 lg:col-span-3', aspect: 'aspect-square' },
    { cols: 'md:col-span-4 lg:col-span-3', aspect: 'aspect-square' },
    { cols: 'md:col-span-4 lg:col-span-3', aspect: 'aspect-square' },
    { cols: 'md:col-span-12 lg:col-span-3', aspect: 'aspect-[4/3] md:aspect-[21/9] lg:aspect-square' },
    { cols: 'md:col-span-12', aspect: 'aspect-[21/9]' },
  ];

  return (
    <section
      id="industries"
      className="py-20 md:py-28 lg:py-36 bg-neutral-50"
      aria-label="Our Industries"
    >
      <Container>
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <FadeIn>
            <Text
              size="caption"
              color="gold"
              className="uppercase tracking-wider mb-4"
            >
              Our Industries
            </Text>
            <AccentLine size="md" className="mb-6" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <Heading as="h2" size="h2" className="mb-4">
              A Diversified Ecosystem
            </Heading>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Text size="lg" color="muted" className="max-w-2xl">
              Ten interconnected industries working together to build lasting value
              across Ethiopia and East Africa.
            </Text>
          </FadeIn>
        </div>

        {/* Industries Grid */}
        {loading ? (
          <IndustriesGridSkeleton gridPattern={gridPattern} />
        ) : error ? (
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        ) : (
          <FadeInStagger stagger={0.05} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {sectors.map((sector, index) => {
              const pattern = gridPattern[index % gridPattern.length];

              return (
                <FadeInStaggerItem
                  key={sector.slug}
                  className={pattern.cols}
                >
                  <IndustryCard
                    name={sector.name}
                    tagline={sector.tagline || sector.description?.substring(0, 60) + '...'}
                    slug={sector.slug}
                    icon={industryIcons[sector.slug]}
                    image={getIndustryImageUrl(sector.slug, typeof sector.hero_image === 'string' ? sector.hero_image : sector.hero_image?.id)}
                    aspectRatio={pattern.aspect}
                  />
                </FadeInStaggerItem>
              );
            })}
          </FadeInStagger>
        )}

        {/* View All Link */}
        <FadeIn delay={0.5} className="mt-12 text-center">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 px-8 py-3 border border-earth-anchor text-earth-anchor font-medium rounded hover:bg-earth-anchor hover:text-white transition-colors"
          >
            Explore All Industries
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
      </Container>
    </section>
  );
}

// =====================================================
// Industry Card (Internal Component)
// =====================================================

interface IndustryCardProps {
  name: string;
  tagline: string;
  slug: string;
  icon?: React.ReactNode;
  image?: string;
  aspectRatio?: string;
}

function IndustryCard({
  name,
  tagline,
  slug,
  icon,
  image,
  aspectRatio = 'aspect-[4/3]',
}: IndustryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/industries/${slug}`}
        className={cn(
          'group relative block overflow-hidden rounded-xl bg-earth-anchor',
          aspectRatio
        )}
      >
        {/* Background Image */}
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Hide broken image
              e.currentTarget.style.display = 'none';
            }}
          />
        )}

        {/* Multi-layer gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor via-earth-anchor/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-earth/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:left-[200%] transition-all duration-1000 ease-out" />
        </div>

        {/* Border glow on hover */}
        <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-highland-gold/30 transition-colors duration-500" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6">
          {/* Icon with glow */}
          {icon && (
            <motion.div
              className="mb-3 text-white/60 group-hover:text-highland-gold transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              {icon}
            </motion.div>
          )}

          {/* Name */}
          <h3 className="text-lg md:text-xl font-semibold text-white mb-1.5 group-hover:text-highland-gold transition-colors duration-300">
            {name}
          </h3>

          {/* Accent line under name */}
          <div className="w-0 h-0.5 bg-highland-gold group-hover:w-8 transition-all duration-500 mb-2" />

          {/* Tagline */}
          <p className="text-sm text-white/60 line-clamp-2 group-hover:text-white/80 transition-colors duration-300">
            {tagline}
          </p>

          {/* Explore indicator */}
          <div
            className={cn(
              'mt-4 flex items-center gap-2',
              'text-sm font-medium text-highland-gold',
              'opacity-0 -translate-y-2',
              'group-hover:opacity-100 group-hover:translate-y-0',
              'transition-all duration-300 delay-100 ease-out'
            )}
          >
            Explore
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </motion.svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default Industries;

// =====================================================
// Industries Grid Skeleton
// =====================================================

interface GridPattern {
  cols: string;
  aspect: string;
}

function IndustriesGridSkeleton({ gridPattern }: { gridPattern: GridPattern[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {gridPattern.map((pattern, index) => (
        <div key={index} className={pattern.cols}>
          <div className={cn(
            'relative rounded-xl bg-neutral-200 overflow-hidden',
            pattern.aspect
          )}>
            {/* Shimmer overlay */}
            <div className="absolute inset-0 skeleton-shimmer" />

            {/* Content placeholders */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6">
              {/* Icon placeholder */}
              <Skeleton className="w-8 h-8 mb-3 bg-neutral-300" radius="sm" animation="none" />

              {/* Title placeholder */}
              <Skeleton className="h-6 w-3/4 mb-2 bg-neutral-300" radius="sm" animation="none" />

              {/* Tagline placeholder */}
              <Skeleton className="h-4 w-1/2 bg-neutral-300" radius="sm" animation="none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
