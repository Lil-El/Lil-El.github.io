const CACHE_NAME = "iframe-preview-cache";

export function register() {
  const swUrl = "/sw.js";

  // 是否已经注册；多 sw 时使用 getRegistrations 判断；
  if (!navigator.serviceWorker.controller) {
    navigator.serviceWorker.register(swUrl, { scope: "/" }).then((registration) => {
      // 首次安装时自动触发检查更新事件
      // （24h、手动触发update）监听到变化，触发检查更新事件，那么就会有 waiting 实例
      registration.addEventListener("updatefound", () => {
        // 首次注册，浏览器会创建 installing 实例。既然是首次注册，那么也不会有 waiting 实例
        // 如果是重复注册，那么浏览器的控制权还在旧的手中，所以会创建新的 sw 的 waiting 状态实例

        // 初次：状态变化：installed => activating => activated
        // 更新：状态变化：installed => waiting；

        // 当状态变为 installed 后，registration.installing 会变为 null，实例转移到 waiting 上；所以这里必须要设置 newWorker；
        const newWorker = registration.installing;
        newWorker.addEventListener("statechange", (e) => {
          // 初次注册没有 waiting，但是再次检测到更新时，由于有旧的在控制，所以会创建新的 waiting 实例
          if (newWorker.state === "installed" && registration.waiting) {
            // 此时新版本已安装完成，进入 waiting 状态
            const flag = confirm("检测到新版本，是否立即更新？");
            if (flag) {
              registration.waiting.postMessage("SKIP_WAITING");
            }
          }
        });
      });
    });
  } else {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
        // 如果长期页面不刷新，可以提供更新按钮，去手动刷新 registration.update();

        // 页面刷新发现新的sw时，会自动触发检查更新事件
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;

          newWorker.addEventListener("statechange", (e) => {
            if (newWorker.state === "installed" && registration.waiting) {
              // 此时新版本已安装完成，进入 waiting 状态
              const flag = confirm("检测到新版本，是否立即更新？");
              if (flag) {
                registration.waiting.postMessage("SKIP_WAITING");
              }
            }
          });
        });

        // 检查是否已有 waiting 的 SW（例如用户长时间未刷新页面）
        if (registration.waiting) {
          const flag = confirm("检测到新版本，是否立即更新？");
          if (flag) {
            registration.waiting.postMessage("SKIP_WAITING");
          }
        }
      }
    });
  }

  // 监听控制权变化
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    // ​​后台静默更新可以不刷新页面，如果是静态资源变化就要刷新页面了
    // window.location.reload();
  });
}

export function putCache(req, res) {
  return caches.open(CACHE_NAME).then((cache) => cache.put(req, res));
}
