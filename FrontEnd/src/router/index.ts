import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PokemonList from '../pages/PokemonList.vue'
import Favorites from '../pages/Favorites.vue'
import Team from '../pages/Team.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Browse',
    component: PokemonList,
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: Favorites,
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
