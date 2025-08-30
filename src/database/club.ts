import connectionPromise from './index';
import { ClubRow } from '../interfaces/club';
import { Club } from '../interfaces/brawlStarsInterfaces/club';
import { Guild } from 'discord.js';

const serverClubs = new Map<string, { tag: string; name: string }[]>();

export async function loadClubs() {
  const pool = await connectionPromise;
  const [rows] = await pool.execute('SELECT * FROM club') as [ClubRow[], any];
  for (const row of rows) {
    const existing = serverClubs.get(row.guildId) || [];
    serverClubs.set(row.guildId, [...existing, { tag: row.clubTag, name: row.clubName }]);
  }
}

export async function addClub(guild: Guild, club: Club) {
  const pool = await connectionPromise;
  await pool.execute(
    'INSERT INTO club (guildId, clubTag, clubName) VALUES (?, ?, ?)',
    [guild.id, club.tag, club.name]
  );

  const existing = serverClubs.get(guild.id) || [];
  if (!existing.some(c => c.tag === club.tag)) {
    serverClubs.set(guild.id, [...existing, { tag: club.tag, name: club.name }]);
  }
}

export async function removeClub(guild: Guild, clubTag: string) {
  const pool = await connectionPromise;

  // Supprimer de la base de données
  await pool.execute(
    'DELETE FROM club WHERE guildId = ? AND clubTag = ?',
    [guild.id, clubTag]
  );

  // Supprimer de la Map en mémoire
  const existing = serverClubs.get(guild.id);
  if (!existing) return;

  const updated = existing.filter(club => club.tag !== clubTag);
  if (updated.length > 0) {
    serverClubs.set(guild.id, updated);
  } else {
    serverClubs.delete(guild.id); // Si plus aucun club, on retire la clé
  }
}

export function getClubs(guild: Guild): { tag: string; name: string }[] {
  return serverClubs.get(guild.id) || [];
}

export function hasClubs(guild: Guild): boolean {
  return serverClubs.has(guild.id) && serverClubs.get(guild.id)!.length > 0;
}

