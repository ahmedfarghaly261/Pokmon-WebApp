import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAllPokemon, getPokemonById as fetchPokemonById } from '../services/api'
import type { PokemonListItem, PokemonDetail } from '../services/api'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref<PokemonListItem[]>([])
  const currentPokemon = ref<PokemonDetail | null>(null)
  const loading = ref(false)
  const detailLoading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')

  // Fetch all Pokémon
  const fetchAllPokemon = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await getAllPokemon()
      pokemonList.value = data
    } catch (err) {
      error.value = 'Failed to load Pokémon list'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  // Fetch single Pokémon details
  const fetchPokemonDetails = async (id: number | string) => {
    detailLoading.value = true
    error.value = null
    try {
      const data = await fetchPokemonById(id)
      currentPokemon.value = data
    } catch (err) {
      error.value = 'Failed to load Pokémon details'
      console.error(err)
    } finally {
      detailLoading.value = false
    }
  }

  // Get Pokémon by ID from list
  const getPokemonById = (id: number): PokemonListItem | undefined => {
    return pokemonList.value.find((p) => p.id === id)
  }

  // Search Pokémon
  const filteredPokemon = computed(() => {
    if (!searchQuery.value) return pokemonList.value
    const query = searchQuery.value.toLowerCase()
    return pokemonList.value.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.number.toString().includes(query)
    )
  })

  // Set search query
  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  return {
    pokemonList,
    currentPokemon,
    loading,
    detailLoading,
    error,
    searchQuery,
    filteredPokemon,
    fetchAllPokemon,
    fetchPokemonDetails,
    getPokemonById,
    setSearchQuery,
  }
})
