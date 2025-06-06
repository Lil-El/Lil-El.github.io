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
});
