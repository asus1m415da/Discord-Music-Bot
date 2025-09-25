const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = async (client, queue, playlist) => {
    const embed = new Discord.EmbedBuilder()
        .setColor(config.MainColor)
        .setTitle("📃 Nueva Cola")
        .setDescription(`Nueva lista de reproducción agregada a la cola\n**Lista:** ${playlist.name} (${playlist.songs.length} canciones)\n\n🎵 Bot desarrollado por <@1404572152014962708>`)
        .setFooter({
            text: `Solicitado por ${playlist.songs[0].user.globalName || playlist.songs[0].user.username}`,
            iconURL: playlist.songs[0].user.displayAvatarURL({ size: 1024 }),
        });

    await queue.textChannel?.send({ embeds: [embed] });
};
