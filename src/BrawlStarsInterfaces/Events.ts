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
import parseBrawlStarsDate from './Utils/parseBrawlStarsDate';


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