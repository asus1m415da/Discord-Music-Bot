#!/bin/bash

echo "🚀 Iniciando Discord Music Bot..."

# Verificar si existe el archivo .env
if [ ! -f ".env" ]; then
    echo "⚠️  Archivo .env no encontrado. Creando desde .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "📝 Por favor, edita el archivo .env con tus tokens de Discord antes de continuar."
        exit 1
    else
        echo "❌ No se encontró .env.example. Crea un archivo .env con tus configuraciones."
        exit 1
    fi
fi

# Usar docker-compose si existe
if [ -f "docker-compose.yml" ]; then
    echo "🐳 Usando docker-compose..."
    docker-compose up -d
    
    if [ $? -eq 0 ]; then
        echo "✅ Bot iniciado exitosamente!"
        echo "📋 Ver logs: docker-compose logs -f"
        echo "📋 Parar bot: docker-compose down"
    else
        echo "❌ Error al iniciar el bot"
        exit 1
    fi
else
    # Ejecutar con docker run
    echo "🐳 Usando docker run..."
    docker run -d \
        --name discord-music-bot \
        --env-file .env \
        --restart unless-stopped \
        -v $(pwd)/logs:/app/logs \
        discord-music-bot:latest
    
    if [ $? -eq 0 ]; then
        echo "✅ Bot iniciado exitosamente!"
        echo "📋 Ver logs: docker logs -f discord-music-bot"
        echo "📋 Parar bot: docker stop discord-music-bot"
    else
        echo "❌ Error al iniciar el bot"
        exit 1
    fi
fi