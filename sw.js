const CACHE_NAME = 'repertorio-v1';
const urlsToCache = [
  './',
  './index.html',
  './bastidores.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('script.google.com')) return; // Deixa os dados com o app
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});