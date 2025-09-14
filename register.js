const Discord = require("discord.js");
const fs = require("node:fs");
const config = require("./config.json");

// Load environment variables for Discord credentials
const discordConfig = {
    ...config,
    Token: process.env.DISCORD_BOT_TOKEN || config.Token,
    ClientID: process.env.DISCORD_CLIENT_ID || config.ClientID
};
const commands = [];

const commandFiles = fs.readdirSync(`./commands/interactions`).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/interactions/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new Discord.REST({ version: "10" }).setToken(discordConfig.Token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(Discord.Routes.applicationCommands(discordConfig.ClientID), { body: commands });

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();
