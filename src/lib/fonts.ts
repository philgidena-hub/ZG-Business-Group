import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';

// Primary font: Poppins
// Clean, modern sans-serif typeface for body text and UI
export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
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

// Geez font: Nokia Pure
// For Amharic/Geez script support, add Nokia Pure font files to public/fonts/
// and uncomment the following configuration:
//
// export const nokiaPure = localFont({
//   src: [
//     { path: '../../public/fonts/NokiaPure-Regular.woff2', weight: '400', style: 'normal' },
//     { path: '../../public/fonts/NokiaPure-Bold.woff2', weight: '700', style: 'normal' },
//   ],
//   variable: '--font-geez',
//   display: 'swap',
//   fallback: ['Nyala', 'Abyssinica SIL', 'serif'],
// });
