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

    const focusTime = Math.max(...editors.map((editor) => editor.focusTime));
    const focusEditor = editors.find((editor) => editor.focusTime === focusTime);

    _save(focusEditor.getData().id, focusEditor.getData());

    editors.forEach((e) => e.updateCache());
  }

  function run() {
    const editors = editorRef.value;
    if (!editors) return void 0;

    const htmlEditor = editors.find((e) => e.getData().language === "html");
    const cssEditor = editors.find((e) => e.getData().language === "css");
    const jsEditor = editors.find((e) => e.getData().language === "javascript");

    const htmlCode = htmlEditor ? htmlEditor.getCode() : "";
    const cssCode = cssEditor ? cssEditor.getCode() : "";
    const jsCode = jsEditor ? jsEditor.getCode() : "";

    const fullHTML = generateHTML(htmlCode, cssCode, jsCode);

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
