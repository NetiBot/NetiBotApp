module.exports = {
  name: 'messageCreate',
  async execute(message) {
    const nou = message.content.toLowerCase();
    if (nou.includes('no u')) {
      if (message.author.bot) {
        return;
      }
      const file = 'https://c.tenor.com/LAcYOwpSIpcAAAAd/yugioh-no-u.gif';
      console.log(file);
      await message.reply(`${file}`);
    }
  },
};
