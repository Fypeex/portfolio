const CACHE   = 'offline-cache-v1';
const ASSETS  = ['/', '/index.html', '/offline.html'];

self.addEventListener('install', evt => {
    evt.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate', evt => {
    evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
    if (evt.request.mode==='navigate') {
        evt.respondWith(fetch(evt.request).catch(()=>caches.match('/offline.html')));
    }
});
