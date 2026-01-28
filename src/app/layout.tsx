import type { Metadata, Viewport } from 'next';
import { poppins, cookConthic } from '@/lib/fonts';
import { Header, Footer } from '@/components/layout';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import '@/styles/globals.css';

// =====================================================
// Root Layout
// Global layout with fonts, metadata, header, and footer
// =====================================================

export const metadata: Metadata = {
  metadataBase: new URL('https://zggroup.com'),
  title: {
    default: 'ZG Business Group | Building Ethiopia\'s Tomorrow',
    template: '%s | ZG Business Group',
  },
  description:
    'Since 2008, ZG Business Group has cultivated a diversified enterprise across 10 industries, creating lasting value for communities and partners across East Africa.',
  keywords: [
    'ZG Business Group',
    'Ethiopian business',
    'diversified enterprise',
    'import export Ethiopia',
    'construction Ethiopia',
    'real estate Addis Ababa',
    'agro-industry',
    'hospitality Ethiopia',
    'East Africa business',
  ],
  authors: [{ name: 'ZG Business Group' }],
  creator: 'ZG Business Group',
  publisher: 'ZG Business Group',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://zggroup.com',
    siteName: 'ZG Business Group',
    title: 'ZG Business Group | Building Ethiopia\'s Tomorrow',
    description:
      'Since 2008, ZG Business Group has cultivated a diversified enterprise across 10 industries, creating lasting value for communities and partners across East Africa.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ZG Business Group',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZG Business Group | Building Ethiopia\'s Tomorrow',
    description:
      'Since 2008, ZG Business Group has cultivated a diversified enterprise across 10 industries.',
    images: ['/og-image.jpg'],
    creator: '@zggroup',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FCFCFC' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1C2D' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${cookConthic.variable}`}>
      <body className="min-h-screen bg-paper-white text-earth-anchor antialiased">
        <SmoothScrollProvider>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-highland-gold focus:text-earth-anchor focus:rounded"
          >
            Skip to main content
          </a>

          {/* Global Header - transparent mode for pages with hero */}
          <Header transparent={true} />

          {/* Main Content */}
          <main id="main-content">{children}</main>

          {/* Global Footer */}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
