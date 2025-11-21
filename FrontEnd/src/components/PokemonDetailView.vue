<template>
  <div class="detail-view-container">
    <div class="detail-view-content">
      <!-- Empty state -->
      <div v-if="!selectedPokemon" class="detail-view-empty">
        <p>Select a Pokémon to view details</p>
      </div>

      <!-- Loading state -->
      <div v-else-if="detailLoading" class="detail-view-loading">
        <LoadingSpinner message="Loading details..." />
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="detail-view-error">
        <ErrorMessage :message="error" :show-retry="true" @retry="loadDetails" />
      </div>

      <!-- Content -->
      <div v-else class="detail-view-body">
        <!-- Header -->
        <div class="detail-header">
          <div>
            <h2 class="detail-title">{{ formatName(currentPokemon.name) }}</h2>
            <p class="detail-id">#{{ currentPokemon.id?.toString().padStart(3, '0') }}</p>
          </div>
          <button @click="toggleFavorite" class="detail-favorite-btn">
            {{ isFavorite ? '❤️' : '🤍' }}
          </button>
        </div>

        <!-- Image -->
        <div class="detail-image-box">
          <img 
            :src="getPokemonImage(currentPokemon)" 
            :alt="currentPokemon.name"
            onerror="this.src='https://via.placeholder.com/300?text=No+Image'" 
          />
        </div>

        <!-- Basic Info -->
        <div class="detail-info-grid">
          <div class="detail-info-card">
            <p class="detail-info-label">Height</p>
            <p class="detail-info-value">
              {{ currentPokemon.height ? (currentPokemon.height / 10).toFixed(1) : 'N/A' }}m
            </p>
          </div>
          <div class="detail-info-card">
            <p class="detail-info-label">Weight</p>
            <p class="detail-info-value">
              {{ currentPokemon.weight ? (currentPokemon.weight / 10).toFixed(1) : 'N/A' }}kg
            </p>
          </div>
        </div>

        <!-- Types -->
        <div class="detail-section">
          <h3 class="detail-section-title">Types</h3>
          <div class="types-list">
            <span
              v-for="type in currentPokemon.types"
              :key="type.type.name"
              :class="`type-badge type-${type.type.name.toLowerCase()}`"
            >
              {{ formatName(type.type.name) }}
            </span>
          </div>
        </div>

        <!-- Stats Hexagon -->
        <div v-if="formattedStats.length > 0" class="detail-section">
          <StatHexagon :stats="formattedStats" />
        </div>

        <!-- Abilities -->
        <div v-if="currentPokemon.abilities && currentPokemon.abilities.length > 0" class="detail-section">
          <h3 class="detail-section-title">Abilities</h3>
          <div class="abilities-list">
            <div v-for="ability in currentPokemon.abilities" :key="ability.ability.name" class="ability-card">
              <p>{{ formatName(ability.ability.name) }}</p>
              <span v-if="ability.is_hidden" class="ability-hidden">Hidden</span>
            </div>
          </div>
        </div>

        <!-- Moves -->
        <div v-if="currentPokemon.moves && currentPokemon.moves.length > 0" class="detail-section">
          <h3 class="detail-section-title">Moves (First 12)</h3>
          <div class="moves-grid">
            <div v-for="move in currentPokemon.moves.slice(0, 12)" :key="move.move.name" class="move-badge">
              {{ formatName(move.move.name) }}
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="detail-actions">
          <button @click="toggleFavorite" class="action-btn" :class="{ 'action-btn-active': isFavorite }">
            {{ isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites' }}
          </button>
          <button
            v-if="!isInTeam"
            @click="addToTeam"
            :disabled="isTeamFull"
            class="action-btn"
            :class="{ 'action-btn-disabled': isTeamFull }"
          >
            {{ isTeamFull ? '⭐ Team Full' : '⭐ Add to Team' }}
          </button>
          <button v-else @click="removeFromTeam" class="action-btn action-btn-remove">
            ✕ Remove from Team
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useTeamStore } from '../stores/teamStore'
import { usePokemonStore } from '../stores/pokemonStore'
import LoadingSpinner from './LoadingSpinner.vue'
import ErrorMessage from './ErrorMessage.vue'
import StatHexagon from './StatHexagon.vue'

const favoritesStore = useFavoritesStore()
const teamStore = useTeamStore()
const pokemonStore = usePokemonStore()

const currentPokemon = computed(() => pokemonStore.currentPokemon)
const detailLoading = computed(() => pokemonStore.detailLoading)
const error = computed(() => pokemonStore.error)

const isFavorite = computed(() => {
  return currentPokemon.value
    ? favoritesStore.isFavorite(currentPokemon.value.id)
    : false
})

const isInTeam = computed(() => {
  return currentPokemon.value ? teamStore.isInTeam(currentPokemon.value.id) : false
})

const isTeamFull = computed(() => teamStore.isTeamFull)

const formattedStats = computed(() => {
  if (!currentPokemon.value || !currentPokemon.value.stats) return []
  return currentPokemon.value.stats.map((stat) => ({
    name: stat.stat.name.replace('special-attack', 'sp-atk').replace('special-defense', 'sp-def'),
    value: stat.base_stat,
  }))
})

const selectedPokemon = computed(() => pokemonStore.currentPokemon)

const formatName = (name: string) => {
  return name
    ? name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ')
    : ''
}

const toggleFavorite = () => {
  if (!currentPokemon.value) return
  if (isFavorite.value) {
    favoritesStore.removeFavorite(currentPokemon.value.id)
  } else {
    const pokemon = {
      id: currentPokemon.value.id,
      name: currentPokemon.value.name,
      number: currentPokemon.value.id,
      image: currentPokemon.value.image,
      types: currentPokemon.value.types.map((t) => t.type.name),
    }
    favoritesStore.addFavorite(pokemon)
  }
}

const addToTeam = () => {
  if (!currentPokemon.value) return
  const pokemon = {
    id: currentPokemon.value.id,
    name: currentPokemon.value.name,
    number: currentPokemon.value.id,
    image: currentPokemon.value.image,
    types: currentPokemon.value.types.map((t) => t.type.name),
  }
  teamStore.addToTeam(pokemon)
}

const removeFromTeam = () => {
  if (!currentPokemon.value) return
  teamStore.removeFromTeam(currentPokemon.value.id)
}

const loadDetails = async () => {
  if (!currentPokemon.value) return
  await pokemonStore.fetchPokemonDetails(currentPokemon.value.id)
}

const getPokemonImage = (pokemon: any) => {
  // Try different image sources in order of preference
  if (pokemon.image) return pokemon.image
  if (pokemon.sprites?.front_default) return pokemon.sprites.front_default
  if (pokemon.sprites?.front_shiny) return pokemon.sprites.front_shiny
  if (pokemon.sprites?.other?.['official-artwork']?.front_default) {
    return pokemon.sprites.other['official-artwork'].front_default
  }
  return 'https://via.placeholder.com/300?text=No+Image'
}
</script>

<style scoped>
.detail-view-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #f8f9fa 0%, #e8ecf1 100%);
}

.detail-view-content {
  flex: 1;
  overflow-y: auto;
}

.detail-view-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #bbb;
  font-size: 1.1rem;
  font-weight: 500;
}

.detail-view-loading,
.detail-view-error {
  padding: 2rem;
}

.detail-view-body {
  padding: 2.5rem 2rem;
}

.detail-section {
  margin-bottom: 2.5rem;
}

.detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.detail-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 0.35rem 0;
  letter-spacing: -0.5px;
}

.detail-id {
  font-size: 0.95rem;
  color: #bbb;
  margin: 0;
  font-weight: 600;
}

.detail-favorite-btn {
  font-size: 2.2rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.detail-favorite-btn:hover {
  transform: scale(1.25) rotate(15deg);
}

.detail-image-box {
  background: linear-gradient(135deg, #FFE5B4 0%, #FFD99B 50%, #FFC87B 100%);
  border-radius: 1rem;
  padding: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 320px;
  margin-bottom: 2rem;
  box-shadow: 0 8px 20px rgba(255, 200, 100, 0.2);
}

.detail-image-box img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 280px;
  max-height: 280px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
}

.detail-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.detail-info-card {
  background: white;
  padding: 1.5rem;
  border-radius: 0.875rem;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.detail-info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.detail-info-label {
  font-size: 0.8rem;
  color: #999;
  margin: 0 0 0.75rem 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-info-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
}

.detail-section-title {
  font-weight: 800;
  font-size: 1.3rem;
  color: #1a1a1a;
  margin: 0 0 1.25rem 0;
  letter-spacing: -0.25px;
}

.types-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.type-badge {
  padding: 0.6rem 1.25rem;
  border-radius: 9999px;
  color: white;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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

.abilities-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.ability-card {
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  border: 1px solid #90CAF9;
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #1565c0;
  transition: all 0.3s ease;
}

.ability-card:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(21, 101, 192, 0.15);
}

.ability-card p {
  margin: 0;
  font-weight: 600;
}

.ability-hidden {
  background: #1565c0;
  color: white;
  font-size: 0.7rem;
  padding: 0.35rem 0.65rem;
  border-radius: 0.375rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.moves-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.move-badge {
  background: linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%);
  border: 1px solid #CE93D8;
  border-radius: 0.5rem;
  padding: 0.85rem;
  text-align: center;
  font-size: 0.85rem;
  color: #6a1b9a;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: default;
}

.move-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(106, 27, 154, 0.15);
}

.detail-actions {
  display: flex;
  gap: 1rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
  margin-top: 2rem;
}

.action-btn {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
  color: #666;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-size: 0.95rem;
}

.action-btn:hover:not(.action-btn-disabled) {
  background: #f5f5f5;
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.action-btn-active {
  background: linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%);
  color: #d32f2f;
  border: 1px solid #EF9A9A;
}

.action-btn-remove {
  background: linear-gradient(135deg, #FF7043 0%, #FF5722 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(255, 87, 34, 0.25);
}

.action-btn-remove:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 87, 34, 0.35);
}

.action-btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn-disabled:hover {
  transform: none;
  background: white;
}

@media (max-width: 768px) {
  .detail-view-body {
    padding: 1.5rem 1rem;
  }

  .detail-title {
    font-size: 1.5rem;
  }

  .detail-image-box {
    height: 250px;
    padding: 1.5rem;
  }

  .moves-grid {
    grid-template-columns: 1fr;
  }

  .detail-actions {
    flex-direction: column;
  }
}
</style>
