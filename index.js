const { Client, GatewayIntentBits, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('./config.json');
const chalk = require('chalk');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');
const rest = new REST({ version: '9' }).setToken(config.token);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: ["CHANNEL", "ROLE", "USER"]
});

client.on('ready', async (client) => {
  new SlashCommandBuilder()
  .setName("active")
  .setDescription("get the developer badge")

  const data = [{ "name": "active", "description": "get the developer badge" }]
  
  await rest.put(
    Routes.applicationGuildCommands(client.user.id, config.guildId),
    { body: data }
  )
    
  console.log(
    chalk.green("[CLIENT]") +
    chalk.blue(":"),
    chalk.red(`Ready`),
    chalk.yellow("|"),
    chalk.black(client.user.id)
  )
});

client.on('messageCreate', (message) => {
  //check if message author is a bot if its an bot return nothing
  if (message.author.bot) return;
  //check if message is sent in a guild if not return nothing
  if(!message.guild) return;
  //check the content of the message
  if (message.content == "-active") {
    const embed = new EmbedBuilder()
      .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ size: 512 }) })
      .setDescription(`https://support-dev.discord.com/hc/en-us/articles/10113997751447-Active-Developer-Badge`)
      .setTimestamp()
      .setColor("Green")
    message.channel.send({ embeds: [embed] })
  }
});

client.on("interactionCreate", (i) => {
  //check interaction name
  if(i.commandName === "active") {
    const embed = new EmbedBuilder().setDescription(`Zoozzooo`).setColor("Red")
    i.reply({ embeds: [embed] })
  }
});

client.login(config.token);