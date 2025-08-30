import { Icon } from './player/icon';
import { Club } from './rankedPlayer/club';

export type PlayerRanking = Player[]
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