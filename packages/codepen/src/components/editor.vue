<template>
  <div class="editor">
    <div class="editor-header" :title="language">
      <img :src="`/src/assets/${language.toLowerCase()}.svg`" width="16" alt="file" draggable="false" />
      <span>{{ language }}</span>
    </div>
    <div class="editor-body">
      <div ref="editorRef" class="editor-panel"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import * as monaco from "monaco-editor";

const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
});

let data = props.data;

if (localStorage.getItem(props.data.id)) {
  data = JSON.parse(localStorage.getItem(props.data.id));
} else {
  data = {
    id: props.data.id,
    language: props.data.language,
    code: props.data.code,
  }
}

const { id, language, code } = data;

const emit = defineEmits(["change"]);

let editor = null;

const editorRef = ref(null);

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
    console.log("focus editor widget", id);
  });

  // 自定义指令（多个指令会被覆盖）
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    // TODO: 保存的不对，可能是因为（多个指令会被覆盖）
    save(id, language, editor.getValue());

    emit("change", id, language, editor.getValue());
  });
});

function save(id, language, code) {
  localStorage.setItem(id, JSON.stringify({
    id,
    language,
    code,
  }));
}

onUnmounted(() => {
  editor.dispose();
});

defineExpose({
  language: language,
  getCode: () => {
    return editor.getValue();
  }
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
    padding-left: 13px;
    border-bottom: 1px solid #666666;
    display: flex;
    align-items: center;
    gap: 14px;
    user-select: none;
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
