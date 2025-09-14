const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder().setName("resume").setDescription("Reanuda la canción actual."),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        if (!queue.paused) {
            const pauseEmbed = new Discord.EmbedBuilder()
                .setColor(config.WarnColor)
                .setTitle("⚠️ Advertencia")
                .setDescription("La cola no está pausada.")
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            return interaction.editReply({ embeds: [pauseEmbed] });
        }

        try {
            await queue.resume();

            const pauseEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("▶️ Reanudado")
                .setDescription("He reanudado la canción para ti.")
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [pauseEmbed] });
        } catch (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setTitle("❌ Error")
                .setDescription(`Ocurrió un error al reanudar: ${error.message.length > 4000 ? error.message.slice(0, 3997) + "..." : error.message}`)
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    },
};
