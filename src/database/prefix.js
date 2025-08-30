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
exports.loadPrefixes = loadPrefixes;
exports.setPrefix = setPrefix;
exports.getPrefix = getPrefix;
exports.hasPrefix = hasPrefix;
const index_1 = __importDefault(require("./index"));
const serverPrefixes = new Map();
function loadPrefixes() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield index_1.default;
        const [rows] = yield pool.execute('SELECT * FROM prefix');
        for (const row of rows) {
            serverPrefixes.set(row.serverId, row.prefix);
        }
    });
}
function setPrefix(serverId, prefix) {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = yield index_1.default;
        yield pool.execute('REPLACE INTO prefix (serverId, prefix) VALUES (?, ?)', [serverId, prefix]);
        serverPrefixes.set(serverId, prefix);
    });
}
function getPrefix(serverId) {
    return serverPrefixes.get(serverId) || '!';
}
function hasPrefix(serverId) {
    return serverPrefixes.has(serverId);
}
//# sourceMappingURL=prefix.js.map