const Discord = require("discord.js");
const os = require("node:os");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder().setName("ping").setDescription("Muestra la latencia del bot."),
    memberVoice: false,
    botVoice: false,
    sameVoice: false,
    queueNeeded: false,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        const embed = new Discord.EmbedBuilder()
            .setColor(config.MainColor)
            .setTitle("🏓 ¡Pong!")
            .setDescription("Estado del bot desarrollado por <@1404572152014962708>")
            .addFields(
                {
                    name: `📡 Latencia:`,
                    value: `${client.ws.ping}ms`,
                    inline: true,
                },
                {
                    name: `💾 Memoria:`,
                    value: `${func.numberWithCommas(Math.round(process.memoryUsage().rss / 1024 / 1024))}/${func.numberWithCommas(
                        Math.round(os.totalmem() / 1024 / 1024)
                    )}MB`,
                    inline: true,
                },
                {
                    name: `⏳ Tiempo Activo:`,
                    value: func.timestamp(client.readyTimestamp),
                    inline: false,
                }
            )
            .setFooter({
                text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
            });

        await interaction.editReply({ embeds: [embed] });
    },
};
