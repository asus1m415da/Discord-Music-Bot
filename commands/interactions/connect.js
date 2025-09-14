const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder().setName("connect").setDescription("Se conecta a tu canal de voz actual."),
    memberVoice: true,
    botVoice: false,
    sameVoice: true,
    queueNeeded: false,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        if (memberVC && botVC && memberVC.id === botVC.id) {
            const inVoiceEmbed = new Discord.EmbedBuilder()
                .setColor(config.WarnColor)
                .setTitle("⚠️ Advertencia")
                .setDescription("Ya estoy conectado a tu canal de voz.")
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            return interaction.editReply({ embeds: [inVoiceEmbed] });
        }

        try {
            await client.distube.voices.join(memberVC);

            const joinEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("👋🏻 Conectado")
                .setDescription("Me he conectado a tu canal de voz.")
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [joinEmbed] });
        } catch (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setTitle("❌ Error")
                .setDescription(`Ocurrió un error al conectar: ${error.message.length > 4000 ? error.message.slice(0, 3997) + "..." : error.message}`)
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    },
};
