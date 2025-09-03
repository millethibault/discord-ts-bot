import { ResultSetHeader } from 'mysql2';
import { gradeRoleRow } from '../interfaces/gradeRole';
import connectionPromise from './index';
import { Guild, Role } from 'discord.js';

export async function setPresident(guild: Guild, role: Role): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    `INSERT INTO gradeRole (guildId, president)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE president = ?`,
    [guild.id, role.id, role.id]
  );
}

export async function setVicePresident(guild: Guild, role: Role): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    `INSERT INTO gradeRole (guildId, vicePresident)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE vicePresident = ?`,
    [guild.id, role.id, role.id]
  );
}

export async function setSenior(guild: Guild, role: Role): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    `INSERT INTO gradeRole (guildId, senior)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE senior = ?`,
    [guild.id, role.id, role.id]
  );
}

export async function setMember(guild: Guild, role: Role): Promise<void> {
  const pool = await connectionPromise;

  await pool.execute(
    `INSERT INTO gradeRole (guildId, member)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE member = ?`,
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



export async function removeGrade(guild: Guild, gradeToRemove:string): Promise<number> {
  const pool = await connectionPromise;
  const allowedGrades = ['president', 'vicePresident', 'senior', 'member'];

  if (!allowedGrades.includes(gradeToRemove)) {
    throw new Error(`Grade "${gradeToRemove}" invalide.`);
  }
  const query = `UPDATE gradeRole SET ${gradeToRemove} = NULL WHERE guildId = ? AND ${gradeToRemove} IS NOT NULL`;
  const [result] = await pool.execute<ResultSetHeader>(query, [guild.id]);
  return result.affectedRows;
}