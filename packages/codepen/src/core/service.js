const CACHE_NAME = "iframe-preview-cache";

export function register() {
  const swUrl = "/sw.js";

  // 是否已经注册；多 sw 时使用 getRegistrations 详细判断；
  if (!navigator.serviceWorker.controller) {
    // 如果 sw.js 没有变化，重复注册时，registration是同一个引用对象；
    navigator.serviceWorker.register(swUrl, { scope: "/" }).then((registration) => {
      registration.addEventListener("updatefound", () => {
        /**
         * 初次安装状态变化：installed => activating => activated
         *    - 安装阶段，实例对象在 registration.installing
         *    - 安装成功，installing 变为 null，实例转移到 waiting 上； 「state:installed, installing:null, waiting:sw, active:null」
         *    - 激活(成功)阶段，waiting 变为 null，转移到 active 上；  「state:activated|activating, installing:null, waiting:null, active:sw」
         *
         * 非初次安装：
         *     - 安装阶段，实例对象在 registration.installing
         *     - 安装成功后，installing 变为 null，实例转移给waiting和active上；因为有旧的实例，所以新的会一直处于 installed 状态
         *     「state:installed, installing:null, waiting:sw, active:sw」
         *     - skipWaiting 时进入激活阶段，此时 active 存在；
         *           - redundant：进入冗余状态
         *           - activating：重新激活
         *           - activated： 激活完成
        */

       // 最终 installing 会变为 null，所以要设置 newWorker，可以一直拿到 sw 实例对象；
       const newWorker = registration.installing;
       newWorker.addEventListener("statechange", (e) => {
          console.log("old state:", e.target.state, !!registration.installing, !!registration.waiting, !!registration.active);

          if (newWorker.state === "installed") {
            // 初次安装waiting和active不会同时存在
            if (registration.waiting && registration.active) {
              const flag = confirm("检测到新版本，是否立即更新？");
              if (flag) {
                registration.waiting.postMessage("SKIP_WAITING");
              }
            }
          }
        });
      });
    });
  } else {
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (registration) {
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
