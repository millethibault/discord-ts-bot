import { gradeRoleRow } from '../interfaces/gradeRole';
import connectionPromise from './index';
import { Guild, Role } from 'discord.js';

export async function setPresident(guild: Guild, role: Role): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    `INSERT INTO gradeRole (guildId, presidentId)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE presidentId = ?`,
    [guild.id, role.id, role.id]
  );
}

export async function setVicePresident(guild: Guild, role: Role): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    `INSERT INTO gradeRole (guildId, vicePresidentId)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE vicePresidentId = ?`,
    [guild.id, role.id, role.id]
  );
}

export async function setSenior(guild: Guild, role: Role): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    `INSERT INTO gradeRole (guildId, seniorId)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE seniorId = ?`,
    [guild.id, role.id, role.id]
  );
}

export async function setMember(guild: Guild, role: Role): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    `INSERT INTO gradeRole (guildId, memberId)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE memberId = ?`,
    [guild.id, role.id, role.id]
  );
}

export async function getGradeRoles(guild: Guild): Promise<gradeRoleRow | undefined> {
  const pool = await connectionPromise;

  const [rows] = await pool.execute(
    `SELECT * FROM gradeRole WHERE guildId = ?`,
    [guild.id]
  ) as [gradeRoleRow[], any];

  return rows[0];
}