const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("play")
        .setDescription("Reproduce música para ti.")
        .addStringOption((option) => option.setName("query").setDescription("Ingresa el nombre de la canción o lista de reproducción.").setRequired(true)),
    memberVoice: true,
    botVoice: false,
    sameVoice: true,
    queueNeeded: false,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply({ ephemeral: true });

        const query = interaction.options.getString("query");

        const searchEmbed = new Discord.EmbedBuilder()
            .setColor(config.MainColor)
            .setDescription("🔍 Buscando música...")
            .setFooter({
                text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
            });

        await interaction.editReply({ embeds: [searchEmbed] });

        try {
            await client.distube.play(memberVC, query, {
                member: interaction.member,
                textChannel: interaction.channel,
            });

            await interaction.deleteReply();
        } catch (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setTitle("❌ Error")
                .setDescription(`Ocurrió un error al reproducir la música: ${error.message.length > 4000 ? error.message.slice(0, 3997) + "..." : error.message}`)
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    },
};
