'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Section, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';
import { businessSectors } from '@/lib/mock-data';
import type { BusinessSector } from '@/types';

export default function IndustriesPageClient() {
  // Use mock data directly - no Directus dependency
  const sectors = businessSectors as BusinessSector[];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-earth-anchor">
        <Container>
          <FadeIn>
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              Our Companies
            </Text>
            <AccentLine size="lg" className="mb-8" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <Heading as="h1" size="display-lg" color="white" className="max-w-4xl">
              A Diversified Ecosystem
            </Heading>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Text size="lg" color="white" className="mt-6 max-w-2xl opacity-80">
              Eleven interconnected companies working together to build lasting value across Ethiopia and East Africa.
            </Text>
          </FadeIn>
        </Container>
      </section>

      {/* Industries Grid */}
      <Section size="lg" background="neutral">
        <FadeInStagger stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectors.map((sector) => (
            <FadeInStaggerItem key={sector.slug}>
              <IndustryListCard
                name={sector.name}
                tagline={sector.tagline || ''}
                slug={sector.slug}
                introduction={sector.introduction || sector.description || ''}
                logo={sector.logo}
                location={sector.location}
              />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>
      </Section>
    </>
  );
}

interface IndustryListCardProps {
  name: string;
  tagline: string;
  slug: string;
  introduction: string;
  logo?: string;
  location?: string;
}

function IndustryListCard({
  name,
  tagline,
  slug,
  introduction,
  logo,
  location,
}: IndustryListCardProps) {
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
          'p-6 md:p-8 min-h-[320px]',
          'shadow-sm hover:shadow-xl transition-all duration-500',
          'hover:border-highland-gold/40'
        )}
      >
        {/* Logo */}
        <div className="mb-6 h-16 flex items-center">
          {logo ? (
            <Image
              src={logo}
              alt={`${name} logo`}
              width={180}
              height={64}
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-14 w-14 bg-highland-gold/10 rounded-lg flex items-center justify-center">
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
        <Heading
          as="h2"
          size="h4"
          className="mb-3 text-earth-anchor group-hover:text-highland-gold transition-colors duration-300"
        >
          {name}
        </Heading>

        {/* Description */}
        <Text size="sm" color="muted" className="line-clamp-3 mb-4">
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
