const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    name: "Filter",
    aliases: ["F", "Mode", "Filters", "filtro", "filtros"],
    description: "Aplica diferentes filtros de audio.",
    usage: "Filter <Filtro>",
    category: "Comandos de Canción",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        const filter = args[0]?.toLowerCase();

        if (!args[0]) {
            const noArgsEmbed = new Discord.EmbedBuilder()
                .setColor(config.WarnColor)
                .setTitle("⚠️ Advertencia")
                .setDescription(
                    "Por favor ingresa un filtro válido o `OFF`.\n\n**Filtros Válidos:** `3D` | `BassBoost` | `Earwax` | `Echo` | `Flanger` | `Gate` | `Haas` | `Karaoke` | `Mcompand` | `NightCore` |  `Phaser` | `Reverse` | `Surround` | `Tremolo` | `VaporWave`"
                );

            return message.reply({ embeds: [noArgsEmbed] });
        }

        try {
            if (filter === "off" && queue.filters.size) {
                await queue.filters.clear();
            } else if (Object.keys(client.distube.filters).includes(filter)) {
                if (queue.filters.has(filter)) {
                    await queue.filters.remove(filter);
                } else {
                    await queue.filters.add(filter);
                }
            } else if (args[0]) {
                const notAvalidFilter = new Discord.EmbedBuilder()
                    .setColor(config.WarnColor)
                    .setTitle("⚠️ Advertencia")
                    .setDescription(
                        "Por favor ingresa un filtro válido o `OFF`.\n\n**Filtros Válidos:** `3D` | `Bassboost` | `Echo` | `Karaoke` | `Nightcore` | `Vaporwave` | `Flanger` | `Gate` | `Haas` | `Reverse` | `Surround` | `Mcompand` | `Phaser` | `Tremolo` | `Earwax`"
                    )
                    .setFooter({
                        text: `Solicitado por ${message.author.globalName || message.author.username}`,
                        iconURL: message.author.displayAvatarURL({ size: 1024 }),
                    });

                return message.reply({ embeds: [notAvalidFilter] });
            }

            const filtersEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🎧 Filtro")
                .setDescription(`**Filtros Actuales de la Cola:** \`${queue.filters.names.join(", ") || "OFF"}\`\n\n${func.queueStatus(queue)}`)
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            await message.reply({ embeds: [filtersEmbed] });
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
