module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.content.includes('birthday')) {
      if (message.author.bot) {
        return;
      }
      const file = 'https://youtu.be/vdVnnMOTe3Q';
      const birthday = 'https://c.tenor.com/LSgWvTFLZ64AAAAC/birthday-cake-its-your-birthday.gif';
      console.log(file);
      await message.reply(`${birthday}\n ${file}`);
    }
  },
};
