# 🎯 Pokémon Pokédex Backend

A robust NestJS backend for the original 151 Pokémon. Features REST API, database persistence with TypeORM + PostgreSQL, and CLI utilities for data management.

---

## 📋 Quick Overview

| Feature | Details |
|---------|---------|
| **Framework** | NestJS (Progressive Node.js) |
| **Database** | PostgreSQL 12+ |
| **ORM** | TypeORM |
| **Authentication** | Bearer Token (Team routes) |
| **API Port** | 3000 |
| **Data Source** | PokéAPI (import) |

---

## 🚀 Quick Start (5 minutes)

### Prerequisites
```bash
node --version    # v18.0.0+
npm --version     # 8.0.0+
psql --version    # 12.0+
```

### Setup Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file:**
```bash
# Windows
echo DATABASE_URL=postgresql://postgres:password@localhost:5432/pokemon_db > .env
echo PORT=3000 >> .env
echo TEAM_API_TOKEN=SECRET123 >> .env

# macOS/Linux
cat > .env << EOF
DATABASE_URL=postgresql://postgres:password@localhost:5432/pokemon_db
PORT=3000
TEAM_API_TOKEN=SECRET123
EOF
```

3. **Create PostgreSQL database:**
```bash
createdb pokemon_db
```

4. **Run migrations:**
```bash
npm run migration:run
```

5. **Import Pokémon data:**
```bash
npm run cli:import-pokemon
```

6. **Start development server:**
```bash
npm run start:dev
```

✅ **API ready at**: `http://localhost:3000/api`

---

## 📁 Project Structure

```
src/
├── main.ts                           # Entry point
├── app.module.ts                     # Root module
├── health.controller.ts              # Health check endpoint
│
├── database/
│   ├── data-source.ts               # TypeORM configuration
│   └── database.module.ts           # Database module
│
├── migrations/
│   ├── 1680000000001-CreatePokemonTables.ts
│   └── 1680000000002-CreateTeamTables.ts
│
├── modules/
│   ├── pokemon/
│   │   ├── pokemon.module.ts        # Pokemon feature module
│   │   ├── pokemon.controller.ts    # Routes: GET /api/pokemon
│   │   ├── pokemon.service.ts       # Business logic
│   │   ├── dto/
│   │   │   └── pokemon-list.dto.ts
│   │   └── entities/
│   │       ├── pokemon.entity.ts
│   │       ├── pokemon-type.entity.ts
│   │       └── pokemon-stat.entity.ts
│   │
│   └── team/
│       ├── team.module.ts           # Team feature module
│       ├── team.controller.ts       # Routes: POST/GET /api/team
│       ├── team.service.ts          # Business logic
│       ├── dto/
│       │   ├── create-team.dto.ts
│       │   └── add-pokemon.dto.ts
│       └── entities/
│           ├── team.entity.ts
│           └── team-pokemon.entity.ts
│
├── common/
│   └── auth.guard.ts               # Bearer token authentication
│
└── cli/
    ├── import.pokemon.ts           # Import Pokémon from PokéAPI
    ├── import.seed.ts              # Seed sample data
    └── run-migrations.ts           # Run migration CLI
```

---

## 🔌 API Endpoints

### Pokémon Endpoints

#### GET /api/pokemon
List all Pokémon with search and pagination.

**Query Parameters:**
- `q` (string) - Search by name or number
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 20)

**Example:**
```bash
GET /api/pokemon?q=charizard&page=1&limit=10
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "pokeapi_id": 6,
      "name": "Charizard",
      "image": "https://...",
      "types": ["Fire", "Flying"]
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

---

#### GET /api/pokemon/:id
Get detailed information about a Pokémon.

**Path Parameters:**
- `id` (number) - Pokémon ID

**Example:**
```bash
GET /api/pokemon/6
```

**Response:**
```json
{
  "id": 1,
  "pokeapi_id": 6,
  "name": "Charizard",
  "height": 17,
  "weight": 905,
  "description": "...",
  "image": "https://...",
  "types": ["Fire", "Flying"],
  "stats": {
    "hp": 78,
    "attack": 84,
    "defense": 78,
    "sp_attack": 109,
    "sp_defense": 85,
    "speed": 100
  }
}
```

---

### Team Endpoints

All team modification routes require authentication:
```
Authorization: Bearer SECRET123
```

#### POST /api/team
Create a new team.

**Request Body:**
```json
{
  "name": "My Team",
  "description": "My awesome team"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "My Team",
  "description": "My awesome team",
  "pokemon": [],
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

---

#### GET /api/team
List all teams.

**Response:**
```json
[
  {
    "id": 1,
    "name": "My Team",
    "pokemon": [
      { "pokemon_id": 6, "slot": 1 }
    ]
  }
]
```

---

#### GET /api/team/:id
Get team details.

**Path Parameters:**
- `id` (number) - Team ID

**Response:**
```json
{
  "id": 1,
  "name": "My Team",
  "pokemon": [
    {
      "id": 1,
      "pokemon_id": 6,
      "pokemon": {
        "name": "Charizard",
        "types": ["Fire", "Flying"]
      },
      "slot": 1
    }
  ]
}
```

---

#### POST /api/team/:teamId/pokemon
Add Pokémon to team (max 6).

**Path Parameters:**
- `teamId` (number) - Team ID

**Request Body:**
```json
{
  "pokemon_id": 6,
  "slot": 1
}
```

**Response:**
```json
{
  "id": 1,
  "name": "My Team",
  "pokemon": [
    {
      "pokemon_id": 6,
      "slot": 1
    }
  ]
}
```

---

#### DELETE /api/team/:teamId/pokemon/:pokemonTeamId
Remove Pokémon from team.

**Path Parameters:**
- `teamId` (number) - Team ID
- `pokemonTeamId` (number) - TeamPokemon ID

**Response:**
```json
{
  "id": 1,
  "name": "My Team",
  "pokemon": []
}
```

---

#### DELETE /api/team/:id
Delete entire team.

**Path Parameters:**
- `id` (number) - Team ID

**Response:**
```json
{
  "message": "Team deleted successfully"
}
```

---

## 📊 Database Schema

### Pokemon Tables

```sql
-- Main Pokémon entity
CREATE TABLE pokemon (
  id SERIAL PRIMARY KEY,
  pokeapi_id INTEGER UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL UNIQUE,
  height INTEGER,
  weight INTEGER,
  description TEXT,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pokémon types (many-to-many relationship)
CREATE TABLE pokemon_type (
  id SERIAL PRIMARY KEY,
  pokemon_id INTEGER NOT NULL REFERENCES pokemon(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL
);

-- Pokémon stats
CREATE TABLE pokemon_stat (
  id SERIAL PRIMARY KEY,
  pokemon_id INTEGER NOT NULL UNIQUE REFERENCES pokemon(id) ON DELETE CASCADE,
  hp INTEGER NOT NULL,
  attack INTEGER NOT NULL,
  defense INTEGER NOT NULL,
  sp_attack INTEGER NOT NULL,
  sp_defense INTEGER NOT NULL,
  speed INTEGER NOT NULL
);
```

### Team Tables

```sql
-- Teams
CREATE TABLE team (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team-Pokémon associations (max 6 per team)
CREATE TABLE team_pokemon (
  id SERIAL PRIMARY KEY,
  team_id INTEGER NOT NULL REFERENCES team(id) ON DELETE CASCADE,
  pokemon_id INTEGER NOT NULL REFERENCES pokemon(id),
  slot INTEGER NOT NULL CHECK (slot >= 1 AND slot <= 6),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (team_id, slot),
  UNIQUE (team_id, pokemon_id)
);
```

---

## 🛠️ Available Commands

### Development

```bash
# Start development server (with hot-reload)
npm run start:dev

# Start production server
npm run start

# Build for production
npm run build

# Type checking
npm run type-check
```

### Database

```bash
# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Generate new migration
npm run migration:generate -- src/migrations/MigrationName

# Show migration status
npm run migration:show
```

### Data Import

```bash
# Import all 151 Pokémon from PokéAPI
npm run cli:import-pokemon

# Import specific Pokémon by ID
npm run cli:import-pokemon -- 25

# Import specific Pokémon by name
npm run cli:import-pokemon -- pikachu

# Seed database with sample data
npm run cli:seed-database
```

### Testing & Linting

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:cov

# Watch mode for tests
npm run test:watch

# ESLint
npm run lint

# Fix linting issues
npm run lint:fix
```

---

## 🔐 Authentication

### Bearer Token

Team modification routes require Bearer token authentication.

**Setting Token:**
```bash
# Create .env file
TEAM_API_TOKEN=your_secret_token_here
```

**Using Token:**
```bash
# Add header to requests
Authorization: Bearer your_secret_token_here
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/team \
  -H "Authorization: Bearer SECRET123" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Team",
    "description": "Awesome team"
  }'
```

---

## 📝 Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/pokemon_db

# Server
PORT=3000
NODE_ENV=development

# Authentication
TEAM_API_TOKEN=SECRET123

# Logging
LOG_LEVEL=debug
```

---

## 🐳 Docker Support

### Build Docker Image

```bash
docker build -t pokemon-backend .
```

### Run Container

```bash
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://postgres:password@db:5432/pokemon \
  -e TEAM_API_TOKEN=SECRET123 \
  pokemon-backend
```

### Docker Compose

```bash
# Start all services
docker-compose up

# Start specific service
docker-compose up db

# Stop all services
docker-compose down

# View logs
docker-compose logs -f
```

**Docker Compose Services:**
- `db` - PostgreSQL database
- `backend` - NestJS application

---

## 🔄 Data Import Process

### Import 151 Pokémon from PokéAPI

```bash
npm run cli:import-pokemon
```

**Process:**
1. Fetches Pokémon list from PokéAPI (1-151)
2. For each Pokémon:
   - Fetch detailed stats
   - Fetch species info (description)
   - Extract types
   - Insert into database
3. Creates indexes for performance
4. Displays progress

**Time:** ~30-60 seconds for all 151

---

## 🧪 Testing

### Run Tests

```bash
# All tests
npm test

# Specific test file
npm test pokemon.service.spec.ts

# Watch mode
npm test:watch

# Coverage report
npm test:cov
```

### Test Structure

```
src/
├── modules/
│   ├── pokemon/
│   │   ├── pokemon.service.ts
│   │   └── pokemon.service.spec.ts
│   └── team/
│       ├── team.service.ts
│       └── team.service.spec.ts
```

---

## 🚨 Troubleshooting

### Database Connection Failed

**Error:** `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Solutions:**
```bash
# 1. Check PostgreSQL is running
psql --version

# 2. On Windows: Start PostgreSQL service
# Services → PostgreSQL → Start

# 3. On macOS: Start with Homebrew
brew services start postgresql

# 4. On Linux
sudo service postgresql start

# 5. Verify database exists
psql -U postgres -l | grep pokemon
```

---

### Migration Errors

**Error:** `QueryFailedError: relation "pokemon" does not exist`

**Solution:**
```bash
# Run migrations
npm run migration:run

# Reset database (careful!)
npm run migration:revert  # Revert all
npm run migration:run     # Run all again
```

---

### Data Import Issues

**Error:** `Cannot import Pokémon: Network timeout`

**Solution:**
```bash
# Retry import
npm run cli:import-pokemon

# Check internet connection
ping pokeapi.co
```

---

### Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::3000`

**Solution:**
```bash
# Kill existing process
netstat -ano | findstr :3000    # Windows
kill -9 <PID>

# Or change port in .env
PORT=3001
```

---

## 📈 Performance Tips

### Database Optimization

```bash
# Add indexes for search
CREATE INDEX idx_pokemon_name ON pokemon(name);
CREATE INDEX idx_pokemon_pokeapi_id ON pokemon(pokeapi_id);
CREATE INDEX idx_pokemon_type_pokemon_id ON pokemon_type(pokemon_id);
```

### API Response Caching

```typescript
// In controller
@Get()
@UseInterceptors(CacheInterceptor)
@CacheTTL(3600) // 1 hour
getAllPokemon() {
  // ...
}
```

### Connection Pooling

```env
# In .env or docker-compose
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10
```

---

## 🔗 External APIs

### PokéAPI Integration

- **Base URL**: https://pokeapi.co/api/v2/
- **Used for**: Data import
- **Rate Limit**: 100 requests/minute

**Endpoints Used:**
- `/pokemon?limit=151` - Get all Pokémon list
- `/pokemon/{id}` - Get Pokémon details
- `/pokemon-species/{id}` - Get species info

---

## 📚 Project Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@nestjs/common` | ^10.0 | NestJS core |
| `@nestjs/core` | ^10.0 | NestJS runtime |
| `typeorm` | ^0.3 | ORM |
| `pg` | ^8.0 | PostgreSQL driver |
| `axios` | ^1.0 | HTTP client |
| `class-validator` | ^0.14 | DTO validation |
| `class-transformer` | ^0.5 | DTO transformation |

---

## 🚀 Production Deployment

### Heroku Deployment

```bash
# 1. Create Heroku app
heroku create your-app-name

# 2. Add buildpacks
heroku buildpacks:add heroku/nodejs

# 3. Add PostgreSQL add-on
heroku addons:create heroku-postgresql:hobby-dev

# 4. Set environment variables
heroku config:set TEAM_API_TOKEN=your_token

# 5. Deploy
git push heroku main

# 6. Run migrations
heroku run npm run migration:run
```

### AWS Deployment

```bash
# 1. Create RDS PostgreSQL database
# 2. Deploy to Lambda or EC2
# 3. Set DATABASE_URL environment variable
# 4. Run migrations via CI/CD pipeline
```

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Run tests: `npm test`
4. Commit: `git commit -am 'Add feature'`
5. Push: `git push origin feature/your-feature`
6. Create Pull Request

---

## 📄 License

MIT License - see LICENSE file

---

## 🆘 Support

- **Issues**: GitHub Issues
- **Docs**: See PROJECT_DOCUMENTATION.md
- **API Docs**: Swagger (if enabled)

---

**Built with ❤️ for Pokémon fans**
