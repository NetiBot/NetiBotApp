// const { Client, Intents, MessageEmbed } = require('discord.js');
// // import dotenv from 'dotenv';
const dotenv = require('dotenv');

// const { request } = require('undici');
dotenv.config();

// // const body = request('http://localhost:7890/webmds');
// // console.log(body);

// const client = new Client({
//   intents: [
//     Intents.FLAGS.GUILDS,
//     Intents.FLAGS.GUILD_MESSAGES,
//   ]
// });

// // client.on('ready', () => {
// //   console.log('Ready!');
// // });


// // client.login(process.env.TOKEN);

// // const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// client.once('ready', () => {
//   console.log('Ready!');
// });

// client.on('interactionCreate', async interaction => {
//   if (!interaction.isCommand()) return;

//   const { commandName } = interaction;
//   await interaction.deferReply();
//   {
//     // ...
//     if (commandName === 'cat') {
//       const catResult = await request('https://meme-api.herokuapp.com/gimme');
//       console.log(catResult);
//       const { file } = await getJSONResponse(catResult.body);
//       interaction.editReply({ files: [file] });
//     }}
// });

// // client.on('messageCreate', (message) => {
// //   if (message.content.includes ('ping')) {
// //     message.reply({
// //       content: 'pong',
// //     });
// //   }});


// async function getJSONResponse(body) {
//   let fullBody = '';

//   for await (const data of body) {
//     fullBody += data.toString();
//   }

//   return JSON.parse(fullBody);
// }


// client.login(process.env.TOKEN);
const { Client, Intents, MessageEmbed } = require('discord.js');
const request = require('undici');

const client = new Client({ intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_WEBHOOKS
] });

const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);

async function getJSONResponse(body) {
  let fullBody = '';

  for await (const data of body) {
    fullBody += data.toString();
  }
  return JSON.parse(fullBody);
}

client.once('ready', () => {
  console.log('Ready!');
});
client.on('messageCreate', (message) => {
  if (message.content.includes ('ping')) {
    console.log('Im doing something');
    message.reply({
      content: 'pong',
    });
  }});
// client.on('messageCreate', async (message) => {
//   if (message.content.includes ('ping')) {
//     const memeResult = await request('https://meme-api.herokuapp.com/gimme');
//     const { file } = await getJSONResponse(memeResult.body);
//     message.reply({

//       files: [{ attachment: file, name: 'meme.png' }]
//     });
//   }});

console.log('something before');
client.on('interactionCreate', async (interaction) => {
  console.log('something');
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  await interaction.deferReply();
  else if (commandName === 'cat') {
    const memeResult = await request('https://meme-api.herokuapp.com/gimme');
    console.log(memeResult);
    const { file } = await getJSONResponse(memeResult.body);
    interaction.reply({ files: [{ attachment: file, name: 'meme.png' }] });
  } else if (commandName === 'urban') {
    const term = interaction.options.getString('term');
    const query = new URLSearchParams({ term });

    const dictResult = await request(`https://api.urbandictionary.com/v0/define?${query}`);
    console.log(dictResult);
    const { list } = await getJSONResponse(dictResult.body);

    if (!list.length) {
      return interaction.editReply(`No results found for **${term}**.`);
    }

    const [answer] = list;

    const embed = new MessageEmbed()
      .setColor('#EFFF00')
      .setTitle(answer.word)
      .setURL(answer.permalink)
      .addFields(
        { name: 'Definition', value: trim(answer.definition, 1024) },
        { name: 'Example', value: trim(answer.example, 1024) },
        {
          name: 'Rating',
          value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`,
        },
      );
    interaction.editReply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
