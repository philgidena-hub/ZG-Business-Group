'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Text, Heading } from '@/components/ui';
import { FadeIn } from '@/components/motion';

// =====================================================
// Testimonials Section Component
// Premium testimonial carousel with images
// =====================================================

interface Testimonial {
  id: string;
  name: string;
  title: string;
  organization?: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Professor Kindeya Gebrhiwot',
    title: 'Deputy Minister of Education',
    organization: 'Federal Democratic Republic of Ethiopia',
    quote: 'I highly appreciate the valuable contribution of ZG Business Group to the education sector. Their direct support to eight secondary schools has significantly enhanced access to quality education and improved learning environments. This level of partnership is exemplary and impactful.',
    image: '/testimonials/Professor Kindeya Gebrhiwot.png',
  },
  {
    id: '2',
    name: 'General Tadesse Werede',
    title: 'Interim President',
    organization: 'Tigray Regional Government',
    quote: 'On behalf of the people of Tigray, I sincerely thank ZG Business Group for its remarkable support to displaced communities. The company\'s generous contribution toward the construction and rehabilitation of schools has brought hope and dignity to thousands of children affected by displacement. This support is both timely and deeply appreciated.',
    image: '/testimonials/General Tadesse Werede .png',
  },
  {
    id: '3',
    name: 'Getachew Reda',
    title: 'Former Interim Government President',
    organization: 'Tigray',
    quote: 'ZG Business Group has demonstrated exceptional commitment to the advancement of education in Tigray. Through its active engagement and collaboration with the education sector, the company has played a meaningful role in strengthening learning institutions. I recognize ZG Business Group as a true ambassador for education development in Tigray.',
    image: '/testimonials/Getachew Reda.png',
  },
  {
    id: '4',
    name: 'Dr. Kiros Guesh',
    title: 'Head',
    organization: 'Tigray Regional Education Bureau',
    quote: 'Words are not sufficient to fully express our appreciation for the commitment and support of ZG Business Group. Their contribution to education development in Tigray stands as a model of responsible corporate citizenship and genuine social impact.',
    image: '/testimonials/Dr. Kiros Guesh_.png',
  },
  {
    id: '5',
    name: 'Ulisse Tavars',
    title: 'Co-Founder',
    organization: 'Italian Enrico Mattei Foundation for Social and Economic Development – Ethiopia',
    quote: 'ZG Business Group has strong potential to transform Ethiopia\'s agricultural sector through the integration of modern technology, value-chain development, and access to European markets. I strongly support collaboration in agricultural innovation, marketing, and sustainable development initiatives.',
    image: '/testimonials/Ulisse Tavars.png',
  },
  {
    id: '6',
    name: 'Tigray Education Bureau',
    title: 'Official Recognition',
    organization: '',
    quote: 'The Tigray Education Bureau is pleased to recognize ZG Business Group for its outstanding commitment to the educational development of our region. Through its strategic support, innovative initiatives, and strong partnership with local stakeholders, ZG Business Group has played a meaningful role in enhancing access to quality education across Tigray.',
    image: '/testimonials/Tigray Education Bureau.png',
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  // Auto-advance every 8 seconds
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  const currentTestimonial = testimonials[activeIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 80 : -80,
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative py-24 md:py-32 lg:py-40 bg-earth-anchor overflow-hidden"
      aria-label="Testimonials"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        {/* Gold accent glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-highland-gold/5 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-highland-gold/3 blur-[100px]" />
      </div>

      <Container className="relative z-10">
        {/* Section header */}
        <FadeIn className="text-center mb-16 md:mb-20">
          <Text
            size="caption"
            className="text-highland-gold uppercase tracking-[0.25em] mb-4"
          >
            Trusted By Leaders
          </Text>
          <Heading as="h2" size="h2" className="text-paper-white">
            What People Say
          </Heading>
        </FadeIn>

        {/* Testimonial content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Image side */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="relative max-w-xs mx-auto">

                {/* Image container */}
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentTestimonial.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative aspect-square overflow-hidden rounded-xl bg-transparent"
                  >
                    <Image
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Name badge below image */}
                <motion.div
                  key={`badge-${currentTestimonial.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="mt-4 text-center"
                >
                  <p className="text-paper-white font-semibold text-base">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-highland-gold text-sm mt-1">
                    {currentTestimonial.title}
                  </p>
                </motion.div>
              </div>

              {/* Navigation dots - mobile */}
              <div className="flex justify-center gap-2 mt-12 lg:hidden">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1);
                      setActiveIndex(index);
                    }}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      index === activeIndex
                        ? 'w-8 bg-highland-gold'
                        : 'w-2 bg-paper-white/30 hover:bg-paper-white/50'
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Quote side */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentTestimonial.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Large quote mark */}
                  <div className="absolute -top-6 -left-4 text-highland-gold/10">
                    <svg
                      className="w-20 h-20 md:w-28 md:h-28"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                    </svg>
                  </div>

                  {/* Quote text */}
                  <blockquote className="relative z-10 mb-10">
                    <p className="text-xl md:text-2xl lg:text-3xl text-paper-white leading-relaxed font-light">
                      "{currentTestimonial.quote}"
                    </p>
                  </blockquote>

                  {/* Attribution - desktop */}
                  <div className="hidden lg:block">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-px bg-highland-gold" />
                      <div>
                        <p className="text-paper-white font-semibold text-lg">
                          {currentTestimonial.name}
                        </p>
                        <p className="text-paper-white/60 text-sm mt-0.5">
                          {currentTestimonial.title}
                          {currentTestimonial.organization && (
                            <span className="text-highland-gold"> — {currentTestimonial.organization}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation controls - desktop */}
              <div className="hidden lg:flex items-center justify-between mt-12 pt-8 border-t border-paper-white/10">
                {/* Progress indicator */}
                <div className="flex items-center gap-3">
                  <span className="text-highland-gold font-semibold text-2xl">
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>
                  <div className="w-24 h-0.5 bg-paper-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-highland-gold"
                      initial={{ width: 0 }}
                      animate={{ width: `${((activeIndex + 1) / testimonials.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span className="text-paper-white/40 text-sm">
                    {String(testimonials.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Arrow buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={prevTestimonial}
                    className={cn(
                      'w-12 h-12 flex items-center justify-center rounded-full',
                      'border border-paper-white/20 bg-transparent',
                      'text-paper-white hover:bg-highland-gold hover:border-highland-gold hover:text-earth-anchor',
                      'transition-all duration-300'
                    )}
                    aria-label="Previous testimonial"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className={cn(
                      'w-12 h-12 flex items-center justify-center rounded-full',
                      'border border-paper-white/20 bg-transparent',
                      'text-paper-white hover:bg-highland-gold hover:border-highland-gold hover:text-earth-anchor',
                      'transition-all duration-300'
                    )}
                    aria-label="Next testimonial"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Testimonials;
