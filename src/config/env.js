"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_PASSWORD = exports.DATABASE_NAME = exports.BEARER_TOKEN_BRAWL_STARS = exports.DISCORD_TOKEN = void 0;
require("dotenv/config");
exports.DISCORD_TOKEN = (_a = process.env.DISCORD_TOKEN) !== null && _a !== void 0 ? _a : '';
exports.BEARER_TOKEN_BRAWL_STARS = (_b = process.env.BEARER_TOKEN_BRAWL_STARS) !== null && _b !== void 0 ? _b : '';
exports.DATABASE_NAME = (_c = process.env.DATABASE_NAME) !== null && _c !== void 0 ? _c : '';
exports.DATABASE_PASSWORD = (_d = process.env.DATABASE_PASSWORD) !== null && _d !== void 0 ? _d : '';
//# sourceMappingURL=env.js.map