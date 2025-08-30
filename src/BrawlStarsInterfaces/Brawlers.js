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
exports.getBrawlers = getBrawlers;
const requestBrawlStarsApi_1 = __importDefault(require("./Utils/requestBrawlStarsApi"));
/**
 * 🔍 Récupère la liste des brawlers du jeu
 * @returns {Promise<Brawlers>} - Le JSON de la réponse API
 */
function getBrawlers() {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://api.brawlstars.com/v1/brawlers`;
        const response = yield (0, requestBrawlStarsApi_1.default)(url);
        return response.items;
    });
}
//# sourceMappingURL=Brawlers.js.map