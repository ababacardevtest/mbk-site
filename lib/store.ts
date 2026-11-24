import { promises as fs } from 'fs';
import path from 'path';
import { defaultContent } from './defaultContent';
import type { Content } from './types';

const DATA = path.join(process.cwd(), 'data');
const FILE = path.join(DATA, 'content.json');
const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;

const merge = (saved: Partial<Content>): Content => ({
  ...defaultContent,
  ...saved,
  business: { ...defaultContent.business, ...saved.business },
});

export async function getContent(): Promise<Content> {
  try {
    if (useBlob) {
      const { list } = await import('@vercel/blob');
      const { blobs } = await list({ prefix: 'content.json' });
      if (!blobs[0]) return defaultContent;
      const r = await fetch(blobs[0].url, { cache: 'no-store' });
      return merge(await r.json());
    }
    return merge(JSON.parse(await fs.readFile(FILE, 'utf8')));
  } catch {
    return defaultContent;
  }
}

export async function saveContent(c: Content) {
  const body = JSON.stringify(c, null, 2);
  if (useBlob) {
    const { put } = await import('@vercel/blob');
    await put('content.json', body, { access: 'public', addRandomSuffix: false, contentType: 'application/json' });
    return;
  }
  await fs.mkdir(DATA, { recursive: true });
  await fs.writeFile(FILE, body);
}

export async function saveImage(file: File): Promise<string> {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 5);
  const name = `img-${Date.now()}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  if (useBlob) {
    const { put } = await import('@vercel/blob');
    const b = await put('uploads/' + name, buf, { access: 'public', contentType: file.type });
    return b.url;
  }
  await fs.mkdir(path.join(DATA, 'uploads'), { recursive: true });
  await fs.writeFile(path.join(DATA, 'uploads', name), buf);
  return '/uploads/' + name;
}

export async function readLocalImage(name: string) {
  return fs.readFile(path.join(DATA, 'uploads', path.basename(name)));
}

