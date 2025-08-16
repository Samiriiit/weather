const CACHE_NAME = "weather-app-v1";
const urlsToCache = ["/", "/offline.html", "/favicon.ico"];

// Install static assets
self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then(async (cache) => {
        for (const url of urlsToCache) {
          try {
            await cache.add(url);
          } catch (err) {
            console.warn("Failed to cache:", url, err);
          }
        }
      })
    );
    self.skipWaiting();
  });
// Activate: cleanup old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: cache-first static + network-first API
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // For HTML pages → fallback offline
  if (request.destination === "document") {
    event.respondWith(
      fetch(request).catch(() => caches.match("/offline.html"))
    );
    return;
  }

  // For all other requests → try network, fallback to cache
  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        return response;
      })
      .catch(() => caches.match(request))
  );
});
