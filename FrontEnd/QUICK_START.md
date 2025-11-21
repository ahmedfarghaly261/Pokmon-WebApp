# Quick Start Guide - Pokédex Frontend

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### 3. Build for Production
```bash
npm run build
```

## 📂 Key Files Modified/Created

### Core Setup
- ✅ `src/main.ts` - Entry point with Pinia & Router
- ✅ `src/App.vue` - Root component with layout
- ✅ `src/style.css` - Global native CSS styles

### Services
- ✅ `src/services/api.ts` - API integration (Axios)
  - `getAllPokemon()` - Fetch all 151 Pokémon
  - `getPokemonById(id)` - Fetch Pokémon details
  - `getPokemonSpecies(id)` - Fetch species data
  - `getEvolutionChain(url)` - Fetch evolution chain

### State Management (Pinia Stores)
- ✅ `src/stores/pokemonStore.ts` - Pokémon list & details
- ✅ `src/stores/favoritesStore.ts` - Favorites (localStorage)
- ✅ `src/stores/teamStore.ts` - Team builder (localStorage)

### Router
- ✅ `src/router/index.ts` - Vue Router configuration
  - `/` - Browse Pokémon
  - `/favorites` - Favorites page
  - `/team` - Team management

### Components (Native CSS)
- ✅ `src/components/Header.vue` - Navigation header
- ✅ `src/components/PokemonCard.vue` - Pokémon card
- ✅ `src/components/PokemonDetailView.vue` - Detail panel
- ✅ `src/components/StatHexagon.vue` - Stats visualization
- ✅ `src/components/SearchInput.vue` - Search bar
- ✅ `src/components/LoadingSpinner.vue` - Loading state
- ✅ `src/components/ErrorMessage.vue` - Error display
- ✅ `src/components/EmptyState.vue` - Empty state

### Pages
- ✅ `src/pages/PokemonList.vue` - Main browse page (desktop split layout)
- ✅ `src/pages/Favorites.vue` - Favorites page
- ✅ `src/pages/Team.vue` - Team management page

## 🎯 Features Implemented

### Browse & Search
- [x] Display all 151 original Pokémon
- [x] Search by name or number
- [x] Desktop split layout (list + details)
- [x] Mobile responsive layout

### Pokémon Details
- [x] Image display (official artwork)
- [x] Type badges with color coding
- [x] Height & weight info
- [x] Base stats hexagon chart
- [x] Abilities list
- [x] Move set (first 12)
- [x] Evolution chain support

### Favorites System
- [x] Add/remove favorites
- [x] Favorite heart button on cards
- [x] Dedicated favorites page
- [x] localStorage persistence
- [x] Count display in header

### Team Builder
- [x] Add up to 6 Pokémon
- [x] Team member slots
- [x] Remove from team
- [x] Team summary stats
- [x] localStorage persistence
- [x] Count display in header
- [x] Reorder capability

### UI/UX
- [x] Loading spinners
- [x] Error messages with retry
- [x] Empty states
- [x] Smooth transitions
- [x] Hover effects
- [x] Type-based color schemes
- [x] Responsive design

## 🔧 Configuration Files

### `tailwind.config.js` (Not Used - Native CSS Only)
Project uses native CSS instead of Tailwind for full control.

### `postcss.config.js` (Optional)
```javascript
export default {
  plugins: {
    autoprefixer: {},
  },
}
```

### `vite.config.ts`
Already configured for Vue 3 + TypeScript

### `tsconfig.json`
TypeScript configuration for Vue 3 + Vite

## 📡 API Endpoints

### Pokémon List
```
GET https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon
Returns: [{ id, name, number, image, types }, ...]
```

### Pokémon Details
```
GET https://pokeapi.co/api/v2/pokemon/{id}
Returns: { id, name, types[], abilities[], stats[], moves[], height, weight, ... }
```

### Pokémon Species
```
GET https://pokeapi.co/api/v2/pokemon-species/{id}
Returns: { id, evolution_chain: { url: "..." }, ... }
```

### Evolution Chain
```
GET https://pokeapi.co/api/v2/evolution-chain/{id}
Returns: { chain: { species, evolves_to[] } }
```

## 💾 localStorage Keys

- `pokemon_favorites` - Array of favorite Pokémon
- `pokemon_team` - Array of team Pokémon (max 6)

## 🎨 CSS Highlights

- **No utility framework** - Pure native CSS
- **Responsive grid layouts** - Mobile-first
- **Type-specific colors** - 18 Pokémon types
- **Smooth animations** - Transitions & keyframes
- **Flexbox & CSS Grid** - Modern layout techniques
- **Custom scrollbars** - Styled scrollbars
- **Media queries** - Desktop, tablet, mobile

## 🚨 Common Issues & Solutions

### API Not Loading
- Check internet connection
- APIs might have rate limiting
- Check browser console for CORS issues

### Favorites/Team Not Persisting
- Check if localStorage is enabled
- Check browser storage quota
- Open DevTools → Application → localStorage

### Styles Not Applying
- Clear browser cache (Ctrl+Shift+R)
- Ensure style.css is imported in main.ts
- Check that scoped styles are correct

### Build Issues
- Delete `node_modules` and reinstall: `npm install`
- Clear Vite cache: `npm run build -- --force`
- Check Node version: `node --version` (requires 16+)

## 📚 Component API

### usePokemonStore()
```typescript
pokemonList: PokemonListItem[]
currentPokemon: PokemonDetail | null
loading: boolean
error: string | null
filteredPokemon: PokemonListItem[]

fetchAllPokemon()
fetchPokemonDetails(id)
setSearchQuery(query)
getPokemonById(id)
```

### useFavoritesStore()
```typescript
favorites: PokemonListItem[]

addFavorite(pokemon)
removeFavorite(id)
toggleFavorite(pokemon)
isFavorite(id)
clearFavorites()
```

### useTeamStore()
```typescript
team: TeamMember[]
isTeamFull: boolean
availableSlots: number

addToTeam(pokemon)
removeFromTeam(id)
isInTeam(id)
reorderTeam(oldIdx, newIdx)
clearTeam()
```

## 🔍 Debugging Tips

1. **Vue DevTools** - Install Vue.js DevTools browser extension
2. **Network Tab** - Check API calls in DevTools
3. **Console Errors** - Check for TypeScript/runtime errors
4. **State Inspection** - Use Pinia DevTools to inspect stores
5. **Router Debugging** - Check router logs in console

## 📦 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy 'dist' folder
```

### Static Hosting
- Build: `npm run build`
- Upload `dist/` folder to any static host
- Set router mode to hash if needed

## ✨ Next Steps

1. Customize the color scheme in `style.css`
2. Add more Pokémon (update limit in `api.ts`)
3. Implement evolution chain visualization
4. Add sprite carousel
5. Add battle simulator
6. Connect to backend API

## 📝 Notes

- All styling is native CSS (no Tailwind)
- All components use Vue 3 Composition API with `<script setup>`
- TypeScript for full type safety
- Pinia for state management
- localStorage for data persistence
- Responsive design with mobile support

## 🆘 Support

Check the full documentation in `PROJECT_DOCUMENTATION.md`
