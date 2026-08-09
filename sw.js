const CACHE_NAME = 'na2la-hub-v2';
const assetsToCache = [
  './index.html',
  './manifest.json'
];

// تثبيت الخدمة وتخزين الملفات الأساسية
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting(); // اجبار الخدمة الجديدة على التفعيل فوراً
});

// تفعيل الخدمة وحذف التخزين القديم
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim()) // السيطرة على الصفحة المفتوحة فوراً
  );
});

// جلب الملفات حتى بدون إنترنت
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
