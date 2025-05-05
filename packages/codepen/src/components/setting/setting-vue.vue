<template>
  <div class="setting">
    <div class="setting-item">
      <p class="setting-label">Vue 3</p>
      <el-switch v-model="vue3" disabled />
    </div>
    <div class="setting-item">
      <p class="setting-label">element-ui</p>
      <el-switch v-model="ui" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object,
});

const emit = defineEmits(["update:data"]);

const vue3 = ref(true);

const ui = ref(props.data.ui);

watchEffect(() => {
  emit("update:data", {
    ui: ui.value,
  });
});
</script>

<style scoped>
.setting {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 10px;

  .setting-label {
    color: #ffffff;
    font-size: 16px;
    line-height: 28px;
    margin-bottom: 12px;
  }

  :deep(.el-icon) {
    color: #ffffff !important;
  }

  :deep(.el-input) {
    flex: 1;

    .el-input__inner {
      color: #ffffff;
    }

    .el-input__wrapper {
      background-color: rgba(88, 88, 88, 0.5);
      box-shadow: none;

      &.is-focus {
        box-shadow: 0 0 0 1px var(--theme-color) inset;
      }
    }
  }

  :deep(.el-radio__label) {
    color: #ffffff;
  }
}
</style>
