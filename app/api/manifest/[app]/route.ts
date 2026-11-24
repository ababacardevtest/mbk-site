const base = { display: 'standalone', lang: 'fr', orientation: 'portrait' };
const icons = (v: string) => [
  { src: `/icons/${v}-192.png`, sizes: '192x192', type: 'image/png', purpose: 'any' },
  { src: `/icons/${v}-512.png`, sizes: '512x512', type: 'image/png', purpose: 'any' },
  { src: `/icons/${v}-maskable-512.png`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
];

export async function GET(_: Request, { params }: { params: { app: string } }) {
  const admin = params.app === 'admin';
  const manifest = admin
    ? { ...base, id: '/admin', name: 'Keer Maam – Espace gérante', short_name: 'Mon site', description: 'Modifier les soins, prix et photos du site.', start_url: '/admin', scope: '/admin', background_color: '#FBFAF4', theme_color: '#4B2E1E', icons: icons('admin') }
    : { ...base, id: '/', name: 'Keer Maam Birabar', short_name: 'Keer Maam', description: 'Beauté, bien-être et détente à domicile. Réservez par WhatsApp.', start_url: '/', scope: '/', background_color: '#FBFAF4', theme_color: '#1E4D2B', icons: icons('client') };
  return new Response(JSON.stringify(manifest), { headers: { 'Content-Type': 'application/manifest+json', 'Cache-Control': 'public, max-age=3600' } });
}
