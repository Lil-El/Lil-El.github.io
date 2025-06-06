<template>
  <m-markdown :text="text" />
</template>

<script setup>
import { markdown as MMarkdown } from "@lil-el/markdown";
import { useRoute } from "vue-router";
import { articles } from "@/blogs";

const route = useRoute();

const text = ref("");

watch(
  () => route,
  (newRoute) => {
    const id = newRoute.params.id;
    const { component } = articles.find((i) => `${i.id}` === `${id}`);
    component().then((module) => {
      text.value = module.default;
    });
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
