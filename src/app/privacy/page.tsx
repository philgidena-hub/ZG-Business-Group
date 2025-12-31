'use client';

import Link from 'next/link';
import { Container, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn } from '@/components/motion';

// =====================================================
// Privacy Policy Page
// Legal privacy information
// =====================================================

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-20 md:pt-40 md:pb-28 bg-paper-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-highland-gold mb-8 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Home
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              Legal
            </Text>
            <AccentLine size="md" className="mb-6" />
            <Heading as="h1" size="display-lg" className="mb-6">
              Privacy Policy
            </Heading>
            <Text size="lg" color="muted" className="mb-12">
              Last updated: December 2024
            </Text>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  1. Introduction
                </Heading>
                <Text size="base" color="muted" className="mb-4">
                  ZG Business Group ("we," "our," or "us") is committed to protecting your privacy.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your
                  information when you visit our website or use our services.
                </Text>
                <Text size="base" color="muted">
                  Please read this Privacy Policy carefully. By accessing or using our services,
                  you acknowledge that you have read, understood, and agree to be bound by this
                  Privacy Policy.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  2. Information We Collect
                </Heading>
                <Text size="base" color="muted" className="mb-4">
                  We may collect information about you in various ways:
                </Text>
                <div className="pl-6 mb-4">
                  <Heading as="h3" size="h4" className="mb-2">
                    Personal Data
                  </Heading>
                  <Text size="base" color="muted" className="mb-4">
                    When you contact us, apply for jobs, or request information, we may collect
                    personally identifiable information such as your name, email address, phone
                    number, and any other information you choose to provide.
                  </Text>
                </div>
                <div className="pl-6 mb-4">
                  <Heading as="h3" size="h4" className="mb-2">
                    Usage Data
                  </Heading>
                  <Text size="base" color="muted">
                    We automatically collect certain information when you visit our website,
                    including your IP address, browser type, operating system, referring URLs,
                    and information about how you interact with our website.
                  </Text>
                </div>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  3. How We Use Your Information
                </Heading>
                <Text size="base" color="muted" className="mb-4">
                  We may use the information we collect for various purposes, including:
                </Text>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                  <li>To provide and maintain our services</li>
                  <li>To respond to your inquiries and requests</li>
                  <li>To process job applications</li>
                  <li>To send you marketing and promotional communications (with your consent)</li>
                  <li>To improve our website and services</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                </ul>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  4. Disclosure of Your Information
                </Heading>
                <Text size="base" color="muted" className="mb-4">
                  We may share your information in the following situations:
                </Text>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                  <li>With our subsidiaries and affiliates within ZG Business Group</li>
                  <li>With service providers who assist us in operating our business</li>
                  <li>To comply with legal requirements or respond to lawful requests</li>
                  <li>To protect our rights, privacy, safety, or property</li>
                  <li>In connection with a business transaction (merger, acquisition, etc.)</li>
                </ul>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  5. Data Security
                </Heading>
                <Text size="base" color="muted">
                  We implement appropriate technical and organizational security measures to
                  protect your personal information against unauthorized access, alteration,
                  disclosure, or destruction. However, no method of transmission over the
                  Internet or electronic storage is 100% secure, and we cannot guarantee
                  absolute security.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  6. Your Rights
                </Heading>
                <Text size="base" color="muted" className="mb-4">
                  Depending on your location, you may have certain rights regarding your
                  personal information, including:
                </Text>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                  <li>The right to access your personal data</li>
                  <li>The right to correct inaccurate data</li>
                  <li>The right to request deletion of your data</li>
                  <li>The right to restrict processing</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  7. Cookies
                </Heading>
                <Text size="base" color="muted">
                  Our website uses cookies and similar tracking technologies to enhance your
                  experience. You can set your browser to refuse cookies or alert you when
                  cookies are being sent. However, some parts of our website may not function
                  properly without cookies.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  8. Third-Party Links
                </Heading>
                <Text size="base" color="muted">
                  Our website may contain links to third-party websites. We are not responsible
                  for the privacy practices or content of these external sites. We encourage
                  you to review the privacy policies of any third-party sites you visit.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  9. Changes to This Privacy Policy
                </Heading>
                <Text size="base" color="muted">
                  We may update this Privacy Policy from time to time. We will notify you of
                  any changes by posting the new Privacy Policy on this page and updating the
                  "Last updated" date. You are advised to review this Privacy Policy periodically
                  for any changes.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  10. Contact Us
                </Heading>
                <Text size="base" color="muted" className="mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </Text>
                <div className="bg-neutral-50 rounded-xl p-6">
                  <Text size="base" className="mb-2">
                    <strong>ZG Business Group</strong>
                  </Text>
                  <Text size="sm" color="muted" className="mb-1">
                    Bole Road, Addis Ababa, Ethiopia
                  </Text>
                  <Text size="sm" color="muted" className="mb-1">
                    Email: privacy@zggroup.com
                  </Text>
                  <Text size="sm" color="muted">
                    Phone: +251 11 123 4567
                  </Text>
                </div>
              </section>
            </div>
          </FadeIn>
        </div>
      </Container>
    </main>
  );
}
