const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "Play",
    aliases: ["P", "start", "reproducir", "tocar"],
    description: "Reproduce música para ti.",
    usage: "Play <Nombre de la canción / URL de la canción / URL de lista de reproducción>",
    category: "Comandos de Reproducción",
    memberVoice: true,
    botVoice: false,
    sameVoice: true,
    queueNeeded: false,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        const string = args.join(" ");
        if (!string) {
            const stringEmbed = new Discord.EmbedBuilder()
                .setColor(config.WarnColor)
                .setTitle("⚠️ Advertencia")
                .setDescription("Por favor ingresa una URL de canción o consulta para buscar.")
                .setFooter({
                    text: `Solicitado por ${message.author.globalName || message.author.username}`,
                    iconURL: message.author.displayAvatarURL({ size: 1024 }),
                });

            return message.reply({ embeds: [stringEmbed] });
        }

        try {
            await client.distube.play(memberVC, string, {
                member: message.member,
                textChannel: message.channel,
                message,
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
