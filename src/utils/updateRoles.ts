import { GuildMember, Role } from "discord.js";
import { client } from "../bot/client";
import { getTrophyRole } from "../database/trophyRole";
import { Club } from "../interfaces/brawlStarsInterfaces/club";
import { getGradeRoles } from "../database/gradeRole";
import { getClub } from "../database/club";
import { getProfile } from "../database/player";
import { getClubRoles } from "../database/clubRole";
import { getAutoRename } from "../database/autoRename";

type MessageString = { value: string };

export async function updateTrophyRole(member: GuildMember, playerTrophies: number, messageString: MessageString = { value:``}): Promise<Role | null> {
    const trophyRoles = await getTrophyRole(member.guild);
    if(!trophyRoles[0]) {
        messageString.value +=  `Aucun rôle de trophées n'a été créé sur ce serveur.\,`;
        return null;
    };
    const trophyRolesId = trophyRoles.map(trophyRole => trophyRole.roleId)
    const trophyRoleId = trophyRoles.sort((trophyRole1,trophyRole2) => trophyRole2.trophies - trophyRole1.trophies).find(trophyRole => playerTrophies >= trophyRole.trophies)?.roleId;
    if(!trophyRoleId) return null;

    const trophyRole = await member.guild.roles.fetch(trophyRoleId);
    if(!trophyRole) return null;

    if(member.roles.cache.has(trophyRoleId)) return null;
    if(!client.user) return null;
    const botMember = await member.guild.members.fetch(client.user.id);
    const rolesToRemove = member.roles.cache.filter(role => trophyRolesId.includes(role.id) && role.id !== trophyRoleId && role.position < botMember.roles.highest.position);
    if(rolesToRemove.size > 0) await member.roles.remove(rolesToRemove);
    if(trophyRole.position > botMember.roles.highest.position) return null;
    await member.roles.add(trophyRole);

    messageString.value += `Trophées mis à jour : ${rolesToRemove.size > 0 ? `${rolesToRemove.map(role => role.name).join(', ')} ➡️ ` : '' }${trophyRole.name}\n`;
    return trophyRole;
}

export async function updateGradeRole(member: GuildMember, club: Club, messageString: MessageString = { value:``}): Promise<Role | null> {
    const gradeRoles = await getGradeRoles(member.guild);
    if(!gradeRoles) {
        messageString.value +=  `Aucun rôle de grade n'a été créé sur ce serveur.\,`;
        return null;
    };

    const guildClubs = await getClub(member.guild);
    const playerClub = guildClubs.find(guildClub => guildClub.clubTag === club.tag);
    if(!playerClub) return null;
    const memberProfile = await getProfile(member.user, member.guild);
    if(!memberProfile) return null;
    const clubGrade = club.members.find(member => member.tag === memberProfile.playerTag)?.role;
    if(!clubGrade) return null;

    const gradeRoleId = gradeRoles[clubGrade];
    if(!gradeRoleId) return null;

    const gradeRole = await member.guild.roles.fetch(gradeRoleId);
    if(!gradeRole) return null;
    if(!client.user) return null;
    const botMember = await member.guild.members.fetch(client.user.id);

    const rolesToRemove = member.roles.cache
        .filter(role => Object.entries(gradeRoles)
            .filter(([key, value]) =>['president', 'vicePresident', 'senior', 'member'].includes(key) && value !== undefined && role.position < botMember.roles.highest.position)
            .map(([_, value]) => value as string).includes(role.id) && role.id !== gradeRole.id);

    if(rolesToRemove.size > 0) await member.roles.remove(rolesToRemove);
    if(member.roles.cache.has(gradeRole.id)) return null;

    if(gradeRole.position > botMember.roles.highest.position) return null;
    await member.roles.add(gradeRole);
    messageString.value += `Grade mis à jour : ${rolesToRemove.size > 0 ? `${rolesToRemove.map(role => role.name).join(', ')} ➡️ ` : '' }${gradeRole.name}\n`;
    return gradeRole;
}

export async function updateClubRole(member: GuildMember, club: Club, messageString: MessageString = { value:``}): Promise<Role | null> {
    const clubRoles = await getClubRoles(member.guild);
    if(!clubRoles[0]) {
        messageString.value +=  `Aucun rôle de grade n'a été créé sur ce serveur.\,`;
        return null;
    };

    const playerClub = clubRoles.find(guildClub => guildClub.clubTag === club.tag);
    if(!playerClub || !playerClub.roleId) return null;

    const clubRole = await member.guild.roles.fetch(playerClub.roleId);
    if (!clubRole) return null;
    if(!client.user) return null;
    const botMember = await member.guild.members.fetch(client.user.id);

    const rolesToRemove = member.roles.cache.filter(role => clubRoles.map(clubRole => clubRole.roleId).includes(role.id) && role.id !== clubRole.id && role.position < botMember.roles.highest.position);
    if(rolesToRemove.size > 0) await member.roles.remove(rolesToRemove);
    if(member.roles.cache.has(clubRole.id)) return null;

    if(clubRole.position > botMember.roles.highest.position) return null;
    await member.roles.add(clubRole);
    messageString.value += `Grade mis à jour : ${rolesToRemove.size > 0 ? `${rolesToRemove.map(role => role.name).join(', ')} ➡️ ` : '' }${clubRole.name}\n`;
    return clubRole;
}

export async function updateMemberName(member: GuildMember, playerName: string, messageString: MessageString = { value:``}): Promise<string | null> {
    const autoRename = await getAutoRename(member.guild);
    if(!autoRename) return null;
    if(member.displayName == playerName) return null;
    await member.setNickname(playerName);
    return playerName;
}