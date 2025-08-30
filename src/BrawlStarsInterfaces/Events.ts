export type Rotation = TempEvent[];

interface TempEventString {
  startTime: string;
  endTime: string;
  slotId: number;
  event: Event;
}

export interface TempEvent {
  startTime: Date;
  endTime: Date;
  slotId: number;
  event: Event;
}

export interface Event {
  id: number;
  mode: string;
  map: string;
  modifiers?: string[];
}

import requestBrawlStarsApi from './Utils/requestBrawlStarsApi.js';
/**
 * Convertit une date Brawl Stars au format "YYYYMMDDTHHmmss.SSSZ"
 * en objet Date JavaScript
 * @param raw - La chaîne de date brute
 * @returns Date
 */
export function parseBrawlStarsDate(raw: string): Date {
  // Exemple d'entrée : "20250829T080000.000Z"
  const iso = raw.replace(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})\.(\d{3})Z$/,
    '$1-$2-$3T$4:$5:$6.$7Z'
  );
  return new Date(iso);
}


function parseEvents(rotationString: TempEventString[]): Rotation {
  const rotation = rotationString.map(item => ({
    startTime: parseBrawlStarsDate(item.startTime),
    endTime: parseBrawlStarsDate(item.endTime),
    slotId: item.slotId,
    event: item.event
  }));
  return rotation;
}

/**
 * 🔍 Récupère la rotation des événemnts en cours dans le jeu
 * @returns {Promise<Rotation>} - Le JSON de la réponse API
 */
export async function getEvents(): Promise<Rotation> {
  const url = `https://api.brawlstars.com/v1/events/rotation`;
  const response = await requestBrawlStarsApi(url);
  return parseEvents(response);
}