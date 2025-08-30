import { getPlayerData } from './Player';
import { getPlayerBattleLog } from './PlayerBattleLog';
import { getClubData } from './Club';
import { getClubRankings } from './ClubRanking';
import { getBrawlerRankings } from './BrawlerRanking';
import { getPlayersRankings } from './PlayerRanking';
import { getBrawlers } from './Brawlers';
import { getEvents } from './Events';

const bsapi = {
  getPlayerData,
  getPlayerBattleLog,
  getClubData,
  getClubRankings,
  getBrawlerRankings,
  getPlayersRankings,
  getBrawlers,
  getEvents
};

export default bsapi;