export type BrawlerRanking = Player[]

export interface Player {
  tag: string
  name: string
  nameColor: string
  icon: Icon
  trophies: number
  rank: number
  club?: Club
}

export interface Icon {
  id: number
}

export interface Club {
  name: string
}

import requestBrawlStarsApi from './Utils/requestBrawlStarsApi';
import bsapi from './brawl-stars-api';

/**
 * 🔍 Récupère le classement des brawlers d'un pays via son code
 * @param {string} [brawler] - Le nom du brawler
 * @param {string} [countryCode='global'] - Le code du pays, optionnel
 * @param {int} [limit='200'] - Le nombre de joueurs, optionnel
 * @returns {Promise<BrawlerRanking>} - Le JSON de la réponse API
 */
export async function getBrawlerRankings(brawler: string, countryCode='global', limit=200): Promise<BrawlerRanking> {
  const brawlers = await bsapi.getBrawlers();
  const debug = brawler.toUpperCase();
  const brawlerFound = brawlers.find(brawlerItem => brawlerItem.name == brawler.toUpperCase());
  if (!brawlerFound) throw new Error(`Le brawler ${brawler} n'a pas été trouvé !`);
  const brawlerId = brawlerFound.id;
  const url = `https://api.brawlstars.com/v1/rankings/${countryCode}/brawlers/${brawlerId}?limit=${limit}`;
  const response = await requestBrawlStarsApi(url);
  return response.items;
}