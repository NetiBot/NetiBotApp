const { SlashCommandBuilder } = require('@discordjs/builders');

const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('webmd')
    .setDescription('Replies with random ailment & treatment'),
  async execute(interaction) {
    const webmdResult = await fetch('https://netibotapp.herokuapp.com/webmds');
    const memeFile = await webmdResult.json();
    const condition = memeFile.Diagnosis;
    const treatment = memeFile.Treatment;
    console.log('condition, treatment', condition, treatment);
    await interaction.reply(
      `Seems like you've caught a bad case of ${condition}. You should go home and ${treatment}`
    );
  },
};
