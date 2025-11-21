import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { PokemonListItem } from '../services/api'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<PokemonListItem[]>([])
  const STORAGE_KEY = 'pokemon_favorites'

  // Load from localStorage
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        favorites.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load favorites:', error)
    }
  }

  // Save to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites.value))
    } catch (error) {
      console.error('Failed to save favorites:', error)
    }
  }

  // Add to favorites
  const addFavorite = (pokemon: PokemonListItem) => {
    if (!isFavorite(pokemon.id)) {
      favorites.value.push(pokemon)
      saveToStorage()
    }
  }

  // Remove from favorites
  const removeFavorite = (id: number) => {
    favorites.value = favorites.value.filter((p) => p.id !== id)
    saveToStorage()
  }

  // Toggle favorite
  const toggleFavorite = (pokemon: PokemonListItem) => {
    if (isFavorite(pokemon.id)) {
      removeFavorite(pokemon.id)
    } else {
      addFavorite(pokemon)
    }
  }

  // Check if favorite
  const isFavorite = (id: number) => {
    return favorites.value.some((p) => p.id === id)
  }

  // Clear all favorites
  const clearFavorites = () => {
    favorites.value = []
    saveToStorage()
  }

  // Get computed favorites list
  const favoritesList = computed(() => favorites.value)

  // Initialize on store creation
  loadFromStorage()

  return {
    favorites: favoritesList,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  }
})
