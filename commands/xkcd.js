const { SlashCommandBuilder } = require('@discordjs/builders');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('xkcd')
    .setDescription('Replies with a random XKCD comic!'),
  async execute(interaction) {
    const random = Math.floor(Math.random() * 2654);
    const comicResult = await fetch(
      `https://xkcd.com/${random}/info.0.json`
    );
    const comicFile = await comicResult.json();
    const file = comicFile.img;
    await interaction.reply({
      files: [{ attachment: file }],
    });
  },
};
