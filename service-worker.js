const CACHE_NAME = 'kanji-go-cache-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/main.js',
  '/src/App.svelte',
  '/src/styles/global.css',
  '/src/data/kana.js',
  '/src/data/vocabulary.js',
  '/locales/en.json',
  '/locales/zh-TW.json',
  '/public/assets/icons/icon-192x192.png',
  '/public/assets/icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
