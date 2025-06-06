<template>
  <router-view v-slot="{ Component }">
    <!-- TODO： -->
    <transition>
      <!-- name="fade" mode="out-in" -->
      <keep-alive :include="['blogs']">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
