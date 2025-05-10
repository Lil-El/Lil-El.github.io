<template>
  <div class="select" ref="selectRef" @click.stop="toggle">
    <img :src="getSVG(icon)" alt="" />

    <div
      v-show="active"
      class="select__options"
      :class="{ cell: type === 'cell', list: type === 'list' }"
      ref="optionsRef"
      :style="{ left: left + 'px', top: top + 'px' }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { getSVG } from "@/utils";

const props = defineProps({
  type: String, // cell | list
  icon: String,
  popup: String, // bottom | right
  modelValue: [String, Number, Boolean],
});

const emit = defineEmits(["update:modelValue", "change"]);

const active = ref(false);

const selectRef = ref(null);
const optionsRef = ref(null);

const left = ref(0);
const top = ref(0);

provide("getCurrent", () => props.modelValue);
provide("onUpdate", (value) => {
  emit("update:modelValue", value);
  emit("change", value);
});

watch(active, () => {
  if (active.value) {
    setPosition();
  }
});

onMounted(() => {
  window.addEventListener("resize", setPosition);

  if (!window._currentSelectComponentFlag) {
    window._currentSelectComponentFlag = active;

    document.body.addEventListener("click", (e) => {
      if (window._currentSelectComponentFlag.value) window._currentSelectComponentFlag.value = false;
    });
  }
});

function toggle() {
  if (window._currentSelectComponentFlag !== active && window._currentSelectComponentFlag.value)
    window._currentSelectComponentFlag.value = false;

  active.value = !active.value;

  if (active.value) {
    window._currentSelectComponentFlag = active;
  }
}

function setPosition() {
  if (!active.value) return void 0;

  nextTick(() => {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;

    const sBound = selectRef.value?.getBoundingClientRect();
    const oBound = optionsRef.value?.getBoundingClientRect();

    if (props.popup === "bottom") {
      const oLeft = sBound.left + sBound.width / 2 - oBound.width / 2;
      const oTop = sBound.bottom + 4;

      if (oLeft + oBound.width > width) {
        left.value = width - oBound.width - 4;
        top.value = oTop;
      } else {
        left.value = oLeft;
        top.value = oTop;
      }
    } else if (props.popup === "right") {
      const oLeft = sBound.right + 4;
      const oTop = sBound.top + sBound.height / 2 - oBound.height / 2;

      if (oTop + oBound.height > height) {
        left.value = oLeft;
        top.value = height - oBound.height - 4;
      } else {
        left.value = oLeft;
        top.value = oTop;
      }
    }
  });
}

onUnmounted(() => {
  window.removeEventListener("resize", setPosition);
});
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
    padding: 6px;
    border-radius: 4px;
    background-color: #555555;
    z-index: 10;
    font-size: 14px;

    &.cell {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    &.list {
      width: max-content;
      height: max-content;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  }

  .select__options.list :deep(.select-option) {
    border-radius: 4px;
    padding: 2px 4px;
    justify-content: start;

    &:hover {
      background-color: rgb(60, 60, 60);
    }

    &.active {
      color: var(--theme-color);
      background-color: #1e1f1c;
    }
  }
}

.select:hover {
  background-color: hsla(0, 0%, 100%, 0.12);
  border-radius: 4px;
}
</style>
