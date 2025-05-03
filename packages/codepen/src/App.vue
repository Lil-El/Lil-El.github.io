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
    id: 1,
    language: "JavaScript",
    code: "function hello() {\n  alert('Hello world!');\n}",
  },
  {
    id: 2,
    language: "HTML",
    code: "<div id='hello'>Hello world!</div>",
  }
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
