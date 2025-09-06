import { ChatInputCommandInteraction, Guild, GuildMember, Interaction, Message, Role, User, PermissionsBitField, PermissionFlags } from 'discord.js';
import { getTrophyRole } from '../../../database/trophyRole';
import { getGradeRoles } from '../../../database/gradeRole';
import { getClubRoles } from '../../../database/clubRole';
import { client } from '../../../bot/client';
import comparePermissions from '../../../utils/comparePermissions';

export async function handleAudit(interaction: ChatInputCommandInteraction & { guild: Guild, member: GuildMember }): Promise<Message> {
    if(!client.user) return interaction.editReply(`❌ Problème de synchronisation du bot`);
    const guildRoles = await interaction.guild.roles.fetch();
    const botMember = await interaction.guild.members.fetch(client.user.id);
    const manageableRoles = guildRoles.filter(guildRole => guildRole.position < botMember.roles.highest.position && guildRole.id !== interaction.guild.roles.everyone.id);
    const nonManageableRoles = guildRoles.filter(guildRole => guildRole.position >= botMember.roles.highest.position);
    const clubRoles = await getClubRoles(interaction.guild);
    const trophyRoles = await getTrophyRole(interaction.guild);
    const gradeRoles = await getGradeRoles(interaction.guild);
    const dbRolesId = [
        ...clubRoles.map(role => role.roleId),
        ...trophyRoles.map(role => role.roleId),
        ...(gradeRoles ? Object.values(gradeRoles) : [])
    ];
    const nonManageableManagedRoles = nonManageableRoles.filter(guildRole => dbRolesId.includes(guildRole.id));

    const rolesExclusivePermissions = manageableRoles.map(dbRole => {
        return {
            "role": dbRole, 
            "exclusivePermissions" : comparePermissions(botMember, dbRole)
        };
    });
    const dbRoles = rolesExclusivePermissions.filter(guildRole => dbRolesId.includes(guildRole.role.id));
    const auditedDbRoles = dbRoles.filter(role => role.exclusivePermissions.length == 0);
    const nonAuditedDbRoles = dbRoles.filter(role => role.exclusivePermissions.length > 0);
    const nonDbRoles = rolesExclusivePermissions.filter(guildRole => !dbRolesId.includes(guildRole.role.id));
    const auditedNonDbRoles = nonDbRoles.filter(role => role.exclusivePermissions.length == 0);
    const nonAuditedNonDbRoles = nonDbRoles.filter(role => role.exclusivePermissions.length > 0);

    const verify = await getVerify(interaction.guild);
    let messageString = `Audit effectué.\n${botMember} gère \`${dbRoles.length}\` rôles.\n\n`
    const botRole = botMember.roles.cache.find(role => role.managed);
    if(auditedDbRoles[0]) messageString += `✅ \`${auditedDbRoles.length}\` ${auditedDbRoles.length > 1 ? `rôles gérés par ${botMember} sont conformes` : `rôle géré par ${botMember} est conformes`} : ${auditedDbRoles.map(role => `\`${role.role.name}\``).join(' | ')}.\n\n`;
    if(nonManageableManagedRoles.first()) messageString += `❌ \`${nonManageableManagedRoles.size}\` ${nonManageableManagedRoles.size > 1 ? `rôles sont censés être gérés par ${botMember} mais ne le sont pas` : `rôle est censé être géré par ${botMember} mais ne l'est pas`} : ${nonManageableManagedRoles.map(role => `\`${role.name}\``).join(' | ')}.\nPensez à vérifier que ces rôles doivent être gérés par ${botMember} et à les placer en dessous du rôle ${botRole} dans les paramètres du serveur le cas échéant.\n\n`;
    if(nonAuditedDbRoles[0]) messageString += `⚠️ \`${nonAuditedDbRoles.length}\` ${nonAuditedDbRoles.length > 1 ? `rôles gérés par ${botMember} sont non conformes car ils possèdent trop de permissions` : `rôle géré par ${botMember} est non conforme car il possède trop de permissions`} : \n-${nonAuditedDbRoles.map(role => `\`${role.role.name}\` : ${role.exclusivePermissions.map(str => `\`${str}\``).join(' | ')}`).join('.\n-')}.\nPensez à auditer manuellement ces rôles qui peuvent poser des risques de sécurité ou de contournement.\n\n`;
    if(nonAuditedDbRoles[0] && !verify) messageString += `**‼️ ATTENTION : Certains de vos rôles donnent des permissions tandis que vos membres n'ont pas à être vérifiés par un modérateur pour les acquérir.\nExécutez immédiatement la commande \`/set verify\` !**`;
    //if(auditedNonDbRoles[0]) messageString += `${auditedNonDbRoles.length} rôles non gérés par ${botMember.displayName} sont conformes : ${auditedNonDbRoles.map(role => role.role.name).join(' | ')}.\nPensez à placer ces rôles au dessus du rôle ${botRole} dans les paramètres du serveur, ou bien à les associer à des données Brawl Stars.\n\n`;
    //if(nonAuditedNonDbRoles[0]) messageString += `${nonAuditedNonDbRoles.length} non rôles gérés par ${botMember.displayName} sont non conformes car ils possèdent trop de permissions : \n-${nonAuditedNonDbRoles.map(role => `${role.role.name} : ${role.exclusivePermissions.join(' | ')}\n`).join('.\n-')}.\n\n`;
    messageString += `Vous pouvez voir un log des acions du bot das les paramètres du serveur -> Logs du serveur (Audit log en anglais).`
    return interaction.editReply(messageString);
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';
import { getVerify } from '../../../database/verify';

export const data = new SlashCommandBuilder()
  .setName('audit')
  .setDescription('Fournit un audit des autorisations du bot par mesure de sécurité.')
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild);