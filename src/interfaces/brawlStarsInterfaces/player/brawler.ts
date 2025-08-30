import { Gear } from "./brawler/gear";
import { StarPower } from "../brawler/starPower";
import { Gadget } from "../brawler/gadget";

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