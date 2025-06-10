import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import autoImport from "unplugin-auto-import/vite";
import viteCopySw from "@lil-el/codepen/vite-copy-sw";

// https://vite.dev/config/
export default defineConfig({
  define: {
    __APP_TITLE__: JSON.stringify("Mino 部落格"),
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    viteCopySw,
    vue(),
    autoImport({
      imports: ["vue"],
    }),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      // 作为库打包时，排除以下依赖；如果是应用打包，则不需要排除这些依赖
      output: {
        chunkFileNames(assetInfo) {
          // 忽略以 _ 开头的文件：gh pages 对这类文件 404
          if (assetInfo.name.startsWith("_")) {
            return `js/${assetInfo.name.slice(1)}.js`;
          }

          return "js/[name]-[hash].js";
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/css/[name][extname]";
          } else if (assetInfo.name?.endsWith(".ttf") || assetInfo.name?.endsWith(".woff2")) {
            return "assets/fonts/[name][extname]";
          }
          return "assets/[name][extname]";
        },
      },
    },
    emptyOutDir: true,
  },
});
