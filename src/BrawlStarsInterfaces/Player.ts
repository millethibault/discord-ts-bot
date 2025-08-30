export interface Player {
  tag: string
  name: string
  nameColor: string
  icon: Icon
  trophies: number
  highestTrophies: number
  expLevel: number
  expPoints: number
  isQualifiedFromChampionshipChallenge: boolean
  "3vs3Victories": number
  soloVictories: number
  duoVictories: number
  bestRoboRumbleTime: number
  bestTimeAsBigBrawler: number
  club: Club
  brawlers: Brawler[]
}

export interface Icon {
  id: number
}

export interface Club {
  tag: string
  name: string
}

export interface Brawler {
  id: number
  name: string
  power: number
  rank: number
  trophies: number
  highestTrophies: number
  gears: Gear[]
  starPowers: StarPower[]
  gadgets: Gadget[]
}

export interface Gear {
  id: number
  name: string
  level: number
}

export interface StarPower {
  id: number
  name: string
}

export interface Gadget {
  id: number
  name: string
}

import requestBrawlStarsApi from './Utils/requestBrawlStarsApi.js';
import encodeTag from './Utils/encodeTag.js';

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
