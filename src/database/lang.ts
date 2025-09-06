import connectionPromise from './index';
import { Guild } from 'discord.js';
import { LangRow } from '../interfaces/lang';

export async function setLang(guild: Guild, lang: string): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    `INSERT INTO lang (guildId, lang)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE lang = VALUES(lang);`,
    [guild.id, lang]
  );
}

export async function getLang(guild: Guild): Promise<string> {
  const pool = await connectionPromise;

  const [rows] = await pool.execute(
    'SELECT * FROM lang WHERE guildId = ?',
    [guild.id]
  ) as [LangRow[], any];

  return rows[0] ? rows[0].lang : 'en';
}