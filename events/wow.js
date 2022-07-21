const { MessageAttachment } = require('discord.js');
const db = require('../lib/models/index.js');
const WowCount = db.wowcount;
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const mongoose = require('mongoose');


module.exports = {
  name: 'messageCreate',
  async execute(message) {
    const wow = message.content.toLowerCase();
    if (wow.includes('wow')) {
      if (message.author.bot) {
        return;
      }
      await mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true });
      await WowCount.findOneAndUpdate({ _id: 1 }, { $inc: { count: 1 } });
      const timesUsed = await db.wowcount.findOne({ _id: 1 });
      const count = timesUsed.count;

      const memeResult = await fetch(
        'https://owen-wilson-wow-api.herokuapp.com/wows/random'
      );
      const memeFile = await memeResult.json();
      const file = memeFile[0].video['1080p'];
      const attachment = new MessageAttachment(file);
      await message.reply({
        content: `You said wow,\nNetiBot has seen wow ${count} times since July 14th, 2022
      `,
        files: [attachment],
      });
    }
  },
};
