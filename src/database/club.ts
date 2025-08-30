import connectionPromise from './index';
import { Club } from '../interfaces/brawlStarsInterfaces/club';
import { Guild } from 'discord.js';
import { ClubRow } from '../interfaces/club';

export async function setClub(guild: Guild, club: Club): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    'REPLACE INTO club (guildId, clubTag, clubName) VALUES (?, ?, ?)',
    [guild.id, club.tag, club.name]
  );
}

export async function getClub(guild: Guild): Promise<ClubRow[]> {
  const pool = await connectionPromise;

  const [rows] = await pool.execute(
    'SELECT * FROM club WHERE guildId = ?',
    [guild.id]
  ) as [ClubRow[], any];

  return rows;
}

export async function removeClub(guild: Guild, clubTag: string): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    'DELETE FROM club WHERE guildId = ? AND clubTag = ?',
    [guild.id, clubTag]
  );
}