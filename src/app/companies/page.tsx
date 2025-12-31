'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';

interface Subsidiary {
  id: number;
  name: string;
  slug: string;
  description: string;
  established_year?: number;
}

// =====================================================
// Companies Page
// Portfolio of subsidiary companies
// =====================================================

export default function CompaniesPage() {
  const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubsidiaries() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/subsidiaries`);
        const data = await res.json();
        setSubsidiaries(data.data || []);
      } catch (error) {
        console.error('Error fetching subsidiaries:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSubsidiaries();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-earth-anchor relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-highland-gold/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-coffee-earth/20 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <FadeIn>
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              Our Portfolio
            </Text>
            <AccentLine size="md" className="mb-6" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <Heading as="h1" size="display-lg" color="white" className="mb-6">
              Our Companies
            </Heading>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Text size="lg" color="white" className="max-w-2xl opacity-80">
              A portfolio of specialized companies, each a leader in its sector,
              working together to drive economic growth across Ethiopia and East Africa.
            </Text>
          </FadeIn>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-neutral-50 border-b border-neutral-200">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Companies', value: 8 },
              { label: 'Employees', value: '5,000+' },
              { label: 'Industries', value: 10 },
              { label: 'Years Combined', value: '100+' },
            ].map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <span className="block text-3xl md:text-4xl font-semibold text-earth-anchor">
                    {stat.value}
                  </span>
                  <span className="text-sm text-neutral-500">{stat.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Companies Grid */}
      <section className="py-20 md:py-28 bg-paper-white">
        <Container>
          {loading ? (
            <div className="text-center py-12">
              <Text color="muted">Loading companies...</Text>
            </div>
          ) : (
            <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {subsidiaries.map((company, index) => (
                <FadeInStaggerItem key={company.id}>
                  <CompanyCard company={company} index={index} />
                </FadeInStaggerItem>
              ))}
            </FadeInStagger>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <Heading as="h2" size="h2" className="mb-6">
                Interested in Partnership?
              </Heading>
              <Text size="lg" color="muted" className="mb-8">
                We're always looking for strategic partnerships to expand our impact
                across new sectors and geographies.
              </Text>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-earth-anchor text-paper-white font-medium rounded-lg hover:bg-coffee-earth transition-colors"
              >
                Contact Us
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>
    </main>
  );
}

// Company Card Component
interface CompanyCardProps {
  company: Subsidiary;
  index: number;
}

const sectorColors: Record<string, string> = {
  'import-export': 'from-highland-gold to-amber-600',
  'agro-industry': 'from-eucalyptus to-teal-700',
  'construction': 'from-iron-oxide to-amber-800',
  'real-estate': 'from-slate-600 to-slate-800',
  'hospitality': 'from-highland-gold to-amber-600',
  'manufacturing': 'from-neutral-600 to-neutral-800',
  'tourism': 'from-eucalyptus to-emerald-700',
  'farming': 'from-green-600 to-green-800',
};

function CompanyCard({ company, index }: CompanyCardProps) {
  const colorClass = sectorColors[company.slug] || 'from-earth-anchor to-coffee-earth';

  return (
    <motion.div
      className={cn(
        'group relative p-8 rounded-2xl',
        'bg-white border border-neutral-200',
        'hover:border-highland-gold/30 hover:shadow-xl',
        'transition-all duration-500'
      )}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Sector Badge */}
      <div className="flex items-center justify-between mb-6">
        <div className={cn(
          'px-3 py-1.5 rounded-full text-xs font-medium text-white',
          'bg-gradient-to-r',
          colorClass
        )}>
          Business
        </div>
        {company.established_year && (
          <span className="text-sm text-neutral-400">Est. {company.established_year}</span>
        )}
      </div>

      {/* Company Name */}
      <Heading as="h3" size="h3" className="mb-3 group-hover:text-highland-gold transition-colors">
        {company.name}
      </Heading>

      {/* Description */}
      <Text size="base" color="muted" className="mb-6 line-clamp-3">
        {company.description}
      </Text>

      {/* Hover Arrow */}
      <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Link
          href={`/industries`}
          className="w-10 h-10 rounded-full bg-highland-gold flex items-center justify-center text-earth-anchor"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
