<template>
  <m-header />

  <main>
    <m-side-bar />

    <div class="router-view">
      <router-view :key="routeId" />
    </div>
  </main>
</template>

<script setup>
import MHeader from "@/components/header.vue";
import MSideBar from "@/components/sidebar.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const routeId = ref(null);

watch(
  () => route.params.id,
  () => {
    routeId.value = route.params.id;
  },
  { immediate: true }
);
</script>

<style scoped>
main {
  display: flex;
  height: calc(100vh - 56px);
  overflow: hidden;
}

.router-view {
  height: 100%;
  flex: 1;
}
</style>
