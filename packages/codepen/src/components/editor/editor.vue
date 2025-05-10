<template>
  <div class="editor" v-bind="attrs">
    <div class="editor-header">
      <div class="header-left" :title="state.name">
        <slot name="header" v-bind="state">
          <img :src="getSVG(state.icon)" width="16" draggable="false" />
          <span>{{ state.name }}</span>
        </slot>
      </div>
      <div class="header-right">
        <img
          v-show="cache"
          :src="getSVG('refresh')"
          width="15"
          draggable="false"
          title="重置"
          @click="
            reset();
            emit('run');
          "
        />
      </div>
    </div>
    <div class="editor-body">
      <div ref="editorRef" class="editor-panel"></div>
    </div>
  </div>
</template>

<script setup>
import { getSVG } from "@/utils";

import { cloneDeep } from "lodash";
import * as monaco from "monaco-editor";

const attrs = useAttrs();

const props = defineProps({
  data: Object,
});

const emit = defineEmits(["run"]);

const cache = ref(false);

// id, name, icon, suffix, language, code
const state = reactive({
  ...(localStorage.getItem(props.data.id) ? JSON.parse(localStorage.getItem(props.data.id)) : cloneDeep(props.data)),
});

let editor = null;

const editorRef = ref(null);

onMounted(() => {
  updateCache();

  // #region 自定义代码补全
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

  // 自定义主题
  monaco.editor.defineTheme("mino-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {},
  });

  // 创建编辑器实例
  editor = monaco.editor.create(editorRef.value, {
    language: state.language,
    // theme: "mino-theme",
    theme: "vs-dark",
    fontFamily: "MapleMono",
    fontLigatures: true,
    automaticLayout: true, // 自动布局
    wordWrap: "on", // 自动换行
    scrollBeyondLastLine: false, // 滚动超过最后一行时，是否继续滚动
    readOnly: false,
    minimap: {
      enabled: true,
    },
    value: state.code,
  });

  // 自动格式化代码
  editor.getAction("editor.action.formatDocument").run();

  // focus 事件
  editor.onDidFocusEditorWidget(() => {});

  // blur 事件
  editor.onDidBlurEditorWidget(() => {});

  // #region
  // addCommand 会覆盖所有, 只有最后一个editor的command生效
  // editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
  //   console.log(state.id); // 每次输出的都是最后一个的id
  //   emit("saveAndRun");
  // });
  // #endregion

  // addAction 不会覆盖, 每个都是独立的
  editor.addAction({
    id: `save-${state.id}`,
    label: `Save-${state.id}`,
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
    run: () => {
      save(state.id, getData());
      emit("run");
    },
  });

  // 运行：快捷键（会覆盖所有 editor）
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyR, () => {
    emit("run");
  });
});

function reset() {
  localStorage.removeItem(state.id);
  editor.setValue(props.data.code);
  updateCache();
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  updateCache();
}

function getData() {
  return {
    ...state,
    code: editor.getValue(),
  };
}

function updateCache() {
  cache.value = !!localStorage.getItem(state.id);
}

onUnmounted(() => {
  editor.dispose();
});

defineExpose({
  getData,
  reset,
  updateCache,
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
