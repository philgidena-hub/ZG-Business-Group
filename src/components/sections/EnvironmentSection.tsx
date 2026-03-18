'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Container, Section, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn } from '@/components/motion';

export function EnvironmentSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 bg-paper-white overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <FadeIn>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <motion.div style={{ y: imageY }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
                <Image
                  src="/parallax replacements/IMG_4581 (1).JPG"
                  alt="Environmental initiative — reforestation and community engagement"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </motion.div>
              {/* Gold corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-highland-gold" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-highland-gold" />
            </div>
          </FadeIn>

          {/* Content */}
          <FadeIn delay={0.2}>
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              Environmental Stewardship
            </Text>
            <AccentLine size="md" className="mb-6" />
            <Heading as="h2" size="h2" className="mb-6">
              Investing in Nature,{' '}
              <span className="text-highland-gold">Growing the Future</span>
            </Heading>
            <Text size="lg" color="muted" className="leading-relaxed">
              Through hands-on environmental initiatives, we support reforestation, climate resilience, and long-term economic growth. By investing in nature today, we help build a healthier environment and a stronger future for generations to come.
            </Text>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
