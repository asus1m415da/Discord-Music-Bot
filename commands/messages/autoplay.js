const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    name: "AutoPlay",
    aliases: ["A", "AP", "Auto", "automatico"],
    description: "Alterna el modo de reproducción automática.",
    category: "Comandos de Cola",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        try {
            const autoPlayState = await queue.toggleAutoplay();

            const autoplayEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔧 Reproducción Automática")
                .setDescription(`Modo de reproducción automática cambiado a \`${autoPlayState ? "ACTIVADO" : "DESACTIVADO"}\`\n\n${func.queueStatus(queue)}`)
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [autoplayEmbed] });
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
