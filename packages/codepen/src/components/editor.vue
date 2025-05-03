<template>
  <div class="editor">
    <div class="editor-header">
      <div class="header-left" :title="language">
        <img :src="`/src/assets/${language.toLowerCase()}.svg`" width="16" draggable="false" />
        <span>{{ language }}</span>
      </div>
      <div class="header-right">
        <img
          v-show="cache"
          src="/src/assets/refresh.svg"
          width="15"
          draggable="false"
          title="重置"
          @click="clearAndRun"
        />
        <img src="/src/assets/setting.svg" width="16" draggable="false" @click="showModal = true" />
      </div>
    </div>
    <div class="editor-body">
      <div ref="editorRef" class="editor-panel"></div>
    </div>
  </div>

  <m-modal title="设置" v-model:show="showModal">123123</m-modal>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import * as monaco from "monaco-editor";
import MModal from "./modal.vue";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["saveAndRun", "run"]);

let data = props.data;

const cache = ref(!!localStorage.getItem(props.data.id));

if (localStorage.getItem(props.data.id)) {
  data = JSON.parse(localStorage.getItem(props.data.id));
} else {
  data = {
    id: props.data.id,
    language: props.data.language,
    code: props.data.code,
  };
}

const { id, language, code } = data;

let editor = null;

const focusTime = ref(0);

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

  editor = monaco.editor.create(editorRef.value, {
    language: language.toLowerCase(),
    theme: "vs-dark",
    automaticLayout: true,
    readOnly: false,
    minimap: {
      enabled: true,
    },
    value: code,
  });

  editor.onDidFocusEditorWidget(() => {
    focusTime.value = Date.now();
  });

  editor.onDidBlurEditorWidget(() => {
    cache.value = !!localStorage.getItem(props.data.id);
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

function clear() {
  localStorage.removeItem(id);
  cache.value = false;
  editor.setValue(props.data.code);
}

function clearAndRun() {
  clear();
  emit("run");
}

onUnmounted(() => {
  editor.dispose();
});

defineExpose({
  focusTime,
  id,
  language: language.toLowerCase(),
  getCode: () => {
    return editor.getValue();
  },
  clear,
});
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
  background-color: #272822;
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
