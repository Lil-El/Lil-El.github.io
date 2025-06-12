const r=`# vite + qiankun 构建微前端应用实践 [!toc hide]\r
\r
[![GitHub](https://img.shields.io/badge/GitHub-qiankun-blue?logo=github)](https://github.com/Lil-El/qiankun)\r
\r
---\r
\r
# 介绍\r
\r
## Qiankun\r
\r
\`qiankun\` 是一个基于 \`single-spa\` 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。\r
\r
## 微前端\r
\r
微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。\r
\r
微前端架构具备以下几个核心价值：\r
\r
- 技术栈无关\r
\r
  主框架不限制接入应用的技术栈，微应用具备完全自主权\r
\r
- 独立开发、独立部署\r
\r
  微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新\r
\r
- 增量升级\r
\r
  在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略\r
\r
- 独立运行时\r
\r
  每个微应用之间状态隔离，运行时状态不共享\r
\r
# 准备\r
\r
基于 \`vite + vue3 + qiankun\` 构建一个微前端应用；创建一个文件夹 \`my-apps\`;\r
\r
> 依赖版本：\r
>   - node: >= 18\r
>   - vue: 3.5.16\r
>   - vite: 6.3.5\r
>   - qiankun: 2.10.16\r
>   - vue-router: 4.5.1\r
\r
## 主应用\r
\r
在 \`my-apps\` 下执行如下命令：\r
\r
\`\`\`bash\r
$ pnpm create vue   # 设置项目名称为 main-app\r
$ cd main-app\r
$ pnpm i\r
\`\`\`\r
\r
为 \`main-app\` 安装相关依赖：\r
\r
\`\`\`bash\r
$ pnpm i qiankun\r
\`\`\`\r
\r
### App.vue\r
\r
\`\`\`html [!title:App.vue]\r
<template>\r
  <router-view></router-view>\r
</template>\r
\`\`\`\r
\r
### router.js\r
\r
要为子应用设置对应的匹配路径\r
\r
\`\`\`js [!title:router.js]\r
import { createRouter, createWebHistory } from "vue-router";\r
\r
const routes = [\r
  { path: "/", name: "home", component: () => import("../views/Home.vue") },\r
  { path: "/sub-app/:pathMatch(.*)*", name: "sub-app", component: () => import("../views/SubApp.vue") },\r
];\r
\r
const router = createRouter({\r
  history: createWebHistory(),\r
  routes,\r
});\r
\r
export default router;\r
\r
\`\`\`\r
\r
### main.js\r
\r
注册子应用\r
\r
\`\`\`js [!title:main.js]\r
import { createApp } from "vue";\r
import App from "./App.vue";\r
import { registerMicroApps, start, loadMicroApp } from "qiankun";\r
import router from "./router/index.js";\r
\r
const app = createApp(App);\r
\r
app.use(router);\r
\r
registerMicroApps(\r
  [\r
    {\r
      name: "sub-app",\r
      entry: "//localhost:7100",\r
      container: "#sub-container",\r
      activeRule: "/sub-app",\r
      props: {\r
        author: "Mino",\r
      },\r
    },\r
  ]\r
);\r
// 可以设置相关生命周期函数，beforeMount、beforeLoad、afterMount 等\r
\r
start();\r
\r
app.mount("#app");\r
\`\`\`\r
\r
### views/Home.vue\r
\r
\`\`\`html [!title:Home.vue]\r
<template>\r
  <div>Home</div>\r
  <router-link to="/sub-app">sub app</router-link>\r
</template>\r
\`\`\`\r
\r
### views/SubApp.vue\r
\r
\`\`\`html [!title:SubApp.vue]\r
<template>\r
  <div>this is a sub app:</div>\r
  <br>\r
  <div id="sub-container" style="border: 1px solid thistle; height: 600px;"></div>\r
</template>\r
\`\`\`\r
\r
## 子应用\r
\r
在 \`my-apps\` 下执行如下命令：\r
\r
\`\`\`bash\r
$ pnpm create vue   # 设置项目名称为 sub-app\r
$ cd sub-app\r
$ pnpm i\r
\`\`\`\r
\r
为 \`sub-app\` 安装相关依赖：\r
\r
\`\`\`bash\r
$ pnpm i vite-plugin-qiankun -D\r
\`\`\`\r
\r
### App.vue\r
\r
\`\`\`html [!title:App.vue]\r
<template>\r
  <router-view></router-view>\r
</template>\r
\`\`\`\r
\r
### router.js\r
\r
\`\`\`js [!title:router.js]\r
import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";\r
\r
const router = createRouter({\r
  history: createWebHistory("/sub-app"),\r
  routes: [\r
    {\r
      path: "/",\r
      name: "Home",\r
      component: () => import("../views/Home.vue"),\r
    },\r
    {\r
      path: "/about",\r
      name: "About",\r
      component: () => import("../views/About.vue"),\r
    },\r
  ],\r
});\r
\r
export default router;\r
\`\`\`\r
\r
### main.js\r
\r
- 使用 \`qiankunWindow\` 判断是否是独立运行\r
- 在 \`window\` 上挂载子应用的钩子函数\r
\r
\`\`\`js [!title:main.js]\r
import { createApp } from "vue";\r
import App from "./App.vue";\r
import router from "./router/index.js";\r
import { renderWithQiankun, qiankunWindow } from "vite-plugin-qiankun/dist/helper";\r
\r
let instance = null;\r
\r
function render(props = {}) {\r
  const { container } = props;\r
  instance = createApp(App);\r
  instance.use(router);\r
  instance.mount(container || "#app");\r
}\r
\r
// 独立运行时直接渲染\r
if (!qiankunWindow.__POWERED_BY_QIANKUN__) { // window.proxy\r
  render();\r
} else {\r
  renderWithQiankun({ // window.moudleQiankunAppLifeCycles\r
    mount(props) {\r
      render(props);\r
    },\r
    bootstrap() {\r
    },\r
    update(props) {\r
    },\r
    unmount() {\r
      instance?.unmount();\r
    },\r
  });\r
}\r
\`\`\`\r
\r
### vite.config.js\r
\r
需要为子应用配置 \`base\`、\`server\`、\`build\`\r
\r
\`\`\`js [!title:vite.config.js]\r
import { defineConfig } from "vite";\r
import vue from "@vitejs/plugin-vue";\r
import qiankun from "vite-plugin-qiankun";\r
\r
export default defineConfig({\r
  plugins: [\r
    vue(),\r
    qiankun("sub-app", {\r
      useDevMode: true, // 开发模式\r
    }),\r
  ],\r
  base: "/sub-app/",\r
  server: {\r
    port: 7100,\r
    cors: true,\r
    origin: "http://localhost:7100",\r
  },\r
  build: {\r
    rollupOptions: {\r
      output: {\r
        format: "umd",\r
      },\r
    },\r
  },\r
});\r
\r
\`\`\`\r
\r
### views/Home.vue\r
\r
\`\`\`html [!title:Home.vue]\r
<template>\r
  <div>sub app home</div>\r
  <br>\r
  <router-link to="/about">sub app about</router-link>\r
</template>\r
\`\`\`\r
\r
## 打包\r
\r
打包时候需要修改子应用的 \`base\`，更改为其所在的 \`url\`；\r
\r
\`\`\`js [!title:vite.config.js]\r
export default defineConfig({\r
  plugins: [\r
    vue(),\r
    qiankun("sub-app", {\r
      useDevMode: true,\r
    }),\r
  ],\r
  base: process.env."http://127.0.0.1:5501/",\r
  server: {\r
    port: 7100,\r
    cors: true,\r
    origin: import.meta.env.DEV ? "/sub-app/" : "http://localhost:7100",\r
  },\r
  build: {\r
    rollupOptions: {\r
      output: {\r
        format: "umd",\r
      },\r
    },\r
  },\r
});\r
\`\`\`\r
\r
\r
[完整代码 git](https://github.com/Lil-El/qiankun)\r
\r
`;export{r as default};
