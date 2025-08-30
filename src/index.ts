import { Client, GatewayIntentBits } from 'discord.js';
require('dotenv').config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('clientReady', () => {
  console.log(`Bot connecté en tant que ${client.user?.tag}`);
});

client.login(process.env.TOKEN_DISCORD);
