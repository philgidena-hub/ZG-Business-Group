import {
  Hero,
  Introduction,
  Industries,
  FeaturedProject,
  ImpactQuote,
  CommunityImpact,
  Testimonials,
  LatestNews,
  Partners,
  ParallaxStatsSection,
  ParallaxDivider,
  ZoomParallax,
} from '@/components/sections';
import { ScrollProgressIndicator } from '@/components/sections/PageTransitions';
import { getSiteSettings, getAssetUrl, fallbackImages } from '@/lib/directus';

// =====================================================
// Homepage
// AWWWARDS-level corporate website experience
// =====================================================

export default async function HomePage() {
  // Fetch site settings from CMS
  const settings = await getSiteSettings();

  // Process hero image from CMS or fallback
  const heroImageUrl = settings?.hero_image
    ? getAssetUrl(settings.hero_image, { width: 1920, quality: 80, format: 'webp' })
    : fallbackImages.defaultHero;

  // Process about image from CMS or fallback
  const aboutImageUrl = settings?.about_image
    ? getAssetUrl(settings.about_image, { width: 1200, quality: 80, format: 'webp' })
    : 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80';

  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator />

      {/* Hero Section - Full viewport cinematic hero */}
      <Hero
        headline={settings?.hero_headline}
        description={settings?.hero_description}
        backgroundImage={heroImageUrl || undefined}
        foundingYear={settings?.founding_year}
        headquarters={settings?.headquarters}
        stats={settings?.hero_stats}
      />

      {/* Zoom Parallax - Oliver Larose style multi-image zoom effect */}
      <ZoomParallax />

      {/* Introduction - Philosophy and company overview */}
      <Introduction
        headline={settings?.about_headline}
        philosophy={settings?.philosophy}
        vision={settings?.vision}
        mission={settings?.mission}
        aboutImage={aboutImageUrl || undefined}
      />

      {/* Industries - Grid of 10 business sectors */}
      <Industries />

      {/* Parallax Stats Section - Company achievements */}
      <ParallaxStatsSection
        image="/images/optimized/parallax-1.webp"
        headline="Building Ethiopia's Future"
        stats={[
          { value: '10', suffix: '+', label: 'Industries' },
          { value: '5000', suffix: '+', label: 'Employees' },
          { value: '17', label: 'Years of Excellence' },
          { value: '100', suffix: 'M+', label: 'ETB Investment' },
        ]}
      />

      {/* Featured Project - Flagship project showcase */}
      <FeaturedProject />

      {/* Impact Quote - Founder quote with dark background */}
      <ImpactQuote
        quote={settings?.impact_quote}
        author={settings?.impact_quote_author}
        title={settings?.impact_quote_title}
      />

      {/* Community Impact - CSR initiatives */}
      <CommunityImpact />

      {/* Testimonials - Partner and government endorsements */}
      <Testimonials />

      {/* Parallax Divider - Visual break before news */}
      <ParallaxDivider
        image="/images/optimized/parallax-2.webp"
        alt="Ethiopian landscape"
      />

      {/* Latest News - Recent articles */}
      <LatestNews />

      {/* Partners - Logo cloud */}
      <Partners />
    </>
  );
}
