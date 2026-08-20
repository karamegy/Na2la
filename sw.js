const CACHE_NAME = 'na2la-hub-v3';

// قائمة الصفحات والملفات الأساسية التي تريد إتاحتها أونلاين/أوفلاين
const assetsToCache = [
  './index.html',
  './manifest.json',
  './cargo.html',
  './drivers.html',
  './community.html',
  './driver-profile.html',
  './drivers-community.html',
  './operations-hub.html',
  './world.html'
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
    }).then(() => self.clients.claim())
  );
});

// جلب الملفات مع استثناء طلبات قواعد البيانات (Firebase) لضمان عدم تعطل النظام
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // إذا كان الطلب موجهاً إلى Firebase أو خدمات خارجية، لا تقم بتخزينه في الكاش العادي
  if (url.origin.includes('firebaseio.com') || url.origin.includes('googleapis.com') || url.pathname.includes('/__/auth/')) {
    e.respondWith(fetch(e.request));
    return;
  }

  // باقي ملفات التطبيق المحلية يتم جلبها من الكاش أولاً ثم الشبكة
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request).catch(() => {
        // لو فشل الاتصال ولم يكن الملف موجوداً في الكاش، يمكنك توجيهه لصفحة الـ index
        if (e.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
