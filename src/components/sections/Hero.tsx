'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Container, Button } from '@/components/ui';
import { FadeIn, StatCounter } from '@/components/motion';
import { companyStats } from '@/lib/mock-data';
import type { HeroStat } from '@/types';

// =====================================================
// Hero Section Component
// Premium cinematic hero with advanced animations
// =====================================================

export interface HeroProps {
  /** Hero headline */
  headline?: string;
  /** Hero subheadline/description */
  description?: string;
  /** Background image URL */
  backgroundImage?: string;
  /** Background video URL (optional) */
  backgroundVideo?: string;
  /** Founding year for "Est. XXXX" display */
  foundingYear?: number;
  /** Headquarters location */
  headquarters?: string;
  /** Stats to display in the hero section */
  stats?: HeroStat[];
}

// Animated letter component for headline
function AnimatedLetter({
  letter,
  index,
  totalDelay = 0
}: {
  letter: string;
  index: number;
  totalDelay?: number;
}) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 40, rotateX: -90 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{
        duration: 0.8,
        delay: totalDelay + index * 0.03,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {letter === ' ' ? '\u00A0' : letter}
    </motion.span>
  );
}

// Animated word component
function AnimatedWord({
  word,
  wordIndex,
  charOffset,
  totalDelay = 0
}: {
  word: string;
  wordIndex: number;
  charOffset: number;
  totalDelay?: number;
}) {
  return (
    <span className="inline-block mr-[0.25em]">
      {word.split('').map((letter, letterIndex) => (
        <AnimatedLetter
          key={`${wordIndex}-${letterIndex}`}
          letter={letter}
          index={charOffset + letterIndex}
          totalDelay={totalDelay}
        />
      ))}
    </span>
  );
}

// Animated headline that reveals letter by letter
function AnimatedHeadline({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ');
  let charOffset = 0;

  return (
    <h1 className="text-5xl md:text-6xl lg:text-8xl font-semibold tracking-tight text-white leading-[0.95] perspective-1000">
      {words.map((word, wordIndex) => {
        const element = (
          <AnimatedWord
            key={wordIndex}
            word={word}
            wordIndex={wordIndex}
            charOffset={charOffset}
            totalDelay={delay}
          />
        );
        charOffset += word.length;
        return element;
      })}
    </h1>
  );
}

// Floating particles effect - optimized with fewer particles and CSS animations
function FloatingParticles() {
  // Use fixed positions to avoid re-renders
  const particles = [
    { left: '10%', top: '20%', delay: '0s' },
    { left: '25%', top: '60%', delay: '0.5s' },
    { left: '45%', top: '30%', delay: '1s' },
    { left: '65%', top: '70%', delay: '1.5s' },
    { left: '80%', top: '40%', delay: '2s' },
    { left: '90%', top: '80%', delay: '0.8s' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-highland-gold/30 rounded-full animate-float-particle"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </div>
  );
}

export function Hero({
  headline = "Shaping Africa's Future",
  description = "Since 2008, ZG Business Group has cultivated a diversified enterprise across 11 industries, creating lasting value for communities and partners across East Africa.",
  backgroundImage = 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1920&q=80',
  backgroundVideo,
  foundingYear = 2008,
  headquarters = 'Addis Ababa',
  stats,
}: HeroProps) {
  // Use CMS stats if provided, otherwise use mock data
  const displayStats = stats && stats.length > 0 ? stats : companyStats;
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth spring animations for parallax
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax transforms
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '20%']);
  const backgroundScale = useTransform(smoothProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(smoothProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);

  // Mouse parallax effect - throttled for performance
  useEffect(() => {
    let rafId: number | null = null;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastX = (e.clientX / window.innerWidth - 0.5) * 15;
      lastY = (e.clientY / window.innerHeight - 0.5) * 15;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          setMousePosition({ x: lastX, y: lastY });
          rafId = null;
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-earth-anchor"
      aria-label="Hero"
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 z-[5] opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Background Layer with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: backgroundY,
          scale: backgroundScale,
        }}
      >
        {/* Video Background (if provided) */}
        {backgroundVideo ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={backgroundImage}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : (
          /* Image Background with mouse parallax */
          <motion.div
            className="absolute inset-[-20px]"
            animate={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          >
            <Image
              src={backgroundImage}
              alt="ZG Business Group - Building Ethiopia"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        )}

        {/* Multi-layer gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-earth-anchor/90 via-earth-anchor/60 to-earth-anchor/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor via-transparent to-earth-anchor/50" />
        <div className="absolute inset-0 bg-gradient-to-br from-coffee-earth/30 via-transparent to-highland-gold/10" />
      </motion.div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Decorative elements */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        {/* Large decorative circle */}
        <motion.div
          className="absolute -right-64 top-1/4 w-[800px] h-[800px] rounded-full border border-highland-gold/10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="absolute -right-48 top-1/3 w-[600px] h-[600px] rounded-full border border-highland-gold/5"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Vertical line accent */}
        <motion.div
          className="absolute left-8 md:left-16 top-0 w-px h-full bg-gradient-to-b from-transparent via-highland-gold/20 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* Content Layer */}
      <motion.div
        className="relative z-10 w-full"
        style={{ y: contentY, opacity }}
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main content */}
            <div className="lg:col-span-8 xl:col-span-7">
              {/* Overline */}
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <span className="w-12 h-0.5 bg-highland-gold" />
                <span className="text-highland-gold text-sm font-medium uppercase tracking-[0.2em]">
                  Est. {foundingYear} • {headquarters}
                </span>
              </motion.div>

              {/* Animated Headline - Multi-line for impact */}
              <div className="mb-8">
                <h1
                  className="text-5xl md:text-6xl lg:text-8xl tracking-tight text-white leading-[0.95]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Shaping
                  </motion.span>
                  <motion.span
                    className="block text-highland-gold"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Africa's
                  </motion.span>
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Future
                  </motion.span>
                </h1>
              </div>

              {/* Description with reveal */}
              <motion.p
                className="text-lg md:text-xl text-white/80 mb-10 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {description}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  withArrow
                  onClick={() => {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Discover Our Story
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-earth-anchor"
                  onClick={() => {
                    document.getElementById('industries')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore Industries
                </Button>
              </motion.div>
            </div>

            {/* Side accent - visible on larger screens */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-5">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.6 }}
              >
                {/* Decorative badge */}
                <div className="absolute top-0 right-0 bg-highland-gold/10 backdrop-blur-sm border border-highland-gold/20 rounded-2xl p-6 text-right">
                  <span className="block text-6xl font-light text-highland-gold">10</span>
                  <span className="text-white/60 text-sm uppercase tracking-wider">Industries</span>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </motion.div>

      {/* Stats Bar at Bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ opacity }}
      >
        <div className="border-t border-white/10 backdrop-blur-sm bg-earth-anchor/30">
          <Container>
            <FadeIn delay={1.8} direction="up">
              <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                {displayStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center group"
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <StatCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      label={stat.label}
                      delay={1.8 + index * 0.1}
                      size="sm"
                      numberColor="white"
                      labelColor="white"
                    />
                    <motion.div
                      className="h-0.5 bg-highland-gold mt-4 mx-auto"
                      initial={{ width: 0 }}
                      whileInView={{ width: 24 }}
                      transition={{ duration: 0.6, delay: 2 + index * 0.1 }}
                    />
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </Container>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        style={{ opacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-3 cursor-pointer group"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          whileHover={{ y: 4 }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-white/40 group-hover:text-highland-gold transition-colors">
            Scroll to explore
          </span>
          <motion.div
            className="w-6 h-10 border border-white/20 rounded-full flex items-start justify-center p-2 group-hover:border-highland-gold/50 transition-colors"
          >
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full group-hover:bg-highland-gold transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
