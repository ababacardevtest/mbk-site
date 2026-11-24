import { isAdmin } from '@/lib/auth';
export async function GET(req: Request) {
  return (await isAdmin(req)) ? Response.json({ ok: true }) : Response.json({ ok: false }, { status: 401 });
}
