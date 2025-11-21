
<template>
  <div class="app-container">
    <Header />
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  overflow: hidden;
}

.app-main {
  flex: 1;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
</style>
