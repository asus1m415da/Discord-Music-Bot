const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "Disconnect",
    aliases: ["DC", "L", "Left", "Leave", "desconectar", "salir"],
    description: "Se desconecta de tu canal de voz.",
    category: "Comandos de Utilidades",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: false,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        try {
            await client.distube.voices.leave(message.guild);

            const leaveEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("👋🏻 Desconectar")
                .setDescription("Me he desconectado de tu canal de voz.")
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [leaveEmbed] });
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
