const { client } = require("./index");
const { DisTube } = require("distube");
const { YouTubePlugin } = require("@distube/youtube");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { DeezerPlugin } = require("@distube/deezer");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { AppleMusicPlugin } = require("distube-apple-music");

client.distubeSettings = {
    leaveOnEmpty: true, // Whether or not leaving voice channel if the voice channel is empty after DisTubeOptions.emptyCooldown seconds.
    leaveOnFinish: false, // Whether or not leaving voice channel when the queue ends.
    leaveOnStop: true, // Whether or not leaving voice channel after using DisTube#stop function.
    searchSongs: 10, // DONT SET IT MORE THAN 25!!! | Limit of search results emits in DisTube#event:searchResult event when DisTube#play method executed. If searchSongs <= 1, play the first result.
    emptyCooldown: 60, // Built-in leave on empty cooldown in seconds. (When leaveOnEmpty is true)
    directLink: true, // Whether or not play direct link of the song.
    deleteAfterFinish: false, // Deletes Now Playing Message after song finished.
};

const distubePlugins = [
    new YouTubePlugin(), // YouTube plugin.
    new SoundCloudPlugin(), // SoundCloud plugin.
    new SpotifyPlugin(), // Spotify plugin.
    new DeezerPlugin(), // Deezer plugin.
    new AppleMusicPlugin(), // Apple Music plugin.
];

if (client.distubeSettings.directLink) {
    const { DirectLinkPlugin } = require("@distube/direct-link");
    distubePlugins.push(new DirectLinkPlugin());
}

// YtDlpPlugin must be added last
distubePlugins.push(new YtDlpPlugin());

// Set FFmpeg path in environment for maximum compatibility
const ffmpegPath = require('./utils/ffmpeg-resolver').findFfmpeg();
process.env.FFMPEG_PATH = ffmpegPath;
console.log(`🎵 FFmpeg configurado para DisTube: ${ffmpegPath}`);

// DisTube client constructor
client.distube = new DisTube(client, {
    // Change these on your risk! more info https://distube.js.org/#/docs/DisTube/stable/typedef/DisTubeOptions
    emitNewSongOnly: false, // Whether or not emitting DisTube#event:playSong event when looping a song or next song is the same as the previous one.
    savePreviousSongs: true, // Whether or not saving the previous songs of the queue and enable DisTube#previous method.
    nsfw: false, // Whether or not playing age-restricted content and disabling safe search in non-NSFW channel.
    emitAddListWhenCreatingQueue: true, // Whether or not emitting addList event when creating a new Queue.
    emitAddSongWhenCreatingQueue: true, // Whether or not emitting addSong event when creating a new Queue.
    joinNewVoiceChannel: false, // Whether or not joining the new voice channel when using DisTube#play method.
    plugins: distubePlugins
});

// Voice connection optimization for Replit environment
console.log('🎵 Configurando optimizaciones de voz para Replit...');

// ========================= CRITICAL: VOICE ENCODER VERIFICATION =========================
console.log('🔍 Verificando codificador de voz...');

// Runtime voice encoder detection and verification
function verifyVoiceEncoder() {
    let detectedEncoder = 'unknown';
    let encoderWorking = false;
    
    try {
        // Try to detect opusscript (version 0.0.8 API)
        const OpusScript = require('opusscript');
        if (OpusScript && typeof OpusScript === 'function' && OpusScript.Application) {
            // Test creating an encoder to verify it works
            const testEncoder = new OpusScript(48000, 2, OpusScript.Application.AUDIO);
            if (testEncoder) {
                detectedEncoder = 'opusscript';
                encoderWorking = true;
                console.log('✅ opusscript detectado y funcional (v0.0.8 API)');
            }
        }
    } catch (error) {
        console.log('❌ opusscript no encontrado o no funcional:', error.message);
    }
    
    try {
        // Check if @discordjs/opus was accidentally installed
        require('@discordjs/opus');
        console.log('⚠️  ADVERTENCIA: @discordjs/opus detectado - esto puede causar problemas en Replit');
        console.log('🔧 Ejecuta: npm uninstall @discordjs/opus');
    } catch (error) {
        console.log('✅ @discordjs/opus no encontrado (correcto para Replit)');
    }
    
    // Fail fast if no working encoder detected
    if (!encoderWorking) {
        console.error('🚨 ERROR CRÍTICO: No se detectó un codificador de voz funcional');
        console.error('🔧 Instala opusscript: npm install opusscript');
        process.exit(1);
    }
    
    console.log(`🎵 Codificador de voz verificado: ${detectedEncoder}`);
    return { encoder: detectedEncoder, working: encoderWorking };
}

// Run encoder verification
const encoderStatus = verifyVoiceEncoder();

// ========================= VOICE CONNECTION DIAGNOSTICS =========================
console.log('🔧 Configurando diagnósticos de conexión de voz...');

// Voice connection state monitoring
function setupVoiceConnectionDiagnostics(distube) {
    // Note: DisTube voices manager doesn't have 'on' method for general debug events
    // The diagnostics are implemented in the join method wrapper below
    
    // Track connection attempts and timeouts
    const connectionAttempts = new Map();
    
    // Wrap the join method to add diagnostics
    const originalJoin = distube.voices.join.bind(distube.voices);
    distube.voices.join = async function(voiceChannel, options = {}) {
        const guildId = voiceChannel.guild.id;
        const channelName = voiceChannel.name || 'Unknown';
        
        console.log(`🔗 Intentando conectar a canal de voz: ${channelName} (Guild: ${guildId})`);
        console.log(`🎵 Usando codificador: ${encoderStatus.encoder}`);
        
        const startTime = Date.now();
        connectionAttempts.set(guildId, { startTime, channelName });
        
        try {
            const connection = await originalJoin(voiceChannel, {
                ...options,
                debug: true // Enable debug logging
            });
            
            const duration = Date.now() - startTime;
            console.log(`✅ Conectado exitosamente en ${duration}ms a ${channelName}`);
            
            // Monitor connection state changes
            connection.on('stateChange', (oldState, newState) => {
                console.log(`🔄 Estado de conexión cambió: ${oldState.status} → ${newState.status} en ${channelName}`);
                
                if (newState.status === 'disconnected') {
                    console.log(`❌ Desconectado de ${channelName}:`, newState.reason);
                }
                
                if (newState.status === 'destroyed') {
                    console.log(`💥 Conexión destruida en ${channelName}:`, newState.reason);
                    connectionAttempts.delete(guildId);
                }
            });
            
            // Monitor for connection timeout
            const timeoutWarning = setTimeout(() => {
                if (connection.state.status !== 'ready') {
                    console.log(`⚠️  Conexión tomando más tiempo del esperado en ${channelName}`);
                }
            }, 10000); // 10 seconds warning
            
            connection.once('stateChange', () => {
                clearTimeout(timeoutWarning);
            });
            
            connectionAttempts.delete(guildId);
            return connection;
            
        } catch (error) {
            const duration = Date.now() - startTime;
            console.error(`❌ Error conectando a ${channelName} después de ${duration}ms:`, error.message);
            connectionAttempts.delete(guildId);
            throw error;
        }
    };
    
    // Periodic connection health check
    setInterval(() => {
        const now = Date.now();
        for (const [guildId, attempt] of connectionAttempts.entries()) {
            const duration = now - attempt.startTime;
            if (duration > 30000) { // 30 seconds timeout
                console.error(`🚨 Timeout conectando a ${attempt.channelName} después de ${duration}ms`);
                connectionAttempts.delete(guildId);
            }
        }
    }, 5000); // Check every 5 seconds
}

// Apply diagnostics to distube after initialization
setTimeout(() => {
    if (client.distube && client.distube.voices) {
        setupVoiceConnectionDiagnostics(client.distube);
        console.log('✅ Diagnósticos de voz configurados correctamente');
    } else {
        console.error('❌ No se pudieron configurar los diagnósticos de voz');
    }
}, 1000);

console.log('🎵 Usando opusscript como codificador de audio para mejor compatibilidad');
