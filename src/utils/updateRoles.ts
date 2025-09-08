import { GuildMember, Role } from "discord.js";
import { client } from "../bot/client";
import { getTrophyRole } from "../database/trophyRole";
import { Club } from "../interfaces/brawlStarsInterfaces/club";
import { getGradeRoles } from "../database/gradeRole";
import { getClub } from "../database/club";
import { getProfile } from "../database/player";
import { getClubRoles } from "../database/clubRole";
import { getAutoRename } from "../database/autoRename";
import { log } from "../database/log";
import { getTraductions } from "../traductions/tradFunctions";

type MessageString = { value: string };

export async function updateTrophyRole(
  member: GuildMember,
  playerTrophies: number,
  messageString: MessageString = { value: "" }
): Promise<Role | null> {
  const traductions = await getTraductions(member.guild);
  const trophyRoles = await getTrophyRole(member.guild);
  if (!trophyRoles[0]) {
    messageString.value += traductions.NO_TROPHY_ROLE + "\n";
    return null;
  }

  const trophyRolesId = trophyRoles.map(r => r.roleId);
  const trophyRoleId = trophyRoles
    .sort((a, b) => b.trophies - a.trophies)
    .find(r => playerTrophies >= r.trophies)?.roleId;

  if (!trophyRoleId) return null;

  const trophyRole = await member.guild.roles.fetch(trophyRoleId);
  if (!trophyRole || member.roles.cache.has(trophyRoleId)) return null;
  if (!client.user) return null;

  const botMember = await member.guild.members.fetch(client.user.id);
  const rolesToRemove = member.roles.cache.filter(role =>
    trophyRolesId.includes(role.id) &&
    role.id !== trophyRoleId &&
    role.position < botMember.roles.highest.position
  );

  for (const role of rolesToRemove.values()) {
    await member.roles.remove(role);
    await log(member.guild, role, member, false);
  }

  if (trophyRole.position > botMember.roles.highest.position) return null;

  await member.roles.add(trophyRole);
  await log(member.guild, trophyRole, member, true);

  messageString.value += traductions.TROPHY_ROLE_UPDATED(
    rolesToRemove.map(r => r.name).join(", "),
    trophyRole.name
  ) + "\n";

  return trophyRole;
}

export async function updateGradeRole(
  member: GuildMember,
  club: Club,
  messageString: MessageString = { value: "" }
): Promise<Role | null> {
  const traductions = await getTraductions(member.guild);
  const gradeRoles = await getGradeRoles(member.guild);
  if (!gradeRoles) {
    messageString.value += traductions.NO_GRADE_ROLE + "\n";
    return null;
  }

  const guildClubs = await getClub(member.guild);
  const playerClub = guildClubs.find(c => c.clubTag === club.tag);
  if (!playerClub) return null;

  const memberProfile = await getProfile(member.user, member.guild);
  if (!memberProfile) return null;

  const clubGrade = club.members.find(m => m.tag === memberProfile.playerTag)?.role;
  if (!clubGrade) return null;

  const gradeRoleId = gradeRoles[clubGrade];
  if (!gradeRoleId) return null;

  const gradeRole = await member.guild.roles.fetch(gradeRoleId);
  if (!gradeRole || member.roles.cache.has(gradeRole.id)) return null;
  if (!client.user) return null;

  const botMember = await member.guild.members.fetch(client.user.id);

  const rolesToRemove = member.roles.cache.filter(role =>
    Object.entries(gradeRoles)
      .filter(([key, value]) =>
        ["president", "vicePresident", "senior", "member"].includes(key) &&
        value !== undefined &&
        role.position < botMember.roles.highest.position
      )
      .map(([_, value]) => value as string)
      .includes(role.id) &&
    role.id !== gradeRole.id
  );

  for (const role of rolesToRemove.values()) {
    await member.roles.remove(role);
    await log(member.guild, role, member, false);
  }

  if (gradeRole.position > botMember.roles.highest.position) return null;

  await member.roles.add(gradeRole);
  await log(member.guild, gradeRole, member, true);

  messageString.value += traductions.GRADE_ROLE_UPDATED(
    rolesToRemove.map(r => r.name).join(", "),
    gradeRole.name
  ) + "\n";

  return gradeRole;
}

export async function updateClubRole(
  member: GuildMember,
  club: Club,
  messageString: MessageString = { value: "" }
): Promise<Role | null> {
  const traductions = await getTraductions(member.guild);
  const clubRoles = await getClubRoles(member.guild);
  if (!clubRoles[0]) {
    messageString.value += traductions.NO_CLUB_ROLE + "\n";
    return null;
  }

  const playerClub = clubRoles.find(c => c.clubTag === club.tag);
  if (!playerClub || !playerClub.roleId) return null;

  const clubRole = await member.guild.roles.fetch(playerClub.roleId);
  if (!clubRole || member.roles.cache.has(clubRole.id)) return null;
  if (!client.user) return null;

  const botMember = await member.guild.members.fetch(client.user.id);

  const rolesToRemove = member.roles.cache.filter(role =>
    clubRoles.map(c => c.roleId).includes(role.id) &&
    role.id !== clubRole.id &&
    role.position < botMember.roles.highest.position
  );

  for (const role of rolesToRemove.values()) {
    await member.roles.remove(role);
    await log(member.guild, role, member, false);
  }

  if (clubRole.position > botMember.roles.highest.position) return null;

  await member.roles.add(clubRole);
  await log(member.guild, clubRole, member, true);

  messageString.value += traductions.CLUB_ROLE_UPDATED(
    rolesToRemove.map(r => r.name).join(", "),
    clubRole.name
  ) + "\n";

  return clubRole;
}

export async function updateMemberName(
  member: GuildMember,
  playerName: string,
  messageString: MessageString = { value: "" }
): Promise<string | null> {
  const traductions = await getTraductions(member.guild);
  const autoRename = await getAutoRename(member.guild);
  if (!autoRename || member.displayName === playerName) return null;
  if(!client.user) return null;
  const botMember = await member.guild.members.fetch(client.user.id);
  if (!botMember.permissions.has('ManageNicknames')) {
    messageString.value += traductions.UPDATE_NICKNAME_MISSING_PERMISSION + "\n";
    return null;
  }
  await member.setNickname(playerName);
  //messageString.value += traductions.NAME_UPDATED(playerName) + "\n";
  return playerName;
}
