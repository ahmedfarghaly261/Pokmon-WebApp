# Pokédex Web Application - Frontend

A production-ready Pokédex web application built with **Vue 3**, **TypeScript**, and **Native CSS** (no Tailwind). Features the original 151 Pokémon with search, favorites, team building, and detailed statistics.

## 🎯 Features

### Core Features
- **Browse Pokémon**: Display all 151 original Pokémon with name, number, image, and types
- **Search**: Search by name or Pokémon number
- **Pokémon Details**: View complete information including:
  - Multiple images (front, back, shiny variants)
  - Types and abilities
  - Base stats (displayed in hexagon chart)
  - Move set
  - Height and weight

### User Features
- **Favorites System**: Save favorite Pokémon with localStorage persistence
- **Team Builder**: Create a team of up to 6 Pokémon
- **Responsive Design**: Desktop-first split layout, mobile-friendly
- **Error Handling**: Comprehensive loading and error states

## 🏗️ Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── Header.vue              # Navigation header
│   ├── PokemonCard.vue         # Pokémon card display
│   ├── PokemonDetailView.vue   # Detail panel
│   ├── SearchInput.vue         # Search bar
│   ├── StatHexagon.vue         # Stats visualization
│   ├── LoadingSpinner.vue      # Loading indicator
│   ├── ErrorMessage.vue        # Error display
│   └── EmptyState.vue          # Empty state placeholder
├── pages/               # Route pages
│   ├── PokemonList.vue         # Main list view
│   ├── Favorites.vue           # Favorites page
│   └── Team.vue                # Team management page
├── services/            # API integration
│   └── api.ts                  # Axios API calls
├── stores/              # Pinia state management
│   ├── pokemonStore.ts         # Pokémon state
│   ├── favoritesStore.ts       # Favorites state
│   └── teamStore.ts            # Team state
├── router/              # Vue Router
│   └── index.ts                # Route configuration
├── App.vue              # Root component
├── main.ts              # Entry point
└── style.css            # Global styles (native CSS)
```

## 🛠️ Tech Stack

- **Vue 3** - Frontend framework with Composition API + `<script setup>`
- **TypeScript** - Type safety
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Axios** - HTTP client
- **Native CSS** - All styling using native CSS (no Tailwind)

## 📦 Installation

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔌 API Integration

### APIs Used

1. **Pokémon List**
   ```
   https://stoplight.io/mocks/appwise-be/pokemon/57519009/pokemon
   ```

2. **Pokémon Details** (PokéAPI)
   ```
   https://pokeapi.co/api/v2/pokemon/:id
   ```

3. **Pokémon Species** (PokéAPI)
   ```
   https://pokeapi.co/api/v2/pokemon-species/:id
   ```

4. **Evolution Chain** (PokéAPI)
   ```
   https://pokeapi.co/api/v2/evolution-chain/:id
   ```

### API Functions (services/api.ts)
- `getAllPokemon()` - Fetch list of all 151 Pokémon
- `getPokemonById(id)` - Fetch detailed Pokémon info
- `getPokemonSpecies(id)` - Fetch species data
- `getEvolutionChain(url)` - Fetch evolution chain
- `searchPokemon(pokemon, query)` - Client-side search

## 💾 State Management

### Pinia Stores

#### `usePokemonStore()`
```typescript
- pokemonList: PokemonListItem[]        // All Pokémon
- currentPokemon: PokemonDetail | null  // Selected Pokémon
- loading: boolean                      // Loading state
- detailLoading: boolean                // Detail loading
- error: string | null                  // Error message
- searchQuery: string                   // Search input

Methods:
- fetchAllPokemon()                     // Load all Pokémon
- fetchPokemonDetails(id)               // Load details
- setSearchQuery(query)                 // Update search
```

#### `useFavoritesStore()`
```typescript
- favorites: PokemonListItem[]          // Favorite Pokémon

Methods:
- addFavorite(pokemon)                  // Add to favorites
- removeFavorite(id)                    // Remove from favorites
- toggleFavorite(pokemon)               // Toggle favorite
- isFavorite(id)                        // Check if favorite
- clearFavorites()                      // Clear all
```

#### `useTeamStore()`
```typescript
- team: TeamMember[]                    // Team Pokémon (max 6)
- MAX_TEAM_SIZE: 6                      // Team limit

Methods:
- addToTeam(pokemon)                    // Add to team
- removeFromTeam(id)                    // Remove from team
- isInTeam(id)                          // Check if in team
- reorderTeam(oldIdx, newIdx)           // Reorder team
- clearTeam()                           // Clear team
```

### Data Persistence
- **Favorites**: Stored in `localStorage` under key `pokemon_favorites`
- **Team**: Stored in `localStorage` under key `pokemon_team`
- Auto-loads on app startup
- Syncs automatically on changes

## 🎨 Styling

All styling uses **native CSS** with:
- CSS Grid and Flexbox for layouts
- CSS variables for colors
- Responsive media queries
- Smooth transitions and animations
- Type-specific color schemes for Pokémon types

### Color Palette
- Primary: #ff6b6b (Pokemon Red)
- Background: #f5f5f5
- Border: #e0e0e0
- Text: #333

### Type Colors
Each Pokémon type has a specific color:
- Normal: #a8a878
- Fire: #f08030
- Water: #6890f0
- Grass: #78c850
- Electric: #f8d030
- Ice: #98d8d8
- Fighting: #c03028
- Poison: #a040a0
- Ground: #e0c068
- Flying: #a890f0
- Psychic: #f85888
- Bug: #a8b820
- Rock: #b8a038
- Ghost: #705898
- Dragon: #7038f8
- Dark: #705848
- Steel: #b8b8d0
- Fairy: #ee99ac

## 📱 Responsive Breakpoints

- **Desktop**: 1024px+ (split layout with sidebar)
- **Tablet**: 768px - 1024px (adjusted grid)
- **Mobile**: < 768px (single column layout)

## 🎯 Component Guide

### PokemonCard
Displays a Pokémon with image, types, and favorite button
```vue
<PokemonCard
  :pokemon="pokemon"
  :is-favorite="isFavorite"
  :is-selected="isSelected"
  @select="handleSelect"
  @toggle-favorite="handleToggle"
/>
```

### PokemonDetailView
Shows full Pokémon details with stats hexagon
```vue
<PokemonDetailView />
```

### StatHexagon
Visualizes base stats in a hexagon chart
```vue
<StatHexagon :stats="stats" :primary-color="#ff6b6b" />
```

### SearchInput
Search bar with clear button
```vue
<SearchInput v-model="searchQuery" />
```

## 🚀 Performance Optimizations

- Lazy component loading via Vue Router
- Efficient localStorage caching
- Memoized computed properties
- Debounced search
- CSS Grid for optimal layout performance
- Minimal bundle size with native CSS

## 🔒 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📖 Usage Examples

### Add Pokémon to Favorites
```typescript
const favoritesStore = useFavoritesStore()
favoritesStore.addFavorite(pokemon)
```

### Create a Team
```typescript
const teamStore = useTeamStore()
teamStore.addToTeam(pokemon)  // Max 6 Pokémon
```

### Search Pokémon
```typescript
const pokemonStore = usePokemonStore()
pokemonStore.setSearchQuery('pikachu')
// Use computed filteredPokemon
```

### Fetch Pokémon Details
```typescript
const pokemonStore = usePokemonStore()
await pokemonStore.fetchPokemonDetails(25)  // Pikachu
```

## 🐛 Debugging

Enable Vue DevTools for:
- Component inspection
- State management debugging
- Router event tracking
- Performance profiling

## 📝 Development Notes

- Use TypeScript for type safety
- Follow Vue 3 Composition API conventions
- All CSS is native (no utility frameworks)
- Components are fully scoped
- Stores use composable pattern
- API calls include error handling

## 📄 License

MIT - Feel free to use this project for personal or commercial purposes.

## 🙏 Credits

- Pokémon data from [PokéAPI](https://pokeapi.co)
- Mock API from Stoplight
- Built with Vue 3 and TypeScript

## 🤝 Contributing

Feel free to submit issues and enhancement requests!
