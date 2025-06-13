<template>
  <router-view></router-view>
</template>

<script setup>
import useTheme from "./hooks/useTheme";

useTheme();

/*
  打包优化
*/
</script>
