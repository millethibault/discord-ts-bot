import { ClubRanking } from '../interfaces/brawlStarsInterfaces/clubRanking.js';

import requestBrawlStarsApi from './Utils/requestBrawlStarsApi.js';

/**
 * 🔍 Récupère le classement des clubs d'un pays via son code
 * @param {string} [countryCode='global'] - Le code du pays, optionnel
 * @param {int} [limit='200'] - Le nombre de clubs, optionnel
 * @returns {Promise<ClubRanking>} - Le JSON de la réponse API
 */
export async function getClubRankings(countryCode='global', limit=200): Promise<ClubRanking> {
  const url = `https://api.brawlstars.com/v1/rankings/${countryCode}/clubs?limit=${limit}`;
  const response = await requestBrawlStarsApi(url);
  return response.items as ClubRanking;
}