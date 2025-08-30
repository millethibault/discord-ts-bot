import connectionPromise from './index';
import { Club } from '../interfaces/brawlStarsInterfaces/club';
import { Guild, Role } from 'discord.js';
import { ClubRow } from '../interfaces/club';

export async function setClubRole(guild: Guild, role: Role, club: Club): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    'REPLACE INTO club (guildId, roleId, clubTag, clubName) VALUES (?, ?, ?, ?)',
    [guild.id, role.id, club.tag, club.name]
  );
}

export async function getClubRoles(guild: Guild): Promise<ClubRow[]> {
  const pool = await connectionPromise;

  const [rows] = await pool.execute(
    'SELECT * FROM club WHERE guildId = ? AND roleId IS NOT NULL',
    [guild.id]
  ) as [ClubRow[], any];

  return rows;
}