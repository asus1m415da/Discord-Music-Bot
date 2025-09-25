const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "PlaySkip",
    aliases: ["PS", "tocar-saltar", "reproducir-saltar"],
    description: "Reproduce la canción y salta la canción actual.",
    usage: "PlaySkip <Nombre de Canción / URL de Canción / URL de Lista>",
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
            // await client.distube.play(memberVC, string, {
            //     member: message.member,
            //     textChannel: message.channel,
            //     message,
            //     skip: true,
            // });

            await client.distube.play(memberVC, string, {
                member: message.member,
                textChannel: message.channel,
                message,
                position: 1,
            });
            await queue.skip();
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
