const n=`# Markdown 使用手册 [!toc hide]\r
\r
\`\`\`markdown [!tip:success]\r
- 开发环境\r
  [![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen?logo=node.js&logoColor=green)](https://nodejs.org/)\r
  [![Vite](https://img.shields.io/badge/Vite-6%2B-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)\r
  [![Vue](https://img.shields.io/badge/Vue-3%2B-4FC08D?logo=vue.js&logoColor=42b883)](https://vuejs.org/)\r
\r
- 核心工具\r
  [![unified](https://img.shields.io/npm/v/unified?color=3498db&label=unified)](https://unifiedjs.com)\r
  [![monaco](https://img.shields.io/npm/v/monaco-editor?color=0078d7&label=monaco)](https://microsoft.github.io/monaco-editor/)\r
\r
- Profile\r
  [![GitHub](https://img.shields.io/badge/GitHub-lil--el-00bcff?logo=github)](https://github.com/lil-el)\r
  [![Pages](https://img.shields.io/badge/GitHub%20Pages-lil--el.github.io-00bcff?logo=github)](https://lil-el.github.io)\r
  [![CSDN](https://img.shields.io/badge/CSDN-Mino吖-f00?logo=csdn&logoColor=f2522f)](https://blog.csdn.net/qq_36157085)\r
\`\`\`\r
\r
---\r
\r
# Markdown\r
\r
## 内置语法\r
\r
**支持**\r
\r
- 标题：使用 \`#、##、###、...\` 创建标题;\r
- 分割线：使用 \`---\` 创建分割线；\r
- 列表\r
  - 有序列表：使用 \`1. 2. 3.\` 创建有序列表；\r
  - 无序列表：使用 \`-、*、+\` 创建列表；\r
- 链接\r
  - 使用 \`[text](url)\` 创建链接；\r
  - 或者 \`[text][id]\`，需要定义参考式链接（\`[marxi]: https://marxi.co\`）;\r
  - 如果不需要文字代替，可以直接写 **url** 会自动创建链接，例如：https://marxi.co/\r
- 图片：使用 \`![text](url)\` 创建图片；\r
- 引用：使用 \`>\` 创建引用；\r
- 代码块：使用 \` \`\`\` \` 创建代码块，额外支持 \`vue\`、\`ts\` 等;\r
- 文字\r
  - 粗体：使用 \`**text**\` 或 \`__text__\`；例如：**text**\r
  - 斜体：使用 \`*text*\` 或 \`_text_\`；例如：_text_\r
- 删除线：使用 \`~~text~~\`; 例如：~~text~~\r
- 任务列表\r
  - 使用 \`- [ ]\` 创建任务列表；\r
  - 使用 \`- [x]\` 创建已完成任务列表；\r
- 表格：使用 \`|\` 分割列，使用 \`---\` 分割表头和表体;\r
- 动态徽章：使用 \`[![text](url)](url)\` 创建动态徽章；具体见 [shields.io](https://shields.io/)\r
- HTML: 支持 html 标签\r
\r
**暂不支持**\r
\r
- 数学公式\r
- 流程图\r
- TOC 目录\r
\r
## 扩展语法\r
\r
对 Markdown 进行自定义扩展\r
\r
1. 文档目录：自动解析标题并生成目录。对于不想展示在目录中的标题，可以在标题后加 \`[!toc hide]\`;\r
\r
   \`\`\`markdown\r
   # 标题 [!toc hide]\r
   \`\`\`\r
\r
2. \`tip\` 提示块：使用 \`[!tip:type]\` 创建提示块；\r
\r
3. \`title\` 代码块：使用 \`[!title:name]\` 创建标题代码块；\r
\r
4. \`vue\` 组件：使用 \`[!vue:name:height]\` 调用组件；\r
\r
   > 高度不是必须的。例如：\r
   >\r
   > - \`[!vue:helloworld:300]\`\r
   > - \`[!vue:HelloWorld]\`\r
\r
5. \`notation\` 标注：使用 \`[text](!notation:type:color)\` 创建标注；\r
\r
   > 颜色不是必须的。例如：\r
   >\r
   > - \`[text](!notation:box)\`\r
   > - \`[text](!notation:underline:red)\`\r
\r
# 演示\r
\r
## \`vue\` 组件\r
\r
### 1. helloworld\r
\r
\`\`\`vue [!title:helloworld.vue]\r
<template>\r
  <div @click="hello">{{ msg }}</div>\r
</template>\r
\r
<script setup>\r
defineProps({\r
  msg: {\r
    type: String,\r
    default: "Hello World",\r
  },\r
});\r
function hello() {\r
  alert("hello world");\r
}\r
<\/script>\r
\`\`\`\r
\r
**使用**\r
\r
\`\`\`\`markdown\r
\`\`\`json [!vue:helloworld]\r
{\r
  "msg": "点我试试...",\r
  "style": "color: red; cursor: pointer;"\r
}\r
\`\`\`\r
\`\`\`\`\r
\r
**运行效果**\r
\r
\`\`\`json [!vue:helloworld]\r
{\r
  "msg": "点我试试...",\r
  "style": "color: red; cursor: pointer;"\r
}\r
\`\`\`\r
\r
### 2. codepen\r
\r
\`\`\`json [!vue:codepen:430]\r
{\r
  "title": "Hello Codepen",\r
  "author": "Mino",\r
  "date": "2025/5/23",\r
  "project": "html",\r
  "editors": {\r
    "html": {\r
      "id": 1,\r
      "code": "<div id='hello'>点我试试吧!</div>"\r
    },\r
    "css": {\r
      "id": 2,\r
      "code": "#hello { color: red; }"\r
    },\r
    "javascript": {\r
      "id": 3,\r
      "code": "function hello() {\\n  alert('Hello world!');\\n}\\n\\nconst ele = document.getElementById('hello');\\n\\nele.addEventListener('click', hello);"\r
    }\r
  }\r
}\r
\`\`\`\r
\r
## \`tip\` 提示块\r
\r
**type 类型：[info、warning、danger、success、primary](!notation:highlight:yellow)**\r
\r
**使用**\r
\r
\`\`\`\`markdown\r
\`\`\`markdown [!tip:primary]\r
这是一个 \`tip\` 提示块\r
\r
[百度一下](https://www.baidu.com)\r
\`\`\`\r
\`\`\`\`\r
\r
**运行效果**\r
\r
\`\`\`markdown [!tip:primary]\r
这是一个 \`tip\` 提示块\r
\r
[百度一下](https://www.baidu.com)\r
\`\`\`\r
\r
## \`title\` 代码块\r
\r
**使用**\r
\r
\`\`\`\`markdown\r
\`\`\`javascript [!title:main.js]\r
function hello() {\r
  console.log("Hello World");\r
}\r
\`\`\`\r
\`\`\`\`\r
\r
**运行效果**\r
\r
\`\`\`javascript [!title:main.js]\r
function hello() {\r
  console.log("Hello World");\r
}\r
\`\`\`\r
\r
## \`notation\` 标注\r
\r
**type 类型：[underline、box、circle、highlight、strike-through、crossed-off](!notation:underline:yellowgreen)**\r
\r
**color 颜色：默认黑色，[非必填](!notation:circle:red)**\r
\r
**使用**\r
\r
\`\`\`markdown\r
Hello, [This is a notation demo](!notation:underline)!\r
Hello, [This is a notation demo](!notation:box:cyan)!\r
Hello, [This is a notation demo](!notation:circle:green)!\r
Hello, [This is a notation demo](!notation:highlight:yellow)!\r
Hello, [This is a notation demo](!notation:strike-through:red)!\r
Hello, [This is a notation demo](!notation:crossed-off:red)!\r
\`\`\`\r
\r
**运行效果**\r
\r
Hello, [This is a notation demo](!notation:underline)!\r
\r
Hello, [This is a notation demo](!notation:box:cyan)!\r
\r
Hello, [This is a notation demo](!notation:circle:green)!\r
\r
Hello, [This is a notation demo](!notation:highlight:yellow)!\r
\r
Hello, [This is a notation demo](!notation:strike-through:red)!\r
\r
Hello, [This is a notation demo](!notation:crossed-off:red)!\r
\r
[marxi]: https://marxi.co\r
`;export{n as d};
