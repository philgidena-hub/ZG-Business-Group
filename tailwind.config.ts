import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Color Palette - ZG Business Group Theme
      colors: {
        // Primary - Navy Blue
        'navy-primary': {
          DEFAULT: '#0B1C2D',
          50: '#E6EBF0',
          100: '#C2D0DC',
          200: '#9BB2C5',
          300: '#7494AE',
          400: '#4D7697',
          500: '#265880',
          600: '#1F4768',
          700: '#183650',
          800: '#112538',
          900: '#0B1C2D',
          950: '#050E17',
        },
        // Secondary - Gold
        'gold-secondary': {
          DEFAULT: '#C9A44C',
          50: '#FCF8F0',
          100: '#F7EDDA',
          200: '#EDDBB5',
          300: '#E3C98F',
          400: '#D9B76A',
          500: '#C9A44C',
          600: '#A8863C',
          700: '#81672E',
          800: '#5A4820',
          900: '#332912',
          950: '#1A1509',
        },
        // Tertiary - Off-white
        'white-tertiary': {
          DEFAULT: '#FCFCFC',
          50: '#FFFFFF',
          100: '#FCFCFC',
          200: '#F8F8F8',
          300: '#F0F0F0',
          400: '#E5E5E5',
          500: '#D4D4D4',
        },
        // Legacy aliases for backwards compatibility
        'earth-anchor': {
          DEFAULT: '#0B1C2D',
          50: '#E6EBF0',
          100: '#C2D0DC',
          200: '#9BB2C5',
          300: '#7494AE',
          400: '#4D7697',
          500: '#265880',
          600: '#1F4768',
          700: '#183650',
          800: '#112538',
          900: '#0B1C2D',
        },
        'highland-gold': {
          DEFAULT: '#C9A44C',
          50: '#FCF8F0',
          100: '#F7EDDA',
          200: '#EDDBB5',
          300: '#E3C98F',
          400: '#D9B76A',
          500: '#C9A44C',
          600: '#A8863C',
          700: '#81672E',
          800: '#5A4820',
          900: '#332912',
        },
        'paper-white': {
          DEFAULT: '#FCFCFC',
          50: '#FFFFFF',
          100: '#FCFCFC',
          200: '#F8F8F8',
          300: '#F0F0F0',
          400: '#E5E5E5',
          500: '#D4D4D4',
        },
        // Functional Colors
        signal: {
          green: '#2D5A47',
          amber: '#C9A44C',
          red: '#9B3D3D',
        },
        // Neutral Scale - based on navy
        neutral: {
          50: '#F5F6F7',
          100: '#E6E9EC',
          200: '#CDD3D9',
          300: '#A8B3BD',
          400: '#7D8B97',
          500: '#5C6A77',
          600: '#475663',
          700: '#364250',
          800: '#242E3A',
          900: '#0B1C2D',
        },
      },

      // Typography
      fontFamily: {
        sans: [
          'var(--font-poppins)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'sans-serif',
        ],
        geez: [
          'var(--font-geez)',
          'Nyala',
          'Abyssinica SIL',
          'serif',
        ],
        mono: [
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
        'card': '0 4px 20px rgba(11, 28, 45, 0.05)',
        'card-hover': '0 20px 40px rgba(11, 28, 45, 0.1)',
        'nav': '0 2px 20px rgba(11, 28, 45, 0.08)',
        'modal': '0 25px 50px rgba(11, 28, 45, 0.15)',
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
