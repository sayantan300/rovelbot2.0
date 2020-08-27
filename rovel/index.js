//requiring

const { CommandoClient } = require('discord.js-commando');
var urlencode = require('urlencode');
const getArtistTitle = require('get-artist-title');
var kitsu = require('node-kitsu');
const gifs = require("gif-search");
var Filter = require('bad-words'),
 filter = new Filter();
var swearWords = filter.list;
const hastebin = require("hastebin.js");
const bin = new hastebin();
var rovelos = require('shelljs');
var shortUrl = require('node-url-shortener');
let alexa = require('alexa-bot-api');
let ai = new alexa(process.env.CHAT_TOKEN || "aw2plm");
const Minesweeper = require('discord.js-minesweeper');
const deepai = require('deepai');
deepai.setApiKey(process.env.DEEPAI_TOKEN);
const axios = require('axios');
const cheerio = require('cheerio');
const translate = require('translatte');
const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_LINK });
const PastebinAPI = require('pastebin-js'),
 const path = require('path');
var figlet = require('figlet');
const querystring = require('querystring');
const mcData = require("minecraft-data")("1.16.1");
const Discord = require("discord.js");
var utf8 = require("utf8");
const fs = require("fs");
const ytdl = require('ytdl-core');
const fetch = require("node-fetch");
const https = require('https');
const base64 = require("base-64");
const client = new Discord.Client();
const os = require("os");

//getting all responses
const { activities_list } = require('./activities.json')
//starting

const client = new CommandoClient({
 commandPrefix: process.env.PREFIX,
 owner: process.env.OWNER,
 invite: process.env.SUPPORT_SERVER,
});
client.registry
 .registerDefaultTypes()
 .registerGroups([
		['test', 'Testing Commands group'],
	])
 .registerDefaultGroups()
 .registerDefaultCommands()
 .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
 console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
 setInterval(() => {
  const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
  client.user.setActivity(activities_list[index] + ` | looking for ${process.env.PREFIX} in ` + client.guilds.cache.array().length + ' servers'); // setp bot's activities to one of the phrases in the arraylist.
 }, 20000);
});

client.on('error', console.error);

client.login(process.env.BOT_TOKEN);