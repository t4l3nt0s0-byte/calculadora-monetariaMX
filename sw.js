/* Caja MXN — Service Worker (offline) · v17 robusto */
const CACHE = 'cajamxn-v20';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-180.png',
  './lib/chart.umd.js',
  './lib/jspdf.umd.min.js',
  './lib/jspdf.plugin.autotable.min.js',
];

// Instala: guarda cada archivo por separado (si uno falla, NO se cae todo)
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(CORE.map(u => c.add(u)))
    ).then(() => self.skipWaiting())
  );
});

// Activa: borra cachés viejas y toma control
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Responde offline
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Navegación (abrir la app): sirve el index guardado; si hay red, lo actualiza
  if (req.mode === 'navigate') {
    e.respondWith(
      caches.match('./index.html').then(cached =>
        cached ||
        fetch(req).then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put('./index.html', copy)).catch(() => {});
          return res;
        }).catch(() => caches.match('./index.html'))
      )
    );
    return;
  }

  // Recursos (lib, iconos, etc.): primero caché, si no, red y se guarda copia
  e.respondWith(
    caches.match(req).then(hit =>
      hit ||
      fetch(req).then(res => {
        try {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          }
        } catch (_) {}
        return res;
      }).catch(() => hit)
    )
  );
});
