const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Encuentra FFmpeg de manera robusta en cualquier sistema
 * Intenta múltiples métodos para garantizar compatibilidad
 */
function findFfmpeg() {
    // Método 1: Intentar comando which/where (platform-specific)
    try {
        const command = process.platform === 'win32' ? 'where ffmpeg' : 'which ffmpeg';
        const ffmpegPath = execSync(command, { 
            encoding: 'utf8', 
            timeout: 5000,
            stdio: ['ignore', 'pipe', 'ignore']
        }).trim();
        if (ffmpegPath && fs.existsSync(ffmpegPath.split('\n')[0])) {
            console.log('✅ FFmpeg encontrado via which/where:', ffmpegPath.split('\n')[0]);
            return ffmpegPath.split('\n')[0];
        }
    } catch (error) {
        console.log('❌ Método which/where falló');
    }

    // Método 2: Intentar ffmpeg-static
    try {
        const ffmpegStatic = require('ffmpeg-static');
        if (ffmpegStatic && fs.existsSync(ffmpegStatic)) {
            console.log('✅ FFmpeg encontrado via ffmpeg-static:', ffmpegStatic);
            return ffmpegStatic;
        }
    } catch (error) {
        console.log('❌ ffmpeg-static no disponible o sin binario');
    }

    // Método 3: Rutas comunes del sistema
    const commonPaths = [
        '/usr/bin/ffmpeg',
        '/usr/local/bin/ffmpeg',
        '/opt/homebrew/bin/ffmpeg',
        'C:\\ffmpeg\\bin\\ffmpeg.exe',
        'C:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe',
    ];

    for (const pathToTry of commonPaths) {
        if (fs.existsSync(pathToTry)) {
            console.log('✅ FFmpeg encontrado en ruta común:', pathToTry);
            return pathToTry;
        }
    }

    // Método 4: Buscar en PATH manualmente
    const pathEnv = process.env.PATH || '';
    const pathDirs = pathEnv.split(path.delimiter);
    
    for (const dir of pathDirs) {
        const ffmpegPath = path.join(dir, process.platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg');
        if (fs.existsSync(ffmpegPath)) {
            console.log('✅ FFmpeg encontrado en PATH:', ffmpegPath);
            return ffmpegPath;
        }
    }

    // Método 5: Fallback - confiar en que está en PATH
    console.log('⚠️  Usando fallback: ffmpeg (debe estar en PATH)');
    return 'ffmpeg';
}

module.exports = { findFfmpeg };