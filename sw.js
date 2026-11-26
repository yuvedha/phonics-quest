/* Little Explorers Quest: offline support. Network first (so updates arrive), cached copy when offline. */
const CACHE = "leq-v4";
const FILES = ["./","index.html","content.js","maths.js","reading.js","gk.js","geo.js","cloud-config.js","cloud.js","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png","icons/apple-touch-icon.png"];
self.addEventListener("install", e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())); });
self.addEventListener("activate", e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch", e=>{
  const r = e.request, u = new URL(r.url);
  if(r.method!=="GET" || u.origin!==location.origin) return;
  e.respondWith(fetch(r).then(res=>{ const copy = res.clone(); caches.open(CACHE).then(c=>c.put(r, copy)); return res; }).catch(()=>caches.match(r).then(m=>m || caches.match("index.html"))));
});
