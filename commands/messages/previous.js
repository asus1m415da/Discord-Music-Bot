const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "Previous",
    aliases: ["B", "Back", "anterior", "atras"],
    description: "Reproduce la canción anterior.",
    category: "Comandos de Cola",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        try {
            await queue.previous();

            const skippedEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔙 Anterior")
                .setDescription("Saltando a la canción anterior.")
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [skippedEmbed] });
        } catch (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setTitle("❌ Error")
                .setDescription(error.message.length > 4096 ? error.message.slice(0, 4093) + "..." : error.message)
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [errorEmbed] });
        }
    },
};
