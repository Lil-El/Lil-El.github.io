<template>
  <div class="code-pen-sidebar">
    <div class="sidebar-top">
      <m-select type="list" icon="copy" popup="right" title="空白模板" v-model="code">
        <m-select-option v-for="t in getAllTemplates()" :key="t.title" :value="t.title">
          <img :src="getSVG(t.icon)" width="16" />&nbsp;{{ t.title }}
        </m-select-option>
      </m-select>
      <m-select type="list" icon="folder" popup="right" title="Demo" v-model="code">
        <m-select-option v-for="d in getAllDemos()" :key="d.title" :value="d.title">
          <img :src="getSVG(d.icon)" width="16" />&nbsp;{{ d.title }}
        </m-select-option>
      </m-select>
    </div>
    <div class="sidebar-btm">
      <m-select type="list" icon="info" popup="right" title="说明">
        <m-select-option><img :src="getSVG('refresh')" width="16" />&nbsp;重置(重置并运行)</m-select-option>
        <m-select-option>Shift + Alt + F: 格式化</m-select-option>
        <m-select-option>Ctrl + S: 保存并运行</m-select-option>
        <m-select-option>Ctrl + R: 运行</m-select-option>
      </m-select>
    </div>
  </div>
</template>

<script setup>
import { getSVG, Select as MSelect, SelectOption as MSelectOption } from "@lil-el/ui";

import useCode from "@/hooks/useCode";

const props = defineProps({
  init: Boolean,
});

const emit = defineEmits(["change"]);

const { code, getAllDemos, getAllTemplates } = useCode(props.init, handleChange);

function handleChange(data) {
  emit("change", data);
}
</script>

<style scoped>
.code-pen-sidebar {
  flex-shrink: 0;
  width: 48px;
  height: 100%;
  background-color: #272822;
  border-right: 1px solid #666666;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;

  .sidebar-top,
  .sidebar-btm {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    cursor: pointer;
    justify-content: start;
  }

  .sidebar-btm {
    justify-content: end;
  }
}
</style>
