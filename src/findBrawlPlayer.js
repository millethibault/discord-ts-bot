"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//require('./BrawlStarsInterfaces/index');
const brawl_stars_api_1 = __importDefault(require("./BrawlStarsInterfaces/brawl-stars-api"));
brawl_stars_api_1.default.getPlayerBattleLog('88RUVULY')
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
//# sourceMappingURL=findBrawlPlayer.js.map