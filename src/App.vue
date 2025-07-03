<template>
  <router-view></router-view>
</template>

<script setup>
import useTheme from "./hooks/useTheme";

useTheme();

/*
  打包优化
  codepen 运行错误；由于cdn暂时没有2.0版本
  微信截图被遮挡；
  使用 iframe 保证 codepen ，避免编辑器样式冲突；
  日夜切换样式；
*/
</script>
