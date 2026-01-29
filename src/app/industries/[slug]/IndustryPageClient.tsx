'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container, Section, Heading, Text, AccentLine, Button, Grid } from '@/components/ui';
import { FadeIn, StatCounter } from '@/components/motion';
import type { BusinessSector, Capability } from '@/types';

interface IndustryPageClientProps {
  sector: Partial<BusinessSector>;
  relatedSectors: Partial<BusinessSector>[];
}

// Default capabilities if none provided from CMS
const defaultCapabilities: Capability[] = [
  {
    title: 'Strategic Operations',
    description: 'Comprehensive operational management with a focus on efficiency and quality.',
  },
  {
    title: 'Market Expertise',
    description: 'Deep understanding of local and international markets in this sector.',
  },
  {
    title: 'Quality Standards',
    description: 'Commitment to international quality standards in all our operations.',
  },
  {
    title: 'Sustainable Practices',
    description: 'Environmentally responsible approaches to business operations.',
  },
  {
    title: 'Local Partnerships',
    description: 'Strong relationships with local communities and partners.',
  },
  {
    title: 'Innovation Focus',
    description: 'Continuous improvement through technology and innovation.',
  },
];

export default function IndustryPageClient({ sector, relatedSectors }: IndustryPageClientProps) {
  // Use first gallery image as hero, or fallback to a default
  const gallery = sector.gallery || [];
  const heroImage = gallery[0] || '/images/placeholder-hero.jpg';

  // Use CMS capabilities if available, otherwise use defaults
  const capabilities = sector.capabilities && sector.capabilities.length > 0
    ? sector.capabilities
    : defaultCapabilities;

  // Parse employee count (might be string like "2500" or number)
  const employeeCount = typeof sector.employee_count === 'string'
    ? parseInt(sector.employee_count, 10) || 500
    : sector.employee_count || 500;

  return (
    <>
      {/* Hero Section with Full Image */}
      <section className="relative min-h-[70vh] flex items-end bg-earth-anchor overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={heroImage}
            alt={sector.name || 'Industry'}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor via-earth-anchor/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-earth-anchor/80 via-transparent to-transparent" />

        {/* Content */}
        <Container className="relative z-10 py-20 md:py-28">
          {/* Breadcrumb */}
          <FadeIn>
            <nav className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-paper-white/60">
                <li>
                  <Link href="/" className="hover:text-paper-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/industries" className="hover:text-paper-white transition-colors">
                    Industries
                  </Link>
                </li>
                <li>/</li>
                <li className="text-highland-gold">{sector.name}</li>
              </ol>
            </nav>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              {sector.code} Division
            </Text>
            <AccentLine size="lg" className="mb-8" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <Heading as="h1" size="display-lg" color="white" className="max-w-4xl">
              {sector.name}
            </Heading>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Text size="lg" className="mt-4 text-highland-gold">
              {sector.tagline}
            </Text>
          </FadeIn>

          {/* Scroll hint */}
          <motion.div
            className="mt-12 flex items-center gap-2 text-paper-white/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Stats Bar */}
      <Section size="sm" background="neutral">
        <Grid cols={4} gap="lg">
          <FadeIn>
            <StatCounter
              value={sector.project_count || 12}
              label="Projects"
              size="md"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <StatCounter
              value={sector.subsidiary_count || 3}
              label="Companies"
              size="md"
            />
          </FadeIn>
          <FadeIn delay={0.2}>
            <StatCounter
              value={17}
              suffix="+"
              label="Years Active"
              size="md"
            />
          </FadeIn>
          <FadeIn delay={0.3}>
            <StatCounter
              value={employeeCount}
              suffix="+"
              label="Employees"
              size="md"
            />
          </FadeIn>
        </Grid>
      </Section>

      {/* Overview Section */}
      <Section size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <FadeIn>
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Overview
              </Text>
              <AccentLine size="md" />

              {/* Logo */}
              {sector.logo && (
                <div className="mt-8">
                  <Image
                    src={sector.logo}
                    alt={`${sector.name} logo`}
                    width={200}
                    height={80}
                    className="h-16 w-auto object-contain"
                  />
                </div>
              )}

              {/* Location */}
              {sector.location && (
                <div className="mt-6 flex items-center gap-2 text-neutral-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>{sector.location}</span>
                </div>
              )}
            </FadeIn>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <FadeIn delay={0.1}>
              <Text size="lg" className="mb-6 whitespace-pre-line">
                {sector.full_description || sector.introduction || sector.description || `Explore our ${sector.name?.toLowerCase()} operations and discover how we're driving growth and innovation across Ethiopia.`}
              </Text>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Gallery Section */}
      {gallery.length > 1 && (
        <Section size="lg" background="neutral">
          <FadeIn>
            <div className="text-center mb-12">
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Gallery
              </Text>
              <Heading as="h2" size="h2">
                Our Operations
              </Heading>
            </div>
          </FadeIn>

          <GalleryGrid images={gallery} name={sector.name || ''} />
        </Section>
      )}

      {/* Capabilities Section */}
      <Section size="lg" background="neutral">
        <FadeIn>
          <div className="text-center mb-12">
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              Our Capabilities
            </Text>
            <Heading as="h2" size="h2">
              What We Offer
            </Heading>
          </div>
        </FadeIn>

        <Grid cols={3} gap="lg">
          {capabilities.map((capability, index) => (
            <FadeIn key={capability.title} delay={index * 0.1}>
              <div className="p-6 bg-paper-white rounded-lg border border-neutral-200 hover:border-highland-gold/30 hover:shadow-lg transition-all duration-300">
                <Heading as="h3" size="h4" className="mb-3">
                  {capability.title}
                </Heading>
                <Text size="sm" color="muted">
                  {capability.description}
                </Text>
              </div>
            </FadeIn>
          ))}
        </Grid>
      </Section>

      {/* CTA Section */}
      <Section size="lg" background="earth">
        <div className="text-center">
          <FadeIn>
            <Heading as="h2" size="h2" color="white" className="mb-4">
              Interested in Partnership?
            </Heading>
            <Text size="lg" color="white" className="opacity-80 mb-8 max-w-2xl mx-auto">
              We&apos;re always looking for strategic partners who share our vision for Ethiopia&apos;s future.
            </Text>
            <Button variant="primary" size="lg" withArrow>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </FadeIn>
        </div>
      </Section>

      {/* Related Industries */}
      <Section size="lg">
        <FadeIn>
          <div className="text-center mb-12">
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              Explore More
            </Text>
            <Heading as="h2" size="h2">
              Other Companies
            </Heading>
          </div>
        </FadeIn>

        <Grid cols={3} gap="lg">
          {relatedSectors.map((related, index) => {
            const relatedGallery = related.gallery || [];
            const relatedImage = relatedGallery[0];
            return (
              <FadeIn key={related.slug} delay={index * 0.1}>
                <Link
                  href={`/industries/${related.slug}`}
                  className="group relative block rounded-2xl overflow-hidden bg-paper-white border border-neutral-200 hover:border-highland-gold/40 transition-all duration-300 hover:shadow-lg"
                >
                  {/* Image */}
                  {relatedImage && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedImage}
                        alt={related.name || 'Company'}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Logo */}
                    {related.logo && (
                      <div className="mb-4 h-10">
                        <Image
                          src={related.logo}
                          alt={`${related.name} logo`}
                          width={120}
                          height={40}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                    )}

                    <Heading
                      as="h3"
                      size="h4"
                      className="mb-2 text-earth-anchor group-hover:text-highland-gold transition-colors"
                    >
                      {related.name}
                    </Heading>
                    <Text size="sm" color="muted" className="line-clamp-2">
                      {related.tagline}
                    </Text>

                    {/* Arrow indicator */}
                    <div className="mt-4 flex items-center gap-2 text-highland-gold opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <span className="text-sm font-medium">View Details</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </Grid>
      </Section>
    </>
  );
}

// Gallery Grid Component with Lightbox
function GalleryGrid({ images, name }: { images: string[]; name: string }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <FadeIn key={image} delay={index * 0.05}>
            <motion.button
              onClick={() => setSelectedImage(index)}
              className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={image}
                alt={`${name} - Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-earth-anchor/0 group-hover:bg-earth-anchor/30 transition-colors duration-300 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.button>
          </FadeIn>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-earth-anchor/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-highland-gold transition-colors z-10"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation */}
            {selectedImage > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage - 1);
                }}
                className="absolute left-4 text-white hover:text-highland-gold transition-colors z-10"
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {selectedImage < images.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(selectedImage + 1);
                }}
                className="absolute right-4 text-white hover:text-highland-gold transition-colors z-10"
              >
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImage]}
                alt={`${name} - Image ${selectedImage + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
