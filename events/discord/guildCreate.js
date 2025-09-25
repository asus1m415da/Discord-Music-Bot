const { validateAndLeaveIfUnauthorized } = require("../../utils/server-validator");

module.exports = async (client, guild) => {
    console.log(`📥 Bot agregado a nuevo servidor: ${guild.name} (${guild.id})`);
    
    // Validar si el servidor está autorizado
    const isAuthorized = await validateAndLeaveIfUnauthorized(guild);
    
    if (!isAuthorized) {
        return; // El bot saldrá automáticamente del servidor
    }
    
    console.log(`✅ Bot autorizado y funcionando en: ${guild.name}`);
};