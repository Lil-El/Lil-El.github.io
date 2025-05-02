<template>
  <div class="editor">
    <div class="editor-header">{{ language }}</div>
    <div class="editor-body">
      <div ref="editorRef" class="editor-panel"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import * as monaco from "monaco-editor";

const props = defineProps({
  language: String,
  code: String,
});

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

  const editor = monaco.editor.create(editorRef.value, {
    language: props.language.toLowerCase(),
    theme: "vs-dark",
    automaticLayout: true,
    readOnly: false,
    minimap: {
      enabled: true,
    },
    value: props.code,
  });

  // 自定义指令
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    console.log("代码缓存.", editor.getValue());
  });

  // TODO: iframe 预览
  // const preview = document.getElementById("preview");
  // preview.setAttribute("srcdoc", code);
});

onUnmounted(() => {
  editorRef.value?.dispose();
});
</script>

<style scoped>
.editor {
  width: 100%;
  height: 100%;
  background-color: #272822;
  border: 1px solid #666666;
  box-sizing: border-box;
  color: white;
  font-size: 14px;

  .editor-header {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-left: 8px;
    border-bottom: 1px solid #666666;
    font-weight: bold;
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
