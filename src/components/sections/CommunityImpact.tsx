'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Container, Heading, Text, AccentLine, Skeleton, ErrorState } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';

interface CSRItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
}

// Placeholder images for CSR initiatives (African/Ethiopian context - no people to avoid misrepresentation)
const initiativeImages = [
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80', // Education - classroom/books
  'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80', // Healthcare - hospital/medical
  'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80', // Agriculture - green fields
  'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80', // Community - hands together
];

// =====================================================
// Community Impact Section Component
// CSR initiatives grid
// =====================================================

export function CommunityImpact() {
  const [initiatives, setInitiatives] = useState<CSRItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInitiatives() {
      try {
        // Use proxy route in production (HTTPS) to avoid mixed content blocking
        const apiUrl = window.location.protocol === 'https:'
          ? '/api/directus/items/csr_initiatives?limit=4'
          : `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/csr_initiatives?limit=4`;
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('Failed to fetch initiatives');
        const data = await res.json();
        setInitiatives(data.data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching CSR initiatives:', err);
        setError('Unable to load initiatives. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchInitiatives();
  }, []);

  return (
    <section
      className="py-20 md:py-28 lg:py-36 bg-paper-white"
      aria-label="Community Impact"
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
              Community Impact
            </Text>
            <AccentLine size="md" className="mb-6" />
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <Heading as="h2" size="h2">
                Beyond Business
              </Heading>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Text size="lg" color="muted">
                Our commitment extends beyond commercial success. We invest in the
                communities where we operate, focusing on education, healthcare,
                agricultural development, and women's empowerment.
              </Text>
            </FadeIn>
          </div>
        </div>

        {/* Initiatives Grid */}
        {loading ? (
          <InitiativesGridSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        ) : (
          <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initiatives.map((initiative, index) => (
              <FadeInStaggerItem key={initiative.id}>
                <InitiativeCard
                  title={initiative.title}
                  summary={initiative.description}
                  metrics={[]}
                  image={initiativeImages[index % initiativeImages.length]}
                />
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        )}

        {/* CTA */}
        <FadeIn delay={0.5} className="mt-12 text-center">
          <Link
            href="/impact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-earth-anchor text-earth-anchor font-medium rounded hover:bg-earth-anchor hover:text-white transition-colors"
          >
            Read Our Impact Report
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
  metrics: Array<{ label: string; value: string | number }>;
  image: string;
}

function InitiativeCard({ title, summary, metrics, image }: InitiativeCardProps) {
  return (
    <Link
      href="/impact"
      className={cn(
        'group block p-6 lg:p-8 rounded-lg',
        'bg-neutral-50 hover:bg-neutral-100',
        'border border-neutral-200 hover:border-neutral-300',
        'transition-all duration-normal ease-out-quart'
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-neutral-200 mb-6">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-slow group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Title */}
      <Heading
        as="h3"
        size="h4"
        className="mb-2 group-hover:text-highland-gold transition-colors duration-fast"
      >
        {title}
      </Heading>

      {/* Summary */}
      <Text size="sm" color="muted" className="mb-6">
        {summary}
      </Text>

      {/* Metrics */}
      <div className="flex gap-8">
        {metrics.slice(0, 2).map((metric) => (
          <div key={metric.label}>
            <Text
              size="caption"
              color="muted"
              className="uppercase tracking-wider mb-1"
            >
              {metric.label}
            </Text>
            <Text weight="semibold" className="text-earth-anchor">
              {typeof metric.value === 'number'
                ? metric.value.toLocaleString()
                : metric.value}
            </Text>
          </div>
        ))}
      </div>
    </Link>
  );
}

export default CommunityImpact;

// =====================================================
// Initiatives Grid Skeleton
// =====================================================

function InitiativesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-6 lg:p-8 rounded-lg bg-neutral-50 border border-neutral-200"
        >
          {/* Image placeholder */}
          <div className="relative aspect-[16/9] rounded-md overflow-hidden bg-neutral-200 mb-6">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>

          {/* Title */}
          <Skeleton className="h-6 w-3/4 mb-2" radius="sm" />

          {/* Summary */}
          <Skeleton className="h-4 w-full mb-1" radius="sm" />
          <Skeleton className="h-4 w-2/3 mb-6" radius="sm" />

          {/* Metrics */}
          <div className="flex gap-8">
            <div>
              <Skeleton className="h-3 w-16 mb-1" radius="sm" />
              <Skeleton className="h-5 w-12" radius="sm" />
            </div>
            <div>
              <Skeleton className="h-3 w-16 mb-1" radius="sm" />
              <Skeleton className="h-5 w-12" radius="sm" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
