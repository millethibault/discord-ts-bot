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
exports.getBrawlerRankings = getBrawlerRankings;
const requestBrawlStarsApi_1 = __importDefault(require("./Utils/requestBrawlStarsApi"));
const brawl_stars_api_1 = __importDefault(require("./brawl-stars-api"));
/**
 * 🔍 Récupère le classement des brawlers d'un pays via son code
 * @param {string} [brawler] - Le nom du brawler
 * @param {string} [countryCode='global'] - Le code du pays, optionnel
 * @param {int} [limit='200'] - Le nombre de joueurs, optionnel
 * @returns {Promise<BrawlerRanking>} - Le JSON de la réponse API
 */
function getBrawlerRankings(brawler_1) {
    return __awaiter(this, arguments, void 0, function* (brawler, countryCode = 'global', limit = 200) {
        const brawlers = yield brawl_stars_api_1.default.getBrawlers();
        const brawlerFound = brawlers.find(brawlerItem => brawlerItem.name == brawler.toUpperCase());
        if (!brawlerFound)
            throw new Error(`Le brawler ${brawler} n'a pas été trouvé !`);
        const brawlerId = brawlerFound.id;
        const url = `https://api.brawlstars.com/v1/rankings/${countryCode}/brawlers/${brawlerId}?limit=${limit}`;
        const response = yield (0, requestBrawlStarsApi_1.default)(url);
        return response.items;
    });
}
//# sourceMappingURL=BrawlerRanking.js.map