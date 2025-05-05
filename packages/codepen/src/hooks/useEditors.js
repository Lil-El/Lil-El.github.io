// TODO: pure 模式；
// TODO: jquery 代码演示；
// TODO: md/json 解析展示；
// TODO: 上面：组件，下面：代码； 组件；
// https://code.juejin.cn/pen/7500890847232294950
import * as sfc from "vue/compiler-sfc";
const { parse } = sfc;
console.log(sfc);

function generateHTML(htmlStr = "", cssStr = "", jsStr = "", config = {}) {
  const cssLinks = config.css?.links?.filter((i) => i.length) || [];

  const jsLinks = config.javascript?.links?.filter((i) => i.length) || [];
  const esm = config.javascript?.esm || false;

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Code Preview</title>
      ${cssLinks?.map((link) => `<link rel="stylesheet" href="${link}" />`).join("")}
      <style>${cssStr}</style>
    </head>
    <body>
      ${htmlStr}

      ${jsLinks?.map((link) => `<script src="${link}" ${esm ? "type='module'" : ""}></script>`).join("")}

      <script type="${esm ? "module" : ""}">
        ${jsStr}
      <\/script>
    </body>
    </html>
  `;
}

function extractVueImports(scriptContent) {
  const importRegex = /import\s*{([^}]*)}\s*from\s*["']vue["']/g;
  const matches = [...scriptContent.matchAll(importRegex)];

  if (matches.length === 0) return [];

  // 提取导入的变量
  const imports = matches[0][1]
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item);

  return imports;
}

function removeVueImports(scriptContent) {
  return scriptContent.replace(/import\s*{([^}]*)}\s*from\s*["']vue["']\s*;?\s*/g, "");
}

function collectBasicBindings(scriptContent) {
  // 1. 预处理：移除注释和字符串内容，避免误匹配
  const cleanCode = scriptContent
    .replace(/\/\/.*$/gm, "") // 移除单行注释
    .replace(/\/\*[\s\S]*?\*\//g, "") // 移除多行注释
    .replace(/`[\s\S]*?`/g, "") // 移除模板字符串
    .replace(/'[\s\S]*?'/g, "") // 移除单引号字符串
    .replace(/"[\s\S]*?"/g, ""); // 移除双引号字符串

  // 2. 定义匹配规则
  const patterns = [
    // 匹配 const/let 变量声明: const x = ... 或 let y = ...
    /(?:const|let)\s+([a-zA-Z_$][\w$]*)\s*(?=[=;,\n])/g,

    // 匹配函数声明: function myFunc() {...}
    /function\s+([a-zA-Z_$][\w$]*)\s*\(/g,

    // 匹配解构赋值: const { a, b: c } = ...
    /const\s*{([^}]+)}\s*=/g,
    /let\s*{([^}]+)}\s*=/g,

    // 数组解构: const [a, b] = ...
    /const\s*\[([^\]]+)\]\s*=/g,
    /let\s*\[([^\]]+)\]\s*=/g,
  ];

  const bindings = new Set();

  // 3. 执行匹配
  patterns.forEach((pattern) => {
    let match;
    while ((match = pattern.exec(cleanCode)) !== null) {
      if (match[1].includes(",")) {
        // 处理解构情况（const { a, b }）
        match[1].split(",").forEach((item) => {
          const name = item
            .trim()
            .split(":")[0] // 处理别名 { b: c } → 取 b
            .split("=")[0] // 处理默认值 { a = 1 } → 取 a
            .trim();
          if (name) bindings.add(name);
        });
      } else {
        // 普通变量/函数名
        bindings.add(match[1].trim());
      }
    }
  });

  return Array.from(bindings);
}

function generateHTMLByVue(vueStr, config = {}) {
  const { descriptor } = parse(vueStr, { filename: "App.vue" });
  // const vueConfig = config.vue;
  console.log(descriptor);

  let scriptContent = descriptor.script?.content || descriptor.scriptSetup?.content;

  if (descriptor.script) {
    scriptContent = scriptContent.replace(/export default/, "");
  }

  const imports = extractVueImports(scriptContent);

  scriptContent = removeVueImports(scriptContent);

  const bindings = collectBasicBindings(scriptContent);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Code Preview</title>
      <style>${descriptor.styles.map((s) => s.content).join("\n")}</style>
    </head>
    <body>
      <div id="app"></div>


      <script type="importmap">
        {
          "imports": {
            "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
          }
        }
      </script>
      <script type="module">
        import { createApp, ${imports.join(",")} } from "vue";

        const app = createApp({
          template: \`${descriptor.template.content}\`,

          ${
            descriptor.script
              ? `...${scriptContent}`
              : `setup() {
                  ${scriptContent}

                  return { ${bindings.join(",")} };
                }`
          }
        });

        app.mount('#app');

      </script>
    </body>
    </html>`;
}

function _save(id, data) {
  localStorage.setItem(id, JSON.stringify(data));
}

export default function useEditors(previewID) {
  const editorRef = ref(null);

  onMounted(() => {
    run();
  });

  function save() {
    const editors = editorRef.value;

    const updateTime = Math.max(...editors.map((editor) => editor.updateTime));
    const focusEditor = editors.find((editor) => editor.updateTime === updateTime);

    _save(focusEditor.getData().id, focusEditor.getData());

    editors.forEach((e) => e.updateCache());
  }

  function run() {
    const editors = editorRef.value;
    if (!editors) return void 0;

    const htmlEditor = editors.find((e) => e.getData().suffix === "html");
    const cssEditor = editors.find((e) => e.getData().suffix === "css");
    const jsEditor = editors.find((e) => e.getData().suffix === "javascript");
    const vueEditor = editors.find((e) => e.getData().suffix === "vue");
    const txtEditor = editors.find((e) => e.getData().suffix === "txt");

    const htmlCode = htmlEditor ? htmlEditor.getData().code : "";
    const cssCode = cssEditor ? cssEditor.getData().code : "";
    const jsCode = jsEditor ? jsEditor.getData().code : "";
    const vueCode = vueEditor ? vueEditor.getData().code : "";
    const txtCode = txtEditor ? txtEditor.getData().code : "";

    let fullHTML;

    if (jsCode) {
      const cssConfig = cssEditor ? cssEditor.getData().setting : {};
      const jsConfig = jsEditor ? jsEditor.getData().setting : {};

      fullHTML = generateHTML(htmlCode, cssCode, jsCode, { css: cssConfig, javascript: jsConfig });
    } else if (vueCode) {
      const vueConfig = vueEditor ? vueEditor.getData().setting : {};

      fullHTML = generateHTMLByVue(vueCode, { vue: vueConfig });
    } else if (txtCode) {
      fullHTML = generateHTML(txtCode.replace(/\n/g, "<br/>"));
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
