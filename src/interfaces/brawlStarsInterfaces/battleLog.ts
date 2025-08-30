import { Battle } from "./battleLog/battle";

export type BattleLogHistory = BattleLog[];

export interface BattleLogString {
  battleTime: string
  event: Event
  battle: Battle
}

export interface BattleLog {
  battleTime: Date
  event: Event
  battle: Battle
}