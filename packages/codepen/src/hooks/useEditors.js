/*
TODO: md 解析展示；
组件 代码预览 组件；
vue3 和 饿了么UI使用
https://code.esm.sh/ 主题颜色设置；
serviceWorker App.vue
MD解析移动新的package中，editor仅运行代码
全局使用tailwindcss，网站首页使用termino.js，界面参考floating-ui.com
Termino.js
https://floating-ui.com/docs/getting-started 代替 select 组件
https://code.juejin.cn/pen/7500890847232294950
select 组件封装到全局 @lil-el/ui 设置浅色、深色样式; select 组件的点击事件优化，避免弹的太多；
Console.log输出
https://juejin.cn/post/7344697321798500392
https://github.com/GeoffSelby/tailwind-highlightjs
https://github.com/tailwindlabs/tailwindcss-typography
*/
import { parseVue3 } from "@/core/parse";
import { service } from "@/core/service";

function handleVue3(code, mainJS) {
  const { __filename, __scopeId, App, render, styles } = parseVue3(code);

  const htmlStr = `<div id="app"></div>
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.js"
    }
  }
</script>`;

  const jsStr = mainJS.replace(
    /import\s+App\s+from\s+(["'])(App\.vue)\1\s*(?:;|$)/g,
    `import App from "${App}";
App.__filename = "${__filename}";
${__scopeId ? `App.__scopeId = "data-v-${__scopeId}";` : ""}

${
  render
    ? `import { render } from "${render}";
App.render = render;`
    : ""
}`
  );

  return {
    htmlStr,
    jsStr,
    cssStr: styles.map((style) => `<style>${style}</style>`).join("\n"),
  };
}

function generateHTML(htmlStr, cssStr, jsStr) {
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

      <script type='module'>${jsStr}<\/script>
    </body>
    </html>
  `;
}

export default function useEditors(previewID) {
  const editorRef = ref(null);

  const loading = ref(false);

  onMounted(() => {
    // service();

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

    let fullHTML;

    if (vueCode) {
      const { htmlStr, cssStr, jsStr } = handleVue3(vueCode, jsCode);
      fullHTML = generateHTML(htmlStr, cssStr, jsStr);
    } else if (jsCode) {
      fullHTML = generateHTML(htmlCode, `<style>${cssCode}</style>`, jsCode);
    }

    const previewFrame = document.getElementById(previewID);
    previewFrame.srcdoc = fullHTML;
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
