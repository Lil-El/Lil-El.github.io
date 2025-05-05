<template>
  <div class="editor">
    <div class="editor-header">
      <div class="header-left" :title="state.name">
        <img :src="getSVG(state.icon)" width="16" draggable="false" />
        <span>{{ state.name }}</span>
      </div>
      <div class="header-right">
        <img v-show="cache" :src="getSVG('refresh')" width="15" draggable="false" title="重置" @click="reset" />
        <img v-show="state.setting" :src="getSVG('setting')" width="16" draggable="false" @click="handleOpen" />
      </div>
    </div>
    <div class="editor-body">
      <div ref="editorRef" class="editor-panel"></div>
    </div>
  </div>

  <m-modal v-if="state.setting" title="设置" v-model:show="showModal" @close="handleClose">
    <component :is="SettingComponents[state.setting.component]" v-model:data="tempSetting"></component>
  </m-modal>
</template>

<script setup>
import { getSVG } from "@/utils";

import { isEqual, cloneDeep } from "lodash";
import * as monaco from "monaco-editor";
import MModal from "./modal.vue";
import SettingCss from "./setting/setting-css.vue";
import SettingJavascript from "./setting/setting-javascript.vue";
import SettingVue from "./setting/setting-vue.vue";

const SettingComponents = {
  css: SettingCss,
  javascript: SettingJavascript,
  vue: SettingVue,
};

const props = defineProps({
  data: Object,
});

const emit = defineEmits(["saveAndRun", "run"]);

let data = null;

const cache = ref(false);

if (localStorage.getItem(props.data.id)) {
  cache.value = true;
  data = JSON.parse(localStorage.getItem(props.data.id));
} else {
  data = cloneDeep(props.data);
}

// id, name, icon, suffix, language, code, setting
const state = reactive({
  ...data,
});

const tempSetting = ref(null);

let editor = null;

const updateTime = ref(0);

const editorRef = ref(null);

const showModal = ref(false);

onMounted(() => {
  // #endregion
  // 自定义代码补全

  // monaco.languages.registerCompletionItemProvider("javascript", {
  //   provideCompletionItems: function (model, position) {
  //     return {
  //       suggestions: [
  //         {
  //           label: {
  //             label: '"my-third-party-library"',
  //             detail: "description",
  //             description: "ssssdddffff",
  //           },
  //           kind: monaco.languages.CompletionItemKind.Function,
  //           documentation: "Describe your library here",
  //           insertText: "my-third-party-library /n    abcde /n    123123123123",
  //           preselect: true,
  //         },
  //       ],
  //     };
  //   },
  //   resolveCompletionItem(item, token) {
  //     item.documentation = "documentation";
  //     return item;
  //   },
  // });
  // #endregion

  // 创建编辑器实例
  editor = monaco.editor.create(editorRef.value, {
    language: state.language,
    theme: "vs-dark",
    automaticLayout: true,
    readOnly: false,
    minimap: {
      enabled: true,
    },
    value: state.code,
  });

  // 自动格式化代码
  editor.getAction("editor.action.formatDocument").run();

  // focus 事件
  editor.onDidFocusEditorWidget(() => {
    updateTime.value = Date.now();
  });

  // blur 事件
  editor.onDidBlurEditorWidget(() => {
    cache.value = !!localStorage.getItem(state.id);
  });

  // 保存且运行：快捷键（会覆盖所有 editor）
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    emit("saveAndRun");
  });

  // 运行：快捷键（会覆盖所有 editor）
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyR, () => {
    emit("run");
  });
});

function handleOpen() {
  showModal.value = true;
  updateTime.value = Date.now();
  tempSetting.value = cloneDeep(state.setting.value);
}

function handleClose() {
  if (isEqual(tempSetting.value, state.setting.value)) {
    return void 0;
  } else {
    state.setting.value = cloneDeep(tempSetting.value);
    emit("saveAndRun");
  }
}

function reset() {
  if (!cache.value) return void 0;

  localStorage.removeItem(state.id);
  cache.value = false;
  editor.setValue(props.data.code);
  if (props.data.setting) state.setting = cloneDeep(props.data.setting);
}

onUnmounted(() => {
  editor.dispose();
});

defineExpose({
  updateTime,
  getData: () => {
    return {
      ...state,
      code: editor.getValue(),
    };
  },
  reset,
  updateCache: () => {
    cache.value = !!localStorage.getItem(id.value);
  },
});
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
  background-color: #555555;
  box-sizing: border-box;
  color: white;
  font-size: 14px;

  .editor-header {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 13px;
    border-bottom: 1px solid #666666;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left,
    .header-right {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .header-right {
      cursor: pointer;
      gap: 8px;
    }
  }

  .editor-body {
    width: 100%;
    height: calc(100% - 30px);
    background-color: #1e1f1c;
    padding: 8px;
    box-sizing: border-box;
    position: relative;

    .editor-panel {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
