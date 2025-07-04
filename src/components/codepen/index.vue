<template>
  <iframe :srcdoc="doc" class="size-full"></iframe>
</template>

<script setup>
const props = defineProps(["title", "author", "date", "project", "editors"]);

const doc = ref(genHTML(props ? JSON.stringify(props) : ``));

console.log(props);
watch(
  () => props.title,
  (newProps) => {
    console.log(newProps);
  },
  {
    deep: true,
  }
);

function genHTML(props) {
  const ele = document.querySelector("#md-content-article");
  const color = getComputedStyle(ele).getPropertyValue("--codepen-color");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Code Pen</title>
      <style>
        @import url("https://unpkg.com/@lil-el/codepen@latest/css");
      </style>
    </head>
    <body>
      <div id="app" style="--codepen-color: ${color};"></div>

      <script type="importmap">
        {
          "imports": {
            "vue": "https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.js",
            "@lil-el/codepen": "https://unpkg.com/@lil-el/codepen@latest/dist/index.js"
          }
        }
      <\/script>
      <script src="https://unpkg.com/@tailwindcss/browser@4"><\/script>
      <script type="module">
        import { createApp, h } from "vue";
        import { codepen } from "@lil-el/codepen";

        const App = h(codepen, ${props});

        createApp(App).mount("#app");
      <\/script>
    <\/body>
    <\/html>
  `.replaceAll(/\n\s+/g, "");
}
</script>
