export type ClubRanking = Club[]

export interface Club {
  tag: string
  name: string
  badgeId: number
  trophies: number
  rank: number
  memberCount: number
}