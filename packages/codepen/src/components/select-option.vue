<template>
  <div class="select-option" :class="{ active: getCurrent() === value }" @click="update(value)">
    <slot></slot>
  </div>
</template>

<script setup>
import { inject } from "vue";

const props = defineProps({
  value: [String, Number, Boolean],
});

const getCurrent = inject("getCurrent");

const update = inject("onUpdate");
</script>

<style scoped>
.select-option {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #ffffff;
}
</style>
