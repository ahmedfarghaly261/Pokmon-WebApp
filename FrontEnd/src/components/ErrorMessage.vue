<template>
  <div class="error-container">
    <div class="error-content">
      <svg class="error-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
      <div class="error-text">
        <h3 class="error-title">{{ title || 'Error' }}</h3>
        <p class="error-message">{{ message }}</p>
        <button v-if="showRetry" @click="$emit('retry')" class="error-retry-btn">
          Retry
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
  title?: string
  showRetry?: boolean
}>()

defineEmits<{
  retry: []
}>()
</script>

<style scoped>
.error-container {
  background-color: #ffebee;
  border-left: 4px solid #f44336;
  padding: 1rem;
  border-radius: 0.375rem;
}

.error-content {
  display: flex;
  gap: 1rem;
}

.error-icon {
  width: 24px;
  height: 24px;
  color: #f44336;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.error-text {
  flex: 1;
}

.error-title {
  font-weight: 600;
  color: #c62828;
  font-size: 1rem;
  margin: 0 0 0.25rem 0;
}

.error-message {
  color: #d32f2f;
  font-size: 0.875rem;
  margin: 0.25rem 0 0.5rem 0;
}

.error-retry-btn {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #d32f2f;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.error-retry-btn:hover {
  background-color: rgba(244, 67, 54, 0.1);
  color: #c62828;
}
</style>
