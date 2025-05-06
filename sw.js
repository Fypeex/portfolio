const CACHE   = 'offline-cache-v1';
const ASSETS  = [
    import.meta.env.BASE_URL,
    import.meta.env.BASE_URL + 'offline.html'
];

self.addEventListener('install', evt => {
    evt.waitUntil(caches.open(CACHE)
        .then(c=>c.addAll(ASSETS))
        .then(()=>self.skipWaiting()));
});

self.addEventListener('activate', evt => {
    evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
    const { request } = evt;
    const accept = request.headers.get('accept') || '';
    if (request.method === 'GET' &&
        (request.mode === 'navigate' || accept.includes('text/html'))) {
        evt.respondWith(
            fetch(request).catch(()=>caches.match(import.meta.env.BASE_URL + 'offline.html'))
        );
    }
});
