<template>
  <div>{{ msg }}</div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["msg"]);
const msg = ref(props.msg);
</script>
