import { Metadata } from 'next';
import NewsPageClient from './NewsPageClient';

export const metadata: Metadata = {
  title: 'News & Insights',
  description: 'Stay updated with the latest news, announcements, and insights from ZG Business Group.',
};

export default function NewsPage() {
  return <NewsPageClient />;
}
