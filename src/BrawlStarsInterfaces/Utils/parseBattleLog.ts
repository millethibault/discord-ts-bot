import { BattleLogHistory, BattleLogString } from "../../interfaces/brawlStarsInterfaces/battleLog";
import parseBrawlStarsDate from "./parseBrawlStarsDate";


export default function parseBattleLog(battleLogString: BattleLogString[]): BattleLogHistory {
  const battleLog = battleLogString.map(item => ({
    battleTime: parseBrawlStarsDate(item.battleTime),
    event: item.event,
    battle: item.battle
  }));
  return battleLog;
}