'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { groupProfile } from '@/lib/mock-data';

// =====================================================
// Introduction Section Component
// Philosophy and company overview - Premium version
// =====================================================

// Default image for about section
const defaultAboutImage = 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80';

export interface IntroductionProps {
  /** Section ID for anchor links */
  id?: string;
  /** Headline for the about section */
  headline?: string;
  /** Philosophy text (paragraphs separated by double newlines) */
  philosophy?: string;
  /** Vision statement */
  vision?: string;
  /** Mission statement */
  mission?: string;
  /** About image URL */
  aboutImage?: string;
}

export function Introduction({
  id = 'about',
  headline,
  philosophy,
  vision,
  mission,
  aboutImage,
}: IntroductionProps) {
  // Use CMS content or fallback to mock data
  const displayPhilosophy = philosophy || groupProfile.philosophy;
  const displayVision = vision || groupProfile.vision;
  const displayMission = mission || groupProfile.mission;
  const displayImage = aboutImage || defaultAboutImage;

  // Split philosophy into paragraphs
  const paragraphs = displayPhilosophy?.split('\n\n') || [];

  return (
    <section
      id={id}
      className="py-24 md:py-32 lg:py-40 bg-paper-white relative overflow-hidden"
      aria-label="About ZG Business Group"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-neutral-50 to-transparent pointer-events-none" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Left Column - Image & Stats */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <FadeIn>
              <div className="relative">
                {/* Main image with frame effect */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src={displayImage}
                    alt="ZG Business Group Headquarters"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor/40 via-transparent to-transparent" />
                </div>

                {/* Decorative frame */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-full h-full border-2 border-highland-gold/20 rounded-2xl -z-10"
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                />

                {/* Floating stat card */}
                <motion.div
                  className="absolute -bottom-8 -left-4 md:left-8 bg-earth-anchor text-white p-6 rounded-xl shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <span className="block text-4xl font-light text-highland-gold">17+</span>
                  <span className="text-sm text-white/60 uppercase tracking-wider">Years of Excellence</span>
                </motion.div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7">
            {/* Section label */}
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <AccentLine size="lg" />
                <Text
                  size="caption"
                  color="gold"
                  className="uppercase tracking-[0.2em]"
                >
                  Our Story
                </Text>
              </div>
            </FadeIn>

            {/* Large headline */}
            <FadeIn delay={0.1}>
              <Heading as="h2" size="h1" className="mb-8">
                Rooted in <span className="text-highland-gold">Ethiopian soil</span>,
                growing toward <span className="text-highland-gold">global horizons</span>
              </Heading>
            </FadeIn>

            {/* Philosophy paragraphs */}
            <div className="space-y-6 mb-12">
              {paragraphs.map((paragraph, index) => (
                <FadeIn key={index} delay={0.2 + index * 0.1}>
                  {index === paragraphs.length - 1 ? (
                    <Text
                      size="lg"
                      weight="medium"
                      className="text-highland-gold border-l-2 border-highland-gold pl-6"
                    >
                      {paragraph}
                    </Text>
                  ) : (
                    <Text size="lg" className="text-neutral-600 leading-relaxed">
                      {paragraph}
                    </Text>
                  )}
                </FadeIn>
              ))}
            </div>

            {/* Vision & Mission - Card style */}
            <FadeIn delay={0.5}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vision Card */}
                <motion.div
                  className="group p-6 bg-earth-anchor rounded-xl hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-highland-gold/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-highland-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <Text size="caption" className="uppercase tracking-wider font-medium text-highland-gold">
                      Our Vision
                    </Text>
                  </div>
                  <Text size="base" className="text-paper-white/90">
                    {displayVision}
                  </Text>
                </motion.div>

                {/* Mission Card */}
                <motion.div
                  className="group p-6 bg-earth-anchor rounded-xl hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-highland-gold/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-highland-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
                    <Text size="caption" className="uppercase tracking-wider font-medium text-highland-gold">
                      Our Mission
                    </Text>
                  </div>
                  <Text size="base" className="text-paper-white/90">
                    {displayMission}
                  </Text>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Introduction;
