const V = 'kmb-v1';
const PAGES = V + '-pages';
const ASSETS = V + '-assets';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(PAGES).then((c) => c.add('/offline')));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => !k.startsWith(V)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin || url.pathname.startsWith('/api/')) return;

  // Pages : réseau d'abord (contenu toujours à jour), sinon copie en cache, sinon page hors ligne
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) { const copy = res.clone(); caches.open(PAGES).then((c) => c.put(req, copy)); }
          return res;
        })
        .catch(async () => (await caches.match(req)) || (await caches.match('/offline'))),
    );
    return;
  }

  // Fichiers statiques et images : cache d'abord, mis à jour en arrière-plan
  if (/^\/(_next\/static|uploads|pwa-icon)\//.test(url.pathname) || /\.(png|jpe?g|webp|svg|woff2?)$/.test(url.pathname)) {
    e.respondWith(
      caches.open(ASSETS).then(async (c) => {
        const hit = await c.match(req);
        const net = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      }),
    );
  }
});
