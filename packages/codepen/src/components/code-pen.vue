<template>
  <div class="code-pen">
    <header class="code-pen-header"></header>
    <main class="code-pen-body">
      <div class="code-pen-sidebar"></div>
      <div class="code-pen-main">
        <div class="code-pen-editor-container">
          <editor v-for="(e, i) in editors" :key="i" :language="e.language" :code="e.code" />
        </div>
        <div class="code-pen-view"></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import editor from "./editor.vue";

defineProps({
  editors: Array,
});
</script>

<style scoped>
.code-pen {
  width: 100%;
  height: 100%;
  background-color: #1e1f1c;

  .code-pen-header {
    width: 100%;
    height: 48px;
    background-color: #1e1f1c;
    border-bottom: 1px solid #666666;
  }

  .code-pen-body {
    display: flex;
    width: 100%;
    height: calc(100% - 48px);

    .code-pen-sidebar {
      width: 48px;
      height: 100%;
      background-color: #272822;
    }

    .code-pen-main {
      flex: 1;
      display: flex;
      flex-direction: column;

      .code-pen-editor-container {
        flex: 1;
        display: flex;
      }
      .code-pen-view {
        width: 100%;
        height: 300px;
      }
    }
  }
}
</style>
