const { tickets } = require('../utils/storage');

async function handleTicketsCommand(interaction) {
    try {
        const targetUser = interaction.options.getUser('utilisateur') || interaction.user;
        const userTickets = tickets.get(targetUser.id) || 0;

        await interaction.reply({
            content: `🦀 ${targetUser.username} a **${userTickets} tickets de crabe** !`,
            flags: "Ephemeral"
        });
    } catch (error) {
        if (error.code !== 10062) { 
            console.error('Erreur lors de la commande tickets:', error);
        }
    }
}

module.exports = { handleTicketsCommand };