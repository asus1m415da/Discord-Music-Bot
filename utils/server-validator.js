/**
 * Valida que el bot solo funcione en servidores autorizados
 */

const ALLOWED_SERVERS = [
    '1405727340335468665',
    '1393290240214438021',
    '1329514510415040663'
];

/**
 * Verifica si el servidor está autorizado
 * @param {string} guildId - ID del servidor
 * @returns {boolean} true si está autorizado
 */
function isServerAllowed(guildId) {
    return ALLOWED_SERVERS.includes(guildId);
}

/**
 * Valida y sale del servidor si no está autorizado
 * @param {import('discord.js').Guild} guild - Servidor de Discord
 */
async function validateAndLeaveIfUnauthorized(guild) {
    if (!isServerAllowed(guild.id)) {
        console.log(`❌ Servidor no autorizado detectado: ${guild.name} (${guild.id})`);
        console.log(`🚪 Saliendo del servidor: ${guild.name}`);
        
        try {
            // Intentar enviar mensaje antes de salir
            const systemChannel = guild.systemChannel || guild.channels.cache.find(c => c.type === 0 && c.permissionsFor(guild.members.me).has('SendMessages'));
            
            if (systemChannel) {
                await systemChannel.send('❌ Este bot solo funciona en servidores autorizados. Saliendo del servidor...');
            }
        } catch (error) {
            console.log('No se pudo enviar mensaje de salida');
        }
        
        // Salir del servidor después de 3 segundos
        setTimeout(async () => {
            try {
                await guild.leave();
                console.log(`✅ Salida exitosa del servidor: ${guild.name}`);
            } catch (error) {
                console.error(`Error al salir del servidor ${guild.name}:`, error);
            }
        }, 3000);
        
        return false;
    }
    
    console.log(`✅ Servidor autorizado: ${guild.name} (${guild.id})`);
    return true;
}

/**
 * Middleware para validar comandos solo en servidores autorizados
 * @param {import('discord.js').Message} message - Mensaje de Discord
 * @returns {boolean} true si el comando puede ejecutarse
 */
function validateCommandExecution(message) {
    if (!message.guild) {
        // Comandos DM no permitidos
        return false;
    }
    
    if (!isServerAllowed(message.guild.id)) {
        message.reply('❌ Este bot solo funciona en servidores autorizados.').catch(() => {});
        return false;
    }
    
    return true;
}

module.exports = {
    isServerAllowed,
    validateAndLeaveIfUnauthorized,
    validateCommandExecution,
    ALLOWED_SERVERS
};
