<template>
  <m-markdown style="--markdown-color: var(--data-theme-color)" :text="demoMd" :components="components" />
</template>

<script setup>
import { markdown as MMarkdown } from "@lil-el/markdown";
import demoMd from "@/doc/demo.md?raw";

const components = {
  codepen: () => import("@lil-el/codepen"),
};
</script>
