import { Brawler } from "./player/brawler"

export interface Player {
  tag: string
  name: string
  brawler: Brawler
}