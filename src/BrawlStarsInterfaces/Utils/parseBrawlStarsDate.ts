/**
 * Convertit une date Brawl Stars au format "YYYYMMDDTHHmmss.SSSZ"
 * en objet Date JavaScript
 * @param raw - La chaîne de date brute
 * @returns Date
 */
export default function parseBrawlStarsDate(raw: string): Date {
  // Exemple d'entrée : "20250829T080000.000Z"
  const iso = raw.replace(
    /^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})\.(\d{3})Z$/,
    '$1-$2-$3T$4:$5:$6.$7Z'
  );
  return new Date(iso);
}