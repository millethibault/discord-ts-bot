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
const hello_1 = require("../../commands/hello");
const setPrefix_1 = require("../../commands/setPrefix");
client_1.client.on('messageCreate', (message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.author.bot || !client_1.client.user || !message.guild)
        return;
    if (!message.inGuild())
        return;
    const prefix = (0, prefix_1.getPrefix)(message.guild.id);
    if (message.content.trim() === `<@${client_1.client.user.id}>` || message.content.trim() === `<@!${client_1.client.user.id}>`) {
        return message.channel.send(`🔧 Le préfixe sur ce serveur est : \`${prefix}\``);
    }
    if (message.content.startsWith(prefix + 'hello')) {
        return (0, hello_1.handleHello)(message);
    }
    if (message.content.startsWith(prefix + 'setprefix')) {
        return (0, setPrefix_1.handleSetPrefix)(message);
    }
}));
//# sourceMappingURL=messageCreate.js.map