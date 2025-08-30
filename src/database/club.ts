import connectionPromise from './index';
import { ServerClubRow } from '../interfaces/club';
import { Club } from '../interfaces/brawlStarsInterfaces/club';

const serverClubs = new Map<string, { tag: string; name: string }[]>();

export async function loadClubs() {
  const pool = await connectionPromise;
  const [rows] = await pool.execute('SELECT * FROM club') as [ServerClubRow[], any];
  for (const row of rows) {
    const existing = serverClubs.get(row.serverId) || [];
    serverClubs.set(row.serverId, [...existing, { tag: row.clubTag, name: row.clubName }]);
  }
}

export async function addClub(serverId: string, club: Club) {
  const pool = await connectionPromise;
  await pool.execute(
    'INSERT INTO club (serverId, clubTag, clubName) VALUES (?, ?, ?)',
    [serverId, club.tag, club.name]
  );

  const existing = serverClubs.get(serverId) || [];
  if (!existing.some(c => c.tag === club.tag)) {
    serverClubs.set(serverId, [...existing, { tag: club.tag, name: club.name }]);
  }
}

export async function removeClub(serverId: string, clubTag: string) {
  const pool = await connectionPromise;

  // Supprimer de la base de données
  await pool.execute(
    'DELETE FROM club WHERE serverId = ? AND clubTag = ?',
    [serverId, clubTag]
  );

  // Supprimer de la Map en mémoire
  const existing = serverClubs.get(serverId);
  if (!existing) return;

  const updated = existing.filter(club => club.tag !== clubTag);
  if (updated.length > 0) {
    serverClubs.set(serverId, updated);
  } else {
    serverClubs.delete(serverId); // Si plus aucun club, on retire la clé
  }
}

export function getClubs(serverId: string): { tag: string; name: string }[] {
  return serverClubs.get(serverId) || [];
}

export function hasClubs(serverId: string): boolean {
  return serverClubs.has(serverId) && serverClubs.get(serverId)!.length > 0;
}

