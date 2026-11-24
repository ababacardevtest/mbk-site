import { saveImage } from '@/lib/store';
import { isAdmin } from '@/lib/auth';
export async function POST(req: Request) {
  if (!(await isAdmin(req))) return Response.json({ error: 'Non autorisé' }, { status: 401 });
  const file = (await req.formData()).get('file');
  if (!(file instanceof File) || !file.type.startsWith('image/')) return Response.json({ error: 'Image requise' }, { status: 400 });
  if (file.size > 6 * 1024 * 1024) return Response.json({ error: 'Image trop lourde (6 Mo max)' }, { status: 400 });
  return Response.json({ url: await saveImage(file) });
}
