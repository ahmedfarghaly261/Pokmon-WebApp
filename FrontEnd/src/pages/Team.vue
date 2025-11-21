<template>
  <div class="team-page">
    <div class="team-container">
      <!-- Header -->
      <div class="team-header">
        <div>
          <h1 class="team-title">⭐ Your Team</h1>
          <p class="team-subtitle">{{ teamStore.team.length }}/6 Pokémon</p>
        </div>
        <button v-if="teamStore.team.length > 0" @click="clearTeam" class="team-clear-btn">
          🗑️ Clear Team
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="teamStore.team.length === 0" class="team-empty">
        <p>No Pokémon in your team yet. Add up to 6 Pokémon!</p>
      </div>

      <!-- Team Grid -->
      <div v-else>
        <div class="team-grid">
          <div v-for="pokemon in teamStore.team" :key="pokemon.id" class="team-card-wrapper">
            <PokemonCard
              :pokemon="pokemon"
              @select="selectPokemon(pokemon)"
            />
            <div class="team-slot-badge">{{ pokemon.slot }}</div>
            <button @click.stop="removeFromTeam(pokemon.id)" class="team-remove-btn">
              ✕
            </button>
          </div>
        </div>

        <!-- Team Summary -->
        <div class="team-summary">
          <h2 class="team-summary-title">Team Summary</h2>
          <div class="summary-cards">
            <div class="summary-card">
              <p class="summary-label">Total Pokémon</p>
              <p class="summary-value">{{ teamStore.team.length }}/6</p>
            </div>
            <div class="summary-card">
              <p class="summary-label">Slots Available</p>
              <p class="summary-value">{{ teamStore.availableSlots }}</p>
            </div>
            <div class="summary-card">
              <p class="summary-label">Team Strength</p>
              <p class="summary-value">{{ Math.round((teamStore.team.length / 6) * 100) }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTeamStore } from '../stores/teamStore'
import { usePokemonStore } from '../stores/pokemonStore'
import PokemonCard from '../components/PokemonCard.vue'
import type { PokemonListItem } from '../services/api'

const teamStore = useTeamStore()
const pokemonStore = usePokemonStore()

const selectPokemon = async (pokemon: PokemonListItem) => {
  await pokemonStore.fetchPokemonDetails(pokemon.id)
}

const removeFromTeam = (id: number) => {
  teamStore.removeFromTeam(id)
}

const clearTeam = () => {
  if (confirm('Are you sure you want to clear your entire team?')) {
    teamStore.clearTeam()
  }
}
</script>

<style scoped>
.team-page {
  overflow-y: auto;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.team-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem;
}

.team-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.team-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  letter-spacing: -0.5px;
}

.team-subtitle {
  color: #999;
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

.team-clear-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #FF7043 0%, #FF5722 100%);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(255, 87, 34, 0.25);
}

.team-clear-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 87, 34, 0.35);
}

.team-empty {
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

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.team-card-wrapper {
  position: relative;
}

.team-slot-badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: linear-gradient(135deg, #FFD700 0%, #FFC107 100%);
  color: #333;
  font-weight: 800;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  border: 3px solid white;
  font-size: 1.1rem;
  z-index: 2;
}

.team-remove-btn {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF5252 100%);
  color: white;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 3px solid white;
  z-index: 2;
}

.team-card-wrapper:hover .team-remove-btn {
  opacity: 1;
}

.team-remove-btn:hover {
  transform: scale(1.15);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.team-summary {
  background: white;
  border: none;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.team-summary-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.25px;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.summary-card {
  background: linear-gradient(135deg, #f8f9fa 0%, #e8ecf1 100%);
  padding: 1.5rem;
  border-radius: 0.875rem;
  text-align: center;
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;
}

.summary-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.summary-label {
  color: #999;
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-value {
  font-size: 2rem;
  font-weight: 800;
  color: #FF6B6B;
  margin: 0;
}

@media (max-width: 1024px) {
  .team-grid {
    grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  }
}

@media (max-width: 768px) {
  .team-container {
    padding: 1.5rem;
  }

  .team-header {
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    text-align: center;
  }

  .team-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }

  .team-title {
    font-size: 1.75rem;
  }

  .summary-cards {
    grid-template-columns: 1fr;
  }

  .team-summary {
    padding: 1.5rem;
  }
}
</style>
