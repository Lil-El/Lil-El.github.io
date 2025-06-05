<template>
  <aside class="sidebar-container">
    <div class="breadcrumbs">
      <span class="bread-item" @click="handleClick()">ROOT</span>
      <div v-for="item in breadcrumbs" :key="item.id" class="bread-items">
        <span class="iconfont icon-right right-arrow" style="font-size: 10px"></span>
        <span class="bread-item" @click="handleClick(item)">{{ item.title }}</span>
      </div>
    </div>
    <div class="sidebar-dir">
      <transition name="translate-fade" mode="out-in">
        <div :key="currentPath">
          <div v-for="item in currentDirectory" :key="item.id" @click="handleClick(item)">
            <router-link
              v-if="item.component"
              :to="`/blogs/${item.id}`"
              class="dir-item"
              :class="{ 'dir-item-active': item.id === active.id }"
            >
              <!-- :class="{ 'bg-gray-200': item.id === active.id, 'hover:bg-gray-100': item.id !== active.id }" -->
              <span>{{ item.title }}</span>
              <span v-if="item.children?.length" class="iconfont icon-right right-arrow" style="font-size: 10px"></span>
            </router-link>
            <div v-else class="dir-item">
              <span>{{ item.title }}</span>
              <span
                v-if="item.children?.length"
                class="iconfont icon-right dir-item-arrow"
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
  面包屑横向滚动
  markdown 标题点击错位问题
  markdown 属性监听
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
.sidebar-container {
  width: 288px;
  padding: 1rem;
  font-size: 0.875rem;
  border-right: 1px solid rgba(0, 0, 0, 0.05);

  [data-theme="dark"] & {
    border-right-color: rgba(255, 255, 255, 0.1);
  }

  .breadcrumbs {
    height: 2.25rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;

    .bread-items {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .bread-item {
      cursor: pointer;
      color: #6b7280;

      &:hover {
        color: #000;
      }

      [data-theme="dark"] & {
        color: #d1d5db;
        &:hover {
          color: #fff;
        }
      }
    }

    .right-arrow {
      color: #111827;

      [data-theme="dark"] & {
        color: #f9fafb;
      }
    }
  }
}

.sidebar-dir {
  overflow-y: auto;

  .dir-item {
    height: 2.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 1rem;
    padding-right: 1rem;
    cursor: pointer;
    border-radius: 0.375rem;

    &:hover {
      background-color: #f3f4f6;
    }

    &-arrow {
      color: #111827;
    }

    &.dir-item-active {
      background-color: #e5e7eb;
    }
  }
}

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
