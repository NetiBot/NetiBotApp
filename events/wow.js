const { MessageAttachment } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    if (message.content.includes('wow')) {
      if (message.author.bot) {
        return;
      }
      db.add('times.wow', 1);
      const timesUsed = await db.get('times.wow');

      const memeResult = await fetch(
        'https://owen-wilson-wow-api.herokuapp.com/wows/random'
      );
      const memeFile = await memeResult.json();
      const file = memeFile[0].video['1080p'];
      const attachment = new MessageAttachment(file);
      await message.reply({
        content: `You said wow,\nNetiBot has seen wow ${timesUsed} times since July 14th, 2022
      `,
        files: [attachment],
      });
    }
  },
};
