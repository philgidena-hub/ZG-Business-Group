'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui';

// =====================================================
// Parallax Section Component
// Oliver Larose style background parallax effect
// Uses clip-path, fixed positioning, and mix-blend-mode
// =====================================================

export interface ParallaxSectionProps {
  /** Background image URL */
  image: string;
  /** Alt text for the image */
  alt?: string;
  /** Content to display over the parallax */
  children?: React.ReactNode;
  /** Additional className */
  className?: string;
}

export function ParallaxSection({
  image,
  alt = 'Parallax background',
  children,
  className,
}: ParallaxSectionProps) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div
      ref={container}
      className={cn(
        'relative flex items-center justify-center h-screen overflow-hidden',
        className
      )}
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      {/* Content layer with mix-blend-difference */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>

      {/* Fixed parallax background */}
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}

// =====================================================
// Parallax Quote Section
// Quote content with Oliver Larose parallax effect
// =====================================================

export interface ParallaxQuoteSectionProps {
  /** Background image URL */
  image: string;
  /** Quote text */
  quote: string;
  /** Attribution */
  author?: string;
  /** Author title */
  title?: string;
}

export function ParallaxQuoteSection({
  image,
  quote,
  author,
  title,
}: ParallaxQuoteSectionProps) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      {/* Content with mix-blend-difference */}
      <div className="relative z-10 p-8 md:p-20 mix-blend-difference text-white w-full h-full flex flex-col justify-center items-center">
        <Container className="text-center max-w-4xl">
          {/* Quote mark */}
          <svg
            className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-8 opacity-60"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          {/* Quote text */}
          <blockquote className="text-[5vw] md:text-[3vw] font-light leading-tight mb-8 uppercase">
            {quote}
          </blockquote>

          {/* Attribution */}
          {(author || title) && (
            <div className="text-[2vw] md:text-[1.2vw]">
              {author && <p className="font-semibold">{author}</p>}
              {title && <p className="opacity-60 mt-1">{title}</p>}
            </div>
          )}
        </Container>
      </div>

      {/* Fixed parallax background */}
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <Image
            src={image}
            alt="Quote background"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}

// =====================================================
// Parallax Stats Section
// Statistics with Oliver Larose parallax effect
// =====================================================

export interface ParallaxStat {
  value: string | number;
  suffix?: string;
  label: string;
}

export interface ParallaxStatsSectionProps {
  /** Background image URL */
  image: string;
  /** Stats to display */
  stats: ParallaxStat[];
  /** Optional headline */
  headline?: string;
}

export function ParallaxStatsSection({
  image,
  stats,
  headline,
}: ParallaxStatsSectionProps) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-earth-anchor/60 z-[5]" />

      {/* Content */}
      <div className="relative z-10 p-8 md:p-20 text-white w-full h-full flex flex-col justify-center">
        <Container>
          {headline && (
            <h2 className="text-[4vw] md:text-[2.5vw] font-semibold text-center mb-12 md:mb-16 uppercase text-paper-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
              {headline}
            </h2>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-[8vw] md:text-[5vw] font-bold leading-none mb-2 text-paper-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  {stat.value}
                  {stat.suffix && (
                    <span className="text-[5vw] md:text-[3vw] text-highland-gold">{stat.suffix}</span>
                  )}
                </div>
                <p className="text-[2.5vw] md:text-[1vw] uppercase tracking-wider text-paper-white/90">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Fixed parallax background */}
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <Image
            src={image}
            alt="Stats background"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
      </div>
    </div>
  );
}

// =====================================================
// Parallax Divider
// Simple visual break with Oliver Larose parallax
// =====================================================

export interface ParallaxDividerProps {
  /** Background image URL */
  image: string;
  /** Alt text */
  alt?: string;
  /** Optional text overlay */
  text?: string;
}

export function ParallaxDivider({
  image,
  alt = 'Section divider',
  text,
}: ParallaxDividerProps) {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-[50vh] md:h-[70vh] overflow-hidden"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      {/* Optional text with mix-blend-difference */}
      {text && (
        <div className="relative z-10 p-8 mix-blend-difference text-white">
          <p className="text-[8vw] md:text-[5vw] font-bold uppercase text-center">
            {text}
          </p>
        </div>
      )}

      {/* Fixed parallax background */}
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </div>
    </div>
  );
}

export default ParallaxSection;
