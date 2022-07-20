const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lavage')
    .setDescription('Lavage an amount of messages down the drain(we hope, you savage)') 
    .addIntegerOption((option) => { 
      return option
        .setName('amount') 
        .setDescription('Amount of message to delete') 
        .setRequired(true); 
    }),
  async execute(interaction) {
    if(!interaction.member.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'You don\'t have `MANAGE_MESSAGES` permission to use this command!' }); 
    if(!interaction.guild.me.permissions.has('MANAGE_MESSAGES')) return interaction.reply({ content: 'I don\'t have `MANAGE_MESSAGES` permission to execute this command!' }); 

    const amount = interaction.options.getInteger('amount'); 

    if(isNaN(amount) || amount < 1) { 
      return interaction.reply({ content: '**Please specify a valid amount between 1 - 100!**', ephemeral: true });
    }

    if(parseInt(amount) > 99) { 
      return interaction.reply({ content: '**I can only delete 99 messages once!', ephemeral: true });
    } else {
      try{
        const gif = 'https://c.tenor.com/PN9Sz1yNzNsAAAAd/nettypot.gif';
        const { size } = await interaction.channel.bulkDelete(amount); 
        await interaction.reply({ content: `Deleted ${size} messages.` });
        await interaction.followUp({ 
          content: 'All fresh and clean! (D E E P  I N H A L E)', 
          files: [{ attachment: gif }] });
      } catch(e) { 
        console.log(e);
        interaction.reply({ content: 'I cannot delete messages that is older than 14 days.', ephemeral: true });
      }
    }
  }
};
