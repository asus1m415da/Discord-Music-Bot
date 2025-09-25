const Discord = require("discord.js");
const config = require("../../config.json");
const func = require("../../utils/functions");

module.exports = {
    name: "Seek",
    aliases: ["Go", "To", "GoTo", "buscar", "ir"],
    description: "Va a una posición específica de la canción.",
    usage: "Seek <Segundos>",
    category: "Comandos de Canción",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        const time = Number(args[0]);

        if (!args[0] || isNaN(time)) {
            const noArgsEmbed = new Discord.EmbedBuilder()
                .setColor(config.WarnColor)
                .setTitle("⚠️ Advertencia")
                .setDescription("¡Por favor proporciona la posición (en segundos) para ir!\n**Ejemplo:** `10` para ir al segundo 10 de la canción.")
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return message.reply({ embeds: [noArgsEmbed] });
        }

        try {
            await queue.seek(time);

            const seekEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("⏳ Ir a")
                .setDescription(`He ido al segundo ${func.suffix(time)} de la canción.`)
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [seekEmbed] });
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
