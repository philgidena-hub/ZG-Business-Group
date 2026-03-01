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
    title: 'Education & Human Capital Development',
    description: 'This category focuses on investing in people through education and skills development. Bond proceeds allocated here support the construction and rehabilitation of schools, provision of learning materials, teacher support programs, scholarships for disadvantaged students, and vocational training centers. The aim is to build a skilled workforce, reduce unemployment, and empower youth and women with practical competencies that contribute to national productivity.',
    icon: '🎓',
    stats: { value: '5,000+', label: 'People trained' },
    image: '/images/impact/impact-skills.jpg',
  },
  {
    title: 'Agriculture, Food Security & Rural Livelihoods',
    description: 'Funds under this category are directed toward improving agricultural productivity and rural income generation. This includes support for smallholder farmers, irrigation systems, improved seeds, agro-processing facilities, storage infrastructure, and market access programs. The goal is to enhance food security, increase farmer incomes, promote value-chain development, and strengthen rural economies while ensuring sustainable land and water use.',
    icon: '🌾',
    stats: { value: '10,000+', label: 'Farmers supported' },
    image: '/images/impact/impact-environment.jpg',
  },
  {
    title: 'Health, Nutrition & Community Well-Being',
    description: 'This category addresses basic human needs and quality of life. Bond resources are used to support primary healthcare facilities, maternal and child health programs, nutrition initiatives, clean water access, sanitation projects, and community clinics. Special emphasis is placed on reducing malnutrition, improving preventive healthcare, and expanding access to essential services in underserved communities.',
    icon: '🏥',
    stats: { value: '25+', label: 'Community projects' },
    image: '/images/impact/impact-community.jpg',
  },
  {
    title: 'Enterprise Development, Infrastructure & Job Creation',
    description: 'This pillar supports inclusive economic growth through enterprise development and infrastructure investment. Allocations cover SME financing, youth entrepreneurship programs, industrial parks, renewable energy, affordable housing, logistics, and digital infrastructure. The objective is to stimulate private sector growth, attract investment, create sustainable jobs, and strengthen national production capacity.',
    icon: '🏗️',
    stats: { value: '2,500+', label: 'Jobs created' },
    image: '/images/impact/impact-economic.jpg',
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
    quote: "I had the privilege of visiting Tigray and touring several development and business sites led by ZG Business Group. The experience was both inspiring and deeply moving. I personally visited their agricultural projects, farm operations, and community initiatives, including schools being constructed and donated to local people. What impressed me most was the genuine integration of enterprise with social responsibility. ZG Business Group is not only building businesses — they are building futures. Their investments in agriculture, education, and community development demonstrate a strong commitment to inclusive growth and sustainable impact. I was truly excited by the scale of their vision and the sincerity of their service to the people. I commend the leadership and team for their dedication to empowering communities while driving economic progress. This is development in action, and I look forward to strengthening our partnership going forward.",
    author: "Ambassador Dr. Hillary Emoh",
    role: "Official Visit to Tigray",
    image: "/testimonials/Ambassador_Dr_Hillary_Emoh.png",
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
            src="/images/impact/impact-community.jpg"
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
                ZG Business Group – Bond Business Distribution into Four Social Contribution Categories
              </Heading>
              <Text size="lg" color="muted">
                This document outlines how ZG Business Group's Bond Business Program can be strategically
                distributed into four key social contribution categories. The objective is to ensure that
                financial growth directly supports sustainable community development, economic empowerment,
                and long-term national impact.
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

      {/* Conclusion */}
      <section className="py-16 md:py-20 bg-neutral-50">
        <Container>
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Conclusion
              </Text>
              <Text size="lg" color="muted" className="leading-relaxed">
                By structuring the ZG Business Group Bond Business Program across these four categories,
                financial returns are directly linked to measurable social impact. This integrated approach
                ensures that investments contribute not only to commercial success but also to education,
                food security, health, and job creation — laying the foundation for resilient communities
                and long-term economic transformation.
              </Text>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Testimonial */}
      <section className="py-20 md:py-28 bg-earth-anchor">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                Voices of Impact
              </Text>
              <Heading as="h2" size="h2" color="white">
                What Our Partners Say
              </Heading>
            </div>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={index} delay={0.1}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
                  {/* Context label */}
                  <Text size="sm" className="text-highland-gold font-semibold uppercase tracking-wider mb-6">
                    Ambassador Dr. Hillary Emoh Visits Tigray — A Testament to Impact, Partnership, and Community Development
                  </Text>

                  <svg className="w-10 h-10 text-highland-gold/40 mb-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>

                  <Text size="lg" color="white" className="mb-8 leading-relaxed opacity-90">
                    "{testimonial.quote}"
                  </Text>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden relative flex-shrink-0 border-2 border-highland-gold/30">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.author}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <span className="block text-white font-semibold text-lg">{testimonial.author}</span>
                      <span className="text-highland-gold/80 text-sm">{testimonial.role}</span>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
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
