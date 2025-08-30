"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
require('dotenv').config();
const database = process.env.DATABASE_NAME;
const password = process.env.DATABASE_PASSWORD;
exports.default = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    database: database,
    password: password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
//# sourceMappingURL=db.js.map