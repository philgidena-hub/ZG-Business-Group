'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Text } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { founderQuote } from '@/lib/mock-data';

// =====================================================
// Impact Quote Section Component
// Founder quote with CEO image - AWWWARDS style
// =====================================================

export interface ImpactQuoteProps {
  /** Quote text */
  quote?: string;
  /** Quote author name */
  author?: string;
  /** Author title/position */
  title?: string;
}

// Animated quote with fade-in effect
function AnimatedQuote({ text }: { text: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.span>
  );
}

export function ImpactQuote({ quote, author, title }: ImpactQuoteProps) {
  // Use CMS content or fallback to mock data
  const displayQuote = quote || founderQuote.text;
  const displayAuthor = author || founderQuote.author;
  const displayTitle = title || founderQuote.title;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const quoteY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={ref}
      className="relative py-20 md:py-28 lg:py-36 bg-earth-anchor overflow-hidden"
      aria-label="Founder Quote"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-highland-gold/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-highland-gold/10 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* CEO Image - Left side */}
          <motion.div
            className="lg:col-span-5 relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative mx-auto lg:mx-0 max-w-sm lg:max-w-none">
              {/* Decorative frame */}
              <div className="absolute -inset-4 border border-highland-gold/20 rounded-lg" />
              <div className="absolute -inset-8 border border-highland-gold/10 rounded-lg hidden lg:block" />

              {/* Gold accent corner */}
              <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-highland-gold" />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-highland-gold" />

              {/* Image container with creative crop */}
              <motion.div
                className="relative aspect-[3/4] overflow-hidden rounded-lg"
                style={{ y: imageY }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ scale: imageScale }}
                >
                  <Image
                    src="/CEO Doctor Zeru gebrelibanos Asefa_ (1).jpg"
                    alt="Dr. Zeru Gebrelibanos Asefa - Founder & CEO"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                  {/* Gradient overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor/60 via-transparent to-transparent" />
                </motion.div>
              </motion.div>

              {/* Floating name tag */}
              <motion.div
                className="absolute -bottom-4 -right-4 lg:right-auto lg:-left-4 bg-highland-gold px-5 py-3 rounded shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Text size="sm" weight="semibold" className="text-earth-anchor whitespace-nowrap">
                  Dr. Zeru G. Asefa
                </Text>
                <Text size="caption" className="text-earth-anchor/70">
                  Founder & CEO
                </Text>
              </motion.div>
            </div>
          </motion.div>

          {/* Quote - Right side */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            {/* Large decorative quote mark */}
            <motion.div
              className="text-highland-gold/20 mb-4 lg:mb-6"
              style={{ y: quoteY }}
            >
              <svg
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
            </motion.div>

            {/* Quote text */}
            <blockquote>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-snug md:leading-snug lg:leading-tight">
                <AnimatedQuote text={displayQuote} />
              </h2>
            </blockquote>

            {/* Attribution */}
            <FadeIn delay={0.6}>
              <footer className="mt-8 md:mt-10 lg:mt-12">
                {/* Animated line */}
                <motion.div
                  className="w-0 h-px bg-highland-gold mb-6"
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                <div className="hidden lg:block">
                  <Text
                    size="lg"
                    weight="semibold"
                    color="gold"
                    className="tracking-wide"
                  >
                    {displayAuthor}
                  </Text>
                  <Text
                    size="sm"
                    color="white"
                    className="opacity-50 mt-1 uppercase tracking-widest"
                  >
                    {displayTitle}
                  </Text>
                </div>

                {/* Mobile attribution (hidden on lg since we have floating tag) */}
                <div className="lg:hidden">
                  <Text
                    size="lg"
                    weight="semibold"
                    color="gold"
                    className="tracking-wide"
                  >
                    {displayAuthor}
                  </Text>
                  <Text
                    size="sm"
                    color="white"
                    className="opacity-50 mt-1 uppercase tracking-widest"
                  >
                    {displayTitle}
                  </Text>
                </div>
              </footer>
            </FadeIn>

            {/* Closing quote mark */}
            <motion.div
              className="text-highland-gold/10 mt-6 flex justify-end"
              style={{ y: useTransform(scrollYProgress, [0, 1], [-20, 20]) }}
            >
              <svg
                className="w-12 h-12 md:w-16 md:h-16 rotate-180"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
            </motion.div>
          </div>
        </div>
      </Container>

      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-earth-anchor to-transparent" />
    </section>
  );
}

export default ImpactQuote;
