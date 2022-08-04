module.exports = {
  name: 'messageCreate',
  async execute(message) {
    const tired = message.content.toLowerCase();
    if (tired.includes('tired')) {
      await message.reply({ content:'You made it to a bonfire, take a rest.', files: ['./public/rest_tarnished.mp4'] });
    }
  },
};
