'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';

interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  posted_date: string;
  summary: string;
}

interface Subsidiary {
  id: number;
  name: string;
  slug: string;
  description: string;
}

// =====================================================
// Careers Page
// Job listings and company culture showcase
// =====================================================

const benefits = [
  {
    icon: '🏥',
    title: 'Health & Wellness',
    description: 'Comprehensive health insurance covering medical, dental, and vision for you and your family.',
  },
  {
    icon: '📈',
    title: 'Career Growth',
    description: 'Clear career paths with mentorship programs and continuous learning opportunities.',
  },
  {
    icon: '💰',
    title: 'Competitive Pay',
    description: 'Market-leading salaries with performance bonuses and annual reviews.',
  },
  {
    icon: '🏖️',
    title: 'Work-Life Balance',
    description: 'Generous paid time off, flexible work arrangements, and family leave policies.',
  },
  {
    icon: '📚',
    title: 'Learning & Development',
    description: 'Training programs, conference sponsorships, and tuition assistance.',
  },
  {
    icon: '🤝',
    title: 'Inclusive Culture',
    description: 'A diverse and welcoming workplace where every voice matters.',
  },
];

const cultureValues = [
  {
    title: 'Excellence',
    description: 'We pursue the highest standards in everything we do, continuously improving and innovating.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
  },
  {
    title: 'Integrity',
    description: 'We conduct business with honesty and transparency, building trust with all stakeholders.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
  },
  {
    title: 'Community',
    description: 'We invest in the well-being of our communities and contribute to sustainable development.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&q=80',
  },
];

export default function CareersPage() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  useEffect(() => {
    async function fetchData() {
      try {
        const [jobsRes, subsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/job_listings`),
          fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/subsidiaries`)
        ]);
        const jobsData = await jobsRes.json();
        const subsData = await subsRes.json();
        setJobs(jobsData.data || []);
        setSubsidiaries(subsData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Get unique departments from fetched jobs
  const departments = ['All', ...Array.from(new Set(jobs.map(job => job.department).filter(Boolean)))];

  const filteredJobs = selectedDepartment === 'All'
    ? jobs
    : jobs.filter(job => job.department === selectedDepartment);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
            alt="Team collaboration"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-earth-anchor/95 via-earth-anchor/80 to-earth-anchor/60" />
        </div>

        <Container className="relative z-10 py-32">
          <div className="max-w-3xl">
            <FadeIn>
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Join Our Team
              </Text>
              <AccentLine size="md" className="mb-6" />
            </FadeIn>

            <FadeIn delay={0.1}>
              <Heading as="h1" size="display-lg" color="white" className="mb-6">
                Build Your Career
                <span className="text-highland-gold"> With Us</span>
              </Heading>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Text size="lg" color="white" className="opacity-80 mb-8">
                Join a team of passionate professionals working across 10 industries
                to shape Ethiopia's future. Discover opportunities that match your
                ambitions and grow with us.
              </Text>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#openings"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-highland-gold text-earth-anchor font-medium rounded-lg hover:bg-highland-gold/90 transition-colors"
                >
                  View Open Positions
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </a>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  Learn About Us
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-neutral-50 border-b border-neutral-200">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '5,000+', label: 'Team Members' },
              { value: '10', label: 'Industries' },
              { value: '8', label: 'Companies' },
              { value: '15+', label: 'Years Growing' },
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

      {/* Why Join Us */}
      <section className="py-20 md:py-28 bg-paper-white">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Why Join Us
              </Text>
              <Heading as="h2" size="h1" className="mb-6">
                Benefits & Perks
              </Heading>
              <Text size="lg" color="muted">
                We invest in our people because they are the foundation of everything we achieve.
              </Text>
            </div>
          </FadeIn>

          <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <FadeInStaggerItem key={benefit.title}>
                <motion.div
                  className="bg-neutral-50 rounded-xl p-8 h-full hover:shadow-lg transition-shadow"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <span className="text-4xl mb-4 block">{benefit.icon}</span>
                  <Heading as="h3" size="h4" className="mb-3">
                    {benefit.title}
                  </Heading>
                  <Text size="base" color="muted">
                    {benefit.description}
                  </Text>
                </motion.div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* Our Culture */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mb-16">
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Our Culture
              </Text>
              <Heading as="h2" size="h1" className="mb-6">
                What Drives Us
              </Heading>
              <Text size="lg" color="muted">
                Our values shape how we work, make decisions, and interact with each other
                and our communities.
              </Text>
            </div>
          </FadeIn>

          <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cultureValues.map((value) => (
              <FadeInStaggerItem key={value.title}>
                <motion.div
                  className="group relative rounded-2xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={value.image}
                      alt={value.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor via-earth-anchor/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Heading as="h3" size="h3" color="white" className="mb-2">
                      {value.title}
                    </Heading>
                    <Text size="sm" color="white" className="opacity-80">
                      {value.description}
                    </Text>
                  </div>
                </motion.div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* Open Positions */}
      <section id="openings" className="py-20 md:py-28 bg-paper-white scroll-mt-24">
        <Container>
          <FadeIn>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                  Open Positions
                </Text>
                <Heading as="h2" size="h1">
                  Current Openings
                </Heading>
              </div>

              {/* Department Filter */}
              <div className="flex flex-wrap gap-2">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setSelectedDepartment(dept)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                      selectedDepartment === dept
                        ? 'bg-earth-anchor text-paper-white'
                        : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                    )}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>

          {filteredJobs.length > 0 ? (
            <FadeInStagger stagger={0.05} className="space-y-4">
              {filteredJobs.map((job) => (
                <FadeInStaggerItem key={job.id}>
                  <motion.div
                    className="group bg-white border border-neutral-200 rounded-xl p-6 hover:border-highland-gold/30 hover:shadow-lg transition-all cursor-pointer"
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <Heading as="h3" size="h4" className="mb-2 group-hover:text-highland-gold transition-colors">
                          {job.title}
                        </Heading>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {job.department}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {job.location}
                          </span>
                          <span>•</span>
                          <span className="capitalize">{job.employment_type?.replace('_', ' ')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs text-neutral-400">
                          {job.posted_date && `Posted ${new Date(job.posted_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}`}
                        </span>
                        <div className="w-10 h-10 rounded-full bg-highland-gold/10 flex items-center justify-center group-hover:bg-highland-gold group-hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </FadeInStaggerItem>
              ))}
            </FadeInStagger>
          ) : (
            <div className="text-center py-12">
              <Text size="lg" color="muted">
                No positions available in {selectedDepartment} at the moment.
              </Text>
              <button
                onClick={() => setSelectedDepartment('All')}
                className="mt-4 text-highland-gold hover:underline"
              >
                View all positions
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* Companies Hiring */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Our Companies
              </Text>
              <Heading as="h2" size="h2" className="mb-6">
                Opportunities Across Our Portfolio
              </Heading>
              <Text size="lg" color="muted">
                With 8 companies across 10 industries, there's a place for every talent.
              </Text>
            </div>
          </FadeIn>

          <FadeInStagger stagger={0.05} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subsidiaries.slice(0, 8).map((company) => (
              <FadeInStaggerItem key={company.id}>
                <motion.div
                  className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="w-12 h-12 rounded-full bg-highland-gold/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-highland-gold font-semibold">
                      {company.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <Heading as="h4" size="h4" className="mb-1">
                    {company.name.replace('ZG ', '')}
                  </Heading>
                  <Text size="sm" color="muted" className="line-clamp-1">
                    {company.description?.substring(0, 50) || 'Business'}
                  </Text>
                </motion.div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* Application CTA */}
      <section className="py-20 md:py-28 bg-earth-anchor">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <Heading as="h2" size="h2" color="white" className="mb-6">
                Don't See the Right Role?
              </Heading>
              <Text size="lg" color="white" className="opacity-80 mb-8">
                We're always looking for talented individuals. Send us your resume
                and we'll keep you in mind for future opportunities.
              </Text>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:careers@zggroup.com"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-highland-gold text-earth-anchor font-medium rounded-lg hover:bg-highland-gold/90 transition-colors"
                >
                  Send Your Resume
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  Contact HR
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </main>
  );
}
