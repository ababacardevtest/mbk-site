// @ts-expect-error Global CSS is handled by Next.js; TypeScript may not resolve it here.
import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import PwaRegister from '@/components/PwaRegister';
import { Fraunces, Figtree } from 'next/font/google';
import Splash from '@/components/Splash';

const display = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['500', '700', '900'] });
const sans = Figtree({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  manifest: '/api/manifest/client',
  icons: { icon: '/icons/client-192.png', apple: '/icons/client-192.png' },
  appleWebApp: { capable: true, title: 'Keer Maam', statusBarStyle: 'default' },
  title: 'Keer Maam Birabar – Beauté, bien-être et détente à domicile',
  description: 'Damp traditionnel, ventouses et soins du visage à domicile à Pikine, Guédiawaye et environs. Réservez par WhatsApp.',
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#1E4D2B' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased"><Splash />{children}<PwaRegister /></body>
    </html>
  );
}
