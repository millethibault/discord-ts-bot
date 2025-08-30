//require('./BrawlStarsInterfaces/index');
import bsapi from './BrawlStarsInterfaces/brawl-stars-api';
bsapi.getPlayerData('88RUVULY')
  .then(player => console.log(JSON.stringify(player, null, 2)))
  .catch(err => console.error(err));

/*import fs from 'fs/promises';

bsapi.getEvents()
  .then(async events => {
    const jsonContent = JSON.stringify(events, null, 2);
    await fs.writeFile('player.json', jsonContent, 'utf8');
    console.log('✅ Fichier player.json téléchargé avec succès.');
  })
  .catch(err => console.error('❌ Erreur lors de la récupération du joueur :', err));*/