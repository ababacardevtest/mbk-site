import { promises as fs } from 'fs';
import path from 'path';
import { scryptSync, randomBytes, randomUUID, timingSafeEqual } from 'crypto';

type Stored = { salt: string; hash: string };
const FILE = path.join(process.cwd(), 'data', 'admin.json');
const PREFIX = 'private/admin-';
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

const hashOf = (pw: string, salt: string) => scryptSync(pw, salt, 32).toString('hex');
const same = (a: string, b: string) => {
  const A = Buffer.from(a), B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
};

async function readStored(): Promise<Stored | null> {
  try {
    if (useBlob) {
      const { list } = await import('@vercel/blob');
      const { blobs } = await list({ prefix: PREFIX });
      const last = blobs.sort((x, y) => +new Date(y.uploadedAt) - +new Date(x.uploadedAt))[0];
      if (!last) return null;
      return await (await fetch(last.url, { cache: 'no-store' })).json();
    }
    return JSON.parse(await fs.readFile(FILE, 'utf8'));
  } catch {
    return null;
  }
}

export async function setPassword(pw: string) {
  const salt = randomBytes(16).toString('hex');
  const body = JSON.stringify({ salt, hash: hashOf(pw, salt) });
  if (useBlob) {
    const { put, list, del } = await import('@vercel/blob');
    const old = (await list({ prefix: PREFIX })).blobs.map((b) => b.url);
    await put(`${PREFIX}${randomUUID()}.json`, body, { access: 'public', addRandomSuffix: false, contentType: 'application/json' });
    if (old.length) await del(old);
    return;
  }
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, body);
}

// Accepte le code choisi par la gérante, ou le code de secours ADMIN_PASSWORD (variable d'environnement).
export async function isAdmin(req: Request): Promise<boolean> {
  const pw = req.headers.get('x-admin-password') ?? '';
  if (!pw) return false;
  const env = process.env.ADMIN_PASSWORD;
  if (env && same(pw, env)) return true;
  const s = await readStored();
  return !!s && same(hashOf(pw, s.salt), s.hash);
}
