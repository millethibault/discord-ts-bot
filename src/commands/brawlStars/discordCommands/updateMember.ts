import { Guild, GuildMember, Message, Role } from 'discord.js';
import { getProfile } from '../../../database/player';
import { Player } from '../../../interfaces/brawlStarsInterfaces/player';
import { getTrophyRole } from '../../../database/trophyRole';
import { getGradeRoles } from '../../../database/gradeRole';
import { getClub } from '../../../database/club';
import { measureMemory } from 'vm';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { getClubRoles } from '../../../database/clubRole';

export async function handleUpdateMember(message: Message<true>): Promise<Message<true>> {
    const brawlProfile = await getProfile(message.author, message.guild);
    if(!brawlProfile) return message.channel.send(`❌ Vous n'avez pas encore enregistré votre tag Brawl Stars.`);
    return bsapi.getPlayerData(brawlProfile.playerTag)
    .then(async player => {
        if(!message.member) return message.channel.send(`❌ Membre discord non reconnu.`);
        let member = message.member;
        const trophyRoleUpdated = await updateTrophyRole(member, player);
        member = await member.fetch();
        const gradeRoleUpdate = await updateGradeRole(member, player);
        member = await member.fetch();
        const clubRoleUpdated = await updateClubRole(member, player);
        member = await member.fetch();
        let messageString = `✅ Mise à jour de votre profil Discord effectuée\n`;
        if(trophyRoleUpdated) messageString += `Nouveau palier de trophées atteint : <@&${trophyRoleUpdated.id}>\n`;
        if(gradeRoleUpdate) messageString += `Nouveau grade dans votre clan : <@&${gradeRoleUpdate.id}>\n`;
        if(clubRoleUpdated) messageString += `Nouveau clan rejoint : <@&${clubRoleUpdated.id}>\n`;
        if(!trophyRoleUpdated && !gradeRoleUpdate && !clubRoleUpdated) messageString += `Tous vos rôles étaient déjà à jour.`;
        return message.channel.send(messageString);
    })
    .catch(err => {
        console.error(err);
        return message.channel.send(`❌ Votre profil \`${brawlProfile.playerTag}\` n'a pas été trouvé sur Brawl Stars.`);
    });
}

export async function updateTrophyRole(member: GuildMember, player: Player): Promise<Role | null> {
    const trophyRoles = await getTrophyRole(member.guild);
    const trophyRolesId = trophyRoles.map(trophyRole => trophyRole.roleId)
    const trophyRoleId = trophyRoles.sort((trophyRole1,trophyRole2) => trophyRole2.trophies - trophyRole1.trophies).find(trophyRole => player.trophies >= trophyRole.trophies)?.roleId;
    if(!trophyRoleId) return null;

    const trophyRole = await member.guild.roles.fetch(trophyRoleId);
    if(!trophyRole) return null;

    if(member.roles.cache.has(trophyRoleId)) return null;
    
    const rolesToRemove = member.roles.cache.filter(role => trophyRolesId.includes(role.id) && role.id !== trophyRoleId);
    if(rolesToRemove.size > 0) await member.roles.remove(rolesToRemove);
    await member.roles.add(trophyRole);
    return trophyRole;
}

export async function updateGradeRole(member: GuildMember, player: Player): Promise<Role | null> {
    const gradeRoles = await getGradeRoles(member.guild);
    if(!gradeRoles) return null;

    const guildClubs = await getClub(member.guild);
    const playerClub = guildClubs.find(guildClub => guildClub.clubTag === player.club.tag);
    if(!playerClub) return null;

    return bsapi.getClubData(playerClub.clubTag)
    .then(async club => {
        const clubGrade = club.members.find(member => member.tag === player.tag)?.role;
        if(!clubGrade) return null;

        const gradeRoleId = gradeRoles[clubGrade];
        if(!gradeRoleId) return null;

        const gradeRole = await member.guild.roles.fetch(gradeRoleId);
        if(!gradeRole) return null;

        const rolesToRemove = member.roles.cache
            .filter(role => Object.entries(gradeRoles)
                .filter(([key, value]) =>['president', 'vicePresident', 'senior', 'member'].includes(key) && value !== undefined)
                .map(([_, value]) => value as string).includes(role.id) && role.id !== gradeRole.id);
        if(rolesToRemove.size > 0) await member.roles.remove(rolesToRemove);
        if(member.roles.cache.has(gradeRole.id)) return null;

        await member.roles.add(gradeRole);
        return gradeRole;
    })
    .catch(err => {
        console.error(err);
        return null;
    });
}

export async function updateClubRole(member: GuildMember, player: Player): Promise<Role | null> {
    const clubRoles = await getClubRoles(member.guild);
    if(!clubRoles) return null;

    const playerClub = clubRoles.find(clubRole => clubRole.clubTag === player.club.tag);
    if(!playerClub || !playerClub.roleId) return null;

    const clubRole = await member.guild.roles.fetch(playerClub.roleId);
    if (!clubRole) return null;

    const rolesToRemove = member.roles.cache.filter(role => clubRoles.map(clubRole => clubRole.roleId).includes(role.id) && role.id !== clubRole.id);
    if(rolesToRemove.size > 0) await member.roles.remove(rolesToRemove);
    if(member.roles.cache.has(clubRole.id)) return null;

    await member.roles.add(clubRole);
    return clubRole;
}