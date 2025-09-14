const Discord = require("discord.js");
const config = require("../../config.json");
const { validateAndLeaveIfUnauthorized, ALLOWED_SERVERS } = require("../../utils/server-validator");

module.exports = async (client) => {
    await client.user.setPresence({
        activities: [
            {
                name: `música con ${config.Prefix}play`,
                type: Discord.ActivityType.Listening,
            },
        ],
        status: "online",
    });

    console.log(`${client.user.tag} está en línea y listo para reproducir música para ti! Desarrollado por <@1404572152014962708>`);
    
    // Validar servidores existentes
    console.log(`🔍 Validando ${client.guilds.cache.size} servidores...`);
    console.log(`✅ Servidores autorizados: ${ALLOWED_SERVERS.join(', ')}`);
    
    for (const guild of client.guilds.cache.values()) {
        await validateAndLeaveIfUnauthorized(guild);
    }
    
    console.log(`🛡️ Validación de servidores completada`);
};
