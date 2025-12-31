'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// =====================================================
// Language Toggle Component
// Switch between English and Amharic
// =====================================================

export interface LanguageToggleProps {
  className?: string;
}

type Language = 'en' | 'am';

export function LanguageToggle({ className }: LanguageToggleProps) {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'am' : 'en'));
    // TODO: Integrate with i18n system
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'relative flex items-center gap-1.5 px-2 py-1',
        'text-sm font-medium',
        'rounded hover:bg-earth-anchor/5',
        'transition-colors duration-fast',
        'focus-ring',
        className
      )}
      aria-label={`Switch to ${language === 'en' ? 'Amharic' : 'English'}`}
    >
      {/* English */}
      <span
        className={cn(
          'transition-opacity duration-fast',
          language === 'en' ? 'opacity-100' : 'opacity-40'
        )}
      >
        EN
      </span>

      {/* Divider */}
      <span className="opacity-30">/</span>

      {/* Amharic */}
      <span
        className={cn(
          'transition-opacity duration-fast',
          language === 'am' ? 'opacity-100' : 'opacity-40'
        )}
      >
        አማ
      </span>

      {/* Active indicator dot */}
      <motion.span
        className="absolute -bottom-1 w-1 h-1 rounded-full bg-highland-gold"
        initial={false}
        animate={{
          x: language === 'en' ? 0 : 28,
        }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
      />
    </button>
  );
}

export default LanguageToggle;
