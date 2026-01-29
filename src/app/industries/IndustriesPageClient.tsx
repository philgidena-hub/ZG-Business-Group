'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getIndustryImageUrl } from '@/lib/directus';
import { Container, Section, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';
import { businessSectors } from '@/lib/mock-data';
import type { BusinessSector } from '@/types';

export default function IndustriesPageClient() {
  const [sectors, setSectors] = useState<BusinessSector[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSectors() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/business_sectors`);
        const data = await res.json();
        const fetchedSectors = data.data || [];
        // Use fetched data if available, otherwise fallback to mock data
        setSectors(fetchedSectors.length > 0 ? fetchedSectors : businessSectors as BusinessSector[]);
      } catch (error) {
        console.error('Error fetching sectors:', error);
        // Fallback to mock data on error
        setSectors(businessSectors as BusinessSector[]);
      } finally {
        setLoading(false);
      }
    }
    fetchSectors();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-earth-anchor">
        <Container>
          <FadeIn>
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              Our Industries
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
              Ten interconnected industries working together to build lasting value across Ethiopia and East Africa.
            </Text>
          </FadeIn>
        </Container>
      </section>

      {/* Industries Grid */}
      <Section size="lg">
        {loading ? (
          <div className="text-center py-12">
            <Text color="muted">Loading industries...</Text>
          </div>
        ) : (
          <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sectors.map((sector) => (
              <FadeInStaggerItem key={sector.slug}>
                <IndustryListCard
                  name={sector.name}
                  tagline={sector.tagline || ''}
                  slug={sector.slug}
                  introduction={sector.introduction || sector.description || ''}
                  heroImage={typeof sector.hero_image === 'string' ? sector.hero_image : sector.hero_image?.id}
                  projectCount={sector.project_count || 0}
                  subsidiaryCount={sector.subsidiary_count || 0}
                />
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        )}
      </Section>
    </>
  );
}

interface IndustryListCardProps {
  name: string;
  tagline: string;
  slug: string;
  introduction: string;
  heroImage?: string;
  projectCount: number;
  subsidiaryCount: number;
}

function IndustryListCard({
  name,
  tagline,
  slug,
  introduction,
  heroImage,
}: IndustryListCardProps) {
  const image = getIndustryImageUrl(slug, heroImage);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/industries/${slug}`}
        className={cn(
          'group relative block overflow-hidden rounded-2xl',
          'bg-earth-anchor h-[320px] md:h-[380px]',
          'shadow-lg hover:shadow-2xl transition-shadow duration-500'
        )}
      >
        {/* Background Image */}
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}

        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor via-earth-anchor/60 to-earth-anchor/20 opacity-90 group-hover:opacity-95 transition-opacity duration-500" />

        {/* Accent border on hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-highland-gold/40 transition-colors duration-500" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          {/* Tagline badge */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 text-xs font-medium text-highland-gold bg-highland-gold/10 backdrop-blur-sm rounded-full border border-highland-gold/20">
              {tagline}
            </span>
          </div>

          {/* Name */}
          <Heading
            as="h2"
            size="h3"
            color="white"
            className="mb-2 group-hover:text-highland-gold transition-colors duration-300"
          >
            {name}
          </Heading>

          {/* Animated accent line */}
          <div className="w-0 h-0.5 bg-highland-gold group-hover:w-16 transition-all duration-500 mb-3" />

          {/* Description */}
          <Text size="sm" className="text-white/70 line-clamp-2 mb-4 group-hover:text-white/90 transition-colors">
            {introduction}
          </Text>

          {/* Explore indicator */}
          <div
            className={cn(
              'flex items-center gap-2',
              'text-sm font-medium text-highland-gold',
              'opacity-0 translate-y-4',
              'group-hover:opacity-100 group-hover:translate-y-0',
              'transition-all duration-300 delay-100'
            )}
          >
            Explore Industry
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
