const CACHE_NAME = 'na2la-hub-v4';

// قائمة الصفحات، الملفات، والأيقونات الأساسية المتاحة أونلاين/أوفلاين
const assetsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './na2la-bot.js',
  './cargo.html',
  './drivers.html',
  './community.html',
  './driver-profile.html',
  './drivers-community.html',
  './operations-hub.html',
  './world.html',
  './Panda.html',
  './Pandan2la.html',
  './Com.html'
];

// تثبيت الخدمة وتخزين الملفات الأساسية
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
  self.skipWaiting();
});

// تفعيل الخدمة وتنظيف الكاش القديم
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
    }).then(() => self.clients.claim())
  );
});

// جلب الملفات مع استثناء طلبات قواعد البيانات والخدمات السحابية
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // استثناء طلبات Firebase وGoogle Services لضمان تدفق البيانات الحي
  if (
    url.origin.includes('firebaseio.com') || 
    url.origin.includes('googleapis.com') || 
    url.origin.includes('gstatic.com') ||
    url.pathname.includes('/__/auth/')
  ) {
    e.respondWith(fetch(e.request));
    return;
  }

  // الاستجابة من الكاش أولاً ثم الشبكة
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request).catch(() => {
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
