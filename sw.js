const BASE = '/portfolio/';
const CACHE = 'offline-cache-v1';
const ASSETS = [
    BASE,
    BASE + 'index.html',
    BASE + 'offline.html'
];

self.addEventListener('install', evt => {
    evt.waitUntil(
        caches
            .open(CACHE)
            .then(c => c.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', evt => {
    evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
    const req = evt.request;
    const accept = req.headers.get('accept') || '';
    if (
        req.method === 'GET' &&
        (req.mode === 'navigate' || accept.includes('text/html'))
    ) {
        evt.respondWith(
            fetch(req).catch(() => caches.match(BASE + 'offline.html'))
        );
    }
});
