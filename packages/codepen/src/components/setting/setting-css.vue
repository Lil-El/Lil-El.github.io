<template>
  <div class="setting">
    <div class="setting-item">
      <p class="setting-label">添加依赖资源</p>
      <el-row v-for="(l, i) in links" :key="i" type="flex" align="middle" style="gap: 10px; margin-bottom: 10px">
        <el-input v-model="links[i]" placeholder="请填写CSS资源地址"></el-input>
        <el-button link :icon="Close" @click="removeLink(i)" />
      </el-row>
      <el-button link style="color: var(--theme-color)" @click="addLink">+ 添加新资源</el-button>
    </div>
  </div>
</template>

<script setup>
import { Close } from "@element-plus/icons-vue";

const props = defineProps({
  data: Object,
});

const emit = defineEmits(["update:data"]);

const links = ref(props.data.links);

watchEffect(() => {
  emit("update:data", {
    links: links.value,
  });
});

function addLink() {
  links.value.push("");
}

function removeLink(index) {
  links.value.splice(index, 1);
}
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
