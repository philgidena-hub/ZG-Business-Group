import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// Primary font: Inter
// Using Inter as the primary typeface (free alternative to Söhne)
// The variable font is loaded with all weights for flexibility
// Font can be swapped to Söhne later by updating this file

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
  fallback: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'sans-serif',
  ],
});

// Display font: Cook Conthic
// Custom display font for logo and headings
export const cookConthic = localFont({
  src: [
    {
      path: '../../public/fonts/CookConthic.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/CookConthic.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

// Font configuration for easy Söhne swap in the future
// When Söhne is licensed, update like this:
//
// import localFont from 'next/font/local';
//
// export const sohne = localFont({
//   src: [
//     { path: './fonts/Sohne-Leicht.woff2', weight: '300', style: 'normal' },
//     { path: './fonts/Sohne-Buch.woff2', weight: '400', style: 'normal' },
//     { path: './fonts/Sohne-Halbfett.woff2', weight: '500', style: 'normal' },
//     { path: './fonts/Sohne-Kraftig.woff2', weight: '600', style: 'normal' },
//     { path: './fonts/Sohne-Dreiviertelfett.woff2', weight: '700', style: 'normal' },
//   ],
//   variable: '--font-sohne',
//   display: 'swap',
// });
//
// export const sohneBreit = localFont({
//   src: [
//     { path: './fonts/SohneBreit-Halbfett.woff2', weight: '600', style: 'normal' },
//   ],
//   variable: '--font-sohne-breit',
//   display: 'swap',
// });
//
// export const sohneMono = localFont({
//   src: [
//     { path: './fonts/SohneMono-Leicht.woff2', weight: '300', style: 'normal' },
//     { path: './fonts/SohneMono-Buch.woff2', weight: '400', style: 'normal' },
//   ],
//   variable: '--font-sohne-mono',
//   display: 'swap',
// });
