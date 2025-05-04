<template>
  <div class="select-option" :class="{ active: value && getCurrent() === value }" @click="update(value)">
    <slot></slot>
  </div>
</template>

<script setup>
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

  &.active {
    color: var(--color);
  }
}
</style>
