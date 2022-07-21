const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lavage')
    .setDescription(
      'Lavage an amount of messages down the drain(we hope, you savage)'
    )
    .addIntegerOption((option) => {
      return option
        .setName('amount')
        .setDescription('Amount of message to delete')
        .setRequired(true);
    }),
  async execute(interaction) {
    if (!interaction.member.permissions.has('MANAGE_MESSAGES'))
      return interaction.reply({
        content:
          "You don't have `MANAGE_MESSAGES` permission to use this command!", //eslint-disable-line
      });
    if (!interaction.guild.me.permissions.has('MANAGE_MESSAGES'))
      return interaction.reply({
        content:
          "I don't have `MANAGE_MESSAGES` permission to execute this command!", //eslint-disable-line
      });

    const amount = await interaction.options.getInteger('amount');

    if (isNaN(amount) || amount < 1) {
      return interaction.reply({
        content: '**Please specify a valid amount between 1 - 100!**',
        ephemeral: true,
      });
    }

    if (parseInt(amount) > 99) {
      return interaction.reply({
        content: '**I can only delete 99 messages once!',
        ephemeral: true,
      });
    } else {
      try {
        const gif = 'https://c.tenor.com/PN9Sz1yNzNsAAAAd/nettypot.gif';
        const { size } = await interaction.channel.bulkDelete(amount);
        await interaction.reply({
          content: `All fresh and clean! (D E E P  I N H A L E) \nDeleted ${size} messages.`,
          files: [{ attachment: gif }],
        });
        setTimeout(() => interaction.deleteReply(), 14000);
      } catch (e) {
        console.log(e); //eslint-disable-line
        interaction.reply({
          content: 'I cannot delete messages that is older than 14 days.',
          ephemeral: true,
        });
      }
    }
  },
};
