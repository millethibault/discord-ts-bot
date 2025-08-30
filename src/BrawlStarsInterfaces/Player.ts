import { Player } from '../interfaces/brawlStarsInterfaces/player.js';

import requestBrawlStarsApi from './Utils/requestBrawlStarsApi.js';
import { encodeTag } from './Utils/tag.js';

/**
 * 🔍 Récupère les infos d'un joueur Brawl Stars via son tag
 * @param {string} tag - Le tag du joueur (sans le #)
 * @returns {Promise<Player>} - Le JSON de la réponse API
 */
export async function getPlayerData(tag: string): Promise<Player> {
  const encodedTag = encodeTag(tag);
  const url = `https://api.brawlstars.com/v1/players/${encodedTag}`;
  const response = await requestBrawlStarsApi(url);
  return response as Player;
}
