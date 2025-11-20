const CACHE = 'neuroedge-shell-v1';
const PRECACHE = ['/', '/index.html', '/src/main.jsx', '/src/index.css'];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', evt => evt.waitUntil(self.clients.claim()));

self.addEventListener('fetch', evt => {
  if (evt.request.method !== 'GET') return;
  evt.respondWith(caches.match(evt.request).then(cached => {
    if (cached) return cached;
    return fetch(evt.request).then(res => {
      if (evt.request.destination === 'image' || evt.request.url.includes('/icons/')){
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(evt.request, copy));
      }
      return res;
    }).catch(()=> caches.match('/index.html'));
  }));
});
