import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Espace gérante – Keer Maam Birabar',
  manifest: '/api/manifest/admin',
  robots: { index: false, follow: false },
  icons: { icon: '/icons/admin-192.png', apple: '/icons/admin-192.png' },
  appleWebApp: { capable: true, title: 'Mon site', statusBarStyle: 'default' },
};
export const viewport: Viewport = { themeColor: '#4B2E1E' };

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
