// =====================================================
// ZG BUSINESS GROUP - Type Definitions
// Content types matching Directus CMS schema
// =====================================================

// ─────────────────────────────────────────────────
// Base Types
// ─────────────────────────────────────────────────

export type Status = 'draft' | 'published' | 'archived';

export interface BaseEntity {
  id: string;
  status: Status;
  created_at: string;
  updated_at: string;
}

export interface SEOFields {
  meta_title?: string;
  meta_description?: string;
}

export interface MediaFile {
  id: string;
  url: string;
  alt?: string;
  width?: number;
  height?: number;
  type: 'image' | 'video' | 'document';
}

// ─────────────────────────────────────────────────
// Group Profile (Singleton)
// ─────────────────────────────────────────────────

export interface GroupProfile extends BaseEntity, SEOFields {
  company_name: string;
  tagline: string;
  founding_year: number;
  headquarters: string;
  legal_name?: string;
  registration_no?: string;

  // Narrative
  philosophy: string;
  history: string;
  vision: string;
  mission: string;
  values: CoreValue[];

  // Statistics
  employee_count: number;
  years_operating: number;
  industries_count: number;

  // Media
  logo_primary?: MediaFile;
  logo_monogram?: MediaFile;
  logo_dark?: MediaFile;
  hero_video?: MediaFile;
  hero_image?: MediaFile;
  og_image?: MediaFile;

  // Contact
  primary_email: string;
  primary_phone: string;
  address: string;
  postal_code?: string;
  google_maps_url?: string;
  google_maps_lat?: number;
  google_maps_lng?: number;

  // Social
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
}

export interface CoreValue {
  title: string;
  description: string;
  icon?: string;
}

// ─────────────────────────────────────────────────
// Business Sectors
// ─────────────────────────────────────────────────

export interface BusinessSector extends BaseEntity, SEOFields {
  name: string;
  slug: string;
  code?: string;
  tagline?: string;
  sort?: number;

  // Visual
  icon?: MediaFile | string;
  logo?: string; // Path to SVG logo
  primary_color?: string;
  hero_image?: MediaFile | string;
  thumbnail?: MediaFile;
  gallery?: string[]; // Array of image paths

  // Content
  introduction?: string;
  description?: string; // From Directus API
  full_description?: string; // Extended description for detail page
  capabilities?: Capability[];
  history?: string;

  // Location
  location?: string;
  established?: number;

  // Computed
  project_count?: number;
  subsidiary_count?: number;
  employee_count?: string | number;
}

export interface Capability {
  title: string;
  description: string;
  icon?: string;
}

// ─────────────────────────────────────────────────
// Subsidiaries
// ─────────────────────────────────────────────────

export interface Subsidiary extends BaseEntity, SEOFields {
  name: string;
  slug: string;
  legal_name?: string;
  established_year: number;
  is_flagship: boolean;
  sort: number;

  // Relationships
  sector: BusinessSector;
  related_sectors?: BusinessSector[];

  // Visual
  logo?: MediaFile;
  hero_image?: MediaFile;
  gallery?: MediaFile[];

  // Content
  introduction: string;
  services?: string;
  achievements?: Achievement[];
  custom_stats?: CustomStat[];

  // Contact
  email?: string;
  phone?: string;
  address?: string;
  website_url?: string;

  // Leadership
  leadership?: TeamMember[];
}

export interface Achievement {
  title: string;
  description: string;
  year?: number;
}

export interface CustomStat {
  label: string;
  value: string | number;
  suffix?: string;
}

// ─────────────────────────────────────────────────
// Projects
// ─────────────────────────────────────────────────

export interface Project extends BaseEntity, SEOFields {
  title: string;
  slug: string;
  project_code?: string;
  sort: number;

  // Relationships
  sector: BusinessSector;
  subsidiary?: Subsidiary;
  related_projects?: Project[];

  // Classification
  project_type: ProjectType;
  project_status: ProjectStatus;
  is_featured: boolean;

  // Location
  location_name: string;
  location_lat?: number;
  location_lng?: number;

  // Timeline
  start_date?: string;
  completion_date?: string;
  estimated_completion?: string;

  // Content
  summary: string;
  description: string;
  scope?: string;
  impact?: string;

  // Statistics
  statistics?: ProjectStat[];

  // Media
  hero_image?: MediaFile;
  featured_image?: MediaFile;
  gallery?: MediaFile[];

  // Downloads
  documents?: Download[];
}

export type ProjectType =
  | 'development'
  | 'infrastructure'
  | 'commercial'
  | 'residential'
  | 'industrial'
  | 'agricultural'
  | 'hospitality'
  | 'mixed_use';

export type ProjectStatus = 'completed' | 'in_progress' | 'planned';

export interface ProjectStat {
  label: string;
  value: string | number;
  suffix?: string;
}

// ─────────────────────────────────────────────────
// News & Announcements
// ─────────────────────────────────────────────────

export interface NewsArticle extends BaseEntity, SEOFields {
  title: string;
  slug: string;
  category: NewsCategory;
  tags?: Tag[];
  is_featured: boolean;

  // Relationships
  related_sector?: BusinessSector;
  related_subsidiary?: Subsidiary;
  related_project?: Project;

  // Content
  excerpt: string;
  body: string;
  author?: TeamMember;

  // Media
  featured_image?: MediaFile;
  gallery?: MediaFile[];

  // Publishing
  publish_date: string;
  expiry_date?: string;
}

export interface NewsCategory {
  id: string;
  name: string;
  slug: string;
  color?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

// ─────────────────────────────────────────────────
// Team Members
// ─────────────────────────────────────────────────

export interface TeamMember extends BaseEntity {
  first_name: string;
  last_name: string;
  title: string;
  is_leadership: boolean;
  sort: number;

  // Relationships
  primary_subsidiary?: Subsidiary;

  // Content
  bio?: string;
  expertise?: string[];

  // Media
  headshot?: MediaFile;
  headshot_casual?: MediaFile;

  // Contact
  email?: string;
  phone?: string;
  linkedin_url?: string;
}

// ─────────────────────────────────────────────────
// CSR Initiatives
// ─────────────────────────────────────────────────

export interface CSRInitiative extends BaseEntity, SEOFields {
  title: string;
  slug: string;
  category: CSRCategory;
  sort: number;

  // Content
  summary: string;
  description: string;
  impact_statement?: string;

  // Statistics
  impact_metrics?: ImpactMetric[];
  beneficiaries?: number;
  start_date?: string;
  ongoing: boolean;

  // Location
  locations?: CSRLocation[];

  // Media
  featured_image?: MediaFile;
  gallery?: MediaFile[];

  // Partners
  partner_organizations?: PartnerOrg[];
}

export interface CSRCategory {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  color?: string;
}

export interface ImpactMetric {
  label: string;
  value: string | number;
  description?: string;
}

export interface CSRLocation {
  name: string;
  region?: string;
}

export interface PartnerOrg {
  name: string;
  logo?: MediaFile;
  url?: string;
}

// ─────────────────────────────────────────────────
// Downloads
// ─────────────────────────────────────────────────

export interface Download extends BaseEntity {
  title: string;
  description?: string;
  document_type: DocumentType;

  // File
  file: MediaFile;
  thumbnail?: MediaFile;

  // Classification
  related_sector?: BusinessSector;
  related_subsidiary?: Subsidiary;
  year?: number;
}

export type DocumentType = 'brochure' | 'report' | 'policy' | 'press_kit' | 'other';

// ─────────────────────────────────────────────────
// Careers
// ─────────────────────────────────────────────────

export interface JobListing extends BaseEntity {
  title: string;
  slug: string;
  reference_code?: string;

  // Classification
  department?: Department;
  subsidiary?: Subsidiary;
  location: string;
  employment_type: EmploymentType;

  // Content
  summary: string;
  responsibilities: string;
  requirements: string;
  benefits?: string;

  // Application
  application_email?: string;
  application_url?: string;
  deadline?: string;

  // Dates
  posted_date: string;
}

export interface Department {
  id: string;
  name: string;
  slug: string;
}

export type EmploymentType = 'full_time' | 'part_time' | 'contract' | 'internship';

// ─────────────────────────────────────────────────
// Site Settings (Singleton)
// ─────────────────────────────────────────────────

export interface HeroStat {
  value: number;
  suffix?: string;
  label: string;
}

export interface CoreValue {
  title: string;
  description: string;
}

export interface CompanyStat {
  value: number;
  suffix?: string;
  label: string;
}

export interface SiteSettings {
  id?: number;

  // Basic Info
  site_title?: string;
  tagline?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;

  // Social Links
  social_linkedin?: string;
  social_twitter?: string;
  social_facebook?: string;

  // Footer
  footer_text?: string;

  // Hero Section
  hero_headline?: string;
  hero_description?: string;
  hero_image?: string;
  hero_stats?: HeroStat[];
  founding_year?: number;
  headquarters?: string;

  // About Section
  about_headline?: string;
  vision?: string;
  mission?: string;
  philosophy?: string;
  about_image?: string;
  company_story?: string;
  core_values?: CoreValue[];
  company_stats?: CompanyStat[];

  // Impact Quote Section
  impact_quote?: string;
  impact_quote_author?: string;
  impact_quote_title?: string;

  // Navigation (future)
  primary_nav?: NavItem[];
  footer_nav?: NavItem[];

  // Homepage (future)
  featured_sectors?: BusinessSector[];
  featured_project?: Project;
  featured_news?: NewsArticle[];
  partner_logos?: PartnerLogo[];

  // Global Content
  announcement_bar?: string;
  announcement_active?: boolean;
  copyright_text?: string;

  // SEO
  default_meta_title?: string;
  default_meta_desc?: string;

  // Analytics
  gtm_id?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface PartnerLogo {
  name: string;
  logo: MediaFile;
  url?: string;
}
