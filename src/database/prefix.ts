import connectionPromise from './index';
import { ServerPrefixRow } from '../interfaces/prefix';

const serverPrefixes = new Map<string, string>();

export async function loadPrefixes() {
  const pool = await connectionPromise;
  const [rows] = await pool.execute('SELECT * FROM prefix') as [ServerPrefixRow[], any];
  for (const row of rows) {
    serverPrefixes.set(row.serverId, row.prefix);
  }
}

export async function setPrefix(serverId: string, prefix: string) {
  const pool = await connectionPromise;
  await pool.execute(
    'REPLACE INTO prefix (serverId, prefix) VALUES (?, ?)',
    [serverId, prefix]
  );
  serverPrefixes.set(serverId, prefix);
}

export function getPrefix(serverId: string): string {
  return serverPrefixes.get(serverId) || '!';
}

export function hasPrefix(serverId: string): boolean {
  return serverPrefixes.has(serverId);
}
