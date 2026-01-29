'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';
import { allProjects } from '@/lib/mock-data';

interface ProjectItem {
  id: string | number;
  title: string;
  slug: string;
  project_type: string;
  project_status: string;
  location_name: string;
  summary: string;
}

// =====================================================
// Projects Page
// Showcase of all projects
// =====================================================

const projectImages: Record<string, string> = {
  'riverside-heights': 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?w=800&q=80',
  'bole-commercial-tower': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  'hawassa-lakeside-resort': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  'coffee-processing-facility': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
  'green-valley-estate': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  'agricultural-training-center': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
};

const statusFilters = ['all', 'completed', 'in_progress', 'planned'] as const;
type StatusFilter = typeof statusFilters[number];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/projects`);
        const data = await res.json();
        const fetchedData = data.data || [];
        // Use fetched data if available, otherwise fallback to mock data
        setProjects(fetchedData.length > 0 ? fetchedData : allProjects as ProjectItem[]);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback to mock data on error
        setProjects(allProjects as ProjectItem[]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p: ProjectItem) => p.project_status === activeFilter);

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
              From landmark developments to community infrastructure, explore the
              projects shaping Ethiopia's future.
            </Text>
          </FadeIn>
        </Container>
      </section>

      {/* Filter Bar */}
      <section className="py-6 bg-paper-white border-b border-neutral-200 sticky top-18 z-30">
        <Container>
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {statusFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  activeFilter === filter
                    ? 'bg-earth-anchor text-paper-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                )}
              >
                {filter === 'all' ? 'All Projects' :
                 filter === 'in_progress' ? 'In Progress' :
                 filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects Grid */}
      <section className="py-20 md:py-28 bg-paper-white">
        <Container>
          {loading ? (
            <div className="text-center py-12">
              <Text color="muted">Loading projects...</Text>
            </div>
          ) : (
            <>
              <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <FadeInStaggerItem key={project.id}>
                    <ProjectCard
                      project={project}
                      image={projectImages[project.slug] || projectImages['riverside-heights']}
                    />
                  </FadeInStaggerItem>
                ))}
              </FadeInStagger>

              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <Text size="lg" color="muted">No projects found with this filter.</Text>
                </div>
              )}
            </>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <Heading as="h2" size="h2" className="mb-6">
                Have a Project in Mind?
              </Heading>
              <Text size="lg" color="muted" className="mb-8">
                We partner with visionary developers and investors to bring
                transformative projects to life.
              </Text>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-earth-anchor text-paper-white font-medium rounded-lg hover:bg-coffee-earth transition-colors"
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

// Project Card Component
interface ProjectCardProps {
  project: ProjectItem;
  image: string;
}

const statusColors: Record<string, string> = {
  completed: 'bg-eucalyptus text-white',
  in_progress: 'bg-highland-gold text-earth-anchor',
  planned: 'bg-neutral-200 text-neutral-600',
};

function ProjectCard({ project, image }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block rounded-2xl overflow-hidden bg-white border border-neutral-200 hover:border-highland-gold/30 hover:shadow-xl transition-all duration-500"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
          <Image
            src={image}
            alt={project.title || 'Project'}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium',
              statusColors[project.project_status || 'planned']
            )}>
              {project.project_status === 'in_progress' ? 'In Progress' :
               (project.project_status?.charAt(0).toUpperCase() ?? '') + (project.project_status?.slice(1) ?? '')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Type & Location */}
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-3">
            <span className="capitalize">{project.project_type}</span>
            <span>•</span>
            <span>{project.location_name}</span>
          </div>

          {/* Title */}
          <Heading as="h3" size="h4" className="mb-3 group-hover:text-highland-gold transition-colors">
            {project.title}
          </Heading>

          {/* Summary */}
          <Text size="sm" color="muted" className="line-clamp-2">
            {project.summary}
          </Text>

          {/* View link */}
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-highland-gold opacity-0 group-hover:opacity-100 transition-opacity">
            View Project
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
