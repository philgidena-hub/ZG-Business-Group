import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import IndustryPageClient from './IndustryPageClient';
import type { BusinessSector } from '@/types';

interface IndustryPageProps {
  params: Promise<{ slug: string }>;
}

async function getSectors(): Promise<BusinessSector[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/business_sectors`, {
      next: { revalidate: 60 }
    });
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching sectors:', error);
    return [];
  }
}

export async function generateStaticParams() {
  const sectors = await getSectors();
  return sectors.map((sector) => ({
    slug: sector.slug,
  }));
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const sectors = await getSectors();
  const sector = sectors.find((s) => s.slug === slug);

  if (!sector) {
    return { title: 'Industry Not Found' };
  }

  return {
    title: sector.name,
    description: sector.introduction || sector.description,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const sectors = await getSectors();
  const sector = sectors.find((s) => s.slug === slug);

  if (!sector) {
    notFound();
  }

  // Get related sectors (adjacent in the list)
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
