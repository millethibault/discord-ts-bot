"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = encodeTag;
/**
 * 🔍 Encode correctement le tag d'un jour
 * @param {string} rawTag - Le tag du joueur (sans le #)
 * @returns {string}- Le JSON de la réponse API
 */
function encodeTag(rawTag) {
    const corrections = {
        '#': '',
        'O': '0',
        'Z': '2',
        'B': '8',
        '6': 'G'
    };
    let correctedTag = rawTag.trim().toUpperCase().split('').map(char => corrections[char] || char).join('');
    let encodedTag = encodeURIComponent(`#${correctedTag}`);
    return encodedTag;
}
//# sourceMappingURL=encodeTag.js.map