import { Player } from "./battle/player"
import { StarPlayer } from "./battle/starPlayer"

export interface Battle {
  mode: string
  type: string
  result?: string
  duration?: number
  starPlayer?: StarPlayer
  teams?: Player[][]
  rank?: number
  trophyChange?: number
  players?: Player[]
}