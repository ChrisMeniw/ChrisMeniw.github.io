/* Spark — service worker v4: NETWORK-FIRST.
   La v3 era cache-first y dejaba a los usuarios clavados en versiones viejas
   (causa raíz de "sigue igual que antes" tras cada deploy). Ahora siempre
   intenta la red y solo usa el caché sin conexión. */
const CACHE = 'spark-v4';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon.svg', './icon-maskable.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => k === CACHE ? null : caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
