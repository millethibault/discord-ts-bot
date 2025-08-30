import { StarPower } from "./brawler/starPower";
import { Gadget } from "./brawler/gadget";

export type Brawlers = Brawler[];

export interface Brawler {
  id: number
  name: string
  starPowers: StarPower[]
  gadgets: Gadget[]
}