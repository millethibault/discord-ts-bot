import axios, { AxiosError } from 'axios';
require('dotenv').config();
const BEARER_TOKEN = process.env.BEARER_TOKEN_BRAWL_STARS;

/**
 * 🔍 Envoie une requête à l'api de Brawl Stars via l'url
 * @param {string} url - L'url du endpoint (sans le #)
 * @returns {Promise<Object>} - Le JSON de la réponse API
 */
export default async function requestBrawlStarsApi(url: string): Promise<any> {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        'Accept': 'application/json'
      }
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError;
    console.error('Erreur lors de la requête :', err.response?.data || err.message);
    throw err;
  }
};