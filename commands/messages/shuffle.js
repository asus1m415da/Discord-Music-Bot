const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "Shuffle",
    aliases: ["SH", "mezclar", "aleatorio"],
    description: "Mezcla las canciones de la cola aleatoriamente.",
    category: "Comandos de Cola",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        try {
            await queue.shuffle();

            const shuffleEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔀 Mezclar")
                .setDescription("He mezclado las canciones de la cola")
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [shuffleEmbed] });
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
