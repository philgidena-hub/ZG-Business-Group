# ZG Business Group - Corporate Website

AWWWARDS-level corporate website for ZG Business Group, Ethiopia's premier diversified enterprise.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **CMS**: Directus
- **Deployment**: Vercel
- **Language**: TypeScript

## Features

- 🎨 AWWWARDS-inspired design with premium animations
- 🖼️ Oliver Larose-style zoom parallax effects
- 📱 Fully responsive with mobile-optimized components
- ⚡ Optimized images (98% size reduction)
- 🎭 Custom CookConthic display font
- 🌐 Infinite scrolling partner logos marquee
- 🎬 Smooth scroll animations and transitions
- ♿ Accessibility-focused (WCAG compliant)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/philgidena-hub/ZG-Business-Group.git
cd ZG-Business-Group
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your Directus CMS URL:
```env
NEXT_PUBLIC_DIRECTUS_URL=http://your-directus-url:8055
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run optimize-images` - Optimize images in public folder

## Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Configure environment variables:
   - `NEXT_PUBLIC_DIRECTUS_URL`: Your Directus CMS URL
   - `NEXT_PUBLIC_SITE_URL`: Your production domain
5. Deploy

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_DIRECTUS_URL` | Directus CMS endpoint | `http://52.29.229.59:8055` |
| `NEXT_PUBLIC_SITE_URL` | Production site URL | `https://zggroup.com` |

## Project Structure

```
frontend/
├── public/
│   ├── fonts/              # Custom fonts (CookConthic)
│   ├── images/             # Static images
│   │   ├── optimized/      # Optimized WebP images
│   │   └── parallax/       # Parallax section images
│   └── partner logos/      # Partner/affiliate logos
├── scripts/
│   └── optimize-images.js  # Image optimization script
├── src/
│   ├── app/                # Next.js app router pages
│   ├── components/         # React components
│   │   ├── layout/         # Header, Footer, Navigation
│   │   ├── motion/         # Animation components
│   │   ├── sections/       # Page sections
│   │   └── ui/             # UI components
│   ├── lib/                # Utilities and configurations
│   │   ├── directus.ts     # Directus CMS integration
│   │   ├── fonts.ts        # Font configurations
│   │   └── mock-data.ts    # Mock data for development
│   ├── styles/             # Global styles
│   └── types/              # TypeScript types
└── tailwind.config.ts      # Tailwind configuration
```

## Design System

### Colors
- **Earth Anchor**: `#1A1814` - Primary dark
- **Highland Gold**: `#C4A035` - Primary accent
- **Paper White**: `#FAF8F5` - Primary light

### Typography
- **Body**: Inter (Google Font)
- **Display**: CookConthic (Custom)

### Animation Philosophy
- Smooth, purposeful transitions
- Spring physics for natural movement
- Parallax effects for depth
- Scroll-triggered reveals

## Performance

- Lighthouse Score: 95+ (Performance)
- Image optimization: 98% size reduction (57MB → 1.13MB)
- Code splitting with Next.js dynamic imports
- Lazy loading for images and components

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Proprietary - ZG Business Group © 2024

## Contact

For questions or support, contact: info@zggroup.com
