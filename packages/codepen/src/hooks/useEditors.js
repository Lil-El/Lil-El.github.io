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

function _save(id, language, code) {
  localStorage.setItem(
    id,
    JSON.stringify({
      id,
      language,
      code,
    })
  );
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

    _save(focusEditor.id, focusEditor.language, focusEditor.getCode());

    editors.forEach((e) => e.updateCache());
  }

  function run() {
    const editors = editorRef.value;
    if (!editors) return void 0;

    const htmlEditor = editors.find((e) => e.language === "html");
    const cssEditor = editors.find((e) => e.language === "css");
    const jsEditor = editors.find((e) => e.language === "javascript");

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
