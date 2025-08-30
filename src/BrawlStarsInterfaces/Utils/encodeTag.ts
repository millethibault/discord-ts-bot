/**
 * 🔍 Encode correctement le tag d'un jour
 * @param {string} rawTag - Le tag du joueur (sans le #)
 * @returns {string}- Le JSON de la réponse API
 */
export default function encodeTag(rawTag: string): string {
  const corrections: Record<string, string> = {
    '#': '',
    'O': '0',
    'Z': '2',
    'B': '8',
    '6': 'G'
  };
  let correctedTag = rawTag.trim().toUpperCase().split('').map(char =>
    corrections[char] || char
  ).join('');
  let encodedTag = encodeURIComponent(`#${correctedTag}`);
  return encodedTag;
}