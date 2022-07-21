module.exports = {
  name: 'messageCreate',
  async execute(message) {
    const lol = message.content.toLowerCase();
    if (lol.includes('lol')) {
      if (message.author.bot) {
        return;
      }
      const file = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
      await message.reply(`${file}`);
    }
  },
};
