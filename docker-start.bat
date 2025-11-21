@echo off
REM Pokémon Web App Docker Startup Script for Windows
REM Usage: docker-start.bat [command]

setlocal enabledelayedexpansion

set COMMAND=%1
if "%COMMAND%"=="" set COMMAND=up

echo.
echo 🐳 Pokémon Web App - Docker Manager
echo ==================================
echo.

if "%COMMAND%"=="up" (
    echo 🚀 Starting all services...
    docker-compose up
) else if "%COMMAND%"=="up-build" (
    echo 🚀 Building and starting all services...
    docker-compose up --build
) else if "%COMMAND%"=="up-d" (
    echo 🚀 Starting services in background...
    docker-compose up -d
    echo ✅ Services started in background
    echo 📱 Frontend: http://localhost:5173
    echo 🔌 Backend: http://localhost:3000/api
) else if "%COMMAND%"=="down" (
    echo 🛑 Stopping all services...
    docker-compose down
    echo ✅ All services stopped
) else if "%COMMAND%"=="down-v" (
    echo ⚠️  Stopping services and removing volumes...
    docker-compose down -v
    echo ✅ Services stopped and volumes removed
) else if "%COMMAND%"=="logs" (
    echo 📊 Showing logs...
    docker-compose logs -f
) else if "%COMMAND%"=="logs-backend" (
    echo 📊 Showing backend logs...
    docker-compose logs -f backend
) else if "%COMMAND%"=="logs-frontend" (
    echo 📊 Showing frontend logs...
    docker-compose logs -f frontend
) else if "%COMMAND%"=="logs-db" (
    echo 📊 Showing database logs...
    docker-compose logs -f db
) else if "%COMMAND%"=="ps" (
    echo 📋 Services status:
    docker-compose ps
) else if "%COMMAND%"=="restart" (
    echo 🔄 Restarting services...
    docker-compose restart
    echo ✅ Services restarted
) else if "%COMMAND%"=="rebuild" (
    echo 🏗️  Rebuilding images...
    docker-compose down
    docker-compose up --build
) else if "%COMMAND%"=="clean" (
    echo 🧹 Cleaning up Docker resources...
    docker-compose down -v
    docker system prune -f
    echo ✅ Cleanup completed
) else if "%COMMAND%"=="status" (
    echo 📊 Service status:
    docker-compose ps
) else if "%COMMAND%"=="help" (
    echo.
    echo Available commands:
    echo   up                 Start all services (foreground)
    echo   up-build           Build and start all services
    echo   up-d               Start all services (background)
    echo   down               Stop all services
    echo   down-v             Stop services and remove volumes
    echo   logs               Show all logs (streaming)
    echo   logs-backend       Show backend logs
    echo   logs-frontend      Show frontend logs
    echo   logs-db            Show database logs
    echo   ps                 Show service status
    echo   restart            Restart all services
    echo   rebuild            Rebuild images and restart
    echo   clean              Remove all containers and volumes
    echo   status             Show service status
    echo   help               Show this help message
    echo.
) else (
    echo ❌ Unknown command: %COMMAND%
    echo Run "docker-start.bat help" for available commands
    exit /b 1
)

endlocal
