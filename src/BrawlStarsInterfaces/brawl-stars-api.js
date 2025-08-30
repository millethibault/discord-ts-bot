"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("./Player");
const PlayerBattleLog_1 = require("./PlayerBattleLog");
const Club_1 = require("./Club");
const ClubRanking_1 = require("./ClubRanking");
const BrawlerRanking_1 = require("./BrawlerRanking");
const PlayerRanking_1 = require("./PlayerRanking");
const Brawlers_1 = require("./Brawlers");
const Events_1 = require("./Events");
const bsapi = {
    getPlayerData: Player_1.getPlayerData,
    getPlayerBattleLog: PlayerBattleLog_1.getPlayerBattleLog,
    getClubData: Club_1.getClubData,
    getClubRankings: ClubRanking_1.getClubRankings,
    getBrawlerRankings: BrawlerRanking_1.getBrawlerRankings,
    getPlayersRankings: PlayerRanking_1.getPlayersRankings,
    getBrawlers: Brawlers_1.getBrawlers,
    getEvents: Events_1.getEvents
};
exports.default = bsapi;
//# sourceMappingURL=brawl-stars-api.js.map