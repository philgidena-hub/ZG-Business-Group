'use client';

import Link from 'next/link';
import { Container, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn } from '@/components/motion';

// =====================================================
// Terms of Service Page
// Legal terms and conditions
// =====================================================

export default function TermsPage() {
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
              Terms of Service
            </Heading>
            <Text size="lg" color="muted" className="mb-12">
              Last updated: December 2024
            </Text>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="prose prose-lg max-w-none">
              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  1. Agreement to Terms
                </Heading>
                <Text size="base" color="muted" className="mb-4">
                  By accessing or using the website of ZG Business Group ("Company," "we," "our,"
                  or "us"), you agree to be bound by these Terms of Service and all applicable
                  laws and regulations. If you do not agree with any of these terms, you are
                  prohibited from using or accessing this site.
                </Text>
                <Text size="base" color="muted">
                  The materials contained on this website are protected by applicable copyright
                  and trademark law.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  2. Use License
                </Heading>
                <Text size="base" color="muted" className="mb-4">
                  Permission is granted to temporarily view the materials (information or
                  software) on ZG Business Group's website for personal, non-commercial
                  transitory viewing only. This is the grant of a license, not a transfer of
                  title, and under this license you may not:
                </Text>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
                <Text size="base" color="muted" className="mt-4">
                  This license shall automatically terminate if you violate any of these
                  restrictions and may be terminated by ZG Business Group at any time.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  3. Disclaimer
                </Heading>
                <Text size="base" color="muted" className="mb-4">
                  The materials on ZG Business Group's website are provided on an 'as is' basis.
                  ZG Business Group makes no warranties, expressed or implied, and hereby
                  disclaims and negates all other warranties including, without limitation,
                  implied warranties or conditions of merchantability, fitness for a particular
                  purpose, or non-infringement of intellectual property or other violation of
                  rights.
                </Text>
                <Text size="base" color="muted">
                  Further, ZG Business Group does not warrant or make any representations
                  concerning the accuracy, likely results, or reliability of the use of the
                  materials on its website or otherwise relating to such materials or on any
                  sites linked to this site.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  4. Limitations
                </Heading>
                <Text size="base" color="muted">
                  In no event shall ZG Business Group or its suppliers be liable for any damages
                  (including, without limitation, damages for loss of data or profit, or due to
                  business interruption) arising out of the use or inability to use the materials
                  on ZG Business Group's website, even if ZG Business Group or a ZG Business
                  Group authorized representative has been notified orally or in writing of the
                  possibility of such damage.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  5. Accuracy of Materials
                </Heading>
                <Text size="base" color="muted">
                  The materials appearing on ZG Business Group's website could include technical,
                  typographical, or photographic errors. ZG Business Group does not warrant that
                  any of the materials on its website are accurate, complete, or current. ZG
                  Business Group may make changes to the materials contained on its website at
                  any time without notice. However, ZG Business Group does not make any
                  commitment to update the materials.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  6. Links
                </Heading>
                <Text size="base" color="muted">
                  ZG Business Group has not reviewed all of the sites linked to its website and
                  is not responsible for the contents of any such linked site. The inclusion of
                  any link does not imply endorsement by ZG Business Group of the site. Use of
                  any such linked website is at the user's own risk.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  7. Modifications
                </Heading>
                <Text size="base" color="muted">
                  ZG Business Group may revise these Terms of Service for its website at any
                  time without notice. By using this website you are agreeing to be bound by
                  the then current version of these Terms of Service.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  8. User Conduct
                </Heading>
                <Text size="base" color="muted" className="mb-4">
                  You agree not to use the website:
                </Text>
                <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                  <li>For any unlawful purpose or in violation of any applicable laws</li>
                  <li>To harass, abuse, or threaten others or to otherwise violate any person's legal rights</li>
                  <li>To interfere with or disrupt the website or servers or networks connected to the website</li>
                  <li>To upload or transmit viruses or other malicious code</li>
                  <li>To collect personal information about others without their consent</li>
                  <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                </ul>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  9. Intellectual Property
                </Heading>
                <Text size="base" color="muted">
                  All content on this website, including but not limited to text, graphics,
                  logos, images, audio clips, and software, is the property of ZG Business
                  Group or its content suppliers and is protected by Ethiopian and international
                  copyright laws. The compilation of all content on this site is the exclusive
                  property of ZG Business Group.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  10. Governing Law
                </Heading>
                <Text size="base" color="muted">
                  These Terms of Service and any separate agreements whereby we provide you
                  services shall be governed by and construed in accordance with the laws of
                  the Federal Democratic Republic of Ethiopia. Any disputes arising from or
                  related to these terms shall be subject to the exclusive jurisdiction of the
                  courts of Ethiopia.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  11. Severability
                </Heading>
                <Text size="base" color="muted">
                  If any provision of these Terms of Service is found to be unenforceable or
                  invalid under any applicable law, such unenforceability or invalidity shall
                  not render these Terms of Service unenforceable or invalid as a whole. Any
                  such provisions shall be deleted without affecting the remaining provisions
                  herein.
                </Text>
              </section>

              <section className="mb-12">
                <Heading as="h2" size="h3" className="mb-4">
                  12. Contact Information
                </Heading>
                <Text size="base" color="muted" className="mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </Text>
                <div className="bg-neutral-50 rounded-xl p-6">
                  <Text size="base" className="mb-2">
                    <strong>ZG Business Group</strong>
                  </Text>
                  <Text size="sm" color="muted" className="mb-1">
                    Bole Road, Addis Ababa, Ethiopia
                  </Text>
                  <Text size="sm" color="muted" className="mb-1">
                    Email: legal@zggroup.com
                  </Text>
                  <Text size="sm" color="muted">
                    Phone: +251 11 123 4567
                  </Text>
                </div>
              </section>
            </div>
          </FadeIn>

          {/* Related Links */}
          <FadeIn delay={0.3}>
            <div className="mt-16 pt-8 border-t border-neutral-200">
              <Text size="sm" color="muted" className="mb-4">
                Related Legal Documents
              </Text>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/privacy"
                  className="text-highland-gold hover:underline"
                >
                  Privacy Policy
                </Link>
                <span className="text-neutral-300">|</span>
                <Link
                  href="/contact"
                  className="text-highland-gold hover:underline"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </main>
  );
}
