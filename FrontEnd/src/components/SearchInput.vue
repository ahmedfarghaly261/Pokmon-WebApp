<template>
  <div class="search-container">
    <input
      v-model="localQuery"
      type="text"
      placeholder="Search by name or number (e.g., Pikachu, 25)"
      class="search-input"
      @input="handleSearch"
    />
    <svg v-if="localQuery" class="search-clear-btn" @click="clearSearch" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const localQuery = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  localQuery.value = newVal
})

const handleSearch = () => {
  emit('update:modelValue', localQuery.value)
}

const clearSearch = () => {
  localQuery.value = ''
  emit('update:modelValue', '')
}
</script>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 0.85rem 1.25rem;
  border: 2px solid #e8e8e8;
  border-radius: 0.75rem;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.search-input:focus {
  outline: none;
  border-color: #FF6B6B;
  box-shadow: 0 4px 16px rgba(255, 107, 107, 0.15);
  transform: translateY(-1px);
}

.search-input::placeholder {
  color: #ccc;
  font-weight: 500;
}

.search-clear-btn {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  cursor: pointer;
  color: #bbb;
  transition: all 0.2s ease;
  background: none;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-clear-btn:hover {
  color: #FF6B6B;
  transform: translateY(-50%) scale(1.15);
}
</style>
