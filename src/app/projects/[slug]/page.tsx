'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';

interface ProjectItem {
  id: number;
  title: string;
  slug: string;
  project_type: string;
  project_status: string;
  location_name: string;
  summary: string;
  estimated_completion?: string;
}

// =====================================================
// Project Detail Page
// Individual project showcase
// =====================================================

const projectImages: Record<string, { main: string; gallery: string[] }> = {
  'riverside-heights': {
    main: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
  },
  'bole-commercial-tower': {
    main: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1554435493-93422e8220c8?w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
    ],
  },
  'hawassa-lakeside-resort': {
    main: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    ],
  },
  'coffee-processing-facility': {
    main: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80',
    ],
  },
  'green-valley-estate': {
    main: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
    ],
  },
  'agricultural-training-center': {
    main: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
    ],
  },
};

const statusColors: Record<string, string> = {
  completed: 'bg-eucalyptus text-white',
  in_progress: 'bg-highland-gold text-earth-anchor',
  planned: 'bg-neutral-200 text-neutral-600',
};

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/projects`);
        const data = await res.json();
        const projects: ProjectItem[] = data.data || [];
        const currentProject = projects.find(p => p.slug === slug);
        setProject(currentProject || null);

        // Find related projects (same type, exclude current)
        if (currentProject) {
          const related = projects
            .filter(p => p.project_type === currentProject.project_type && p.slug !== slug)
            .slice(0, 2);
          setRelatedProjects(related);
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  const images = projectImages[slug] || projectImages['riverside-heights'];

  if (loading) {
    return (
      <main className="pt-32 pb-20 min-h-screen bg-paper-white">
        <Container>
          <Text size="lg" color="muted">Loading project...</Text>
        </Container>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="pt-32 pb-20 min-h-screen bg-paper-white">
        <Container>
          <Heading as="h1" size="h1" className="mb-4">Project Not Found</Heading>
          <Text size="lg" color="muted" className="mb-8">
            The project you're looking for doesn't exist.
          </Text>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-highland-gold hover:underline"
          >
            ← Back to Projects
          </Link>
        </Container>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src={images.main}
          alt={project.title || 'Project'}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor via-earth-anchor/50 to-transparent" />

        {/* Content */}
        <Container className="relative h-full flex items-end pb-16 z-10">
          <div className="max-w-3xl">
            <FadeIn>
              <div className="flex items-center gap-4 mb-6">
                <span className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-medium',
                  statusColors[project.project_status || 'planned']
                )}>
                  {project.project_status === 'in_progress' ? 'In Progress' :
                   (project.project_status?.charAt(0).toUpperCase() ?? '') + (project.project_status?.slice(1) ?? '')}
                </span>
                <span className="text-white/60 text-sm capitalize">{project.project_type}</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Heading as="h1" size="display-lg" color="white" className="mb-4">
                {project.title}
              </Heading>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex items-center gap-4 text-white/80">
                <span>{project.location_name}</span>
                {project.estimated_completion && (
                  <>
                    <span>•</span>
                    <span>{new Date(project.estimated_completion).getFullYear()}</span>
                  </>
                )}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Overview Section */}
      <section className="py-20 md:py-28 bg-paper-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <FadeIn>
                <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                  Overview
                </Text>
                <AccentLine size="md" className="mb-6" />
              </FadeIn>

              <FadeIn delay={0.1}>
                <Text size="lg" className="mb-8 leading-relaxed">
                  {project.summary}
                </Text>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="prose prose-lg max-w-none">
                  <p>
                    {project.title} represents our commitment to developing world-class infrastructure
                    that meets international standards while respecting local context and community needs.
                  </p>
                  <p>
                    This {project.project_type} project in {project.location_name} demonstrates our
                    integrated approach to development, combining innovative design with sustainable
                    construction practices.
                  </p>
                  <p>
                    Working with leading architects and engineers, we've created a development that
                    sets new benchmarks for quality and functionality in the region.
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Project Details Sidebar */}
            <div>
              <FadeIn delay={0.3}>
                <div className="bg-neutral-50 rounded-2xl p-8">
                  <Heading as="h3" size="h4" className="mb-6">
                    Project Details
                  </Heading>

                  <dl className="space-y-6">
                    <div>
                      <dt className="text-sm text-neutral-500 mb-1">Location</dt>
                      <dd className="font-medium">{project.location_name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-neutral-500 mb-1">Project Type</dt>
                      <dd className="font-medium capitalize">{project.project_type}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-neutral-500 mb-1">Status</dt>
                      <dd className="font-medium capitalize">
                        {project.project_status === 'in_progress' ? 'In Progress' : project.project_status}
                      </dd>
                    </div>
                    {project.estimated_completion && (
                      <div>
                        <dt className="text-sm text-neutral-500 mb-1">Estimated Completion</dt>
                        <dd className="font-medium">{new Date(project.estimated_completion).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              </FadeIn>
            </div>
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <Container>
          <FadeIn>
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              Gallery
            </Text>
            <AccentLine size="md" className="mb-8" />
          </FadeIn>

          <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.gallery.map((image, index) => (
              <FadeInStaggerItem key={index}>
                <motion.div
                  className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-earth-anchor/0 group-hover:bg-earth-anchor/30 transition-colors duration-300" />
                </motion.div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* Key Features */}
      <section className="py-20 md:py-28 bg-paper-white">
        <Container>
          <FadeIn>
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              Key Features
            </Text>
            <AccentLine size="md" className="mb-8" />
          </FadeIn>

          <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏗️', title: 'Quality Construction', desc: 'International building standards' },
              { icon: '🌱', title: 'Sustainable Design', desc: 'Eco-friendly materials and practices' },
              { icon: '📍', title: 'Prime Location', desc: 'Strategic positioning for growth' },
              { icon: '🤝', title: 'Community Focus', desc: 'Benefits for local communities' },
            ].map((feature, index) => (
              <FadeInStaggerItem key={index}>
                <div className="bg-neutral-50 rounded-xl p-6 h-full">
                  <span className="text-3xl mb-4 block">{feature.icon}</span>
                  <Heading as="h4" size="h4" className="mb-2">
                    {feature.title}
                  </Heading>
                  <Text size="sm" color="muted">
                    {feature.desc}
                  </Text>
                </div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 md:py-28 bg-neutral-50">
          <Container>
            <FadeIn>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                    Related Projects
                  </Text>
                  <Heading as="h2" size="h2">
                    Similar Developments
                  </Heading>
                </div>
                <Link
                  href="/projects"
                  className="hidden md:inline-flex items-center gap-2 text-highland-gold hover:underline"
                >
                  View All Projects
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </FadeIn>

            <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((relProject) => (
                <FadeInStaggerItem key={relProject.id}>
                  <Link
                    href={`/projects/${relProject.slug}`}
                    className="group block rounded-2xl overflow-hidden bg-white border border-neutral-200 hover:border-highland-gold/30 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={projectImages[relProject.slug!]?.main || images.main}
                        alt={relProject.title || 'Project'}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-6">
                      <Heading as="h3" size="h4" className="mb-2 group-hover:text-highland-gold transition-colors">
                        {relProject.title}
                      </Heading>
                      <Text size="sm" color="muted">
                        {relProject.location_name}
                      </Text>
                    </div>
                  </Link>
                </FadeInStaggerItem>
              ))}
            </FadeInStagger>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-earth-anchor">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <Heading as="h2" size="h2" color="white" className="mb-6">
                Interested in This Project?
              </Heading>
              <Text size="lg" color="white" className="opacity-80 mb-8">
                Contact us to learn more about investment opportunities or to discuss
                similar developments.
              </Text>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-highland-gold text-earth-anchor font-medium rounded-lg hover:bg-highland-gold/90 transition-colors"
                >
                  Get in Touch
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                >
                  View All Projects
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </main>
  );
}
