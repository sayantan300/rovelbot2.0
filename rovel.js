require('dotenv').config();
const { BOT_TOKEN, OWNERS, PREFIX, INVITE } = process.env;
const path = require('path');
const { Intents, MessageEmbed } = require('discord.js');
const rovelchannel = client.guilds.cache.get(process.env.SERVER_ID).channels.cache.get(process.env.LOG_CHANNEL_ID);
const Client = require('./structures/Client');
const client = new Client({
 commandPrefix: PREFIX,
 owner: OWNERS.split(','),
 invite: INVITE,
 disableMentions: 'everyone',
 ws: { intents: Intents.ALL }
});
function formatNumber(number, minimumFractionDigits = 0) {
		return Number.parseFloat(number).toLocaleString(undefined, {
			minimumFractionDigits,
			maximumFractionDigits: 2
		});
	}
client.registry
 .registerDefaultTypes()
 .registerTypesIn(path.join(__dirname, 'types'))
 .registerGroups([
		['test', 'Testing'],
		['second', 'Second category']
	])
 .registerDefaultCommands({
  help: false,
  ping: false,
  prefix: false,
  commandState: false,
  unknownCommand: false
 })
 .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
 client.logger.info(`[READY] Logged in as ${client.user.tag}! ID: ${client.user.id}`);

 const activities_list = [
  "with the R!help command.",
  "with the team console",
  "with some code",
  "with JavaScript",
  "with Discord-api",
  "Minecraft Java Edition",
  "with KALI!!!",
  "ON https://rovelstars.glitch.me",
  "with AK-47",
  "with GRENADES",
  "with ROVEL SPONSORS",
  "with ROVEL TEAM",
  "Minecraft Dungeons",
  "with eval",
  "with other bots",
  "Rubg beta",
  "with Progamer",
  "with my status"
];

 // Push client-related activities
 setInterval(() => {
  const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
  client.user.setActivity(activities_list[index] + ' | searching for '+PREFIX+' in ' + client.guilds.cache.array().length + ' servers'); // setp bot's activities to one of the phrases in the arraylist.
  fetch("https://rovelbotlist.glitch.me/ping").then(r => r.text()).then(d => console.log(d));
 }, 180000);

 
client.on('message', async message => {
 
});

client.on('guildCreate', async guild => {
 if (guild.systemChannel && guild.systemChannel.permissionsFor(client.user).has('SEND_MESSAGES')) {
  try {
   const usage = client.registry.commands.get('help').usage();
   await guild.systemChannel.send(`Hi! I'm Rovel Bot, use ${PREFIX}help to see my commands!`);
  } catch {
   // Nothing!
  }
 }

 if (rovelchannel) {
  const embed = new MessageEmbed()
   .setColor(0x7CFC00)
   .setThumbnail(guild.iconURL({ format: 'png' }))
   .setTitle(`Joined ${guild.name}!`)
   .setFooter(`ID: ${guild.id}`)
   .setTimestamp()
   .addField('❯ Members', formatNumber(guild.memberCount));
  await rovelchannel.send({ embed });
 }
});

client.on('guildDelete', async guild => {
 if (rovelchannel) {
  const embed = new MessageEmbed()
   .setColor(0xFF0000)
   .setThumbnail(guild.iconURL({ format: 'png' }))
   .setTitle(`Left ${guild.name}...`)
   .setFooter(`ID: ${guild.id}`)
   .setTimestamp()
   .addField('❯ Members', formatNumber(guild.memberCount));
  await rovelchannel.send({ embed });
 }
});


client.on('disconnect', event => {
 console.error(`[DISCONNECT] Disconnected with code ${event.code}.`);
});

client.on('error', err => console.error(err.stack));

client.on('warn', warn => console.warn(warn));

client.on('commandError', (command, err) => console.error(`[COMMAND:${command.name}]\n${err.stack}`));

client.login(BOT_TOKEN);