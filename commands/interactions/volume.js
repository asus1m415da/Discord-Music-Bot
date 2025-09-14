const Discord = require("discord.js");
const func = require("../../utils/functions");
const config = require("../../config.json");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("volume")
        .setDescription("Establece el volumen del reproductor.")
        .addIntegerOption((option) => option.setName("volume").setDescription("Ingresa el nuevo valor de volumen.").setRequired(true)),
    memberVoice: true,
    botVoice: true,
    sameVoice: true,
    queueNeeded: true,

    async execute(client, interaction, memberVC, botVC, queue) {
        await interaction.deferReply();

        const volume = interaction.options.getInteger("volume");

        try {
            if (volume > 200 || volume < 0) {
                const volumeEmbed = new Discord.EmbedBuilder().setColor(config.ErrorColor).setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

                if (volume > 200) volumeEmbed.setDescription("No puedes establecer el volumen mayor a `200`");
                if (volume < 0) volumeEmbed.setDescription("No puedes establecer el volumen menor a `0`");

                return interaction.editReply({ embeds: [volumeEmbed] });
            }

            await queue.setVolume(volume);

            const volumeEmbed = new Discord.EmbedBuilder()
                .setColor(config.MainColor)
                .setTitle("🔊 Volumen")
                .setDescription(`Volumen cambiado a \`${volume}\`\n\n${func.queueStatus(queue)}`)
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [volumeEmbed] });
        } catch (error) {
            const errorEmbed = new Discord.EmbedBuilder()
                .setColor(config.ErrorColor)
                .setTitle("❌ Error")
                .setDescription(`Ocurrió un error con el volumen: ${error.message.length > 4000 ? error.message.slice(0, 3997) + "..." : error.message}`)
                .setFooter({
                    text: `Solicitado por ${interaction.user.globalName || interaction.user.username} `,
                    iconURL: interaction.user.displayAvatarURL({ size: 1024 }),
                });

            await interaction.editReply({ embeds: [errorEmbed] });
        }
    },
};
