module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.content.includes('No U')) {
      if (message.author.bot) {
        return;
      }
      const file = 'https://c.tenor.com/LAcYOwpSIpcAAAAd/yugioh-no-u.gif';
      console.log(file);
      await message.reply(`${file}`);
    }
  },
};
