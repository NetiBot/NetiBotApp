const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('weather')
    .setDescription('Replies with the current weather given a zipcode')
    .addStringOption(option =>
      option
        .setName('query')
        .setDescription('The input to echo back')
        .setRequired(true)),
  async execute(interaction) {
    const location = await fetch(`http://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${process.env.API_KEY}&q=${interaction.options.getString('query')}`);
    const locationKey = await location.json();
    const forecast = await fetch(
      `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey[0].Key}?apikey=${process.env.API_KEY}`
    );
    const weatherResponse = await forecast.json();
    const file = weatherResponse[0];
    const embed = new MessageEmbed()
      .setColor('#A62639')
      .setTitle('Weather')
      .setURL(file.permalink)
      .addFields({ 
        name: 'Description', 
        value: `${file.IconPhrase}`
      }, { 
        name: 'Temperature', 
        value: `${file.Temperature.Value}°F` 
      }, {
        name: 'Precipitation',
        value: `${file.PrecipitationProbability}%`
      });
    await interaction.reply({
      embeds: [embed],
    });
  },
};
