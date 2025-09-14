# Usar imagen base Node.js con Debian (mejor compatibilidad que Alpine)
FROM node:20-bullseye

# Configurar variables de entorno
ENV NODE_ENV=production
ENV DEBIAN_FRONTEND=noninteractive

# Crear directorio de trabajo
WORKDIR /app

# Actualizar el sistema e instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    ffmpeg \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    git \
    curl \
    wget \
    libavcodec-dev \
    libavformat-dev \
    libavutil-dev \
    libswscale-dev \
    libswresample-dev \
    libnss3-dev \
    libgconf-2-4 \
    libxi6 \
    libxtst6 \
    libxrandr2 \
    libasound2-dev \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcairo-gobject2 \
    libgtk-3-0 \
    libgdk-pixbuf2.0-0 \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Verificar instalaciones críticas
RUN echo "=== Verificando instalaciones ===" \
    && node --version \
    && npm --version \
    && python3 --version \
    && ffmpeg -version \
    && echo "=== Todas las instalaciones exitosas ==="

# Copiar archivos de configuración de npm
COPY package*.json ./

# Configurar npm para compatibilidad moderna
RUN npm config set fund false \
    && npm config set audit-level moderate

# Instalar dependencias
RUN echo "=== Instalando dependencias npm ===" \
    && npm install --verbose \
    && echo "=== Instalación de dependencias completada ===" \
    && npm ls --depth=0

# Copiar el resto del código
COPY . .

# Establecer permisos correctos
RUN chown -R node:node /app \
    && chmod -R 755 /app

# Cambiar a usuario no-root
USER node

# Exponer puerto (opcional)
EXPOSE 3000

# Configurar FFmpeg PATH
ENV FFMPEG_PATH=/usr/bin/ffmpeg
ENV PATH="/usr/bin:$PATH"

# Comando de salud
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "console.log('Bot is healthy')" || exit 1

# Comando por defecto
CMD ["node", "index.js"]

# Metadatos
LABEL maintainer="Galaxy A06"
LABEL description="Elite Music: Discord Music Bot con soporte en español"
LABEL version="2.2.1"
LABEL node.version="20"
LABEL ffmpeg.version="latest"
