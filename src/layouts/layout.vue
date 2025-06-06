<template>
  <m-header />

  <main class="flex h-[calc(100vh-calc(var(--spacing)*14))] overflow-hidden">
    <m-side-bar />

    <div class="h-full flex-1">
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
