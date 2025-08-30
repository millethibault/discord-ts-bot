"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./utils/logger");
console.log = logger_1.Logger.info;
console.warn = logger_1.Logger.warn;
console.error = logger_1.Logger.error;
const client_1 = require("./bot/client");
require("./bot/events/ready");
require("./bot/events/messageCreate");
const env_1 = require("./config/env");
client_1.client.login(env_1.DISCORD_TOKEN);
//# sourceMappingURL=main.js.map