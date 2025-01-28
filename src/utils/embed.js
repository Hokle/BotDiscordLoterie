const { EmbedBuilder } = require('discord.js');
const { lots } = require('../config/lots');
const { state } = require('./storage');

async function sendLotsEmbed(channel) {
    if (state.get('embedSent')) {
        console.log("L'embed a déjà été envoyé.");
        return;
    }

    const guildIconURL = channel.guild.iconURL({ format: 'png', dynamic: true, size: 256 });

    const embed = new EmbedBuilder()
        .setTitle('🎉 **🎰 LOTERIE DU SERVEUR 🎰** 🎉')
        .setDescription('✨ **Tente ta chance et gagne des lots incroyables !** ✨\n\nVoici les lots disponibles et leurs chances d\'obtention :')
        .setColor('#FF4500')
        .setThumbnail(guildIconURL)
        .addFields(
            lots.map(lot => ({
                name: '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬',
                value: `🎁 **${lot.name}**\n🔹 **Chance : ${lot.chance}%**`,
                inline: false,
            }))
        )
        .addFields({
            name: '\u200B',
            value: '**💡 Comment participer ?**\n\n' +
                   '➡️ **Pour obtenir 1 ticket de loterie**, invite **1 personne** sur le serveur !\n' +
                   '➡️ **Pour tenter ta chance**, utilise la commande `/loterie` et espère gagner le **GROS LOT** ! 🎰\n' +
                   '➡️ **Pour voir ton nombre de tickets**, utilise la commande `/tickets`.\n\n' +
                   '🎉 **Bonne chance à tous !** 🎉',
            inline: false,
        })
        .setFooter({ text: '🎰 Bonne chance à tous ! 🎰', iconURL: guildIconURL })
        .setTimestamp();

    await channel.send({ embeds: [embed] });

    state.set('embedSent', true);
    console.log("L'embed des lots a été envoyé.");
}

module.exports = { sendLotsEmbed };