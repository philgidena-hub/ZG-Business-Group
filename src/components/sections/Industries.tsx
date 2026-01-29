'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';
import { businessSectors } from '@/lib/mock-data';
import type { BusinessSector } from '@/types';

// =====================================================
// Industries Section Component
// Grid of business sectors with logos
// =====================================================

export function Industries() {
  // Use mock data directly - no Directus dependency
  const sectors = businessSectors as BusinessSector[];

  return (
    <section
      id="industries"
      className="py-20 md:py-28 lg:py-36 bg-neutral-50"
      aria-label="Our Companies"
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
              Our Companies
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
              Eleven interconnected companies working together to build lasting value
              across Ethiopia and East Africa.
            </Text>
          </FadeIn>
        </div>

        {/* Companies Grid - Show first 6 companies on homepage */}
        <FadeInStagger stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.slice(0, 6).map((sector) => (
            <FadeInStaggerItem key={sector.slug}>
              <CompanyCard
                name={sector.name}
                tagline={sector.tagline || ''}
                slug={sector.slug}
                introduction={sector.introduction || ''}
                logo={sector.logo}
                location={sector.location}
              />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>

        {/* View All Link */}
        <FadeIn delay={0.5} className="mt-12 text-center">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 px-8 py-3 border border-earth-anchor text-earth-anchor font-medium rounded hover:bg-earth-anchor hover:text-white transition-colors"
          >
            View All Companies
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
// Company Card (Internal Component)
// =====================================================

interface CompanyCardProps {
  name: string;
  tagline: string;
  slug: string;
  introduction: string;
  logo?: string;
  location?: string;
}

function CompanyCard({
  name,
  tagline,
  slug,
  introduction,
  logo,
  location,
}: CompanyCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/industries/${slug}`}
        className={cn(
          'group relative block overflow-hidden rounded-2xl',
          'bg-paper-white border border-neutral-200',
          'p-6 md:p-8 min-h-[280px]',
          'shadow-sm hover:shadow-xl transition-all duration-500',
          'hover:border-highland-gold/40'
        )}
      >
        {/* Logo */}
        <div className="mb-5 h-14 flex items-center">
          {logo ? (
            <Image
              src={logo}
              alt={`${name} logo`}
              width={160}
              height={56}
              className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-12 w-12 bg-highland-gold/10 rounded-lg flex items-center justify-center">
              <span className="text-highland-gold font-semibold text-lg">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Tagline badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium text-highland-gold bg-highland-gold/10 rounded-full">
            {tagline}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold text-earth-anchor mb-2 group-hover:text-highland-gold transition-colors duration-300">
          {name}
        </h3>

        {/* Description */}
        <Text size="sm" color="muted" className="line-clamp-2 mb-4">
          {introduction}
        </Text>

        {/* Location & Explore */}
        <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between">
          {location && (
            <div className="flex items-center gap-1.5 text-neutral-500">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span className="text-xs">{location}</span>
            </div>
          )}

          {/* Explore indicator */}
          <div
            className={cn(
              'flex items-center gap-1.5',
              'text-sm font-medium text-highland-gold',
              'opacity-0 translate-x-2',
              'group-hover:opacity-100 group-hover:translate-x-0',
              'transition-all duration-300'
            )}
          >
            Explore
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default Industries;
