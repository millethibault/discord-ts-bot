"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlayersRankings = getPlayersRankings;
const requestBrawlStarsApi_js_1 = __importDefault(require("./Utils/requestBrawlStarsApi.js"));
/**
 * 🔍 Récupère le classement des joueurs d'un pays via son code
 * @param {string} [countryCode='global'] - Le code du pays, optionnel
 * @param {int} [limit='200'] - Le nombre de joueurs, optionnel
 * @returns {Promise<PlayerRanking>} - Le JSON de la réponse API
 */
function getPlayersRankings() {
    return __awaiter(this, arguments, void 0, function* (countryCode = 'global', limit = 200) {
        const url = `https://api.brawlstars.com/v1/rankings/${countryCode}/players?limit=${limit}`;
        const response = yield (0, requestBrawlStarsApi_js_1.default)(url);
        for (const player of response.items) {
            if (player.trophies == 1)
                player.trophies = "Plus de 100 000";
        }
        return response.items;
    });
}
//# sourceMappingURL=PlayerRanking.js.map