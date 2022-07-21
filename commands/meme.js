const { SlashCommandBuilder } = require('@discordjs/builders');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Replies with dank meme!'),
  async execute(interaction) {
    const memeResult = await fetch(
      'https://meme-api.herokuapp.com/gimme/wholesomememes'
    );
    const memeFile = await memeResult.json();
    const file = memeFile.url;
    await interaction.reply({
      files: [{ attachment: file }],
    });
  },
};
