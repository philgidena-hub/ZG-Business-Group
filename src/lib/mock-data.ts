// =====================================================
// Mock Data for ZG Business Group
// Realistic data matching Directus CMS schema
// =====================================================

import type {
  GroupProfile,
  BusinessSector,
  Project,
  NewsArticle,
  CSRInitiative,
} from '@/types';

// ─────────────────────────────────────────────────
// Group Profile
// ─────────────────────────────────────────────────

export const groupProfile: Partial<GroupProfile> = {
  company_name: 'ZG Business Group',
  tagline: 'Building Ethiopia\'s Tomorrow',
  founding_year: 2008,
  headquarters: 'Addis Ababa, Ethiopia',
  philosophy: `ZG Business Group was founded on a simple conviction: that disciplined, ethical enterprise can be a transformative force for communities and nations.

From our origins in import and export, we have methodically expanded into sectors that serve fundamental human needs—food, shelter, employment, hospitality, and community development.

We build not for quarters, but for generations.`,
  vision: 'To be East Africa\'s most trusted diversified enterprise, creating sustainable value for communities and stakeholders.',
  mission: 'We transform industries through operational excellence, ethical practices, and long-term commitment to the communities we serve.',
  employee_count: 5000,
  years_operating: 17,
  industries_count: 10,
  primary_email: 'info@zggroup.com',
  primary_phone: '+251 11 123 4567',
  address: 'Bole Road, Addis Ababa, Ethiopia',
  postal_code: 'PO Box 12345',
  linkedin_url: 'https://linkedin.com/company/zggroup',
  twitter_url: 'https://twitter.com/zggroup',
  facebook_url: 'https://facebook.com/zggroup',
};

// ─────────────────────────────────────────────────
// Business Sectors
// ─────────────────────────────────────────────────

export const businessSectors: Partial<BusinessSector>[] = [
  {
    id: '1',
    name: 'Import & Export',
    slug: 'import-export',
    code: 'IMP',
    tagline: 'Connecting Ethiopian markets to the world',
    primary_color: '#C4A035',
    introduction: 'Our import and export division forms the foundation of ZG Business Group, facilitating trade connections between Ethiopia and global markets.',
    project_count: 12,
    subsidiary_count: 2,
    sort: 1,
  },
  {
    id: '2',
    name: 'Agro-Industry',
    slug: 'agro-industry',
    code: 'AGR',
    tagline: 'From farm to global table',
    primary_color: '#4A6B5D',
    introduction: 'Processing and exporting Ethiopia\'s finest agricultural products, from premium coffee to oilseeds and pulses.',
    project_count: 8,
    subsidiary_count: 3,
    sort: 2,
  },
  {
    id: '3',
    name: 'Manufacturing',
    slug: 'manufacturing',
    code: 'MFG',
    tagline: 'Precision engineering for African industry',
    primary_color: '#5C5752',
    introduction: 'Modern manufacturing facilities producing quality goods for domestic consumption and export markets.',
    project_count: 5,
    subsidiary_count: 2,
    sort: 3,
  },
  {
    id: '4',
    name: 'Construction',
    slug: 'construction',
    code: 'CON',
    tagline: 'Building the infrastructure of progress',
    primary_color: '#8B4D3B',
    introduction: 'Large-scale construction projects shaping Ethiopia\'s urban landscape and infrastructure development.',
    project_count: 15,
    subsidiary_count: 2,
    sort: 4,
  },
  {
    id: '5',
    name: 'Real Estate',
    slug: 'real-estate',
    code: 'REA',
    tagline: 'Creating spaces for modern living',
    primary_color: '#FAF8F5',
    introduction: 'Premium residential and commercial developments setting new standards for quality and design.',
    project_count: 10,
    subsidiary_count: 1,
    sort: 5,
  },
  {
    id: '6',
    name: 'Hospitality',
    slug: 'hospitality',
    code: 'HOS',
    tagline: 'Ethiopian warmth, international standards',
    primary_color: '#C4A035',
    introduction: 'Hotels and resorts offering world-class hospitality experiences rooted in Ethiopian culture.',
    project_count: 4,
    subsidiary_count: 2,
    sort: 6,
  },
  {
    id: '7',
    name: 'Tourism',
    slug: 'tourism',
    code: 'TOU',
    tagline: 'Showcasing Ethiopia\'s wonders',
    primary_color: '#4A6B5D',
    introduction: 'Tour operations and destination management services introducing visitors to Ethiopia\'s natural and cultural heritage.',
    project_count: 6,
    subsidiary_count: 1,
    sort: 7,
  },
  {
    id: '8',
    name: 'General Trading',
    slug: 'general-trading',
    code: 'TRD',
    tagline: 'Reliable supply chain solutions',
    primary_color: '#5C5752',
    introduction: 'Diversified trading operations supplying essential commodities to Ethiopian markets.',
    project_count: 3,
    subsidiary_count: 1,
    sort: 8,
  },
  {
    id: '9',
    name: 'Farming',
    slug: 'farming',
    code: 'FRM',
    tagline: 'Sustainable agriculture at scale',
    primary_color: '#4A6B5D',
    introduction: 'Commercial farming operations producing crops and livestock using modern, sustainable practices.',
    project_count: 7,
    subsidiary_count: 2,
    sort: 9,
  },
  {
    id: '10',
    name: 'Social Development',
    slug: 'social-development',
    code: 'SOC',
    tagline: 'Investing in communities',
    primary_color: '#8B4D3B',
    introduction: 'Community development initiatives in education, healthcare, and economic empowerment.',
    project_count: 20,
    subsidiary_count: 1,
    sort: 10,
  },
];

// ─────────────────────────────────────────────────
// Featured Project
// ─────────────────────────────────────────────────

export const featuredProject: Partial<Project> = {
  id: '1',
  title: 'Riverside Heights Residential Development',
  slug: 'riverside-heights',
  project_code: 'RH-2024',
  project_type: 'residential',
  project_status: 'in_progress',
  is_featured: true,
  location_name: 'Addis Ababa, Ethiopia',
  start_date: '2022-03-15',
  estimated_completion: '2025-06-30',
  summary: 'A landmark 240-unit residential development setting new standards for urban living in East Africa.',
  description: `Riverside Heights represents our vision for modern Ethiopian urban living—spaces that honor local culture while embracing international standards of quality and sustainability.

The development features 240 thoughtfully designed units across 12 floors, with amenities including rooftop gardens, a fitness center, children's play areas, and 24-hour security.`,
  statistics: [
    { label: 'Units', value: 240 },
    { label: 'Floors', value: 12 },
    { label: 'Completion', value: '2025' },
    { label: 'Built Area', value: '45,000', suffix: 'm²' },
  ],
};

// ─────────────────────────────────────────────────
// News Articles
// ─────────────────────────────────────────────────

export const newsArticles: Partial<NewsArticle>[] = [
  {
    id: '1',
    title: 'ZG Group Announces New Hospitality Division Expansion',
    slug: 'hospitality-division-expansion',
    category: { id: '1', name: 'Announcement', slug: 'announcement', color: '#C4A035' },
    excerpt: 'Strategic expansion into the hospitality sector with two new hotel developments in Addis Ababa and Hawassa.',
    publish_date: '2024-12-15',
    is_featured: true,
  },
  {
    id: '2',
    title: 'Riverside Heights Phase 2 Reaches Structural Completion',
    slug: 'riverside-heights-phase-2',
    category: { id: '2', name: 'Project Update', slug: 'project-update', color: '#4A6B5D' },
    excerpt: 'Major milestone achieved as the second phase of our flagship residential development completes structural work.',
    publish_date: '2024-12-08',
    is_featured: false,
  },
  {
    id: '3',
    title: 'The Future of Ethiopian Agriculture: Our Vision',
    slug: 'future-ethiopian-agriculture',
    category: { id: '3', name: 'Insight', slug: 'insight', color: '#8B4D3B' },
    excerpt: 'How modern farming practices and technology are transforming Ethiopian agriculture for global markets.',
    publish_date: '2024-11-30',
    is_featured: false,
  },
];

// ─────────────────────────────────────────────────
// CSR Initiatives
// ─────────────────────────────────────────────────

export const csrInitiatives: Partial<CSRInitiative>[] = [
  {
    id: '1',
    title: 'Education Initiative',
    slug: 'education-initiative',
    summary: 'Supporting quality education in underserved communities',
    impact_metrics: [
      { label: 'Schools Supported', value: 3 },
      { label: 'Students Reached', value: 1200 },
    ],
    ongoing: true,
  },
  {
    id: '2',
    title: 'Healthcare Support Program',
    slug: 'healthcare-support',
    summary: 'Mobile clinic program serving rural communities',
    impact_metrics: [
      { label: 'Communities Served', value: 5 },
      { label: 'Medical Consultations', value: 8000 },
    ],
    ongoing: true,
  },
  {
    id: '3',
    title: 'Agricultural Training',
    slug: 'agricultural-training',
    summary: 'Empowering farmers with modern techniques',
    impact_metrics: [
      { label: 'Farmers Trained', value: 200 },
      { label: 'Annual Sessions', value: 12 },
    ],
    ongoing: true,
  },
  {
    id: '4',
    title: 'Women\'s Enterprise Fund',
    slug: 'womens-enterprise',
    summary: 'Micro-financing for women-led businesses',
    impact_metrics: [
      { label: 'Businesses Funded', value: 50 },
      { label: 'Jobs Created', value: 150 },
    ],
    ongoing: true,
  },
];

// ─────────────────────────────────────────────────
// Partner Logos (placeholder data)
// ─────────────────────────────────────────────────

export const partnerLogos = [
  {
    name: 'Ethiopian Airlines',
    slug: 'ethiopian-airlines',
    logo: '/partner logos/ethiopian airlines.png',
  },
  {
    name: 'Commercial Bank of Ethiopia',
    slug: 'cbe',
    logo: '/partner logos/commercial-bank-of-ethiopia.png',
  },
  {
    name: 'Ethiopian Investment Commission',
    slug: 'eic',
    logo: '/partner logos/Ethiopian-Investment-Commission.jpg',
  },
  {
    name: 'African Development Bank',
    slug: 'afdb',
    logo: '/partner logos/african development bank.png',
  },
  {
    name: 'USAID',
    slug: 'usaid',
    logo: '/partner logos/USAID.png',
  },
  {
    name: 'World Bank',
    slug: 'world-bank',
    logo: '/partner logos/world bank.png',
  },
];

// ─────────────────────────────────────────────────
// Stats for Legacy Bar
// ─────────────────────────────────────────────────

export const companyStats = [
  { label: 'Years of Operation', value: 17, suffix: '' },
  { label: 'Industries', value: 10, suffix: '' },
  { label: 'Employees', value: 5000, suffix: '+' },
  { label: 'Projects Completed', value: 100, suffix: '+' },
];

// ─────────────────────────────────────────────────
// Founder Quote
// ─────────────────────────────────────────────────

export const founderQuote = {
  text: "We don't just build structures—we build communities. Every project is an investment in Ethiopian futures.",
  author: 'Ato Zerihun Getahun',
  title: 'Founder & Chairman',
};

// ─────────────────────────────────────────────────
// Subsidiary Companies
// ─────────────────────────────────────────────────

export const subsidiaryCompanies = [
  {
    id: '1',
    name: 'ZG Import & Export PLC',
    slug: 'zg-import-export',
    sector: 'Import & Export',
    sectorSlug: 'import-export',
    established: 2008,
    description: 'Our founding company specializing in international trade, connecting Ethiopian products to global markets and importing essential commodities.',
    employeeCount: 450,
    location: 'Addis Ababa',
  },
  {
    id: '2',
    name: 'ZG Agro Industries',
    slug: 'zg-agro-industries',
    sector: 'Agro-Industry',
    sectorSlug: 'agro-industry',
    established: 2010,
    description: 'Processing and exporting premium Ethiopian coffee, oilseeds, and pulses to international markets.',
    employeeCount: 800,
    location: 'Addis Ababa & Jimma',
  },
  {
    id: '3',
    name: 'ZG Construction',
    slug: 'zg-construction',
    sector: 'Construction',
    sectorSlug: 'construction',
    established: 2012,
    description: 'Leading construction company delivering residential, commercial, and infrastructure projects across Ethiopia.',
    employeeCount: 1200,
    location: 'Addis Ababa',
  },
  {
    id: '4',
    name: 'ZG Real Estate Development',
    slug: 'zg-real-estate',
    sector: 'Real Estate',
    sectorSlug: 'real-estate',
    established: 2014,
    description: 'Premium residential and commercial property development setting new standards for quality living.',
    employeeCount: 350,
    location: 'Addis Ababa',
  },
  {
    id: '5',
    name: 'ZG Hotels & Resorts',
    slug: 'zg-hotels',
    sector: 'Hospitality',
    sectorSlug: 'hospitality',
    established: 2016,
    description: 'Luxury hospitality experiences combining Ethiopian warmth with international service standards.',
    employeeCount: 600,
    location: 'Addis Ababa & Hawassa',
  },
  {
    id: '6',
    name: 'ZG Manufacturing PLC',
    slug: 'zg-manufacturing',
    sector: 'Manufacturing',
    sectorSlug: 'manufacturing',
    established: 2015,
    description: 'Modern manufacturing facilities producing quality goods for domestic and export markets.',
    employeeCount: 500,
    location: 'Industrial Zone, Addis Ababa',
  },
  {
    id: '7',
    name: 'ZG Tours & Travel',
    slug: 'zg-tours',
    sector: 'Tourism',
    sectorSlug: 'tourism',
    established: 2017,
    description: 'Showcasing Ethiopia\'s natural and cultural heritage through premium tour experiences.',
    employeeCount: 150,
    location: 'Addis Ababa',
  },
  {
    id: '8',
    name: 'ZG Farms',
    slug: 'zg-farms',
    sector: 'Farming',
    sectorSlug: 'farming',
    established: 2013,
    description: 'Sustainable commercial farming operations producing crops and livestock using modern practices.',
    employeeCount: 700,
    location: 'Oromia Region',
  },
];

// ─────────────────────────────────────────────────
// All Projects
// ─────────────────────────────────────────────────

export const allProjects: Partial<Project>[] = [
  {
    id: '1',
    title: 'Riverside Heights Residential Development',
    slug: 'riverside-heights',
    project_code: 'RH-2024',
    project_type: 'residential',
    project_status: 'in_progress',
    is_featured: true,
    location_name: 'Addis Ababa, Ethiopia',
    start_date: '2022-03-15',
    estimated_completion: '2025-06-30',
    summary: 'A landmark 240-unit residential development setting new standards for urban living in East Africa.',
    statistics: [
      { label: 'Units', value: 240 },
      { label: 'Floors', value: 12 },
      { label: 'Completion', value: '2025' },
      { label: 'Built Area', value: '45,000', suffix: 'm²' },
    ],
  },
  {
    id: '2',
    title: 'Bole Commercial Tower',
    slug: 'bole-commercial-tower',
    project_code: 'BCT-2023',
    project_type: 'commercial',
    project_status: 'in_progress',
    is_featured: false,
    location_name: 'Bole, Addis Ababa',
    start_date: '2023-01-10',
    estimated_completion: '2026-12-31',
    summary: 'A 25-story Grade A office tower in the heart of Addis Ababa\'s business district.',
    statistics: [
      { label: 'Floors', value: 25 },
      { label: 'Office Space', value: '60,000', suffix: 'm²' },
      { label: 'Parking', value: 500, suffix: ' spaces' },
    ],
  },
  {
    id: '3',
    title: 'Hawassa Lakeside Resort',
    slug: 'hawassa-lakeside-resort',
    project_code: 'HLR-2022',
    project_type: 'hospitality',
    project_status: 'completed',
    is_featured: false,
    location_name: 'Hawassa, Ethiopia',
    start_date: '2020-06-01',
    estimated_completion: '2023-08-15',
    summary: 'A luxury lakeside resort featuring 120 rooms with stunning views of Lake Hawassa.',
    statistics: [
      { label: 'Rooms', value: 120 },
      { label: 'Restaurants', value: 3 },
      { label: 'Conference Halls', value: 4 },
    ],
  },
  {
    id: '4',
    title: 'Ethiopian Coffee Processing Facility',
    slug: 'coffee-processing-facility',
    project_code: 'CPF-2021',
    project_type: 'industrial',
    project_status: 'completed',
    is_featured: false,
    location_name: 'Jimma, Ethiopia',
    start_date: '2019-04-01',
    estimated_completion: '2021-11-30',
    summary: 'State-of-the-art coffee processing facility with capacity to process 50,000 tons annually.',
    statistics: [
      { label: 'Capacity', value: '50,000', suffix: ' tons/year' },
      { label: 'Jobs Created', value: 350 },
      { label: 'Farmers Served', value: '5,000', suffix: '+' },
    ],
  },
  {
    id: '5',
    title: 'Green Valley Housing Estate',
    slug: 'green-valley-estate',
    project_code: 'GVE-2024',
    project_type: 'residential',
    project_status: 'planned',
    is_featured: false,
    location_name: 'Addis Ababa Outskirts',
    start_date: '2025-01-15',
    estimated_completion: '2028-06-30',
    summary: 'A sustainable housing community with 500 eco-friendly homes and integrated amenities.',
    statistics: [
      { label: 'Homes', value: 500 },
      { label: 'Green Space', value: '40', suffix: '%' },
      { label: 'Solar Power', value: '100', suffix: '%' },
    ],
  },
  {
    id: '6',
    title: 'Oromia Agricultural Training Center',
    slug: 'agricultural-training-center',
    project_code: 'ATC-2020',
    project_type: 'agricultural',
    project_status: 'completed',
    is_featured: false,
    location_name: 'Oromia Region',
    start_date: '2018-09-01',
    estimated_completion: '2020-03-15',
    summary: 'Training facility providing modern agricultural education to local farmers.',
    statistics: [
      { label: 'Farmers Trained', value: '2,000', suffix: '+' },
      { label: 'Annual Capacity', value: 500 },
      { label: 'Training Programs', value: 12 },
    ],
  },
];

// ─────────────────────────────────────────────────
// Career Openings
// ─────────────────────────────────────────────────

export const careerOpenings = [
  {
    id: '1',
    title: 'Senior Project Manager',
    department: 'Construction',
    location: 'Addis Ababa',
    type: 'Full-time',
    experience: '8+ years',
    posted: '2024-12-20',
  },
  {
    id: '2',
    title: 'Financial Analyst',
    department: 'Finance',
    location: 'Addis Ababa',
    type: 'Full-time',
    experience: '3-5 years',
    posted: '2024-12-18',
  },
  {
    id: '3',
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Addis Ababa',
    type: 'Full-time',
    experience: '5+ years',
    posted: '2024-12-15',
  },
  {
    id: '4',
    title: 'Hospitality Operations Lead',
    department: 'Hotels & Resorts',
    location: 'Hawassa',
    type: 'Full-time',
    experience: '6+ years',
    posted: '2024-12-10',
  },
  {
    id: '5',
    title: 'Agricultural Engineer',
    department: 'Agro-Industry',
    location: 'Jimma',
    type: 'Full-time',
    experience: '4+ years',
    posted: '2024-12-08',
  },
];
