import { GuildMember, Role } from 'discord.js';
import { Player } from '../interfaces/brawlStarsInterfaces/player';
import { getTrophyRole } from '../database/trophyRole';
import { getGradeRoles } from '../database/gradeRole';
import { getClub } from '../database/club';
import { getClubRoles } from '../database/clubRole';
import { getAutoRename } from '../database/autoRename';
import bsapi from '../BrawlStarsInterfaces/brawl-stars-api';
import { client } from '../bot/client';

export async function checkRoles(member: GuildMember, player: Player) {
  const botMember = await member.guild.members.fetch(client.user!.id);

  // Nickname check
  const autoRename = await getAutoRename(member.guild);
  const nicknameUpToDate = autoRename ? member.displayName === player.name : true;

  // Trophy Role check
  const trophyRoles = await getTrophyRole(member.guild) ?? [];
  const trophyRolesId = trophyRoles.map(r => r.roleId);
  const trophyLevel = trophyRoles
    .filter(r => typeof r.trophies === 'number')
    .sort((a, b) => b.trophies - a.trophies)
    .find(role => player.trophies >= role.trophies);
  const expectedTrophyRole = trophyLevel?.roleId
    ? await member.guild.roles.fetch(trophyLevel.roleId).catch(() => undefined)
    : undefined;
  const currentTrophyRoles = member.roles.cache.filter(role =>
    trophyRolesId.includes(role.id)
  );
  const trophyRolesToRemove = currentTrophyRoles.filter(role =>
    role.id !== expectedTrophyRole?.id && role.position < botMember.roles.highest.position
  );
  const trophyUpToDate = expectedTrophyRole
    ? member.roles.cache.has(expectedTrophyRole.id)// && trophyRolesToRemove.size == 0
    : true;

  // Club Role check
  const clubRoles = await getClubRoles(member.guild) ?? [];
  const playerClubRoleData = player.club?.tag
    ? clubRoles.find(role => role.clubTag === player.club.tag)
    : undefined;
  const expectedClubRole = playerClubRoleData?.roleId
    ? await member.guild.roles.fetch(playerClubRoleData.roleId).catch(() => undefined)
    : undefined;
  const clubRolesToRemove = member.roles.cache.filter(role =>
    clubRoles.map(r => r.roleId).includes(role.id) &&
    role.id !== expectedClubRole?.id &&
    role.position < botMember.roles.highest.position
  );
  const clubUpToDate = expectedClubRole
    ? member.roles.cache.has(expectedClubRole.id)// && clubRolesToRemove.size == 0
    : true;

  // Grade Role check
  const gradeRoles = await getGradeRoles(member.guild);
  const guildClubs = await getClub(member.guild);
  const playerClub = player.club?.tag
    ? guildClubs.find(c => c.clubTag === player.club.tag)
    : undefined;

  let expectedGradeRole: Role | undefined | null = undefined;
  let gradeRolesToRemove: Role[] = [];
  let gradeUpToDate = true;
  type GradeKey = 'president' | 'vicePresident' | 'senior' | 'member' | null;
  let grade: GradeKey = null;

  if (playerClub?.clubTag) {
    const clubData = await bsapi.getClubData(playerClub.clubTag).catch(() => null);
    const clubMember = clubData?.members?.find(m => m.tag === player.tag);
    grade = clubMember?.role ?? null;

    const gradeRoleId = gradeRoles && grade ? gradeRoles[grade] : undefined;
    expectedGradeRole = gradeRoleId
      ? await member.guild.roles.fetch(gradeRoleId).catch(() => undefined)
      : undefined;
    if(gradeRoles) {
        const gradeRoleIds =  Object.values(gradeRoles).filter(Boolean) as string[];
        gradeRolesToRemove = member.roles.cache.filter(role =>
        gradeRoleIds.includes(role.id) &&
        role.id !== expectedGradeRole?.id &&
        role.id !== member.guild.roles.everyone.id
        ).map(role => role);
    }

    gradeUpToDate = expectedGradeRole
      ? member.roles.cache.has(expectedGradeRole.id)// && gradeRolesToRemove.length == 0
      : true;
  }

  const rolesUpToDate = trophyUpToDate && clubUpToDate && gradeUpToDate;
  const upToDate = nicknameUpToDate && trophyUpToDate && clubUpToDate && gradeUpToDate;

  return {
    rolesUpToDate,
    upToDate,
    nickname: {
      upToDate: nicknameUpToDate,
      currentNickname: member.displayName,
      playerNickname: player.name
    },
    trophies: {
      upToDate: trophyUpToDate,
      trophies: player.trophies,
      trophyLevel: trophyLevel?.trophies ?? null,
      trophyRole: expectedTrophyRole,
      trophyRolesToRemove: [...trophyRolesToRemove]
    },
    club: {
      upToDate: clubUpToDate,
      club: {
        tag: player.club?.tag ?? null,
        name: player.club?.name ?? null
      },
      expectedClubRole,
      clubRolesToRemove: [...clubRolesToRemove]
    },
    grade: {
      upToDate: gradeUpToDate,
      grade,
      expectedGradeRole,
      gradeRolesToRemove: [...gradeRolesToRemove]
    }
  };
}
