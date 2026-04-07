const CACHE_NAME = 'repertorio-v2'; // <--- A MÁGICA ESTÁ AQUI (Versão 2)
const urlsToCache = [
  './',
  './index.html',
  './bastidores.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Força a instalação imediata
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// A FAXINA: Apaga a versão v1 antiga do celular da galera
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.includes('script.google.com')) return; 
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});