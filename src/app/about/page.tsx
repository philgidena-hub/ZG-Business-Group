import { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';
import { getSiteSettings } from '@/lib/directus';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about ZG Business Group, a diversified Ethiopian enterprise building lasting value since 2008.',
};

export const revalidate = 60;

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <AboutPageClient
      vision={settings?.vision}
      mission={settings?.mission}
      philosophy={settings?.philosophy}
      companyStory={settings?.company_story}
      coreValues={settings?.core_values}
      companyStats={settings?.company_stats}
      foundingYear={settings?.founding_year}
    />
  );
}
