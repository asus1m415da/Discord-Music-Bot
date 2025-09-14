const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "SkipTo",
    aliases: ["ST", "Jump", "saltar", "saltar-a"],
    description: "Salta a la canción especificada por número en la cola.",
    usage: "SkipTo <Número de Canción>",
    category: "Comandos de Cola",
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        if (!args[0] || isNaN(Number(args[0]))) {
            const noArgsEmbed = new Discord.EmbedBuilder()
                .setColor(config.WarnColor)
                .setTitle("⚠️ Advertencia")
                .setDescription("Por favor ingresa un número válido.")
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return message.reply({ embeds: [noArgsEmbed] });
        }

        try {
            await client.distube.jump(message.guild, Number(args[0])).then(async (song) => {
                const skippedEmbed = new Discord.EmbedBuilder()
                    .setColor(config.MainColor)
                    .setTitle("⏭️ Saltar a")
                    .setDescription(`He saltado a la **${args[0]}. [${song.name} (${song.formattedDuration})](${song.url})**`)
                    .setFooter({
                        text: `Solicitado por ${message.author.globalName || message.author.username}`,
                        iconURL: message.author.displayAvatarURL({ size: 1024 }),
                    });

                await message.reply({ embeds: [skippedEmbed] });
            });
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
