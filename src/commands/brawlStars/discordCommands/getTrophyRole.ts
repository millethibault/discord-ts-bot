import { Message, Role } from 'discord.js';
import { getTrophyRole } from '../../../database/trophyRole';

export async function handleGetTrophyRole(message: Message<true>): Promise<Message<true>> {
        const trophyRoles = await getTrophyRole(message.guild);
        if(!trophyRoles[0]) return message.channel.send(`❌ Le serveur ${message.guild.name} n'a pas encore associé de nombre de trophées à un rôle.`)
        return message.channel.send(`🏆 Le serveur ${message.guild.name} a associé les grades suivants à des paliers de tropéhes :\n${trophyRoles.sort((trophyRole1,trophyRole2) => trophyRole2.trophies - trophyRole1.trophies).map(trophyRole => `+ de \`${trophyRole.trophies.toLocaleString()}\` : <@&${trophyRole.roleId}>`).join('\n')}`);
}