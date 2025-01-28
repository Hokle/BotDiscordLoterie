const { sendLotsEmbed } = require('../utils/embed');

async function setupReadyEvent(client) {
    client.once('ready', async () => {
        console.log('Bot connecté et opérationnel !');

        const guild = client.guilds.cache.get(process.env.GUILD_ID);

        if (guild) {
            console.log(`Commandes synchronisées pour le serveur : ${guild.name}`);

            const loterieChannel = guild.channels.cache.find(ch => ch.name === '🎰lotterie🎰');
            if (loterieChannel) {
                await sendLotsEmbed(loterieChannel);
            } else {
                console.log("Le salon '🎰lotterie🎰' n'existe pas.");
            }
        }
    });
}

module.exports = { setupReadyEvent };