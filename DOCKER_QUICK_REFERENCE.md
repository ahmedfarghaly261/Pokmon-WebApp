# 🐳 Docker Quick Reference Card

## 🚀 START SERVICES

```bash
# All-in-one command
docker-compose up

# Background
docker-compose up -d

# With rebuild
docker-compose up --build
```

## 🛑 STOP SERVICES

```bash
# Stop only
docker-compose down

# Stop + remove volumes
docker-compose down -v
```

## 📊 STATUS & LOGS

```bash
# Service status
docker-compose ps

# All logs
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db
```

## 🔧 MANAGEMENT

```bash
# Restart
docker-compose restart

# Rebuild
docker-compose build

# Restart backend
docker-compose restart backend
```

## 💻 SHELL ACCESS

```bash
# Backend shell
docker-compose exec backend sh

# Frontend shell
docker-compose exec frontend sh

# Database shell
docker-compose exec db psql -U postgres
```

## 📦 DATABASE COMMANDS

```bash
# Migrations
docker-compose exec backend npm run migration:run

# Import data
docker-compose exec backend npm run cli:import-pokemon

# Database connection
docker-compose exec db psql -U postgres -d pokedex
```

## 🌐 URLS

```
Frontend: http://localhost:5173
Backend:  http://localhost:3000/api
Health:   http://localhost:3000/health
Database: localhost:5432
```

## 🔐 CREDENTIALS

```
Database User:     postgres
Database Password: postgres
Database Name:     pokedex
API Token:         SECRET123
```

## ⚙️ CONFIGURATION

Edit `.env` file:
```env
BACKEND_PORT=3000
FRONTEND_PORT=5173
DB_PORT=5432
VITE_API_URL=http://localhost:3000/api
```

## 🚨 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Port in use | Change in .env |
| DB won't start | `docker-compose down -v && docker-compose up` |
| Can't connect API | Check VITE_API_URL in .env |
| Out of space | `docker system prune -a` |

## 📝 STARTUP SCRIPTS

**Linux/macOS:**
```bash
./docker-start.sh up           # Start
./docker-start.sh up-d         # Background
./docker-start.sh logs         # Logs
./docker-start.sh ps           # Status
./docker-start.sh down         # Stop
./docker-start.sh help         # Help
```

**Windows:**
```batch
docker-start.bat up
docker-start.bat up-d
docker-start.bat logs
docker-start.bat ps
docker-start.bat down
docker-start.bat help
```

**Makefile (Linux/macOS):**
```bash
make up              # Start
make up-d            # Background
make logs            # Logs
make ps              # Status
make down            # Stop
make help            # Help
```

## ✅ VERIFY

```bash
# All running
docker-compose ps

# Health check
curl http://localhost:3000/health

# API test
curl http://localhost:3000/api/pokemon

# Frontend
Open http://localhost:5173 in browser
```

## 🎯 QUICK START

```bash
# 1. Start everything
docker-compose up -d

# 2. Wait a few seconds
# 3. Check status
docker-compose ps

# 4. Open browser
# Frontend:  http://localhost:5173
# Backend:   http://localhost:3000/api
```

---

**Keep this card handy for quick Docker commands!**
