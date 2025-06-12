# vite + vue 项目下使用 tailwindcss [!toc hide]

**版本**

> node: >= 18.0.0
>
> vue: 3.5.13
>
> vite: 6.3.1
>
> tailwindcss: 4.1.6
>
> @tailwindcss/vite: 4.1.6

---

## 项目创建

创建项目：`my-app`

```bash
$ pnpm create vue
$ cd my-app
$ pnpm i
```

## tailwindcss 配置

```bash
$ pnpm i tailwindcss @tailwindcss/vite -D
```

### vite.config.js

`vite` 中配置 `@tailwindcss/vite` 插件；

```js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
```

### css

在 `main.js` 中的入口 `css` 文件中添加：

**main.css**

```css
@import "tailwindcss";
@config "../../tailwind.config.js";
// @plugin "@tailwindcss/typography"; // 如果需要插件时，添加
```

### tailwind.config.js

在根目录位置创建 `tailwind.config.js`；

可以配置一些自定义的颜色变量等；

```js
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "my-primary": "#42b883",
      },
    },
  },
  plugins: [],
};
```

### VSCode 插件

安装插件 `Tailwind CSS IntelliSense`，可以在鼠标移动到 `class` 时提示对应的样式；

## 使用

### App.vue

```vue
<template>
  <header>
    <div class="text-amber-700 text-2xl font-bold">Hello Vue</div>
    <div class="text-my-primary text-2xl font-bold">Hello Vue</div>

    <div class="my-title">Hello Vue</div>
  </header>
</template>

<style scoped>
@reference  "./assets/main.css";

.my-title {
  @apply text-purple-700 text-2xl font-bold;
}
</style>

```

---

[tailwind css v4 文档](https://tailwindcss.com/)