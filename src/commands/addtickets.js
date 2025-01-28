const { PermissionFlagsBits } = require('discord.js');
const { tickets } = require('../utils/storage');

async function handleAddTicketsCommand(interaction) {
    try {
        if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
            await interaction.reply({
                content: "🚫 Tu n'as pas la permission d'utiliser cette commande.",
                flags: "Ephemeral"
            });
            return;
        }

        const member = interaction.options.getUser('utilisateur');
        const amount = interaction.options.getInteger('nombre');
        const currentTickets = tickets.get(member.id) || 0;

        tickets.set(member.id, currentTickets + amount);

        await interaction.reply({
            content: `✅ ${amount} tickets ajoutés pour ${member.username} !`,
            flags: "Ephemeral"
        });
    } catch (error) {
        if (error.code === 10062) {
            console.log('Interaction expirée, ignorée');
        } else {
            console.error('Erreur lors de la réponse à la commande addtickets:', error);
        }
    }
}

module.exports = { handleAddTicketsCommand };