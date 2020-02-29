var CACHE_NAME = 'starwars-pwa-cache-v1';
var urlsToCache = [
    '/manifest.json',
    '/images/code.png',
    '/static/css'
];
self.addEventListener('install', function (event) {
    console.log("install starts");
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                // Open a cache and cache our files
                return cache.addAll(urlsToCache);
            }).then(
                console.log("caching starts"))
    );
});


self.addEventListener('activate', function (event) {

    var cacheWhitelist = ['workbox-precache-v2'];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log("deleted cache")
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});