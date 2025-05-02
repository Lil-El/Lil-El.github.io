<template>
  <div class="container">
    <code-pen :editors="editors" />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import CodePen from "./components/code-pen.vue";

const editors = reactive([
  {
    language: "JavaScript",
    code: "function hello() {\n  alert('Hello world!');\n}",
  },
  {
    language: "HTML",
    code: "<div>Hello world!</div>",
  },
  {
    language: "Markdown",
    code: "# Hello world!\n\nThis is a markdown editor.",
  },
]);
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
