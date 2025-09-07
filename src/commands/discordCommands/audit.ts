import { ChatInputCommandInteraction, Guild, GuildMember, Interaction, Message, Role, User, PermissionsBitField, PermissionFlags } from 'discord.js';
import { getTrophyRole } from '../../database/trophyRole';
import { getGradeRoles } from '../../database/gradeRole';
import { getClubRoles } from '../../database/clubRole';
import { client } from '../../bot/client';
import comparePermissions from '../../utils/comparePermissions';
import { getTraductions } from '../../traductions/tradFunctions';
import { getVerify } from '../../database/verify';

export async function handleAudit(interaction: ChatInputCommandInteraction & { guild: Guild, member: GuildMember }): Promise<Message> {
    const traductions = await getTraductions(interaction.guild)
    if(!client.user) return interaction.editReply(traductions.ERROR_SYNC_BOT);
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
    let messageString = traductions.AUDIT_DONE(dbRoles.length, botMember);
    const botRole = botMember.roles.cache.find(role => role.managed);

    if(auditedDbRoles[0]) messageString += traductions.AUDIT_AUDITED_ROLES(auditedDbRoles.length, botMember, auditedDbRoles.map(role => `\`${role.role.name}\``).join(' | '));
    if(nonManageableManagedRoles.first()) messageString += traductions.AUDIT_NON_MANAGEABLE_ROLES(nonManageableManagedRoles.size, botMember, botRole!, nonManageableManagedRoles.map(role => `\`${role.name}\``).join(' | '));
    if(nonAuditedDbRoles[0]) messageString += traductions.AUDIT_DANGEROUS_ROLES(nonAuditedDbRoles.length, botMember, nonAuditedDbRoles.map(role => `\`${role.role.name}\` : ${role.exclusivePermissions.map(str => `\`${str}\``).join(' | ')}`).join('.\n-'));
    if(nonAuditedDbRoles[0] && !verify) messageString += traductions.AUDIT_EXTREME_DANGER;
    messageString += traductions.YOU_CAN_SEE_LOG;
    return interaction.editReply(messageString);
}

import { SlashCommandBuilder, PermissionFlagsBits} from 'discord.js';
import { traductions as tradFr } from '../../traductions/fr';
import { traductions as tradEn } from '../../traductions/en';

export const data = new SlashCommandBuilder()
  .setName('audit')
    .setDescription(tradEn.AUDIT_COMMAND_DESCRIPTION)
    .setDescriptionLocalizations({
    "fr": tradFr.AUDIT_COMMAND_DESCRIPTION,
    "en-GB": tradEn.AUDIT_COMMAND_DESCRIPTION,
    "en-US": tradEn.AUDIT_COMMAND_DESCRIPTION
    })