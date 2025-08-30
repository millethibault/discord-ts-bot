import requestBrawlStarsApi from './Utils/requestBrawlStarsApi.js';
import parseEvents from './Utils/parseEvenrs.js';
import { Rotation } from '../interfaces/brawlStarsInterfaces/tempEvent.js';

/**
 * 🔍 Récupère la rotation des événemnts en cours dans le jeu
 * @returns {Promise<Rotation>} - Le JSON de la réponse API
 */
export async function getEvents(): Promise<Rotation> {
  const url = `https://api.brawlstars.com/v1/events/rotation`;
  const response = await requestBrawlStarsApi(url);
  return parseEvents(response);
}