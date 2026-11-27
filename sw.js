/* Little Explorers Quest: offline support. Network first (so updates arrive), cached copy when offline. */
const CACHE = "leq-v16";
const FILES = ["./","index.html","style.css","privacy.html","content/content.js","content/maths.js","content/reading.js","content/gk.js","content/geo.js","content/science.js","cloud-config.js","cloud.js","js/config.js","js/avatar-data.js","js/storage.js","js/helpers.js","js/screens.js","js/ch-phonics.js","js/ch-generated.js","js/ch-reading.js","js/ch-picture.js","js/grownup.js","js/start.js","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png"];
self.addEventListener("install", e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener("activate", e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch", e=>{
  const r = e.request, u = new URL(r.url);
  if(r.method!=="GET" || u.origin!==location.origin) return;
  e.respondWith(fetch(r, {cache:"no-cache"}).then(res=>{ const copy = res.clone(); caches.open(CACHE).then(c=>c.put(r, copy)); return res; }).catch(()=>caches.match(r).then(m=>m || caches.match("index.html"))));
});
