const CACHE_NAME = "my-cache-v1";
const urlsToCache = ["/service/data/m.json"];

// 安装阶段：缓存静态资源
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("install");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log("error", error);
      })
  );
});

// 激活阶段：清理旧缓存
self.addEventListener("activate", (event) => {
  console.log("activate");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.skipWaiting())
  );
});

// 拦截请求：优先返回缓存
self.addEventListener("fetch", (event) => {
  console.log(event);

  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果缓存命中，直接返回
      if (response) {
        console.log("cache hit", event.request.url);
        return response;
      }

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
