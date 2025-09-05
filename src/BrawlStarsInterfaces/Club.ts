import { Club } from '../interfaces/brawlStarsInterfaces/club';

import requestBrawlStarsApi from './Utils/requestBrawlStarsApi.js';
import { encodeTag } from './Utils/tag';

/**
 * 🔍 Récupère les infos d'un club Brawl Stars via son tag
 * @param {string} tag - Le tag du club (sans le #)
 * @returns {Promise<Club>} - Le JSON de la réponse API
 */
export async function getClubData(tag: string): Promise<Club | null> {
  const encodedTag = encodeTag(tag);
  const url = `https://api.brawlstars.com/v1/clubs/${encodedTag}`;
  return await requestBrawlStarsApi(url)
  .then(club => club as Club)
  .catch(() => null)
}