import { redirect } from 'next/navigation';

// =====================================================
// Companies Page - Redirects to Industries
// The industries page now shows all companies
// =====================================================

export default function CompaniesPage() {
  redirect('/industries');
}
