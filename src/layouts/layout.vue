<template>
  <m-header />

  <main class="@container flex h-[calc(100vh-var(--spacing)*14)] overflow-hidden">
    <m-side-bar ref="sidebarRef" class="absolute transition-all z-10 w-2xs @max-3xl:w-[calc(100vw-50px)]" />

    <div class="transition-all h-full flex-1 pl-72 @max-3xl:pl-0">
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

const sidebarRef = ref(null);

watch(
  () => route.params.id,
  () => {
    routeId.value = route.params.id;
  },
  { immediate: true }
);

let observer = null;

onMounted(() => {
  document.documentElement.style.overflow = "hidden";

  observer = new ResizeObserver(([entry]) => {
    if (entry.contentRect.width < 48 * 16) {
      sidebarRef.value.setOpen(false);
    } else {
      sidebarRef.value.setOpen(true);
    }
  });

  observer.observe(document.body);
});

onUnmounted(() => {
  observer.disconnect();
});
</script>
