const { setupInviteTracking } = require('./invite');
const { setupReadyEvent } = require('./ready');

function setupEvents(client) {
    setupReadyEvent(client);
    setupInviteTracking(client);
}

module.exports = { setupEvents };