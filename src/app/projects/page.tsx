'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';

// =====================================================
// Projects Page
// Real ZG Business Group projects
// =====================================================

const projects = [
  {
    id: '1',
    title: 'New Luxury Hotel Development',
    slug: 'luxury-hotel-mekelle',
    type: 'Hospitality',
    status: 'in_progress',
    location: 'Mekelle City, Tigray',
    summary:
      'A premium hotel designed to serve both international and domestic travelers, offering elegant guest rooms, signature dining, business lounges, and world-class wellness facilities.',
    image: '/industries/Northern Star Hotel & Tourism/27.png',
    highlights: [
      'Elegant guest rooms and executive suites',
      'Signature restaurant and café spaces',
      'Business lounges and meeting facilities',
      'Wellness and leisure areas (gym, spa, rooftop relaxation)',
      'High-standard service for business, tourism, and diplomatic guests',
    ],
  },
  {
    id: '2',
    title: '9-Hectare Integrated Apartment Community',
    slug: 'apartment-community-mekelle',
    type: 'Residential',
    status: 'in_progress',
    location: 'Mekelle City, Tigray',
    summary:
      'A master-planned 9-hectare residential apartment complex featuring modern apartment blocks, landscaped green spaces, retail zones, and family-friendly recreational environments.',
    image: '/industries/ZG Business Group – Real Estate & Apartments (Mekelle)/10.png',
    highlights: [
      'Modern apartment blocks with multiple unit types',
      'Landscaped green spaces and pedestrian areas',
      'Retail and community service zones',
      'Parking and internal road networks',
      'Family-friendly environments with recreational spaces',
    ],
  },
  {
    id: '3',
    title: 'Edible Oil Production Factory',
    slug: 'edible-oil-factory-adigudem',
    type: 'Industrial',
    status: 'in_progress',
    location: 'Adigudem City, Tigray',
    summary:
      'A large-scale edible oil production facility aimed at strengthening domestic manufacturing capacity, reducing import dependency, and creating local employment.',
    image: '/industries/ZG Business Group – Manufacturing/6.png',
    highlights: [],
  },
  {
    id: '4',
    title: 'Savana Commercial Farming Operations',
    slug: 'savana-farming-raya',
    type: 'Agriculture',
    status: 'in_progress',
    location: 'Raya, Tigray',
    summary:
      'Full-scale agro-industry enterprise producing papaya, bananas, vegetables, millet, corn, and beans using modern farming technologies and best agronomic practices.',
    image: '/industries/Savana Farming PLC (Raya, Tigray)/31.jpg',
    highlights: [],
  },
  {
    id: '5',
    title: 'Infrastructure & Civil Works',
    slug: 'infrastructure-civil-works',
    type: 'Construction',
    status: 'in_progress',
    location: 'Multiple Locations',
    summary:
      'Comprehensive construction and civil works projects delivered across multiple regions, including building works, road infrastructure, and public development contracts.',
    image: '/industries/ZS Construction/23.png',
    highlights: [],
  },
  {
    id: '6',
    title: 'Raie Commercial Farming, Gambela',
    slug: 'raie-farming-gambela',
    type: 'Agriculture',
    status: 'in_progress',
    location: 'Gambela Region',
    summary:
      'Large-scale commercial farming in the Gambela Region producing sesame, vegetables, millet, corn, and other high-potential export crops.',
    image: '/industries/Raie Agro-Industry (Gambela Region)/29.jpg',
    highlights: [],
  },
];

const statusColors: Record<string, string> = {
  completed: 'bg-green-600 text-white',
  in_progress: 'bg-highland-gold text-earth-anchor',
  planned: 'bg-neutral-200 text-neutral-600',
};

const statusLabels: Record<string, string> = {
  completed: 'Completed',
  in_progress: 'In Progress',
  planned: 'Planned',
};

export default function ProjectsPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-earth-anchor relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-highland-gold/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-coffee-earth/20 blur-3xl" />
        </div>

        <Container className="relative z-10">
          <FadeIn>
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              Our Work
            </Text>
            <AccentLine size="md" className="mb-6" />
          </FadeIn>

          <FadeIn delay={0.1}>
            <Heading as="h1" size="display-lg" color="white" className="mb-6">
              Projects
            </Heading>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Text size="lg" color="white" className="max-w-2xl opacity-80">
              From landmark developments to commercial farming and industrial ventures,
              explore the projects shaping Ethiopia's future.
            </Text>
          </FadeIn>
        </Container>
      </section>

      {/* Featured Announcement */}
      <section className="py-20 md:py-28 bg-paper-white">
        <Container>
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/project_announcement.jpg"
                  alt="ZG Business Group Mekelle Developments"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Content */}
              <div>
                <Text size="caption" color="gold" className="uppercase tracking-wider mb-3">
                  Latest Announcement
                </Text>
                <AccentLine size="sm" className="mb-5" />
                <Heading as="h2" size="h2" className="mb-5">
                  ZG Business Group Announces New Luxury Hotel &amp; 9-Hectare Apartment Development in Mekelle City
                </Heading>

                <Text size="base" color="muted" className="mb-5 leading-relaxed">
                  ZG Business Group is proud to announce the launch of its next flagship real-estate and
                  hospitality developments in Mekelle City: a new luxury hotel project alongside a
                  large-scale residential apartment complex spanning 9 hectares.
                </Text>

                <Text size="base" color="muted" className="mb-6 leading-relaxed">
                  These landmark projects form part of ZG Business Group's long-term vision to support
                  urban transformation, stimulate local employment, and deliver world-class living and
                  hospitality standards in Northern Ethiopia.
                </Text>

                {/* Impact points */}
                <div className="bg-neutral-50 rounded-xl p-6 mb-6">
                  <Text size="sm" className="font-semibold text-earth-anchor uppercase tracking-wider mb-3">
                    Driving Growth, Jobs &amp; Urban Transformation
                  </Text>
                  <ul className="space-y-2">
                    {[
                      'Create significant local employment during construction and operations',
                      'Attract new investment into Mekelle',
                      'Enhance hospitality and residential infrastructure',
                      'Support broader regional economic recovery and growth',
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-neutral-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-highland-gold mt-1.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <Text size="sm" color="muted" className="italic">
                  ZG Business Group remains committed to delivering impactful, future-focused
                  developments that contribute to Ethiopia's long-term prosperity.
                </Text>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <Container>
          <FadeIn>
            <div className="mb-12">
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-3">
                All Projects
              </Text>
              <Heading as="h2" size="h2">
                Our Active Developments
              </Heading>
            </div>
          </FadeIn>

          <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <FadeInStaggerItem key={project.id}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group block rounded-2xl overflow-hidden bg-white border border-neutral-200 hover:border-highland-gold/30 hover:shadow-xl transition-all duration-500 h-full"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-medium',
                        statusColors[project.status]
                      )}>
                        {statusLabels[project.status]}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
                      <span>{project.type}</span>
                      <span>•</span>
                      <span>{project.location}</span>
                    </div>

                    <Heading as="h3" size="h4" className="mb-3 group-hover:text-highland-gold transition-colors">
                      {project.title}
                    </Heading>

                    <Text size="sm" color="muted" className="line-clamp-3">
                      {project.summary}
                    </Text>

                    {project.highlights.length > 0 && (
                      <ul className="mt-4 space-y-1">
                        {project.highlights.slice(0, 3).map((h) => (
                          <li key={h} className="flex items-start gap-2 text-xs text-neutral-500">
                            <span className="w-1 h-1 rounded-full bg-highland-gold mt-1.5 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-earth-anchor">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <Heading as="h2" size="h2" color="white" className="mb-6">
                Have a Project in Mind?
              </Heading>
              <Text size="lg" color="white" className="mb-8 opacity-80">
                We partner with visionary developers and investors to bring
                transformative projects to life across Ethiopia and the region.
              </Text>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-highland-gold text-earth-anchor font-medium rounded-lg hover:bg-highland-gold/90 transition-colors"
              >
                Discuss Your Project
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
