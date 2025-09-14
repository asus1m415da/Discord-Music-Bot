const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = async (client, queue) => {
    const embed = new Discord.EmbedBuilder()
        .setColor(config.ErrorColor)
        .setTitle("🚫 Sin Canciones Relacionadas")
        .setDescription("No puedo encontrar canciones relacionadas para reproducir\n\n🎵 Bot desarrollado por <@1404572152014962708>");

    await queue.textChannel?.send({ embeds: [embed] });
};
