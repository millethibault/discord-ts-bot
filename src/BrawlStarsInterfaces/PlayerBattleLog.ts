import requestBrawlStarsApi from './Utils/requestBrawlStarsApi.js';
import { encodeTag } from './Utils/tag.js';
import parseBattleLog from './Utils/parseBattleLog.js';

import { BattleLogHistory } from '../interfaces/brawlStarsInterfaces/battleLog.js';

/**
 * 🔍 Récupère l'historique d'un joueur Brawl Stars via son tag
 * @param {string} tag - Le tag du joueur (sans le #)
 * @returns {Promise<BattleLogHistory>} - Le JSON de la réponse API
 */
export async function getPlayerBattleLog(tag: string): Promise<BattleLogHistory> {
  const encodedTag = encodeTag(tag);
  const url = `https://api.brawlstars.com/v1/players/${encodedTag}/battlelog`;
  const response = await requestBrawlStarsApi(url);
  return parseBattleLog(response.items) as BattleLogHistory;
}