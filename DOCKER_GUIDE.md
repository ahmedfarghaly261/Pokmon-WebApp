# 🐳 Docker Setup Guide - Pokémon Web App

Complete Docker configuration for running the entire Pokémon Web App (Frontend + Backend + Database).

---

## 📋 Docker Files

### Root Level
- **docker-compose.yaml** - Complete stack (Database + Backend + Frontend)
- **.env.example** - Environment variables template

### BackEnd
- **Dockerfile** - NestJS backend container
- **docker-compose.yaml** - Backend-only stack (with PostgreSQL)
- **.dockerignore** - Files to exclude from build

### FrontEnd
- **Dockerfile** - Vue 3 frontend container
- **.dockerignore** - Files to exclude from build

---

## 🚀 Quick Start

### Option 1: Run Everything (Recommended)

```bash
# From project root
docker-compose up
```

This starts:
- ✅ PostgreSQL database on port 5432
- ✅ Backend API on port 3000
- ✅ Frontend on port 5173

Then open: `http://localhost:5173`

### Option 2: Run Backend Only

```bash
cd BackEnd
docker-compose up
```

Then open: `http://localhost:3000/api/pokemon`

### Option 3: Run with Build

```bash
# Build new images
docker-compose up --build

# Force rebuild without cache
docker-compose up --build --no-cache
```

---

## 🛑 Stop Services

```bash
# Stop all containers
docker-compose down

# Stop and remove volumes (WARNING: deletes database)
docker-compose down -v

# Stop specific service
docker-compose stop frontend
```

---

## 📊 View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f db

# Recent logs only
docker-compose logs --tail=50 backend
```

---

## 🔄 Useful Commands

### Run Commands in Containers

```bash
# Backend shell
docker-compose exec backend sh

# Database shell
docker-compose exec db psql -U postgres -d pokedex

# Frontend shell
docker-compose exec frontend sh
```

### Run Migrations (Backend)

```bash
docker-compose exec backend npm run migration:run
```

### Import Pokémon Data

```bash
docker-compose exec backend npm run cli:import-pokemon
```

### Check Service Status

```bash
# Show all containers
docker-compose ps

# View container details
docker ps -a
```

---

## ⚙️ Configuration

### Environment Variables

Create `.env` file in project root (copy from `.env.example`):

```env
# Database
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=pokedex

# Backend
BACKEND_PORT=3000
TEAM_API_TOKEN=SECRET123

# Frontend
FRONTEND_PORT=5173
VITE_API_URL=http://localhost:3000/api
```

### Change Ports

Edit `.env` or `docker-compose.yaml`:

```yaml
# Backend on 3001 instead of 3000
BACKEND_PORT=3001

# Frontend on 8080 instead of 5173
FRONTEND_PORT=8080

# Database on 5433 instead of 5432
DB_PORT=5433
```

---

## 🏗️ Service Architecture

```
┌─────────────────────────────────────┐
│     Frontend (Vue 3)                │
│     Port: 5173                      │
│     Container: pokedex-frontend     │
└────────────────┬────────────────────┘
                 │ (HTTP)
                 ↓
┌─────────────────────────────────────┐
│     Backend (NestJS)                │
│     Port: 3000                      │
│     Container: pokedex-backend      │
└────────────────┬────────────────────┘
                 │ (Database connection)
                 ↓
┌─────────────────────────────────────┐
│     Database (PostgreSQL)           │
│     Port: 5432                      │
│     Container: pokedex-db           │
│     Volume: pgdata                  │
└─────────────────────────────────────┘
```

---

## 🔍 Health Checks

All services have health checks configured:

```bash
# Check service health
docker-compose exec db pg_isready
docker-compose exec backend curl http://localhost:3000/health
docker-compose exec frontend curl http://localhost:5173
```

### View Health Status

```bash
docker-compose ps
```

Look for "healthy" status in STATUS column.

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Find process using port
netstat -ano | findstr :3000     # Windows
lsof -i :3000                     # macOS/Linux

# Stop that process or use different port
# Edit .env and change port
BACKEND_PORT=3001
```

### Database Connection Failed

```bash
# Check database logs
docker-compose logs db

# Verify database is running
docker-compose ps db

# Check DB connection from backend
docker-compose exec backend sh
# Then run: nc -zv db 5432
```

### Frontend Can't Connect to Backend

```bash
# Check VITE_API_URL in .env
VITE_API_URL=http://localhost:3000/api

# Or use service name (only inside Docker)
VITE_API_URL=http://backend:3000/api
```

### Rebuild Required

```bash
# Remove images and rebuild
docker-compose down
docker-compose up --build

# Or force rebuild
docker-compose build --no-cache
```

### Permission Issues

```bash
# On Linux, you might need sudo
sudo docker-compose up

# Or add user to docker group
sudo usermod -aG docker $USER
```

---

## 📦 Image Details

### Frontend Image
```
Base: node:18-alpine
Size: ~300MB (built)
Build: npm install + npm run build
Start: serve -s dist -l 5173
```

### Backend Image
```
Base: node:18-alpine
Size: ~400MB (built)
Build: npm install + npm run build
Start: npm start
```

### Database Image
```
Base: postgres:15-alpine
Size: ~150MB
Persistence: pgdata volume
```

---

## 🌐 URLs

| Service | URL | Port |
|---------|-----|------|
| Frontend | http://localhost:5173 | 5173 |
| Backend API | http://localhost:3000/api | 3000 |
| Backend Health | http://localhost:3000/health | 3000 |
| Database | localhost:5432 | 5432 |

---

## 📱 Development Workflow

### Hot Reload

Frontend and Backend support hot reload:

```yaml
volumes:
  - ./FrontEnd/src:/app/src    # Frontend code
  - ./BackEnd/src:/usr/src/app/src  # Backend code
```

Changes to `src/` folders automatically reload.

### Disable Hot Reload

```bash
docker-compose up --no-volumes
```

---

## 🔒 Security Notes

### Production Settings

- Change default database password in `.env`
- Use strong `TEAM_API_TOKEN`
- Remove volumes from docker-compose (use managed DB)
- Use environment-specific .env files

### Never Commit

```bash
.env          # Contains passwords
.env.local    # Local overrides
```

Only commit `.env.example`.

---

## 📝 Docker Compose Reference

### Start Services

```bash
docker-compose up                 # Start all
docker-compose up -d              # Start in background
docker-compose up frontend        # Start specific service
docker-compose up --build         # Rebuild images
```

### Stop Services

```bash
docker-compose stop               # Stop all
docker-compose stop backend       # Stop specific
docker-compose down               # Stop and remove
docker-compose down -v            # Remove volumes too
```

### View Status

```bash
docker-compose ps                 # List containers
docker-compose logs               # Show logs
docker-compose exec backend sh    # Execute command
```

### Remove Everything

```bash
docker-compose down -v
docker system prune -a            # Remove all unused images
```

---

## 🚀 Production Deployment

### Using Docker Swarm

```bash
docker swarm init
docker stack deploy -c docker-compose.yaml pokedex
```

### Using Kubernetes

```bash
kubectl apply -f docker-compose.yaml
```

### Using AWS ECS

```bash
# Push images to ECR
aws ecr push --image-uri=...
# Deploy with ECS Compose
ecs-cli compose service up
```

---

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Reference](https://docs.docker.com/compose/compose-file/)
- [PostgreSQL Docker Image](https://hub.docker.com/_/postgres)
- [Node.js Docker Image](https://hub.docker.com/_/node)

---

## 🎯 Common Issues

| Issue | Solution |
|-------|----------|
| Port in use | Change port in .env |
| DB won't start | Check logs: `docker-compose logs db` |
| Frontend can't reach API | Update VITE_API_URL in .env |
| Permission denied | Add user to docker group |
| Out of disk space | Run `docker system prune` |
| Changes not reflected | Rebuild: `docker-compose up --build` |

---

**Last Updated**: 2024-01-15  
**Docker Compose Version**: 3.8  
**Node Version**: 18-alpine  
**PostgreSQL Version**: 15-alpine
