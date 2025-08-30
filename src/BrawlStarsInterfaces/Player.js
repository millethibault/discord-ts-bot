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
exports.getPlayerData = getPlayerData;
const requestBrawlStarsApi_js_1 = __importDefault(require("./Utils/requestBrawlStarsApi.js"));
const encodeTag_js_1 = __importDefault(require("./Utils/encodeTag.js"));
/**
 * 🔍 Récupère les infos d'un joueur Brawl Stars via son tag
 * @param {string} tag - Le tag du joueur (sans le #)
 * @returns {Promise<Player>} - Le JSON de la réponse API
 */
function getPlayerData(tag) {
    return __awaiter(this, void 0, void 0, function* () {
        const encodedTag = (0, encodeTag_js_1.default)(tag);
        const url = `https://api.brawlstars.com/v1/players/${encodedTag}`;
        const response = yield (0, requestBrawlStarsApi_js_1.default)(url);
        return response;
    });
}
//# sourceMappingURL=Player.js.map