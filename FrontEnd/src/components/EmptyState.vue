<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="text-6xl mb-4">📭</div>
    <p class="text-gray-600 text-lg font-medium">{{ message }}</p>
    <p class="text-gray-400 text-sm mt-2">Start exploring above</p>
  </div>
</template>

<script setup lang="ts">
defineProps({ message: { type: String, default: 'No Pokémon here yet' } })
</script>
