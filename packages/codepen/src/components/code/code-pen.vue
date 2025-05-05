<template>
  <div class="code-pen" :class="{ 'is-pure': pure }">
    <header class="code-pen-header">
      <code-info :title="title" :author="author" :date="date" />
      <code-opt v-model:layout="layout" @run="run" @reset="reset" />
    </header>
    <main class="code-pen-body">
      <code-sidebar :init="!editors?.length" @change="handleCodeChange" />

      <div class="code-pen-main" id="code-pen-main">
        <splitpanes :key="layout" class="default-theme" :horizontal="layout" :vertical="!layout">
          <pane min-size="3">
            <splitpanes :key="configs[0]?.id" class="default-theme" :horizontal="!layout" :vertical="layout">
              <template v-if="configs.length === 1 || !single">
                <pane v-for="e in configs" :key="e.id" min-size="3">
                  <editor
                    ref="editorRef"
                    :data="e"
                    @saveAndRun="
                      save();
                      run();
                    "
                    @run="run(true)"
                  />
                </pane>
              </template>
              <template v-else>
                <pane min-size="3" style="display: flex">
                  <el-row type="flex" style="width: 100%">
                    <editor
                      v-for="(e, i) in configs"
                      :key="e.id"
                      ref="editorRef"
                      :data="e"
                      :style="{ order: top === i ? 0 : 1 }"
                      @saveAndRun="
                        save();
                        run();
                      "
                      @run="run(true)"
                    >
                      <template #header="{ name }">
                        <span
                          v-for="(h, j) in configs"
                          :key="h.name"
                          :style="{ color: name === h.name ? `var(--theme-color)` : 'white', cursor: 'pointer' }"
                          @click="top = j"
                          >{{ h.name }}</span
                        >
                      </template>
                    </editor>
                  </el-row>
                </pane>
              </template>
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
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

import editor from "../editor/editor.vue";
import codeSidebar from "./code-sidebar.vue";
import codeInfo from "./code-info.vue";
import codeOpt from "./code-opt.vue";

import useLayout from "@/hooks/useLayout";
import useEditors from "@/hooks/useEditors";
import useTitle from "@/hooks/useTitle";

const props = defineProps({
  title: String,
  author: String,
  date: String,
  editors: Array,
});

const pure = ref(props.editors?.length);

const configs = toRef(props.editors || []);

// single: 是否合并编辑器；pure 时必须合并；
const { layout, single, top } = useLayout("code-pen-main", pure.value);

const { title, author, date, setData } = useTitle(props);

const { editorRef, reset, save, run } = useEditors("preview");

function handleCodeChange(data) {
  const { editors, ...info } = data;

  setData(info);
  configs.value = editors;

  top.value = 0;
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
  }

  .code-pen-body {
    display: flex;
    width: 100%;
    height: calc(100% - 64px);

    .code-pen-main {
      width: calc(100% - 48px);
      flex: 1;
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
        position: relative;
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

.is-pure :deep() {
  .header-right__layout,
  .code-pen-sidebar {
    display: none !important;
  }
  .code-pen-main {
    width: 100%;
  }
}
</style>
