export type BattleLogHistory = BattleLog[];

export interface BattleLogString {
  battleTime: string
  event: Event
  battle: Battle
}

export interface BattleLog {
  battleTime: Date
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
import parseBrawlStarsDate from './Utils/parseBrawlStarsDate';

function parseBattleLog(battleLogString: BattleLogString[]): BattleLogHistory {
  const battleLog = battleLogString.map(item => ({
    battleTime: parseBrawlStarsDate(item.battleTime),
    event: item.event,
    battle: item.battle
  }));
  return battleLog;
}

import {} from './Events'
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