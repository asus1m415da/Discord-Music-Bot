const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    name: "NowPlaying",
    aliases: ["NP", "Now", "Song", "Music", "Playing", "Current", "ahora", "actual"],
    description: "Muestra la canción que se está reproduciendo actualmente.",
    category: "Comandos de Canción",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        const voiceChannelMembers = botVC.members.filter((member) => !member.user.bot);

        const nowEmbed = new Discord.EmbedBuilder()
            .setColor(config.MainColor)
            .setTitle("💿 Reproduciendo Ahora")
            .setDescription(
                `Reproduciendo ahora **[${queue.songs[0].name} (${queue.songs[0].formattedDuration})](${queue.songs[0].url})** para ${
                    voiceChannelMembers.size
                } ${voiceChannelMembers.size > 1 ? "oyentes" : "oyente"} en ${botVC}\n\n${func.queueStatus(queue)}`
            )
            .setThumbnail(queue.songs[0]?.thumbnail)
            .setFooter({
                text: `Canción solicitada por ${queue.songs[0].user.globalName || queue.songs[0].user.username}`,
                iconURL: queue.songs[0].user.displayAvatarURL({ size: 1024 }),
            });

        if (queue.songs[0].views)
            nowEmbed.addFields({
                name: "👀 Views:",
                value: `${func.numberWithCommas(queue.songs[0].views)}`,
                inline: true,
            });

        if (queue.songs[0].likes)
            nowEmbed.addFields({
                name: "👍🏻 Likes:",
                value: `${func.numberWithCommas(queue.songs[0].likes)}`,
                inline: true,
            });

        if (queue.songs[0].dislikes)
            nowEmbed.addFields({
                name: "👎🏻 Dislikes:",
                value: `${func.numberWithCommas(queue.songs[0].dislikes)}`,
                inline: true,
            });

        await message.reply({ embeds: [nowEmbed] });
    },
};
