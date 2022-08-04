const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('apod')
    .setDescription('Replies with NASA astronomy picture of the day!'),
  async execute(interaction) {
    const memeResult = await fetch(
      'https://api.nasa.gov/planetary/apod?api_key=hvp8xA8D1KQd5BfN93bUhOT8mjmM0q7pRwBiItaG'
    );
    const file = await memeResult.json();
    const embed = new MessageEmbed()
      .setColor('#A62639')
      .setTitle('NASA Picture of the Day')
      .setImage(`${file.url}`)
      .addFields({ 
        name: 'Name', 
        value: `${file.copyright}` 
      }, { 
        name: 'Date', 
        value: `${file.date}` 
      }, { 
        name: 'Description', 
        value: `${file.explanation}` 
      },);
    await interaction.reply({
      embeds: [embed],
    });
  },
};
