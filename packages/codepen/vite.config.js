import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 至少要配置一个 {}
    // 生产环境由于资源需要打包到特定的目录下，需要额外的配置支持路径
    monacoEditorPlugin({
      // 打包地址
      customDistPath: () => resolve(__dirname, "../dist/monaco-editor/"),
      // 路由前缀
      publicPath: "monaco-editor",
    }),
  ],
  // 加了下面代码才会有 monaco-editor 的代码补全提示
  optimizeDeps: {
    include: [
      `monaco-editor/esm/vs/language/json/json.worker`,
      `monaco-editor/esm/vs/language/css/css.worker`,
      `monaco-editor/esm/vs/language/html/html.worker`,
      `monaco-editor/esm/vs/language/typescript/ts.worker`,
      `monaco-editor/esm/vs/editor/editor.worker`,
    ],
  },
});
