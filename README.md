# Pokémon Web App

A full-stack Pokédex web application built with Vue 3, TypeScript, and NestJS. Browse, search, manage favorites, and build your own Pokémon team.

## 📋 Project Overview

This is a complete Pokédex application featuring:
- **Frontend**: Vue 3 + TypeScript + Pinia + Vue Router with native CSS
- **Backend**: NestJS with TypeORM and PostgreSQL
- **Features**: Browse 151 Pokémon, search, favorites, team builder

## 🏗️ Project Structure

```
Pokémon-Web-App/
├── BackEnd/                    # NestJS Backend
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── database/           # Database setup
│   │   ├── migrations/         # Database migrations
│   │   ├── modules/            # Feature modules
│   │   │   ├── pokemon/        # Pokemon CRUD
│   │   │   └── team/           # Team management
│   │   ├── common/             # Guards, decorators
│   │   └── cli/                # CLI commands for data import
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── docker-compose.yaml
│
└── FrontEnd/                   # Vue 3 Frontend
    ├── src/
    │   ├── main.ts             # Entry point
    │   ├── App.vue             # Root component
    │   ├── style.css           # Global styles
    │   ├── router/             # Vue Router config
    │   ├── stores/             # Pinia stores
    │   │   ├── pokemonStore.ts
    │   │   ├── favoritesStore.ts
    │   │   └── teamStore.ts
    │   ├── services/           # API layer
    │   ├── components/         # Reusable components
    │   └── pages/              # Page components
    ├── package.json
    ├── vite.config.ts
    └── tsconfig.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 12+ (for backend)
- Docker (optional)

### Backend Setup

```bash
cd BackEnd

# Install dependencies
npm install

# Set up environment variables
# Create a .env file with:
# DATABASE_URL=postgresql://user:password@localhost:5432/pokemon
# PORT=3000

# Run database migrations
npm run migration:run

# Import Pokemon data
npm run cli:import-pokemon

# Start development server
npm run start:dev

# Or start production server
npm run build
npm run start
```

**Backend runs on**: `http://localhost:3000`

### Frontend Setup

```bash
cd FrontEnd

# Install dependencies
npm install

# Set up environment variables
# Create a .env file with:
# VITE_API_URL=http://localhost:3000/api

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Frontend runs on**: `http://localhost:5173`

## 📱 Features

### Browse Pokémon
- View all 151 Pokémon with images and details
- Clean list view with hover effects
- View full details including stats, abilities, and moves

### Search & Filter
- Search by name or Pokémon number
- Real-time filtering
- Quick access cards for team and favorites

### Favorites
- Save favorite Pokémon
- Persistent storage using localStorage
- Dedicated favorites page with grid view

### Team Builder
- Build a team of up to 6 Pokémon
- Reorder team members
- View team summary with stats
- Persistent storage using localStorage

## � Screenshots

### Home Page - Browse Pokémon

<img width="1920" height="917" alt="Screenshot 2025-11-21 164002" src="https://github.com/user-attachments/assets/7e775abb-5703-4488-8fa0-139af5dbb7d0" />

The main Pokédex page showing the list of all 151 Pokémon with search functionality, quick access cards for team and favorites.

### Search Functionality
<img width="1920" height="914" alt="Screenshot 2025-11-21 164531" src="https://github.com/user-attachments/assets/68e13f20-1088-47fa-8425-17b637c60e1a" />

Real-time search by Pokémon name or number - type "bee" to filter results instantly.

### Sort & Filter Menu
<img width="1920" height="915" alt="Screenshot 2025-11-21 164636" src="https://github.com/user-attachments/assets/02d9c2bf-dfcb-47c5-823e-598847cd63bb" />

Flexible sorting options with 4 different sort methods:
- ↑↓ Alphabetical ascending
- ↓↑ Alphabetical descending (currently selected with checkmark)
- ↑ Numeric ascending
- ↓ Numeric descending

### Pokémon Detail View
<img width="1920" height="918" alt="Screenshot 2025-11-21 165026" src="https://github.com/user-attachments/assets/86c17c1a-3af2-4531-86e8-0a809dfea99a" />
<img width="1920" height="922" alt="Screenshot 2025-11-21 165001" src="https://github.com/user-attachments/assets/a3500706-81f4-4b10-a50e-a3f011e7c074" />
<img width="1920" height="915" alt="Screenshot 2025-11-21 164941" src="https://github.com/user-attachments/assets/6d98c902-4ef0-46eb-bfd9-bea6dfd0a77b" />

Detailed view of individual Pokémon showing:
- Pokémon image with color-coded background
- Height and weight measurements
- Base stats visualization

### Favorites Page
<img width="1920" height="907" alt="Screenshot 2025-11-21 164733" src="https://github.com/user-attachments/assets/3d926395-f085-4b4b-ae72-787709c0d630" />

Dedicated favorites page displaying:
- Heart icon with title "Favorite Pokémon"
- Count of saved favorites (2 Pokémon)
- Grid view with Pokémon cards
- Quick remove from favorites option

### Team Page
<img width="1920" height="911" alt="Screenshot 2025-11-21 164828" src="https://github.com/user-attachments/assets/3af2b621-184e-425e-b444-017a4cd1b0cf" />
Team builder page showing:
- ⭐ "Your Team" header with Pokémon count (2/6)
- Clear Team button to remove all members
- Team cards with slot numbers (1, 2, etc.)
- Pokémon images displaying correctly
- Type badges for each team member
- Team Summary section with stats



### Pokemon Endpoints
```
GET /api/pokemon              # List all Pokemon (with pagination)
  - Query params: q (search), page, limit
GET /api/pokemon/:id          # Get Pokemon details
```

### Team Endpoints
```
POST /api/team                # Create team
GET /api/team                 # List all teams
GET /api/team/:id             # Get team details
POST /api/team/:id/pokemon    # Add Pokemon to team
DELETE /api/team/:id/pokemon/:tpId  # Remove Pokemon from team
DELETE /api/team/:id          # Delete team
```

## 🛠️ Technology Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Pinia** - State management
- **Vue Router** - Client-side routing
- **Axios** - HTTP client
- **Native CSS** - No utility CSS frameworks

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeORM** - ORM for TypeScript
- **PostgreSQL** - Relational database
- **Passport** - Authentication

## 📊 Data Sources

- **Primary**: PokeAPI (https://pokeapi.co) - when backend is unavailable
- **Backend**: PostgreSQL with imported Pokemon data
- **Frontend**: PokeAPI fallback for images and details

## 🔄 API Data Flow

1. Frontend requests Pokemon list from backend (`http://localhost:3000/api/pokemon`)
2. If backend is unavailable (5s timeout), falls back to PokeAPI
3. Data is fetched in batches of 10 for optimal performance
4. Images are cached by browser
5. Favorites and team data stored in localStorage

## 🐳 Docker Support

### Build and Run with Docker

```bash
# Backend
cd BackEnd
docker build -t pokemon-backend .
docker run -p 3000:3000 pokemon-backend

# Frontend
cd FrontEnd
docker build -t pokemon-frontend .
docker run -p 5173:5173 pokemon-frontend

# Or use docker-compose
docker-compose up
```

## 📝 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/pokemon
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

## 🧪 Testing

```bash
# Frontend
cd FrontEnd
npm run test

# Backend
cd BackEnd
npm run test
```

## 📚 Project Documentation

- **QUICK_START.md** - Step-by-step setup guide
- **PROJECT_DOCUMENTATION.md** - Detailed technical documentation
- **CODE_SUMMARY.md** - Code organization and structure

## 🎨 UI Design

- Modern card-based design
- Smooth animations and transitions
- Responsive layout (mobile, tablet, desktop)
- Type-specific color coding for Pokemon
- Professional color gradients and shadows

## 🔐 Security

- Environment variable protection
- Authentication guards on protected routes
- CORS configuration on backend
- SQL injection prevention via TypeORM

## 📈 Performance

- Lazy loading of Pokemon details
- Batch API requests to PokeAPI
- Client-side search and filtering
- Cached images
- Optimized CSS and JavaScript

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Troubleshooting

### Backend won't start
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env
- Run migrations: `npm run migration:run`

### Frontend shows no Pokemon
- Check if backend is running or accessible
- Verify VITE_API_URL environment variable
- Check browser console for errors
- Frontend will automatically fallback to PokeAPI

### Images not loading
- Check internet connection for PokeAPI
- Verify image URLs in network tab
- Clear browser cache

---

**Built with ❤️ for Pokémon fans**
