import { Message, Role } from 'discord.js';
import { getClubRoles, setClubRole } from '../../../database/clubRole';

export async function handleGetClubRole(message: Message<true>): Promise<Message<true>> {
        const guildRoles = await getClubRoles(message.guild);
        if(guildRoles.length == 0) return message.channel.send(`❌ Le serveur ${message.guild.name} n'a pas encore associé de club à un rôle `)
        return message.channel.send(`✅ Le serveur ${message.guild.name} a ${guildRoles.length} clubs associés à des rôles : \n${guildRoles.map(guildRoles => `${guildRoles.clubName} (\`${guildRoles.clubTag}\`) -> <@&${guildRoles.roleId}>`).join('\n')} `);
}