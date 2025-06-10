<template>
  <m-markdown tutorial :text="text" style="--markdown-color: var(--data-theme-color)" />
</template>

<script setup>
import { markdown as MMarkdown } from "@lil-el/markdown";
import { useRoute } from "vue-router";
import { articles } from "@/blogs";

const route = useRoute();

const text = ref("");

watch(
  () => route.params.id,
  (id) => {
    const { component } = articles.find((i) => `${i.id}` === `${id}`);
    component().then((module) => {
      text.value = module.default;
    });
  },
  {
    immediate: true,
  }
);
</script>
