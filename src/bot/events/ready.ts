import { client } from '../client';
import { loadPrefixes, hasPrefix } from '../../database/prefix';

client.once('clientReady', async () => {
  if (!client.user) return;
  console.log(`✅ Connecté en tant que ${client.user.tag}`);

  await loadPrefixes();

  for (const guild of client.guilds.cache.values()) {
    if (!hasPrefix(guild.id)) {
      //console.log(`🔧 Aucun préfixe pour ${guild.name}, utilisation de '!'`);
    }
  }

  console.log('📦 Préfixes chargés');
});
