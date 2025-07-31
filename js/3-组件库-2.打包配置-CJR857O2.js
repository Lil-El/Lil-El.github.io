const n=`# 打包配置 [!toc hide]\r
\r
关于打包，在 \`element-plus\` 中，它打包的结果的目录结构如下：\r
\r
\`\`\`markdown\r
element-plus\r
  ├── dist/\r
  │   ├── index.css\r
  │   └── index.full.js\r
  ├── es/\r
  │   ├── components/\r
  │   │   ├── alert/\r
  │   │   │   ├── src/\r
  │   │   │   ├── style/\r
  │   │   │   ├── index.d.ts\r
  │   │   │   └── index.ts\r
  │   │   ├── index.d.ts\r
  │   │   └── index.ts\r
  │   ├── index.d.ts\r
  │   └── index.ts\r
  ├── lib/\r
  │   ├── components/\r
  │   │   ├── alert/\r
  │   │   │   ├── src/\r
  │   │   │   ├── style/\r
  │   │   │   ├── index.d.ts\r
  │   │   │   └── index.ts\r
  │   │   ├── index.d.ts\r
  │   │   └── index.ts\r
  │   ├── index.d.ts\r
  │   └── index.ts\r
  ├── global.d.ts\r
  └── package.json\r
\`\`\`\r
\r
我们对它的产物进行解析：\r
\r
## 模块\r
\r
- [es：是基于 esm 模块打包的产物](!notation:box:yellow)\r
- [lib：是基于 commonjs/cjs 模块打包的产物](!notation:box:yellow)\r
- [dist：是基于 umd 打包的产物](!notation:box:yellow)\r
\r
## css 代码分割\r
\r
对于 \`element-plus\` 的 es 和 cjs 模块中的每个组件，它都进行了 css 代码分割。\r
\r
这样在使用该组件库的单个组件时，可以只引用单个组件的样式，避免加载全量的样式。\r
\r
\`\`\`markdown [!tip:danger]\r
\`vite\` 中的 \`build.cssCodeSplit\` 默认为 \`true\`，但是在将项目作为 \`lib\` 库（即：\`build.lib\`）打包时，\`build.cssCodeSplit\` 的默认值是 \`false\`。\r
\r
所以必须要对 \`build.cssCodeSplit\` 显式设置；\r
\`\`\`\r
\r
### 引用单个 element-plus 组件\r
\r
\`\`\`js [!title:main.js]\r
import { ElCard } from "element-plus";\r
import { createApp } from "vue";\r
\r
import "element-plus/theme-chalk/base.css";\r
import "element-plus/theme-chalk/el-card.css";\r
\r
createApp(App).use(ElCard).mount("#app");\r
\`\`\`\r
\r
## 保留目录结构\r
\r
\`cjs\`、\`es\` 模块配置:\r
\r
  - 保留原始模块结构：\`build.rollupOptions.output[].preserveModules = true;\`\r
  - 指定模块根目录，去掉冗余的 \`src\` 前缀：\`build.rollupOptions.output[].preserveModulesRoot = "src";\`\r
\r
> \`preserveModulesRoot\` 只对 \`es\`、\`cjs\` 模块打包生效\r
\r
---\r
\r
## 代码配置\r
\r
### package.json\r
\r
对于 \`umd\` 模块来说，开启 \`build.cssCodeSplit\` 会导致结果无法生成 \`css\` 文件；\r
\r
所以需要将 \`es/cjs\` 与 \`umd\` 的打包配置进行单独构建处理。\r
\r
同时为了避免每次 \`vue-tsc\` 处理 \`ts\` 之后 \`vite build\` 会将目录内容清除掉，所以需要将 \`vue-tsc\` 命令设置在打包之后。\r
\r
\`\`\`json [!title:package.json]\r
"scripts": {\r
  "dev": "vite",\r
  "build": "pnpm run build:es && pnpm run build:umd",\r
  "build:es": "vite build --mode es  && vue-tsc -b",\r
  "build:umd": "vite build --mode umd  && vue-tsc -b",\r
  "preview": "vite preview"\r
}\r
\`\`\`\r
\r
### vite.config.ts\r
\r
\`\`\`ts [!title:vite.config.ts]\r
import { defineConfig } from "vite";\r
import vue from "@vitejs/plugin-vue";\r
import tailwindcss from "@tailwindcss/vite";\r
import Components from "unplugin-vue-components/vite";\r
\r
import type { UserConfig } from "vite";\r
\r
const baseConfig = {\r
  plugins: [vue(), tailwindcss(), Components()],\r
};\r
\r
// es / cjs 配置\r
const esConfig: UserConfig = {\r
  build: {\r
    cssCodeSplit: true,\r
    lib: {\r
      entry: "./src/index.ts",\r
      // name: "MyUI",\r
      // fileName: (format) => (format === "es" ? \`index.mjs\` : \`index.\${format}.js\`),\r
      // formats: ["es", "umd", "cjs"],\r
    },\r
    rollupOptions: {\r
      external: ["vue"],\r
      output: [\r
        {\r
          format: "es",\r
          preserveModules: true, // 只在es格式下有效\r
          preserveModulesRoot: "src",\r
          entryFileNames: "[name].mjs",\r
          assetFileNames: (assetInfo) => {\r
            if (assetInfo.names[0] === "style.css") return "base.css";\r
            return "[name].css";\r
          },\r
          dir: "es",\r
        },\r
        {\r
          format: "commonjs", // 和 cjs 等价\r
          preserveModules: true,\r
          preserveModulesRoot: "src",\r
          entryFileNames: "[name].js",\r
          assetFileNames: (assetInfo) => {\r
            if (assetInfo.names[0] === "style.css") return "base.css";\r
            return "[name].css";\r
          },\r
          dir: "lib",\r
        },\r
      ],\r
    },\r
    emptyOutDir: true,\r
  },\r
};\r
\r
// umd 配置\r
const umdConfig: UserConfig = {\r
  build: {\r
    lib: {\r
      entry: "./src/index.ts",\r
      name: "MyUI",\r
      fileName: (format) => (format === "es" ? \`index.mjs\` : \`index.\${format}.js\`),\r
      formats: ["umd"],\r
    },\r
    rollupOptions: {\r
      external: ["vue"],\r
      output: {\r
        // name: "MyUI", // 必须为UMD格式指定name\r
        globals: {\r
          vue: "Vue",\r
        },\r
        dir: "dist",\r
        assetFileNames: "index.[ext]", // 固定CSS文件名\r
        inlineDynamicImports: false,\r
        manualChunks: undefined,\r
      },\r
    },\r
    emptyOutDir: true,\r
  },\r
};\r
\r
export default defineConfig(({ mode }) => {\r
  return {\r
    ...baseConfig,\r
    ...(mode === "es" ? esConfig : umdConfig),\r
  };\r
});\r
\`\`\`\r
\r
`;export{n as default};
