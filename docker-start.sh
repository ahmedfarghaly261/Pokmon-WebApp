#!/bin/bash

# Pokémon Web App Docker Startup Script
# Usage: ./docker-start.sh [command]

set -e

COMMAND=${1:-up}

echo "🐳 Pokémon Web App - Docker Manager"
echo "=================================="

case $COMMAND in
  up)
    echo "🚀 Starting all services..."
    docker-compose up
    ;;
  up-build)
    echo "🚀 Building and starting all services..."
    docker-compose up --build
    ;;
  up-d)
    echo "🚀 Starting services in background..."
    docker-compose up -d
    echo "✅ Services started in background"
    echo "📱 Frontend: http://localhost:5173"
    echo "🔌 Backend: http://localhost:3000/api"
    ;;
  down)
    echo "🛑 Stopping all services..."
    docker-compose down
    echo "✅ All services stopped"
    ;;
  down-v)
    echo "⚠️  Stopping services and removing volumes..."
    docker-compose down -v
    echo "✅ Services stopped and volumes removed"
    ;;
  logs)
    echo "📊 Showing logs..."
    docker-compose logs -f
    ;;
  logs-backend)
    echo "📊 Showing backend logs..."
    docker-compose logs -f backend
    ;;
  logs-frontend)
    echo "📊 Showing frontend logs..."
    docker-compose logs -f frontend
    ;;
  logs-db)
    echo "📊 Showing database logs..."
    docker-compose logs -f db
    ;;
  ps)
    echo "📋 Services status:"
    docker-compose ps
    ;;
  shell-backend)
    echo "🔧 Opening backend shell..."
    docker-compose exec backend sh
    ;;
  shell-frontend)
    echo "🔧 Opening frontend shell..."
    docker-compose exec frontend sh
    ;;
  shell-db)
    echo "🔧 Connecting to database..."
    docker-compose exec db psql -U postgres -d pokedex
    ;;
  migrate)
    echo "🔄 Running database migrations..."
    docker-compose exec backend npm run migration:run
    echo "✅ Migrations completed"
    ;;
  import)
    echo "📥 Importing Pokémon data..."
    docker-compose exec backend npm run cli:import-pokemon
    echo "✅ Data imported"
    ;;
  restart)
    echo "🔄 Restarting services..."
    docker-compose restart
    echo "✅ Services restarted"
    ;;
  rebuild)
    echo "🏗️  Rebuilding images..."
    docker-compose down
    docker-compose up --build
    ;;
  clean)
    echo "🧹 Cleaning up Docker resources..."
    docker-compose down -v
    docker system prune -f
    echo "✅ Cleanup completed"
    ;;
  status)
    echo "📊 Detailed status:"
    docker-compose ps
    echo ""
    echo "Health checks:"
    docker-compose exec backend curl -s http://localhost:3000/health | jq . || echo "Backend: Not responding"
    docker-compose exec db pg_isready -U postgres || echo "Database: Not responding"
    ;;
  help)
    echo ""
    echo "Available commands:"
    echo "  up                 Start all services (foreground)"
    echo "  up-build           Build and start all services"
    echo "  up-d               Start all services (background)"
    echo "  down               Stop all services"
    echo "  down-v             Stop services and remove volumes"
    echo "  logs               Show all logs (streaming)"
    echo "  logs-backend       Show backend logs"
    echo "  logs-frontend      Show frontend logs"
    echo "  logs-db            Show database logs"
    echo "  ps                 Show service status"
    echo "  shell-backend      Open backend shell"
    echo "  shell-frontend     Open frontend shell"
    echo "  shell-db           Connect to database"
    echo "  migrate            Run database migrations"
    echo "  import             Import Pokémon data"
    echo "  restart            Restart all services"
    echo "  rebuild            Rebuild images and restart"
    echo "  clean              Remove all containers and volumes"
    echo "  status             Show detailed status"
    echo "  help               Show this help message"
    echo ""
    ;;
  *)
    echo "❌ Unknown command: $COMMAND"
    echo "Run './docker-start.sh help' for available commands"
    exit 1
    ;;
esac
