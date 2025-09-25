const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "Connect",
    aliases: ["C", "J", "Join", "conectar", "unir"],
    description: "Se conecta a tu canal de voz actual.",
    category: "Comandos de Utilidades",
    memberVoice: true,
    botVoice: false,
    sameVoice: true,
    queueNeeded: false,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        if (memberVC && botVC && memberVC.id === botVC.id) {
            const inVoiceEmbed = new Discord.EmbedBuilder()
                .setColor(config.WarnColor)
                .setTitle("⚠️ Advertencia")
                .setDescription("Ya estoy conectado a tu canal de voz.")
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return message.reply({ embeds: [inVoiceEmbed] });
        }

        try {
            await client.distube.voices.join(memberVC);

            const joinEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("👋🏻 Conectar")
                .setDescription("Me he conectado a tu canal de voz.")
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [joinEmbed] });
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
