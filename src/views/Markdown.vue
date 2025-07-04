<template>
  <div class="h-screen">
    <markdown editable style="--markdown-color: var(--data-theme-color)" :text="demoMd" :components="components" />
  </div>
</template>

<script setup>
import { markdown } from "@lil-el/markdown";
import demoMd from "@/doc/demo.md?raw";

const components = {
  codepen: () => import("@/components/codepen/index.js"),
  helloworld: () => import("@/components/helloworld/index.js"),
};
</script>
