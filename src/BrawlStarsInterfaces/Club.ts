export interface Club {
  tag: string
  name: string
  description: string
  type: string
  badgeId: number
  requiredTrophies: number
  trophies: number
  members: Member[]
}

export interface Member {
  tag: string
  name: string
  nameColor: string
  role: string
  trophies: number
  icon: Icon
}

export interface Icon {
  id: number
}

import requestBrawlStarsApi from './Utils/requestBrawlStarsApi.js';
import encodeTag from './Utils/encodeTag.js';

/**
 * 🔍 Récupère les infos d'un club Brawl Stars via son tag
 * @param {string} tag - Le tag du club (sans le #)
 * @returns {Promise<Club>} - Le JSON de la réponse API
 */
export async function getClubData(tag: string): Promise<Club> {
  const encodedTag = encodeTag(tag);
  const url = `https://api.brawlstars.com/v1/clubs/${encodedTag}`;
  const response = await requestBrawlStarsApi(url);
  return response as Club;
}