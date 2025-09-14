const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "Help",
    aliases: ["H", "CMD", "CMDs", "Command", "Commands", "ayuda", "comandos"],
    description: "Muestra la lista de comandos e información del bot.",
    usage: "Help [COMANDO]",
    category: "Comandos de Utilidades",
    memberVoice: false,
    botVoice: false,
    sameVoice: false,
    queueNeeded: false,

    async execute(client, message, args, cmd, memberVC, botVC, queue) {
        const playCommands = [...client.MessageCommands.values()].filter((command) => command.category === "Comandos de Reproducción");
        const songCommands = [...client.MessageCommands.values()].filter((command) => command.category === "Comandos de Canción");
        const queueCommands = [...client.MessageCommands.values()].filter((command) => command.category === "Comandos de Cola");
        const utilitiesCommands = [...client.MessageCommands.values()].filter((command) => command.category === "Comandos de Utilidades");

        const helpEmbed = new Discord.EmbedBuilder()
            .setColor(config.MainColor)
            .setTitle("❓ Ayuda")
            .setFooter({ text: "Desarrollado por <@1404572152014962708> • Bot de Música Avanzado" });

        if (
            args[0] &&
            (client.MessageCommands.find((command) => command.name.toLowerCase() === args[0].toLowerCase()) ||
                client.MessageCommands.find((c) => c.aliases?.map((aliase) => aliase.toLowerCase()).includes(args[0].toLowerCase())))
        ) {
            const command =
                client.MessageCommands.find((command) => command.name.toLowerCase() === args[0].toLowerCase()) ||
                client.MessageCommands.find((c) => c.aliases?.map((aliase) => aliase.toLowerCase()).includes(args[0].toLowerCase()));

            helpEmbed.setDescription(`Información detallada sobre **${command.name}**:`).addFields(
                {
                    name: "Nombre del Comando:",
                    value: `\`${config.Prefix}${command.name}\``,
                    inline: false,
                },
                {
                    name: "Sinónimos:",
                    value: command.aliases
                        ? command.aliases.map((aliase) => `\`${config.Prefix}${aliase}\``).join(" | ")
                        : "No hay sinónimos para este comando",
                    inline: false,
                },
                {
                    name: "Uso:",
                    value: command.usage ? config.Prefix + command.usage : "`No hay uso específico para este comando`",
                    inline: false,
                },
                {
                    name: "Descripción:",
                    value: command.description || "`No hay descripción para este comando`",
                    inline: false,
                }
            );
        } else {
            helpEmbed
                .setDescription(
                    `También puedes usar el comando \`${config.Prefix}Help CMD\` para acceder a información detallada sobre los comandos disponibles y sus funcionalidades. Bot desarrollado por <@1404572152014962708>`
                )
                .addFields(
                    {
                        name: "🎵 Comandos de Reproducción:",
                        value: playCommands.map((command) => "`" + config.Prefix + command.name + "`").join(", "),
                        inline: false,
                    },
                    {
                        name: "🎶 Comandos de Canción:",
                        value: songCommands.map((command) => "`" + config.Prefix + command.name + "`").join(", "),
                        inline: false,
                    },
                    {
                        name: "📋 Comandos de Cola:",
                        value: queueCommands.map((command) => "`" + config.Prefix + command.name + "`").join(", "),
                        inline: false,
                    },
                    {
                        name: "🔧 Comandos de Utilidades:",
                        value: utilitiesCommands.map((command) => "`" + config.Prefix + command.name + "`").join(", "),
                        inline: false,
                    }
                );
        }

        await message.reply({ embeds: [helpEmbed] });
    },
};
