import connectionPromise from './index';
import { Guild } from 'discord.js';
import { VerifyRow } from '../interfaces/verify';

export async function setVerify(guild: Guild, verify: boolean): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    `INSERT INTO verify (guildId, verify)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE verify = VALUES(verify);`,
    [guild.id, verify]
  );
}

export async function getVerify(guild: Guild): Promise<boolean> {
  const pool = await connectionPromise;

  const [rows] = await pool.execute(
    'SELECT * FROM verify WHERE guildId = ?',
    [guild.id]
  ) as [VerifyRow[], any];

  return rows[0] ? rows[0].verify : true;
}