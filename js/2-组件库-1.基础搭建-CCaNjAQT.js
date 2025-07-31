const n=`# 基础搭建 [!toc hide]\r
\r
\`\`\`markdown [!tip:success]\r
仿照 \`element-plus\` 封装一个自己的组件库，并支持 \`typescript\` 类型检查。\r
\`\`\`\r
\r
---\r
\r
# 创建一个 Vue 应用\r
\r
通过 \`vite\` 或者 \`vue\` 创建一个应用，并勾选 \`typescript\`。\r
\r
\`\`\`bash\r
$ pnpm create vite my-ui\r
# 或者\r
$ pnpm create vue my-ui\r
\`\`\`\r
\r
- [tailwindcss](!notation:underline)\r
\r
  添加 \`tailwindcss\`\r
\r
  \`\`\`bash\r
  $ pnpm i tailwindcss @tailwindcss/vite -D\r
  \`\`\`\r
\r
- [vue-tsc](!notation:underline)\r
\r
  \`package.json\` 的 \`build\` 命令为 \`vue-tsc -b && vite build\`\r
\r
## style.css\r
\r
\`\`\`css [!title:src/style.css]\r
@import 'tailwindcss';\r
\`\`\`\r
\r
## 构建组件\r
\r
1. 创建 [components/number-scroller/index.vue](!notation:box)\r
\r
\`\`\`vue [!title:src/components/number-scroller/index.vue]\r
<template>\r
  <div class="flex h-4 overflow-hidden" :style="{ height: height + 'px' }">\r
    <template v-for="(digits, index) in [integerDigits, decimalDigits]">\r
      <div v-if="index === 1 && digits.length" class="text-center" :style="mergedStyle">.</div>\r
      <div v-for="(item, index) in digits" :key="index" class="text-center" :style="mergedStyle">\r
        <div\r
          class="flex flex-col transition-transform ease-in-out animate"\r
          :style="{\r
            '--tw-duration': duration + 'ms',\r
            '--initial-translate': \`\${item.initial}px\`,\r
            translate: \`0 \${item.offset}px\`,\r
          }"\r
        >\r
          <span v-for="(_, i) in 10">{{ i }}</span>\r
        </div>\r
      </div>\r
    </template>\r
  </div>\r
</template>\r
\r
<script setup lang="ts">\r
import { computed, toRefs } from "vue";\r
import type { CSSProperties } from "vue";\r
\r
interface Props {\r
  num?: number | string;\r
  duration?: number;\r
  height?: number;\r
  backStyle?: CSSProperties;\r
}\r
\r
interface DigitType {\r
  digit: number;\r
  initial: number;\r
  offset: number;\r
}\r
\r
const props = withDefaults(defineProps<Props>(), {\r
  num: 0,\r
  duration: 1000,\r
  height: 16,\r
  backStyle: () => ({}),\r
});\r
\r
const { num, duration, height, backStyle } = toRefs(props);\r
\r
const mergedStyle = computed<CSSProperties>(() => ({\r
  height: \`\${height.value}px\`,\r
  lineHeight: \`\${height.value}px\`,\r
  ...backStyle.value,\r
}));\r
\r
const integerDigits = computed<DigitType[]>((oldValue) => {\r
  const [integer] = num.value.toString().split(".");\r
  return patchDigits(integer.split(""), oldValue!);\r
});\r
\r
const decimalDigits = computed<DigitType[]>((oldValue) => {\r
  const [, decimal] = num.value.toString().split(".");\r
  return patchDigits(decimal?.split(""), oldValue!);\r
});\r
\r
function patchDigits(digits: string[], patchedDigits: DigitType[]): DigitType[] {\r
  if (!digits) return [];\r
  return digits.map((d, i) => ({\r
    digit: patchedDigits?.[i]?.digit ?? ~~d,\r
    initial: patchedDigits?.[i]?.initial ?? ~~d * -1 * height.value,\r
    offset: patchedDigits?.[i] ? -1 * height.value * (~~d - patchedDigits[i].digit) : 0,\r
  }));\r
}\r
<\/script>\r
\r
<style scoped>\r
.animate {\r
  animation: translateY var(--tw-duration) ease-in-out forwards;\r
}\r
\r
@keyframes translateY {\r
  0% {\r
    transform: translateY(0);\r
  }\r
  100% {\r
    transform: translateY(var(--initial-translate));\r
  }\r
}\r
</style>\r
\`\`\`\r
\r
2. 创建 [components/number-scroller/index.ts](!notation:box)\r
\r
\`\`\`markdown [!tip:primary]\r
这里仿照 \`element-plus\` 为每一个组件绑定一个自己的 \`install\` 方法，便于实现单个组件全局注册。\r
\r
并且可以更好的支持 \`tree shaking\` 。\r
\`\`\`\r
\r
\`\`\`typescript [!title:components/number-scroller/index.ts]\r
// 每个组件的入口文件，可以单独 install\r
import type { App } from "vue";\r
\r
import Component from "./index.vue";\r
\r
function install(app: App) {\r
  app.component("NumberScroller", Component);\r
}\r
\r
Component.install = install;\r
\r
const NumberScroller = Component;\r
\r
export { NumberScroller };\r
\`\`\`\r
\r
3. 创建 [components/index.ts](!notation:box)\r
\r
> 主要是提供安装所有组件的函数(调用每个组件的 install 方法)，并导出所有的组件，便于实现全局注册组件库。\r
\r
\`\`\`typescript [!title:components/index.ts]\r
import type { App } from "vue";\r
import { NumberScroller } from "./number-scroller";\r
\r
const components = {\r
  NumberScroller,\r
};\r
\r
export function installAll(app: App) {\r
  Object.values(components).forEach((comp) => {\r
    if ("install" in comp) {\r
      comp.install(app);\r
    } else {\r
      console.warn(\`Component \${comp} has no install method\`);\r
    }\r
  });\r
}\r
\r
export { NumberScroller };\r
\`\`\`\r
\r
## 入口文件\r
\r
为要打包为一个库，所以需要提供一个入口文件，创建 \`src/index.ts\` 。同时需要引入 \`style.css\` 才能生成样式文件。\r
\r
\`\`\`typescript [!title:src/index.ts]\r
import "./style.css";\r
\r
import { installAll } from "./components";\r
\r
export default {\r
  install: installAll,\r
};\r
\r
export { NumberScroller } from "./components";\r
\`\`\`\r
\r
# 目录结构\r
\r
\`\`\`markdown\r
my-ui/\r
├── src/\r
│   ├── components/\r
│   │   ├── number-scroller/\r
│   │   │   ├── index.vue\r
│   │   │   └── index.ts\r
│   │   └── index.ts\r
│   ├── style.css\r
│   └── index.ts\r
├── package.json\r
├── tsconfig.json\r
├── tsconfig.app.json\r
├── tsconfig.node.json\r
└── vite.config.ts\r
\`\`\``;export{n as default};
