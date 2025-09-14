const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = async (client, queue, song) => {
    const embed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setTitle("🎶 Nueva Canción")
        .setDescription(`Nueva canción agregada a la cola\n**Canción:** [${song.name} (${song.formattedDuration})](${song.url})\n\n🎵 Bot desarrollado por <@1404572152014962708>`)
        .setFooter({
            text: `Solicitado por ${song.user.globalName || song.user.username}`,
            iconURL: song.user.displayAvatarURL({ size: 1024 }),
        });

    await queue.textChannel?.send({ embeds: [embed] });
};
