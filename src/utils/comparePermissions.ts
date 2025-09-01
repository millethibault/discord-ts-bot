import { GuildMember, PermissionsBitField, Role } from "discord.js";

/**
 * Compare les permissions d'un membre de serveur Discord avec celles d'un rôle en incluant celles du rôle everyone.
 * Renvoie la liste des permissions que le role2 possède et que le membre ne possède pas.
 *
 * @param role1 - Le membre à comparer
 * @param role2 - Le rôle à comparer
 * @returns Un tableau de permissions exclusives au rôle
 */
export default function comparePermissions(member: GuildMember, role: Role): string[] {
    const everyoneRole = member.guild.roles.everyone;
    const permsMember = new PermissionsBitField(member.permissions);
    const permsRole = new PermissionsBitField(role.permissions).add(everyoneRole.permissions);
    const diff = permsRole.toArray().filter(perm => !permsMember.has(perm));
    return diff;
}