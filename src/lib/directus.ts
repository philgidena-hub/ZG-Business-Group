import { createDirectus, rest } from '@directus/sdk';
import type {
  GroupProfile,
  BusinessSector,
  Subsidiary,
  Project,
  NewsArticle,
  TeamMember,
  CSRInitiative,
  JobListing,
  SiteSettings,
} from '@/types';

// =====================================================
// Directus Client Configuration
// =====================================================

// Environment variables
const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';

// Helper to get the correct API base URL
// In production (HTTPS), we use our Next.js API proxy to avoid mixed content
// In development (HTTP), we connect directly to Directus
function getApiBaseUrl(): string {
  // Check if we're in production (Vercel deployment)
  const isProduction = process.env.VERCEL_URL || process.env.NODE_ENV === 'production';

  // Server-side rendering in production - use proxy route
  if (typeof window === 'undefined') {
    return isProduction ? '/api/directus' : DIRECTUS_URL;
  }

  // Client-side - use proxy if on HTTPS to avoid mixed content blocking
  return window.location.protocol === 'https:' ? '/api/directus' : DIRECTUS_URL;
}

// Create Directus client
const directus = createDirectus(DIRECTUS_URL).with(rest());

// Helper to make typed requests bypassing SDK's strict typing
async function fetchCollection<T>(
  collection: string,
  options: {
    filter?: Record<string, unknown>;
    sort?: string[];
    fields?: string[];
    limit?: number;
  } = {}
): Promise<T[]> {
  const params = new URLSearchParams();

  if (options.filter) {
    params.append('filter', JSON.stringify(options.filter));
  }
  if (options.sort) {
    params.append('sort', options.sort.join(','));
  }
  if (options.fields) {
    params.append('fields', options.fields.join(','));
  }
  if (options.limit) {
    params.append('limit', options.limit.toString());
  }

  const queryString = params.toString();
  const url = `${getApiBaseUrl()}/items/${collection}${queryString ? `?${queryString}` : ''}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return (result.data || []) as T[];
  } catch (error) {
    console.error(`Error fetching ${collection}:`, error);
    return [];
  }
}

async function fetchSingleton<T>(collection: string): Promise<T | null> {
  const url = `${getApiBaseUrl()}/items/${collection}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return (result.data || null) as T;
  } catch (error) {
    console.error(`Error fetching ${collection}:`, error);
    return null;
  }
}

// =====================================================
// API Functions
// =====================================================

// ─────────────────────────────────────────────────
// Group Profile
// ─────────────────────────────────────────────────

export async function getGroupProfile(): Promise<GroupProfile | null> {
  return fetchSingleton<GroupProfile>('group_profile');
}

// ─────────────────────────────────────────────────
// Business Sectors
// ─────────────────────────────────────────────────

export async function getBusinessSectors(): Promise<BusinessSector[]> {
  return fetchCollection<BusinessSector>('business_sectors', {
    filter: { status: { _eq: 'published' } },
    sort: ['sort'],
    fields: ['*'],
  });
}

export async function getBusinessSector(slug: string): Promise<BusinessSector | null> {
  const sectors = await fetchCollection<BusinessSector>('business_sectors', {
    filter: {
      status: { _eq: 'published' },
      slug: { _eq: slug },
    },
    fields: ['*'],
    limit: 1,
  });
  return sectors[0] || null;
}

// ─────────────────────────────────────────────────
// Subsidiaries
// ─────────────────────────────────────────────────

export async function getSubsidiaries(): Promise<Subsidiary[]> {
  return fetchCollection<Subsidiary>('subsidiaries', {
    filter: { status: { _eq: 'published' } },
    sort: ['sort'],
    fields: ['*', 'sector.*'],
  });
}

export async function getSubsidiary(slug: string): Promise<Subsidiary | null> {
  const subsidiaries = await fetchCollection<Subsidiary>('subsidiaries', {
    filter: {
      status: { _eq: 'published' },
      slug: { _eq: slug },
    },
    fields: ['*', 'sector.*', 'leadership.*'],
    limit: 1,
  });
  return subsidiaries[0] || null;
}

// ─────────────────────────────────────────────────
// Projects
// ─────────────────────────────────────────────────

export async function getProjects(options?: {
  limit?: number;
  featured?: boolean;
  sector?: string;
}): Promise<Project[]> {
  const filter: Record<string, unknown> = { status: { _eq: 'published' } };

  if (options?.featured) {
    filter.is_featured = { _eq: true };
  }

  if (options?.sector) {
    filter.sector = { slug: { _eq: options.sector } };
  }

  return fetchCollection<Project>('projects', {
    filter,
    sort: ['-created_at'],
    limit: options?.limit || 100,
    fields: ['*', 'sector.name', 'sector.slug', 'subsidiary.name'],
  });
}

export async function getProject(slug: string): Promise<Project | null> {
  const projects = await fetchCollection<Project>('projects', {
    filter: {
      status: { _eq: 'published' },
      slug: { _eq: slug },
    },
    fields: ['*', 'sector.*', 'subsidiary.*', 'gallery.*', 'documents.*'],
    limit: 1,
  });
  return projects[0] || null;
}

export async function getFeaturedProject(): Promise<Project | null> {
  const projects = await fetchCollection<Project>('projects', {
    filter: {
      status: { _eq: 'published' },
      is_featured: { _eq: true },
    },
    sort: ['-created_at'],
    limit: 1,
    fields: ['*', 'sector.name', 'sector.slug'],
  });
  return projects[0] || null;
}

// ─────────────────────────────────────────────────
// News & Announcements
// ─────────────────────────────────────────────────

export async function getNewsArticles(options?: {
  limit?: number;
  featured?: boolean;
  category?: string;
}): Promise<NewsArticle[]> {
  const filter: Record<string, unknown> = { status: { _eq: 'published' } };

  if (options?.featured) {
    filter.is_featured = { _eq: true };
  }

  if (options?.category) {
    filter.category = { slug: { _eq: options.category } };
  }

  return fetchCollection<NewsArticle>('news', {
    filter,
    sort: ['-publish_date'],
    limit: options?.limit || 100,
    fields: ['*', 'category.*', 'author.first_name', 'author.last_name'],
  });
}

export async function getNewsArticle(slug: string): Promise<NewsArticle | null> {
  const articles = await fetchCollection<NewsArticle>('news', {
    filter: {
      status: { _eq: 'published' },
      slug: { _eq: slug },
    },
    fields: ['*', 'category.*', 'author.*', 'gallery.*', 'related_sector.*', 'related_project.*'],
    limit: 1,
  });
  return articles[0] || null;
}

// ─────────────────────────────────────────────────
// Team Members
// ─────────────────────────────────────────────────

export async function getTeamMembers(options?: {
  leadership?: boolean;
}): Promise<TeamMember[]> {
  const filter: Record<string, unknown> = { status: { _eq: 'published' } };

  if (options?.leadership) {
    filter.is_leadership = { _eq: true };
  }

  return fetchCollection<TeamMember>('team_members', {
    filter,
    sort: ['sort'],
    fields: ['*'],
  });
}

// ─────────────────────────────────────────────────
// CSR Initiatives
// ─────────────────────────────────────────────────

export async function getCSRInitiatives(options?: {
  limit?: number;
}): Promise<CSRInitiative[]> {
  return fetchCollection<CSRInitiative>('csr_initiatives', {
    filter: { status: { _eq: 'published' } },
    sort: ['sort'],
    limit: options?.limit || 100,
    fields: ['*', 'category.*'],
  });
}

export async function getCSRInitiative(slug: string): Promise<CSRInitiative | null> {
  const initiatives = await fetchCollection<CSRInitiative>('csr_initiatives', {
    filter: {
      status: { _eq: 'published' },
      slug: { _eq: slug },
    },
    fields: ['*', 'category.*', 'gallery.*'],
    limit: 1,
  });
  return initiatives[0] || null;
}

// ─────────────────────────────────────────────────
// Job Listings
// ─────────────────────────────────────────────────

export async function getJobListings(): Promise<JobListing[]> {
  return fetchCollection<JobListing>('job_listings', {
    filter: { status: { _eq: 'published' } },
    sort: ['-posted_date'],
    fields: ['*', 'department.*', 'subsidiary.name'],
  });
}

export async function getJobListing(slug: string): Promise<JobListing | null> {
  const jobs = await fetchCollection<JobListing>('job_listings', {
    filter: {
      status: { _eq: 'published' },
      slug: { _eq: slug },
    },
    fields: ['*', 'department.*', 'subsidiary.*'],
    limit: 1,
  });
  return jobs[0] || null;
}

// ─────────────────────────────────────────────────
// Site Settings
// ─────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return fetchSingleton<SiteSettings>('site_settings');
}

// ─────────────────────────────────────────────────
// Asset URL Helper
// ─────────────────────────────────────────────────

// Image optimization presets for consistent performance
export const imagePresets = {
  thumbnail: { width: 400, quality: 75, format: 'webp' as const },
  card: { width: 800, quality: 80, format: 'webp' as const },
  hero: { width: 1920, quality: 80, format: 'webp' as const },
  full: { width: 2400, quality: 85, format: 'webp' as const },
} as const;

export type ImagePreset = keyof typeof imagePresets;

export function getAssetUrl(assetId: string | null | undefined, options?: {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png' | 'auto';
  fit?: 'cover' | 'contain' | 'inside' | 'outside';
  preset?: ImagePreset;
}): string | null {
  if (!assetId) return null;

  // Handle both UUID asset IDs and path-based references
  // If it starts with /, it's a path - strip the leading slash for assets endpoint
  const cleanId = assetId.startsWith('/') ? assetId.slice(1) : assetId;
  let url = `${getApiBaseUrl()}/assets/${cleanId}`;

  // Apply preset if specified, otherwise use individual options
  const preset = options?.preset ? imagePresets[options.preset] : null;
  const finalOptions = {
    width: options?.width ?? preset?.width,
    height: options?.height,
    quality: options?.quality ?? preset?.quality ?? 80,
    format: options?.format ?? preset?.format ?? 'webp', // Default to WebP
    fit: options?.fit ?? 'cover',
  };

  const params = new URLSearchParams();

  if (finalOptions.width) params.append('width', finalOptions.width.toString());
  if (finalOptions.height) params.append('height', finalOptions.height.toString());
  if (finalOptions.quality) params.append('quality', finalOptions.quality.toString());
  if (finalOptions.format && finalOptions.format !== 'auto') {
    params.append('format', finalOptions.format);
  }
  if (finalOptions.fit) params.append('fit', finalOptions.fit);

  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  return url;
}

/**
 * Generate srcSet for responsive images from Directus
 * Returns srcset string for use in <img> or Next.js Image component
 */
export function getAssetSrcSet(
  assetId: string | null | undefined,
  widths: number[] = [400, 800, 1200, 1600],
  options?: { quality?: number; format?: 'webp' | 'jpg' | 'png' }
): string | null {
  if (!assetId) return null;

  return widths
    .map(width => {
      const url = getAssetUrl(assetId, {
        width,
        quality: options?.quality ?? 80,
        format: options?.format ?? 'webp',
      });
      return `${url} ${width}w`;
    })
    .join(', ');
}

// ─────────────────────────────────────────────────
// Fallback Images (used when CMS images not available)
// ─────────────────────────────────────────────────

export const fallbackImages = {
  industries: {
    'import-export': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
    'agriculture': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    'agro-industry': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    'manufacturing': 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80',
    'construction': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    'real-estate': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    'hospitality': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    'tourism': 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=800&q=80',
    'general-trading': 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    'farming': 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
    'social-development': 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80',
  } as Record<string, string>,
  heroImages: {
    'import-export': 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80',
    'agriculture': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80',
    'agro-industry': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&q=80',
    'manufacturing': 'https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1920&q=80',
    'construction': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80',
    'real-estate': 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80',
    'hospitality': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1920&q=80',
    'tourism': 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1920&q=80',
    'general-trading': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&q=80',
    'farming': 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1920&q=80',
    'social-development': 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80',
  } as Record<string, string>,
  defaultHero: 'https://images.unsplash.com/photo-1611348524140-53c9a25263d6?w=1920&q=80',
  defaultProject: 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?w=1600&q=80',
  defaultNews: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
};

/**
 * Check if a string looks like a valid Directus UUID asset ID
 */
function isValidAssetId(id: string): boolean {
  // Directus asset IDs are UUIDs (36 characters with hyphens)
  // e.g., "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidPattern.test(id);
}

/**
 * Get industry image URL - uses CMS if available, falls back to Unsplash
 */
export function getIndustryImageUrl(
  slug: string,
  heroImageId?: string | null,
  isHero = false
): string {
  // Try CMS image first - only if it's a valid UUID (not a file path placeholder)
  if (heroImageId && isValidAssetId(heroImageId)) {
    const cmsUrl = getAssetUrl(heroImageId, {
      width: isHero ? 1920 : 800,
      quality: 80,
      format: 'webp',
    });
    if (cmsUrl) return cmsUrl;
  }

  // Fallback to Unsplash images
  const fallbacks = isHero ? fallbackImages.heroImages : fallbackImages.industries;
  return fallbacks[slug] || fallbackImages.defaultHero;
}

export default directus;
