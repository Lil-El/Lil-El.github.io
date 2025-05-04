<template>
  <div class="container">
    <code-pen />
  </div>
</template>

<script setup>
import CodePen from "./components/code-pen.vue";

const editors = reactive([
  {
    id: 1,
    language: "HTML",
    code: "<div id='hello'>Hello world!</div>",
  },
  {
    id: 2,
    language: "CSS",
    code: "#hello { color: red; }",
  },
  {
    id: 3,
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
