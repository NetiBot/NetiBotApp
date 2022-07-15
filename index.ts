import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import { request } from 'undici';
dotenv.config();

const body  = await request('http://localhost:7890/webmds');
console.log(body);

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
  ]
});

client.on('ready', () => {
  console.log('Ready!');
});

client.on('messageCreate', (message) => {
  if (message.content.includes ('ping')) {
    message.reply({
      content: `${body}`,
    });
  }});

client.login(process.env.TOKEN);