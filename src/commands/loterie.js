const { EmbedBuilder } = require('discord.js');
const { tickets } = require('../utils/storage');
const { choisirLot } = require('../utils/loterie');

async function handleLoterieCommand(interaction) {
    try {
        const userId = interaction.user.id;
        const userTickets = tickets.get(userId) || 0;

        if (userTickets < 1) {
            await interaction.reply({
                content: "🚫 Tu n'as pas assez de tickets pour participer à la loterie.",
                flags: "Ephemeral"
            });
            return;
        }

        tickets.set(userId, userTickets - 1);
        const lotGagnant = choisirLot();

        let message = `Tu as gagné : **${lotGagnant.name}** !`;

        console.log(`L'utilisateur ${userId} a gagné : ${lotGagnant.name}`);

        if (lotGagnant.special) {
            message += "\n\n🎉 **Félicitations !** 🎉\nPour réclamer ton lot, envoie un message à <@396967815673806849> avec la preuve de ton gain.";
        }

        if (lotGagnant.name === "🎁 Gain de 2 tickets") {
            tickets.set(userId, (tickets.get(userId) || 0) + 2);
            message += "\n\n➕ **2 tickets supplémentaires** ont été ajoutés à ton compte !";
        }

        const embed = new EmbedBuilder()
            .setTitle('🎉 Félicitations ! 🎉')
            .setDescription(message)
            .setColor('#00FF00');

        await interaction.reply({ embeds: [embed] });
    } catch (error) {
        if (error.code === 10062) {
            console.log('Interaction expirée, ignorée');
        } else {
            console.error('Erreur lors de la réponse à la commande loterie:', error);
        }
    }
}

module.exports = { handleLoterieCommand };