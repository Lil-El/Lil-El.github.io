<template>
  <div class="code-pen">
    <header class="code-pen-header">
      <div class="header-left"></div>
      <div class="header-right">
        <m-select icon="layout" v-model="layout">
          <m-select-option :value="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="arco-icon" style="stroke: transparent; font-weight: 400; font-size: 28px">
              <path class="active"
                d="M24.1348 22.1323C24.1348 22.4195 23.902 22.6523 23.6148 22.6523L4.37477 22.6523C4.08758 22.6523 3.85476 22.4195 3.85476 22.1323L3.85477 10.6632L24.1348 10.6632L24.1348 22.1323Z">
              </path>
              <path class="active"
                d="M18.0427 5.29297L23.6148 5.29297C23.902 5.29297 24.1348 5.52578 24.1348 5.81297L24.1348 9.74831L18.0427 9.74831L18.0427 5.29297Z">
              </path>
              <path class="active"
                d="M10.9504 5.29297L17.0426 5.29297L17.0426 9.74831L10.9504 9.74831L10.9504 5.29297Z"></path>
              <path class="active"
                d="M3.8584 9.74792L3.8584 5.81292C3.8584 5.52574 4.09121 5.29292 4.3784 5.29292L9.95052 5.29292L9.95052 9.74792L3.8584 9.74792Z">
              </path>
              <path class="normal" style="fill: hsla(0, 0%, 100%, 0.9)" fill-rule="evenodd" clip-rule="evenodd"
                d="M4.77539 9.66406V6.21094H9.95117V9.66406H4.77539ZM10.9512 9.66406V6.21094H17.043V9.66406H10.9512ZM18.043 9.66406H23.1348V6.21094H18.043V9.66406ZM4.77539 10.6641V21.625H23.1348V10.6641H4.77539ZM3.77539 5.73094C3.77539 5.44375 4.0082 5.21094 4.29539 5.21094H23.6148C23.902 5.21094 24.1348 5.44375 24.1348 5.73094V22.105C24.1348 22.3922 23.902 22.625 23.6148 22.625H4.29539C4.0082 22.625 3.77539 22.3922 3.77539 22.105V5.73094Z">
              </path>
            </svg>
          </m-select-option>
          <m-select-option :value="false">
            <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="arco-icon" style="stroke: transparent; font-weight: 400; font-size: 28px">
              <path class="active"
                d="M23.5933 5.32031C23.8805 5.32031 24.1133 5.55312 24.1133 5.84031L24.1133 22.1597C24.1133 22.4469 23.8805 22.6797 23.5933 22.6797L10.7072 22.6797L10.7072 5.32031L23.5933 5.32031Z">
              </path>
              <path class="active"
                d="M3.8418 10.5L3.8418 5.83999C3.8418 5.55281 4.07461 5.31999 4.3618 5.31999L9.72656 5.31999L9.72656 10.5L3.8418 10.5Z">
              </path>
              <path class="active"
                d="M9.72656 22.6797L4.36224 22.6797C4.07506 22.6797 3.84224 22.4469 3.84224 22.1597L3.84224 17.5038L9.72656 17.5038L9.72656 22.6797Z">
              </path>
              <path class="active" d="M3.8418 16.5234L3.8418 11.4795L9.72656 11.4795L9.72656 16.5234L3.8418 16.5234Z">
              </path>
              <path class="normal" style="fill: hsla(0, 0%, 100%, 0.9)" fill-rule="evenodd" clip-rule="evenodd"
                d="M23.1133 6.71094L23.1133 22.125L10.6113 22.125L10.6113 6.71094L23.1133 6.71094ZM9.61133 5.71094L10.6113 5.71094L23.5933 5.71094C23.8805 5.71094 24.1133 5.94375 24.1133 6.23094L24.1133 22.605C24.1133 22.8922 23.8805 23.125 23.5933 23.125L4.27391 23.125C3.98672 23.125 3.75391 22.8922 3.75391 22.605L3.75391 17.9102L3.74654 17.9102L3.74654 16.9102L3.75391 16.9102L3.75391 11.8867L3.74654 11.8867L3.74654 10.8867L3.75391 10.8867L3.75391 6.23094C3.75391 5.94375 3.98672 5.71094 4.27391 5.71094L9.61133 5.71094ZM4.75391 11.8867L4.75391 16.9102L9.61133 16.9102L9.61133 11.8867L4.75391 11.8867ZM9.61133 10.8867L4.75391 10.8867L4.75391 6.71094L9.61133 6.71094L9.61133 10.8867ZM4.75391 22.125L4.75391 17.9102L9.61133 17.9102L9.61133 22.125L4.75391 22.125Z">
              </path>
            </svg>
          </m-select-option>
        </m-select>
      </div>
    </header>
    <main class="code-pen-body">
      <div class="code-pen-sidebar"></div>
      <div class="code-pen-main">
        <splitpanes ref="SplitPanesRef" class="default-theme" :horizontal="layout" :vertical="!layout" @resize="onResize">
          <pane min-size="3">
            <splitpanes class="default-theme" :horizontal="!layout" :vertical="layout">
              <pane v-for="(e, i) in editors" :key="i" min-size="3">
                <editor :language="e.language" :code="e.code" />
              </pane>
            </splitpanes>
          </pane>
          <pane>
            <div class="code-pen-view"></div>
          </pane>
        </splitpanes>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import editor from "./editor.vue";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import MSelect from "./select.vue";
import MSelectOption from "./select-option.vue";

defineProps({
  editors: Array,
});

const layout = ref(true)

const SplitPanesRef = ref(null);

function onResized(data) {
  console.log(SplitPanesRef.value);
}
</script>

<style scoped>
.code-pen {
  width: 100%;
  height: 100%;
  background-color: #1e1f1c;

  .code-pen-header {
    width: 100%;
    height: 64px;
    background-color: #1e1f1c;
    border-bottom: 1px solid #666666;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .header-right {
      display: flex;
      justify-content: right;
      align-items: center;
      gap: 14px;
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
</style>
