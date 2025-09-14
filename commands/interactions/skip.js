const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder().setName("skip").setDescription("Salta a la siguiente canción."),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        try {
            await queue.skip();

            const skippedEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("⏭️ Saltado")
                .setDescription("Saltando a la siguiente canción.")
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [skippedEmbed] });
        } catch (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setTitle("❌ Error")
                .setDescription(`Ocurrió un error al saltar: ${error.message.length > 4000 ? error.message.slice(0, 3997) + "..." : error.message}`)
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    },
};
