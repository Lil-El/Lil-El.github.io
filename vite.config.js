import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import autoImport from "unplugin-auto-import/vite";
import copySw from "./vite-copy-sw";

copySw();

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    vue(),
    autoImport({
      imports: ["vue"],
    }),
    tailwindcss(),
  ],
});
