const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder().setName("disconnect").setDescription("Se desconecta de tu canal de voz actual."),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: false,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        try {
            await client.distube.voices.leave(interaction.guild);

            const leaveEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("👋🏻 Desconectado")
                .setDescription("Me he desconectado de tu canal de voz.")
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [leaveEmbed] });
        } catch (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setTitle("❌ Error")
                .setDescription(`Ocurrió un error al desconectar: ${error.message.length > 4000 ? error.message.slice(0, 3997) + "..." : error.message}`)
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    },
};
