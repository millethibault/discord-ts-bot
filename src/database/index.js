"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const env_1 = require("../config/env");
const connectionPromise = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    password: env_1.DATABASE_PASSWORD,
    database: env_1.DATABASE_NAME
});
exports.default = connectionPromise;
//# sourceMappingURL=index.js.map