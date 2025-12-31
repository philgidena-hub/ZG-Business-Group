'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Text } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { founderQuote } from '@/lib/mock-data';

// =====================================================
// Impact Quote Section Component
// Founder quote with dark background - AWWWARDS style
// =====================================================

export interface ImpactQuoteProps {
  /** Quote text */
  quote?: string;
  /** Quote author name */
  author?: string;
  /** Author title/position */
  title?: string;
}

// Animated quote with fade-in effect (simpler, cleaner approach)
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

  // Parallax effect for decorative elements
  const quoteY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-36 lg:py-48 bg-earth-anchor overflow-hidden"
      aria-label="Founder Quote"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale }}
      >
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-highland-gold/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-coffee-earth/20 blur-3xl" />
      </motion.div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large quote marks as decoration with parallax */}
        <motion.div
          className="absolute top-8 left-8 md:left-16 lg:left-24 text-paper-white/5 pointer-events-none"
          style={{ y: quoteY }}
        >
          <svg
            className="w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </motion.div>

        {/* Closing quote mark */}
        <motion.div
          className="absolute bottom-8 right-8 md:right-16 lg:right-24 text-paper-white/5 pointer-events-none rotate-180"
          style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        >
          <svg
            className="w-32 h-32 md:w-40 md:h-40 lg:w-56 lg:h-56"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
          </svg>
        </motion.div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-earth/20 via-transparent to-highland-gold/10" />
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Quote with word-by-word reveal */}
          <blockquote>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-snug md:leading-snug lg:leading-snug">
              <span className="text-highland-gold">"</span>
              <AnimatedQuote text={displayQuote} />
              <span className="text-highland-gold">"</span>
            </h2>
          </blockquote>

          {/* Attribution with mask reveal effect */}
          <FadeIn delay={0.8}>
            <footer className="mt-12 md:mt-16">
              {/* Animated line */}
              <motion.div
                className="w-0 h-px bg-highland-gold mx-auto mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="flex items-center justify-center gap-4">
                <div>
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
              </div>
            </footer>
          </FadeIn>
        </div>
      </Container>

      {/* Bottom fade transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-earth-anchor to-transparent" />
    </section>
  );
}

export default ImpactQuote;
