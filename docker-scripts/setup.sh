#!/bin/bash

echo "🛠️  Configuración inicial de Discord Music Bot"

# Crear directorios necesarios
echo "📁 Creando directorios..."
mkdir -p logs
mkdir -p config
mkdir -p docker-scripts

# Hacer scripts ejecutables
chmod +x docker-scripts/*.sh

# Configurar .env
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "📝 Archivo .env creado desde .env.example"
    else
        cat > .env << EOF
# Discord Bot Configuration
DISCORD_BOT_TOKEN=tu_bot_token_aqui
DISCORD_CLIENT_ID=tu_client_id_aqui

# Environment
NODE_ENV=production

# FFmpeg Path (se configura automáticamente en Docker)
FFMPEG_PATH=/usr/bin/ffmpeg
EOF
        echo "📝 Archivo .env creado"
    fi
    
    echo ""
    echo "⚠️  IMPORTANTE: Edita el archivo .env con tus tokens de Discord:"
    echo "   - DISCORD_BOT_TOKEN: Token de tu bot desde Discord Developer Portal"
    echo "   - DISCORD_CLIENT_ID: ID de cliente de tu aplicación Discord"
    echo ""
else
    echo "✅ Archivo .env ya existe"
fi

# Información de siguiente paso
echo "✅ Configuración inicial completada!"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Edita .env con tus tokens de Discord"
echo "   2. Ejecuta: ./docker-scripts/build.sh"
echo "   3. Ejecuta: ./docker-scripts/run.sh"
echo ""
echo "📋 Comandos útiles:"
echo "   - Construir: ./docker-scripts/build.sh"
echo "   - Ejecutar: ./docker-scripts/run.sh"
echo "   - Ver logs: docker-compose logs -f"
echo "   - Parar: docker-compose down"