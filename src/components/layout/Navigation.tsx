'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container, Text } from '@/components/ui';

// =====================================================
// Navigation Overlay Component
// Full-screen menu with staggered animations
// =====================================================

interface NavigationProps {
  onClose: () => void;
}

// Navigation items
const mainNavItems = [
  { label: 'About', href: '/about' },
  { label: 'Our Companies', href: '/industries' },
  { label: 'Projects', href: '/projects' },
  { label: 'Impact', href: '/impact' },
  { label: 'News', href: '/news' },
];

const secondaryNavItems = [
  { label: 'Contact', href: '/contact' },
  { label: 'Careers', href: '/careers' },
  { label: 'Downloads', href: '/downloads' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/zggroup' },
  { label: 'Twitter', href: 'https://twitter.com/zggroup' },
  { label: 'Facebook', href: 'https://facebook.com/zggroup' },
];

export function Navigation({ onClose }: NavigationProps) {
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);

  // Focus trap
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const focusableElements = nav.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => window.removeEventListener('keydown', handleTabKey);
  }, []);

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, delay: 0.1 }
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      ref={navRef}
      className="fixed inset-0 z-overlay"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-earth-anchor"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ scaleY: 0 }}
        style={{ originY: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* Content */}
      <Container className="relative h-full flex flex-col justify-center py-24">
        <motion.nav
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-12 lg:gap-20"
        >
          {/* Main Navigation */}
          <div className="flex-1">
            <motion.ul className="space-y-2 lg:space-y-4">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <motion.li key={item.href} variants={itemVariants}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'group inline-flex items-center gap-4',
                        'text-3xl md:text-4xl lg:text-5xl font-semibold',
                        'text-paper-white/70 hover:text-paper-white',
                        'transition-colors duration-fast',
                        isActive && 'text-paper-white'
                      )}
                    >
                      <span className="relative">
                        {item.label}
                        {/* Active indicator */}
                        {isActive && (
                          <motion.span
                            className="absolute -bottom-1 left-0 w-full h-0.5 bg-highland-gold"
                            layoutId="nav-active"
                          />
                        )}
                        {/* Hover underline */}
                        <span
                          className={cn(
                            'absolute -bottom-1 left-0 w-0 h-0.5 bg-highland-gold',
                            'group-hover:w-full transition-all duration-fast ease-out-expo'
                          )}
                        />
                      </span>
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>

          {/* Secondary Navigation & Info */}
          <div className="lg:w-80 space-y-10">
            {/* Secondary Links */}
            <motion.div variants={itemVariants}>
              <Text size="caption" color="white" className="opacity-50 mb-4 uppercase tracking-wider">
                Quick Links
              </Text>
              <ul className="space-y-2">
                {secondaryNavItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'text-lg text-paper-white/70 hover:text-paper-white',
                        'transition-colors duration-fast'
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <Text size="caption" color="white" className="opacity-50 mb-4 uppercase tracking-wider">
                Get in Touch
              </Text>
              <div className="space-y-2">
                <a
                  href="mailto:info@zggroup.com"
                  className="block text-paper-white/70 hover:text-paper-white transition-colors duration-fast"
                >
                  info@zggroup.com
                </a>
                <a
                  href="tel:+251111234567"
                  className="block text-paper-white/70 hover:text-paper-white transition-colors duration-fast"
                >
                  +251 11 123 4567
                </a>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <Text size="caption" color="white" className="opacity-50 mb-4 uppercase tracking-wider">
                Follow Us
              </Text>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'text-sm text-paper-white/70 hover:text-paper-white',
                      'transition-colors duration-fast'
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.nav>

        {/* Bottom decorative element */}
        <motion.div
          className="absolute bottom-8 left-0 right-0"
          variants={itemVariants}
        >
          <Container>
            <div className="flex items-center justify-between text-paper-white/30 text-sm">
              <span>Addis Ababa, Ethiopia</span>
              <span>Est. 2008</span>
            </div>
          </Container>
        </motion.div>
      </Container>
    </motion.div>
  );
}

export default Navigation;
