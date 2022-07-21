module.exports = {
  name: 'messageCreate',
  async execute(message) {
    const wtf = message.content.toLowerCase();
    if (wtf.includes('wtf')) {
      if (message.author.bot) {
        return;
      }
      const file = 'https://tenor.com/view/wtf-is-that-confused-gif-14675917';
      console.log(file);
      await message.reply(`${file}`);
    }
  },
};
