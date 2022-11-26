// const STATIC_CACHE_NAME = "s-version-2";
// const DYNAMIC_CACHE_NAME = "d-version-1";
// const urlsToCache = ["index.html", "offline.html"];
// const self = this;

// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// self.addEventListener("message", (event) => {
//     if (event.data && event.data.type === "SKIP_WAITING") {
//         self.skipWaiting();
//     }
// });

// workbox.routing.registerRoute(
//     new RegExp('/*'),
//     new workbox.strategies.StaleWhileRevalidate({
//         cacheName: CACHE_NAME
//     })
// );

// self.addEventListener("install", (event) => {
//     event.waitUntil(
//         caches.open(STATIC_CACHE_NAME).then((cache) => {
//         console.log("Opened cache");

//         return cache.addAll(urlsToCache);
//         })
//     );
// });

// self.addEventListener("fetch", (event) => {
//     event.respondWith(
//         caches.match(event.request).then((res) => {
//         return fetch(event.request).catch(() => caches.match("offline.html"));
//         })
//     );
// });

// self.addEventListener("activate", (event) => {
//     const cacheWhitelist = [];
//     cacheWhitelist.push(STATIC_CACHE_NAME);
//     event.waitUntil(
//         caches.keys().then((cacheNames) => Promise.all(
//             cacheNames.map((cacheName) => {
//                 if(!cacheWhitelist.includes(cacheName)){
//                     return caches.delete(cacheName);
//                 }
//             })
//         ))
//     )
// });



//==============================================

const staticCacheName = 's-app-v3'
const dynamicCacheName = 'd-app-v3'

const assetUrls = [
  'index.html',
  'offline.html'
]

self.addEventListener('install', async event => {
  const cache = await caches.open(staticCacheName)
  await cache.addAll(assetUrls)
})

self.addEventListener('activate', async event => {
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', event => {
  const {request} = event

  const url = new URL(request.url)
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }
})


async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await cache.match(request)
    return cached ?? await caches.match('/offline.html')
  }
}