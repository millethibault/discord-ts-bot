import connectionPromise from './index';
import { Player } from '../interfaces/brawlStarsInterfaces/player';
import { PlayerRow } from '../interfaces/player';
import { Guild, User } from 'discord.js';

export async function link(user: User, player: Player, guild: Guild): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    'REPLACE INTO player (userId, playerTag, guildId) VALUES (?, ?, ?)',
    [user.id, player.tag, guild.id]
  );
}

export async function unlink(user: User, guild: Guild): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    'DELETE FROM player WHERE userId = ? and guildId = ?',
    [user.id, guild.id]
  );
}

export async function getProfile(user: User, guild: Guild): Promise<PlayerRow | null> {
  const pool = await connectionPromise;
  const [rows] = await pool.execute(
    'SELECT playerTag FROM player WHERE userId = ? AND guildId = ?',
    [user.id, guild.id]
  ) as [PlayerRow[], any];

  if (rows.length === 0) return null;
  return rows[0];
}

export async function getAllProfiles(guild: Guild): Promise<PlayerRow[]> {
  const pool = await connectionPromise;
  const [rows] = await pool.execute(
    'SELECT * FROM player WHERE guildId = ?',
    [guild.id]
  ) as [PlayerRow[], any];

  return rows;
}