/* Caja MXN — Service Worker (offline) */
const CACHE = 'cajamxn-v16';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './lib/chart.umd.js',
  './lib/jspdf.umd.min.js',
  './lib/jspdf.plugin.autotable.min.js'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  // Navegaciones: intenta red, cae a index.html cacheado (app offline)
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).catch(() => caches.match('./index.html')));
    return;
  }
  // Resto: cache-first, luego red (y guarda copia propia del mismo origen)
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      try {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
      } catch (_) {}
      return res;
    }).catch(() => hit))
  );
});
