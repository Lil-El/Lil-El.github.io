<template>
  <div class="code-pen">
    <header class="code-pen-header">
      <div class="header-left">
        <svg
          t="1746282283426"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="26586"
          data-spm-anchor-id="a313x.search_index.0.i1.18633a81Xs7Bal"
          width="56"
        >
          <path
            d="M736.938667 370.56a42.666667 42.666667 0 1 1 62.122666-58.453333l170.666667 181.333333a42.666667 42.666667 0 0 1 0 58.453333l-170.666667 181.333334a42.666667 42.666667 0 0 1-62.122666-58.453334l143.146666-152.106666-143.146666-152.106667z m-449.877334 0L143.914667 522.666667l143.146666 152.106666a42.666667 42.666667 0 0 1-62.122666 58.453334l-170.666667-181.333334a42.666667 42.666667 0 0 1 0-58.453333l170.666667-181.333333a42.666667 42.666667 0 0 1 62.122666 58.453333z"
            fill="var(--color)"
            p-id="26587"
            data-spm-anchor-id="a313x.search_index.0.i3.18633a81Xs7Bal"
            class="selected"
          ></path>
          <path
            d="M559.130732 171.254372m41.212835 11.042946l0 0q41.212835 11.042946 30.16989 52.255781l-154.601243 576.979694q-11.042946 41.212835-52.255781 30.169889l0 0q-41.212835-11.042946-30.16989-52.255781l154.601243-576.979694q11.042946-41.212835 52.255781-30.169889Z"
            fill="var(--color)"
            opacity=".3"
            p-id="26588"
            data-spm-anchor-id="a313x.search_index.0.i2.18633a81Xs7Bal"
            class="selected"
          ></path>
        </svg>
        <div class="code-info">
          <div class="title">{{ title }}</div>
          <div class="info">
            <span
              >By <span style="color: var(--color)">{{ author }}</span></span
            >
            <span>{{ date }}</span>
          </div>
        </div>
      </div>
      <div class="header-right">
        <m-select type="cell" icon="theme" popup="bottom" v-model="theme" @change="setTheme">
          <m-select-option v-for="t in getAllThemes()" :key="t.value" :value="t.value">
            <div class="color-cell" :style="{ backgroundColor: t.color }"></div>
          </m-select-option>
        </m-select>
        <m-select type="cell" icon="layout" popup="bottom" v-model="layout">
          <m-select-option :value="true">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="arco-icon"
              style="stroke: transparent; font-weight: 400; font-size: 28px"
            >
              <path
                class="active"
                d="M24.1348 22.1323C24.1348 22.4195 23.902 22.6523 23.6148 22.6523L4.37477 22.6523C4.08758 22.6523 3.85476 22.4195 3.85476 22.1323L3.85477 10.6632L24.1348 10.6632L24.1348 22.1323Z"
              ></path>
              <path
                class="active"
                d="M18.0427 5.29297L23.6148 5.29297C23.902 5.29297 24.1348 5.52578 24.1348 5.81297L24.1348 9.74831L18.0427 9.74831L18.0427 5.29297Z"
              ></path>
              <path
                class="active"
                d="M10.9504 5.29297L17.0426 5.29297L17.0426 9.74831L10.9504 9.74831L10.9504 5.29297Z"
              ></path>
              <path
                class="active"
                d="M3.8584 9.74792L3.8584 5.81292C3.8584 5.52574 4.09121 5.29292 4.3784 5.29292L9.95052 5.29292L9.95052 9.74792L3.8584 9.74792Z"
              ></path>
              <path
                class="normal"
                style="fill: hsla(0, 0%, 100%, 0.9)"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.77539 9.66406V6.21094H9.95117V9.66406H4.77539ZM10.9512 9.66406V6.21094H17.043V9.66406H10.9512ZM18.043 9.66406H23.1348V6.21094H18.043V9.66406ZM4.77539 10.6641V21.625H23.1348V10.6641H4.77539ZM3.77539 5.73094C3.77539 5.44375 4.0082 5.21094 4.29539 5.21094H23.6148C23.902 5.21094 24.1348 5.44375 24.1348 5.73094V22.105C24.1348 22.3922 23.902 22.625 23.6148 22.625H4.29539C4.0082 22.625 3.77539 22.3922 3.77539 22.105V5.73094Z"
              ></path>
            </svg>
          </m-select-option>
          <m-select-option :value="false">
            <svg
              width="28"
              height="29"
              viewBox="0 0 28 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="arco-icon"
              style="stroke: transparent; font-weight: 400; font-size: 28px"
            >
              <path
                class="active"
                d="M23.5933 5.32031C23.8805 5.32031 24.1133 5.55312 24.1133 5.84031L24.1133 22.1597C24.1133 22.4469 23.8805 22.6797 23.5933 22.6797L10.7072 22.6797L10.7072 5.32031L23.5933 5.32031Z"
              ></path>
              <path
                class="active"
                d="M3.8418 10.5L3.8418 5.83999C3.8418 5.55281 4.07461 5.31999 4.3618 5.31999L9.72656 5.31999L9.72656 10.5L3.8418 10.5Z"
              ></path>
              <path
                class="active"
                d="M9.72656 22.6797L4.36224 22.6797C4.07506 22.6797 3.84224 22.4469 3.84224 22.1597L3.84224 17.5038L9.72656 17.5038L9.72656 22.6797Z"
              ></path>
              <path
                class="active"
                d="M3.8418 16.5234L3.8418 11.4795L9.72656 11.4795L9.72656 16.5234L3.8418 16.5234Z"
              ></path>
              <path
                class="normal"
                style="fill: hsla(0, 0%, 100%, 0.9)"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M23.1133 6.71094L23.1133 22.125L10.6113 22.125L10.6113 6.71094L23.1133 6.71094ZM9.61133 5.71094L10.6113 5.71094L23.5933 5.71094C23.8805 5.71094 24.1133 5.94375 24.1133 6.23094L24.1133 22.605C24.1133 22.8922 23.8805 23.125 23.5933 23.125L4.27391 23.125C3.98672 23.125 3.75391 22.8922 3.75391 22.605L3.75391 17.9102L3.74654 17.9102L3.74654 16.9102L3.75391 16.9102L3.75391 11.8867L3.74654 11.8867L3.74654 10.8867L3.75391 10.8867L3.75391 6.23094C3.75391 5.94375 3.98672 5.71094 4.27391 5.71094L9.61133 5.71094ZM4.75391 11.8867L4.75391 16.9102L9.61133 16.9102L9.61133 11.8867L4.75391 11.8867ZM9.61133 10.8867L4.75391 10.8867L4.75391 6.71094L9.61133 6.71094L9.61133 10.8867ZM4.75391 22.125L4.75391 17.9102L9.61133 17.9102L9.61133 22.125L4.75391 22.125Z"
              ></path>
            </svg>
          </m-select-option>
        </m-select>
        <div class="code-button" @click="clear">
          <img src="/src/assets/refresh.svg" width="18" draggable="false" />
          <span>重置</span>
        </div>
        <div class="code-button" @click="run">
          <img src="/src/assets/run.svg" draggable="false" />
          <span>运行</span>
        </div>
      </div>
    </header>
    <main class="code-pen-body">
      <div class="code-pen-sidebar">
        <div class="sidebar-top"></div>
        <div class="sidebar-btm">
          <m-select type="list" icon="info" popup="right">
            <m-select-option>Ctrl + S: 保存并运行</m-select-option>
            <m-select-option>Ctrl + R: 运行</m-select-option>
          </m-select>
        </div>
      </div>
      <div class="code-pen-main">
        <splitpanes class="default-theme" :horizontal="layout" :vertical="!layout">
          <pane min-size="3">
            <splitpanes class="default-theme" :horizontal="!layout" :vertical="layout">
              <pane v-for="(e, i) in editors" :key="e.id" min-size="3">
                <editor ref="editorRef" :data="e" @saveAndRun="saveAndRun" @run="run" />
              </pane>
            </splitpanes>
          </pane>
          <pane>
            <div class="code-pen-view">
              <iframe id="preview" style="width: 100%; height: 100%; border: none" />
            </div>
          </pane>
        </splitpanes>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import editor from "./editor.vue";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import MSelect from "./select.vue";
import MSelectOption from "./select-option.vue";
import useTheme from "@/hooks/useTheme";

const props = defineProps({
  title: String,
  author: String,
  date: String,
  editors: Array,
});

const editorRef = ref(null);

const layout = ref(true);

const { theme, setTheme, getAllThemes } = useTheme();

onMounted(() => {
  document.title = `${props.title} - codepen`;

  run();
});

function saveAndRun() {
  const editors = editorRef.value;

  const focusTime = Math.max(...editors.map((editor) => editor.focusTime));
  const focusEditor = editors.find((editor) => editor.focusTime === focusTime);

  save(focusEditor.id, focusEditor.language, focusEditor.getCode());

  run();
}

function run() {
  const editors = editorRef.value;

  const htmlEditor = editors.find((e) => e.language === "html");
  const cssEditor = editors.find((e) => e.language === "css");
  const jsEditor = editors.find((e) => e.language === "javascript");

  const htmlCode = htmlEditor ? htmlEditor.getCode() : "";
  const cssCode = cssEditor ? cssEditor.getCode() : "";
  const jsCode = jsEditor ? jsEditor.getCode() : "";

  const fullHTML = generateHTML(htmlCode, cssCode, jsCode);

  const previewFrame = document.getElementById("preview");
  previewFrame.srcdoc = fullHTML;
}

function generateHTML(htmlStr, cssStr, jsStr) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Code Preview</title>
      <style>${cssStr}</style>
    </head>
    <body>
      ${htmlStr}
      <script>${jsStr}<\/script>
    </body>
    </html>
  `;
}

function save(id, language, code) {
  localStorage.setItem(
    id,
    JSON.stringify({
      id,
      language,
      code,
    })
  );
}

function clear() {
  const editors = editorRef.value;

  editors.forEach((editor) => {
    editor.clear();
  });

  run();
}
</script>

<style scoped>
.code-pen {
  width: 100%;
  height: 100%;
  background-color: #1e1f1c;
  user-select: none;

  .code-pen-header {
    width: 100%;
    height: 64px;
    background-color: #1e1f1c;
    border-bottom: 1px solid #666666;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .header-left,
    .header-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .header-right {
      justify-content: right;
    }

    .code-info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .title {
        font-size: 16px;
        color: #ffffff;
      }

      .info {
        font-size: 12px;
        color: #999999;
        display: flex;
        gap: 8px;
      }
    }

    .code-button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      width: 68px;
      height: 36px;
      color: #ffffffe6;
      font-size: 16px;
      border-radius: 4px;
      background-color: hsla(0, 0%, 100%, 0.08);
      cursor: pointer;

      &:hover {
        background-color: hsla(0, 0%, 100%, 0.12);
      }
    }
  }

  .code-pen-body {
    display: flex;
    width: 100%;
    height: calc(100% - 64px);

    .code-pen-sidebar {
      flex-shrink: 0;
      width: 48px;
      height: 100%;
      background-color: #272822;
      border-right: 1px solid #666666;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 8px 0;

      .sidebar-top,
      .sidebar-btm {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        justify-content: start;
      }

      .sidebar-btm {
        justify-content: end;
      }
    }

    .code-pen-main {
      width: calc(100% - 48px);
      display: flex;
      flex-direction: column;
      background-color: #333333;
      padding: 8px;

      .code-pen-view {
        width: 100%;
        height: 100%;
        border: 1px solid #666666;
        border-radius: 4px;
        background-color: #ffffff;
      }
    }
  }

  :deep() {
    .splitpanes.default-theme .splitpanes__splitter {
      background-color: transparent;
      border: transparent;
    }

    .splitpanes.default-theme .splitpanes__splitter:before,
    .splitpanes.default-theme .splitpanes__splitter:after {
      background-color: #666666;
    }

    .splitpanes.default-theme .splitpanes__pane {
      background-color: transparent;
    }
  }
}

.color-cell {
  width: 30px;
  height: 30px;
  font-size: 14px;
  border-radius: 4px;
  text-align: center;
  line-height: 28px;
}

:deep() {
  .select-option:hover {
    .arco-icon .normal {
      fill: var(--color) !important;
    }

    .color-cell::after {
      content: "✔";
    }
  }

  .select-option.active {
    .arco-icon {
      fill: var(--color);

      .normal {
        fill: transparent !important;
      }
    }

    .color-cell::after {
      content: "✔";
    }
  }
}
</style>
