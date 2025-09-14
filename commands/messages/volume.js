const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    name: "volume",
    aliases: ["V", "Vol", "Set", "SetVolume", "volumen"],
    description: "Establece el volumen del reproductor.",
    usage: "Volume <Volumen>",
    category: "Comandos de Canción",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        const volume = parseInt(args[0]);
        if (isNaN(volume)) {
            const notValidNumberEmbed = new Discord.EmbedBuilder()
                .setColor(config.WarnColor)
                .setTitle("⚠️ Advertencia")
                .setDescription("Por favor ingresa un número válido.")
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return message.reply({ embeds: [notValidNumberEmbed] });
        }

        try {
            if (volume > 200 || volume < 0) {
                const volumeEmbed = new Discord.EmbedBuilder()
                    .setColor(config.WarnColor)
                    .setTitle("⚠️ Advertencia")
                    .setFooter({
                        text: `Solicitado por ${message.author.globalName || message.author.username}`,
                        iconURL: message.author.displayAvatarURL({ size: 1024 }),
                    });

                if (volume > 200) volumeEmbed.setDescription("No puedes establecer el volumen por encima de `200`");
                if (volume < 0) volumeEmbed.setDescription("No puedes establecer el volumen por debajo de `0`");

                return message.reply({ embeds: [volumeEmbed] });
            }

            await queue.setVolume(volume);

            const volumeEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔊 Volumen")
                .setDescription(`Volumen cambiado a \`${volume}\`\n\n${func.queueStatus(queue)}`)
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [volumeEmbed] });
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
