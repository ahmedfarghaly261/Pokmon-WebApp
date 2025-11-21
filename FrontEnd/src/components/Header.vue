<template>
  <div class="header-container">
    <div class="header-content">
      <div class="header-title-section">
        <h1 class="header-title">Pokédex</h1>
        <p class="header-subtitle">Gotta Catch 'Em All</p>
      </div>
      <nav class="header-nav">
        <router-link
          to="/"
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === '/' }"
        >
          Browse
        </router-link>
        <router-link
          to="/favorites"
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === '/favorites' }"
        >
          Favorites ({{ favoritesCount }})
        </router-link>
        <router-link
          to="/team"
          class="nav-link"
          :class="{ 'nav-link-active': $route.path === '/team' }"
        >
          Team ({{ teamCount }})
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFavoritesStore } from '../stores/favoritesStore'
import { useTeamStore } from '../stores/teamStore'

const favoritesStore = useFavoritesStore()
const teamStore = useTeamStore()

const favoritesCount = computed(() => favoritesStore.favorites.length)
const teamCount = computed(() => teamStore.team.length)
</script>

<style scoped>
.header-container {
  background: linear-gradient(135deg, #FF6B6B 0%, #F06595 50%, #C92A2A 100%);
  color: white;
  padding: 1.75rem 0;
  box-shadow: 0 8px 24px rgba(255, 107, 107, 0.25);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.header-title-section {
  flex: 1;
}

.header-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 0;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -1px;
}

.header-subtitle {
  font-size: 0.95rem;
  margin: 0.35rem 0 0 0;
  opacity: 0.95;
  font-style: italic;
  font-weight: 500;
}

.header-nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  color: white;
  font-weight: 600;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  border: 2px solid transparent;
  background: rgba(255, 255, 255, 0.1);
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.nav-link-active {
  border-bottom: none;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .header-title {
    font-size: 1.875rem;
  }

  .header-nav {
    width: 100%;
    justify-content: space-around;
    gap: 0.5rem;
  }

  .nav-link {
    font-size: 0.85rem;
    padding: 0.4rem 0.6rem;
  }
}
</style>
