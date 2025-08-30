import { Member } from "./club/member";

export interface Club {
  tag: string
  name: string
  description: string
  type: string
  badgeId: number
  requiredTrophies: number
  trophies: number
  members: Member[]
}