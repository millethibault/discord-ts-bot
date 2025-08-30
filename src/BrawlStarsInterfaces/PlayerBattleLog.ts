export interface BattleLog {
  battleTime: string
  event: Event
  battle: Battle
}

export interface Event {
  id: number
  mode: string
  map: string
}

export interface Battle {
  mode: string
  type: string
  result?: string
  duration?: number
  starPlayer?: StarPlayer
  teams?: Team[][]
  rank?: number
  trophyChange?: number
  players?: Player[]
}

export interface StarPlayer {
  tag: string
  name: string
  brawler: Brawler
}

export interface Brawler {
  id: number
  name: string
  power: number
  trophies: number
}

export interface Team {
  tag: string
  name: string
  brawler: Brawler2
}

export interface Brawler2 {
  id: number
  name: string
  power: number
  trophies: number
}

export interface Player {
  tag: string
  name: string
  brawler: Brawler3
}

export interface Brawler3 {
  id: number
  name: string
  power: number
  trophies: number
}

import requestBrawlStarsApi from './Utils/requestBrawlStarsApi.js';
import encodeTag from './Utils/encodeTag.js';
/**
 * 🔍 Récupère l'historique d'un joueur Brawl Stars via son tag
 * @param {string} tag - Le tag du joueur (sans le #)
 * @returns {Promise<BattleLog>} - Le JSON de la réponse API
 */
export async function getPlayerBattleLog(tag: string): Promise<BattleLog> {
  const encodedTag = encodeTag(tag);
  const url = `https://api.brawlstars.com/v1/players/${encodedTag}/battlelog`;
  const response = await requestBrawlStarsApi(url);
  return response.items as BattleLog;
}