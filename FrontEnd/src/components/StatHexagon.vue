<template>
  <div class="stat-hexagon-container">
    <h3 class="stat-hexagon-title">Base Stats</h3>
    <div class="hexagon-wrapper">
      <svg viewBox="0 0 300 300" class="hexagon-svg">
        <!-- Grid circles -->
        <circle cx="150" cy="150" r="100" fill="none" stroke="#f0f0f0" stroke-width="1" />
        <circle cx="150" cy="150" r="70" fill="none" stroke="#f0f0f0" stroke-width="1" />
        <circle cx="150" cy="150" r="40" fill="none" stroke="#f0f0f0" stroke-width="1" />

        <!-- Hexagon background -->
        <polygon
          points="150,30 250,80 280,170 250,260 150,310 50,260 20,170 50,80"
          fill="none"
          stroke="#ddd"
          stroke-width="1"
          stroke-dasharray="2,2"
        />

        <!-- Stat polygon -->
        <polygon
          :points="hexagonPoints"
          :fill="primaryColor"
          :fill-opacity="0.2"
          :stroke="primaryColor"
          stroke-width="2"
        />

        <!-- Stat dots -->
        <circle
          v-for="(point, i) in hexagonPointsArray"
          :key="i"
          :cx="point.x"
          :cy="point.y"
          r="5"
          :fill="primaryColor"
        />
      </svg>
    </div>

    <!-- Stats grid -->
    <div class="stats-grid">
      <div v-for="stat in stats" :key="stat.name" class="stat-card">
        <p class="stat-card-label">{{ stat.name }}</p>
        <p class="stat-card-value">{{ stat.value }}</p>
        <div class="stat-bar">
          <div class="stat-bar-fill" :style="{ width: (stat.value / 2.55) + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Stat {
  name: string
  value: number
}

const props = withDefaults(
  defineProps<{
    stats: Stat[]
    primaryColor?: string
  }>(),
  { primaryColor: '#ef4444' }
)

const hexagonPointsArray = computed(() => {
  const cx = 150
  const cy = 150
  const radius = 100
  const points = []

  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 - 90) * (Math.PI / 180)
    const value = props.stats[i]?.value || 0
    const scaledRadius = (value / 255) * radius
    const x = cx + scaledRadius * Math.cos(angle)
    const y = cy + scaledRadius * Math.sin(angle)
    points.push({ x, y })
  }

  return points
})

const hexagonPoints = computed(() => {
  return hexagonPointsArray.value.map((p) => `${p.x},${p.y}`).join(' ')
})
</script>

<style scoped>
.stat-hexagon-container {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 0.5rem;
  padding: 1.5rem;
}

.stat-hexagon-title {
  font-weight: 700;
  font-size: 1.125rem;
  margin: 0 0 1rem 0;
  color: #333;
}

.hexagon-wrapper {
  width: 280px;
  height: 280px;
  margin: 0 auto 2rem;
}

.hexagon-svg {
  width: 100%;
  height: 100%;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.stat-card {
  background: #f9f9f9;
  border-radius: 0.375rem;
  padding: 0.75rem;
  text-align: center;
}

.stat-card-label {
  font-size: 0.75rem;
  color: #666;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0 0 0.5rem 0;
}

.stat-card-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: #333;
  margin: 0 0 0.5rem 0;
}

.stat-bar {
  width: 100%;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #ff8787);
  border-radius: 2px;
  transition: width 0.3s ease;
}
</style>
