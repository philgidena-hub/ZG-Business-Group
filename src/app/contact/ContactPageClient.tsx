'use client';

import { useState } from 'react';
import { Container, Section, Heading, Text, AccentLine, Button } from '@/components/ui';
import { FadeIn } from '@/components/motion';
import { groupProfile } from '@/lib/mock-data';

interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
}

interface ContactPageClientProps {
  contactInfo?: ContactInfo;
}

export default function ContactPageClient({ contactInfo }: ContactPageClientProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Use CMS data or fall back to mock data
  const address = contactInfo?.address || groupProfile.address;
  const phone = contactInfo?.phone || groupProfile.primary_phone;
  const email = contactInfo?.email || groupProfile.primary_email;
  const linkedin = contactInfo?.linkedin || groupProfile.linkedin_url;
  const twitter = contactInfo?.twitter || groupProfile.twitter_url;
  const facebook = contactInfo?.facebook || groupProfile.facebook_url;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Form submitted:', formData);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-earth-anchor">
        <Container>
          <FadeIn>
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              Contact Us
            </Text>
            <AccentLine size="lg" className="mb-8" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <Heading as="h1" size="display-lg" color="white" className="max-w-4xl">
              Let&apos;s Build Together
            </Heading>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Text size="lg" color="white" className="mt-6 max-w-2xl opacity-80">
              Whether you&apos;re interested in partnership, investment opportunities, or simply want to learn more about ZG Business Group, we&apos;d love to hear from you.
            </Text>
          </FadeIn>
        </Container>
      </section>

      {/* Contact Form & Info */}
      <Section size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div className="lg:col-span-7">
            <FadeIn>
              <Heading as="h2" size="h3" className="mb-6">
                Send Us a Message
              </Heading>
            </FadeIn>

            <FadeIn delay={0.1}>
              {submitted ? (
                <div className="p-8 bg-eucalyptus/10 border border-eucalyptus/30 rounded-lg text-center">
                  <svg
                    className="w-16 h-16 text-eucalyptus mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <Heading as="h3" size="h4" className="mb-2">
                    Message Sent!
                  </Heading>
                  <Text color="muted">
                    Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.
                  </Text>
                  <Button
                    variant="secondary"
                    className="mt-6"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', company: '', subject: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-earth-anchor mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:border-highland-gold focus:ring-1 focus:ring-highland-gold outline-none transition-colors"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-earth-anchor mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:border-highland-gold focus:ring-1 focus:ring-highland-gold outline-none transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-earth-anchor mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:border-highland-gold focus:ring-1 focus:ring-highland-gold outline-none transition-colors"
                        placeholder="Your company"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-earth-anchor mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:border-highland-gold focus:ring-1 focus:ring-highland-gold outline-none transition-colors bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="partnership">Partnership Inquiry</option>
                        <option value="investment">Investment Opportunity</option>
                        <option value="careers">Career Inquiry</option>
                        <option value="media">Media/Press</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-earth-anchor mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-md border border-neutral-300 focus:border-highland-gold focus:ring-1 focus:ring-highland-gold outline-none transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              )}
            </FadeIn>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-4 lg:col-start-9">
            <FadeIn delay={0.2}>
              <div className="space-y-8">
                {/* Headquarters */}
                <div>
                  <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                    Headquarters
                  </Text>
                  <Text size="base" className="whitespace-pre-line">
                    {address}
                  </Text>
                </div>

                {/* Phone */}
                <div>
                  <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                    Phone
                  </Text>
                  <a
                    href={`tel:${phone}`}
                    className="text-earth-anchor hover:text-highland-gold transition-colors"
                  >
                    {phone}
                  </a>
                </div>

                {/* Email */}
                <div>
                  <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                    Email
                  </Text>
                  <a
                    href={`mailto:${email}`}
                    className="text-earth-anchor hover:text-highland-gold transition-colors"
                  >
                    {email}
                  </a>
                </div>

                {/* Social */}
                <div>
                  <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                    Follow Us
                  </Text>
                  <div className="flex gap-4">
                    {linkedin && (
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-highland-gold transition-colors"
                      >
                        LinkedIn
                      </a>
                    )}
                    {twitter && (
                      <a
                        href={twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-highland-gold transition-colors"
                      >
                        Twitter
                      </a>
                    )}
                    {facebook && (
                      <a
                        href={facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-500 hover:text-highland-gold transition-colors"
                      >
                        Facebook
                      </a>
                    )}
                  </div>
                </div>

                {/* Office Hours */}
                <div>
                  <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
                    Office Hours
                  </Text>
                  <Text size="sm" color="muted">
                    Monday - Friday: 8:30 AM - 5:30 PM
                  </Text>
                  <Text size="sm" color="muted">
                    Saturday: 9:00 AM - 1:00 PM
                  </Text>
                  <Text size="sm" color="muted">
                    Sunday: Closed
                  </Text>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Map Section (Placeholder) */}
      <Section size="md" background="neutral" noContainer>
        <div className="h-96 bg-neutral-200 flex items-center justify-center">
          <div className="text-center">
            <svg
              className="w-12 h-12 text-neutral-400 mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <Text color="muted">Interactive Map</Text>
            <Text size="sm" color="muted" className="mt-1">
              Addis Ababa, Ethiopia
            </Text>
          </div>
        </div>
      </Section>
    </>
  );
}
