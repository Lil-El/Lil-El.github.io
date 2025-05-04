import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import autoImport from "unplugin-auto-import/vite";
import monacoEditorPlugin from "vite-plugin-monaco-editor";

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
    monacoEditorPlugin({}),
  ],
});
