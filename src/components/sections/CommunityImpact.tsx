'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Container, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';

// =====================================================
// Community Impact Section Component
// Mirrors the 4 impact areas from the Impact page
// =====================================================

const impactAreas = [
  {
    title: 'Education & Human Capital Development',
    description: 'Investing in people through education and skills development — supporting schools, scholarships, teacher programs, and vocational training to build a skilled workforce and reduce unemployment.',
    icon: '🎓',
    stats: { value: '5,000+', label: 'People trained' },
    image: '/images/impact/impact-skills.jpg',
  },
  {
    title: 'Agriculture, Food Security & Rural Livelihoods',
    description: 'Supporting smallholder farmers, irrigation systems, improved seeds, agro-processing, and market access to enhance food security, increase farmer incomes, and strengthen rural economies.',
    icon: '🌾',
    stats: { value: '10,000+', label: 'Farmers supported' },
    image: '/images/impact/impact-environment.jpg',
  },
  {
    title: 'Health, Nutrition & Community Well-Being',
    description: 'Supporting primary healthcare facilities, maternal and child health, nutrition initiatives, clean water access, and community clinics to reduce malnutrition and expand healthcare in underserved areas.',
    icon: '🏥',
    stats: { value: '25+', label: 'Community projects' },
    image: '/images/impact/impact-community.jpg',
  },
  {
    title: 'Enterprise Development, Infrastructure & Job Creation',
    description: 'Driving inclusive economic growth through SME financing, youth entrepreneurship, industrial parks, renewable energy, affordable housing, and digital infrastructure to create sustainable jobs.',
    icon: '🏗️',
    stats: { value: '2,500+', label: 'Jobs created' },
    image: '/images/impact/impact-economic.jpg',
  },
];

export function CommunityImpact() {
  return (
    <section
      className="py-20 md:py-28 lg:py-36 bg-paper-white"
      aria-label="Community Impact"
    >
      <Container>
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <FadeIn>
                <Text
                  size="caption"
                  color="gold"
                  className="uppercase tracking-wider mb-4"
                >
                  Our Impact
                </Text>
                <AccentLine size="md" className="mb-6" />
              </FadeIn>

              <FadeIn delay={0.1}>
                <Heading as="h2" size="h2" className="mb-6">
                  Building a Better Ethiopia
                </Heading>
              </FadeIn>

              <FadeIn delay={0.2}>
                <Text size="lg" color="muted">
                  For over 15 years, we've been creating lasting positive change in the
                  communities where we operate, touching thousands of lives across East Africa
                  through four key social contribution categories.
                </Text>
              </FadeIn>

              {/* Impact Stats */}
              <FadeIn delay={0.3}>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { value: '5,000+', label: 'Jobs Created' },
                    { value: '50,000+', label: 'Lives Impacted' },
                    { value: '100M+', label: 'ETB Invested' },
                    { value: '15+', label: 'Years of Impact' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-neutral-50 rounded-xl p-4">
                      <span className="block text-2xl font-semibold text-highland-gold">{stat.value}</span>
                      <span className="text-xs text-neutral-500 uppercase tracking-wider">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Right: Featured Image */}
            <FadeIn delay={0.3}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/impact page/IMG_6927 (2).PNG"
                  alt="ZG Business Group community irrigation initiative"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor/30 to-transparent" />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Impact Areas Grid */}
        <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {impactAreas.map((area) => (
            <FadeInStaggerItem key={area.title}>
              <InitiativeCard
                title={area.title}
                summary={area.description}
                icon={area.icon}
                stats={area.stats}
                image={area.image}
              />
            </FadeInStaggerItem>
          ))}
        </FadeInStagger>

        {/* CTA */}
        <FadeIn delay={0.5} className="mt-12 text-center">
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-earth-anchor text-earth-anchor font-medium rounded hover:bg-earth-anchor hover:text-white transition-colors"
          >
            See Full Impact Report
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
// Initiative Card
// =====================================================

interface InitiativeCardProps {
  title: string;
  summary: string;
  icon: string;
  stats: { value: string; label: string };
  image: string;
}

function InitiativeCard({ title, summary, icon, stats, image }: InitiativeCardProps) {
  return (
    <Link
      href="/impact"
      className={cn(
        'group block rounded-2xl overflow-hidden',
        'bg-neutral-50 hover:bg-neutral-100',
        'border border-neutral-200 hover:border-highland-gold/30',
        'transition-all duration-300 hover:shadow-lg'
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-200">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor/40 to-transparent" />
        {/* Icon badge */}
        <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-xl shadow">
          {icon}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Heading
          as="h3"
          size="h4"
          className="mb-2 group-hover:text-highland-gold transition-colors duration-300"
        >
          {title}
        </Heading>

        <Text size="sm" color="muted" className="mb-4 line-clamp-2">
          {summary}
        </Text>

        {/* Stat */}
        <div className="flex items-center gap-2 pt-4 border-t border-neutral-200">
          <span className="text-xl font-semibold text-highland-gold">{stats.value}</span>
          <span className="text-xs text-neutral-500 uppercase tracking-wider">{stats.label}</span>
        </div>
      </div>
    </Link>
  );
}

export default CommunityImpact;
