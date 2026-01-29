'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Text } from '@/components/ui';

// =====================================================
// Footer Component
// AWWWARDS-inspired footer with dramatic background text
// =====================================================

// Footer navigation structure
const footerNav = {
  navigation: {
    title: 'Navigate',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Companies', href: '/companies' },
      { label: 'Projects', href: '/projects' },
      { label: 'News', href: '/news' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  industries: {
    title: 'Industries',
    links: [
      { label: 'Import & Export', href: '/industries/import-export' },
      { label: 'Agro-Industry', href: '/industries/agro-industry' },
      { label: 'Manufacturing', href: '/industries/manufacturing' },
      { label: 'Construction', href: '/industries/construction' },
      { label: 'Real Estate', href: '/industries/real-estate' },
      { label: 'Hospitality', href: '/industries/hospitality' },
      { label: 'Tourism', href: '/industries/tourism' },
      { label: 'General Trading', href: '/industries/general-trading' },
      { label: 'Farming', href: '/industries/farming' },
      { label: 'Social Development', href: '/industries/social-development' },
    ],
  },
};

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/zggroup', icon: LinkedInIcon },
  { label: 'Twitter', href: 'https://twitter.com/zggroup', icon: TwitterIcon },
  { label: 'Facebook', href: 'https://facebook.com/zggroup', icon: FacebookIcon },
  { label: 'Instagram', href: 'https://instagram.com/zggroup', icon: InstagramIcon },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use', href: '/terms' },
  { label: 'Sitemap', href: '/sitemap' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });

  // Parallax for background text
  const bgTextY = useTransform(scrollYProgress, [0, 1], ['20%', '0%']);
  const bgTextOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.03, 0.05]);

  return (
    <footer ref={footerRef} className="relative bg-earth-anchor text-paper-white overflow-hidden">
      {/* Dramatic Background Text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        style={{ y: bgTextY, opacity: bgTextOpacity }}
      >
        <span
          className="text-[20vw] md:text-[15vw] text-paper-white uppercase tracking-tighter whitespace-nowrap"
          style={{ letterSpacing: '-0.05em', fontFamily: 'var(--font-display)' }}
        >
          ZG GROUP
        </span>
      </motion.div>

      {/* Subtle Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top Decorative Line */}
      <div className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-highland-gold/50 to-transparent" />
      </div>

      {/* CTA Section */}
      <div className="relative border-b border-paper-white/10">
        <Container className="py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-highland-gold text-sm uppercase tracking-[0.2em] mb-4"
              >
                Let's Build Together
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
              >
                Ready to start your
                <br />
                <span className="text-highland-gold">next project?</span>
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/contact"
                className={cn(
                  'group inline-flex items-center gap-3',
                  'px-8 py-4 rounded-full',
                  'bg-highland-gold text-earth-anchor font-semibold',
                  'hover:bg-paper-white transition-colors duration-300'
                )}
              >
                Get in Touch
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Main Footer Content */}
      <Container className="relative py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4">
            {/* Logo */}
            <Link href="/" className="inline-block mb-6 group">
              <Image
                src="/gallery/ZG Business Group logo.svg"
                alt="ZG Business Group"
                width={360}
                height={100}
                className="h-28 w-auto brightness-0 invert transition-opacity duration-300 group-hover:opacity-80"
              />
            </Link>

            {/* Tagline */}
            <Text color="white" className="opacity-60 mb-6 max-w-xs text-sm leading-relaxed">
              Building Ethiopia's tomorrow through diversified, ethical enterprise across 11 industries since 2008.
            </Text>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-paper-white/60 hover:text-paper-white transition-colors group"
              >
                <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Bole, Addis Ababa, Ethiopia</span>
              </a>
              <a
                href="tel:+251111234567"
                className="flex items-center gap-3 text-sm text-paper-white/60 hover:text-paper-white transition-colors"
              >
                <PhoneIcon className="w-4 h-4 flex-shrink-0" />
                <span>+251 11 123 4567</span>
              </a>
              <a
                href="mailto:info@zggroup.com"
                className="flex items-center gap-3 text-sm text-paper-white/60 hover:text-paper-white transition-colors"
              >
                <MailIcon className="w-4 h-4 flex-shrink-0" />
                <span>info@zggroup.com</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-10 h-10 flex items-center justify-center',
                    'rounded-full bg-paper-white/5 border border-paper-white/10',
                    'text-paper-white/60 hover:text-paper-white hover:bg-paper-white/10 hover:border-paper-white/20',
                    'transition-all duration-300'
                  )}
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="col-span-1 lg:col-span-2">
            <FooterNavSection
              title={footerNav.navigation.title}
              links={footerNav.navigation.links}
            />
          </div>

          {/* Industries Column - Split into two */}
          <div className="col-span-1 lg:col-span-3">
            <FooterNavSection
              title={footerNav.industries.title}
              links={footerNav.industries.links.slice(0, 5)}
            />
          </div>

          <div className="col-span-1 lg:col-span-3 lg:pt-8">
            <FooterNavSection
              title=""
              links={footerNav.industries.links.slice(5)}
            />
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="relative border-t border-paper-white/10">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-xs text-paper-white/40">
              <span>© {currentYear} ZG Business Group.</span>
              <span className="hidden md:inline">|</span>
              <span>All rights reserved.</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-4 md:gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-paper-white/40 hover:text-paper-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-full',
                'bg-paper-white/5 border border-paper-white/10',
                'text-xs text-paper-white/60 hover:text-paper-white hover:bg-paper-white/10',
                'transition-all duration-300'
              )}
            >
              <span>Back to Top</span>
              <svg
                className="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </Container>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-to-r from-highland-gold via-highland-gold/50 to-highland-gold" />
    </footer>
  );
}

// =====================================================
// Footer Nav Section
// =====================================================

interface FooterNavSectionProps {
  title: string;
  links: Array<{ label: string; href: string }>;
}

function FooterNavSection({ title, links }: FooterNavSectionProps) {
  return (
    <div>
      {title && (
        <h3 className="text-xs text-paper-white/40 uppercase tracking-[0.2em] mb-4 font-medium">
          {title}
        </h3>
      )}
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                'text-sm text-paper-white/70 hover:text-highland-gold',
                'transition-colors duration-200',
                'inline-block'
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// =====================================================
// Icons
// =====================================================

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

export default Footer;
