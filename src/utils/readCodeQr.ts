import axios from "axios";
import sharp from "sharp";
import jsQR from "jsqr";

/**
 * Lit un QR code dans une image (attachment Discord)
 * @param imageUrl lien direct de l'image Discord (attachment.url)
 * @returns l'URL contenue dans le QR code ou null
 */
export async function readQRCodeFromUrl(imageUrl: string): Promise<string | null> {
  // 1. Télécharger l'image
  const res = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const buf = Buffer.from(res.data);

  // 2. Convertir en raw RGBA
  const { data, info } = await sharp(buf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const rgba = new Uint8ClampedArray(data);

  // 3. Scanner le QR
  const code = jsQR(rgba, info.width, info.height);
  if (!code) return null;

  return code.data; // ex: "https://link.brawlstars.com/invite/friend/en?tag=88RUVULY&token=HipAbracadabra"
}

/**
 * Extrait la valeur du paramètre "tag" dans une URL
 */
export function getTagValueFromLink(url: string): string | null {
  try {
    const params = new URL(url).searchParams;
    return params.get("tag");
  } catch {
    return null;
  }
}
