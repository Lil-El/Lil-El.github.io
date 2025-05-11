/*
TODO: md 解析展示；
组件 代码预览 组件；
vue3 和 饿了么UI使用
https://code.esm.sh/ 主题颜色设置；
MD解析移动新的package中，editor仅运行代码
全局使用tailwindcss，网站首页使用termino.js，界面参考floating-ui.com
Termino.js
Console.log输出
https://github.com/GeoffSelby/tailwind-highlightjs
https://github.com/tailwindlabs/tailwindcss-typography
*/
import { parseVue3, atobUtf8 } from "@/core/parse";
import { register, putCache } from "@/core/service";

// 是否使用 ServiceWorker，否则使用 srcdoc 方式
const enableSW = 'serviceWorker' in navigator;
const urlsToCache = {
  preview: "/preview.js?v=0",
  main: "/main.js?v=0",
  App: "/App.vue?v=0",
  render: "/render.js?v=0",
};

function handleVue3(code, mainJS, sw) {
  const { __filename, __scopeId, App, render, styles } = parseVue3(code);

  const jsStr = mainJS.replace(
    /import\s+App\s+from\s+(["'])(App\.vue)\1\s*(?:;|$)/g,
    `import App from "${sw ? urlsToCache.App : `data:text/javascript;base64,${App}`}";
App.__filename = "${__filename}";
${__scopeId ? `App.__scopeId = "data-v-${__scopeId}";` : ""}

${
  render
    ? `import { render } from "${sw ? urlsToCache.render : `data:text/javascript;base64,${render}`}";
App.render = render;`
    : ""
}`
  );

  const htmlStr = `<div id="app"></div>
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.js"
    }
  }
</script>
${sw ? `<script type="module" src="${urlsToCache.main}"></script>` : `<script type="module">${jsStr}</script>`}
`;

  if (sw) {
    putCache(urlsToCache.main, new Response(jsStr, { headers: { "Content-Type": "text/javascript" } }));
    putCache(urlsToCache.App, new Response(atobUtf8(App), { headers: { "Content-Type": "text/javascript" } }));
    if (render) putCache(urlsToCache.render, new Response(atobUtf8(render), { headers: { "Content-Type": "text/javascript" } }));
  }

  return {
    htmlStr,
    cssStr: styles.map((style) => `<style>${style}</style>`).join("\n"),
  };
}

function generateHTML(htmlStr, cssStr) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Code Preview</title>
      ${cssStr}
    </head>
    <body>
      ${htmlStr}
    </body>
    </html>
  `;
}

export default function useEditors(previewID) {
  const editorRef = ref(null);

  const loading = ref(false);

  onMounted(() => {
    if (enableSW) register();

    const previewFrame = document.getElementById(previewID);
    previewFrame.onload = () => {
      loading.value = false;
    };
  });

  function run() {
    const editors = editorRef.value;
    if (!editors) return void 0;

    loading.value = true;

    const htmlEditor = editors.find((e) => e.getData().suffix === "html");
    const cssEditor = editors.find((e) => e.getData().suffix === "css");
    const jsEditor = editors.find((e) => e.getData().suffix === "javascript");
    const vueEditor = editors.find((e) => e.getData().suffix === "vue");

    const htmlCode = htmlEditor ? htmlEditor.getData().code : "";
    const cssCode = cssEditor ? cssEditor.getData().code : "";
    const jsCode = jsEditor ? jsEditor.getData().code : "";
    const vueCode = vueEditor ? vueEditor.getData().code : "";

    let srcdoc;

    if (vueCode) {
      const { htmlStr, cssStr } = handleVue3(vueCode, jsCode, enableSW);
      srcdoc = generateHTML(htmlStr, cssStr);
    } else if (jsCode) {
      srcdoc = generateHTML(`${htmlCode}\n<script type="module">${jsCode}</script>`, `<style>${cssCode}</style>`);
    }

    const previewFrame = document.getElementById(previewID);

    if (enableSW) {
      putCache(urlsToCache.preview, new Response(srcdoc, { headers: { "Content-Type": "text/html" } })).then(() => {
        previewFrame.src = urlsToCache.preview;
      });
    } else {
      previewFrame.srcdoc = srcdoc;
    }
  }

  function reset() {
    editorRef.value.forEach((editor) => {
      editor.reset();
    });
  }

  return {
    editorRef,
    reset,
    run,
    loading,
  };
}
