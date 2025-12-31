'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container, Text, Heading } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { partnerLogos } from '@/lib/mock-data';

// =====================================================
// Partners Section Component
// Infinite scrolling logo marquee - Premium style
// =====================================================

export function Partners() {
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section
      className="py-16 md:py-24 bg-paper-white border-t border-neutral-100 overflow-hidden"
      aria-label="Partners and Affiliations"
    >
      <Container>
        <FadeIn className="text-center mb-10 md:mb-12">
          <Text
            size="caption"
            color="gold"
            className="uppercase tracking-wider mb-3"
          >
            Trusted By
          </Text>
          <Heading as="h2" size="h3" className="text-earth-anchor">
            Our Partners & Affiliations
          </Heading>
        </FadeIn>
      </Container>

      {/* Infinite Scrolling Marquee */}
      <div className="relative">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-paper-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-paper-white to-transparent z-10 pointer-events-none" />

        {/* Marquee container */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-8 md:gap-12"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              x: {
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {duplicatedLogos.map((partner, index) => (
              <div
                key={`${partner.slug}-${index}`}
                className="flex-shrink-0 flex items-center justify-center px-5 md:px-8 py-4 md:py-5 bg-white rounded-lg border border-neutral-100 hover:border-highland-gold/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative w-28 h-12 md:w-36 md:h-14">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    sizes="(max-width: 768px) 112px, 144px"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Call to partnership */}
      <Container>
        <FadeIn delay={0.2} className="text-center mt-10 md:mt-12">
          <Text size="sm" color="muted">
            Interested in partnering with us?{' '}
            <a href="/contact" className="text-highland-gold hover:underline font-medium">
              Get in touch
            </a>
          </Text>
        </FadeIn>
      </Container>
    </section>
  );
}

export default Partners;
