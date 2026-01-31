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
  philosophy: `ZG Business Group is a diversified Ethiopian business group established in 2008, operating across multiple strategic sectors that contribute to economic growth, job creation, and social development. Since its inception, the Group has expanded steadily, building a strong reputation for reliability, ethical business practice, and long-term partnerships.

ZG Business Group is actively engaged in trade, import and export, agro-industry, manufacturing, construction, hospitality (hotel services), and general trading, serving both domestic and international markets. In parallel with its commercial activities, the Group has a strong commitment to social services and community support, integrating social responsibility into its core business operations.`,
  values_text: 'ZG Business Group is built on integrity, professionalism, and trust, believing in strong partnerships and shared growth. We pursue excellence through innovation, resilience, and disciplined execution, while upholding full compliance and accountability. Beyond business, we are committed to sustainable development, social impact, and creating long-term value and legacy for our communities, partners, and future generations.',
  vision: 'To become a leading, trusted, and socially responsible business group in Ethiopia and the wider region by delivering sustainable economic value, promoting industrial development, and supporting community well-being.',
  mission: 'To develop and manage diversified businesses that meet international standards. To facilitate trade and investment through efficient import and export operations. To create employment opportunities and build local capacity. To actively contribute to social services and community development initiatives. To foster long-term partnerships based on trust, transparency, and mutual growth.',
  employee_count: 5000,
  years_operating: 17,
  industries_count: 11,
  primary_email: 'info@zggroup.com',
  primary_phone: '+251 11 123 4567',
  address: 'Bole Road, Addis Ababa, Ethiopia',
  postal_code: 'PO Box 12345',
  linkedin_url: 'https://linkedin.com/company/zggroup',
  twitter_url: 'https://twitter.com/zggroup',
  facebook_url: 'https://facebook.com/zggroup',
};

// ─────────────────────────────────────────────────
// Business Sectors / Companies
// ─────────────────────────────────────────────────

export const businessSectors: Partial<BusinessSector>[] = [
  {
    id: '1',
    name: 'Zeru Gebrelibanos Import & Export',
    slug: 'zeru-gebrelibanos-import-export',
    code: 'ZGIE',
    tagline: 'International Trade & Logistics',
    primary_color: '#C4A035',
    logo: '/industries/zeru gebrelibanos import & export/Zeru Gebrelibanos Import & Export.svg',
    introduction: 'Core trading arm of the Group, engaged in the importation of major construction materials and the export of agricultural products and livestock.',
    full_description: `Zeru Gebrelibanos Import & Export is a core trading arm of the Group, engaged in the importation of major construction materials and the export of agricultural products and livestock. The company facilitates international trade, manages cross-border logistics, and supports reliable supply chains across multiple regional and global markets.

Our import operations focus on bringing essential construction materials to support Ethiopia's growing infrastructure needs, while our export division connects Ethiopian agricultural products and livestock to international markets, promoting economic growth and trade relationships.`,
    gallery: [
      '/industries/zeru gebrelibanos import & export/1.png',
      '/industries/zeru gebrelibanos import & export/2.png',
      '/industries/zeru gebrelibanos import & export/3 (2).png',
      '/industries/zeru gebrelibanos import & export/4.png',
    ],
    location: 'Ethiopia',
    project_count: 15,
    subsidiary_count: 1,
    sort: 1,
  },
  {
    id: '2',
    name: 'ZG Agro-Industry (Raya)',
    slug: 'zg-agro-industry-raya',
    code: 'ZGAI',
    tagline: 'Commercial Farming in Tigray',
    primary_color: '#4A6B5D',
    logo: '/industries/ZG Business Group – Agro-Industry (Raya, Tigray)/ZG Business Group Agro Industry PLC .svg',
    introduction: 'Large-scale commercial farming in Raya, Tigray, focused on modern agricultural practices, productivity enhancement, and sustainable development.',
    full_description: `The Agro-Industry division operates large-scale commercial farming activities in Raya, Tigray, with a strong focus on modern agricultural practices, productivity enhancement, and sustainable development, contributing to food security and rural economic growth.

Our operations utilize cutting-edge farming technologies and best agronomic practices to maximize yields while maintaining environmental sustainability. We are committed to empowering local communities through employment and knowledge transfer.`,
    gallery: [
      '/industries/ZG Business Group – Agro-Industry (Raya, Tigray)/5.png',
    ],
    location: 'Raya, Tigray',
    project_count: 8,
    subsidiary_count: 1,
    sort: 2,
  },
  {
    id: '3',
    name: 'ZG Manufacturing',
    slug: 'zg-manufacturing',
    code: 'ZGMF',
    tagline: 'Industrial Value Addition',
    primary_color: '#5C5752',
    logo: '/industries/ZG Business Group – Manufacturing/ZG Business Group – Manufacturing .svg',
    introduction: 'Industrial value-addition and import substitution initiatives, including a large-scale edible oil production factory in Adigudem City, Tigray.',
    full_description: `ZG Business Group Manufacturing is engaged in industrial value-addition and import substitution initiatives. The Group has commenced construction of a large-scale edible oil production factory in Adigudem City, Tigray, aimed at strengthening domestic manufacturing capacity and agro-processing value chains.

This strategic investment supports Ethiopia's industrial development goals by reducing reliance on imports and creating local employment opportunities while producing high-quality products for domestic consumption.`,
    gallery: [
      '/industries/ZG Business Group – Manufacturing/6.png',
      '/industries/ZG Business Group – Manufacturing/7.png',
      '/industries/ZG Business Group – Manufacturing/8 (2).png',
    ],
    location: 'Adigudem City, Tigray',
    project_count: 5,
    subsidiary_count: 1,
    sort: 3,
  },
  {
    id: '4',
    name: 'ZG Real Estate (Mekelle)',
    slug: 'zg-real-estate-mekelle',
    code: 'ZGRE',
    tagline: 'Modern Urban Housing',
    primary_color: '#8B4D3B',
    logo: '/industries/ZG Business Group – Real Estate & Apartments (Mekelle)/ZG Business Group Real Estate & Apartments (Mekelle) .svg',
    introduction: 'Large-scale real estate and residential apartment project in Mekelle City, covering approximately 10 hectares of modern urban housing.',
    full_description: `The Group is developing a large-scale real estate and residential apartment project in Mekelle City, covering approximately 10 hectares, focused on modern urban housing, quality infrastructure, and sustainable city development.

This flagship development represents our commitment to creating quality living spaces that meet international standards while contributing to Ethiopia's urban development goals. The project features modern amenities, sustainable design principles, and thoughtful community planning.`,
    gallery: [
      '/industries/ZG Business Group – Real Estate & Apartments (Mekelle)/9.png',
      '/industries/ZG Business Group – Real Estate & Apartments (Mekelle)/10.png',
      '/industries/ZG Business Group – Real Estate & Apartments (Mekelle)/11.png',
      '/industries/ZG Business Group – Real Estate & Apartments (Mekelle)/12 (2).png',
      '/industries/ZG Business Group – Real Estate & Apartments (Mekelle)/13.png',
      '/industries/ZG Business Group – Real Estate & Apartments (Mekelle)/14.png',
      '/industries/ZG Business Group – Real Estate & Apartments (Mekelle)/15.png',
      '/industries/ZG Business Group – Real Estate & Apartments (Mekelle)/16.png',
      '/industries/ZG Business Group – Real Estate & Apartments (Mekelle)/17.png',
      '/industries/ZG Business Group – Real Estate & Apartments (Mekelle)/18.png',
    ],
    location: 'Mekelle City',
    project_count: 10,
    subsidiary_count: 1,
    sort: 4,
  },
  {
    id: '5',
    name: 'ZS Construction',
    slug: 'zs-construction',
    code: 'ZSC',
    tagline: 'Building Infrastructure',
    primary_color: '#C4A035',
    logo: '/industries/ZS Construction/ZS Construction.svg',
    introduction: 'Comprehensive construction and infrastructure services with proven experience in delivering building and civil works projects.',
    full_description: `ZS Construction provides comprehensive construction and infrastructure services, with proven experience in delivering building and civil works projects across multiple locations.

Our team of experienced professionals handles projects of all scales, from residential buildings to large infrastructure developments. We are committed to quality, safety, and timely delivery in all our construction endeavors.`,
    gallery: [
      '/industries/ZS Construction/23.png',
      '/industries/ZS Construction/24.png',
    ],
    location: 'Multiple Locations',
    project_count: 15,
    subsidiary_count: 1,
    sort: 5,
  },
  {
    id: '6',
    name: 'Warka Trading',
    slug: 'warka-trading',
    code: 'WTR',
    tagline: 'Commodity Trade Excellence',
    primary_color: '#4A6B5D',
    logo: '/industries/Warka Trading/Warka Trading.svg',
    introduction: 'Active in domestic and international commodity trade, importing essential goods and exporting Ethiopian agricultural products.',
    full_description: `Warka Trading is active in domestic and international commodity trade, importing essential goods such as wheat, sugar, and edible oil, and exporting Ethiopian agricultural products including coffee and sesame to international markets.

Our extensive network and deep market knowledge enable us to facilitate efficient trade flows, ensuring reliable supply of essential commodities while connecting Ethiopian farmers to global markets for their premium agricultural products.`,
    gallery: [
      '/industries/Warka Trading/20 (2).png',
      '/industries/Warka Trading/21.png',
      '/industries/Warka Trading/22.png',
      '/industries/Warka Trading/25.png',
    ],
    location: 'Ethiopia',
    project_count: 6,
    subsidiary_count: 1,
    sort: 6,
  },
  {
    id: '7',
    name: 'Mayweni PLC',
    slug: 'mayweni-plc',
    code: 'MWN',
    tagline: 'Quality Construction Materials',
    primary_color: '#5C5752',
    logo: '/industries/Mayweni PLC/Mayweni PLC.svg',
    introduction: 'Gravel and aggregate production sites supplying high-quality construction materials to infrastructure and real estate projects.',
    full_description: `Mayweni PLC operates gravel and aggregate production sites in multiple locations, supplying high-quality construction materials to infrastructure, real estate, and public works projects.

Our commitment to quality and reliability has made us a trusted partner for major construction projects across the region. We maintain strict quality control standards to ensure our materials meet the highest specifications.`,
    gallery: [
      '/industries/Mayweni PLC/26.png',
    ],
    location: 'Multiple Locations',
    project_count: 8,
    subsidiary_count: 1,
    sort: 7,
  },
  {
    id: '8',
    name: 'Northern Star Hotel & Tourism',
    slug: 'northern-star-hotel',
    code: 'NSH',
    tagline: 'Hospitality Excellence',
    primary_color: '#C4A035',
    logo: '/industries/Northern Star Hotel & Tourism/Northern Star Hotel & Tourism.svg',
    introduction: 'Hotels and lodges across key cities in Tigray, supporting hospitality services, tourism development, and local economic growth.',
    full_description: `Northern Star Hotel & Tourism develops and manages hotels and lodges across key cities in Tigray, supporting hospitality services, tourism development, and local economic growth.

Northern Star Hotel in Mekelle is a 4-star hospitality facility, providing high-quality accommodation, conferencing, and guest services with a strong emphasis on service excellence. Our properties combine Ethiopian warmth with international hospitality standards.`,
    gallery: [
      '/industries/Northern Star Hotel & Tourism/27.png',
      '/industries/Northern Star Hotel & Tourism/28.png',
    ],
    location: 'Mekelle, Tigray',
    project_count: 4,
    subsidiary_count: 2,
    sort: 8,
  },
  {
    id: '9',
    name: 'Raie Agro-Industry',
    slug: 'raie-agro-industry',
    code: 'RAI',
    tagline: 'Commercial Farming in Gambela',
    primary_color: '#4A6B5D',
    logo: '/industries/Raie Agro-Industry (Gambela Region)/raie Agro-Industry (Gambela Region).svg',
    introduction: 'Large-scale commercial farming operation in Gambela Region, producing sesame, vegetables, millet, corn, and other high-potential crops.',
    full_description: `Raie (ራኢ) Agro-Industry is a large-scale commercial farming operation in the Gambela Region, producing sesame, vegetables, millet, corn, and other high-potential crops, supporting agro-industrial supply chains and export-oriented production.

Our operations in Gambela leverage the region's fertile lands and favorable climate to produce premium agricultural products for both domestic consumption and international export markets.`,
    gallery: [
      '/industries/Raie Agro-Industry (Gambela Region)/29.jpg',
    ],
    location: 'Gambela Region',
    project_count: 6,
    subsidiary_count: 1,
    sort: 9,
  },
  {
    id: '10',
    name: 'Savana Farming PLC',
    slug: 'savana-farming-plc',
    code: 'SFP',
    tagline: 'Modern Agricultural Excellence',
    primary_color: '#4A6B5D',
    logo: '/industries/Savana Farming PLC (Raya, Tigray)/Savana Farming PLC (Raya, Tigray) .svg',
    introduction: 'Full-scale agro-industry enterprise producing papaya, bananas, vegetables, millet, corn, beans using modern farming technologies.',
    full_description: `Savana Farming PLC is a full-scale agro-industry enterprise based in Raya, Tigray. The company produces papaya, bananas, vegetables, millet, corn, beans, and other crops using modern farming technologies and best agronomic practices.

Our state-of-the-art farming operations combine traditional knowledge with modern technology to achieve optimal yields while maintaining sustainable agricultural practices that benefit both the environment and local communities.`,
    gallery: [
      '/industries/Savana Farming PLC (Raya, Tigray)/30 (2).jpg',
      '/industries/Savana Farming PLC (Raya, Tigray)/31.jpg',
      '/industries/Savana Farming PLC (Raya, Tigray)/32.jpg',
      '/industries/Savana Farming PLC (Raya, Tigray)/33.jpg',
      '/industries/Savana Farming PLC (Raya, Tigray)/34.jpg',
      '/industries/Savana Farming PLC (Raya, Tigray)/35.jpg',
      '/industries/Savana Farming PLC (Raya, Tigray)/36.jpg',
    ],
    location: 'Raya, Tigray',
    project_count: 7,
    subsidiary_count: 1,
    sort: 10,
  },
  {
    id: '11',
    name: 'Djibouti Free Zone Services',
    slug: 'djibouti-free-zone',
    code: 'DFZ',
    tagline: 'Strategic Trade & Logistics Hub',
    primary_color: '#5C5752',
    logo: '/industries/Djibouti Free Zone – Trade & Logistics Services/Djibouti Free Zone – Trade & Logistics Services.svg',
    introduction: 'Strategic trade, logistics, and facilitation hub providing warehousing, customs facilitation, and transit handling services.',
    full_description: `ZG Business Group operates a presence in the Djibouti Free Zone, serving as a strategic trade, logistics, and facilitation hub for the Group and third-party merchants.

Through this platform, the Group provides efficient warehousing, customs facilitation, transit handling, and trade support services to its own operations as well as to multiple domestic and international merchants, enhancing regional trade efficiency and supply chain reliability.`,
    gallery: [
      '/industries/Djibouti Free Zone – Trade & Logistics Services/37.jpg',
    ],
    location: 'Djibouti Free Zone',
    project_count: 3,
    subsidiary_count: 1,
    sort: 11,
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
// Partner Logos
// ─────────────────────────────────────────────────

export const partnerLogos = [
  {
    name: 'Famsun',
    slug: 'famsun',
    logo: '/partner logos/Famsun.png',
  },
  {
    name: 'Corbus',
    slug: 'corbus',
    logo: '/partner logos/Corbus.png',
  },
  {
    name: 'Orkide',
    slug: 'orkide',
    logo: '/partner logos/Orkide.png',
  },
  {
    name: 'Fondazione Enrico Mattei',
    slug: 'fondazione-mattei',
    logo: '/partner logos/FONDAZIONE SOCIAL ECONOMIIC DEVELOPMENT ENRICO MATTEI.PNG',
  },
  {
    name: 'Partner',
    slug: 'partner-1',
    logo: '/partner logos/IMG_8714.PNG',
  },
  {
    name: 'Partner',
    slug: 'partner-2',
    logo: '/partner logos/IMG_8967.JPG',
  },
  {
    name: 'Partner',
    slug: 'partner-3',
    logo: '/partner logos/IMG_8971.JPG',
  },
  {
    name: 'Partner',
    slug: 'partner-4',
    logo: '/partner logos/IMG_8972.PNG',
  },
  {
    name: 'Partner',
    slug: 'partner-5',
    logo: '/partner logos/IMG_8973.PNG',
  },
  {
    name: 'Partner',
    slug: 'partner-6',
    logo: '/partner logos/IMG_8975.JPG',
  },
];

// ─────────────────────────────────────────────────
// Stats for Legacy Bar
// ─────────────────────────────────────────────────

export const companyStats = [
  { label: 'Years of Operation', value: 17, suffix: '' },
  { label: 'Industries', value: 11, suffix: '' },
  { label: 'Employees', value: 5000, suffix: '+' },
  { label: 'Projects Completed', value: 100, suffix: '+' },
];

// ─────────────────────────────────────────────────
// Founder Quote
// ─────────────────────────────────────────────────

export const founderQuote = {
  text: "We don't just build structures—we build communities. Every project is an investment in Ethiopian futures.",
  author: 'Dr. Zeru Gebrelibanos Asefa',
  title: 'Co-Founder & CEO',
};

// ─────────────────────────────────────────────────
// Subsidiary Companies
// ─────────────────────────────────────────────────

export const subsidiaryCompanies = [
  {
    id: '1',
    name: 'Zeru Gebrelibanos Import & Export',
    slug: 'zeru-gebrelibanos-import-export',
    sector: 'Import & Export',
    sectorSlug: 'zeru-gebrelibanos-import-export',
    established: 2008,
    description: 'Core trading arm engaged in importation of construction materials and export of agricultural products and livestock.',
    employeeCount: 500,
    location: 'Ethiopia',
  },
  {
    id: '2',
    name: 'ZG Agro-Industry (Raya)',
    slug: 'zg-agro-industry-raya',
    sector: 'Agro-Industry',
    sectorSlug: 'zg-agro-industry-raya',
    established: 2010,
    description: 'Large-scale commercial farming in Raya, Tigray with modern agricultural practices.',
    employeeCount: 800,
    location: 'Raya, Tigray',
  },
  {
    id: '3',
    name: 'ZG Manufacturing',
    slug: 'zg-manufacturing',
    sector: 'Manufacturing',
    sectorSlug: 'zg-manufacturing',
    established: 2015,
    description: 'Industrial value-addition including edible oil production factory in Adigudem City.',
    employeeCount: 400,
    location: 'Adigudem City, Tigray',
  },
  {
    id: '4',
    name: 'ZG Real Estate (Mekelle)',
    slug: 'zg-real-estate-mekelle',
    sector: 'Real Estate',
    sectorSlug: 'zg-real-estate-mekelle',
    established: 2014,
    description: 'Large-scale residential apartment project covering approximately 10 hectares in Mekelle City.',
    employeeCount: 350,
    location: 'Mekelle City',
  },
  {
    id: '5',
    name: 'ZS Construction',
    slug: 'zs-construction',
    sector: 'Construction',
    sectorSlug: 'zs-construction',
    established: 2012,
    description: 'Comprehensive construction and infrastructure services across multiple locations.',
    employeeCount: 1200,
    location: 'Multiple Locations',
  },
  {
    id: '6',
    name: 'Warka Trading',
    slug: 'warka-trading',
    sector: 'Trading',
    sectorSlug: 'warka-trading',
    established: 2010,
    description: 'Domestic and international commodity trade, importing wheat, sugar, edible oil and exporting coffee and sesame.',
    employeeCount: 300,
    location: 'Ethiopia',
  },
  {
    id: '7',
    name: 'Mayweni PLC',
    slug: 'mayweni-plc',
    sector: 'Construction Materials',
    sectorSlug: 'mayweni-plc',
    established: 2013,
    description: 'Gravel and aggregate production supplying high-quality construction materials.',
    employeeCount: 250,
    location: 'Multiple Locations',
  },
  {
    id: '8',
    name: 'Northern Star Hotel & Tourism',
    slug: 'northern-star-hotel',
    sector: 'Hospitality',
    sectorSlug: 'northern-star-hotel',
    established: 2016,
    description: '4-star hospitality facility providing high-quality accommodation and conferencing services.',
    employeeCount: 200,
    location: 'Mekelle, Tigray',
  },
  {
    id: '9',
    name: 'Raie Agro-Industry',
    slug: 'raie-agro-industry',
    sector: 'Agro-Industry',
    sectorSlug: 'raie-agro-industry',
    established: 2014,
    description: 'Large-scale commercial farming in Gambela producing sesame, vegetables, and grains.',
    employeeCount: 600,
    location: 'Gambela Region',
  },
  {
    id: '10',
    name: 'Savana Farming PLC',
    slug: 'savana-farming-plc',
    sector: 'Agro-Industry',
    sectorSlug: 'savana-farming-plc',
    established: 2013,
    description: 'Full-scale agro-industry producing fruits, vegetables, and grains using modern technologies.',
    employeeCount: 700,
    location: 'Raya, Tigray',
  },
  {
    id: '11',
    name: 'Djibouti Free Zone Services',
    slug: 'djibouti-free-zone',
    sector: 'Trade & Logistics',
    sectorSlug: 'djibouti-free-zone',
    established: 2018,
    description: 'Strategic trade and logistics hub providing warehousing, customs facilitation, and transit services.',
    employeeCount: 150,
    location: 'Djibouti Free Zone',
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
