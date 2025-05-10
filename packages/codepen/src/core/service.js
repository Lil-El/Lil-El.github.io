export function service() {
  // const worker = new URL("./worker.js", import.meta.url);
  const worker = "/src/core/worker.js";
  window.onload = () => {
    navigator.serviceWorker.getRegistration(worker).then((registration) => {
      if (registration) {
        // ​检查 worker.js 是否有更新​​，如果worker文件有变动，就就重新缓存资源
        registration
          .update()
          .then(() => {
            console.log("worker存在，update：", registration.scope);
          })
          .catch((err) => {
            console.error("更新失败:", err);
          });
      } else {
        // 注册 Service Worker，并缓存资源
        navigator.serviceWorker
          .register(worker)
          .then((registration) => {
            console.log("Service Worker 注册成功:", registration.scope);
          })
          .catch((err) => {
            console.error("Service Worker 注册失败:", err);
          });
      }
    });

    setTimeout(() => {
      fetch("/src/core/data/m.json").then((response) => {
        response.json().then((data) => {
          console.log("m.json:", data);
        });
      });
    }, 2000);
  };
}
