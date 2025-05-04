<template>
  <div class="select-option" :class="{ active: value !== undefined && getCurrent() === value }" @click="update(value)">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: [String, Number, Boolean],
    default: undefined,
  },
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
