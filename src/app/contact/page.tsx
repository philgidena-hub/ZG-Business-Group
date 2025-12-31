import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import { getSiteSettings } from '@/lib/directus';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with ZG Business Group for partnership, investment opportunities, or general inquiries.',
};

export const revalidate = 60;

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <ContactPageClient
      contactInfo={{
        address: settings?.address,
        phone: settings?.contact_phone,
        email: settings?.contact_email,
        linkedin: settings?.social_linkedin,
        twitter: settings?.social_twitter,
        facebook: settings?.social_facebook,
      }}
    />
  );
}
