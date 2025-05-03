<template>
  <div class="select" ref="selectRef" @click="toggleOptions">
    <img :src="`/src/assets/${icon}.svg`" alt="" />

    <div v-show="active" class="select__options" ref="optionsRef" :style="{ left: left + 'px' }">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, nextTick, onMounted, provide } from "vue";

const props = defineProps({
  icon: String,
  modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);

const active = ref(false);

const selectRef = ref(null);
const optionsRef = ref(null);

const left = ref(0);

provide("getCurrent", () => props.modelValue);
provide("onUpdate", emit.bind(null, "update:modelValue"));

watch(active, () => {
  if (active.value) {
    nextTick(() => {
      const width = document.body.clientWidth;

      const sBound = selectRef.value.getBoundingClientRect();
      const oBound = optionsRef.value.getBoundingClientRect();

      const oLeft = sBound.left + sBound.width / 2 - oBound.width / 2;
      if (oLeft + oBound.width > width) {
        left.value = width - oBound.width - 4;
      } else {
        left.value = oLeft;
      }
    });
  }
});

onMounted(() => {
  document.body.addEventListener("click", (e) => {
    if (!selectRef.value.contains(e.target) && !optionsRef.value.contains(e.target)) {
      active.value = false;
    }
  });
});

function toggleOptions(evt) {
  if (optionsRef.value.contains(evt.target)) {
    return void 0;
  }

  active.value = !active.value;
};
</script>

<style scoped>
.select {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  cursor: pointer;

  .select__options {
    position: absolute;
    top: 54px;
    height: 40px;
    padding: 4px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    background-color: #555555;
    z-index: 10;
  }
}

.select:hover {
  background-color: hsla(0, 0%, 100%, 0.12);
  border-radius: 4px;
}
</style>
