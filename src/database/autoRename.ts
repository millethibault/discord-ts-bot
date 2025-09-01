import connectionPromise from './index';
import { Guild } from 'discord.js';
import { AutoRenameRow } from '../interfaces/autoRename';

export async function setAutoRename(guild: Guild, autoRename: boolean): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    `INSERT INTO autoRename (guildId, autoRename)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE autoRename = VALUES(autoRename);`,
    [guild.id, autoRename]
  );
}

export async function getAutoRename(guild: Guild): Promise<boolean> {
  const pool = await connectionPromise;

  const [rows] = await pool.execute(
    'SELECT * FROM autoRename WHERE guildId = ?',
    [guild.id]
  ) as [AutoRenameRow[], any];

  return rows[0] ? rows[0].autoRename : false;
}