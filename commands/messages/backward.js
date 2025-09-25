const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "Backward",
    aliases: ["BW", "Rewind", "atras", "rebobinar"],
    description: "Retrocede la canción que se está reproduciendo.",
    usage: "Backward <Segundos>",
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
                .setDescription("¡Por favor proporciona el tiempo (en segundos) para retroceder!\n**Ejemplo:** `10` para retroceder 10 segundos.")
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return message.reply({ embeds: [noArgsEmbed] });
        }

        try {
            await queue.seek(queue.currentTime - time);

            const seekEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("⏪ Retroceder")
                .setDescription(`He retrocedido la canción ${time} segundos.`)
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
