module.exports = {
  name: 'messageCreate',
  async execute(message) {
    const bday = message.content.toLowerCase();
    if (bday.includes('birthday') || bday.includes('bday')) {
      if (message.author.bot) {
        return;
      }
      const file = 'https://youtu.be/vdVnnMOTe3Q';
      const birthday =
        'https://c.tenor.com/LSgWvTFLZ64AAAAC/birthday-cake-its-your-birthday.gif';
      await message.reply(`${birthday}\n ${file}`);
    }
  },
};
