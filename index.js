const { Client, GatewayIntentBits } = require("discord.js");
const { REST, Routes } = require("discord.js");

const config = require("./config.json");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const rest = new REST({ version: "10" }).setToken(config.BOT_TOKEN);

const commands = [
  {
    name: "describe",
    description: "Gives info about Arindam",
  },
];

client.on("messageCreate", function (message) {
  if (message.author.bot) return;
  message.reply({ content: "Hello From Bot" });
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "describe") {
    await interaction.reply("Arindam is a Technical Writer");
  }
});

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(config.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

client.login(config.BOT_TOKEN);
