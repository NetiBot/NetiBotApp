const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('urban')
    .setDescription('Replies with urban dictionary definition!')
    .addStringOption(option =>
      option
        .setName('query')
        .setDescription('The input to echo back')
        .setRequired(true)),
  async execute(interaction) {
    const queryResult = await fetch(
      `https://api.urbandictionary.com/v0/define?term=${interaction.options.getString('query')}`
    );
    const urbanResponse = await queryResult.json();
    const file = urbanResponse.list[0];
    const embed = new MessageEmbed()
      .setColor('#A62639')
      .setTitle(`${file.word}`)
      .setURL(file.permalink)
      .addFields({ name: 'Definition', value: `${file.definition}` }, { name: 'Example', value: `${file.example}` }, { name: 'Rating', value: `${file.thumbs_up} thumbs up. ${file.thumbs_down} thumbs down.` });
    await interaction.reply({
      embeds: [embed],
    });
  },
};
  
