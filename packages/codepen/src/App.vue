<template>
  <div class="container">
    <code-pen title="Demo 代码演示" author="Mino" date="2025-05-03" :editors="editors" />
  </div>
</template>

<script setup>
import { reactive } from "vue";
import CodePen from "./components/code-pen.vue";

const editors = reactive([
  {
    id: 2,
    language: "HTML",
    code: "<div id='hello'>Hello world!</div>",
  },
  {
    id: 1,
    language: "JavaScript",
    code: `
      function hello() {
        alert('Hello world!');
      }

      const ele = document.getElementById('hello');
      ele.addEventListener('click', hello);
    `,
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
