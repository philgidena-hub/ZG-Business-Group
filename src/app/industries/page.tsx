import { Metadata } from 'next';
import IndustriesPageClient from './IndustriesPageClient';

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Explore the 10 industries where ZG Business Group operates, from import & export to hospitality and social development.',
};

export default function IndustriesPage() {
  return <IndustriesPageClient />;
}
