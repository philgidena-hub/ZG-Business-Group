'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Container, Heading, Text } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  publish_date: string;
  author?: string;
  read_time?: number;
  featured_image?: string;
}

// =====================================================
// News Article Detail Page
// Individual article view
// =====================================================

const articleImages: Record<string, string> = {
  'hospitality-division-expansion': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
  'riverside-heights-phase-2': 'https://images.unsplash.com/photo-1590579491624-f98f36d4c763?w=1200&q=80',
  'future-ethiopian-agriculture': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&q=80',
};

// Extended article content for detail pages
const articleContent: Record<string, { content: string[]; author: string; readTime: string }> = {
  'hospitality-division-expansion': {
    author: 'ZG Communications Team',
    readTime: '5 min read',
    content: [
      'ZG Business Group is pleased to announce a strategic expansion into the hospitality sector with the development of two new hotel properties in Addis Ababa and Hawassa, marking a significant milestone in our diversification strategy.',
      'The Addis Ababa property, located in the heart of the Bole district, will feature 200 rooms with world-class amenities designed to serve both business travelers and tourists. The development represents an investment of over $50 million and is expected to create more than 300 permanent jobs upon completion.',
      'Our second property in Hawassa will be positioned along the scenic lakefront, offering 150 rooms with stunning views of Lake Hawassa. This resort-style development will cater to the growing domestic and international tourism market in the Southern Nations region.',
      '"This expansion represents our commitment to contributing to Ethiopia\'s emergence as a premier destination in East Africa," said the Group CEO. "We believe that quality hospitality infrastructure is essential for the country\'s economic development and tourism potential."',
      'Both properties are being designed with sustainability in mind, incorporating solar energy systems, water recycling facilities, and locally-sourced construction materials. We are working with leading international hospitality consultants to ensure our properties meet global standards while celebrating Ethiopian culture and craftsmanship.',
      'Construction is scheduled to begin in Q1 2025, with the Addis Ababa property expected to open in 2027 and the Hawassa resort in 2028.',
    ],
  },
  'riverside-heights-phase-2': {
    author: 'Project Development Team',
    readTime: '4 min read',
    content: [
      'We are proud to announce that Riverside Heights Phase 2 has reached structural completion, marking a major milestone in our flagship residential development project in the Yeka sub-city of Addis Ababa.',
      'This achievement comes just 18 months after breaking ground, demonstrating our commitment to timely delivery and construction excellence. The phase comprises three residential towers offering a total of 240 modern apartments ranging from studios to four-bedroom penthouses.',
      'The development features state-of-the-art amenities including a rooftop swimming pool, fitness center, children\'s play areas, underground parking for 300 vehicles, and 24/7 security with smart access systems.',
      '"Reaching structural completion on schedule is a testament to the dedication of our construction teams and the strength of our project management capabilities," noted the Project Director. "We are now focused on interior finishing work and expect to begin handovers to homeowners in Q3 2025."',
      'Riverside Heights has been designed to create a true community living experience, with landscaped gardens, walking paths, and dedicated commercial spaces on the ground floors that will house essential services for residents.',
      'Phase 1, which was completed in 2023, has seen strong demand with over 95% occupancy, reflecting the quality and desirability of the development. Phase 3 planning is underway with an announcement expected later this year.',
    ],
  },
  'future-ethiopian-agriculture': {
    author: 'Dr. Alemayehu Bekele, Head of Agro-Industry',
    readTime: '7 min read',
    content: [
      'Ethiopia stands at a pivotal moment in its agricultural development. With over 80% of the population engaged in farming and agriculture contributing nearly 40% of GDP, the sector\'s transformation is essential for the nation\'s economic future.',
      'At ZG Business Group, we believe that the integration of modern farming practices with Ethiopia\'s rich agricultural heritage offers unprecedented opportunities for growth, job creation, and improved food security.',
      'Our agro-industry division has been at the forefront of introducing precision agriculture techniques to Ethiopian farming. Through partnerships with smallholder cooperatives, we have helped increase yields by an average of 40% while reducing water usage by 25%.',
      'Coffee, Ethiopia\'s most valuable agricultural export, remains a key focus. Our processing facilities in Sidama and Yirgacheffe employ cutting-edge techniques that preserve the unique flavor profiles that make Ethiopian coffee world-renowned. We have invested heavily in direct relationships with farming communities, ensuring fair prices and sustainable practices.',
      'Looking ahead, we see tremendous potential in several areas: expansion of sesame and Niger seed production for the global health food market; development of floriculture for European markets; and value-added processing of grains and pulses for domestic consumption and export.',
      'Technology will play a crucial role in this transformation. We are piloting drone-based crop monitoring, mobile-based extension services for farmers, and blockchain-enabled traceability systems that allow consumers worldwide to trace their food back to the Ethiopian farm where it was grown.',
      'The challenges are significant—climate change, infrastructure limitations, and the need for skills development among farming communities. But with strategic investment and a commitment to sustainability, Ethiopian agriculture can become a model for the continent.',
    ],
  },
};

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/news`);
        const data = await res.json();
        const articles: NewsItem[] = data.data || [];
        const currentArticle = articles.find(a => a.slug === slug);
        setArticle(currentArticle || null);

        // Get related articles (same category, exclude current)
        if (currentArticle) {
          let related = articles
            .filter(a => a.category === currentArticle.category && a.slug !== slug)
            .slice(0, 2);

          // If not enough related, add other articles
          if (related.length < 2) {
            const otherArticles = articles
              .filter(a => a.slug !== slug && !related.some(r => r.id === a.id))
              .slice(0, 2 - related.length);
            related = [...related, ...otherArticles];
          }
          setRelatedArticles(related);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  const image = articleImages[slug] || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80';

  // Use CMS content if available, otherwise fall back to hardcoded content
  const fallbackContent = articleContent[slug];
  const authorName = article?.author || fallbackContent?.author || 'ZG Communications';
  const readTime = article?.read_time ? `${article.read_time} min read` : (fallbackContent?.readTime || '3 min read');

  // Get content - prioritize CMS content, then fallback to hardcoded
  const articleBody = article?.content || (fallbackContent?.content?.join('\n\n')) || article?.excerpt || 'Article content coming soon.';

  if (loading) {
    return (
      <main className="pt-32 pb-20 min-h-screen bg-paper-white">
        <Container>
          <Text size="lg" color="muted">Loading article...</Text>
        </Container>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="pt-32 pb-20 min-h-screen bg-paper-white">
        <Container>
          <Heading as="h1" size="h1" className="mb-4">Article Not Found</Heading>
          <Text size="lg" color="muted" className="mb-8">
            The article you're looking for doesn't exist.
          </Text>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-highland-gold hover:underline"
          >
            ← Back to News
          </Link>
        </Container>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-paper-white">
        <Container>
          <FadeIn>
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-neutral-500 hover:text-highland-gold mb-8 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to News
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center gap-4 mb-6">
              <span
                className="px-3 py-1.5 rounded-full text-xs font-medium text-white bg-highland-gold"
              >
                {article.category || 'News'}
              </span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-500 text-sm">
                {new Date(article.publish_date || '').toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-500 text-sm">{readTime}</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Heading as="h1" size="display-lg" className="mb-6 max-w-4xl">
              {article.title}
            </Heading>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Text size="lg" color="muted" className="max-w-3xl">
              {article.excerpt}
            </Text>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-neutral-200">
              <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center">
                <span className="text-lg font-medium text-neutral-600">
                  {authorName.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <span className="block font-medium">{authorName}</span>
                <span className="text-sm text-neutral-500">ZG Business Group</span>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <Container>
          <FadeIn delay={0.5}>
            <motion.div
              className="relative aspect-[21/9] rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={image}
                alt={article.title || 'Article'}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
          </FadeIn>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16 bg-paper-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="prose prose-lg max-w-none">
                {articleBody.split('\n\n').map((paragraph: string, index: number) => (
                  <p key={index} className="text-neutral-700 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>

            {/* Share Section */}
            <FadeIn delay={0.1}>
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 text-sm">Share this article</span>
                  <div className="flex items-center gap-4">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-highland-gold hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://zggroup.com/news/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-highland-gold hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a
                      href={`mailto:?subject=${encodeURIComponent(article.title || '')}&body=${encodeURIComponent(`Check out this article: https://zggroup.com/news/${slug}`)}`}
                      className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-highland-gold hover:text-white transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 md:py-28 bg-neutral-50">
          <Container>
            <FadeIn>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <Text size="caption" color="gold" className="uppercase tracking-wider mb-2">
                    Related Stories
                  </Text>
                  <Heading as="h2" size="h2">
                    Continue Reading
                  </Heading>
                </div>
                <Link
                  href="/news"
                  className="hidden md:inline-flex items-center gap-2 text-highland-gold hover:underline"
                >
                  View All News
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </FadeIn>

            <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((relArticle) => (
                <FadeInStaggerItem key={relArticle.id}>
                  <Link
                    href={`/news/${relArticle.slug}`}
                    className="group block rounded-2xl overflow-hidden bg-white border border-neutral-200 hover:border-highland-gold/30 hover:shadow-xl transition-all duration-500"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={articleImages[relArticle.slug!] || image}
                        alt={relArticle.title || 'Article'}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute top-4 left-4">
                        <span
                          className="px-3 py-1.5 rounded-full text-xs font-medium text-white bg-highland-gold"
                        >
                          {relArticle.category || 'News'}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-neutral-500 mb-2 block">
                        {new Date(relArticle.publish_date || '').toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                      <Heading as="h3" size="h4" className="mb-2 group-hover:text-highland-gold transition-colors">
                        {relArticle.title}
                      </Heading>
                      <Text size="sm" color="muted" className="line-clamp-2">
                        {relArticle.excerpt}
                      </Text>
                    </div>
                  </Link>
                </FadeInStaggerItem>
              ))}
            </FadeInStagger>
          </Container>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 md:py-28 bg-earth-anchor">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <Heading as="h2" size="h2" color="white" className="mb-6">
                Stay Informed
              </Heading>
              <Text size="lg" color="white" className="opacity-80 mb-8">
                Subscribe to our newsletter for the latest news, project updates,
                and insights from ZG Business Group.
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-highland-gold"
                />
                <button className="px-6 py-3 bg-highland-gold text-earth-anchor font-medium rounded-lg hover:bg-highland-gold/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </main>
  );
}
