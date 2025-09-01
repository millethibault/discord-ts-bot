import { ChatInputCommandInteraction, Guild, GuildMember, Interaction, Message, Role, User } from 'discord.js';
import { getProfile } from '../../../database/player';
import { Player } from '../../../interfaces/brawlStarsInterfaces/player';
import { getTrophyRole } from '../../../database/trophyRole';
import { getGradeRoles } from '../../../database/gradeRole';
import { getClub } from '../../../database/club';
import bsapi from '../../../BrawlStarsInterfaces/brawl-stars-api';
import { getClubRoles } from '../../../database/clubRole';
import { getAutoRename } from '../../../database/autoRename';
import { client } from '../../../bot/client';

export async function handleUpdateMember(interaction: ChatInputCommandInteraction & { guild: Guild, member: GuildMember }): Promise<Message> {
    if(!client.user) return interaction.editReply(`❌ Problème de synchronisation du bot`);
    const botMember = await interaction.guild.members.fetch(client.user.id);
    if(!botMember.permissions.has('ManageRoles')) return interaction.editReply(`❌ Je n'ai pas la permission d'attribuer des rôles sur ce serveur !`);
    const user = interaction.options.getUser('membre');
    let member = interaction.member;
    if(user) member = await interaction.guild.members.fetch(user.id);
    const oldNickname = member.displayName;
    if(botMember.roles.highest.position <= member.roles.highest.position) return interaction.editReply(`❌ Je ne peux pas gérer les rôles de ${member.displayName} rôles car vous êtes ${interaction.member.roles.highest.name} !`);

    const brawlProfile = await getProfile(interaction.user, interaction.guild);
    if(!brawlProfile) return interaction.editReply(`❌ ${member.displayName} n'avez pas encore enregistré votre tag Brawl Stars.`);
    return bsapi.getPlayerData(brawlProfile.playerTag)
    .then(async player => {
        let messageString = `✅ Mise à jour du profil Discord effectuée\n`;
        const trophyRoleUpdated = await updateTrophyRole(member, player, messageString);
        member = await member.fetch();
        const gradeRoleUpdate = await updateGradeRole(member, player, messageString);
        member = await member.fetch();
        const clubRoleUpdated = await updateClubRole(member, player, messageString);
        member = await member.fetch();
        const memberNameUpdated = await updateMemberName(member, player, messageString);
        member = await member.fetch();
        if(!trophyRoleUpdated && !gradeRoleUpdate && !clubRoleUpdated) messageString += `Tous les rôles de ${oldNickname} étaient déjà à jour.\n`;
        if (memberNameUpdated) messageString += `Pseudo sur le serveur : ${oldNickname} ➡️ ${memberNameUpdated}`;
        return interaction.editReply(messageString);
    })
    .catch(err => {
        console.error(err);
        return interaction.editReply(`❌ Votre profil \`${brawlProfile.playerTag}\` n'a pas été trouvé sur Brawl Stars.`);
    });
}

export async function updateTrophyRole(member: GuildMember, player: Player, messageString: string): Promise<Role | null> {
    const trophyRoles = await getTrophyRole(member.guild);
    if(!trophyRoles[0]) {
        messageString +=  `Aucun rôle de trophées n'a été créé sur ce serveur.\,`;
        return null;
    };
    const trophyRolesId = trophyRoles.map(trophyRole => trophyRole.roleId)
    const trophyRoleId = trophyRoles.sort((trophyRole1,trophyRole2) => trophyRole2.trophies - trophyRole1.trophies).find(trophyRole => player.trophies >= trophyRole.trophies)?.roleId;
    if(!trophyRoleId) return null;

    const trophyRole = await member.guild.roles.fetch(trophyRoleId);
    if(!trophyRole) return null;

    if(member.roles.cache.has(trophyRoleId)) return null;
    
    const rolesToRemove = member.roles.cache.filter(role => trophyRolesId.includes(role.id) && role.id !== trophyRoleId);
    if(rolesToRemove.size > 0) await member.roles.remove(rolesToRemove);
    await member.roles.add(trophyRole);

    messageString += `Trophées mis à jour : ${rolesToRemove.size > 0 ? `${rolesToRemove.map(role => role.name).join(', ')} ➡️ ` : '' }${trophyRole.name}\n`;
    return trophyRole;
}

export async function updateGradeRole(member: GuildMember, player: Player, messageString: string): Promise<Role | null> {
    const gradeRoles = await getGradeRoles(member.guild);
    if(!gradeRoles) {
        messageString +=  `Aucun rôle de grade n'a été créé sur ce serveur.\,`;
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

        const rolesToRemove = member.roles.cache
            .filter(role => Object.entries(gradeRoles)
                .filter(([key, value]) =>['president', 'vicePresident', 'senior', 'member'].includes(key) && value !== undefined)
                .map(([_, value]) => value as string).includes(role.id) && role.id !== gradeRole.id);
        if(rolesToRemove.size > 0) await member.roles.remove(rolesToRemove);
        if(member.roles.cache.has(gradeRole.id)) return null;

        await member.roles.add(gradeRole);
        messageString += `Grade mis à jour : ${rolesToRemove.size > 0 ? `${rolesToRemove.map(role => role.name).join(', ')} ➡️ ` : '' }${gradeRole.name}\n`;
        return gradeRole;
    })
    .catch(err => {
        console.error(err);
        return null;
    });
}

export async function updateClubRole(member: GuildMember, player: Player, messageString: string): Promise<Role | null> {
    const clubRoles = await getClubRoles(member.guild);
    if(!clubRoles[0]) {
        messageString +=  `Aucun rôle de grade n'a été créé sur ce serveur.\,`;
        return null;
    };

    const playerClub = clubRoles.find(clubRole => clubRole.clubTag === player.club.tag);
    if(!playerClub || !playerClub.roleId) return null;

    const clubRole = await member.guild.roles.fetch(playerClub.roleId);
    if (!clubRole) return null;

    const rolesToRemove = member.roles.cache.filter(role => clubRoles.map(clubRole => clubRole.roleId).includes(role.id) && role.id !== clubRole.id);
    if(rolesToRemove.size > 0) await member.roles.remove(rolesToRemove);
    if(member.roles.cache.has(clubRole.id)) return null;

    await member.roles.add(clubRole);
    messageString += `Grade mis à jour : ${rolesToRemove.size > 0 ? `${rolesToRemove.map(role => role.name).join(', ')} ➡️ ` : '' }${clubRole.name}\n`;
    return clubRole;
}

export async function updateMemberName(member: GuildMember, player: Player, messageString: string): Promise<string | null> {
    const autoRename = await getAutoRename(member.guild);
    if(!autoRename) return null;
    if(member.displayName == player.name) return null;
    await member.setNickname(player.name);
    return player.name;
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('updateprofile')
  .setDescription('Met à jours les rôles discord d\'un membre en fonction de son profil Brawl Stars lié.')
  .addUserOption(option => 
    option.setName('membre')
    .setDescription('Le membre à mettre à jour')
    .setRequired(false)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);