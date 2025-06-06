<template>
  <m-header />

  <main class="flex h-[calc(100vh-calc(var(--spacing)*14))] overflow-hidden">
    <m-side-bar />

    <div class="h-full flex-1">
      <router-view />
    </div>
  </main>
</template>

<script setup>
import MHeader from "@/components/header.vue";
import MSideBar from "@/components/sidebar.vue";
</script>
