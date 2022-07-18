module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.content.includes('sad')) {
      if (message.author.bot) {
        return;
      }
      const file = 'https://www.youtube.com/watch?v=1q6Swwvp5qk';
      console.log(file);
      await message.reply(`You said "sad"\n ${file}`);
    }
  },
};
