const { SlashCommandBuilder } = require('@discordjs/builders');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nobel')
    .setDescription('Replies with a random nobel prize winner!'),
  async execute(interaction) {
    const nobel = Math.floor(Math.random() * 923);
    const nobelResult = await fetch(
      `https://api.nobelprize.org/2.1/laureate/${nobel}`
    );
    const file = await nobelResult.json();
    const result = file[0];
    const name = result.knownName["en"]; //eslint-disable-line
    const query = name.replaceAll(' ', '_');
    await interaction.reply(`https://en.wikipedia.org/wiki/${query}`);
  },
};
