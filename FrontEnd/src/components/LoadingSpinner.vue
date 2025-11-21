<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p class="loading-message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: 'Loading...',
  },
})
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  gap: 1rem;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #ff6b6b;
  border-right: 4px solid #ff6b6b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-message {
  font-size: 0.95rem;
  color: #666;
  font-weight: 500;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
