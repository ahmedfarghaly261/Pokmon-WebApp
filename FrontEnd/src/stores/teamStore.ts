import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { PokemonListItem } from '../services/api'

export interface TeamMember extends PokemonListItem {
  slot: number
}

export const useTeamStore = defineStore('team', () => {
  const team = ref<TeamMember[]>([])
  const MAX_TEAM_SIZE = 6
  const STORAGE_KEY = 'pokemon_team'

  // Load from localStorage
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        team.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Failed to load team:', error)
    }
  }

  // Save to localStorage
  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(team.value))
    } catch (error) {
      console.error('Failed to save team:', error)
    }
  }

  // Add Pokémon to team
  const addToTeam = (pokemon: PokemonListItem): boolean => {
    if (team.value.length >= MAX_TEAM_SIZE) {
      return false
    }
    if (isInTeam(pokemon.id)) {
      return false
    }
    const slot = team.value.length + 1
    team.value.push({ ...pokemon, slot })
    saveToStorage()
    return true
  }

  // Remove Pokémon from team
  const removeFromTeam = (id: number) => {
    team.value = team.value.filter((p) => p.id !== id)
    // Re-slot remaining members
    team.value.forEach((p, index) => {
      p.slot = index + 1
    })
    saveToStorage()
  }

  // Check if Pokémon is in team
  const isInTeam = (id: number) => {
    return team.value.some((p) => p.id === id)
  }

  // Reorder team members
  const reorderTeam = (oldIndex: number, newIndex: number) => {
    const [removed] = team.value.splice(oldIndex, 1)
    team.value.splice(newIndex, 0, removed)
    team.value.forEach((p, index) => {
      p.slot = index + 1
    })
    saveToStorage()
  }

  // Clear team
  const clearTeam = () => {
    team.value = []
    saveToStorage()
  }

  // Get team list
  const teamList = computed(() => team.value)

  // Check if team is full
  const isTeamFull = computed(() => team.value.length >= MAX_TEAM_SIZE)

  // Get available slots
  const availableSlots = computed(() => MAX_TEAM_SIZE - team.value.length)

  // Initialize on store creation
  loadFromStorage()

  return {
    team: teamList,
    MAX_TEAM_SIZE,
    addToTeam,
    removeFromTeam,
    isInTeam,
    reorderTeam,
    clearTeam,
    isTeamFull,
    availableSlots,
  }
})
