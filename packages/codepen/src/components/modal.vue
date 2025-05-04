<template>
  <div class="modal-mask" v-if="show">
    <div class="modal-container">
      <div class="modal-header">
        <div class="header-left">
          <img src="/src/assets/setting.svg" width="26" /> <span>{{ title }}</span>
        </div>
        <div class="header-right">
          <img
            src="/src/assets/close.svg"
            width="16"
            height="16"
            @click.self="
              emit('update:show', false);
              emit('close');
            "
          />
        </div>
      </div>
      <div class="modal-body">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  show: Boolean,
});

const emit = defineEmits(["update:show", "close"]);
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 10px 10px 10px -4px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: #1e1f1c;
  color: #ffffff;
  font-size: 16px;
}
.modal-header {
  height: 56px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #666666;

  .header-left {
    height: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .header-right {
    cursor: pointer;
  }
}
.modal-body {
  padding: 20px;
  overflow-y: auto;
  flex-grow: 1;
}
.modal-body::-webkit-scrollbar {
  width: 8px;
}
.modal-body::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}
.modal-body::-webkit-scrollbar-thumb:hover {
  background-color: #aaa;
}
</style>
