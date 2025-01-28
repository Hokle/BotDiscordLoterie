const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { handleTicketsCommand } = require('./tickets');
const { handleAddTicketsCommand } = require('./addTickets');
const { handleLoterieCommand } = require('./loterie');

const commands = [
    new SlashCommandBuilder()
        .setName('tickets')
        .setDescription('Voir le nombre de tickets d\'un utilisateur.')
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription('L\'utilisateur dont tu veux voir les tickets.')
                .setRequired(false)
        ),
    new SlashCommandBuilder()
        .setName('addtickets')
        .setDescription('Ajouter des tickets à un utilisateur.')
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription('L\'utilisateur à qui ajouter des tickets.')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('nombre')
                .setDescription('Le nombre de tickets à ajouter.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    new SlashCommandBuilder()
        .setName('loterie')
        .setDescription('Participe à la loterie en utilisant un ticket.')
];

function setupCommands(client) {
    const activeInteractions = new Set();

    client.once('ready', async () => {
        try {
            await client.application.commands.set(commands);
            console.log('Commandes enregistrées avec succès.');
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement des commandes:', error);
        }
    });

    client.on('interactionCreate', async interaction => {
        console.log(`Interaction créée: ${interaction.id}`);

        if (!interaction.isCommand()) return;

        const { commandName, channel } = interaction;
        const interactionId = interaction.id;

        if (activeInteractions.has(interactionId)) {
            console.log(`Interaction déjà en cours: ${interactionId}`); 
            return;
        }

        activeInteractions.add(interactionId);

        try {
            if (channel.name !== '🎰lotterie🎰') {
                await interaction.reply({
                    content: "🚫 Cette commande ne peut être utilisée que dans le salon 🎰lotterie🎰.",
                    flags: "Ephemeral"
                });
                return;
            }

            switch (commandName) {
                case 'tickets':
                    await handleTicketsCommand(interaction);
                    break;
                case 'addtickets':
                    await handleAddTicketsCommand(interaction);
                    break;
                case 'loterie':
                    await handleLoterieCommand(interaction);
                    break;
            }
        } catch (error) {
            console.error(`Erreur lors de l'exécution de la commande ${commandName}:`, error);
        } finally {
            activeInteractions.delete(interactionId);
            console.log(`Interaction terminée: ${interactionId}`); 
        }
    });
}

module.exports = { setupCommands };