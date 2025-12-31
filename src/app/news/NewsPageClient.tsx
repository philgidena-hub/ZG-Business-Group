'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Container, Section, Heading, Text, AccentLine } from '@/components/ui';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '@/components/motion';
import { formatDate } from '@/lib/utils';

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publish_date: string;
  is_featured: boolean;
}

export default function NewsPageClient() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/items/news`);
        const data = await res.json();
        setNews(data.data || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-earth-anchor">
        <Container>
          <FadeIn>
            <Text size="caption" color="gold" className="uppercase tracking-wider mb-4">
              News & Insights
            </Text>
            <AccentLine size="lg" className="mb-8" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <Heading as="h1" size="display-lg" color="white" className="max-w-4xl">
              Latest Updates
            </Heading>
          </FadeIn>

          <FadeIn delay={0.4}>
            <Text size="lg" color="white" className="mt-6 max-w-2xl opacity-80">
              Stay informed about our latest projects, partnerships, and insights from across our industries.
            </Text>
          </FadeIn>
        </Container>
      </section>

      {/* Categories Filter */}
      <Section size="sm" background="neutral">
        <FadeIn>
          <div className="flex flex-wrap gap-3 justify-center">
            {['All', 'Announcements', 'Project Updates', 'Insights', 'Press'].map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full text-sm font-medium border border-neutral-300 hover:border-highland-gold hover:text-highland-gold transition-colors bg-paper-white"
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>
      </Section>

      {/* News Grid */}
      <Section size="lg">
        {loading ? (
          <div className="text-center py-12">
            <Text color="muted">Loading news...</Text>
          </div>
        ) : (
          <FadeInStagger stagger={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((article) => (
              <FadeInStaggerItem key={article.id}>
                <NewsListCard
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category || 'News'}
                  date={article.publish_date ? formatDate(article.publish_date) : ''}
                  slug={article.slug}
                />
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>
        )}

        {/* Load More */}
        <FadeIn delay={0.5} className="mt-12 text-center">
          <button className="px-8 py-3 border border-earth-anchor text-earth-anchor font-medium rounded hover:bg-earth-anchor hover:text-paper-white transition-colors">
            Load More Articles
          </button>
        </FadeIn>
      </Section>

      {/* Newsletter Section */}
      <Section size="lg" background="earth">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <Heading as="h2" size="h2" color="white" className="mb-4">
              Stay Informed
            </Heading>
            <Text size="lg" color="white" className="opacity-80 mb-8">
              Subscribe to our newsletter for the latest news and insights from ZG Business Group.
            </Text>
          </FadeIn>

          <FadeIn delay={0.2}>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded bg-paper-white/10 border border-paper-white/20 text-paper-white placeholder:text-paper-white/50 focus:border-highland-gold focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-highland-gold text-earth-anchor font-medium rounded hover:bg-highland-gold/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}

interface NewsListCardProps {
  title: string;
  excerpt: string;
  category: string;
  categoryColor?: string;
  date: string;
  slug: string;
}

function NewsListCard({
  title,
  excerpt,
  category,
  categoryColor = '#C4A035',
  date,
  slug,
}: NewsListCardProps) {
  return (
    <Link
      href={`/news/${slug}`}
      className="group flex flex-col h-full bg-paper-white rounded-lg overflow-hidden border border-neutral-200 hover:border-neutral-300 hover:shadow-card transition-all duration-300"
    >
      {/* Image placeholder */}
      <div className="relative aspect-editorial bg-neutral-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-neutral-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: categoryColor }}
          >
            {category}
          </span>
          <span className="text-neutral-300">&bull;</span>
          <Text size="caption" color="muted">
            {date}
          </Text>
        </div>

        {/* Title */}
        <Heading
          as="h2"
          size="h4"
          className="mb-3 line-clamp-2 group-hover:text-highland-gold transition-colors duration-200"
        >
          {title}
        </Heading>

        {/* Excerpt */}
        <Text size="sm" color="muted" className="line-clamp-3 mb-4">
          {excerpt}
        </Text>

        {/* Read More */}
        <div className="mt-auto pt-4">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-earth-anchor group-hover:text-highland-gold transition-colors">
            Read article
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
