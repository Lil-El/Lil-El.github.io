<template>
  <aside
    ref="elementRef"
    class="text-sm bg-white dark:bg-black dark:border-white/10 border-r border-r-gray-950/5 shadow-xl dark:shadow-gray-800"
  >
    <div class="absolute top-2 -right-8 cursor-pointer hidden @max-3xl:block" title="菜单" @click="toggleSidebar()">
      <svg
        t="1749713555133"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1932"
        width="24"
        height="24"
        :fill="theme.isDark ? '#ffffff' : '#000000'"
      >
        <path
          d="M917.333333 186.666667a5.333333 5.333333 0 0 0-5.333333-5.333334H112a5.333333 5.333333 0 0 0-5.333333 5.333334v64a5.333333 5.333333 0 0 0 5.333333 5.333333h800a5.333333 5.333333 0 0 0 5.333333-5.333333zM106.666667 773.333333v64a5.333333 5.333333 0 0 0 5.333333 5.333334h394.666667a5.333333 5.333333 0 0 0 5.333333-5.333334v-64a5.333333 5.333333 0 0 0-5.333333-5.333333H112a5.333333 5.333333 0 0 0-5.333333 5.333333zM512 474.666667H112a5.333333 5.333333 0 0 0-5.333333 5.333333v64a5.333333 5.333333 0 0 0 5.333333 5.333333h800a5.333333 5.333333 0 0 0 5.333333-5.333333V480a5.333333 5.333333 0 0 0-5.333333-5.333333z"
          p-id="1933"
        ></path>
      </svg>
    </div>
    <div class="transition-all overflow-hidden">
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
      <div class="h-[calc(100vh-var(--spacing)*23)] overflow-y-auto px-4 pb-4">
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
    </div>
  </aside>
</template>

<script setup>
import { directory } from "@/blogs";
import { findPathById } from "@/utils";
import { useRoute } from "vue-router";

const theme = inject("theme");

const route = useRoute();

const breadcrumbs = ref([]);

const elementRef = ref(null);

const currentDirectory = computed(() => {
  return breadcrumbs.value.at(-1)?.children || directory;
});

const active = ref(null);

const sidebarOpen = ref(false);

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

    if (document.body.clientWidth < 48 * 16) {
      toggleSidebar(false);
    }
  }
}

function toggleSidebar(val) {
  sidebarOpen.value = val === undefined ? !sidebarOpen.value : val;

  elementRef.value.style.left = sidebarOpen.value ? "0" : "calc(50px - 100vw)";
}

defineExpose({ setOpen: toggleSidebar });
</script>

<style scoped>
.translate-fade-enter-active,
.translate-fade-leave-active {
  transition: all 0.3s ease;
}
.translate-fade-enter-from,
.translate-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.translate-fade-enter-to,
.translate-fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
