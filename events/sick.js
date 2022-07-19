const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (
      message.content.includes('sick') ||
      message.content.includes('ill') ||
      message.content.includes('unwell')
    ) {
      if (message.author.bot) {
        return;
      }
      const webmdResult = await fetch(
        'https://netibotapp.herokuapp.com/webmds'
      );
      const memeFile = await webmdResult.json();
      const condition = memeFile[0].diagnosis;
      const treatment = memeFile[0].treatment;
      await message.reply(
        `Seems like you've caught a bad case of ${condition}. You should go home and ${treatment}`
      );
    }
  },
};
