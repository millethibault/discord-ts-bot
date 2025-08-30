"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
// src/utils/logger.ts
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;
class Logger {
    static info(message) {
        originalLog(`ℹ️ [INFO] ${message}`);
    }
    static warn(message) {
        if (!Logger.shouldIgnore(message)) {
            originalWarn(`⚠️ [WARN] ${message}`);
        }
    }
    static error(message) {
        if (!Logger.shouldIgnore(message)) {
            originalError(`❌ [ERROR] ${message}`);
        }
    }
    static shouldIgnore(message) {
        return message.includes('.js.map') && message.includes('ENOENT');
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map