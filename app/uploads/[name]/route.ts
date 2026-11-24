import { readLocalImage } from '@/lib/store';
const types: Record<string, string> = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif' };
export async function GET(_: Request, { params }: { params: { name: string } }) {
  try {
    const buf = await readLocalImage(params.name);
    const ext = params.name.split('.').pop().toLowerCase();
    return new Response(buf, { headers: { 'Content-Type': types[ext] || 'image/jpeg', 'Cache-Control': 'public, max-age=31536000, immutable' } });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
