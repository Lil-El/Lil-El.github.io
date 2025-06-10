<template>
  <aside class="w-2xs text-sm dark:border-white/10 border-r border-r-gray-950/5">
    <div class="px-4 h-9 flex items-center gap-1">
      <span
        class="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
        @click="handleClick()"
        >ROOT</span
      >
      <div v-for="item in breadcrumbs" :key="item.id" class="flex items-center gap-1">
        <span class="iconfont icon-right text-gray-900 dark:text-gray-300" style="font-size: 10px"></span>
        <span
          class="cursor-pointer text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
          @click="handleClick(item)"
          >{{ item.title }}</span
        >
      </div>
    </div>
    <div class="h-[calc(100vh-calc(var(--spacing)*14))] overflow-y-auto px-4 pb-4">
      <transition name="translate-fade" mode="out-in">
        <div :key="currentPath" class="flex flex-col gap-1 mt-1">
          <div v-for="item in currentDirectory" :key="item.id" @click="handleClick(item)">
            <router-link
              v-if="item.component"
              :to="`/blogs/${item.id}`"
              class="h-9 flex justify-between items-center px-4 cursor-pointer rounded-md hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              :class="{
                'font-bold bg-gray-200 dark:bg-gray-700 dark:text-white': item.id === active?.id,
              }"
            >
              <span>{{ item.title }}</span>
              <span
                v-if="item.children?.length"
                class="iconfont icon-right text-gray-900"
                style="font-size: 10px"
              ></span>
            </router-link>
            <div
              v-else
              class="h-9 flex justify-between items-center px-4 cursor-pointer rounded-md hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
              :class="{
                'font-bold bg-gray-200 dark:bg-gray-700 dark:text-white': item.id === active?.id,
              }"
            >
              <span>{{ item.title }}</span>
              <span
                v-if="item.children?.length"
                class="iconfont icon-right text-gray-900 dark:text-gray-300"
                style="font-size: 10px"
              ></span>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </aside>
</template>

<script setup>
/*
  移动端优化；
  codepen 添加类型处理；
  部署的 _ 处理 vite
  打包优化
*/
import { directory } from "@/blogs";
import { findPathById } from "@/utils";
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const breadcrumbs = ref([]);

const currentDirectory = computed(() => {
  return breadcrumbs.value.at(-1)?.children || directory;
});

const active = ref(null);

const currentPath = computed(() => {
  return breadcrumbs.value.map((item) => item.id).join("/");
});

onBeforeMount(() => {
  const id = route.params.id;
  if (id) {
    const path = findPathById(directory, id);
    active.value = path.pop();
    breadcrumbs.value = path;
  }
});

function handleClick(node) {
  if (node === active.value) return void 0;

  if (!node) {
    breadcrumbs.value = [];
    return void 0;
  }

  if (node.children && node.children.length > 0) {
    breadcrumbs.value.push(node);
  } else if (node.component) {
    active.value = node;
  }
}
</script>

<style scoped>
.translate-fade-enter-active,
.translate-fade-leave-active {
  transition: all 0.5s ease;
}
.translate-fade-enter-from,
.translate-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.translate-fade-enter-to,
.translate-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
