'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui';
import { Navigation } from './Navigation';
import { LanguageToggle } from './LanguageToggle';

// =====================================================
// Header Component
// Fixed navigation with horizontal menu on desktop
// =====================================================

export interface HeaderProps {
  /** Force transparent background */
  transparent?: boolean;
}

// Navigation items
const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Our Companies', href: '/industries' },
  { label: 'Projects', href: '/projects' },
  { label: 'Impact', href: '/impact' },
  { label: 'News', href: '/news' },
];

export function Header({ transparent = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  // Track scroll position for header styling
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 50);
  });

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const showBackground = isScrolled || !transparent;
  const isDarkText = isScrolled || !transparent;

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-sticky',
          'transition-all duration-normal ease-out-quart'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Background */}
        <motion.div
          className={cn(
            'absolute inset-0',
            'bg-paper-white/95 backdrop-blur-md',
            'border-b border-neutral-200/50',
            'transition-opacity duration-normal'
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: showBackground ? 1 : 0 }}
        />

        {/* Content */}
        <Container className="relative">
          <div
            className={cn(
              'flex items-center justify-between',
              'transition-all duration-normal',
              isScrolled ? 'h-20' : 'h-28'
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 flex items-center"
              aria-label="ZG Business Group - Home"
            >
              <Logo isScrolled={isScrolled} isMenuOpen={isMenuOpen} transparent={transparent} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 text-sm font-medium tracking-wide',
                      'transition-colors duration-200',
                      isDarkText
                        ? isActive
                          ? 'text-highland-gold'
                          : 'text-earth-anchor hover:text-highland-gold'
                        : isActive
                          ? 'text-highland-gold'
                          : 'text-paper-white/90 hover:text-paper-white'
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-highland-gold"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-3">
              {/* Language Toggle - Desktop */}
              <LanguageToggle
                className={cn(
                  'hidden md:flex transition-colors duration-fast',
                  isMenuOpen
                    ? 'text-paper-white'
                    : isDarkText
                      ? 'text-earth-anchor'
                      : 'text-paper-white'
                )}
              />

              {/* Contact Button - Desktop */}
              <Link
                href="/contact"
                className={cn(
                  'hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full',
                  'text-sm font-semibold transition-all duration-300',
                  isDarkText
                    ? 'bg-highland-gold text-earth-anchor hover:bg-highland-gold/90'
                    : 'bg-paper-white text-earth-anchor hover:bg-paper-white/90'
                )}
              >
                Contact
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  'lg:hidden relative z-50 w-10 h-10 flex items-center justify-center',
                  'focus-ring rounded'
                )}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMenuOpen}
              >
                <MenuIcon
                  isOpen={isMenuOpen}
                  color={
                    isMenuOpen
                      ? 'white'
                      : isDarkText
                        ? 'dark'
                        : 'white'
                  }
                />
              </button>
            </div>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <Navigation onClose={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

// =====================================================
// Logo Component
// =====================================================

interface LogoProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
  transparent: boolean;
}

function Logo({ isScrolled, isMenuOpen, transparent }: LogoProps) {
  const useWhiteVersion = isMenuOpen || (!isScrolled && transparent);

  return (
    <motion.div
      className="flex items-center"
      initial={false}
      animate={{ scale: isScrolled ? 0.9 : 1 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
    >
      <Image
        src={useWhiteVersion ? "/gallery/ZG BUSINESS GROUP REVERSE COLOR.svg" : "/gallery/ZG Business Group logo.svg"}
        alt="ZG Business Group"
        width={400}
        height={100}
        className="h-10 sm:h-12 lg:h-14 w-auto transition-all duration-300"
        priority
      />
    </motion.div>
  );
}

// =====================================================
// Menu Icon Component (Hamburger/Close) - Mobile only
// =====================================================

interface MenuIconProps {
  isOpen: boolean;
  color: 'white' | 'dark';
}

function MenuIcon({ isOpen, color }: MenuIconProps) {
  const lineColor = color === 'white' ? 'bg-paper-white' : 'bg-earth-anchor';

  return (
    <div className="relative w-6 h-5 flex flex-col justify-center items-center">
      <motion.span
        className={cn('absolute w-6 h-0.5 rounded-full', lineColor)}
        initial={false}
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -4,
        }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      />
      <motion.span
        className={cn('absolute w-6 h-0.5 rounded-full', lineColor)}
        initial={false}
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className={cn('absolute w-6 h-0.5 rounded-full', lineColor)}
        initial={false}
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 4,
        }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      />
    </div>
  );
}

export default Header;
