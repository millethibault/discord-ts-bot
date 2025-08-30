/**
 * 🔍 Nettoie un tag Brawl Stars
 * @param {string} rawTag - Le tag
 * @returns {string}- Le tag nettoyé
 */
export function clearTag(rawTag: string): string {
  const corrections: Record<string, string> = {
    '#': '',
    'O': '0',
    'Z': '2',
    'B': '8',
    '6': 'G'
  };
  let correctedTag = rawTag.trim().toUpperCase().split('').map(char =>
    corrections[char] ?? char
  ).join('');
  return `#${correctedTag}`;
}

/**
 * 🔍 Encode correctement un tag Brawl Stars
 * @param {string} rawTag - Le tag
 * @returns {string}- Le tag nettoyé & encodé
 */
export function encodeTag(rawTag: string): string {
  let correctedTag = clearTag(rawTag)
  let encodedTag = encodeURIComponent(correctedTag);
  return encodedTag;
}