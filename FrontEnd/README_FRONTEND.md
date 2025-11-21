# 🎨 Pokémon Pokédex Frontend

A modern Vue 3 + TypeScript frontend for browsing, searching, and managing Pokémon. Features a beautiful responsive UI with smooth animations and persistent state management.

---

## 📋 Quick Overview

| Feature | Details |
|---------|---------|
| **Framework** | Vue 3 (Composition API) |
| **Language** | TypeScript |
| **Styling** | Native CSS (no frameworks) |
| **State Management** | Pinia |
| **Routing** | Vue Router |
| **HTTP Client** | Axios |
| **Build Tool** | Vite |
| **Dev Port** | 5173 |

---

## 🚀 Quick Start (3 minutes)

### Prerequisites
```bash
node --version    # v18.0.0+
npm --version     # 8.0.0+
```

### Setup Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file:**
```bash
# Windows
echo VITE_API_URL=http://localhost:3000/api > .env

# macOS/Linux
echo "VITE_API_URL=http://localhost:3000/api" > .env
```

3. **Start development server:**
```bash
npm run dev
```

✅ **Frontend ready at**: `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── main.ts                           # Entry point
├── App.vue                           # Root component
├── style.css                         # Global styles
├── vite-env.d.ts                     # Vite types
│
├── router/
│   └── index.ts                      # Route configuration
│
├── stores/
│   ├── pokemonStore.ts              # Pokemon data store (Pinia)
│   ├── favoritesStore.ts            # Favorites management (Pinia)
│   └── teamStore.ts                 # Team builder store (Pinia)
│
├── services/
│   └── api.ts                        # API communication layer
│
├── components/
│   ├── Header.vue                   # Navigation header
│   ├── PokemonCard.vue              # Pokemon grid card
│   ├── PokemonDetailView.vue        # Detail modal
│   ├── SearchInput.vue              # Search bar
│   ├── LoadingSpinner.vue           # Loading indicator
│   ├── ErrorMessage.vue             # Error message
│   ├── StatHexagon.vue              # Stats chart
│   └── EmptyState.vue               # Empty state
│
├── pages/
│   ├── PokemonList.vue              # Main browse page (/)
│   ├── Favorites.vue                # Favorites page (/favorites)
│   └── Team.vue                     # Team builder (/team)
│
└── assets/
    └── styles/
        └── tailwind.css             # Asset file
```

---

## 📖 Pages & Components

### Pages

#### PokemonList.vue (/)
Main browsing page with search and quick access.

**Features:**
- Search by name or number (real-time)
- 151 Pokémon in a scrollable list
- Quick access cards (Team, Favorites)
- Detail modal on click
- Favorite toggle button

**Key Methods:**
- `selectPokemon(id)` - Open detail modal
- `toggleFavorite(id)` - Add/remove favorite

---

#### Favorites.vue (/favorites)
View all saved favorite Pokémon.

**Features:**
- Grid view of favorites
- Remove from favorites button
- Click to view details
- Empty state message

**Key Methods:**
- `removeFavorite(id)` - Remove from favorites

---

#### Team.vue (/team)
Build and manage your Pokémon team (max 6).

**Features:**
- 6 team slots
- Add/remove Pokémon
- Team statistics
- Reorder team members

**Key Methods:**
- `addToTeam(pokemon)` - Add Pokémon
- `removeFromTeam(id)` - Remove Pokémon

---

### Components

#### Header.vue
Navigation header showing title and counts.

**Props:** None

**Features:**
- Pokédex title
- Favorites count
- Team count
- Active route highlighting

```vue
<template>
  <header class="header">
    <h1>Pokédex</h1>
    <nav>
      <RouterLink to="/">Browse</RouterLink>
      <RouterLink to="/favorites">Favorites ({{ favorites.length }})</RouterLink>
      <RouterLink to="/team">Team ({{ team.length }})</RouterLink>
    </nav>
  </header>
</template>
```

---

#### SearchInput.vue
Real-time search bar for Pokémon.

**Props:**
- `modelValue: string` - Current search query

**Events:**
- `update:modelValue` - Query changed

```vue
<SearchInput 
  v-model="searchQuery"
  placeholder="Search Pokémon..."
/>
```

---

#### PokemonDetailView.vue
Modal showing full Pokémon details.

**Props:**
- `pokemon: PokemonDetail` - Pokémon data
- `modelValue: boolean` - Modal visibility

**Events:**
- `update:modelValue` - Close modal
- `favorite-toggle` - Favorite clicked
- `add-to-team` - Add to team clicked

**Features:**
- Image with smart fallback
- Stats hexagon chart
- Type badges
- Abilities and moves
- Add to favorites button
- Add to team button

```vue
<PokemonDetailView 
  v-model="showDetails"
  :pokemon="currentPokemon"
  @favorite-toggle="toggleFavorite"
  @add-to-team="addToTeam"
/>
```

---

#### LoadingSpinner.vue
Animated loading indicator.

**Props:**
- `message: string` - Optional message

```vue
<LoadingSpinner message="Loading Pokémon..." />
```

---

#### ErrorMessage.vue
Error state with retry button.

**Props:**
- `error: string` - Error message
- `onRetry: function` - Retry callback

```vue
<ErrorMessage 
  :error="errorMsg"
  :onRetry="retryLoadingPokemon"
/>
```

---

#### StatHexagon.vue
Hexagon chart for Pokémon stats.

**Props:**
- `stats: object` - Stats object

```vue
<StatHexagon 
  :stats="{
    hp: 45,
    attack: 49,
    defense: 49,
    spAtk: 65,
    spDef: 65,
    speed: 45
  }"
/>
```

---

#### PokemonCard.vue
Individual Pokémon card (grid view).

**Props:**
- `pokemon: PokemonListItem`
- `isFavorite: boolean`

**Events:**
- `select` - Card clicked
- `favorite-toggle` - Heart clicked

```vue
<PokemonCard 
  :pokemon="pokemon"
  :isFavorite="isFavorite"
  @select="selectPokemon"
  @favorite-toggle="toggleFavorite"
/>
```

---

## 🔌 API Integration

### API Service (api.ts)

Dual axios instances with smart fallback.

```typescript
// Dual Instances
- backendInstance    // 5s timeout
- pokeapiInstance    // 10s timeout

// Methods
getAllPokemon(q?: string, page?: number)
getPokemonById(id: number)
getPokemonSpecies(id: number)
getEvolutionChain(id: number)
createTeam(data): Promise<Team>
getAllTeams(): Promise<Team[]>
getTeamById(id: number): Promise<Team>
addPokemonToTeam(teamId, pokemonId): Promise<Team>
removePokemonFromTeam(teamId, pokemonId): Promise<Team>
deleteTeam(id: number): Promise<void>
```

### Data Flow

```
User Input
  ↓
Vue Component Method
  ↓
Pinia Store Action
  ↓
API Service
  ↓
Backend API (5s timeout)
  ↓
If Success: Return data
If Fail: PokeAPI Fallback (10s timeout)
  ↓
Store Update
  ↓
Component Reactivity
  ↓
DOM Update
```

---

## 🎨 Styling & Design

### Global Styles (style.css)

**Type Colors:**
```css
/* 18 Pokémon types */
--type-normal: #A8A878;
--type-fire: #F08030;
--type-water: #6890F0;
--type-grass: #78C850;
--type-electric: #F8D030;
--type-ice: #98D8D8;
--type-fighting: #C03028;
--type-poison: #A040A0;
--type-ground: #E0C068;
--type-flying: #A890F0;
--type-psychic: #F85888;
--type-bug: #A8B820;
--type-rock: #B8A038;
--type-ghost: #705898;
--type-dragon: #7038F8;
--type-dark: #705848;
--type-steel: #B8B8D0;
--type-fairy: #EE99AC;
```

**Animations:**
```css
@keyframes fadeIn { /* Fade in */ }
@keyframes slideInUp { /* Slide up */ }
@keyframes spin { /* Rotation */ }
```

### Responsive Design

- **Mobile**: 320px - 768px (1 column)
- **Tablet**: 769px - 1024px (2 columns)
- **Desktop**: 1025px+ (3+ columns)

---

## 📊 State Management (Pinia)

### pokemonStore.ts

```typescript
// State
pokemonList: PokemonListItem[]
currentPokemon: PokemonDetail | null
loading: boolean
error: string | null
searchQuery: string

// Actions
fetchAllPokemon(): Promise<void>
fetchPokemonDetails(id: number): Promise<void>
getPokemonById(id: number): PokemonDetail | null
setSearchQuery(query: string): void

// Computed
filteredPokemon: PokemonListItem[]
```

### favoritesStore.ts

```typescript
// State
favorites: number[]

// Actions
addFavorite(id: number): void
removeFavorite(id: number): void
toggleFavorite(id: number): void
isFavorite(id: number): boolean
clearFavorites(): void

// Persistence
localStorage key: 'pokemon_favorites'
```

### teamStore.ts

```typescript
// State
team: PokemonTeam[]

// Actions
addToTeam(pokemon: Pokemon): void
removeFromTeam(pokemonId: number): void
isInTeam(id: number): boolean
reorderTeam(fromIndex: number, toIndex: number): void
clearTeam(): void

// Computed
isTeamFull: boolean
availableSlots: number

// Persistence
localStorage key: 'pokemon_team'
```

---

## 🛠️ Available Commands

### Development

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Code Quality

```bash
# Type checking
npm run type-check

# Linting (if configured)
npm run lint

# Fix linting issues
npm run lint:fix
```

### Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Watch mode
npm run test:watch
```

---

## 📝 Environment Variables

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api

# Build
VITE_INLINE_LIMIT=4096
```

---

## 🔄 Data Flow Examples

### Loading Pokémon List

```
1. App mounted
2. PokemonList.vue mounted()
3. pokemonStore.fetchAllPokemon()
4. API Service:
   - GET http://localhost:3000/api/pokemon (5s timeout)
   - If fails: Fetch from PokeAPI in batches of 10
5. Store updates pokemonList
6. Component displays results
```

### Adding to Favorites

```
1. User clicks heart icon
2. toggleFavorite(pokemonId) called
3. favoritesStore.toggleFavorite(pokemonId)
4. State updated
5. localStorage updated (via watch effect)
6. Icon styling changes
7. Header count updates
```

### Building Team

```
1. User clicks "Add to Team"
2. teamStore.addToTeam(pokemon)
3. Check if team is full (max 6)
4. Add Pokemon to team state
5. localStorage updated
6. Team page reflects changes
```

---

## 🎯 Features

### Browse Pokémon
- ✅ View all 151 Pokémon
- ✅ List-style scrollable interface
- ✅ 80x80px images with gradients
- ✅ Click to view detailed info

### Search & Filter
- ✅ Real-time search by name or number
- ✅ Instant results as you type
- ✅ Type-specific badges

### Favorites
- ✅ Save favorite Pokémon
- ✅ Persistent storage (localStorage)
- ✅ Dedicated favorites page
- ✅ Quick access card on home

### Team Builder
- ✅ Build teams up to 6 Pokémon
- ✅ Drag to reorder (if implemented)
- ✅ Team statistics view
- ✅ Persistent storage (localStorage)

### Design
- ✅ Modern gradients and shadows
- ✅ Smooth animations
- ✅ Responsive mobile-first design
- ✅ Type-based color coding

---

## 🐛 Troubleshooting

### Port 5173 Already in Use

```bash
# Vite will try next port automatically (5174, 5175, etc)
# Or kill existing process:
netstat -ano | findstr :5173    # Windows
lsof -i :5173                    # macOS/Linux
```

### Frontend Shows No Pokémon

```
1. Check backend is running: http://localhost:3000/api/pokemon
2. Check console (F12) for errors
3. Check network tab for failed requests
4. Verify VITE_API_URL env variable
5. Try hard refresh: Ctrl+Shift+R
```

### Images Not Loading

```
1. Check internet connection
2. Check PokeAPI is accessible: https://pokeapi.co/api/v2/
3. Clear browser cache
4. Check image URLs in network tab
```

### Search Not Working

```
1. Check pokemonStore is initialized
2. Verify searchQuery is binding correctly
3. Check console for store errors
4. Ensure pokemon list is loaded first
```

### localStorage Not Persisting

```
1. Check browser privacy settings
2. Try incognito mode to test
3. Check if localStorage is disabled
4. Check browser developer console for errors
```

---

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
```

Creates `dist/` folder with optimized files.

### Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
# Connect repository on netlify.com
# Deploy automatically on push
```

### Deploy to GitHub Pages

```bash
# Configure vite.config.ts
export default {
  base: '/pokémon-web-app/',
}

# Build and deploy
npm run build
# Upload dist/ to gh-pages branch
```

---

## 📚 Code Examples

### Using pokemonStore

```typescript
import { usePokemonStore } from '@/stores/pokemonStore'

const pokemonStore = usePokemonStore()

// Fetch all Pokémon
await pokemonStore.fetchAllPokemon()

// Get filtered list
const filtered = pokemonStore.filteredPokemon

// Get specific Pokémon
const pokemon = pokemonStore.getPokemonById(1)

// Update search
pokemonStore.setSearchQuery('bulbasaur')
```

### Using favoritesStore

```typescript
import { useFavoritesStore } from '@/stores/favoritesStore'

const favoritesStore = useFavoritesStore()

// Add favorite
favoritesStore.addFavorite(1)

// Check if favorite
const isFav = favoritesStore.isFavorite(1)

// Remove favorite
favoritesStore.removeFavorite(1)

// Get all favorites
const faves = favoritesStore.favoritesList
```

### Using teamStore

```typescript
import { useTeamStore } from '@/stores/teamStore'

const teamStore = useTeamStore()

// Add to team
teamStore.addToTeam(pokemon)

// Check if in team
const inTeam = teamStore.isInTeam(1)

// Get team
const myTeam = teamStore.team

// Check if full
if (teamStore.isTeamFull) {
  console.log('Team is full!')
}
```

---

## 🔗 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vue` | ^3.3 | UI framework |
| `vue-router` | ^4.2 | Client routing |
| `pinia` | ^2.1 | State management |
| `axios` | ^1.4 | HTTP client |
| `typescript` | ^5.0 | Type safety |
| `vite` | ^4.3 | Build tool |

---

## 📄 License

MIT License - see LICENSE file

---

## 🆘 Support

- **Frontend Issues**: Check console (F12)
- **API Issues**: Check Network tab (F12)
- **Docs**: See PROJECT_DOCUMENTATION.md
- **GitHub Issues**: Create an issue

---

**Built with ❤️ for Pokémon fans**
