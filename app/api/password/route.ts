import { isAdmin, setPassword } from '@/lib/auth';

export async function POST(req: Request) {
  if (!(await isAdmin(req))) return Response.json({ error: 'Non autorisé' }, { status: 401 });
  const { next } = await req.json();
  if (typeof next !== 'string' || next.length < 6 || next.length > 64) {
    return Response.json({ error: 'Le code doit contenir entre 6 et 64 caractères' }, { status: 400 });
  }
  await setPassword(next);
  return Response.json({ ok: true });
}
