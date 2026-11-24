import { getContent, saveContent } from '@/lib/store';
import { isAdmin } from '@/lib/auth';
import type { Content } from '@/lib/types';
import { revalidatePath } from 'next/cache';
export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(await getContent());
}
export async function PUT(req: Request) {
  if (!(await isAdmin(req))) return Response.json({ error: 'Non autorisé' }, { status: 401 });
  const c: Content = await req.json();
  if (!c?.business || !Array.isArray(c.services) || !Array.isArray(c.transport)) {
    return Response.json({ error: 'Données invalides' }, { status: 400 });
  }
  await saveContent(c);
  revalidatePath('/');
  return Response.json({ ok: true });
}
