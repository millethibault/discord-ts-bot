"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHello = handleHello;
function handleHello(message) {
    var _a;
    message.channel.send(`Hello from ${(_a = message.guild) === null || _a === void 0 ? void 0 : _a.name} 👋`);
}
//# sourceMappingURL=hello.js.map