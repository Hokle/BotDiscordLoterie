require('dotenv').config();
const { Client } = require('discord.js');
const { setupCommands } = require('./commands');
const { setupEvents } = require('./events');
const { intents } = require('./config/intents');

const client = new Client({ intents });

client.on('error', error => {
    console.error('Erreur Discord :', error);
});

client.on('disconnect', () => {
    console.log('Bot déconnecté, tentative de reconnexion...');
});

client.on('reconnecting', () => {
    console.log('Tentative de reconnexion en cours...');
});

console.log('Initialisation des commandes...'); 
setupCommands(client);
setupEvents(client);

client.login(process.env.DISCORD_TOKEN).catch(error => {
    console.error('Erreur de connexion :', error);
    if (error.code === 'TokenInvalid') {
        console.error('Le token Discord est invalide. Veuillez vérifier votre fichier .env');
    }
});