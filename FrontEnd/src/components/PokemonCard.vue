<template>
  <div
    class="pokemon-card"
    :class="{ 'pokemon-card-selected': isSelected }"
    @click="$emit('select', pokemon)"
  >
    <div class="pokemon-card-image">
      <img :src="pokemon.image || 'https://via.placeholder.com/200'" :alt="pokemon.name" />
      <span class="pokemon-card-number">#{{ pokemon.number?.toString().padStart(3, '0') }}</span>
    </div>
    <div class="pokemon-card-header">
      <div>
        <h3 class="pokemon-card-name">{{ formatName(pokemon.name) }}</h3>
        <p class="pokemon-card-id">#{{ pokemon.id }}</p>
      </div>
      <button @click.stop="$emit('toggle-favorite')" class="pokemon-card-favorite">
        {{ isFavorite ? '❤️' : '🤍' }}
      </button>
    </div>
    <div class="pokemon-card-types">
      <span v-for="type in pokemon.types" :key="type" :class="`type-badge type-${type.toLowerCase()}`">
        {{ formatName(type) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PokemonListItem } from '../services/api'

defineProps<{
  pokemon: PokemonListItem
  isFavorite?: boolean
  isSelected?: boolean
}>()

defineEmits<{
  select: [pokemon: PokemonListItem]
  'toggle-favorite': []
}>()

const formatName = (name: string) => {
  return name
    ? name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ')
    : ''
}
</script>

<style scoped>
.pokemon-card {
  background: white;
  border: none;
  border-radius: 1rem;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.pokemon-card:hover {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-6px);
}

.pokemon-card-selected {
  border: 2px solid #FF6B6B;
  box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.1), 0 12px 24px rgba(0, 0, 0, 0.15);
}

.pokemon-card-image {
  position: relative;
  background: linear-gradient(135deg, #FFF5E6 0%, #FFE0B2 100%);
  border-radius: 0.75rem;
  padding: 0.75rem;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  border: none;
}

.pokemon-card-image img {
  width: 140px;
  height: 140px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.pokemon-card-number {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  color: #666;
  font-size: 0.75rem;
  padding: 0.35rem 0.65rem;
  border-radius: 0.375rem;
  font-weight: 700;
  backdrop-filter: blur(4px);
}

.pokemon-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  gap: 0.5rem;
}

.pokemon-card-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.25rem 0;
  letter-spacing: -0.25px;
}

.pokemon-card-id {
  font-size: 0.8rem;
  color: #bbb;
  margin: 0;
  font-weight: 500;
}

.pokemon-card-favorite {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.pokemon-card-favorite:hover {
  transform: scale(1.25) rotate(10deg);
}

.pokemon-card-types {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.type-badge {
  font-size: 0.75rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  color: white;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
}

.type-normal { background-color: #a8a878; }
.type-fire { background-color: #f08030; }
.type-water { background-color: #6890f0; }
.type-grass { background-color: #78c850; }
.type-electric { background-color: #f8d030; color: #333; }
.type-ice { background-color: #98d8d8; color: #333; }
.type-fighting { background-color: #c03028; }
.type-poison { background-color: #a040a0; }
.type-ground { background-color: #e0c068; color: #333; }
.type-flying { background-color: #a890f0; }
.type-psychic { background-color: #f85888; }
.type-bug { background-color: #a8b820; }
.type-rock { background-color: #b8a038; }
.type-ghost { background-color: #705898; }
.type-dragon { background-color: #7038f8; }
.type-dark { background-color: #705848; }
.type-steel { background-color: #b8b8d0; color: #333; }
.type-fairy { background-color: #ee99ac; }
</style>
