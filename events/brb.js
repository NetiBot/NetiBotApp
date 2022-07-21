module.exports = {
  name: 'messageCreate',
  async execute(message) {
    const brb = message.content.toLowerCase();
    if (brb.includes('brb')) {
      if (message.author.bot) {
        return;
      }
      const file = 'https://c.tenor.com/0VdgapmbJHsAAAAC/sonic-im-waiting.gif';
      const hold = 'https://youtu.be/xNjyG8S4_kI';
      await message.reply(`${file}\n ${hold}`);
    }
  },
};
