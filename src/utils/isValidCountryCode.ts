export default function isValidCountryCode(code: string): boolean {
  const validCountryCodes = [
    "US", "FR", "DE", "ES", "IT", "BR", "RU", "JP", "KR", "CN", "IN", "TR",
    "MX", "CA", "GB", "PL", "ID", "TH", "VN", "SA", "AE", "AU", "AR", "CO",
    "CL", "NL", "SE", "FI", "NO", "DK", "BE", "PT", "GR", "CZ", "HU", "RO"
  ];

  return validCountryCodes.includes(code.toUpperCase());
}