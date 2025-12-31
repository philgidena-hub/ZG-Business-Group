'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui';
import { Navigation } from './Navigation';
import { LanguageToggle } from './LanguageToggle';

// =====================================================
// Header Component
// Fixed navigation with scroll-aware styling
// =====================================================

export interface HeaderProps {
  /** Force transparent background */
  transparent?: boolean;
}

export function Header({ transparent = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();

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

  const showBackground = isScrolled && !transparent;

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
              isScrolled ? 'h-18' : 'h-24 lg:h-28'
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

            {/* Right side controls */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <LanguageToggle
                className={cn(
                  'transition-colors duration-fast',
                  isMenuOpen
                    ? 'text-paper-white'
                    : isScrolled || !transparent
                      ? 'text-earth-anchor'
                      : 'text-paper-white'
                )}
              />

              {/* Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={cn(
                  'relative z-50 w-10 h-10 flex items-center justify-center',
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
                      : isScrolled || !transparent
                        ? 'dark'
                        : 'white'
                  }
                />
              </button>
            </div>
          </div>
        </Container>
      </motion.header>

      {/* Full-screen Navigation Overlay */}
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
  // Determine text color based on state:
  // - Menu open: always white
  // - Scrolled: always dark (has white background)
  // - Not scrolled + transparent mode (hero): white
  // - Not scrolled + non-transparent: dark
  const useWhiteText = isMenuOpen || (!isScrolled && transparent);
  const textColor = useWhiteText ? 'text-paper-white' : 'text-earth-anchor';

  return (
    <motion.div
      className={cn('flex items-center gap-3', textColor)}
      initial={false}
      animate={{ scale: isScrolled ? 0.9 : 1 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
    >
      {/* Monogram/Icon */}
      <div
        className={cn(
          'w-10 h-10 flex items-center justify-center',
          'bg-highland-gold rounded-lg',
          'text-earth-anchor text-lg',
          'shadow-lg'
        )}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        ZG
      </div>

      {/* Wordmark - always visible now for branding */}
      <motion.div
        className="hidden sm:flex flex-col"
        initial={false}
        animate={{
          opacity: 1,
          x: 0
        }}
        transition={{ duration: 0.3 }}
      >
        <span
          className="text-xl tracking-tight leading-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ZG Business Group
        </span>
        <span className={cn(
          "text-[10px] uppercase tracking-[0.15em] leading-tight",
          useWhiteText ? 'text-white/60' : 'text-neutral-500'
        )}>
          Building Ethiopia
        </span>
      </motion.div>
    </motion.div>
  );
}

// =====================================================
// Menu Icon Component (Hamburger/Close)
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
