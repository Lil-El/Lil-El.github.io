const CACHE_NAME = "iframe-preview-cache";

const ASSETS_TO_CACHE = ["/preview.js?v=0", "/main.js?v=0", "/App.vue?v=0", "/render.js?v=0"];

// 在 SW 中跳过等待期
self.addEventListener("message", (e) => {
  if (e.data === "SKIP_WAITING") self.skipWaiting();
});

// 安装阶段：缓存静态资源
self.addEventListener("install", (event) => {
  // 预缓存关键资源
  // event.waitUntil(
  //   caches.open(CACHE_NAME)
  //     .then((cache) => {
  //       return cache.addAll(ASSETS_TO_CACHE);
  //     })
  // );
});

// 激活阶段：清理旧缓存
self.addEventListener("activate", (event) => {
  console.log("activate");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 拦截请求：优先返回缓存
self.addEventListener("fetch", (event) => {
  if (ASSETS_TO_CACHE.some((u) => event.request.url.endsWith(u)))
    event.respondWith(
      caches.match(event.request).then((response) => {
        // 如果缓存命中，直接返回
        if (response) return response;

        // 否则请求网络，并缓存新资源
        // return fetch(event.request).then((response) => {
        //   // 检查是否是有效响应（避免缓存错误响应）
        //   if (!response || response.status !== 200 || response.type !== "basic") {
        //     return response;
        //   }

        //   // 克隆响应以缓存
        //   const responseToCache = response.clone();
        //   caches.open(CACHE_NAME).then((cache) => {
        //     cache.put(event.request, responseToCache);
        //   });

        //   return response;
        // });
      })
    );
});
