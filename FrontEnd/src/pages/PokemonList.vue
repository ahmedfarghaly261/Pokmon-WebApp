<template>
  <div class="pokemon-list-container">
    <!-- Single Column Layout for All Screens -->
    <div class="pokemon-list-main">
      <!-- Header Section -->
      <div class="pokemon-list-header">
        <h1 class="pokemon-list-title">Pokédex</h1>
        <SearchInput v-model="pokemonStore.searchQuery" />
        
        <!-- Quick Access Cards -->
        <div class="quick-access-cards">
          <router-link to="/team" class="quick-card quick-card-team">
            <div class="quick-card-icon">⭐</div>
            <div>
              <p class="quick-card-title">Mijn team</p>
              <p class="quick-card-count">{{ teamStore.team.length }} pokémons</p>
            </div>
          </router-link>
          <router-link to="/favorites" class="quick-card quick-card-favorites">
            <div class="quick-card-icon">❤️</div>
            <div>
              <p class="quick-card-title">Favorieten</p>
              <p class="quick-card-count">{{ favoritesStore.favorites.length }} pokémons</p>
            </div>
          </router-link>
        </div>
      </div>

      <!-- List Content -->
      <div class="pokemon-list-content">
        <!-- Loading -->
        <div v-if="pokemonStore.loading" class="pokemon-list-loading">
          <LoadingSpinner message="Loading Pokémon..." />
        </div>

        <!-- Error -->
        <div v-else-if="pokemonStore.error" class="pokemon-list-error">
          <ErrorMessage :message="pokemonStore.error" :show-retry="true" @retry="loadPokemonList" />
        </div>

        <!-- Empty State -->
        <div v-else-if="pokemonStore.filteredPokemon.length === 0" class="pokemon-list-empty">
          <p>No Pokémon found</p>
        </div>

        <!-- List -->
        <div v-else class="pokemon-list-grid">
          <div
            v-for="pokemon in pokemonStore.filteredPokemon"
            :key="pokemon.id"
            class="pokemon-list-item"
            @click="selectPokemon(pokemon)"
          >
            <img :src="pokemon.image || 'https://via.placeholder.com/80'" :alt="pokemon.name" class="pokemon-item-image" />
            <div class="pokemon-item-info">
              <h3 class="pokemon-item-name">{{ formatName(pokemon.name) }}</h3>
              <p class="pokemon-item-number">Nr. {{ pokemon.number?.toString().padStart(3, '0') }}</p>
              <div class="pokemon-item-types">
                <span v-for="type in pokemon.types" :key="type" :class="`type-badge type-${type.toLowerCase()}`">
                  {{ formatName(type) }}
                </span>
              </div>
            </div>
            <button
              @click.stop="toggleFavorite(pokemon)"
              class="pokemon-item-favorite"
            >
              {{ favoritesStore.isFavorite(pokemon.id) ? '❤️' : '🤍' }}
            </button>
            <div class="pokemon-item-arrow">›</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail View Modal (Mobile Only) -->
    <div v-if="showDetailModal && pokemonStore.currentPokemon" class="detail-modal-overlay" @click="closeDetailModal">
      <div class="detail-modal" @click.stop>
        <button class="detail-modal-close" @click="closeDetailModal">✕</button>
        <PokemonDetailView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { usePokemonStore } from '../stores/pokemonStore'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useTeamStore } from '../stores/teamStore'
import SearchInput from '../components/SearchInput.vue'
import LoadingSpinner from '../components/LoadingSpinner.vue'
import ErrorMessage from '../components/ErrorMessage.vue'
import PokemonDetailView from '../components/PokemonDetailView.vue'
import type { PokemonListItem } from '../services/api'

const pokemonStore = usePokemonStore()
const favoritesStore = useFavoritesStore()
const teamStore = useTeamStore()
const showDetailModal = ref(false)

const selectPokemon = async (pokemon: PokemonListItem) => {
  try {
    if (!pokemon || !pokemon.id) return
    await pokemonStore.fetchPokemonDetails(pokemon.id)
    showDetailModal.value = true
  } catch (error) {
    console.error('Error selecting pokemon:', error)
  }
}

const closeDetailModal = () => {
  showDetailModal.value = false
}

const toggleFavorite = (pokemon: PokemonListItem) => {
  if (favoritesStore.isFavorite(pokemon.id)) {
    favoritesStore.removeFavorite(pokemon.id)
  } else {
    favoritesStore.addFavorite(pokemon)
  }
}

const formatName = (name: string) => {
  return name
    ? name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ')
    : ''
}

const loadPokemonList = async () => {
  try {
    if (pokemonStore.pokemonList.length === 0) {
      await pokemonStore.fetchAllPokemon()
    }
  } catch (error) {
    console.error('Error loading pokemon list:', error)
  }
}

onMounted(loadPokemonList)
</script>

<style scoped>
.pokemon-list-container {
  display: flex;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.pokemon-list-main {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: white;
}

.pokemon-list-header {
  flex-shrink: 0;
  padding: 1.5rem;
  background: white;
  border-bottom: 1px solid #f0f0f0;
}

.pokemon-list-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
  letter-spacing: -0.5px;
}

.quick-access-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-top: 1.5rem;
}

.quick-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.5rem;
  border-radius: 1.25rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  color: white;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.quick-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(255, 255, 255, 0.2), transparent);
  pointer-events: none;
}

.quick-card-team {
  background: linear-gradient(135deg, #7B68EE 0%, #6A5ACD 50%, #5A4AAD 100%);
  box-shadow: 0 8px 24px rgba(123, 104, 238, 0.35);
}

.quick-card-team:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 16px 40px rgba(123, 104, 238, 0.5);
}

.quick-card-favorites {
  background: linear-gradient(135deg, #00BCD4 0%, #00ACC1 50%, #009BA0 100%);
  box-shadow: 0 8px 24px rgba(0, 188, 212, 0.35);
}

.quick-card-favorites:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 16px 40px rgba(0, 188, 212, 0.5);
}

.quick-card-icon {
  font-size: 2.5rem;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  width: 60px;
  height: 60px;
  transition: all 0.3s ease;
}

.quick-card:hover .quick-card-icon {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1) rotate(5deg);
}

.quick-card-title {
  font-size: 1.05rem;
  margin: 0;
  font-weight: 800;
  letter-spacing: -0.25px;
}

.quick-card-count {
  font-size: 0.85rem;
  margin: 0.4rem 0 0 0;
  opacity: 0.95;
  font-weight: 600;
  display: block;
}

.pokemon-list-content {
  flex: 1;
  overflow-y: auto;
}

.pokemon-list-loading,
.pokemon-list-error,
.pokemon-list-empty {
  padding: 2rem;
}

.pokemon-list-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #bbb;
  font-size: 1.1rem;
}

.pokemon-list-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  padding: 1rem;
}

.pokemon-list-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.125rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: white;
  border: 2px solid transparent;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.pokemon-list-item:hover {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-color: #FF6B6B;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(255, 107, 107, 0.15);
}

.pokemon-item-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.12));
  background: linear-gradient(135deg, #FFF5E6 0%, #FFE0B2 100%);
  border-radius: 0.75rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pokemon-item-info {
  flex: 1;
  min-width: 0;
}

.pokemon-item-name {
  font-size: 1.05rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 0.3rem 0;
  letter-spacing: -0.25px;
}

.pokemon-item-number {
  font-size: 0.8rem;
  color: #bbb;
  margin: 0 0 0.65rem 0;
  font-weight: 700;
}

.pokemon-item-types {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.type-badge {
  font-size: 0.7rem;
  padding: 0.4rem 0.7rem;
  border-radius: 9999px;
  color: white;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.type-badge:hover {
  transform: scale(1.05);
}

.type-normal { background: linear-gradient(135deg, #a8a878 0%, #9a9a6a 100%); }
.type-fire { background: linear-gradient(135deg, #f08030 0%, #e86820 100%); }
.type-water { background: linear-gradient(135deg, #6890f0 0%, #5880e0 100%); }
.type-grass { background: linear-gradient(135deg, #78c850 0%, #68b840 100%); }
.type-electric { background: linear-gradient(135deg, #f8d030 0%, #e8c020 100%); color: #333; }
.type-ice { background: linear-gradient(135deg, #98d8d8 0%, #88c8c8 100%); color: #333; }
.type-fighting { background: linear-gradient(135deg, #c03028 0%, #b02018 100%); }
.type-poison { background: linear-gradient(135deg, #a040a0 0%, #903090 100%); }
.type-ground { background: linear-gradient(135deg, #e0c068 0%, #d0b058 100%); color: #333; }
.type-flying { background: linear-gradient(135deg, #a890f0 0%, #9880e0 100%); }
.type-psychic { background: linear-gradient(135deg, #f85888 0%, #e84878 100%); }
.type-bug { background: linear-gradient(135deg, #a8b820 0%, #98a810 100%); }
.type-rock { background: linear-gradient(135deg, #b8a038 0%, #a89028 100%); }
.type-ghost { background: linear-gradient(135deg, #705898 0%, #604888 100%); }
.type-dragon { background: linear-gradient(135deg, #7038f8 0%, #6028e8 100%); }
.type-dark { background: linear-gradient(135deg, #705848 0%, #604838 100%); }
.type-steel { background: linear-gradient(135deg, #b8b8d0 0%, #a8a8c0 100%); color: #333; }
.type-fairy { background: linear-gradient(135deg, #ee99ac 0%, #de899c 100%); }

.pokemon-item-favorite {
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 107, 107, 0.05);
}

.pokemon-item-favorite:hover {
  transform: scale(1.25) rotate(10deg);
  background: rgba(255, 107, 107, 0.15);
}

.pokemon-item-arrow {
  color: #ddd;
  font-size: 1.75rem;
  font-weight: 800;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.pokemon-list-item:hover .pokemon-item-arrow {
  color: #FF6B6B;
  transform: translateX(4px);
}

/* Detail Modal */
.detail-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
}

.detail-modal {
  background: white;
  width: 100%;
  height: 90vh;
  border-radius: 1.5rem 1.5rem 0 0;
  position: relative;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.detail-modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .pokemon-list-header {
    padding: 1rem;
  }

  .quick-access-cards {
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .quick-card {
    padding: 1rem;
    gap: 0.75rem;
  }

  .quick-card-icon {
    font-size: 1.5rem;
    min-width: 32px;
  }

  .quick-card-title {
    font-size: 0.85rem;
  }

  .pokemon-list-item {
    padding: 0.875rem 1rem;
    gap: 0.75rem;
  }

  .pokemon-item-image {
    width: 60px;
    height: 60px;
  }

  .pokemon-item-name {
    font-size: 0.95rem;
  }
}
</style>
