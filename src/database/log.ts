import connectionPromise from './index';
import { Guild, Role, GuildMember, GuildWidgetSettings } from 'discord.js';
import { LogRow } from '../interfaces/log';

export async function log(guild: Guild, role: Role, member: GuildMember, addOrRemove: boolean): Promise<void> {
  const pool = await connectionPromise;
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');

  await pool.execute(
    'INSERT INTO log (guildId, roleId, memberId, addOrRemove, datetime) VALUES (?, ?, ?, ?, ?)',
    [guild.id, role.id, member.id, addOrRemove, formattedDate]
  );
}

export async function getLog(guild: Guild, offset = 0, limit = 10): Promise<LogRow[]> {
  const pool = await connectionPromise;

  const [rows] = await pool.execute(
    'SELECT * FROM log WHERE guildId = ? ORDER BY datetime DESC LIMIT ? OFFSET ?',
    [guild.id, String(limit), String(offset)]
  );

  return rows as LogRow[];
}