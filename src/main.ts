// index.js
import { Client, GatewayIntentBits, Message } from 'discord.js';
require('dotenv').config();
const TOKEN = process.env.TOKEN_DISCORD;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

import connectionPromise from './db';
const serverPrefixes = new Map<string, string>();

interface ServerPrefixRow {
  serverId: string;
  prefix: string;
}
// Connexion à MySQL
async function loadPrefixes() {
    const pool = await connectionPromise;
    const [rows] = await pool.execute('SELECT * FROM prefix') as [ServerPrefixRow[], any];
    for(const row of rows) {
      serverPrefixes.set(row.serverId, row.prefix);
    }
}


client.once('clientReady', async () => {
  if (!client.user) return;
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
  
  await loadPrefixes();

  // Associer le préfixe à chaque serveur
  for(const guild of client.guilds.cache){
    if (!serverPrefixes.has(guild[1].id)) {
      serverPrefixes.set(guild[1].id, '!');
    }
  }

  console.log('📦 Préfixes chargés :', serverPrefixes);
});

client.on('messageCreate', async message => {
        if (message.author.bot || !client.user || !message.guild) return;

  // Vérifie si le message est exactement la mention du bot
  if (message.content.trim() === `<@${client.user.id}>` || message.content.trim() === `<@!${client.user.id}>`) {
    const prefix = serverPrefixes.get(message.guild.id) || '!';
    return message.channel.send(`🔧 Le préfixe sur ce serveur est : \`${prefix}\``);
  }
  const prefix = serverPrefixes.get(message.guild.id) || '!';
  if (message.content.startsWith(prefix + 'hello')) {
    message.channel.send(`Hello from ${message.guild.name} 👋`);
  };

  if (message.content.startsWith(prefix + 'setprefix')) {
    const args = message.content.split(' ');
    const newPrefix = args[1];
    if(!newPrefix) return;

    // Met à jour la base
    const pool = await connectionPromise;
    await pool.execute(
        'REPLACE INTO prefix (serverId, prefix) VALUES (?, ?)',
        [message.guild.id, newPrefix]
    );

    serverPrefixes.set(message.guild.id, newPrefix);
    message.channel.send(`✅ Préfixe mis à jour : \`${newPrefix}\``);
    }
});

client.login(TOKEN);
