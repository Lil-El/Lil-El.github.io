<template>
  <div id="mmm" @click="run">Click me.</div>
</template>

<script setup>
import * as _compiler from "vue/compiler-sfc";

const codeStr = `
<template>
  <div>{{count}}</div>
</template>
<script setup>
  import { ref } from 'vue'
  const count = ref("Hello World")
<\/script>

<style scoped>
  div {
    color: red;
  }
<\/style>`;

let { descriptor } = _compiler.parse(codeStr);

const scopedId = Math.random().toString(36).substring(2, 10);

const scriptBlock = _compiler.compileScript(descriptor, {
  id: scopedId,
  genDefaultAs: true,
  inlineTemplate: true,
  transformAssetUrls: true,
  sourceMap: false,
});

console.log(scriptBlock);

const style = _compiler.compileStyle({
  id: scopedId,
  source: descriptor.styles[0].content,
  scoped: descriptor.styles[0].scoped,
  sourceMap: false,
});
console.log(style);

const temp = _compiler.compileTemplate({
  id: scopedId,
  source: descriptor.template.content,
  scoped: descriptor.styles[0].scoped,
  slotted: descriptor.slotted,
});
console.log(temp);

function run() {
  console.log("run");
}

// TODO: 博客页面展示 lil-el 目录结构，对应的package对应一个route，该页面展示对应的package的组件
</script>

<style scoped>
#mmm {
  color: red;
}
</style>
