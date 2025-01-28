const { tickets, usedInvites } = require('../utils/storage');

function setupInviteTracking(client) {
    client.invites = {};

    client.on('ready', () => {
        client.guilds.cache.each(guild => {
            guild.invites.fetch().then(guildInvites => {
                guildInvites.each(invite => {
                    client.invites[invite.code] = invite.uses;
                });
            });
        });
    });

    client.on('inviteCreate', (invite) => {
        client.invites[invite.code] = invite.uses;
    });

    client.on('guildMemberAdd', async (member) => {
        const guild = member.guild;
        const userId = member.id;

        if (usedInvites.get(userId)) {
            console.log(`${member.user.tag} a déjà rejoint le serveur auparavant. Aucun ticket attribué.`);
            return;
        }

        try {
            const newInvites = await guild.invites.fetch();
            const oldInvites = client.invites;

            const usedInvite = newInvites.find(
                (invite) => oldInvites[invite.code] && oldInvites[invite.code] < invite.uses
            );

            if (usedInvite) {
                const inviterId = usedInvite.inviter.id;
                const currentTickets = tickets.get(inviterId) || 0;
                
                tickets.set(inviterId, currentTickets + 1);
                usedInvites.set(userId, true);

                console.log(`1 ticket attribué à ${usedInvite.inviter.tag}.`);
            }

            newInvites.each(invite => {
                client.invites[invite.code] = invite.uses;
            });
        } catch (error) {
            console.error(`Erreur lors de la gestion des invitations pour ${member.user.tag}:`, error);
        }
    });
}

module.exports = { setupInviteTracking };