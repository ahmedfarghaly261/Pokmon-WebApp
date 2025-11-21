import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const API_BASE_POKEAPI = 'https://pokeapi.co/api/v2'

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000, // Reduced timeout to trigger fallback faster
})

const pokeApi = axios.create({
  baseURL: API_BASE_POKEAPI,
  timeout: 10000,
})

export interface PokemonListItem {
  id: number
  name: string
  number: number
  image: string
  types: string[]
}

export interface PokemonDetail {
  id: number
  name: string
  number: number
  image: string
  images?: {
    front_default?: string
    back_default?: string
    front_shiny?: string
    back_shiny?: string
  }
  types: Array<{
    type: {
      name: string
    }
  }>
  abilities: Array<{
    ability: {
      name: string
    }
    is_hidden: boolean
  }>
  stats: Array<{
    stat: {
      name: string
    }
    base_stat: number
  }>
  moves: Array<{
    move: {
      name: string
    }
  }>
  weight: number
  height: number
}

export interface PokemonSpecies {
  id: number
  evolution_chain: {
    url: string
  }
  description?: string
}

export interface EvolutionChain {
  species: {
    name: string
  }
  evolution_details: Array<{
    trigger?: {
      name: string
    }
    min_level?: number
  }>
  evolves_to: EvolutionChain[]
}

/**
 * Fetch all Pokémon from backend API with fallback to PokeAPI
 */
export async function getAllPokemon(page: number = 1, limit: number = 50, search?: string): Promise<PokemonListItem[]> {
  try {
    const response = await api.get('/pokemon', {
      params: {
        ...(search && { q: search }),
        page,
        limit,
      },
    })
    if (response.data && (response.data.items || Array.isArray(response.data))) {
      const data = Array.isArray(response.data) ? response.data : response.data.items
      if (data && data.length > 0) {
        return data
      }
    }
  } catch (error) {
    console.warn('Backend not available, using PokeAPI fallback:', error)
  }

  // Fallback to PokeAPI
  try {
    const response = await pokeApi.get('/pokemon?limit=151')
    const pokemonList = response.data.results || []
    
    // Fetch details for each Pokemon to get images and types with better batching
    const batchSize = 10
    const detailedPokemon: (PokemonListItem | null)[] = []
    
    for (let i = 0; i < pokemonList.length; i += batchSize) {
      const batch = pokemonList.slice(i, i + batchSize)
      const batchResults = await Promise.allSettled(
        batch.map(async (p: any) => {
          try {
            const detail = await pokeApi.get(`/pokemon/${p.name}`)
            return {
              id: detail.data.id,
              name: detail.data.name,
              number: detail.data.id,
              image: detail.data.sprites?.front_default || '',
              types: detail.data.types?.map((t: any) => t.type.name) || [],
            }
          } catch {
            return null
          }
        })
      )
      
      batchResults.forEach((result) => {
        if (result.status === 'fulfilled') {
          detailedPokemon.push(result.value)
        }
      })
    }
    
    return detailedPokemon.filter((p): p is PokemonListItem => p !== null)
  } catch (fallbackError) {
    console.error('Error fetching all Pokemon from both backend and PokeAPI:', fallbackError)
    throw fallbackError
  }
}

/**
 * Fetch detailed Pokémon information from backend API
 */
export async function getPokemonById(id: number | string): Promise<PokemonDetail> {
  try {
    const response = await api.get(`/pokemon/${id}`)
    return response.data
  } catch (error) {
    console.warn(`Backend failed for Pokemon ${id}, using PokeAPI fallback:`, error)
  }

  // Fallback to PokeAPI
  try {
    const response = await pokeApi.get(`/pokemon/${id}`)
    return response.data
  } catch (fallbackError) {
    console.error(`Error fetching Pokemon ${id}:`, fallbackError)
    throw fallbackError
  }
}

/**
 * Fetch Pokémon species information (fallback to PokeAPI if not available in backend)
 */
export async function getPokemonSpecies(id: number | string): Promise<PokemonSpecies> {
  try {
    // Try backend first
    const response = await api.get(`/pokemon/${id}`)
    return response.data
  } catch {
    // Fallback to PokeAPI
    try {
      const response = await pokeApi.get(`/pokemon-species/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching Pokemon species ${id}:`, error)
      throw error
    }
  }
}

/**
 * Fetch evolution chain data from PokeAPI
 */
export async function getEvolutionChain(url: string): Promise<{ chain: EvolutionChain }> {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching evolution chain:', error)
    throw error
  }
}

/**
 * Search Pokémon by name or number
 */
export function searchPokemon(
  pokemon: PokemonListItem[],
  query: string
): PokemonListItem[] {
  const lowerQuery = query.toLowerCase()
  return pokemon.filter((p) => {
    const nameMatch = p.name.toLowerCase().includes(lowerQuery)
    const numberMatch = p.number.toString().includes(lowerQuery)
    return nameMatch || numberMatch
  })
}

/**
 * Team API functions
 */

export async function createTeam(name: string, ownerToken: string) {
  try {
    const response = await api.post('/team', { name, ownerToken })
    return response.data
  } catch (error) {
    console.error('Error creating team:', error)
    throw error
  }
}

export async function getAllTeams() {
  try {
    const response = await api.get('/team')
    return response.data
  } catch (error) {
    console.error('Error fetching teams:', error)
    throw error
  }
}

export async function getTeamById(id: number) {
  try {
    const response = await api.get(`/team/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching team ${id}:`, error)
    throw error
  }
}

export async function addPokemonToTeam(teamId: number, pokemonId: number, slot: number, ownerToken: string) {
  try {
    const response = await api.post(`/team/${teamId}/pokemon`, {
      pokemonId,
      slot,
    })
    return response.data
  } catch (error) {
    console.error(`Error adding Pokemon to team:`, error)
    throw error
  }
}

export async function removePokemonFromTeam(teamId: number, tpId: number, ownerToken: string) {
  try {
    const response = await api.delete(`/team/${teamId}/pokemon/${tpId}`)
    return response.data
  } catch (error) {
    console.error(`Error removing Pokemon from team:`, error)
    throw error
  }
}

export async function deleteTeam(id: number, ownerToken: string) {
  try {
    const response = await api.delete(`/team/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting team:`, error)
    throw error
  }
}

export default api
