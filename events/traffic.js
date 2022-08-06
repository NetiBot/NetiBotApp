module.exports = {
  name: 'messageCreate',
  async execute(message) {
    const sad = message.content.toLowerCase();
    if (sad.includes('traffic')) {
      if (message.author.bot) {
        return;
      }
      const file = 'https://youtu.be/DJsn1QivbKM';
      await message.reply(`${file}`);
    }
  },
};
