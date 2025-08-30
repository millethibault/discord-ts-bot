import { Brawlers } from '../interfaces/brawlStarsInterfaces/brawler';

import requestBrawlStarsApi from './Utils/requestBrawlStarsApi';

/**
 * 🔍 Récupère la liste des brawlers du jeu
 * @returns {Promise<Brawlers>} - Le JSON de la réponse API
 */
export async function getBrawlers(): Promise<Brawlers> {
  const url = `https://api.brawlstars.com/v1/brawlers`;
  const response = await requestBrawlStarsApi(url);
  return response.items as Brawlers;
}