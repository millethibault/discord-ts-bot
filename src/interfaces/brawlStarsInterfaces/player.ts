import { Icon } from "./player/icon"
import { Club } from "./player/club";
import { Brawler } from "./player/brawler";

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