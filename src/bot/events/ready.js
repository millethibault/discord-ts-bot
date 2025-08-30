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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../client");
const prefix_1 = require("../../database/prefix");
client_1.client.once('clientReady', () => __awaiter(void 0, void 0, void 0, function* () {
    if (!client_1.client.user)
        return;
    console.log(`✅ Connecté en tant que ${client_1.client.user.tag}`);
    yield (0, prefix_1.loadPrefixes)();
    for (const guild of client_1.client.guilds.cache.values()) {
        if (!(0, prefix_1.hasPrefix)(guild.id)) {
            //console.log(`🔧 Aucun préfixe pour ${guild.name}, utilisation de '!'`);
        }
    }
    console.log('📦 Préfixes chargés');
}));
//# sourceMappingURL=ready.js.map