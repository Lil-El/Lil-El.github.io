const n=`# vite + vue 项目下使用 tailwindcss [!toc hide]\r
\r
**版本**\r
\r
> node: >= 18.0.0\r
>\r
> vue: 3.5.13\r
>\r
> vite: 6.3.1\r
>\r
> tailwindcss: 4.1.6\r
>\r
> @tailwindcss/vite: 4.1.6\r
\r
---\r
\r
## 项目创建\r
\r
创建项目：\`my-app\`\r
\r
\`\`\`bash\r
$ pnpm create vue\r
$ cd my-app\r
$ pnpm i\r
\`\`\`\r
\r
## tailwindcss 配置\r
\r
\`\`\`bash\r
$ pnpm i tailwindcss @tailwindcss/vite -D\r
\`\`\`\r
\r
### vite.config.js\r
\r
\`vite\` 中配置 \`@tailwindcss/vite\` 插件；\r
\r
\`\`\`js\r
import { fileURLToPath, URL } from 'node:url'\r
\r
import { defineConfig } from 'vite'\r
import vue from '@vitejs/plugin-vue'\r
import tailwindcss from "@tailwindcss/vite";\r
\r
// https://vite.dev/config/\r
export default defineConfig({\r
  plugins: [\r
    vue(),\r
    tailwindcss(),\r
  ],\r
  resolve: {\r
    alias: {\r
      '@': fileURLToPath(new URL('./src', import.meta.url))\r
    },\r
  },\r
})\r
\`\`\`\r
\r
### css\r
\r
在 \`main.js\` 中的入口 \`css\` 文件中添加：\r
\r
**main.css**\r
\r
\`\`\`css\r
@import "tailwindcss";\r
@config "../../tailwind.config.js";\r
// @plugin "@tailwindcss/typography"; // 如果需要插件时，添加\r
\`\`\`\r
\r
### tailwind.config.js\r
\r
在根目录位置创建 \`tailwind.config.js\`；\r
\r
可以配置一些自定义的颜色变量等；\r
\r
\`\`\`js\r
export default {\r
  content: ["./src/**/*.{js,ts,jsx,tsx,vue}"],\r
  theme: {\r
    extend: {\r
      colors: {\r
        "my-primary": "#42b883",\r
      },\r
    },\r
  },\r
  plugins: [],\r
};\r
\`\`\`\r
\r
### VSCode 插件\r
\r
安装插件 \`Tailwind CSS IntelliSense\`，可以在鼠标移动到 \`class\` 时提示对应的样式；\r
\r
## 使用\r
\r
### App.vue\r
\r
\`\`\`vue\r
<template>\r
  <header>\r
    <div class="text-amber-700 text-2xl font-bold">Hello Vue</div>\r
    <div class="text-my-primary text-2xl font-bold">Hello Vue</div>\r
\r
    <div class="my-title">Hello Vue</div>\r
  </header>\r
</template>\r
\r
<style scoped>\r
@reference  "./assets/main.css";\r
\r
.my-title {\r
  @apply text-purple-700 text-2xl font-bold;\r
}\r
</style>\r
\r
\`\`\`\r
\r
---\r
\r
[tailwind css v4 文档](https://tailwindcss.com/)`;export{n as default};
