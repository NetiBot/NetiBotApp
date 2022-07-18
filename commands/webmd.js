const { SlashCommandBuilder } = require('@discordjs/builders');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('webmd')
    .setDescription('Replies with random ailment & treatment'),
  async execute(interaction) {
    const webmdResult = await fetch('http://localhost:7890/webmds');
    const memeFile = await webmdResult.json();
    const condition = memeFile[0].Diagnosis;
    const treatment = memeFile[0].Treatment;
    await interaction.reply(
      `Seems like you've caught a bad case of ${condition}. You should go home and ${treatment}`
    );
  },
};
