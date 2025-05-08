// TODO: md 解析展示；
// TODO: 组件 代码预览 组件；
// TODO: vue3 和 饿了么UI使用
// https://code.esm.sh/ 主题颜色设置；
// serviceWorker App.vue
// MD解析移动新的package中，editor仅运行代码
// 全局使用tailwindcss，网站首页使用termino.js，界面参考floating-ui.com
// Termino.js
// https://floating-ui.com/docs/getting-started 代替 select 组件
// https://code.juejin.cn/pen/7500890847232294950
// select 组件封装到全局 @lil-el/ui 设置浅色、深色样式; select 组件的点击事件优化，避免弹的太多；
/*
https://juejin.cn/post/7344697321798500392
https://github.com/GeoffSelby/tailwind-highlightjs
https://github.com/tailwindlabs/tailwindcss-typography
*/
import { parse, compileScript, compileStyle, compileTemplate } from "vue/compiler-sfc";

function persistence(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function btoaUtf8(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary);
}

function parseVue(code, mainJS) {
  const { descriptor } = parse(code, {
    filename: "App.vue",
  });

  const scopedId = descriptor.styles.some((c) => c.scoped) ? Math.random().toString(36).substring(2, 10) : undefined;

  const htmlStr = `<div id="app"></div>
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3.5.13/dist/vue.esm-browser.js"
    }
  }
</script>`;

  const cssStr = descriptor.styles.map((style) => {
    const { code } = compileStyle({
      id: scopedId,
      source: style.content,
      scoped: !!style.scoped,
      sourceMap: false,
    });
    return code;
  });

  const { content: App } = compileScript(descriptor, {
    id: scopedId,
    genDefaultAs: false,
    inlineTemplate: !!descriptor.scriptSetup,
    transformAssetUrls: true,
    sourceMap: false,
  });

  let render = null;
  if (!descriptor.scriptSetup) {
    const res = compileTemplate({
      id: scopedId,
      filename: descriptor.filename,
      source: descriptor.template.content,
      scoped: !!scopedId,
      slotted: descriptor.slotted,
    });
    render = res.code;
  }

  const jsStr = mainJS.replace(
    /import\s+App\s+from\s+(["'])(App\.vue)\1\s*(?:;|$)/g,
    `import App from "data:text/javascript;base64,${btoaUtf8(App)}";
App.__file = "${descriptor.filename}";
App.__scopeId = "data-v-${scopedId}";
${
  render
    ? `import { render } from "data:text/javascript;base64,${btoaUtf8(render)}";
App.render = render;`
    : ""
}`
  );

  return {
    htmlStr,
    jsStr,
    cssStr,
  };
}

function generateHTML(htmlStr = "", cssList = [], jsStr = "", config = {}) {
  const cssLinks = config.css?.links?.filter((i) => i.length) || [];

  const jsLinks = config.javascript?.links?.filter((i) => i.length) || [];

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Code Preview</title>
      ${cssLinks?.map((link) => `<link rel="stylesheet" href="${link}" />`).join("")}
      ${cssList?.map((style) => `<style>${style}</style>`).join("")}
    </head>
    <body>
      ${htmlStr}

      ${jsLinks?.map((link) => `<script src="${link}" type='module'></script>`).join("")}

      <script type='module'>${jsStr}<\/script>
    </body>
    </html>
  `;
}

export default function useEditors(previewID) {
  const editorRef = ref(null);

  onMounted(run);

  function save() {
    const editors = editorRef.value;

    const updateTime = Math.max(...editors.map((editor) => editor.updateTime));
    const focusEditor = editors.find((editor) => editor.updateTime === updateTime);

    persistence(focusEditor.getData().id, focusEditor.getData());

    editors.forEach((e) => e.updateCache());
  }

  function run() {
    const editors = editorRef.value;
    if (!editors) return void 0;

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
      const { htmlStr, cssStr, jsStr } = parseVue(vueCode, jsCode);
      fullHTML = generateHTML(htmlStr, cssStr, jsStr);
    } else if (jsCode) {
      fullHTML = generateHTML(htmlCode, [cssCode], jsCode);
    }

    const previewFrame = document.getElementById(previewID);
    previewFrame.srcdoc = fullHTML;
  }

  function reset() {
    const editors = editorRef.value;

    editors.forEach((editor) => {
      editor.reset();
    });
  }

  return {
    editorRef,
    reset,
    save,
    run,
  };
}
