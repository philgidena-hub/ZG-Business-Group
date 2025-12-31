'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container, Section, Heading, Text, AccentLine, Button, Grid } from '@/components/ui';
import { FadeIn, StatCounter } from '@/components/motion';
import { getIndustryImageUrl } from '@/lib/directus';
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
  const heroImageId = typeof sector.hero_image === 'string' ? sector.hero_image : sector.hero_image?.id;
  const heroImage = getIndustryImageUrl(sector.slug || '', heroImageId, true);

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
            </FadeIn>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <FadeIn delay={0.1}>
              <Text size="lg" className="mb-6">
                {sector.introduction || sector.description || `Explore our ${sector.name?.toLowerCase()} operations and discover how we're driving growth and innovation across Ethiopia.`}
              </Text>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Text size="lg" className="text-neutral-600">
                Our {sector.name?.toLowerCase()} division represents a key pillar of ZG Business Group&apos;s diversified portfolio. Through strategic investments and operational excellence, we have established a strong presence in this sector, contributing to Ethiopia&apos;s economic development while creating sustainable value for all stakeholders.
              </Text>
            </FadeIn>
          </div>
        </div>
      </Section>

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
              Related Industries
            </Heading>
          </div>
        </FadeIn>

        <Grid cols={3} gap="lg">
          {relatedSectors.map((related, index) => {
            const relatedHeroId = typeof related.hero_image === 'string' ? related.hero_image : related.hero_image?.id;
            const relatedImage = getIndustryImageUrl(related.slug || '', relatedHeroId);
            return (
              <FadeIn key={related.slug} delay={index * 0.1}>
                <Link
                  href={`/industries/${related.slug}`}
                  className="group relative block h-64 rounded-2xl overflow-hidden"
                >
                  {/* Background Image */}
                  <Image
                    src={relatedImage}
                    alt={related.name || 'Industry'}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor via-earth-anchor/50 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <Heading
                      as="h3"
                      size="h4"
                      color="white"
                      className="mb-2 group-hover:text-highland-gold transition-colors"
                    >
                      {related.name}
                    </Heading>
                    <Text size="sm" className="text-paper-white/70">
                      {related.tagline}
                    </Text>

                    {/* Arrow indicator */}
                    <div className="mt-4 flex items-center gap-2 text-highland-gold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-sm font-medium">Explore</span>
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
