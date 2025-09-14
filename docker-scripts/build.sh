#!/bin/bash

echo "🐳 Construyendo Discord Music Bot Docker Image..."

# Construir la imagen
docker build -t discord-music-bot:latest .

if [ $? -eq 0 ]; then
    echo "✅ Imagen construida exitosamente!"
    echo ""
    echo "📋 Para ejecutar el contenedor:"
    echo "   docker run -d --name discord-music-bot --env-file .env discord-music-bot:latest"
    echo ""
    echo "📋 O usar docker-compose:"
    echo "   docker-compose up -d"
else
    echo "❌ Error al construir la imagen"
    exit 1
fi