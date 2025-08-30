import { PlayerRanking } from '../interfaces/brawlStarsInterfaces/rankedPlayer.js';
import requestBrawlStarsApi from './Utils/requestBrawlStarsApi.js';

/**
 * 🔍 Récupère le classement des joueurs d'un pays via son code
 * @param {string} [countryCode='global'] - Le code du pays, optionnel
 * @param {int} [limit='200'] - Le nombre de joueurs, optionnel
 * @returns {Promise<PlayerRanking>} - Le JSON de la réponse API
 */
export async function getPlayersRankings(countryCode='global', limit=200): Promise<PlayerRanking> {
  const url = `https://api.brawlstars.com/v1/rankings/${countryCode}/players?limit=${limit}`;
  const response = await requestBrawlStarsApi(url);
  for (const player of response.items) {
    if(player.trophies == 1) player.trophies = "Plus de 100 000";
  }
  return response.items as PlayerRanking;
}