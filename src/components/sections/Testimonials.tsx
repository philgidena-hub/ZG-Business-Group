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
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section
      className="relative py-20 md:py-28 lg:py-36 bg-paper-white overflow-hidden"
      aria-label="Testimonials"
    >
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neutral-50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-highland-gold/5 blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Section header */}
        <FadeIn className="text-center mb-12 md:mb-16">
          <Text
            size="caption"
            color="gold"
            className="uppercase tracking-wider mb-3"
          >
            What People Say
          </Text>
          <Heading as="h2" size="h2" className="text-earth-anchor">
            Testimonials
          </Heading>
        </FadeIn>

        {/* Testimonial content */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Image side */}
          <div className="lg:col-span-5 relative">
            <div className="relative max-w-sm mx-auto lg:mx-0">
              {/* Decorative elements */}
              <div className="absolute -inset-4 border border-highland-gold/20 rounded-2xl" />
              <div className="absolute -top-3 -left-3 w-20 h-20 border-t-2 border-l-2 border-highland-gold rounded-tl-2xl" />
              <div className="absolute -bottom-3 -right-3 w-20 h-20 border-b-2 border-r-2 border-highland-gold rounded-br-2xl" />

              {/* Image container */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentTestimonial.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100"
                >
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-anchor/20 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1);
                      setActiveIndex(index);
                    }}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-300',
                      index === activeIndex
                        ? 'w-8 bg-highland-gold'
                        : 'bg-neutral-300 hover:bg-neutral-400'
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Quote side */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Quote mark */}
                <div className="text-highland-gold/20 mb-4">
                  <svg
                    className="w-12 h-12 md:w-16 md:h-16"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                  </svg>
                </div>

                {/* Quote text */}
                <blockquote className="mb-8">
                  <p className="text-lg md:text-xl lg:text-2xl text-earth-anchor leading-relaxed font-light italic">
                    "{currentTestimonial.quote}"
                  </p>
                </blockquote>

                {/* Attribution */}
                <div className="border-l-2 border-highland-gold pl-4">
                  <Text size="lg" weight="semibold" className="text-earth-anchor">
                    {currentTestimonial.name}
                  </Text>
                  <Text size="sm" color="muted" className="mt-1">
                    {currentTestimonial.title}
                    {currentTestimonial.organization && (
                      <>
                        <br />
                        <span className="text-highland-gold">{currentTestimonial.organization}</span>
                      </>
                    )}
                  </Text>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={prevTestimonial}
                className={cn(
                  'w-12 h-12 flex items-center justify-center rounded-full',
                  'border border-neutral-200 bg-white',
                  'text-earth-anchor hover:bg-highland-gold hover:border-highland-gold hover:text-white',
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
                  'border border-neutral-200 bg-white',
                  'text-earth-anchor hover:bg-highland-gold hover:border-highland-gold hover:text-white',
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
      </Container>
    </section>
  );
}

export default Testimonials;
