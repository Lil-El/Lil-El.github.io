import { parse, compileScript, compileStyle, compileTemplate } from "vue/compiler-sfc";
import * as babel from "@babel/standalone";

export function parseVue3(code) {
  const { descriptor } = parse(code, {
    filename: "App.vue",
  });

  const scopedId = descriptor.styles.some((c) => c.scoped) ? Math.random().toString(36).substring(2, 10) : undefined;

  const styles = descriptor.styles.map((style) => {
    if (scopedId)
      return compileStyle({
        id: scopedId,
        source: style.content,
        scoped: !!style.scoped,
        sourceMap: false,
        isProd: true,
      }).code;
    else return style.content;
  });

  const { content: App } = compileScript(descriptor, {
    id: scopedId,
    genDefaultAs: false,
    inlineTemplate: !!descriptor.scriptSetup,
    transformAssetUrls: true,
    sourceMap: false,
    isProd: true,
  });

  let render = null;
  if (!descriptor.scriptSetup) {
    render = compileTemplate({
      id: scopedId,
      filename: descriptor.filename,
      source: descriptor.template.content,
      scoped: !!scopedId,
      slotted: descriptor.slotted,
      isProd: true,
    }).code;
  }

  return {
    __filename: descriptor.filename,
    __scopeId: scopedId,
    App: App,
    render: render ? render : null,
    styles,
  };
}
export function parseReact(code, filename) {
  const { code: compiled } = babel.transform(code, {
    presets: ["react"],
    filename,
  });
  return compiled;
}

export function btoaUtf8(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary);
}

export function atobUtf8(str) {
  const binary = atob(str).split("");
  const bytes = new Uint8Array(binary.length);
  binary.forEach((byte, i) => (bytes[i] = byte.charCodeAt(0)));
  return new TextDecoder().decode(bytes);
}
