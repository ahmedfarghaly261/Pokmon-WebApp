<template>
  <div class="favorites-page">
    <div class="favorites-container">
      <div class="favorites-header">
        <h1 class="favorites-title">❤️ Favorite Pokémon</h1>
        <p class="favorites-count">{{ favoritesStore.favorites.length }} Pokémon saved</p>
      </div>

      <!-- Empty State -->
      <div v-if="favoritesStore.favorites.length === 0" class="favorites-empty">
        <p>No favorite Pokémon yet. Start adding some!</p>
      </div>

      <!-- Grid -->
      <div v-else class="favorites-grid">
        <PokemonCard
          v-for="pokemon in favoritesStore.favorites"
          :key="pokemon.id"
          :pokemon="pokemon"
          :is-favorite="true"
          @select="selectPokemon(pokemon)"
          @toggle-favorite="removeFavorite(pokemon.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '../stores/favoritesStore'
import { usePokemonStore } from '../stores/pokemonStore'
import PokemonCard from '../components/PokemonCard.vue'
import type { PokemonListItem } from '../services/api'

const favoritesStore = useFavoritesStore()
const pokemonStore = usePokemonStore()

const selectPokemon = async (pokemon: PokemonListItem) => {
  await pokemonStore.fetchPokemonDetails(pokemon.id)
}

const removeFavorite = (id: number) => {
  favoritesStore.removeFavorite(id)
}
</script>

<style scoped>
.favorites-page {
  overflow-y: auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.favorites-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem;
}

.favorites-header {
  margin-bottom: 2.5rem;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.favorites-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.5px;
}

.favorites-count {
  color: #999;
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

.favorites-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 350px;
  color: #bbb;
  font-size: 1.2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  font-weight: 500;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  }
}

@media (max-width: 768px) {
  .favorites-container {
    padding: 1.5rem;
  }

  .favorites-header {
    padding: 1.5rem;
  }

  .favorites-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .favorites-title {
    font-size: 1.75rem;
  }
}
</style>
