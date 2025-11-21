# 🚀 Quick Start Guide - Pokémon Web App

Get up and running with the Pokémon Web App in 5 minutes!

## 📋 Prerequisites

Before starting, ensure you have:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **PostgreSQL** 12+ ([Download](https://www.postgresql.org/download/)) - for backend
- **Git** ([Download](https://git-scm.com/))

Verify installation:
```bash
node --version    # Should be v18.0.0 or higher
npm --version     # Should be 8.0.0 or higher
psql --version    # Should be 12.0 or higher (PostgreSQL)
```

---

## ⚡ 5-Minute Quick Start

### Step 1: Clone the Repository

```bash
git clone https://github.com/ahmedfarghaly261/Pokmon-WebApp.git
cd Pokmon-WebApp
```

### Step 2: Start Backend (5-10 minutes)

```bash
cd BackEnd

# Install dependencies
npm install

# Create database
createdb pokemon_db

# Create .env file with database configuration
# On Windows:
echo DATABASE_URL=postgresql://postgres:password@localhost:5432/pokemon_db > .env
echo PORT=3000 >> .env

# On macOS/Linux:
cat > .env << EOF
DATABASE_URL=postgresql://postgres:password@localhost:5432/pokemon_db
PORT=3000
EOF

# Run migrations (creates tables)
npm run migration:run

# Import Pokemon data
npm run cli:import-pokemon

# Start backend server
npm run start:dev
```

**Backend will be available at**: `http://localhost:3000`

### Step 3: Start Frontend (2-3 minutes)

In a **new terminal** window:

```bash
cd FrontEnd

# Install dependencies
npm install

# Create .env file
# On Windows:
echo VITE_API_URL=http://localhost:3000/api > .env

# On macOS/Linux:
echo "VITE_API_URL=http://localhost:3000/api" > .env

# Start development server
npm run dev
```

**Frontend will be available at**: `http://localhost:5173`

### Step 4: Open in Browser

Open your browser and go to:
```
http://localhost:5173
```

✅ **Done!** You should see the Pokédex with all 151 Pokémon!

---

## 🎯 What You Can Do Now

### Browse Pokémon
- Scroll through the list of 151 Pokémon
- Click any Pokémon to see detailed stats, abilities, and moves
- View images, height, weight, and type information

### Search & Filter
- Use the search bar to find Pokémon by name or number
- Results update in real-time as you type

### Manage Favorites
- Click the heart icon on any Pokémon to add to favorites
- View all favorites on the "Favorieten" page
- Remove favorites anytime

### Build Your Team
- Add up to 6 Pokémon to your team
- Access your team from the "Mijn team" quick access card
- View team summary with statistics

---

## 🛠️ Available Commands

### Backend Commands

```bash
cd BackEnd

# Development
npm run start:dev      # Start with auto-reload
npm run start          # Start production

# Database
npm run migration:run  # Run pending migrations
npm run migration:revert # Revert last migration

# Data Management
npm run cli:import-pokemon    # Import Pokemon from PokeAPI
npm run cli:seed-database     # Seed sample data

# Build & Test
npm run build          # Build for production
npm run test           # Run tests
npm run lint           # Check code style
```

### Frontend Commands

```bash
cd FrontEnd

# Development
npm run dev            # Start dev server with hot reload
npm run build          # Build for production
npm run preview        # Preview production build locally

# Quality
npm run lint           # Check code style
npm run type-check     # Type checking

# Other
npm run test           # Run tests (if configured)
```

---

## 🔧 Troubleshooting

### Backend Issues

#### ❌ "Port 3000 already in use"
```bash
# Find process using port 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000                  # macOS/Linux

# Kill the process or use a different port
# Edit BackEnd/.env and change PORT=3001
```

#### ❌ "PostgreSQL connection failed"
```bash
# Check PostgreSQL is running
psql --version

# On Windows: Start PostgreSQL service
# On macOS: brew services start postgresql
# On Linux: sudo service postgresql start

# Verify database exists
psql -U postgres -l | grep pokemon_db

# If not, create it:
createdb -U postgres pokemon_db
```

#### ❌ "migration:run fails"
```bash
# Make sure database exists
createdb pokemon_db

# Reset and run migrations again
npm run migration:run

# If still fails, check logs:
npm run start:dev  # Will show database errors
```

### Frontend Issues

#### ❌ "npm install fails"
```bash
# Clear npm cache
npm cache clean --force

# Try install again
npm install
```

#### ❌ "Port 5173 already in use"
```bash
# Vite will automatically try next port (5174, 5175, etc.)
# Or kill existing process:
netstat -ano | findstr :5173  # Windows
lsof -i :5173                  # macOS/Linux
```

#### ❌ "Pokémon not showing"
```
1. Check Backend is running (http://localhost:3000/api/pokemon)
2. Check Frontend console for errors (F12 → Console tab)
3. Check network requests (F12 → Network tab)
4. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (macOS)
```

### General Issues

#### ❌ "Nothing works!"
```bash
# Start fresh:

# 1. Kill all running processes
# 2. Open new terminals

# Terminal 1 - Backend
cd BackEnd
npm install
npm run start:dev

# Terminal 2 - Frontend
cd FrontEnd
npm install
npm run dev

# 3. Wait 10 seconds
# 4. Open http://localhost:5173 in browser
```

---

## 🐳 Quick Start with Docker

If you have Docker installed, run everything in one command:

```bash
# From root directory
docker-compose up
```

Then open: `http://localhost:5173`

**Note**: Make sure Docker is running first!

---

## 📁 Project Folders

After setup, you'll have:

```
Pokémon-Web-App/
├── BackEnd/
│   ├── src/                 # Source code
│   ├── node_modules/        # Dependencies (auto-created)
│   ├── dist/                # Compiled output (created on build)
│   ├── .env                 # Environment variables (create this)
│   └── package.json
│
└── FrontEnd/
    ├── src/                 # Source code
    ├── node_modules/        # Dependencies (auto-created)
    ├── dist/                # Compiled output (created on build)
    ├── .env                 # Environment variables (create this)
    └── package.json
```

---

## 📖 Next Steps

1. **Explore the Code**: Check out `src/` folder structure in both Backend and FrontEnd
2. **Read Full Docs**: See `PROJECT_DOCUMENTATION.md` for detailed architecture
3. **Customize**: Modify colors, add features, deploy to production
4. **Deploy**: Follow deployment guide to push to Heroku, Vercel, or your host

---

## 🚀 Production Deployment

### Build for Production

```bash
# Backend
cd BackEnd
npm run build

# Frontend
cd FrontEnd
npm run build
```

### Deploy Frontend (Vercel)
```bash
npm install -g vercel
cd FrontEnd
vercel --prod
```

### Deploy Backend (Heroku)
```bash
cd BackEnd
heroku create your-app-name
git push heroku main
```

---

## ❓ Need Help?

- 📖 **Documentation**: See `PROJECT_DOCUMENTATION.md`
- 🐛 **Issues**: Check GitHub Issues tab
- 💬 **Discussions**: Start a discussion in the repository
- 🔗 **PokeAPI**: See https://pokeapi.co for API details

---

## 📊 Project Stats

- **151 Pokémon** available
- **Type-based** color coding
- **Responsive** design (mobile, tablet, desktop)
- **Fast** performance with smart caching
- **Type-safe** with full TypeScript support

---

## ✅ Success Checklist

- [ ] Node.js and npm installed
- [ ] PostgreSQL running
- [ ] Backend dependencies installed (`npm install` in BackEnd)
- [ ] Backend environment file created (.env)
- [ ] Database created (`createdb pokemon_db`)
- [ ] Migrations run (`npm run migration:run`)
- [ ] Backend started (`npm run start:dev`)
- [ ] Frontend dependencies installed (`npm install` in FrontEnd)
- [ ] Frontend environment file created (.env)
- [ ] Frontend started (`npm run dev`)
- [ ] Browser opened to `http://localhost:5173`
- [ ] Pokémon list visible!

---

**Enjoy your Pokédex! 🎉**

Got stuck? Check troubleshooting section above or create an issue on GitHub.
