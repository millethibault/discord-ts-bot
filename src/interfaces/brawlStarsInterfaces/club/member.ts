import { Icon } from "../player/icon";

export interface Member {
  tag: string
  name: string
  nameColor: string
  role: 'member' | 'senior' | 'vicePresident' | 'president'
  trophies: number
  icon: Icon
}