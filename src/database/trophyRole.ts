import { TrophyRoleRow } from '../interfaces/trophyRole';
import connectionPromise from './index';
import { Guild, Role } from 'discord.js';

export async function setTrophyRole(guild: Guild, role: Role, trophies: number): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    `INSERT INTO trophyRole (guildId, roleId, trophies)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE trophies = ?`,
    [guild.id, role.id, trophies, trophies]
  );
}

export async function getTrophyRole(guild: Guild): Promise<TrophyRoleRow[]> {
  const pool = await connectionPromise;

  const [rows] = await pool.execute(
    'SELECT * FROM trophyRole WHERE guildId = ?',
    [guild.id]
  ) as [TrophyRoleRow[], any];

  return rows;
}

