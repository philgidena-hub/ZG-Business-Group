import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IndustryPageClient from './IndustryPageClient';
import { businessSectors } from '@/lib/mock-data';
import type { BusinessSector } from '@/types';

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

// Use mock data directly - no Directus dependency
function getSectors(): BusinessSector[] {
  return businessSectors as BusinessSector[];
}

export async function generateStaticParams() {
  const sectors = getSectors();
  return sectors.map((sector) => ({
    slug: sector.slug,
  }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sectors = getSectors();
  const sector = sectors.find((s) => s.slug === slug);

  if (!sector) {
    return { title: 'Company Not Found | ZG Business Group' };
  }

  return {
    title: `${sector.name} | ZG Business Group`,
    description: sector.introduction || sector.description,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const sectors = getSectors();
  const sector = sectors.find((s) => s.slug === slug);

  if (!sector) {
    notFound();
  }

  // Get related sectors (adjacent in the list, excluding current)
  const currentIndex = sectors.findIndex((s) => s.slug === slug);
  const relatedSectors = [
    sectors[(currentIndex + 1) % sectors.length],
    sectors[(currentIndex + 2) % sectors.length],
    sectors[(currentIndex + 3) % sectors.length],
  ];

  return (
    <IndustryPageClient
      sector={sector}
      relatedSectors={relatedSectors}
    />
  );
}
