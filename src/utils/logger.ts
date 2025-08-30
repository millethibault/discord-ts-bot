// src/utils/logger.ts
const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

export class Logger {
  static info(message: string) {
    originalLog(`ℹ️ [INFO] ${message}`);
  }

  static warn(message: string) {
    if (!Logger.shouldIgnore(message)) {
      originalWarn(`⚠️ [WARN] ${message}`);
    }
  }

  static error(message: string) {
    if (!Logger.shouldIgnore(message)) {
      originalError(`❌ [ERROR] ${message}`);
    }
  }

  private static shouldIgnore(message: string): boolean {
    return message.includes('.js.map') && message.includes('ENOENT');
  }
}
