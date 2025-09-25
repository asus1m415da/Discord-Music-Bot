const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = async (client, error, queue, song) => {
    const embed = new Discord.EmbedBuilder()
    .setColor(config.ErrorColor)
    .setTitle("❌ Error")
    .setDescription(`Ocurrió un error: ${error}\n\n🔧 Bot desarrollado por <@1404572152014962708>`);
    await queue.textChannel?.send({ embeds: [embed] });
    console.error(error)
};
