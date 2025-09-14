const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder().setName("shuffle").setDescription("Mezcla aleatoriamente las canciones de la cola."),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        try {
            await queue.shuffle();

            const shuffleEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔀 Mezclado")
                .setDescription("He mezclado las canciones de la cola aleatoriamente")
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [shuffleEmbed] });
        } catch (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setTitle("❌ Error")
                .setDescription(`Ocurrió un error al mezclar: ${error.message.length > 4000 ? error.message.slice(0, 3997) + "..." : error.message}`)
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    },
};
