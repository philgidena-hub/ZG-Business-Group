'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Container, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem, StatCounter } from '@/components/motion';

// =====================================================
// Impact Page
// Social and economic impact showcase
// =====================================================

const impactStats = [
  { value: 5000, suffix: '+', label: 'Jobs Created', icon: '👥' },
  { value: 50000, suffix: '+', label: 'Lives Impacted', icon: '🌍' },
  { value: 100, suffix: 'M+', label: 'ETB Invested in Communities', icon: '💰' },
  { value: 15, suffix: '+', label: 'Years of Impact', icon: '📈' },
];

const impactAreas = [
  {
    title: 'Economic Empowerment',
    description: 'Creating sustainable livelihoods through employment, training, and entrepreneurship support across all our operations.',
    icon: '💼',
    stats: { value: '5,000+', label: 'Direct employees' },
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
  },
  {
    title: 'Community Development',
    description: 'Investing in infrastructure, healthcare, and education to strengthen the communities where we operate.',
    icon: '🏘️',
    stats: { value: '25+', label: 'Community projects' },
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
  },
  {
    title: 'Environmental Stewardship',
    description: 'Implementing sustainable practices across our operations to protect Ethiopia\'s natural heritage for future generations.',
    icon: '🌱',
    stats: { value: '10,000+', label: 'Trees planted' },
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
  },
  {
    title: 'Skills & Training',
    description: 'Developing local talent through vocational training, internships, and professional development programs.',
    icon: '📚',
    stats: { value: '2,500+', label: 'People trained' },
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
  },
];

const sdgGoals = [
  { number: 1, title: 'No Poverty', color: 'bg-red-500' },
  { number: 8, title: 'Decent Work', color: 'bg-pink-600' },
  { number: 9, title: 'Industry & Innovation', color: 'bg-orange-500' },
  { number: 11, title: 'Sustainable Cities', color: 'bg-amber-500' },
  { number: 12, title: 'Responsible Consumption', color: 'bg-yellow-600' },
  { number: 13, title: 'Climate Action', color: 'bg-green-600' },
];

const testimonials = [
  {
    quote: "ZG Group's training program transformed my life. I went from unemployment to becoming a skilled technician with a stable income.",
    author: "Abebe Tadesse",
    role: "Former trainee, now Site Supervisor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    quote: "The community center built by ZG Group has become the heart of our neighborhood. Our children now have a safe place to learn and play.",
    author: "Tigist Haile",
    role: "Community Leader, Hawassa",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
  },
];

export default function ImpactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main>
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imageY }}>
          <Image
            src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1920&q=80"
            alt="Community Impact"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-earth-anchor/90 via-earth-anchor/70 to-earth-anchor/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor via-transparent to-transparent" />

        <motion.div className="relative h-full z-10" style={{ opacity }}>
          <Container className="h-full flex items-center">
            <div className="max-w-3xl">
              <FadeIn>
                <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                  Our Impact
                </Text>
                <AccentLine size="md" className="mb-6" />
              </FadeIn>

              <FadeIn delay={0.1}>
                <Heading as="h1" size="display-lg" color="white" className="mb-6">
                  Building a Better
                  <span className="text-highland-gold"> Ethiopia</span>
                </Heading>
              </FadeIn>

              <FadeIn delay={0.2}>
                <Text size="lg" color="white" className="opacity-80 max-w-2xl">
                  For over 15 years, we've been creating lasting positive change in the
                  communities where we operate, touching thousands of lives across East Africa.
                </Text>
              </FadeIn>
            </div>
          </Container>
        </motion.div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-earth-anchor relative -mt-20 z-20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.1}>
                <div className="text-center">
                  <span className="text-4xl mb-3 block">{stat.icon}</span>
                  <StatCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    label={stat.label}
                    delay={0.5 + index * 0.1}
                    size="lg"
                    numberColor="gold"
                    labelColor="white"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* Impact Areas */}
      <section className="py-20 md:py-28 bg-paper-white">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Areas of Focus
              </Text>
              <Heading as="h2" size="h1" className="mb-6">
                How We Create Impact
              </Heading>
              <Text size="lg" color="muted">
                Our impact strategy focuses on four key areas that drive sustainable
                development and create lasting change.
              </Text>
            </div>
          </FadeIn>

          <div className="space-y-20">
            {impactAreas.map((area, index) => (
              <FadeIn key={area.title} delay={0.1}>
                <div className={cn(
                  'grid grid-cols-1 lg:grid-cols-2 gap-12 items-center',
                  index % 2 === 1 && 'lg:flex-row-reverse'
                )}>
                  {/* Image */}
                  <motion.div
                    className={cn(
                      'relative aspect-[4/3] rounded-2xl overflow-hidden',
                      index % 2 === 1 && 'lg:order-2'
                    )}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={area.image}
                      alt={area.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor/40 to-transparent" />

                    {/* Stats overlay */}
                    <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-6 py-4">
                      <span className="block text-3xl font-semibold text-earth-anchor">
                        {area.stats.value}
                      </span>
                      <span className="text-sm text-neutral-500">{area.stats.label}</span>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <span className="text-5xl mb-6 block">{area.icon}</span>
                    <Heading as="h3" size="h2" className="mb-4">
                      {area.title}
                    </Heading>
                    <Text size="lg" color="muted" className="mb-6">
                      {area.description}
                    </Text>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-highland-gold font-medium hover:underline"
                    >
                      Learn More
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* SDG Alignment */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Global Goals
              </Text>
              <Heading as="h2" size="h2" className="mb-6">
                UN Sustainable Development Goals
              </Heading>
              <Text size="lg" color="muted">
                Our operations align with the United Nations Sustainable Development Goals,
                contributing to global efforts for a better future.
              </Text>
            </div>
          </FadeIn>

          <FadeInStagger stagger={0.1} className="flex flex-wrap justify-center gap-4">
            {sdgGoals.map((goal) => (
              <FadeInStaggerItem key={goal.number}>
                <motion.div
                  className={cn(
                    'w-24 h-24 rounded-xl flex flex-col items-center justify-center text-white',
                    goal.color
                  )}
                  whileHover={{ scale: 1.1, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <span className="text-3xl font-bold">{goal.number}</span>
                  <span className="text-xs text-center px-2 mt-1 leading-tight">{goal.title}</span>
                </motion.div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-earth-anchor">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Stories of Change
              </Text>
              <Heading as="h2" size="h2" color="white">
                Voices from Our Community
              </Heading>
            </div>
          </FadeIn>

          <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <FadeInStaggerItem key={index}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <svg className="w-10 h-10 text-highland-gold/50 mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <Text size="lg" color="white" className="mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </Text>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <span className="block text-white font-medium">{testimonial.author}</span>
                      <span className="text-white/60 text-sm">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        </Container>
      </section>

      {/* Impact Report CTA */}
      <section className="py-20 md:py-28 bg-paper-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-highland-gold/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-eucalyptus/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <span className="text-6xl mb-6 block">📊</span>
                  <Heading as="h2" size="h2" className="mb-4">
                    2024 Impact Report
                  </Heading>
                  <Text size="lg" color="muted" className="mb-8 max-w-2xl mx-auto">
                    Download our comprehensive annual report to learn more about our
                    social, economic, and environmental initiatives.
                  </Text>
                  <Link
                    href="/downloads"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-earth-anchor text-paper-white font-medium rounded-lg hover:bg-coffee-earth transition-colors"
                  >
                    Download Report
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-neutral-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <Heading as="h2" size="h2" className="mb-6">
                Partner With Us for Impact
              </Heading>
              <Text size="lg" color="muted" className="mb-8">
                Join us in creating lasting positive change. Whether through partnership,
                investment, or collaboration, together we can build a better future.
              </Text>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-earth-anchor text-paper-white font-medium rounded-lg hover:bg-coffee-earth transition-colors"
                >
                  Get in Touch
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-neutral-300 text-earth-anchor font-medium rounded-lg hover:bg-neutral-100 transition-colors"
                >
                  Learn About Us
                </Link>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </main>
  );
}
