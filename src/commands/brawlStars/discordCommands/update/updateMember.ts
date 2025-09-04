import { ChatInputCommandInteraction, Guild, GuildMember, Interaction, Message, Role, User } from 'discord.js';
import { getProfile } from '../../../../database/player';
import { Player } from '../../../../interfaces/brawlStarsInterfaces/player';
import { getTrophyRole } from '../../../../database/trophyRole';
import { getGradeRoles } from '../../../../database/gradeRole';
import { getClub } from '../../../../database/club';
import bsapi from '../../../../BrawlStarsInterfaces/brawl-stars-api';
import { getClubRoles } from '../../../../database/clubRole';
import { getAutoRename } from '../../../../database/autoRename';
import { client } from '../../../../bot/client';
type MessageString = { value: string };
export async function handleUpdateMember(interaction: ChatInputCommandInteraction & { guild: Guild, member: GuildMember }): Promise<Message> {
    let member = interaction.member;
    const user = interaction.options.getUser('membre');
    if(user) member = await interaction.guild.members.fetch(user.id);

    const [permission, errorString] = await checkRoleConditions(interaction)
    if(!permission) return interaction.editReply(errorString);
    const oldNickname = member.displayName;

    const brawlProfile = await getProfile(member.user, interaction.guild);
    if(!brawlProfile) return interaction.editReply(`❌ ${member.displayName} n'a pas encore enregistré votre tag Brawl Stars.`);
    return bsapi.getPlayerData(brawlProfile.playerTag)
    .then(async player => {
        let messageString = { value:`✅ Mise à jour du profil Discord effectuée\n`};
        const trophyRoleUpdated = await updateTrophyRole(member, player, messageString);
        member = await member.fetch();
        const gradeRoleUpdate = await updateGradeRole(member, player, messageString);
        member = await member.fetch();
        const clubRoleUpdated = await updateClubRole(member, player, messageString);
        member = await member.fetch();
        const memberNameUpdated = await updateMemberName(member, player, messageString);
        member = await member.fetch();
        if(!trophyRoleUpdated && !gradeRoleUpdate && !clubRoleUpdated) messageString.value += `Tous les rôles de ${oldNickname} étaient déjà à jour.\n`;
        if (memberNameUpdated) messageString.value += `Pseudo sur le serveur : ${oldNickname} ➡️ ${memberNameUpdated}`;
        return interaction.editReply(messageString.value);
    })
    .catch(err => {
        console.error(err);
        return interaction.editReply(`❌ Votre profil \`${brawlProfile.playerTag}\` n'a pas été trouvé sur Brawl Stars.`);
    });
}

export async function updateTrophyRole(member: GuildMember, player: Player, messageString: MessageString): Promise<Role | null> {
    const trophyRoles = await getTrophyRole(member.guild);
    if(!trophyRoles[0]) {
        messageString.value +=  `Aucun rôle de trophées n'a été créé sur ce serveur.\,`;
        return null;
    };
    const trophyRolesId = trophyRoles.map(trophyRole => trophyRole.roleId)
    const trophyRoleId = trophyRoles.sort((trophyRole1,trophyRole2) => trophyRole2.trophies - trophyRole1.trophies).find(trophyRole => player.trophies >= trophyRole.trophies)?.roleId;
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

export async function updateGradeRole(member: GuildMember, player: Player, messageString: MessageString): Promise<Role | null> {
    const gradeRoles = await getGradeRoles(member.guild);
    if(!gradeRoles) {
        messageString.value +=  `Aucun rôle de grade n'a été créé sur ce serveur.\,`;
        return null;
    };

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
    })
    .catch(err => {
        console.error(err);
        return null;
    });
}

export async function updateClubRole(member: GuildMember, player: Player, messageString: MessageString): Promise<Role | null> {
    const clubRoles = await getClubRoles(member.guild);
    if(!clubRoles[0]) {
        messageString.value +=  `Aucun rôle de grade n'a été créé sur ce serveur.\,`;
        return null;
    };

    const playerClub = clubRoles.find(clubRole => clubRole.clubTag === player.club.tag);
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

export async function updateMemberName(member: GuildMember, player: Player, messageString: MessageString): Promise<string | null> {
    const autoRename = await getAutoRename(member.guild);
    if(!autoRename) return null;
    if(member.displayName == player.name) return null;
    await member.setNickname(player.name);
    return player.name;
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';
import { checkRoleConditions } from '../../../../utils/checkPerms';

export const data = new SlashCommandBuilder()
  .setName('updateprofile')
  .setDescription('Met à jours les rôles discord d\'un membre en fonction de son profil Brawl Stars lié.')
  .addUserOption(option => 
    option.setName('membre')
    .setDescription('Le membre à mettre à jour')
    .setRequired(false)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);