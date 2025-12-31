import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Color Palette - "Rooted Growth" Design System
      colors: {
        // Primary Palette
        'earth-anchor': {
          DEFAULT: '#1A1814',
          50: '#F5F4F3',
          100: '#E8E6E4',
          200: '#D1CDC9',
          300: '#B5AEA8',
          400: '#8B8279',
          500: '#5C5752',
          600: '#3D3935',
          700: '#2E2A26',
          800: '#1A1814',
          900: '#0D0C0A',
        },
        'highland-gold': {
          DEFAULT: '#C4A035',
          50: '#FCF9F0',
          100: '#F7F0D9',
          200: '#EFE0B3',
          300: '#E4CC80',
          400: '#D4B44D',
          500: '#C4A035',
          600: '#A38529',
          700: '#7D6620',
          800: '#574716',
          900: '#31280D',
        },
        'paper-white': {
          DEFAULT: '#FAF8F5',
          50: '#FFFFFF',
          100: '#FAF8F5',
          200: '#F5F3F0',
          300: '#E8E4DF',
          400: '#D4CFC7',
          500: '#B8B1A6',
        },
        // Secondary Palette
        'iron-oxide': {
          DEFAULT: '#8B4D3B',
          50: '#F9F3F1',
          100: '#F0E2DD',
          200: '#E0C4BB',
          300: '#CCA090',
          400: '#B37560',
          500: '#8B4D3B',
          600: '#6E3D2F',
          700: '#522E23',
          800: '#361E17',
          900: '#1B0F0C',
        },
        'eucalyptus': {
          DEFAULT: '#4A6B5D',
          50: '#F2F5F4',
          100: '#E0E8E4',
          200: '#C1D1C9',
          300: '#9BB5A8',
          400: '#6E9381',
          500: '#4A6B5D',
          600: '#3B564A',
          700: '#2D4138',
          800: '#1E2B25',
          900: '#0F1613',
        },
        'coffee-earth': {
          DEFAULT: '#3D2E2A',
          50: '#F5F2F1',
          100: '#E8E2E0',
          200: '#D1C5C1',
          300: '#B3A29B',
          400: '#8C756C',
          500: '#65504A',
          600: '#4E3E39',
          700: '#3D2E2A',
          800: '#2A201D',
          900: '#17110F',
        },
        // Functional Colors
        signal: {
          green: '#2D5A47',
          amber: '#B8860B',
          red: '#9B3D3D',
        },
        // Neutral Scale
        neutral: {
          50: '#F5F3F0',
          100: '#E8E4DF',
          200: '#D4CFC7',
          300: '#B8B1A6',
          400: '#9A948C',
          500: '#7A746C',
          600: '#5C5752',
          700: '#3D3935',
          800: '#2E2A26',
          900: '#1A1814',
        },
      },

      // Typography
      fontFamily: {
        sans: [
          'var(--font-inter)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
        mono: [
          'var(--font-inter)',
          'ui-monospace',
          'SFMono-Regular',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
      },

      fontSize: {
        // Display sizes
        'display-xl': ['7.5rem', { lineHeight: '0.96', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-lg': ['4.5rem', { lineHeight: '0.97', letterSpacing: '-0.02em', fontWeight: '600' }],
        // Headings
        'h1': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h2': ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h3': ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        // Body
        'body-lg': ['1.375rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1.125rem', { lineHeight: '1.65', fontWeight: '400' }],
        'body-sm': ['1rem', { lineHeight: '1.7', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'overline': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: '500' }],
        // Data/Stats
        'stat': ['4rem', { lineHeight: '1', fontWeight: '300' }],
        'stat-sm': ['2.5rem', { lineHeight: '1', fontWeight: '300' }],
      },

      // Spacing Scale (8px base)
      spacing: {
        '18': '4.5rem',    // 72px
        '22': '5.5rem',    // 88px
        '30': '7.5rem',    // 120px
        '34': '8.5rem',    // 136px
        '38': '9.5rem',    // 152px
        '42': '10.5rem',   // 168px
        '46': '11.5rem',   // 184px
        '50': '12.5rem',   // 200px
      },

      // Max widths for containers
      maxWidth: {
        'content': '90rem',     // 1440px
        'narrow': '65rem',      // 1040px
        'prose': '42rem',       // 672px
      },

      // Grid
      gridTemplateColumns: {
        '12': 'repeat(12, minmax(0, 1fr))',
        'layout': '72px repeat(12, 1fr) 72px',
      },

      // Animations & Transitions
      transitionDuration: {
        'instant': '100ms',
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
        'slower': '800ms',
        'slowest': '1200ms',
      },

      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-custom': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },

      // Keyframe animations
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'float-particle': {
          '0%, 100%': { opacity: '0.2', transform: 'translateY(0)' },
          '50%': { opacity: '0.6', transform: 'translateY(-30px)' },
        },
      },

      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-down': 'fade-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 1.5s infinite',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'float-particle': 'float-particle 4s ease-in-out infinite',
      },

      // Box shadows
      boxShadow: {
        'card': '0 4px 20px rgba(26, 24, 20, 0.05)',
        'card-hover': '0 20px 40px rgba(26, 24, 20, 0.1)',
        'nav': '0 2px 20px rgba(26, 24, 20, 0.08)',
        'modal': '0 25px 50px rgba(26, 24, 20, 0.15)',
      },

      // Border radius
      borderRadius: {
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
      },

      // Aspect ratios
      aspectRatio: {
        'cinematic': '21 / 9',
        'editorial': '3 / 2',
        'portrait': '4 / 5',
      },

      // Z-index scale
      zIndex: {
        'behind': '-1',
        'base': '0',
        'raised': '10',
        'dropdown': '100',
        'sticky': '200',
        'overlay': '300',
        'modal': '400',
        'toast': '500',
      },
    },
  },
  plugins: [],
};

export default config;
