import { client } from '../client';

client.once('clientReady', async () => {
  if (!client.user) return;
  console.log(`✅ Connecté en tant que ${client.user.tag}`);
  client.user.setPresence({
    activities: [{ name: 'Bot is online ! /set profile', type: 4 }], // type 0 = Playing
    status: 'online',
  });
});