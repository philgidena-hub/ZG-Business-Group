'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Heading, Text, AccentLine, Skeleton, ErrorState } from '@/components/ui';
import { FadeIn, StatCounter } from '@/components/motion';

interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  project_type: string;
  project_status: string;
  location_name: string;
  summary: string;
  statistics?: Array<{ label: string; value: string | number; suffix?: string }>;
}

// =====================================================
// Featured Project Section Component
// Showcase of flagship project - Premium AWWWARDS style
// =====================================================

// Placeholder image for featured project (Ethiopian construction context)
const projectImage = 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?w=1600&q=80'; // African urban development

export function FeaturedProject() {
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/projects?limit=1`);
        if (!res.ok) throw new Error('Failed to fetch project');
        const data = await res.json();
        if (data.data && data.data.length > 0) {
          setProject(data.data[0]);
        }
        setError(null);
      } catch (err) {
        console.error('Error fetching featured project:', err);
        setError('Unable to load project. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax effect for the image
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  if (loading) {
    return <FeaturedProjectSkeleton />;
  }

  if (error) {
    return (
      <section className="py-20 md:py-28 lg:py-36 bg-paper-white">
        <Container>
          <ErrorState message={error} onRetry={() => window.location.reload()} />
        </Container>
      </section>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 lg:py-36 bg-paper-white overflow-hidden"
      aria-label="Featured Project"
    >
      <Container>
        {/* Project Image with Parallax */}
        <FadeIn className="mb-12">
          <div
            ref={imageRef}
            className="relative aspect-cinematic rounded-2xl overflow-hidden bg-neutral-100 group"
          >
            {/* Parallax Image Container */}
            <motion.div
              className="absolute inset-0"
              style={{ y: imageY, scale: imageScale }}
            >
              <Image
                src={projectImage}
                alt={project.title || 'Featured Project'}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor/40 via-transparent to-transparent" />

            {/* Status Badge */}
            <motion.div
              className="absolute top-6 left-6 z-10"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm',
                  project.project_status === 'completed'
                    ? 'bg-eucalyptus/90 text-paper-white'
                    : project.project_status === 'in_progress'
                      ? 'bg-highland-gold/90 text-earth-anchor'
                      : 'bg-neutral-200/90 text-neutral-600'
                )}
              >
                {project.project_status === 'completed'
                  ? 'Completed'
                  : project.project_status === 'in_progress'
                    ? 'In Progress'
                    : 'Planned'}
              </span>
            </motion.div>

            {/* Hover overlay with view prompt */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-20 h-20 rounded-full bg-paper-white/90 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-8 h-8 text-earth-anchor" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Project Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column - Labels */}
          <div className="lg:col-span-4">
            <FadeIn delay={0.1}>
              <Text
                size="caption"
                color="gold"
                className="uppercase tracking-wider mb-4"
              >
                Featured Project
              </Text>
              <AccentLine size="md" />
            </FadeIn>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-8">
            {/* Meta */}
            <FadeIn delay={0.2}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Text size="sm" color="muted">
                  Construction • Real Estate
                </Text>
                <span className="text-neutral-300">•</span>
                <Text size="sm" color="muted">
                  {project.location_name}
                </Text>
              </div>
            </FadeIn>

            {/* Title */}
            <FadeIn delay={0.3}>
              <Heading as="h2" size="h2" className="mb-4">
                {project.title}
              </Heading>
            </FadeIn>

            {/* Description */}
            <FadeIn delay={0.4}>
              <Text size="lg" color="muted" className="mb-8 max-w-2xl">
                {project.summary}
              </Text>
            </FadeIn>

            {/* CTA */}
            <FadeIn delay={0.5}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-earth-anchor text-paper-white font-medium rounded-lg hover:bg-coffee-earth transition-colors relative overflow-hidden"
                >
                  <span className="relative z-10">View Project</span>
                  <svg
                    className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </Link>
              </motion.div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.6}>
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {project.statistics?.map((stat, index) => (
                    <div key={stat.label} className="text-center md:text-left">
                      <StatCounter
                        value={Number(stat.value)}
                        suffix={stat.suffix}
                        label={stat.label}
                        delay={index * 0.1}
                        size="sm"
                        numberColor="default"
                        labelColor="muted"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedProject;

// =====================================================
// Featured Project Skeleton
// =====================================================

function FeaturedProjectSkeleton() {
  return (
    <section className="py-20 md:py-28 lg:py-36 bg-paper-white overflow-hidden">
      <Container>
        {/* Image skeleton */}
        <div className="mb-12">
          <div className="relative aspect-cinematic rounded-2xl overflow-hidden bg-neutral-200">
            <div className="absolute inset-0 skeleton-shimmer" />
            {/* Status badge placeholder */}
            <Skeleton className="absolute top-6 left-6 h-8 w-24 bg-neutral-300" radius="full" animation="none" />
          </div>
        </div>

        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column */}
          <div className="lg:col-span-4">
            <Skeleton className="h-3 w-28 mb-4" radius="sm" />
            <Skeleton className="h-0.5 w-12" radius="none" />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8">
            {/* Meta */}
            <div className="flex items-center gap-3 mb-4">
              <Skeleton className="h-4 w-32" radius="sm" />
              <Skeleton className="h-4 w-24" radius="sm" />
            </div>

            {/* Title */}
            <Skeleton className="h-10 w-3/4 mb-4" radius="sm" />

            {/* Description */}
            <Skeleton className="h-6 w-full mb-2" radius="sm" />
            <Skeleton className="h-6 w-2/3 mb-8" radius="sm" />

            {/* Button */}
            <Skeleton className="h-12 w-40" radius="lg" />

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-center md:text-left">
                    <Skeleton className="h-10 w-20 mb-2 mx-auto md:mx-0" radius="sm" />
                    <Skeleton className="h-4 w-16 mx-auto md:mx-0" radius="sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
