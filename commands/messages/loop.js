const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    name: "Loop",
    aliases: ["Repeat", "repetir", "bucle"],
    description: "Cambia el modo de bucle.",
    usage: "Loop <OFF / Song / Queue>",
    category: "Comandos de Cola",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        if (!args[0] || !["off", "song", "queue"].includes(args[0].toLowerCase())) {
            const noArgsEmbed = new Discord.EmbedBuilder()
                .setColor(config.WarnColor)
                .setTitle("⚠️ Advertencia")
                .setDescription("Por favor ingresa un modo válido.\n\n**Modos Válidos:** `OFF` | `SONG` | `QUEUE`")
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return message.reply({ embeds: [noArgsEmbed] });
        }

        try {
            let mode = 0;
            if (args[0].toLowerCase() === "song") mode = 1;
            else if (args[0].toLowerCase === "queue") mode = 2;

            mode = await queue.setRepeatMode(mode);
            mode = mode ? (mode === 2 ? "Toda la Cola" : "Esta Canción") : "OFF";

            const loopEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔁 Bucle")
                .setDescription(`Modo de bucle cambiado a \`${mode}\`\n\n${func.queueStatus(queue)}`)
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [loopEmbed] });
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
