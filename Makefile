.PHONY: help up down logs clean build restart ps shell migrate import

# Default target
help:
	@echo "🐳 Pokémon Web App - Docker Commands"
	@echo "======================================"
	@echo ""
	@echo "Usage: make [command]"
	@echo ""
	@echo "Commands:"
	@echo "  up              Start all services (foreground)"
	@echo "  up-d            Start all services (background)"
	@echo "  up-build        Build and start all services"
	@echo "  down            Stop all services"
	@echo "  down-v          Stop and remove volumes"
	@echo "  logs            Show all logs"
	@echo "  logs-backend    Show backend logs"
	@echo "  logs-frontend   Show frontend logs"
	@echo "  logs-db         Show database logs"
	@echo "  ps              Show service status"
	@echo "  restart         Restart services"
	@echo "  rebuild         Rebuild images"
	@echo "  clean           Clean up Docker resources"
	@echo "  migrate         Run database migrations"
	@echo "  import          Import Pokémon data"
	@echo "  shell-backend   Open backend shell"
	@echo "  shell-frontend  Open frontend shell"
	@echo "  shell-db        Connect to database"
	@echo ""

# Start all services (foreground)
up:
	docker-compose up

# Start all services (background)
up-d:
	docker-compose up -d
	@echo "✅ Services started in background"
	@echo "📱 Frontend: http://localhost:5173"
	@echo "🔌 Backend: http://localhost:3000/api"

# Build and start
up-build:
	docker-compose up --build

# Stop all services
down:
	docker-compose down
	@echo "✅ All services stopped"

# Stop and remove volumes
down-v:
	docker-compose down -v
	@echo "✅ All services stopped and volumes removed"

# Show all logs
logs:
	docker-compose logs -f

# Show backend logs
logs-backend:
	docker-compose logs -f backend

# Show frontend logs
logs-frontend:
	docker-compose logs -f frontend

# Show database logs
logs-db:
	docker-compose logs -f db

# Show service status
ps:
	docker-compose ps

# Restart services
restart:
	docker-compose restart
	@echo "✅ Services restarted"

# Rebuild images
rebuild:
	docker-compose down
	docker-compose up --build

# Clean up Docker resources
clean:
	docker-compose down -v
	docker system prune -f
	@echo "✅ Cleanup completed"

# Run migrations
migrate:
	docker-compose exec backend npm run migration:run
	@echo "✅ Migrations completed"

# Import Pokémon data
import:
	docker-compose exec backend npm run cli:import-pokemon
	@echo "✅ Data imported"

# Open backend shell
shell-backend:
	docker-compose exec backend sh

# Open frontend shell
shell-frontend:
	docker-compose exec frontend sh

# Connect to database
shell-db:
	docker-compose exec db psql -U postgres -d pokedex

# Check status
status:
	docker-compose ps
	@echo ""
	@echo "URLs:"
	@echo "  Frontend: http://localhost:5173"
	@echo "  Backend: http://localhost:3000/api"
	@echo "  Database: localhost:5432"
