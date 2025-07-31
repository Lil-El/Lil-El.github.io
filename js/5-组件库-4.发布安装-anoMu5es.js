const r=`# 类型提示及发布使用 [!toc hide]\r
\r
\`\`\`markdown [!tip:success]\r
- 为了在使我们的组件库在使用时，\`VSCode\` 自动提示组件的属性和方法，需要将 \`vue\` 文件的类型提取出来。\r
- \`npm\` 发布、安装\r
\`\`\`\r
\r
# 组件类型提取\r
\r
\`\`\`ts [!title:src/components/number-scroller/type.ts]\r
import type { CSSProperties } from "vue";\r
\r
export interface Vue3NumberScrollerProps {\r
  num?: number | string;\r
  duration?: number;\r
  height?: number;\r
  backStyle?: CSSProperties;\r
}\r
\r
export interface DigitType {\r
  digit: number;\r
  initial: number;\r
  offset: number;\r
}\r
\`\`\`\r
\r
提取之后，在 \`vue\` 文件中导入使用；\r
\r
## global 配置\r
\r
[为全局组件注册提供类型支持，具体来说是​​为组件库的组件添加 \`TypeScript\` 类型声明​​，使其在 \`Vue\` 模板中能够获得类型检查和智能提示。](!notation:highlight:yellowgreen)\r
\r
\`\`\`ts [!title:global.d.ts]\r
import "vue";\r
\r
declare module "vue" {\r
  export interface GlobalComponents {\r
    NumberScroller: typeof import("@lil-el/number-scroller")["NumberScroller"];\r
  }\r
}\r
\r
\`\`\`\r
\r
## tsconfig 配置\r
\r
\`tsconfig\` 需要对 \`ts\` 文件进行处理\r
\r
\`\`\`json [!title:tsconfig.xx.json]\r
{\r
  compilerOptions: {}, // ...\r
  "include": ["src/**/*.ts", "src/**/*.vue"],\r
}\r
\`\`\`\r
\r
具体可以查看[上一章](https://lil-el.github.io/#/blogs/5)\r
\r
# \`npm\` 发布\r
\r
将组件库进行打包，执行命令：\r
\r
\`\`\`bash\r
$ pnpm run build\r
\`\`\`\r
\r
将打包之后的文件 \`dist/lib/es/global.d.ts\` 在 \`package.json\` 的 \`files\` 字段进行设置。然后发布至 \`npm\`：\r
\r
\`\`\`bash\r
$ pnpm publish\r
\`\`\`\r
\r
## package.json 配置\r
\r
\`\`\`json [!title:package.json]\r
{\r
  "name": "@lil-el/my-ui",\r
  "private": false,\r
  "version": "0.0.1-alpha.0",\r
  "type": "module",\r
  "main": "lib/index.js",\r
  "module": "es/index.mjs",\r
  "types": "es/index.d.ts",\r
  "exports": {\r
    ".": {\r
      "types": "./es/index.d.ts",\r
      "import": "./es/index.mjs",\r
      "require": "./lib/index.js"\r
    },\r
    "./global": {\r
      "types": "./global.d.ts"\r
    },\r
    "./css": "./dist/index.css",\r
    "./*": "./*"\r
  },\r
  "files": [\r
    "dist",\r
    "lib",\r
    "es",\r
    "global.d.ts"\r
  ],\r
  "scripts": {\r
    "dev": "vite",\r
    "build": "pnpm run build:es && pnpm run build:umd",\r
    "build:es": "vite build --mode es  && vue-tsc -b",\r
    "build:umd": "vite build --mode umd  && vue-tsc -b",\r
    "preview": "vite preview"\r
  },\r
  "peerDependencies": {\r
    "vue": "^3.5.17"\r
  },\r
  "devDependencies": {\r
    "@tailwindcss/vite": "^4.1.11",\r
    "@vitejs/plugin-vue": "^6.0.0",\r
    "@vue/tsconfig": "^0.7.0",\r
    "tailwindcss": "^4.1.11",\r
    "typescript": "~5.8.3",\r
    "unplugin-vue-components": "^28.8.0",\r
    "vite": "^7.0.4",\r
    "vue-tsc": "^2.2.12"\r
  },\r
  "author": "Mino",\r
  "homepage": "https://lil-el.github.io",\r
  "description": "",\r
  "keywords": [\r
    "vue3",\r
    "number scroller",\r
    "vue3 number scroller",\r
    "vue3 number scroller component"\r
  ],\r
  "repository": {\r
    "type": "git",\r
    "url": "https://github.com/Lil-El/vue3-number-scroller.git"\r
  },\r
  "license": "MIT",\r
  "packageManager": "pnpm@10.10.0",\r
  "engines": {\r
    "node": ">=18.0.0"\r
  },\r
  "publishConfig": {\r
    "access": "public",\r
    "registry": "https://registry.npmjs.org/"\r
  }\r
}\r
\`\`\`\r
\r
# 安装使用\r
\r
在新的项目下，执行命令\r
\r
\`\`\`bash\r
$ pnpm install @lil-el/my-ui\r
\`\`\`\r
\r
在 main.ts 中进行全局注册，当然也可以选择直接在文件中局部注册使用；\r
\r
\`\`\`ts [!title:main.ts]\r
import "style.css";\r
\r
import "@lil-el/my-ui/es/base.css";\r
import "@lil-el/my-ui/es/components/number-scroller/index.css";\r
\r
import { createApp } from "vue";\r
import App from "./App.vue";\r
\r
import { Vue3NumberScroller } from "@lil-el/my-ui";\r
\r
createApp(App).use(Vue3NumberScroller).mount("#app");\r
\`\`\`\r
> 这里是在全局中，注册单个组件\r
\r
\`\`\`vue [!title:App.vue]\r
<NumberScroller :num='12.34' />\r
\`\`\`\r
\r
当我们输入 \`:\` 时，会自动提示组件所拥有的属性\r
\r
![](/images/微信图片_20250731141704_15.png)`;export{r as default};
