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
exports.default = requestBrawlStarsApi;
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
const BEARER_TOKEN = process.env.BEARER_TOKEN_BRAWL_STARS;
/**
 * 🔍 Envoie une requête à l'api de Brawl Stars via l'url
 * @param {string} url - L'url du endpoint (sans le #)
 * @returns {Promise<Object>} - Le JSON de la réponse API
 */
function requestBrawlStarsApi(url) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield axios_1.default.get(url, {
                headers: {
                    Authorization: `Bearer ${BEARER_TOKEN}`,
                    'Accept': 'application/json'
                }
            });
            return response.data;
        }
        catch (error) {
            const err = error;
            console.error('Erreur lors de la requête :', ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) || err.message);
            throw err;
        }
    });
}
;
//# sourceMappingURL=requestBrawlStarsApi.js.map